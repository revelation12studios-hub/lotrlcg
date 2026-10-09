window.ExtraPlayerCards = window.ExtraPlayerCards || { heroes: [], cards: [] };

// --- NEW HEROES ---
window.ExtraPlayerCards.heroes.push({
  id: 'bilbo_baggins',
  name: 'Bilbo Baggins',
  sphere: 'lore',
  code: '02001',
  img: 'cards/the_hunt_for_gollum/bilbo_baggins.jpg', // Change to .png if your image is a PNG
  portrait: '💍',
  willpower: 1,
  attack: 1,
  defense: 2,
  hp: 2,
  threat: 9,
  trait: 'Hobbit',
  text: 'The first player draws 1 additional card in the resource phase.',
  unique: true
});

// --- NEW PLAYER CARDS (Allies, Events, Attachments) ---
// You can push more cards here in the future!


// --- DYNAMIC ABILITY PATCHES ---
// Wait for the main game engine to load, then intercept the phase state machine natively
window.addEventListener('load', () => {
    if (!window._bilboPhasePatched) {
        window._bilboPhasePatched = true;
        
        const patchInterval = setInterval(() => {
            const game = window.LotrEngine ? window.LotrEngine.game : (window.game || null);
            if (game && game.phase !== undefined) {
                clearInterval(patchInterval);
                
                let _internalPhase = game.phase;
                Object.defineProperty(game, 'phase', {
                    get: function() { return _internalPhase; },
                    set: function(val) {
                        const oldPhase = _internalPhase;
                        _internalPhase = val;
                        
                        // Trigger when the automated Resource Phase finishes and action window opens
                        if (val === 'resource-window' && oldPhase === 'resource') {
                            const bilboInPlay = game.heroes.some(h => h.id === 'bilbo_baggins' && !h._dead && !h._prisoner);
                            if (bilboInPlay && window.drawCard) {
                                window.drawCard(() => {
                                    if (window.LotrEngine && window.LotrEngine.toast) {
                                        window.LotrEngine.toast('Bilbo Baggins', 'The first player drew 1 additional card!', 'success');
                                    }
                                }, game.firstPlayerIdx);
                            }
                        }
                    },
                    configurable: true
                });

                // Patch Bilbo's visual effect to spawn a ghost in multiplayer if his tab isn't open
                const origTriggerBilbo = window.triggerBilboDrawEffect;
                if (origTriggerBilbo && !origTriggerBilbo._ghostPatched) {
                    window.triggerBilboDrawEffect = function(bilboUid, targetPIdx, onComplete) {
                        const g = window.LotrEngine?.game || window.game;
                        const bilbo = (g?.heroes || []).find(h => (bilboUid && h._uid === bilboUid) || h.id === 'bilbo_baggins');
                        let realEl = bilbo ? document.querySelector(`[data-uid="${bilbo._uid}"]`) : null;
                        
                        const isMultiplayerOffTab = bilbo && bilbo._ownerIdx !== undefined && (g?.numPlayers > 1) && bilbo._ownerIdx !== (g?.activeTabPlayerIdx || 0);
                        const isMissing = !realEl || realEl.offsetParent === null;

                        let ghost = null;
                        if ((isMultiplayerOffTab || isMissing) && bilbo) {
                            const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                            const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                            const gx = (window.innerWidth / 2) - (cardW / 2);
                            const gy = (window.innerHeight / 2) - (cardH / 2);

                            ghost = document.createElement('div');
                            ghost.className = `card ${bilbo.sphere || 'neutral'}`;
                            ghost.setAttribute('data-uid', bilbo._uid);
                            ghost.style.cssText = `
                                position: fixed; left: ${gx}px; top: ${gy}px; width: ${cardW}px; height: ${cardH}px;
                                opacity: 0.5; z-index: 99998; pointer-events: none; border-radius: 6px;
                                box-shadow: 0 0 28px rgba(245, 215, 110, 0.85);
                            `;
                            const imgSrc = (window.appLang === 'zh' && window.ZH_IMAGES && window.ZH_IMAGES[bilbo.id || bilbo.code])
                                ? window.ZH_IMAGES[bilbo.id || bilbo.code]
                                : (bilbo.code ? `https://ringsdb.com/bundles/cards/${bilbo.code}.png` : (bilbo.img || ''));
                            const initialDmg = bilbo.damage || 0;
                            const tokensHtml = initialDmg > 0 ? `<div class="token damage">${initialDmg}</div>` : '';
                            ghost.innerHTML = `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;"><div class="token-layer">${tokensHtml}</div>`;
                            
                            if (realEl) {
                                realEl.removeAttribute('data-uid');
                            }
                            
                            document.body.appendChild(ghost);
                            
                            setTimeout(() => {
																if (ghost) {
																		ghost.style.transition = 'opacity 0.4s ease-out';
																		ghost.style.opacity = '0';
																		setTimeout(() => ghost.remove(), 400);
																}
														}, 1400);
                        }

                        const res = origTriggerBilbo.call(this, bilboUid, targetPIdx, onComplete);

                        if (ghost) {
                            if (realEl) {
                                realEl.setAttribute('data-uid', bilbo._uid);
                            }
                            ghost.removeAttribute('data-uid');
                        }
                        
                        return res;
                    };
                    window.triggerBilboDrawEffect._ghostPatched = true;
                }
            }
        }, 100);
    }
});