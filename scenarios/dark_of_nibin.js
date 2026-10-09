window.LotrExpansions = window.LotrExpansions || {};

if (typeof window !== 'undefined') {
    const origTriggerQuestGreenBurn = window._triggerQuestGreenBurn;
    window._triggerQuestGreenBurn = function(cardEl) {
        const engine = window.LotrEngine;
        const game = engine ? engine.game : null;
        if (game && window.QUEST_STAGES) {
            const stage = window.QUEST_STAGES[game.questStageIdx];
            if (stage && (stage.name === 'Oathkeepers' || stage.name === 'The Oathkeepers')) {
                return;
            }
        }
        if (origTriggerQuestGreenBurn) {
            origTriggerQuestGreenBurn(cardEl);
            return;
        }
        if (!cardEl) return;
        const r = cardEl.getBoundingClientRect();
        const ghost = cardEl.cloneNode(true);
        ghost.style.cssText = `
            position: fixed; z-index: 9999;
            left: ${r.left}px; top: ${r.top}px;
            width: ${r.width}px; height: ${r.height}px;
            pointer-events: none; margin: 0;
            transform-origin: center;
            transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
            filter: brightness(1.5) sepia(1) hue-rotate(60deg) saturate(3);
            opacity: 1;
        `;
        document.body.appendChild(ghost);
        cardEl.style.opacity = '0';
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                ghost.style.transform = 'scale(1.2) translateY(-20px) rotate(5deg)';
                ghost.style.opacity = '0';
                ghost.style.filter = 'brightness(2) sepia(1) hue-rotate(60deg) saturate(5) blur(4px)';
            });
        });
        
        setTimeout(() => {
            ghost.remove();
            cardEl.style.opacity = '1';
        }, 650);
    };

    window._nibinExploredQueue = [];
    window._nibinExploredTimer = null;
    window._isProcessingNibin = false;
    window._watchfulCardRevealing = false;

    const origResolveEnemyAttack = window.resolveEnemyAttack;
    if (origResolveEnemyAttack && !window._nibinResolveAttackPatched) {
        window._nibinResolveAttackPatched = true;
        window.resolveEnemyAttack = function(enemy, defender) {
            if (enemy && (enemy.id === 'nibin_goblin_chieftain' || enemy.id === 'goblin_chieftain')) {
                const engine = window.LotrEngine;
                if (engine && engine.game) {
                    engine.game._nibinChieftainPromptActive = true;
                }
            }
            return origResolveEnemyAttack.apply(this, arguments);
        };
    }

    const origSetActionBar = window.setActionBar;
    if (origSetActionBar && !window._nibinSetActionBarPatched) {
        window._nibinSetActionBarPatched = true;
        window.setActionBar = function(buttons) {
            const engine = window.LotrEngine;
            if (engine && engine.game) {
                if (engine.game._nibinChieftainPromptActive || (engine.game._nibinBlockCombatTransitions && !engine.game.currentEnemyAttacking)) {
                    return;
                }
            }
            return origSetActionBar.apply(this, arguments);
        };
    }

    const origSetActionInfo = window.setActionInfo;
    if (origSetActionInfo && !window._nibinSetActionInfoPatched) {
        window._nibinSetActionInfoPatched = true;
        window.setActionInfo = function(text) {
            const engine = window.LotrEngine;
            if (engine && engine.game) {
                if (engine.game._nibinChieftainPromptActive || (engine.game._nibinBlockCombatTransitions && !engine.game.currentEnemyAttacking)) {
                    return;
                }
            }
            return origSetActionInfo.apply(this, arguments);
        };
    }

    const origPlayerAttacks = window.playerAttacks;
    if (origPlayerAttacks && !window._nibinPlayerAttacksPatched) {
        window._nibinPlayerAttacksPatched = true;
        window.playerAttacks = function() {
            const engine = window.LotrEngine;
            if (engine && engine.game) {
                const hasExtraAttack = engine.game._nibinChieftainPromptActive || engine.game.currentEnemyAttacking || engine.game.engagedEnemies.some(e => e._extraAttackPending > 0) || engine.game.stagingArea.some(e => e._extraAttackPending > 0);
                if (hasExtraAttack) return;
            }
            return origPlayerAttacks.apply(this, arguments);
        };
    }

    const origResolveEnemyAttacks = window.resolveEnemyAttacks;
    if (origResolveEnemyAttacks && !window._nibinResolveEnemyAttacksPatched) {
        window._nibinResolveEnemyAttacksPatched = true;
        window.resolveEnemyAttacks = function() {
            const engine = window.LotrEngine;
            if (engine && engine.game) {
                const hasExtraAttack = engine.game._nibinChieftainPromptActive || engine.game.currentEnemyAttacking || engine.game.engagedEnemies.some(e => e._extraAttackPending > 0) || engine.game.stagingArea.some(e => e._extraAttackPending > 0);
                if (hasExtraAttack) return;
            }
            return origResolveEnemyAttacks.apply(this, arguments);
        };
    }

    // Global watcher to enforce Collapsed Mine quest progress clamping across saves and loads
    setInterval(() => {
        const engine = window.LotrEngine;
        const game = engine ? engine.game : null;
        if (!game) return;

        const phaseDesc = Object.getOwnPropertyDescriptor(game, 'phase');
        if (!phaseDesc || phaseDesc.configurable) {
            if (!phaseDesc || !phaseDesc.get) {
                let actualPhase = game.phase || 'setup';
                Object.defineProperty(game, 'phase', {
                    get: () => actualPhase,
                    set: (val) => {
                        if (val === 'combat-player-attack' && (game._nibinBlockCombatTransitions || game._nibinChieftainPromptActive || actualPhase === 'combat-player-attack')) {
                            throw new Error("[Nibin] Blocked redundant or active combat transition to player attacks.");
                        }
                        actualPhase = val;
                    },
                    configurable: true,
                    enumerable: true
                });
            }
        }

        const actionDesc = Object.getOwnPropertyDescriptor(game, 'pendingAction');
        if (!actionDesc || actionDesc.configurable) {
            if (!actionDesc || !actionDesc.get) {
                let actualAction = game.pendingAction;
                Object.defineProperty(game, 'pendingAction', {
                    get: () => actualAction,
                    set: (val) => {
                        if (val === 'declare-attacker' && game._nibinBlockCombatTransitions) {
                            return;
                        }
                        
                        // FIX: Override native playerAttacks() skip if Cracked Pillar is present
                        if (val === null && game.phase === 'combat-player-attack' && actualAction !== 'declare-attacker') {
                            const hasCrackedPillar = game.stagingArea && game.stagingArea.some(c => c.id === 'nibin_cracked_pillar');
                            if (hasCrackedPillar) {
                                actualAction = 'declare-attacker';
                                
                                setTimeout(() => {
                                    if (engine && engine.window && engine.window.setActionInfo) {
                                        engine.window.setActionInfo('Player Attacks — Click ready characters to declare as attackers, then click an enemy to attack.');
                                    }
                                    
                                    const flashText = document.createElement('div');
                                    flashText.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%, -50%) scale(0.5); z-index:90001; font-family:'Cinzel Decorative', serif; font-size:4rem; font-weight:900; color:var(--gold-bright); text-shadow:0 0 25px var(--gold), 0 4px 10px #000; opacity:0; transition:all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); pointer-events:none;";
                                    flashText.textContent = "Player's Attack Turn!";
                                    document.body.appendChild(flashText);
                                    setTimeout(() => {
                                        flashText.style.transform = 'translate(-50%, -50%) scale(1)';
                                        flashText.style.opacity = '1';
                                    }, 50);
                                    setTimeout(() => {
                                        flashText.style.transform = 'translate(-50%, -50%) scale(1.3)';
                                        flashText.style.opacity = '0';
                                        setTimeout(() => flashText.remove(), 300);
                                    }, 1500);

                                    if (engine && engine.render) engine.render();
                                }, 10);
                                return;
                            }
                        }
                        
                        actualAction = val;
                    },
                    configurable: true,
                    enumerable: true
                });
            }
        }

        // Ensure global setup hooks from Stage 1 run even if the game was loaded mid-scenario
        if (!game['_setup_The Dark of Nibin-Dûm'] && game.questStageIdx > 0 && window.QUEST_STAGES) {
            const currentStage = window.QUEST_STAGES[game.questStageIdx];
            if (currentStage && currentStage.trait === 'Nibin-Dum') {
                const stage1 = window.QUEST_STAGES.find(s => s.name === 'The Dark of Nibin-Dûm');
                if (stage1 && stage1.onSetup) {
                    game['_setup_The Dark of Nibin-Dûm'] = true;
                    stage1.onSetup(stage1, game, engine);
                }
            }
        }

        const desc = Object.getOwnPropertyDescriptor(game, 'questProgress');
        if (!desc || desc.configurable) {
            if (!desc || !desc.get) {
                let actualProgress = game.questProgress || 0;
                let lastRound = game.round || 1;
                Object.defineProperty(game, 'questProgress', {
                    get: () => actualProgress,
                    set: (val) => {
                        if (new Error().stack.includes('loadGameData')) {
                            actualProgress = val;
                            return;
                        }
                        if (game.round !== lastRound) {
                            game._nibinProgressThisRound = 0;
                            lastRound = game.round;
                        }
                        let diff = val - actualProgress;
                        if (diff > 0) {
                            const currentStage = window.QUEST_STAGES ? window.QUEST_STAGES[game.questStageIdx] : null;
                            if (currentStage && currentStage.trait === 'Nibin-Dum') {
                                if (game._nibinQuestProgressBlock) {
                                    if (engine.toast) engine.toast("Lost in the Dark", "No progress can be placed on the quest this phase.", "danger");
                                    diff = 0;
                                } else if (game.stagingArea.some(c => c.id === 'nibin_collapsed_mine')) {
                                    const allowance = 4 - (game._nibinProgressThisRound || 0);
                                    const applied = Math.min(diff, Math.max(0, allowance));
                                    game._nibinProgressThisRound = (game._nibinProgressThisRound || 0) + applied;
                                    if (diff > applied && engine.toast) {
                                        engine.toast("Collapsed Mine", "Progress limited to 4 per round!", "warning");
                                    }
                                    diff = applied;
                                }
                            }
                            
                            if (game._dungeonResolving) {
                                game._pendingDungeonProgress = (game._pendingDungeonProgress || 0) + diff;
                                return;
                            }
                        }
                        actualProgress += diff;
                    },
                    configurable: true,
                    enumerable: true
                });
            }
        }

        // Intercept and patch pop method on encounter deck arrays to guarantee reveal audio triggers correctly
        const deckDesc = Object.getOwnPropertyDescriptor(game, 'encounterDeck');
        if (!deckDesc || deckDesc.configurable) {
            if (!deckDesc || !deckDesc.get) {
                let actualDeck = game.encounterDeck;
                const patchDeck = (d) => {
                    if (d && !d._popPatched) {
                        d._popPatched = true;
                        const origPop = d.pop;
                        d.pop = function() {
                            const popped = origPop.apply(this, arguments);
                            if (popped && popped.id === 'nibin_cavern_warg') {
                                const stack = new Error().stack || '';
                                const isStandardReveal = stack.includes('revealEncounterCard');
                                const isDirectStaging = stack.includes('animateDrawDirectToStaging');
                                
                                // Only play the reveal sound if actually revealed to the staging area
                                if (isStandardReveal || isDirectStaging) {
                                    const delay = isStandardReveal ? 800 : 0;
                                    setTimeout(() => {
                                        const snd = new Audio('./sound_effects/dark_of_mirkwood/cavern_warg_reveal.mp3');
                                        snd.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
                                        snd.play().catch(() => {});
                                    }, delay);
                                }
                            }
                            return popped;
                        };
                    }
                };
                patchDeck(actualDeck);
                Object.defineProperty(game, 'encounterDeck', {
                    get: () => actualDeck,
                    set: (val) => {
                        actualDeck = val;
                        patchDeck(val);
                    },
                    configurable: true,
                    enumerable: true
                });
            }
        }

        // Patch animateLunge to play warg attack audio right when combat damage is determined
        if (window.animateLunge && !window._nibinAnimateLungePatched) {
            window._nibinAnimateLungePatched = true;
            const origAnimateLunge = window.animateLunge;
            window.animateLunge = function(attackerUid, targetUid) {
                const attacker = window._cardRegistry ? window._cardRegistry[attackerUid] : null;
                if (attacker && attacker.id === 'nibin_cavern_warg') {
                    const snd = new Audio('./sound_effects/dark_of_mirkwood/cavern_warg_attack.mp3');
                    snd.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
                    snd.play().catch(() => {});
                }
                return origAnimateLunge.apply(this, arguments);
            };
        }

        // Define custom damage setter for Cavern Warg and extra attack modifiers for all enemies
        const allEnemies = [...game.stagingArea, ...game.engagedEnemies];
        allEnemies.forEach(c => {
						if (c.id === 'nibin_goblin_chieftain' || c.id === 'goblin_chieftain') {
								const typeDesc = Object.getOwnPropertyDescriptor(c, 'type');
								if (!c._damageLocked || !typeDesc || !typeDesc.get) {
										c._damageLocked = true;
										
										// Lock damage property based on Stage 4 progress criteria
										Object.defineProperty(c, 'damage', {
												get: function() { return this._damage || 0; },
												set: function(val) {
														const curStage = window.QUEST_STAGES ? window.QUEST_STAGES[game.questStageIdx] : null;
														const isStg4 = curStage && curStage.name === 'Oathkeepers';
														const has8Prog = game.questProgress >= 8;
														const isInvincibleNow = !isStg4 || !has8Prog;
														if (isInvincibleNow) {
																if (val > (this._damage || 0) && engine && engine.toast) {
																		engine.toast('Goblin Chieftain', 'Goblin Chieftain cannot take damage right now!', 'warning');
																}
														} else {
																this._damage = val;
														}
												},
												configurable: true
										});

										// Temporarily override type property during player attack phase to prevent targeting
										Object.defineProperty(c, 'type', {
												get: function() {
														const curStage = window.QUEST_STAGES ? window.QUEST_STAGES[game.questStageIdx] : null;
														const isStg4 = curStage && curStage.name === 'Oathkeepers';
														const has8Prog = game.questProgress >= 8;
														const isInvincibleNow = !isStg4 || !has8Prog;
														if (game.phase === 'combat-player-attack' && isInvincibleNow) {
																return 'enemy-immune';
														}
														return 'enemy';
												},
												configurable: true,
												enumerable: true
										});
								}
						}
				});
    }, 100);

    window.processNibinExploredQueue = function() {
        if (window._nibinEffectActive) return;

        if (window._nibinExploredQueue.length === 0) {
            window._isProcessingNibin = false;
            return;
        }
        
        window._isProcessingNibin = true;
        window._nibinEffectActive = true;

        const getPriority = (item) => {
            if (item.loc && item.loc.text) {
                if (item.loc.text.includes('Forced:')) return 1;
                if (item.loc.text.includes('Response:')) return 2;
            }
            return 3;
        };

        const highestPriority = Math.min(...window._nibinExploredQueue.map(getPriority));
        const activeItems = window._nibinExploredQueue.filter(item => getPriority(item) === highestPriority);

        if (activeItems.length === 1) {
            const item = activeItems[0];
            window._nibinExploredQueue = window._nibinExploredQueue.filter(i => i !== item);
            item.effectFn(() => {
                window._nibinEffectActive = false;
                setTimeout(window.processNibinExploredQueue, 100);
            });
            return;
        }
        
        const engine = window.LotrEngine;
        const game = engine ? engine.game : null;
        if (!game) {
            window._nibinEffectActive = false;
            return;
        }
        const fpIdx = game.firstPlayerIdx || 0;
        
        const title = "Simultaneous Exploration Effects";
        const prompt = `<span style="font-size:1.6rem; font-weight:bold; color:var(--parchment); line-height:1.45; display:block; text-align:center;">Multiple locations were explored simultaneously.<br><br>The first player (Player ${fpIdx + 1}) must determine which of the effects resolves next:</span>`;
        
        const options = activeItems.map((item) => {
            return {
                label: `Resolve ${item.loc.name}`,
                cb: () => {
                    window._nibinExploredQueue = window._nibinExploredQueue.filter(i => i !== item);
                    item.effectFn(() => {
                        window._nibinEffectActive = false;
                        setTimeout(window.processNibinExploredQueue, 100);
                    });
                }
            };
        });
        
        if (engine.window && engine.window.showChoiceModal) {
            engine.window.showChoiceModal(title, prompt, options, true);
        } else if (engine.showChoiceModal) {
            engine.showChoiceModal(title, prompt, options, true);
        }
    };
    
    window.queueNibinExplored = function(loc, game, engine, effectFn) {
        window._nibinExploredQueue.push({ loc, game, engine, effectFn });
        window._isProcessingNibin = true;
        if (!window._nibinExploredTimer) {
            window._nibinExploredTimer = setTimeout(() => {
                window._nibinExploredTimer = null;
                window.processNibinExploredQueue();
            }, 10);
        }
    };

    const style = document.createElement('style');
    style.textContent = `
        #out-of-play-zone { align-items: center !important; justify-content: center !important; }
        #out-of-play-content { align-items: center !important; justify-content: center !important; width: 100% !important; padding: 19px 0 10px 0 !important; margin: 0 auto !important; }
        #out-of-play-content .card { margin-left: auto !important; margin-right: auto !important; }
        @keyframes rippleConverge {
            0% {
                transform: translate(-50%, -50%) scale(0.05);
                border-width: 12cqw;
                opacity: 0;
            }
            15% {
                opacity: 0.95;
            }
            70% {
                opacity: 0.55;
            }
            100% {
                transform: translate(-50%, -50%) scale(2.4);
                border-width: 0.6cqw;
                opacity: 0;
            }
        }
        .chieftain-invincible-overlay {
            position: absolute;
            inset: 0;
            z-index: 18;
            pointer-events: none;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: inset 0 0 15px rgba(255, 215, 0, 0.9), 0 0 18px rgba(255, 215, 0, 0.7);
            border: 2px solid rgba(255, 215, 0, 0.9);
            transition: opacity 1.5s ease-in-out;
            opacity: 1;
        }
        .chieftain-puddle-container {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            filter: url(#chieftainPuddleFilter);
            mix-blend-mode: color-dodge;
            opacity: 0.9;
            container-type: size;
        }
        #hover-preview .chieftain-puddle-container, #enlarge-overlay .chieftain-puddle-container {
            filter: url(#chieftainPuddleFilterEnlarged);
        }
        .drop-ripple {
            position: absolute;
            width: 80cqw;
            height: 80cqw;
            border-radius: 50%;
            border: 7cqw solid #38bdf8;
            background: radial-gradient(circle, rgba(56, 189, 248, 0.95) 0%, rgba(14, 165, 233, 0.45) 45%, transparent 70%);
            transform-origin: center center;
            animation: rippleConverge 6s cubic-bezier(0.15, 0.45, 0.45, 1) infinite;
            will-change: transform, opacity;
        }
        .drop-1 { animation-delay: 0s; }
        .drop-2 { animation-delay: 2s; }
        .drop-3 { animation-delay: 4s; }
        .chieftain-invincible-overlay.smoking-off {
            transform: translateY(-26px) scale(1.06);
            filter: blur(10px) brightness(2.2);
            opacity: 0 !important;
            transition: transform 2.3s cubic-bezier(0.15, 0.85, 0.35, 1), filter 2.3s ease-out, opacity 2.3s ease-out !important;
        }
        @keyframes watchfulEyesAura {
            0% { box-shadow: 0 0 20px #ff0000, inset 0 0 10px #ff0000; border-color: #ff3030 !important; }
            100% { box-shadow: 0 0 45px #ff0000, inset 0 0 20px #ff0000; border-color: #ffffff !important; }
        }
        .watchful-eyes-aura-active {
            animation: watchfulEyesAura 0.15s infinite alternate !important;
            z-index: 9999 !important;
        }
    `;
    document.head.appendChild(style);

    if (!document.getElementById('balatro-chieftain-shader-svg')) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'balatro-chieftain-shader-svg';
        svg.style.cssText = 'position:fixed; width:0; height:0; pointer-events:none; z-index:-1;';
        svg.innerHTML = `
            <filter id="chieftainPuddleFilter" color-interpolation-filters="sRGB" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blurredGraphic" />
                <feTurbulence type="fractalNoise" baseFrequency="0.022 0.022" numOctaves="2" result="rawNoise" />
                <feDisplacementMap in="blurredGraphic" in2="rawNoise" scale="22" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                <feColorMatrix in="displaced" type="matrix" values="
                    3  0 0 0 -1.5
                    12 0 0 0 -4.5
                    24 0 0 0 -7.0
                    0  0 0 1  0" />
            </filter>
            <filter id="chieftainPuddleFilterEnlarged" color-interpolation-filters="sRGB" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blurredGraphic" />
                <feTurbulence type="fractalNoise" baseFrequency="0.006 0.006" numOctaves="2" result="rawNoise" />
                <feDisplacementMap in="blurredGraphic" in2="rawNoise" scale="80" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                <feColorMatrix in="displaced" type="matrix" values="
                    3  0 0 0 -1.5
                    12 0 0 0 -4.5
                    24 0 0 0 -7.0
                    0  0 0 1  0" />
            </filter>
        `;
        document.body.appendChild(svg);
    }

    window.triggerWatchfulEyesVisualEffect = function(cardUid, onComplete) {
        const el = document.querySelector(`.is-attachment[data-uid="${cardUid}"]`) || document.querySelector(`[data-uid="${cardUid}"]`);
        if (!el) {
            if (onComplete) onComplete();
            return;
        }
        const rect = el.getBoundingClientRect();

        el.classList.add('watchful-eyes-aura-active');

        const padX = 60;
        const padTop = 150;
        const padBottom = 30;
        const cWidth = rect.width + padX * 2;
        const cHeight = rect.height + padTop + padBottom;

        const canvas = document.createElement('canvas');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = cWidth * dpr;
        canvas.height = cHeight * dpr;
        canvas.style.cssText = `
            position: fixed;
            left: ${rect.left - padX}px;
            top: ${rect.top - padTop}px;
            width: ${cWidth}px;
            height: ${cHeight}px;
            pointer-events: none;
            z-index: 10100;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        const particles = [];
        const cardLeftOnCanvas = padX;
        const cardTopOnCanvas = padTop;

        let duration = 1500;
        let startTime = Date.now();

        function spawn() {
            const elapsed = Date.now() - startTime;
            if (elapsed > duration - 300) return;

            for (let i = 0; i < 3; i++) {
                particles.push({
                    type: 'spark',
                    x: cardLeftOnCanvas + Math.random() * rect.width,
                    y: cardTopOnCanvas + rect.height * 0.3 + Math.random() * (rect.height * 0.7),
                    vx: (Math.random() - 0.5) * 3.0,
                    vy: -3.5 - Math.random() * 5.0,
                    size: 1.5 + Math.random() * 2.5,
                    life: 1.0,
                    decay: 0.02 + Math.random() * 0.025,
                    color: Math.random() > 0.3 ? '#ff1100' : (Math.random() > 0.5 ? '#ffaa00' : '#ffffff')
                });
            }

            if (Math.random() < 0.6) {
                particles.push({
                    type: 'smoke',
                    x: cardLeftOnCanvas + Math.random() * rect.width,
                    y: cardTopOnCanvas + rect.height * 0.2 + Math.random() * (rect.height * 0.8),
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: -1.5 - Math.random() * 2.5,
                    size: 10 + Math.random() * 12,
                    maxSize: 36 + Math.random() * 24,
                    life: 1.0,
                    decay: 0.015 + Math.random() * 0.015,
                    color: Math.random() > 0.4 ? 'rgba(200, 10, 5, ' : 'rgba(60, 0, 0, '
                });
            }
        }

        function loop() {
            ctx.clearRect(0, 0, cWidth, cHeight);

            const freshEl = document.querySelector(`.is-attachment[data-uid="${cardUid}"]`) || document.querySelector(`[data-uid="${cardUid}"]`);
            if (freshEl) {
                const fRect = freshEl.getBoundingClientRect();
                canvas.style.left = `${fRect.left - padX}px`;
                canvas.style.top = `${fRect.top - padTop}px`;
            }

            spawn();

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vx += (Math.random() - 0.5) * 0.3;
                p.life -= p.decay;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.save();
                if (p.type === 'spark') {
                    ctx.globalAlpha = Math.max(0, p.life);
                    ctx.fillStyle = p.color;
                    ctx.shadowColor = '#ff0000';
                    ctx.shadowBlur = 8;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.type === 'smoke') {
                    const curSize = p.size + (1 - p.life) * (p.maxSize - p.size);
                    ctx.globalAlpha = Math.max(0, p.life * 0.45);
                    ctx.fillStyle = p.color + (p.life * 0.45) + ')';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, curSize, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            const elapsed = Date.now() - startTime;
            if (elapsed < duration || particles.length > 0) {
                requestAnimationFrame(loop);
            } else {
                canvas.remove();
                if (freshEl) freshEl.classList.remove('watchful-eyes-aura-active');
                if (onComplete) onComplete();
            }
        }
        requestAnimationFrame(loop);
    };

    let _watchfulResolving = false;
    window.handleWatchfulEyesActivation = function() {
        if (_watchfulResolving) return;
        _watchfulResolving = true;

        const engine = window.LotrEngine;
        const game = engine ? engine.game : null;
        if (!game) {
            _watchfulResolving = false;
            return;
        }

        const watchfulHero = game.heroes.find(h => 
            !h._prisoner && 
            h.exhausted && 
            h.attached && 
            h.attached.some(a => a.id === 'nibin_watchful_eyes')
        );

        if (!watchfulHero) {
            _watchfulResolving = false;
            return;
        }

        const watchfulCard = watchfulHero.attached.find(a => a.id === 'nibin_watchful_eyes');
        if (!watchfulCard) {
            _watchfulResolving = false;
            return;
        }

        const ownerIdx = watchfulHero._ownerIdx !== undefined ? watchfulHero._ownerIdx : game.activeTabPlayerIdx;
        if (game.activeTabPlayerIdx !== ownerIdx && engine.window && engine.window._switchTab) {
            engine.window._switchTab(ownerIdx);
        }

        // Lock out all input events
        window._watchfulCardRevealing = true;

        // Record initial counts before revealing the card
        const initialStagingCount = game.stagingArea.length;
        const initialDiscardCount = game.encounterDiscard.length;
        const initialEngagedCount = game.engagedEnemies.length;
        const initialAttachedCount = game.heroes.reduce((s, h) => s + (h.attached ? h.attached.length : 0), 0);

        // State-polling loop to unlock UI once the card lands in play/discard
        const checkRevealed = setInterval(() => {
            const currentStagingCount = game.stagingArea.length;
            const currentDiscardCount = game.encounterDiscard.length;
            const currentEngagedCount = game.engagedEnemies.length;
            const currentAttachedCount = game.heroes.reduce((s, h) => s + (h.attached ? h.attached.length : 0), 0);
            
            if (currentStagingCount > initialStagingCount || 
                currentDiscardCount > initialDiscardCount || 
                currentEngagedCount > initialEngagedCount || 
                currentAttachedCount > initialAttachedCount ||
                game.gameOver) {
                
                clearInterval(checkRevealed);
                setTimeout(() => {
                    window._watchfulCardRevealing = false;
                }, 400); // 400ms buffer to allow card landing animations to finish
            }
        }, 100);

        // Suspend any incoming revealEncounterCard checks by simulating an open attach dialog
        const attachOverlay = document.getElementById('attach-confirm-overlay');
        let origDisplay = 'none';
        let origOpacity = '';
        let origPointerEvents = '';
        if (attachOverlay) {
            origDisplay = attachOverlay.style.display;
            origOpacity = attachOverlay.style.opacity;
            origPointerEvents = attachOverlay.style.pointerEvents;
            
            attachOverlay.style.opacity = '0';
            attachOverlay.style.pointerEvents = 'none';
            attachOverlay.style.display = 'flex';
        }

        const snd = new Audio('./sound_effects/dark_of_mirkwood/watchful_eyes_resolve.mp3');
        snd.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
        snd.play().catch(() => {});

        setTimeout(() => {
            window.triggerWatchfulEyesVisualEffect(watchfulCard._uid, () => {
                if (attachOverlay) {
                    attachOverlay.style.display = origDisplay;
                    attachOverlay.style.opacity = origOpacity;
                    attachOverlay.style.pointerEvents = origPointerEvents;
                }
                _watchfulResolving = false;
            });
        }, 100);
    };

    const initWatchfulObserver = () => {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            setTimeout(initWatchfulObserver, 250);
            return;
        }
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.classList.contains('toast')) {
                        const titleEl = node.querySelector('.t-title');
                        if (titleEl) {
                            const titleText = titleEl.textContent.trim();
                            if (titleText === window.t("Watchful Eyes") || titleText === "Watchful Eyes") {
                                if (node.textContent.includes("Forced") || node.textContent.includes("强制")) {
                                    window.handleWatchfulEyesActivation();
                                }
                            }
                        }
                    }
                });
            });
        });
        observer.observe(toastContainer, { childList: true });
    };
    initWatchfulObserver();

    // Global capture-phase input blockers active during Watchful Eyes resolution
    document.addEventListener('click', (e) => {
        if (window._watchfulCardRevealing) {
            if (e.target && e.target.closest('#modal-overlay, .modal, #enlarge-overlay, #attach-confirm-overlay, #resource-chooser-overlay, #quest-reveal')) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);

    document.addEventListener('contextmenu', (e) => {
        if (window._watchfulCardRevealing) {
            if (e.target && e.target.closest('#modal-overlay, .modal, #enlarge-overlay, #attach-confirm-overlay, #resource-chooser-overlay, #quest-reveal')) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);

    document.addEventListener('dragstart', (e) => {
        if (window._watchfulCardRevealing) {
            if (e.target && e.target.closest('#modal-overlay, .modal, #enlarge-overlay, #attach-confirm-overlay, #resource-chooser-overlay, #quest-reveal')) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);

    window._triggerCaveTorchBurn = function(card, startRect, onComplete) {
        const uid = card._uid || Math.random().toString(36).slice(2);

        const snd = new Audio('./sound_effects/cave_torch_dead.mp3');
        snd.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
        snd.play().catch(() => {});

        const cardW = (startRect && startRect.width) ? startRect.width : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144);
        const cardH = (startRect && startRect.height) ? startRect.height : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202);

        const padX = 30;
        const padY = 60;

        const ghost = document.createElement('div');
        ghost.style.cssText = `
            position: fixed; z-index: 9999;
            left: ${startRect.left}px; top: ${startRect.top}px;
            width: ${cardW}px; height: ${cardH}px;
            pointer-events: none; border-radius: 6px; background: transparent;
            transform: none !important; margin: 0 !important;
            overflow: visible;
        `;
        
        const filterId = 'film-burn-' + uid;
        const imgUrl = card.img || 'cards/dark_of_mirkwood/caves_of_nibin/cave_torch.jpg';
        
        ghost.innerHTML = `
            <svg width="0" height="0" style="position:absolute;">
                <filter id="${filterId}" color-interpolation-filters="sRGB" x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="${Math.random()*100}" result="noise" />
                    
                    <feColorMatrix class="burn-alpha" in="noise" result="cardMask" type="matrix" 
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  25 0 0 0 2" />
                    <feComposite in="SourceGraphic" in2="cardMask" operator="in" result="cardCut" />
                    
                    <feColorMatrix class="burn-glow-mask" in="noise" result="glowMask" type="matrix" 
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  25 0 0 0 3.2" />
                    <feComposite in="glowMask" in2="cardMask" operator="out" result="rawEdge" />
                    <feComposite in="rawEdge" in2="SourceGraphic" operator="in" result="clippedEdge" />
                    
                    <feColorMatrix in="clippedEdge" result="coloredEdge" type="matrix" 
                        values="0 0 0 0 1.0
                                0 0 0 0 0.45
                                0 0 0 0 0.0
                                0 0 0 3.0 0" />
                    <feGaussianBlur in="coloredEdge" stdDeviation="0.5" result="blurredEdge" />
                    <feComposite in="blurredEdge" in2="SourceGraphic" operator="in" result="finalGlow" />
                    
                    <feMerge>
                        <feMergeNode in="finalGlow" />
                        <feMergeNode in="coloredEdge" />
                        <feMergeNode in="cardCut" />
                    </feMerge>
                </filter>
            </svg>
            <div style="width:100%; height:100%; overflow:hidden; border-radius:6px; position:absolute; inset:0;">
                <img src="${imgUrl}" style="width:100%; height:100%; object-fit:cover; border-radius:6px; filter:url(#${filterId}); position:relative; z-index:2;">
            </div>
            <canvas class="burn-p-canvas" style="position:absolute; left:-${padX}px; top:-${padY}px; width:${cardW + padX*2}px; height:${cardH + padY*2}px; pointer-events:none; z-index:10;"></canvas>
        `;
        document.body.appendChild(ghost);

        const canvas = ghost.querySelector('.burn-p-canvas');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = (cardW + padX*2) * dpr;
        canvas.height = (cardH + padY*2) * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        const alpha = ghost.querySelector('.burn-alpha');
        const glowAlpha = ghost.querySelector('.burn-glow-mask');

        const particles = [];

        function spawnBurnParticles() {
            const spawnX = padX + Math.random() * cardW;
            const spawnY = padY + Math.random() * cardH;

            // Sparks
            for (let i = 0; i < 2; i++) {
                particles.push({
                    type: 'spark',
                    x: spawnX + (Math.random() - 0.5) * 20,
                    y: spawnY + (Math.random() - 0.5) * 20,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: -1.5 - Math.random() * 2.5,
                    life: 1.0,
                    decay: 0.03 + Math.random() * 0.03,
                    size: 1.2 + Math.random() * 1.8,
                    color: Math.random() > 0.3 ? '#ffcc00' : (Math.random() > 0.5 ? '#ff5500' : '#ffffff')
                });
            }

            // Smoke
            if (Math.random() < 0.6) {
                particles.push({
                    type: 'smoke',
                    x: spawnX,
                    y: spawnY,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: -0.6 - Math.random() * 1.2,
                    life: 1.0,
                    decay: 0.015 + Math.random() * 0.015,
                    size: 4 + Math.random() * 4,
                    maxSize: 18 + Math.random() * 12
                });
            }

            // Card Ash pieces
            if (Math.random() < 0.5) {
                particles.push({
                    type: 'ash',
                    x: spawnX,
                    y: spawnY,
                    vx: (Math.random() - 0.5) * 2.0,
                    vy: -1.0 - Math.random() * 1.8,
                    life: 1.0,
                    decay: 0.02 + Math.random() * 0.02,
                    sizeW: 2 + Math.random() * 4,
                    sizeH: 2 + Math.random() * 4,
                    rot: Math.random() * Math.PI * 2,
                    vrot: (Math.random() - 0.5) * 0.2,
                    color: Math.random() > 0.5 ? '#1a0e08' : '#2b1b10'
                });
            }
        }

        function updateAndDrawParticles() {
            ctx.clearRect(0, 0, cardW + padX*2, cardH + padY*2);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.save();
                ctx.globalAlpha = Math.max(0, p.life);

                if (p.type === 'spark') {
                    ctx.fillStyle = p.color;
                    ctx.shadowColor = '#ff6600';
                    ctx.shadowBlur = 4;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.type === 'smoke') {
                    const currentSize = p.size + (1 - p.life) * (p.maxSize - p.size);
                    ctx.fillStyle = 'rgba(60, 50, 45, 0.25)';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.type === 'ash') {
                    ctx.translate(p.x, p.y);
                    p.rot += p.vrot;
                    ctx.rotate(p.rot);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.sizeW / 2, -p.sizeH / 2, p.sizeW, p.sizeH);
                }

                ctx.restore();
            }
        }

        let progress = 0;
        const burnInterval = setInterval(() => {
            progress += 0.014;

            if (progress < 0.95) {
                spawnBurnParticles();
            }

            updateAndDrawParticles();

            if (alpha && glowAlpha) {
                const offsetVal = 2 - (progress * 28);
                const glowOffsetVal = offsetVal + 1.2;
                alpha.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  25 0 0 0 ${offsetVal}`);
                glowAlpha.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  25 0 0 0 ${glowOffsetVal}`);
            }

            if (progress >= 1 && particles.length === 0) {
                clearInterval(burnInterval);
                ghost.style.transition = 'opacity 0.3s ease';
                ghost.style.opacity = '0';
                setTimeout(() => {
                    ghost.remove();
                    if (onComplete) onComplete();
                }, 300);
            }
        }, 30);
    };

    const origDiscardCard = window.discardCard;
		if (origDiscardCard && !window._nibinDiscardPatched) {
				window._nibinDiscardPatched = true;
				window.discardCard = function(card, targetPile, skipAnimate, startRect) {
						const engine = window.LotrEngine;
						const game = engine ? engine.game : null;
						const parent = (game && card._attachedToUid) ? [...game.heroes, ...game.allies].find(x => x._uid === card._attachedToUid) : null;
						
						if (card && card.id === 'nibin_cave_torch' && parent) {
								const el = document.querySelector(`.is-attachment[data-uid="${card._uid}"]`) || document.querySelector(`[data-uid="${card._uid}"]`);
								let sRect = startRect || (el ? el.getBoundingClientRect() : null);
								if (!sRect || (sRect.width === 0 && sRect.height === 0)) {
										sRect = { left: window.innerWidth / 2 - 72, top: window.innerHeight / 2 - 101, width: 144, height: 202 };
								}
								
								if (el) el.style.opacity = '0';
								if (engine && engine.toast) {
										engine.toast('Removed from Game', 'Cave Torch is removed from the game!', 'danger', 4000);
								}
								
								if (parent && parent.attached) {
										parent.attached = parent.attached.filter(a => a._uid !== card._uid);
								}
								delete card._attachedToUid;

								window._triggerCaveTorchBurn(card, sRect, () => {
										if (engine && engine.render) engine.render();
								});
								return;
						}
						return origDiscardCard.apply(this, arguments);
				};
		}

		const origAnimateCardToDiscard = window._animateCardToDiscard;
		if (origAnimateCardToDiscard && !window._nibinAnimateDiscardPatched) {
				window._nibinAnimateDiscardPatched = true;
				window._animateCardToDiscard = function(card, isPlayer, callback, startRect) {
						if (card && card.id === 'nibin_watchful_eyes') {
								isPlayer = false;
								card._tempDestId = 'encounter-discard-pile';
						}
						return origAnimateCardToDiscard.call(this, card, isPlayer, callback, startRect);
				};
		}

    const origAnimateReturnToStaging = window.animateReturnToStaging;
    if (origAnimateReturnToStaging && !window._nibinReturnStagingPatched) {
        window._nibinReturnStagingPatched = true;
        window.animateReturnToStaging = function(card, callback) {
            if (card) card._returnedToStaging = true;
            const engine = window.LotrEngine;
            const game = engine ? engine.game : null;

            if (card && game && game.stagingArea && game.stagingArea.some(x => x._uid === card._uid) && (!game.engagedEnemies || !game.engagedEnemies.some(x => x._uid === card._uid))) {
                if (callback) callback();
                return;
            }

            const parent = (game && card._attachedToUid) ? [...game.heroes, ...game.allies].find(x => x._uid === card._attachedToUid) : null;
            
            if (card && card.id === 'nibin_cave_torch' && parent) {
                const el = document.querySelector(`.is-attachment[data-uid="${card._uid}"]`) || document.querySelector(`[data-uid="${card._uid}"]`);
                let sRect = el ? el.getBoundingClientRect() : null;
                if (!sRect || (sRect.width === 0 && sRect.height === 0)) {
                    sRect = { left: window.innerWidth / 2 - 72, top: window.innerHeight / 2 - 101, width: 144, height: 202 };
                }
                
                if (el) el.style.opacity = '0';
                if (engine && engine.toast) {
                    engine.toast('Removed from Game', 'Cave Torch is removed from the game!', 'danger', 4000);
                }
                
                if (parent && parent.attached) {
                    parent.attached = parent.attached.filter(a => a._uid !== card._uid);
                }
                delete card._attachedToUid;

                window._triggerCaveTorchBurn(card, sRect, () => {
                    if (engine && engine.render) engine.render();
                });
                return;
            }
            if (origAnimateReturnToStaging) origAnimateReturnToStaging.apply(this, arguments);
        };
    }

    document.addEventListener('click', (e) => {
        if (window._blockNextClick || window._draggingActive) return;
        const attEl = e.target ? e.target.closest('.is-attachment') : null;
        if (!attEl) return;
        const uid = attEl.getAttribute('data-uid');
        const heroUid = attEl.getAttribute('data-hero-uid');
        if (!uid || !heroUid) return;
        const card = window._cardRegistry ? window._cardRegistry[uid] : null;
        if (card && card.id === 'nibin_cave_torch' && !card.exhausted && !card._isActivating) {
            e.stopPropagation();
            e.preventDefault();
            if (window._activateAttachment) {
                window._activateAttachment(uid, heroUid);
            }
        }
    }, true);

    const origActivateAttachment = window._activateAttachment;
    window._activateAttachment = function(evOrUid, attUidOrHeroUid, heroUid) {
        if (window._blockNextClick || window._draggingActive) return;
        let attUid = evOrUid;
        let targetHeroUid = attUidOrHeroUid;
        if (evOrUid && typeof evOrUid === 'object') {
            attUid = attUidOrHeroUid;
            targetHeroUid = heroUid;
        }
        const card = window._cardRegistry ? window._cardRegistry[attUid] : null;
        if (card && card.id === 'nibin_cave_torch' && !card.exhausted && !card._isActivating) {
            if (card.onClick) {
                card.onClick(card, window.LotrEngine ? window.LotrEngine.game : null, window.LotrEngine);
                return;
            }
        }
        if (origActivateAttachment) origActivateAttachment(evOrUid, attUidOrHeroUid, heroUid);
    };

    // Global Cavern Warg Attack Response Watcher (active globally across all quest stages)
    setInterval(() => {
        const engine = window.LotrEngine;
        const game = engine ? engine.game : null;
        if (!game || !engine) return;

        ['playerDiscard', 'encounterDiscard', 'victoryDisplay'].forEach(pile => {
            if (game[pile]) {
                const idx = game[pile].findIndex(c => c.id === 'nibin_cave_torch');
                if (idx >= 0) game[pile].splice(idx, 1);
            }
        });
        if (game.playerDiscards) {
            game.playerDiscards.forEach(pd => {
                const idx = pd.findIndex(c => c.id === 'nibin_cave_torch');
                if (idx >= 0) pd.splice(idx, 1);
            });
        }

        const attacker = game.currentEnemyAttacking;
        if (attacker && attacker.id === 'nibin_cavern_warg' && !attacker._wargPrompted) {
            let torch = null;
            let torchOwnerIdx = 0;
            [...game.heroes, ...game.allies].forEach(char => {
                if (char.attached) {
                    const t = char.attached.find(a => a.id === 'nibin_cave_torch' && !a.exhausted);
                    if (t) {
                        torch = t;
                        torchOwnerIdx = char._ownerIdx !== undefined ? char._ownerIdx : 0;
                    }
                }
            });
            if (torch) {
                attacker._wargPrompted = true;
                
                const title = "Cavern Warg Response";
                const prompt = `<span style="font-size:1.6rem; font-weight:bold; color:var(--gold-bright); display:block; line-height:1.35; text-align:center; margin-bottom:12px;">Exhaust Cave Torch to cancel Cavern Warg's attack <br>and return it to the staging area?</span>`;
                
                const handleConfirm = () => {
                    const proceed = () => {
                        torch.exhausted = true;
                        
                        if (window.setActionBar) window.setActionBar([]);
                    if (window.setActionInfo) window.setActionInfo("Cavern Warg's attack was cancelled. Resolving Cave Torch...");
                    
                    attacker._activeAttacker = false;
                    game.currentEnemyAttacking = null;
                    game.pendingAction = null;
                    attacker._attackedThisRound = true;
                    
                    const ghost = window._activeEncounterGhost || (engine.window && engine.window._activeEncounterGhost);
                    if (ghost) {
                        ghost.remove();
                        if (engine.window) engine.window._activeEncounterGhost = null;
                        window._activeEncounterGhost = null;
                    }
                    attacker._isAnimatingTravel = true;
                    if (engine && engine.render) engine.render();

                    const resumeCombat = () => {
                        setTimeout(() => {
                            const remaining = game.engagedEnemies.filter(e => {
                                const isSnared = e.attached && e.attached.some(a => a.id === 'forest_snare');
                                return !e._attackedThisRound && !e._doesNotAttack && !isSnared;
                            });
                            if (remaining.length > 0 && engine.window && engine.window.resolveEnemyAttacks) {
                                engine.window.resolveEnemyAttacks();
                            } else if (engine.window && engine.window.playerAttacks) {
                                engine.window.playerAttacks();
                            }
                        }, 600);
                    };

                    const triggerForcedTorch = () => {
                        const doDiscard = () => {
                            if (!game.encounterDeck || game.encounterDeck.length === 0) {
                                if (game.encounterDiscard && game.encounterDiscard.length > 0) {
                                    game.encounterDeck = engine.shuffle(game.encounterDiscard);
                                    game.encounterDiscard = [];
                                }
                            }
                            if (game.encounterDeck && game.encounterDeck.length > 0) {
                                const top = game.encounterDeck.pop();
                                if (top.type === 'enemy') {
                                    engine.toast("Cave Torch", `Forced: Discarded ${top.name} — it is an enemy! Added to staging.`, "danger");
                                    if (engine.window && engine.window.animateDrawDirectToStaging) {
                                        engine.window.animateDrawDirectToStaging(top, () => {
                                            game.stagingArea.push(top);
                                            engine.render();
                                            resumeCombat();
                                        });
                                    } else {
                                        game.stagingArea.push(top);
                                        engine.render();
                                        resumeCombat();
                                    }
                                } else {
                                    engine.toast("Cave Torch", `Forced: Discarded ${top.name}.`, "info");
                                    const deckEl = document.getElementById('encounter-deck-pile');
                                    const discardEl = document.getElementById('encounter-discard-pile');
                                    if (deckEl && discardEl) {
                                        const dRect = deckEl.getBoundingClientRect();
                                        const discRect = discardEl.getBoundingClientRect();
                                        const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                                        const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                                        
                                        const ghost = document.createElement('div');
                                        ghost.style.cssText = `
                                            position: fixed; z-index: 1000;
                                            width: ${cardW}px; height: ${cardH}px;
                                            left: ${dRect.left}px; top: ${dRect.top}px;
                                            transform: scale(${dRect.width / cardW});
                                            transform-origin: top left;
                                            transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                                            pointer-events: none;
                                            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
                                            border-radius: 6px; overflow: hidden;
                                        `;
                                        const topImg = top.img || 'cards/dark_of_mirkwood/caves_of_nibin/cave_torch.jpg';
                                        ghost.innerHTML = `<img src="${topImg}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
                                        ghost.className = 'card encounter-location';
                                        document.body.appendChild(ghost);
                                        
                                        void ghost.offsetWidth;

                                        ghost.style.left = `${discRect.left}px`;
                                        ghost.style.top = `${discRect.top}px`;
                                        ghost.style.transform = `scale(${discRect.width / cardW})`;
                                        
                                        if (window.SoundFX) window.SoundFX.playWhoosh();

                                        setTimeout(() => {
                                            ghost.remove();
                                            game.encounterDiscard.push(top);
                                            engine.render();
                                            resumeCombat();
                                        }, 500);
                                    } else {
                                        game.encounterDiscard.push(top);
                                        engine.render();
                                        resumeCombat();
                                    }
                                }
                            } else {
                                resumeCombat();
                            }
                        };
                        if (engine.window && engine.window.checkEmptyEncounterDeck) {
                            engine.window.checkEmptyEncounterDeck(doDiscard);
                        } else {
                            doDiscard();
                        }
                    };
                    
                    const animateFn = window.animateReturnToStaging || (engine.window && engine.window.animateReturnToStaging);
                    if (animateFn) {
                            animateFn(attacker, () => {
                                delete attacker._isAnimatingTravel;
                                if (window.cardPositions) delete window.cardPositions[attacker._uid];
                                delete attacker._engagedWithPlayerIdx;
                                game.engagedEnemies = game.engagedEnemies.filter(e => e._uid !== attacker._uid);
                                if (!game.stagingArea.some(e => e._uid === attacker._uid)) {
                                    game.stagingArea.push(attacker);
                                }
                                attacker._attackedThisRound = false;
                                engine.toast("Cavern Warg", "Exhausted Cave Torch to cancel Cavern Warg's attack!", "success");
                                engine.render();
                                triggerForcedTorch();
                            });
                        } else {
                            delete attacker._isAnimatingTravel;
                            triggerForcedTorch();
                        }
                    };

                    if (game.numPlayers > 1 && game.activeTabPlayerIdx !== torchOwnerIdx) {
                        if (window._switchTab) window._switchTab(torchOwnerIdx);
                        else { game.activeTabPlayerIdx = torchOwnerIdx; engine.render(); }
                        setTimeout(proceed, 300);
                    } else {
                        proceed();
                    }
                };
                
                if (engine.showConfirmModal) {
                    engine.showConfirmModal(title, prompt, handleConfirm, () => {});
                } else if (window.showConfirmModal) {
                    window.showConfirmModal(title, prompt, handleConfirm, () => {});
                } else if (engine.window && engine.window.showConfirmModal) {
                    engine.window.showConfirmModal(title, prompt, handleConfirm, () => {});
                }
            }
        } else if (!attacker) {
            if (game.engagedEnemies) {
                game.engagedEnemies.forEach(e => {
                    if (e.id === 'nibin_cavern_warg') delete e._wargPrompted;
                });
            }
            if (game.stagingArea) {
                game.stagingArea.forEach(e => {
                    if (e.id === 'nibin_cavern_warg') delete e._wargPrompted;
                });
            }
        }
    }, 100);
}

window.LotrExpansions['dark_of_nibin'] = {
    questStages: [
        {
            stage: 1, side: 'B', name: 'The Dark of Nibin-Dûm', questPts: 8, trait: 'Nibin-Dum',
            imgA: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/The-Dark-of-Nibin-D%C3%BBm-1A.jpg',
            imgB: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/The-Dark-of-Nibin-D%C3%BBm-1B.jpg',
            paletteIdx: 2, // Dark/Cave Palette
            onSetup: function(stage, game, engine) {
                // Prevent other expansion global modifiers from leaking onto Nibin cards
                if (window.ENCOUNTER_DECK_TEMPLATE) {
                    window.ENCOUNTER_DECK_TEMPLATE.forEach(c => {
                        if (c.id && c.id !== 'global_nibin_modifiers' && (c.id.startsWith('oath_') || c.id.includes('global'))) {
                            if (c.getAttackMod && !c._nibinPatched) {
                                const origAtk = c.getAttackMod;
                                c.getAttackMod = function(card, target, game) {
                                    if (card && card.id && card.id.startsWith('nibin_')) return 0;
                                    try {
                                        const res = origAtk.apply(this, arguments);
                                        return (typeof res === 'number' && !isNaN(res)) ? res : 0;
                                    } catch (e) { return 0; }
                                };
                            }
                            if (c.getDefenseMod && !c._nibinPatched) {
                                const origDef = c.getDefenseMod;
                                c.getDefenseMod = function(card, game) {
                                    if (card && card.id && card.id.startsWith('nibin_')) return 0;
                                    try {
                                        const res = origDef.apply(this, arguments);
                                        return (typeof res === 'number' && !isNaN(res)) ? res : 0;
                                    } catch (e) { return 0; }
                                };
                            }
                            c._nibinPatched = true;
                        }
                        
                        if (c.id === 'global_nibin_modifiers' && !c._nibinSafetyPatched) {
                            if (c.getAttackMod) {
                                const origAtk = c.getAttackMod;
                                c.getAttackMod = function() {
                                    try {
                                        const res = origAtk.apply(this, arguments);
                                        return (typeof res === 'number' && !isNaN(res)) ? res : 0;
                                    } catch (e) { return 0; }
                                };
                            }
                            c._nibinSafetyPatched = true;
                        }
                    });
                }

                window.triggerChieftainSmokeOff = function(cardUid) {
										const cardEls = document.querySelectorAll(`[data-uid="${cardUid}"]`);
										if (cardEls.length === 0) return;
										
										const snd = new Audio('./sound_effects/dark_of_mirkwood/chieftain_shield_down.mp3');
										snd.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
										snd.play().catch(() => {});
										
										cardEls.forEach(el => {
												const rect = el.getBoundingClientRect();
                        if (rect.width === 0 || rect.height === 0) return;
                        
                        const padX = 110;
                        const padTop = 450;
                        const padBottom = 40;
                        const cWidth = rect.width + padX * 2;
                        const cHeight = rect.height + padTop + padBottom;

                        const canvas = document.createElement('canvas');
                        const dpr = window.devicePixelRatio || 1;
                        canvas.width = cWidth * dpr;
                        canvas.height = cHeight * dpr;
                        canvas.style.cssText = `
                            position: fixed;
                            left: ${rect.left - padX}px;
                            top: ${rect.top - padTop}px;
                            width: ${cWidth}px;
                            height: ${cHeight}px;
                            pointer-events: none;
                            z-index: 10100;
                        `;
                        document.body.appendChild(canvas);

                        const ctx = canvas.getContext('2d');
                        ctx.scale(dpr, dpr);

                        const particles = [];
                        const cardLeft = padX;
                        const cardTop = padTop;

                        const duration = 2300;
												const startTime = Date.now();

												function spawnParticles() {
														const elapsed = Date.now() - startTime;
														if (elapsed > duration - 500) return;

														for (let i = 0; i < 3; i++) {
																const isDark = Math.random() > 0.45;
																particles.push({
																		type: 'smoke',
																		x: cardLeft + Math.random() * rect.width,
																		y: cardTop + Math.random() * rect.height,
																		vx: (Math.random() - 0.5) * 1.5,
																		vy: -1.5 - Math.random() * 2.5,
																		size: 9 + Math.random() * 11,
																		maxSize: 34 + Math.random() * 28,
																		life: 1.0,
																		decay: 0.011 + Math.random() * 0.014,
																		color: isDark ? 'rgba(25, 25, 25, ' : 'rgba(240, 240, 240, ',
																		isDark: isDark
																});
														}

														for (let i = 0; i < 2; i++) {
																particles.push({
																		type: 'spark',
																		x: cardLeft + Math.random() * rect.width,
																		y: cardTop + Math.random() * rect.height,
																		vx: (Math.random() - 0.5) * 2.2,
																		vy: -2.5 - Math.random() * 3.5,
																		size: 1.2 + Math.random() * 1.8,
																		life: 1.0,
																		decay: 0.018 + Math.random() * 0.024,
																		color: Math.random() > 0.4 ? '#ffffff' : '#b0b0b0'
																});
														}
												}

												function loop() {
														ctx.clearRect(0, 0, cWidth, cHeight);

														const freshEl = document.querySelector(`[data-uid="${cardUid}"]`);
														if (freshEl) {
																const fRect = freshEl.getBoundingClientRect();
																canvas.style.left = `${fRect.left - padX}px`;
																canvas.style.top = `${fRect.top - padTop}px`;
														}

														spawnParticles();

														for (let i = particles.length - 1; i >= 0; i--) {
																const p = particles[i];
																p.x += p.vx;
																p.y += p.vy;
																p.vx += (Math.random() - 0.5) * 0.2;
																p.life -= p.decay;

																if (p.life <= 0) {
																		particles.splice(i, 1);
																		continue;
																}

																ctx.save();
																if (p.type === 'spark') {
																		ctx.globalAlpha = Math.max(0, p.life);
																		ctx.fillStyle = p.color;
																		ctx.shadowColor = '#ffffff';
																		ctx.shadowBlur = 6;
																		ctx.beginPath();
																		ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
																		ctx.fill();
																} else if (p.type === 'smoke') {
																		const curSize = p.size + (1 - p.life) * (p.maxSize - p.size);
																		const edgeFade = Math.min(1, Math.max(0, p.y / Math.max(1, curSize * 1.5)));
																		const alpha = Math.max(0, p.life * (p.isDark ? 0.55 : 0.45) * edgeFade);
																		ctx.globalAlpha = alpha;
																		ctx.fillStyle = p.color + (p.life * (p.isDark ? 0.6 : 0.45) * edgeFade) + ')';
																		ctx.shadowColor = p.isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.7)';
																		ctx.shadowBlur = 10;
																		ctx.beginPath();
																		ctx.arc(p.x, p.y, curSize, 0, Math.PI * 2);
																		ctx.fill();
																}
																ctx.restore();
														}

														const elapsed = Date.now() - startTime;
														if (elapsed < duration || particles.length > 0) {
																requestAnimationFrame(loop);
														} else {
																canvas.remove();
														}
												}
												requestAnimationFrame(loop);
										});
								};

								window.updateChieftainAura = function() {
										if (!game) return;
										const currentStage = window.QUEST_STAGES ? window.QUEST_STAGES[game.questStageIdx] : null;
										const isStage4 = currentStage && currentStage.name === 'Oathkeepers';
										const has8Progress = game.questProgress >= 8;
										const isInvincible = !isStage4 || !has8Progress;

										const allEnemies = [...(game.stagingArea || []), ...(game.engagedEnemies || []), ...(game.outOfPlay || [])];
										allEnemies.forEach(c => {
												if (c.id === 'nibin_goblin_chieftain' || c.id === 'goblin_chieftain') {
														const cardEls = document.querySelectorAll(`[data-uid="${c._uid}"]`);
														cardEls.forEach(el => {
																let aura = el.querySelector('.chieftain-invincible-overlay');
																if (isInvincible) {
																		delete c._nibinFadeOutStartTime;

																		if (!aura) {
																				if (!c._nibinRipplePos) {
																						c._nibinRipplePos = {
																								r1_top: Math.floor(15 + Math.random() * 30),
																								r1_left: Math.floor(15 + Math.random() * 30),
																								r2_top: Math.floor(50 + Math.random() * 30),
																								r2_left: Math.floor(50 + Math.random() * 30),
																								r3_top: Math.floor(30 + Math.random() * 40),
																								r3_left: Math.floor(30 + Math.random() * 40)
																						};
																				}
																				const pos = c._nibinRipplePos;
																				
																				if (!window._nibinAuraStartTime) window._nibinAuraStartTime = Date.now();
																				const elapsed = (Date.now() - window._nibinAuraStartTime) / 1000;
																				
																				const d1 = -(elapsed % 6);
																				const d2 = -((elapsed + 4) % 6);
																				const d3 = -((elapsed + 2) % 6);

																				aura = document.createElement('div');
																				aura.className = 'chieftain-invincible-overlay';
																				
																				const stoodInvincible = c._chieftainInvinciblePrev === true;
																				if (!stoodInvincible) {
																						aura.style.opacity = '0';
																						aura.style.transition = 'none';
																				} else {
																						aura.style.opacity = '1';
																						aura.style.transition = 'none';
																				}

																				aura.innerHTML = `
																						<div class="chieftain-puddle-container">
																								<div class="drop-ripple" style="top: ${pos.r1_top}%; left: ${pos.r1_left}%; animation-delay: ${d1}s;"></div>
																								<div class="drop-ripple" style="top: ${pos.r2_top}%; left: ${pos.r2_left}%; animation-delay: ${d2}s;"></div>
																								<div class="drop-ripple" style="top: ${pos.r3_top}%; left: ${pos.r3_left}%; animation-delay: ${d3}s;"></div>
																						</div>
																				`;
																				el.appendChild(aura);

																				if (!stoodInvincible) {
																						void aura.offsetWidth;
																						aura.style.transition = 'opacity 1.5s ease-in-out';
																						aura.style.opacity = '1';
																				}
																		} else if (aura.classList.contains('smoking-off')) {
																				aura.classList.remove('smoking-off');
																				aura.style.transition = 'opacity 1.5s ease-in-out';
																				aura.style.opacity = '1';
																		}
																		c._chieftainInvinciblePrev = true;
																} else {
																		const fadeOutDuration = 2300;
																		
																		if (c._chieftainInvinciblePrev === true) {
																				c._nibinFadeOutStartTime = Date.now();
																				c._chieftainInvinciblePrev = false;
																				if (window.triggerChieftainSmokeOff) {
																						window.triggerChieftainSmokeOff(c._uid);
																				}
																		}

                                    const isFading = c._nibinFadeOutStartTime && (Date.now() - c._nibinFadeOutStartTime < fadeOutDuration);

                                    if (isFading) {
                                        const elapsed = Date.now() - c._nibinFadeOutStartTime;
                                        const remainingTime = fadeOutDuration - elapsed;

                                        if (aura && !aura.classList.contains('smoking-off')) {
                                            aura.classList.add('smoking-off');
                                            setTimeout(() => {
                                                if (aura.classList.contains('smoking-off')) {
                                                    aura.remove();
                                                }
                                            }, remainingTime);
                                        }
                                    } else {
                                        delete c._nibinFadeOutStartTime;
                                        if (aura) aura.remove();
                                    }
                                    c._chieftainInvinciblePrev = false;
                                }
                            });
                        }
                    });
                };

                        const optObserver = new MutationObserver(() => {
                            optObserver.disconnect();
                            window.updateChieftainAura();
                            optObserver.observe(document.body, { childList: true, subtree: true });
                        });
                        if (document.body) {
                            optObserver.observe(document.body, { childList: true, subtree: true });
                        } else {
                            document.addEventListener('DOMContentLoaded', () => {
                                optObserver.observe(document.body, { childList: true, subtree: true });
                            });
                        }

                        // Allow Goblin Chieftain to take damage and be targeted only when on Stage 4 (Oathkeepers) with 8+ progress
                        setInterval(() => {
                            if (!game) return;
                            window.updateChieftainAura();
                            
                            const allEnemies = [...(game.stagingArea || []), ...(game.engagedEnemies || []), ...(game.outOfPlay || [])];
                            const currentStage = window.QUEST_STAGES ? window.QUEST_STAGES[game.questStageIdx] : null;
                            const isStage4 = currentStage && currentStage.name === 'Oathkeepers';
                            const has8Progress = game.questProgress >= 8;
                            const isInvincible = !isStage4 || !has8Progress;

                            allEnemies.forEach(c => {
                                if (c.id === 'nibin_goblin_chieftain' || c.id === 'goblin_chieftain') {
                                    const typeDesc = Object.getOwnPropertyDescriptor(c, 'type');
                                    if (!c._damageLocked || !typeDesc || !typeDesc.get) {
                                        c._damageLocked = true;
                                        
                                        // Lock damage property based on Stage 4 progress criteria
                                        Object.defineProperty(c, 'damage', {
                                            get: function() { return this._damage || 0; },
                                            set: function(val) {
                                                if (isInvincible) {
                                                    if (val > (this._damage || 0) && engine && engine.toast) {
                                                        engine.toast('Goblin Chieftain', 'Goblin Chieftain cannot take damage right now!', 'warning');
                                                    }
                                                } else {
                                                    this._damage = val;
                                                }
                                            },
                                            configurable: true
                                        });

                                        // Temporarily override type property during player attack phase to prevent targeting
                                        Object.defineProperty(c, 'type', {
                                            get: function() {
                                                if (game.phase === 'combat-player-attack' && isInvincible) {
                                                    return 'enemy-immune';
                                                }
                                                return 'enemy';
                                            },
                                            configurable: true,
                                            enumerable: true
                                        });
                                    }
                                }
                            });
                        }, 250);

                        // Unified combat monitor for Chieftain, Cave-troll, and Collapsed Mine Shadow
                let lastAttackerUid = null;
                let lastAttackerId = null;
                const originalDescriptors = new Map();

                setInterval(() => {
                    if (!game || !engine) return;
                    const currentAttacker = game.currentEnemyAttacking;
                    const attackerUid = currentAttacker ? currentAttacker._uid : null;

                    if (attackerUid !== lastAttackerUid) {
                        // 1. Restore previous hooks if any
                        originalDescriptors.forEach((desc, charUid) => {
                            const char = [...game.heroes, ...game.allies].find(c => c._uid === charUid);
                            if (char) {
                                Object.defineProperty(char, 'damage', desc);
                            }
                        });
                        originalDescriptors.clear();

                        // 2. Trigger extra attacks and Chieftain's Forced effect after its attack completes
                        if (!attackerUid && lastAttackerUid) {
                            const endedAttacker = [...(game.engagedEnemies || []), ...(game.stagingArea || [])].find(e => e._uid === lastAttackerUid);
                            
                            if (endedAttacker && (endedAttacker.damage || 0) < (endedAttacker.hp || 99)) {
                                const doExtraAttack = () => {
                                    if (endedAttacker._extraAttackPending > 0) {
                                        game._nibinBlockCombatTransitions = true;
                                        endedAttacker._extraAttackPending--;
                                        
                                        endedAttacker._activeAttacker = true;
                                        game.currentEnemyAttacking = endedAttacker;
                                        game.phase = 'combat-defend';
                                        game.pendingAction = null;

                                        if (window.setActionInfo) {
                                            window.setActionInfo(`Dealing shadow card for ${endedAttacker.name}'s extra attack...`);
                                        }
                                        if (window.setActionBar) {
                                            window.setActionBar([]);
                                        }

                                        const dealAndAttack = () => {
                                            if (game.encounterDeck.length === 0 && game.encounterDiscard.length > 0) {
                                                game.encounterDeck = engine.shuffle(game.encounterDiscard);
                                                game.encounterDiscard = [];
                                                if (engine.toast) engine.toast("Encounter Deck", "Reshuffled encounter discard pile into deck.", "info");
                                            }
                                            if (game.encounterDeck.length > 0) {
                                                const sc = game.encounterDeck.pop();
                                                const animShadow = window.animateShadowCard || (engine.window && engine.window.animateShadowCard);
                                                
                                                const currentShadows = endedAttacker.shadowCards || [];
                                                currentShadows.forEach(prevSc => {
                                                    prevSc._cancelled = true;
                                                    prevSc._revealed = true;
                                                    prevSc.shadow = '';
                                                });
                                                const newIdx = currentShadows.length;
                                                const nextShadows = [...currentShadows, sc];
                                                
                                                if (animShadow) {
                                                    animShadow(endedAttacker._uid, sc, () => {
                                                        endedAttacker.shadowCards = nextShadows;
                                                        endedAttacker._attackedThisRound = false;
                                                        if (engine.startEnemyAttack) engine.startEnemyAttack(endedAttacker);
                                                        else engine.render();
                                                    }, newIdx);
                                                } else {
                                                    endedAttacker.shadowCards = nextShadows;
                                                    endedAttacker._attackedThisRound = false;
                                                    if (engine.startEnemyAttack) engine.startEnemyAttack(endedAttacker);
                                                    else engine.render();
                                                }
                                            } else {
                                                endedAttacker._attackedThisRound = false;
                                                if (engine.startEnemyAttack) engine.startEnemyAttack(endedAttacker);
                                                else engine.render();
                                            }
                                        };

                                        if (engine.window && engine.window.checkEmptyEncounterDeck) {
                                            engine.window.checkEmptyEncounterDeck(dealAndAttack);
                                        } else {
                                            dealAndAttack();
                                        }
                                    } else {
                                        game._nibinBlockCombatTransitions = false;
                                        if (endedAttacker && (endedAttacker.id === 'nibin_goblin_chieftain' || endedAttacker.id === 'goblin_chieftain')) {
                                            const isInStaging = game.stagingArea && game.stagingArea.some(e => e._uid === endedAttacker._uid);
                                            if (isInStaging) {
                                                delete endedAttacker._engagedWithPlayerIdx;
                                            }
                                        }
                                        const remaining = game.engagedEnemies.filter(e => {
                                            const isSnared = e.attached && e.attached.some(a => a.id === 'forest_snare');
                                            return !e._attackedThisRound && !e._doesNotAttack && !isSnared;
                                        });
                                        if (remaining.length > 0) {
                                            if (engine.window && engine.window.resolveEnemyAttacks) {
                                                engine.window.resolveEnemyAttacks();
                                            } else if (window.resolveEnemyAttacks) {
                                                window.resolveEnemyAttacks();
                                            }
                                        } else {
                                            if (engine.window && engine.window.playerAttacks) {
                                                engine.window.playerAttacks();
                                            } else if (window.playerAttacks) {
                                                window.playerAttacks();
                                            }
                                        }
                                    }
                                };

                                if (lastAttackerId === 'nibin_goblin_chieftain' || lastAttackerId === 'goblin_chieftain') {
                                    const currentStage = (window.QUEST_STAGES && game) ? window.QUEST_STAGES[game.questStageIdx] : null;
                                    const x = currentStage ? (currentStage.stage || 1) : 1;
                                    const isInStaging = game.stagingArea.some(e => e._uid === endedAttacker._uid);
                                    
                                    game._nibinChieftainPromptActive = true;
                                    
                                    const options = [
                                        {label: `Remove ${x} progress from quest`, cb: () => {
                                            game.questProgress = Math.max(0, game.questProgress - x);
                                            engine.toast("Goblin Chieftain", `Removed ${x} progress.`, "danger");
                                            game._nibinChieftainPromptActive = false;
                                            engine.render();
                                            doExtraAttack();
                                        }}
                                    ];
                                    
                                    if (!isInStaging) {
                                        options.push({label: `Return to Staging Area`, cb: () => {
                                            engine.window.animateReturnToStaging(endedAttacker, () => {
                                                if (window.cardPositions) delete window.cardPositions[endedAttacker._uid];
                                                if (!endedAttacker._extraAttackPending || endedAttacker._extraAttackPending <= 0) {
                                                    delete endedAttacker._engagedWithPlayerIdx;
                                                }
                                                game.engagedEnemies = game.engagedEnemies.filter(e => e._uid !== endedAttacker._uid);
                                                game.stagingArea.push(endedAttacker);
                                                endedAttacker._activeAttacker = false;
                                                game._nibinChieftainPromptActive = false;
                                                engine.render();
                                                doExtraAttack();
                                            });
                                        }});
                                    }
                                    
                                    engine.window.showChoiceModal("Goblin Chieftain", `<span style="font-size:1.6rem;color:var(--parchment);">Forced: After Goblin Chieftain attacks, choose one:</span>`, options, true);
                                } else {
                                    game._nibinChieftainPromptActive = false;
                                    doExtraAttack();
                                }
                            } else {
                                game._nibinBlockCombatTransitions = false;
                                game._nibinChieftainPromptActive = false;
                                if (engine.window && engine.window.restorePhaseUI) {
                                    engine.window.restorePhaseUI(game.phase);
                                }
                            }
                        }

                        // Cavern Warg Attack Response Prompt
                        if (currentAttacker && currentAttacker.id === 'nibin_cavern_warg' && !currentAttacker._wargPrompted) {
                            let torch = null;
                            let torchOwnerIdx = 0;
                            game.heroes.forEach(h => {
                                if (h.attached) {
                                    const t = h.attached.find(a => a.id === 'nibin_cave_torch');
                                    if (t && !t.exhausted) {
                                        torch = t;
                                        torchOwnerIdx = h._ownerIdx !== undefined ? h._ownerIdx : 0;
                                    }
                                }
                            });
                            if (torch) {
                                currentAttacker._wargPrompted = true;
                                engine.window.showConfirmModal("Cavern Warg Response", "Exhaust Cave Torch to cancel Cavern Warg's attack and return it to the staging area?", () => {
                                    const proceed = () => {
                                        torch.exhausted = true;

                                        const warg = currentAttacker;
                                    warg._activeAttacker = false;
                                    game.currentEnemyAttacking = null;
                                    game.pendingAction = null;
                                    warg._attackedThisRound = true;
                                    if (engine.window._activeEncounterGhost) {
                                        engine.window._activeEncounterGhost.remove();
                                        engine.window._activeEncounterGhost = null;
                                    }
                                    warg._isAnimatingTravel = true;
                                    engine.render();

                                    const resumeCombat = () => {
                                        setTimeout(() => {
                                            const remaining = game.engagedEnemies.filter(e => {
                                                const isSnared = e.attached && e.attached.some(a => a.id === 'forest_snare');
                                                return !e._attackedThisRound && !e._doesNotAttack && !isSnared;
                                            });
                                            if (remaining.length > 0 && engine.window && engine.window.resolveEnemyAttacks) {
                                                engine.window.resolveEnemyAttacks();
                                            } else if (engine.window && engine.window.playerAttacks) {
                                                engine.window.playerAttacks();
                                            }
                                        }, 600);
                                    };

                                    const triggerForcedTorch = () => {
                                        const doDiscard = () => {
                                            if (!game.encounterDeck || game.encounterDeck.length === 0) {
                                                if (game.encounterDiscard && game.encounterDiscard.length > 0) {
                                                    game.encounterDeck = engine.shuffle(game.encounterDiscard);
                                                    game.encounterDiscard = [];
                                                }
                                            }
                                            if (game.encounterDeck && game.encounterDeck.length > 0) {
                                                const top = game.encounterDeck.pop();
                                                if (top.type === 'enemy') {
                                                    engine.toast("Cave Torch", `Forced: Discarded ${top.name} — it is an enemy! Added to staging.`, "danger");
                                                    if (engine.window && engine.window.animateDrawDirectToStaging) {
                                                        engine.window.animateDrawDirectToStaging(top, () => {
                                                            game.stagingArea.push(top);
                                                            engine.render();
                                                            resumeCombat();
                                                        });
                                                    } else {
                                                        game.stagingArea.push(top);
                                                        engine.render();
                                                        resumeCombat();
                                                    }
                                                } else {
                                                    engine.toast("Cave Torch", `Forced: Discarded ${top.name}.`, "info");
                                                    const deckEl = document.getElementById('encounter-deck-pile');
                                                    const discardEl = document.getElementById('encounter-discard-pile');
                                                    if (deckEl && discardEl) {
                                                        const dRect = deckEl.getBoundingClientRect();
                                                        const discRect = discardEl.getBoundingClientRect();
                                                        const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                                                        const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                                                        
                                                        const ghost = document.createElement('div');
                                                        ghost.style.cssText = `
                                                            position: fixed; z-index: 1000;
                                                            width: ${cardW}px; height: ${cardH}px;
                                                            left: ${dRect.left}px; top: ${dRect.top}px;
                                                            transform: scale(${dRect.width / cardW});
                                                            transform-origin: top left;
                                                            transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                                                            pointer-events: none;
                                                            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
                                                            border-radius: 6px; overflow: hidden;
                                                        `;
                                                        const topImg = top.img || 'cards/dark_of_mirkwood/caves_of_nibin/cave_torch.jpg';
                                                        ghost.innerHTML = `<img src="${topImg}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
                                                        ghost.className = 'card encounter-location';
                                                        document.body.appendChild(ghost);
                                                        
                                                        void ghost.offsetWidth;
                
                                                        ghost.style.left = `${discRect.left}px`;
                                                        ghost.style.top = `${discRect.top}px`;
                                                        ghost.style.transform = `scale(${discRect.width / cardW})`;
                                                        
                                                        if (window.SoundFX) window.SoundFX.playWhoosh();
                
                                                        setTimeout(() => {
                                                            ghost.remove();
                                                            game.encounterDiscard.push(top);
                                                            engine.render();
                                                            resumeCombat();
                                                        }, 500);
                                                    } else {
                                                        game.encounterDiscard.push(top);
                                                        engine.render();
                                                        resumeCombat();
                                                    }
                                                }
                                            } else {
                                                resumeCombat();
                                            }
                                        };
                                        if (engine.window && engine.window.checkEmptyEncounterDeck) {
                                            engine.window.checkEmptyEncounterDeck(doDiscard);
                                        } else {
                                            doDiscard();
                                        }
                                    };

                                    engine.window.animateReturnToStaging(warg, () => {
                                        delete warg._isAnimatingTravel;
                                        if (window.cardPositions) delete window.cardPositions[warg._uid];
                                        delete warg._engagedWithPlayerIdx;
                                        game.engagedEnemies = game.engagedEnemies.filter(e => e._uid !== warg._uid);
                                        if (!game.stagingArea.some(e => e._uid === warg._uid)) {
                                            game.stagingArea.push(warg);
                                        }
                                        warg._attackedThisRound = false;
                                        engine.toast("Cavern Warg", "Exhausted Cave Torch to cancel Cavern Warg's attack and return it to staging!", "success");
                                        engine.render();
                                        triggerForcedTorch();
                                    });
                                    };

                                    if (game.numPlayers > 1 && game.activeTabPlayerIdx !== torchOwnerIdx) {
                                        if (engine.window && engine.window._switchTab) engine.window._switchTab(torchOwnerIdx);
                                        else { game.activeTabPlayerIdx = torchOwnerIdx; engine.render(); }
                                        setTimeout(proceed, 300);
                                    } else {
                                        proceed();
                                    }
                                }, () => {});
                            }
                        }

                        lastAttackerUid = attackerUid;
                        lastAttackerId = currentAttacker ? currentAttacker.id : null;

                        // 3. Apply active attacker combat damage modifiers
                        if (currentAttacker && (currentAttacker.id === 'nibin_great_cave_troll' || currentAttacker._collapsedMineActive)) {
                            const chars = [...game.heroes, ...game.allies];
                            chars.forEach(char => {
                                const desc = Object.getOwnPropertyDescriptor(char, 'damage');
                                if (desc) {
                                    originalDescriptors.set(char._uid, desc);
                                    const origGet = desc.get;
                                    const origSet = desc.set;
                                    Object.defineProperty(char, 'damage', {
                                        get: origGet,
                                        set: function(val) {
                                            const prev = origGet.call(this);
                                            origSet.call(this, val);
                                            const diff = val - prev;
                                            if (diff > 0) {
                                                // Collapsed Mine Shadow Trigger
                                                if (currentAttacker._collapsedMineActive) {
                                                    const pIdx = currentAttacker._engagedWithPlayerIdx !== undefined ? currentAttacker._engagedWithPlayerIdx : game.activeTabPlayerIdx;
                                                    game.threats[pIdx] += diff;
                                                    if (game.numPlayers === 1) game.threat += diff;
                                                    engine.toast("Shadow Effect", `Collapsed Mine raises threat by ${diff}!`, "danger");

                                                    const overlay = document.createElement('div');
                                                    overlay.style.cssText = 'position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(200,0,0,0.45); pointer-events:none; transition: background 0.3s ease-out;';
                                                    
                                                    const bigText = document.createElement('div');
                                                    bigText.style.cssText = "font-family:'Cinzel Decorative', serif; font-size:4.5rem; font-weight:900; color:#ff3030; text-shadow:0 0 35px #ff0000, 0 4px 15px #000; transform:scale(0.5); opacity:0; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);";
                                                    bigText.textContent = `+${diff} Threat!`;
                                                    overlay.appendChild(bigText);
                                                    document.body.appendChild(overlay);

                                                    if (engine.window && engine.window.screenShake) {
                                                        engine.window.screenShake(18, 500);
                                                    }
                                                    const hudThreat = document.getElementById('hud-threat');
                                                    if (hudThreat && engine.window && engine.window.spawnBurstAtElement) {
                                                        engine.window.spawnBurstAtElement(hudThreat, '#c0392b', 15);
                                                    }

                                                    setTimeout(() => {
                                                        bigText.style.transform = 'scale(1)';
                                                        bigText.style.opacity = '1';
                                                    }, 50);

                                                    setTimeout(() => {
                                                        overlay.style.background = 'rgba(200,0,0,0)';
                                                        bigText.style.transform = 'scale(1.2) translateY(-100px)';
                                                        bigText.style.opacity = '0';
                                                        setTimeout(() => overlay.remove(), 400);

                                                        const diffEl = document.getElementById('hud-threat-diff');
                                                        if (diffEl) {
                                                            diffEl.textContent = `+${diff}`;
                                                            diffEl.classList.remove('threat-diff-active');
                                                            void diffEl.offsetWidth;
                                                            diffEl.classList.add('threat-diff-active');
                                                            setTimeout(() => {
                                                                diffEl.classList.remove('threat-diff-active');
                                                                diffEl.textContent = '';
                                                            }, 3500);
                                                        }
                                                    }, 1500);
                                                }

                                                // Great Cave-troll Trigger
                                                if (currentAttacker.id === 'nibin_great_cave_troll') {
                                                    const hp = this.hp || 0;
                                                    if (val > hp) {
                                                        const excess = val - Math.max(prev, hp);
                                                        if (excess > 0) {
                                                            game.questProgress = Math.max(0, game.questProgress - excess);
                                                            engine.toast("Great Cave-troll", `Excess damage removed ${excess} progress!`, "danger");
                                                            
                                                            const overlay = document.createElement('div');
                                                            overlay.style.cssText = 'position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(200,0,0,0.45); pointer-events:none; transition: background 0.3s ease-out;';
                                                            
                                                            const bigText = document.createElement('div');
                                                            bigText.style.cssText = "font-family:'Cinzel Decorative', serif; font-size:4.5rem; font-weight:900; color:#ff3030; text-shadow:0 0 35px #ff0000, 0 4px 15px #000; transform:scale(0.5); opacity:0; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); text-align:center;";
                                                            bigText.innerHTML = `-${excess} Progress Tokens!`;
                                                            overlay.appendChild(bigText);
                                                            document.body.appendChild(overlay);

                                                            if (engine.window && engine.window.screenShake) {
                                                                engine.window.screenShake(18, 500);
                                                            }
                                                            const questEl = document.querySelector('#quest-content .card') || document.getElementById('quest-zone');
                                                            if (questEl && engine.window && engine.window.spawnBurstAtElement) {
                                                                engine.window.spawnBurstAtElement(questEl, '#c0392b', 25);
                                                            }

                                                            setTimeout(() => {
                                                                bigText.style.transform = 'scale(1)';
                                                                bigText.style.opacity = '1';
                                                            }, 50);

                                                            setTimeout(() => {
                                                                overlay.style.background = 'rgba(200,0,0,0)';
                                                                bigText.style.transform = 'scale(1.2) translateY(-100px)';
                                                                bigText.style.opacity = '0';
                                                                setTimeout(() => overlay.remove(), 400);
                                                            }, 1500);

                                                            engine.render();
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        configurable: true,
                                        enumerable: true
                                    });
                                }
                            });
                        }
                    }
                }, 100);

                // Phase watcher for "Lost in the Dark" effect expiry
                let lastPhase = game.phase;
                setInterval(() => {
                    if (game.phase !== lastPhase) {
                        lastPhase = game.phase;
                        if (!game.phase || !game.phase.startsWith('quest')) {
                            game._nibinQuestProgressBlock = false; 
                        }
                        if (game.phase !== 'refresh') {
                            game.heroes.forEach(h => {
                                if (h.attached) {
                                    h.attached.forEach(a => {
                                        if (a.id === 'nibin_watchful_eyes') {
                                            delete a._watchfulAnimatedThisRound;
                                        }
                                    });
                                }
                            });
                        }
                    }
                }, 500);

                // Global hook for Goblin Tunnels interception
								if (!game._nibinStagingHooked) {
										game._nibinStagingHooked = true;
										let actualStagingArea = game.stagingArea || [];
										const attachStagingHook = (arr) => {
												if (!arr || arr._nibinHooked) return arr;
												const origPush = arr.push;
												Object.defineProperty(arr, '_nibinHooked', { value: true, writable: true });
												arr.push = function(...items) {
                                                        const newItems = items.filter(c => !this.some(existing => existing && c && existing._uid === c._uid));
														newItems.forEach(card => {
																if (card && (card.trait || '').includes('Goblin') && !card._returnedToStaging) {
																		const tunnelsCount = actualStagingArea.filter(c => c.id === 'nibin_goblin_tunnels').length;
                                    for (let t = 0; t < tunnelsCount; t++) {
                                        if (game.questProgress > 0) {
                                            game.questProgress--;
                                            if (engine && engine.toast) {
                                                engine.toast("Goblin Tunnels", "A Goblin was revealed! Lost 1 quest progress.", "warning");
                                            }
                                            const questEl = document.querySelector('#quest-content .card') || document.getElementById('quest-zone');
                                            if (questEl) {
                                                if (engine && engine.window && engine.window.spawnBurstAtElement) {
                                                    engine.window.spawnBurstAtElement(questEl, '#c0392b', 20);
                                                }
                                                const r = questEl.getBoundingClientRect();
                                                const floatFn = window.floatText || (engine && engine.window && engine.window.floatText);
                                                if (floatFn) {
                                                    floatFn(r.left + r.width / 2, r.top + 30, '-1 Progress!', '#c0392b');
                                                } else {
                                                    const floatEl = document.createElement('div');
                                                    floatEl.className = 'float-text';
                                                    floatEl.style.cssText = `left:${r.left + r.width/2}px; top:${r.top + 30}px; color:#c0392b;`;
                                                    floatEl.textContent = '-1 Progress!';
                                                    document.body.appendChild(floatEl);
                                                    setTimeout(() => floatEl.remove(), 1400);
                                                }
                                            }
																				}
																		}
																}
																if (card) delete card._returnedToStaging;
														});
														if (newItems.length > 0) return origPush.apply(this, newItems);
                                                        return this.length;
												};
												return arr;
										};
                    actualStagingArea = attachStagingHook(actualStagingArea);
                    Object.defineProperty(game, 'stagingArea', {
                        get: () => actualStagingArea,
                        set: (arr) => {
                            actualStagingArea = attachStagingHook(arr);
                        },
                        configurable: true
                    });
                }

								// Protect Crumbling Stairs and Cracked Pillar progress property from illegal modifications
                    setInterval(() => {
                        game.stagingArea.forEach(c => {
                            const progDesc = Object.getOwnPropertyDescriptor(c, 'progress');
                            if ((c.id === 'nibin_crumbling_stairs' || c.id === 'nibin_cracked_pillar') && (!c._progressProtected || !progDesc || !progDesc.get)) {
                                c._progressProtected = true;
                                let actual = c._actualProgress || 0;
                                Object.defineProperty(c, 'progress', {
                                    get: () => actual,
                                    set: (val) => {
                                        if (val > actual && game.stagingArea.some(x => x._uid === c._uid)) {
                                            engine.toast(c.name, `While ${c.name} is in the staging area, progress cannot be placed on it.`, "warning");
                                            return;
                                        }
                                        actual = val;
                                        c._actualProgress = val;
                                    },
                                    configurable: true
                                });
                            }
                        });
                    }, 250);

                    // Intercept Northern Tracker's quest resolution prior to execution
                    document.addEventListener('click', (e) => {
                        const btn = e.target.closest('#commit-resolve-btn') || (e.target.tagName === 'BUTTON' && e.target.textContent.includes('Commit & Resolve'));
                        if (btn && game.selectedHeroIds) {
                            const hasTracker = game.selectedHeroIds.some(uid => {
                                const char = [...game.heroes, ...game.allies].find(x => x._uid === uid);
                                return char && char.id === 'northern_tracker';
                            });
                            if (hasTracker) {
                                game.stagingArea.forEach(c => {
                                    if (c.id === 'nibin_crumbling_stairs' || c.id === 'nibin_cracked_pillar') {
                                        c._origType = c._origType || c.type;
                                        c.type = 'location_protected';
                                    }
                                });
                                setTimeout(() => {
                                    game.stagingArea.forEach(c => {
                                        if ((c.id === 'nibin_crumbling_stairs' || c.id === 'nibin_cracked_pillar') && c._origType) {
                                            c.type = c._origType;
                                            delete c._origType;
                                        }
                                    });
                                }, 2000);
                            }
                        }
                    }, true);

                    // Real-time DOM observer to strip Crumbling Stairs from Snowbourn Scout's modal
                    if (!engine.window._snowbournObserver) {
                        engine.window._snowbournObserver = true;
                        const observer = new MutationObserver(() => {
                            const mContent = document.getElementById('modal-content');
                            if (!mContent) return;
                            const h2 = mContent.querySelector('h2');
                            if (h2 && h2.textContent.includes('Snowbourn Scout')) {
                                const cardWrappers = mContent.querySelectorAll('[data-uid]');
                                let strippedAny = false;
                                cardWrappers.forEach(wrap => {
                                    const uid = wrap.getAttribute('data-uid');
                                    const card = window._cardRegistry ? window._cardRegistry[uid] : null;
                                    if (card && (card.id === 'nibin_crumbling_stairs' || card.id === 'nibin_cracked_pillar') && game.stagingArea.some(c => c._uid === uid)) {
                                        wrap.remove();
                                        strippedAny = true;
                                    }
                                });
                                const remaining = mContent.querySelectorAll('[data-uid]');
                                if (remaining.length === 0 && strippedAny) {
                                    const overlay = document.getElementById('modal-overlay');
                                    if (overlay) overlay.classList.remove('show');
                                    engine.toast("Snowbourn Scout", "These locations in staging area cannot receive progress.", "info");
                                }
                            }
                        });
                        const targetNode = document.getElementById('modal-content');
                        if (targetNode) {
                            observer.observe(targetNode, { childList: true, subtree: true });
                        }
                    }

                    // Highlight Cracked Pillar for first player attack visually
                    setInterval(() => {
                        if (!game) return;
                        if (game.phase === 'combat-player-attack' && game.pendingAttackers.length > 0) {
                            const attackers = game.pendingAttackers.map(uid => [...game.heroes, ...game.allies].find(x => x._uid === uid)).filter(Boolean);
                            const isValidPillarAttack = attackers.every(a => {
                                const isOwnedByFirst = (a._ownerIdx || 0) === (game.firstPlayerIdx || 0);
                                const isRanged = a.text && a.text.includes('Ranged');
                                return isOwnedByFirst || isRanged;
                            });
                            
                            game.stagingArea.forEach(c => {
                                if (c.id === 'nibin_cracked_pillar') {
                                    const el = document.querySelector(`[data-uid="${c._uid}"]`);
                                    if (el) {
                                        if (isValidPillarAttack && !el.classList.contains('eligible-target')) {
                                            el.classList.add('eligible-target');
                                            if (!el.querySelector('.eligible-target-arrow')) {
                                                const arrow = document.createElement('div');
                                                arrow.className = 'eligible-target-arrow';
                                                arrow.style.cssText = 'position:absolute; top:-35px; left:50%; transform:translateX(-50%); z-index:99999; font-size:2.5rem; color:#ff5252; text-shadow:0 0 10px #ff5252, 0 2px 4px #000; animation: bounceArrow 1.2s infinite ease-in-out; pointer-events:none;';
                                                arrow.textContent = '▼';
                                                el.appendChild(arrow);
                                            }
                                        } else if (!isValidPillarAttack && el.classList.contains('eligible-target')) {
                                            el.classList.remove('eligible-target');
                                            const arrow = el.querySelector('.eligible-target-arrow');
                                            if (arrow) arrow.remove();
                                        }
                                    }
                                }
                            });
                        } else {
                            game.stagingArea.forEach(c => {
                                if (c.id === 'nibin_cracked_pillar') {
                                    const el = document.querySelector(`[data-uid="${c._uid}"]`);
                                    if (el && el.classList.contains('eligible-target')) {
                                        el.classList.remove('eligible-target');
                                        const arrow = el.querySelector('.eligible-target-arrow');
                                        if (arrow) arrow.remove();
                                    }
                                }
                            });
                        }

                        // Add eligible-attacker glow to heroes when Cracked Pillar is in staging and player can attack
                        if (game.phase === 'combat-player-attack' && game.pendingAction === 'declare-attacker') {
                            const hasPillar = game.stagingArea.some(c => c.id === 'nibin_cracked_pillar');
                            if (hasPillar) {
                                [...game.heroes, ...game.allies].forEach(c => {
                                    if (!c.exhausted && !c._prisoner && !(c.attached && c.attached.some(a => a.id === 'gandalfs_map'))) {
                                        const cOwner = c._ownerIdx || 0;
                                        if (cOwner === game.activeTabPlayerIdx) {
                                            const isOwnedByFirst = cOwner === (game.firstPlayerIdx || 0);
                                            const isRanged = c.text && c.text.includes('Ranged');
                                            if (isOwnedByFirst || isRanged) {
                                                const el = document.querySelector(`[data-uid="${c._uid}"]`);
                                                if (el && !el.classList.contains('eligible-attacker')) {
                                                    el.classList.add('eligible-attacker');
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }, 100);

                    // Global watcher for Wild Wargs engagement Forced effect
                    setInterval(() => {
                        if (!game || !engine) return;
                        game.stagingArea.forEach(c => {
                            if (c.id === 'nibin_wild_wargs') delete c._wargsEngageTriggered;
                        });
                        game.engagedEnemies.forEach(e => {
                            if (e.id === 'nibin_wild_wargs' && e._engagedWithPlayerIdx !== undefined && !e._wargsEngageTriggered) {
                                e._wargsEngageTriggered = true;
                                const targetPIdx = e._engagedWithPlayerIdx;

                                const triggerWargsForced = () => {
                                    if (!game.encounterDeck || game.encounterDeck.length === 0) {
                                        if (game.encounterDiscard && game.encounterDiscard.length > 0) {
                                            game.encounterDeck = engine.shuffle(game.encounterDiscard);
                                            game.encounterDiscard = [];
                                            engine.toast("Encounter Deck", "Reshuffled encounter deck.", "info");
                                        }
                                    }
                                    if (game.encounterDeck && game.encounterDeck.length > 0) {
                                        const top = game.encounterDeck.pop();
                                        const isGoblinEnemy = top.type === 'enemy' && (top.trait || '').includes('Goblin');

                                        const deckEl = document.getElementById('encounter-deck-pile');
                                        const startRect = deckEl ? deckEl.getBoundingClientRect() : null;

                                        let destRect = null;
                                        if (isGoblinEnemy) {
                                            top._engagedWithPlayerIdx = targetPIdx;
                                            const targetEl = document.getElementById('engaged-content');
                                            if (targetEl) {
                                                const hasPlaceholder = game.engagedEnemies.length === 0;
                                                const originalHTML = targetEl.innerHTML;
                                                if (hasPlaceholder) targetEl.innerHTML = '';
                                                const stub = document.createElement('div');
                                                stub.className = 'card';
                                                stub.style.visibility = 'hidden';
                                                stub.style.margin = '0';
                                                targetEl.appendChild(stub);
                                                destRect = stub.getBoundingClientRect();
                                                stub.remove();
                                                if (hasPlaceholder) targetEl.innerHTML = originalHTML;
                                            }
                                        } else {
                                            const discardEl = document.getElementById('encounter-discard-pile');
                                            if (discardEl) destRect = discardEl.getBoundingClientRect();
                                        }

                                        const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                                        const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;

                                        if (startRect && destRect) {
                                            const ghost = document.createElement('div');
                                            ghost.style.cssText = `
                                                position: fixed; z-index: 2000;
                                                width: ${cardW}px; height: ${cardH}px;
                                                left: ${startRect.left}px; top: ${startRect.top}px;
                                                transform: scale(${startRect.width / cardW});
                                                transform-origin: top left;
                                                pointer-events: none;
                                                box-shadow: 0 10px 25px rgba(0,0,0,0.8);
                                                border-radius: 6px; overflow: hidden;
                                                transition: none;
                                            `;
                                            const cardImg = top.img 
                                                ? top.img 
                                                : (top.code ? `https://ringsdb.com/bundles/cards/${top.code}.png` : `https://hallofbeorn.com/Images/Cards/Core-Set/${top.name.replace(/ /g, '-').replace(/'/g, '')}.jpg`);
                                                
                                            ghost.innerHTML = `<img src="${cardImg}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;" alt="${top.name}">`;
                                            ghost.className = `card ${top.sphere || (isGoblinEnemy ? 'encounter-enemy' : 'encounter-location')}`;
                                            document.body.appendChild(ghost);

                                            requestAnimationFrame(() => {
                                                requestAnimationFrame(() => {
                                                    ghost.style.transition = 'all 0.65s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                                    ghost.style.left = `${destRect.left}px`;
                                                    ghost.style.top = `${destRect.top}px`;
                                                    ghost.style.transform = `scale(${destRect.width / cardW})`;
                                                    if (window.SoundFX && window.SoundFX.playWhoosh) {
                                                        window.SoundFX.playWhoosh();
                                                    }
                                                });
                                            });

                                            setTimeout(() => {
                                                ghost.remove();
                                                if (isGoblinEnemy) {
                                                    game.engagedEnemies.push(top);
                                                    engine.toast("Wild Wargs Forced Effect", `Discarded ${top.name} — it is a Goblin enemy! Engages Player ${targetPIdx + 1}!`, "danger", 3500);
                                                } else {
                                                    game.encounterDiscard.push(top);
                                                    engine.toast("Wild Wargs Forced Effect", `Discarded ${top.name} from encounter deck.`, "info", 2500);
                                                }
                                                engine.render();
                                            }, 650);
                                        } else {
                                            if (isGoblinEnemy) {
                                                game.engagedEnemies.push(top);
                                                engine.toast("Wild Wargs Forced Effect", `Discarded ${top.name} — it is a Goblin enemy! Engages Player ${targetPIdx + 1}!`, "danger", 3500);
                                            } else {
                                                game.encounterDiscard.push(top);
                                                engine.toast("Wild Wargs Forced Effect", `Discarded ${top.name} from encounter deck.`, "info", 2500);
                                            }
                                            engine.render();
                                        }
                                    }
                                };

                                if (engine.window && engine.window.checkEmptyEncounterDeck) {
                                    engine.window.checkEmptyEncounterDeck(triggerWargsForced);
                                } else {
                                    triggerWargsForced();
                                }
                            }
                        });
                    }, 250);
                },
            setupButtons: function(stage, game, engine) {
                // Populate the 32 Nibin-Dûm encounter cards if deck is empty
                if (!game.encounterDeck || game.encounterDeck.length === 0) {
                    const nibinCards = window.LotrExpansions['dark_of_nibin'].encounterCards;
                    const enc = [];
                    nibinCards.forEach(t => {
                        if (t.id === 'global_nibin_modifiers') return;
                        const count = t.copies !== undefined ? t.copies : 1;
                        for (let i = 0; i < count; i++) {
                            enc.push(engine.makeCardInst(t));
                        }
                    });
                    game.encounterDeck = engine.shuffle(enc);
                    game.allowedEncounterIds = nibinCards.map(c => c.id);
                    game.debugEncounterIds = nibinCards.map(c => c.id).filter(id => id !== 'global_nibin_modifiers');
                }

                const flipNative = document.getElementById('flip-quest-btn');
                const beginNative = document.getElementById('begin-stage-btn');
                
                // Hide native buttons on next tick so showQuestReveal's default display logic doesn't re-enable them
                setTimeout(() => {
                    if (flipNative) flipNative.style.display = 'none';
                    if (beginNative) beginNative.style.display = 'none';
                }, 0);

                const actionsDiv = document.getElementById('quest-reveal-actions');
                
                const customFlip = document.createElement('button');
                customFlip.className = 'btn';
                customFlip.style = 'min-width:180px;font-size:1rem;padding:0.85rem 2rem;display:none;';
                customFlip.textContent = 'Flip Quest Card';

                const customSearch = document.createElement('button');
                customSearch.className = 'btn';
                customSearch.style = 'min-width:180px;font-size:1rem;padding:0.85rem 2rem;border-color:var(--gold-bright);color:var(--gold-bright);display:none;';
                customSearch.textContent = 'Search for Location cards';

                actionsDiv.appendChild(customFlip);
                actionsDiv.appendChild(customSearch);

                const pullCard = (id) => {
                    const idx = game.encounterDeck.findIndex(c => c.id === id);
                    if (idx >= 0) return game.encounterDeck.splice(idx, 1)[0];
                    return null;
                };
                
                const chieftain = pullCard('nibin_goblin_chieftain');
                const pillar = pullCard('nibin_cracked_pillar');
                const torch = pullCard('nibin_cave_torch');

                // Temporarily disable modal overlay darkening during setup moves
                const questReveal = document.getElementById('quest-reveal');
                let bgOverlay = document.getElementById('nibin-setup-bg-overlay');
                if (questReveal) {
                    if (!bgOverlay) {
                        bgOverlay = document.createElement('div');
                        bgOverlay.id = 'nibin-setup-bg-overlay';
                        bgOverlay.style.cssText = 'position:absolute; inset:0; z-index:-1; background:radial-gradient(ellipse at center,rgba(20,10,5,0.45),rgba(0,0,0,0.80)); opacity:0; pointer-events:none;';
                        questReveal.appendChild(bgOverlay);
                    }
                    bgOverlay.style.transition = 'none';
                    bgOverlay.style.opacity = '0';
                    void bgOverlay.offsetWidth; // flush browser layout to enforce starting opacity state
                    bgOverlay.style.transition = 'opacity 1.5s ease-in-out';
                    
                    questReveal.style.background = 'transparent';
                }

                const sequence = async () => {
                    game._outOfPlayShowing = true;
                    // Instantly expand to capture target layout coordinates securely
                    const oopZone = document.getElementById('out-of-play-zone');
                    if (oopZone) {
                        oopZone.style.transition = 'none';
                        oopZone.style.flex = '0 0 170px';
                        oopZone.style.padding = '6px 10px';
                        oopZone.style.border = '1px solid rgba(139,105,20,0.35)';
                        void oopZone.offsetHeight;
                    }

                    if (chieftain) { chieftain._drawing = true; game.outOfPlay.push(chieftain); }
                    if (pillar) { pillar._drawing = true; game.outOfPlay.push(pillar); }
                    engine.render();

                    let chiefRect = null, pillarRect = null;
                    if (chieftain) {
                        const el = document.querySelector(`[data-uid="${chieftain._uid}"]`);
                        if (el) chiefRect = el.getBoundingClientRect();
                    }
                    if (pillar) {
                        const el = document.querySelector(`[data-uid="${pillar._uid}"]`);
                        if (el) pillarRect = el.getBoundingClientRect();
                    }

                    // Collapse the zone back down natively, then enable CSS transition physics
                    if (oopZone) {
                        oopZone.style.flex = '0 0 0px';
                        oopZone.style.padding = '0';
                        oopZone.style.border = 'none';
                        void oopZone.offsetHeight;

                        oopZone.style.transition = 'flex 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), padding 0.6s, margin 0.6s';
                        oopZone.style.flex = '0 0 170px';
                        oopZone.style.opacity = '1';
                        oopZone.style.padding = '6px 10px';
                        oopZone.style.border = '1px solid rgba(139,105,20,0.35)';
                        oopZone.style.pointerEvents = 'auto';
                    }

                    if (chieftain) {
                        await new Promise(r => engine.window._animateDeckToZone(chieftain, 'out-of-play-content', r, 600, chiefRect));
                        delete chieftain._drawing;
                        engine.render();
                    }
                    if (pillar) {
                        await new Promise(r => engine.window._animateDeckToZone(pillar, 'out-of-play-content', r, 600, pillarRect));
                        delete pillar._drawing;
                        engine.render();
                    }

                    // Delays the background darkening to start after BOTH cards have fully landed and settled in Out of Play
                    setTimeout(() => {
                        if (bgOverlay) {
                            bgOverlay.style.opacity = '1';
                        }
                    }, 1200);

                    if (torch) {
                        const p1Heroes = game.heroes.filter(h => h._ownerIdx === game.firstPlayerIdx || h._ownerIdx === undefined);
                        await new Promise(r => {
                            const promptHTML = `<span style="font-size:1.7rem; font-weight:700; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Player 1: Choose a hero to attach Cave Torch:</span>`;
                            engine.showHeroPicker("Cave Torch", promptHTML, p1Heroes, (chosen) => {
                                if (!chosen) chosen = p1Heroes[0];
                                const attachTorch = () => {
                                    chosen.attached = chosen.attached || [];
                                    chosen.attached.push(torch);
                                    torch._attachedToUid = chosen._uid;
                                    engine.toast("Cave Torch", `Attached to ${chosen.name}.`, "success");
                                    engine.render();
                                    r();
                                };
                                const deckEl = document.getElementById('encounter-deck-pile');
                                const destEl = document.querySelector(`[data-uid="${chosen._uid}"]`);
                                if (deckEl && destEl) {
                                    const deckRect = deckEl.getBoundingClientRect();
                                    const destRect = destEl.getBoundingClientRect();
                                    const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                                    const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                                    
                                    const ghost = document.createElement('div');
                                    ghost.style.cssText = `
                                        position: fixed; z-index: 1000;
                                        width: ${cardW}px; height: ${cardH}px;
                                        left: ${deckRect.left}px; top: ${deckRect.top}px;
                                        transform: scale(${deckRect.width / cardW});
                                        transform-origin: top left;
                                        transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
                                        pointer-events: none;
                                        box-shadow: 0 10px 25px rgba(0,0,0,0.7);
                                        border-radius: 6px;
                                        overflow: hidden;
                                    `;
                                    const torchImgUrl = torch.img || 'cards/dark_of_mirkwood/caves_of_nibin/cave_torch.jpg';
                                    ghost.innerHTML = `<img src="${torchImgUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;" alt="${torch.name}">`;
                                    ghost.className = 'card encounter-objective';
                                    document.body.appendChild(ghost);
                                    
                                    void ghost.offsetWidth;
                                    
                                    const targetScale = destRect.width / cardW;
                                    ghost.style.left = `${destRect.left}px`;
                                    ghost.style.top = `${destRect.top + destRect.height + 6}px`;
                                    ghost.style.transform = `scale(${targetScale})`;
                                    
                                    if (window.SoundFX) window.SoundFX.playDraw();
                                    
                                    setTimeout(() => {
                                        ghost.remove();
                                        attachTorch();
                                    }, 600);
                                } else {
                                    attachTorch();
                                }
                            }, true);
                        });
                    }

                    game.encounterDeck = engine.shuffle(game.encounterDeck);
                    if (engine.window._animateDeckShuffle) engine.window._animateDeckShuffle('Encounter Deck', 'Shuffled Encounter Deck.');
                    
                    customFlip.style.display = 'inline-block';
                };
                
                setTimeout(sequence, 500);

                customFlip.onclick = () => {
                    customFlip.style.display = 'none';
                    document.getElementById('quest-card-inner').classList.toggle('flipped');
                    setTimeout(() => {
                        customSearch.style.display = 'inline-block';
                    }, 1000);
                };

                customSearch.onclick = () => {
                    customSearch.style.display = 'none';
                    let pIdx = 0;
                    const locsPicked = [];
                    const pickNext = () => {
                        while (pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
                        if (pIdx >= game.numPlayers) {
                            game.encounterDeck = engine.shuffle(game.encounterDeck);
                            if (engine.window._animateDeckShuffle) {
                                engine.window._animateDeckShuffle('Encounter Deck', 'Locations chosen. Shuffling encounter deck...');
                            }
                            // Fires the quest-zoom transition to occur perfectly in sync while the encounter deck is shuffling
                            if (beginNative) {
                                beginNative.style.display = 'inline-block';
                                beginNative.click();
                            }
                            return;
                        }
                        if (game.activeTabPlayerIdx !== pIdx) engine.window._switchTab(pIdx);
                        const locs = game.encounterDeck.filter(c => c.type === 'location' && !locsPicked.includes(c.id));
                        if (locs.length > 0) {
                            engine.showCardPicker("Dark of Nibin-Dûm", `Player ${pIdx+1}: Choose a location to add to staging:`, locs, (chosen) => {
                                if (chosen) {
                                    locsPicked.push(chosen.id);
                                    const idx = game.encounterDeck.findIndex(c => c._uid === chosen._uid);
                                    if (idx >= 0) game.encounterDeck.splice(idx, 1);
                                    
                                    const startRect = engine.window._lastPickerRect;
                                    const finalizeStaging = () => {
                                        game.stagingArea.push(chosen);
                                        engine.toast("Location Added", `Added ${chosen.name} to staging.`, "info");
                                        engine.render();
                                        pIdx++;
                                        pickNext();
                                    };

                                    if (startRect && engine.window._animateCardToStaging) {
                                        engine.window._animateCardToStaging(chosen, startRect, () => {
                                            finalizeStaging();
                                        });
                                    } else {
                                        finalizeStaging();
                                    }
                                } else {
                                    pIdx++;
                                    pickNext();
                                }
                            }, true);
                        } else {
                            pIdx++;
                            pickNext();
                        }
                    };
                    pickNext();
                };
            }
        },
        {
            stage: 2, side: 'B', name: 'Surprise Attack', questPts: 0, trait: 'Nibin-Dum',
            imgA: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Surprise-Attack-2A.jpg',
            imgB: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Surprise-Attack-2B.jpg',
            paletteIdx: 2,
            onSetup: function(stage, game, engine) {
                // Dynamically intercept Stage 2 quest point injection (+4 per enemy)
                Object.defineProperty(stage, 'questPts', {
                    get: () => {
                        const enemiesInPlay = game.stagingArea.filter(c => c.type === 'enemy' || c.type === 'enemy-immune').length + game.engagedEnemies.length;
                        return 0 + (enemiesInPlay * 4);
                    },
                    configurable: true
                });

                // Enforce 0 engagement cost during encounter phase
                setInterval(() => {
                    if (game.questStageIdx === 1 && game.phase && game.phase.startsWith('encounter')) {
                        game.stagingArea.forEach(c => {
                            if (c.type === 'enemy') {
                                c._origEngagement = c._origEngagement !== undefined ? c._origEngagement : c.engagement;
                                c.engagement = 0;
                            }
                        });
                    } else {
                        game.stagingArea.forEach(c => {
                            if (c.type === 'enemy' && c._origEngagement !== undefined) {
                                c.engagement = c._origEngagement;
                                delete c._origEngagement;
                            }
                        });
                    }
                }, 500);
            },
            setupButtons: function(stage, game, engine) {
                const flipNative = document.getElementById('flip-quest-btn');
                const beginNative = document.getElementById('begin-stage-btn');

                setTimeout(() => {
                    if (flipNative) flipNative.style.display = 'none';
                    if (beginNative) beginNative.style.display = 'none';
                }, 0);

                const questReveal = document.getElementById('quest-reveal');
                let bgOverlay = document.getElementById('nibin-setup-bg-overlay');
                if (questReveal) {
                    if (!bgOverlay) {
                        bgOverlay = document.createElement('div');
                        bgOverlay.id = 'nibin-setup-bg-overlay';
                        bgOverlay.style.cssText = 'position:absolute; inset:0; z-index:-1; background:radial-gradient(ellipse at center,rgba(20,10,5,0.45),rgba(0,0,0,0.80)); opacity:0; pointer-events:none;';
                        questReveal.appendChild(bgOverlay);
                    }
                    bgOverlay.style.transition = 'none';
                    bgOverlay.style.opacity = '0';
                    void bgOverlay.offsetWidth;
                    bgOverlay.style.transition = 'opacity 1.5s ease-in-out';
                    questReveal.style.background = 'transparent';
                }

                const sequence = async () => {
                    const chiefIdx = game.outOfPlay.findIndex(c => c.id === 'nibin_goblin_chieftain');
                    if (chiefIdx >= 0) {
                        const chieftain = game.outOfPlay[chiefIdx];
                        const chiefEl = document.querySelector(`[data-uid="${chieftain._uid}"]`);
                        const startRect = chiefEl ? chiefEl.getBoundingClientRect() : null;
                        
                        game.outOfPlay.splice(chiefIdx, 1);
                        if (game.outOfPlay.length === 0) game._outOfPlayShowing = false;
                        engine.render();

                        const finalizeChief = () => {
                            game.stagingArea.push(chieftain);
                            engine.toast("Goblin Chieftain", "Goblin Chieftain enters the staging area!", "danger");
                            engine.render();

                            setTimeout(() => {
                                if (bgOverlay) bgOverlay.style.opacity = '1';
                            }, 200);
                        };

                        if (startRect && engine.window._animateCardToStaging) {
                            engine.window._animateCardToStaging(chieftain, startRect, finalizeChief);
                        } else {
                            finalizeChief();
                        }
                    } else {
                        if (bgOverlay) bgOverlay.style.opacity = '1';
                    }
                };

                const promptAmbushEnemies = () => {
                    let pIdx = 0;
                    const enemiesPicked = [];
                    const pickNext = () => {
                        while (pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
                        if (pIdx >= game.numPlayers) {
                            game.encounterDeck = engine.shuffle(game.encounterDeck);
                            if (engine.window._animateDeckShuffle) {
                                engine.window._animateDeckShuffle('Encounter Deck', 'Shuffling encounter deck...');
                            }
                            if (beginNative) {
                                beginNative.style.display = 'inline-block';
                                beginNative.click();
                            }
                            return;
                        }
                        if (game.activeTabPlayerIdx !== pIdx) engine.window._switchTab(pIdx);
                        const enemies = [...game.encounterDeck, ...game.encounterDiscard].filter(c => c.type === 'enemy' && c.id !== 'nibin_goblin_chieftain' && !enemiesPicked.includes(c.id));
                        if (enemies.length > 0) {
                            engine.showCardPicker("Surprise Attack", `Player ${pIdx+1}: Choose a different enemy to add to staging:`, enemies, (chosen) => {
                                if (chosen) {
                                    enemiesPicked.push(chosen.id);
                                    let idx = game.encounterDeck.findIndex(c => c._uid === chosen._uid);
                                    if (idx >= 0) game.encounterDeck.splice(idx, 1);
                                    else {
                                        idx = game.encounterDiscard.findIndex(c => c._uid === chosen._uid);
                                        if (idx >= 0) game.encounterDiscard.splice(idx, 1);
                                    }

                                    const startRect = engine.window._lastPickerRect;
                                    const finalizeStaging = () => {
                                        game.stagingArea.push(chosen);
                                        engine.toast("Ambush!", `Added ${chosen.name} to staging.`, "danger");
                                        engine.render();
                                        pIdx++;
                                        pickNext();
                                    };

                                    if (startRect && engine.window._animateCardToStaging) {
                                        engine.window._animateCardToStaging(chosen, startRect, finalizeStaging);
                                    } else {
                                        finalizeStaging();
                                    }
                                } else {
                                    pIdx++;
                                    pickNext();
                                }
                            }, true);
                        } else {
                            pIdx++;
                            pickNext();
                        }
                    };
                    pickNext();
                };

                const actionsDiv = document.getElementById('quest-reveal-actions');
                if (actionsDiv) {
                    const searchBtn = document.createElement('button');
                    searchBtn.className = 'btn';
                    searchBtn.style.cssText = 'min-width:180px;font-size:1rem;padding:0.85rem 2rem;border-color:var(--gold-bright);color:var(--gold-bright);';
                    searchBtn.textContent = 'Search the Encounter Deck and Discard Pile';
                    searchBtn.onclick = () => {
                        searchBtn.remove();
                        promptAmbushEnemies();
                    };
                    actionsDiv.appendChild(searchBtn);
                }

                setTimeout(sequence, 500);
            }
        },
        {
            stage: 3, side: 'B', name: 'The Chasm', questPts: 0, trait: 'Nibin-Dum',
            imgA: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/The-Chasm-3A.jpg',
            imgB: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/The-Chasm-3B.jpg',
            paletteIdx: 2,
            canAdvance: function() { return false; },
            onSetup: function(stage, game, engine) {
                const revDesc = Object.getOwnPropertyDescriptor(game, 'revealsLeft');
                if (!revDesc || revDesc.configurable) {
                    if (!revDesc || !revDesc.get) {
                        let actualReveals = game.revealsLeft;
                        Object.defineProperty(game, 'revealsLeft', {
                            get: () => actualReveals,
                            set: (val) => {
                                if (actualReveals === undefined && val !== undefined && typeof val === 'number') {
                                    const currentStage = window.QUEST_STAGES ? window.QUEST_STAGES[game.questStageIdx] : null;
                                    if (currentStage && currentStage.name === 'The Chasm') {
                                        val += 1;
                                        if (engine && engine.toast) engine.toast("The Chasm", "Forced: Revealing an additional encounter card.", "warning");
                                    }
                                }
                                actualReveals = val;
                            },
                            configurable: true,
                            enumerable: true
                        });
                    }
                }
            },
            setupButtons: function(stage, game, engine) {
                const flipBtn = document.getElementById('flip-quest-btn');
                const beginBtn = document.getElementById('begin-stage-btn');

                if (flipBtn) {
                    flipBtn.style.display = 'inline-block';
                    flipBtn.onclick = () => {
                        document.getElementById('quest-card-inner').classList.toggle('flipped');
                        flipBtn.style.display = 'none';
                        if (beginBtn) beginBtn.style.display = 'inline-block';
                    };
                }
                if (beginBtn) beginBtn.style.display = 'none';

                const chiefStgIdx = game.stagingArea.findIndex(c => c.id === 'nibin_goblin_chieftain');
                const chiefEngIdx = game.engagedEnemies.findIndex(c => c.id === 'nibin_goblin_chieftain');
                let chieftain = chiefStgIdx >= 0 ? game.stagingArea[chiefStgIdx] : (chiefEngIdx >= 0 ? game.engagedEnemies[chiefEngIdx] : null);

                const pilIdx = game.outOfPlay.findIndex(c => c.id === 'nibin_cracked_pillar');
                let pillar = pilIdx >= 0 ? game.outOfPlay[pilIdx] : null;

                let chiefStartRect = null;
                if (chieftain) {
                    const el = document.querySelector(`[data-uid="${chieftain._uid}"]`);
                    if (el) chiefStartRect = el.getBoundingClientRect();
                }
                let pilStartRect = null;
                if (pillar) {
                    const el = document.querySelector(`[data-uid="${pillar._uid}"]`);
                    if (el) pilStartRect = el.getBoundingClientRect();
                }

                if (chieftain) {
                    if (chiefStgIdx >= 0) game.stagingArea.splice(chiefStgIdx, 1);
                    else if (chiefEngIdx >= 0) game.engagedEnemies.splice(chiefEngIdx, 1);
                    chieftain._drawing = true;
                    game.outOfPlay.push(chieftain);
                }
                if (pillar) {
                    game.outOfPlay.splice(pilIdx, 1);
                }

                game._outOfPlayShowing = true;
                const oopZone = document.getElementById('out-of-play-zone');
                if (oopZone) {
                    oopZone.style.flex = '0 0 170px';
                    oopZone.style.width = '';
                    oopZone.style.opacity = '1';
                    oopZone.style.padding = '6px 10px';
                    oopZone.style.border = '1px solid rgba(139,105,20,0.35)';
                    void oopZone.offsetHeight;
                }

                engine.render();

                const anims = [];
                if (chieftain) {
                    anims.push(new Promise(resolve => {
                        const el = document.querySelector(`[data-uid="${chieftain._uid}"]`);
                        let targetRect = el ? el.getBoundingClientRect() : null;
                        if (chiefStartRect && targetRect) {
                            const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                            const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                            const ghost = document.createElement('div');
                            ghost.className = 'card encounter-enemy';
                            ghost.style.cssText = `
                                position: fixed; z-index: 2000;
                                width: ${cardW}px; height: ${cardH}px;
                                left: ${chiefStartRect.left}px; top: ${chiefStartRect.top}px;
                                transform: scale(${chiefStartRect.width / cardW});
                                transform-origin: top left;
                                transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
                                pointer-events: none;
                                box-shadow: 0 10px 25px rgba(0,0,0,0.7);
                                border-radius: 6px; overflow: hidden;
                            `;
                            const chiefImgUrl = chieftain.img || 'cards/dark_of_mirkwood/caves_of_nibin/goblin_chieftain.jpg';
                            ghost.innerHTML = `<img src="${chiefImgUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
                            document.body.appendChild(ghost);

                            void ghost.offsetWidth;

                            ghost.style.left = `${targetRect.left}px`;
                            ghost.style.top = `${targetRect.top}px`;
                            ghost.style.transform = `scale(${targetRect.width / cardW})`;

                            if (window.SoundFX && window.SoundFX.playWhoosh) {
                                window.SoundFX.playWhoosh();
                            }

                            setTimeout(() => {
                                ghost.remove();
                                delete chieftain._drawing;
                                resolve();
                            }, 800);
                        } else {
                            delete chieftain._drawing;
                            resolve();
                        }
                    }));
                }
                if (pillar) {
                    anims.push(new Promise(resolve => {
                        engine.window._animateCardToStaging(pillar, pilStartRect, () => {
                            game.stagingArea.push(pillar);
                            resolve();
                        });
                    }));
                }

                Promise.all(anims).then(() => {
                    engine.toast("The Chasm", "Goblin Chieftain set aside. Cracked Pillar added to staging.", "info");
                    engine.render();
                });
            }
        },
        {
            stage: 4, side: 'B', name: 'Oathkeepers', questPts: 8, trait: 'Nibin-Dum',
            imgA: 'cards/dark_of_mirkwood/oathkeepers4A.jpg',
            imgB: 'cards/dark_of_mirkwood/oathkeepers4B.jpg',
            paletteIdx: 2,
            canAdvance: function(stage, game, engine) {
                if (game.stagingArea.some(c => c.id === 'nibin_goblin_chieftain') || game.engagedEnemies.some(c => c.id === 'nibin_goblin_chieftain')) {
                    engine.toast("Quest Blocked", "You must defeat the Goblin Chieftain to rescue the captives and win!", "warning");
                    return false;
                }
                return true;
            },
            setupButtons: function(stage, game, engine) {
                const chiefIdx = game.outOfPlay.findIndex(c => c.id === 'nibin_goblin_chieftain');
                if (chiefIdx >= 0) {
                    const chieftain = game.outOfPlay[chiefIdx];
                    const chiefEl = document.querySelector(`[data-uid="${chieftain._uid}"]`);
                    const startRect = chiefEl ? chiefEl.getBoundingClientRect() : null;
                    
                    setTimeout(() => {
                        game.outOfPlay.splice(chiefIdx, 1);
                        if (game.outOfPlay.length === 0) game._outOfPlayShowing = false;
                        
                        chieftain._drawing = true;
                        game.stagingArea.push(chieftain);
                        if (window.cardPositions) delete window.cardPositions[chieftain._uid];
                        
                        // Temporarily bypass slow collapse animation so we can calculate the exact final coordinates instantly
                        const oopZone = document.getElementById('out-of-play-zone');
                        if (oopZone) {
                            oopZone.style.transition = 'none';
                        }
                        
                        engine.render();

                        const newChiefEl = document.querySelector(`#staging-content [data-uid="${chieftain._uid}"]`) || document.querySelector(`[data-uid="${chieftain._uid}"]`);
                        
                        if (startRect && newChiefEl) {
                            const destRect = newChiefEl.getBoundingClientRect();
                            
                            const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                            const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                            
                            const ghost = document.createElement('div');
                            ghost.className = 'card encounter-enemy';
                            ghost.style.cssText = `
                                position: fixed; z-index: 2000;
                                width: ${cardW}px; height: ${cardH}px;
                                left: ${startRect.left}px; top: ${startRect.top}px;
                                transform: scale(${startRect.width / cardW});
                                transform-origin: top left;
                                transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
                                pointer-events: none;
                                box-shadow: 0 10px 25px rgba(0,0,0,0.7);
                                border-radius: 6px; overflow: hidden;
                            `;
                            const chiefImgUrl = chieftain.img || 'cards/dark_of_mirkwood/caves_of_nibin/goblin_chieftain.jpg';
                            ghost.innerHTML = `<img src="${chiefImgUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
                            document.body.appendChild(ghost);

                            void ghost.offsetWidth;

                            ghost.style.left = `${destRect.left}px`;
                            ghost.style.top = `${destRect.top}px`;
                            ghost.style.transform = `scale(${destRect.width / cardW})`;
                            
                            if (window.SoundFX && window.SoundFX.playWhoosh) window.SoundFX.playWhoosh();

                            setTimeout(() => {
                                ghost.remove();
                                delete chieftain._drawing;
                                engine.toast("Goblin Chieftain", "Goblin Chieftain enters the staging area!", "danger");
                                
                                if (oopZone) {
                                    oopZone.style.transition = '';
                                }
                                engine.render();
                            }, 800);
                        } else {
                            delete chieftain._drawing;
                            engine.toast("Goblin Chieftain", "Goblin Chieftain enters the staging area!", "danger");
                            if (oopZone) oopZone.style.transition = '';
                            engine.render();
                        }
                    }, 600); // Small delay to let the quest reveal modal appear and settle first
                }
            }
        }
    ],
    encounterCards: [
        {
            id: 'global_nibin_modifiers', name: 'Global Modifiers', type: 'treachery', sphere: 'encounter-treachery',
            getAttackMod: function(card, target, game) {
                let mod = 0;
                if (target && target._lightlessPassageActive) {
                    mod -= 999;
                }
                if (card.shadowCard && card.shadowCard.id === 'nibin_goblin_tunnels') {
                    mod += (card.trait||'').includes('Goblin') ? 3 : 1;
                }
                if (card.shadowCard && card.shadowCard.id === 'nibin_goblins_are_upon_you') {
                    const targetPIdx = target ? (target._ownerIdx || 0) : (card._engagedWithPlayerIdx || 0);
                    mod += game.engagedEnemies.filter(e => (e._engagedWithPlayerIdx || 0) === targetPIdx && (e.trait||'').includes('Goblin')).length;
                }
                if (card && (card.type === 'enemy' || card.type === 'enemy-immune') && (card.trait || '').includes('Goblin') && game && game.engagedEnemies) {
                    const isCardEngaged = game.engagedEnemies.some(e => e._uid === card._uid);
                    if (isCardEngaged) {
                        const cardPIdx = card._engagedWithPlayerIdx !== undefined ? card._engagedWithPlayerIdx : 0;
                        const hasTroop = game.engagedEnemies.some(e => 
                            (e.id === 'nibin_goblin_troop' || e.id === 'goblin_troop' || e.id === 'oath_goblin_troop') &&
                            (e._engagedWithPlayerIdx !== undefined ? e._engagedWithPlayerIdx : 0) === cardPIdx &&
                            e._uid !== card._uid
                        );
                        if (hasTroop) mod += 1;
                    }
                }
                return mod;
            },
            getDefenseMod: function(card, game) {
                let mod = 0;
                if (card && (card.type === 'enemy' || card.type === 'enemy-immune') && (card.trait || '').includes('Goblin') && game && game.engagedEnemies) {
                    const isCardEngaged = game.engagedEnemies.some(e => e._uid === card._uid);
                    if (isCardEngaged) {
                        const cardPIdx = card._engagedWithPlayerIdx !== undefined ? card._engagedWithPlayerIdx : 0;
                        const hasTroop = game.engagedEnemies.some(e => 
                            (e.id === 'nibin_goblin_troop' || e.id === 'goblin_troop' || e.id === 'oath_goblin_troop') &&
                            (e._engagedWithPlayerIdx !== undefined ? e._engagedWithPlayerIdx : 0) === cardPIdx &&
                            e._uid !== card._uid
                        );
                        if (hasTroop) mod += 1;
                    }
                }
                return mod;
            },
            getThreatMod: function(card, game, engine) {
                let mod = 0;
                if ((card.trait||'').includes('Dark') && game.stagingArea.some(c => c.id === 'nibin_branching_paths')) {
                    mod += game.stagingArea.filter(c => c.id === 'nibin_branching_paths').length;
                }
                return mod;
            }
        },
        {
            id: 'nibin_goblin_chieftain', name: 'Goblin Chieftain', type: 'enemy', sphere: 'encounter-enemy', portrait: '👹', engagement: 40, threat: 0, attack: 0, defense: 0, hp: 8, trait: 'Goblin · Orc', copies: 1,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/goblin_chieftain.jpg',
            text: 'X is the stage number of the quest.\nCannot take damage. Cannot have attachments.\nForced: After Goblin Chieftain attacks, either remove X progress from the quest, or return it to the staging area.',
            getThreatMod: function(card, game) {
                const qr = document.getElementById('quest-reveal');
                const isReveal = qr && (qr.classList.contains('show') || (game && game._questAnimating));
                const sIdx = (isReveal && game && game.tempQuestStageIdx !== undefined) ? game.tempQuestStageIdx : (game ? game.questStageIdx : 0);
                const s = (window.QUEST_STAGES && game) ? window.QUEST_STAGES[sIdx] : null;
                return s ? (s.stage || 1) : 1;
            },
            getAttackMod: function(card, target, game) {
                const qr = document.getElementById('quest-reveal');
                const isReveal = qr && (qr.classList.contains('show') || (game && game._questAnimating));
                const sIdx = (isReveal && game && game.tempQuestStageIdx !== undefined) ? game.tempQuestStageIdx : (game ? game.questStageIdx : 0);
                const s = (window.QUEST_STAGES && game) ? window.QUEST_STAGES[sIdx] : null;
                return s ? (s.stage || 1) : 1;
            },
            getDefenseMod: function(card, game) {
                const qr = document.getElementById('quest-reveal');
                const isReveal = qr && (qr.classList.contains('show') || (game && game._questAnimating));
                const sIdx = (isReveal && game && game.tempQuestStageIdx !== undefined) ? game.tempQuestStageIdx : (game ? game.questStageIdx : 0);
                const s = (window.QUEST_STAGES && game) ? window.QUEST_STAGES[sIdx] : null;
                return s ? (s.stage || 1) : 1;
            }
        },
        {
            id: 'nibin_cracked_pillar', name: 'Cracked Pillar', type: 'location', sphere: 'encounter-location', portrait: '🏛️', threat: 2, questPts: 2, trait: 'Underground', copies: 1,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/cracked_pillar.jpg',
            text: 'While Cracked Pillar is in the staging area, it gains: "The first player may declare an attack against Cracked Pillar during the combat phase as if it was an enemy engaged with him. Use Cracked Pillar\'s Threat as its Defense during this attack."\nTravel: Remove 4 damage from Cracked Pillar to travel here.',
            onClick: function(card, game, engine) {
                if (game.phase === 'combat-player-attack' && game.pendingAttackers.length > 0 && game.stagingArea.some(x => x._uid === card._uid)) {
                    const attackers = game.pendingAttackers.map(uid=>[...game.heroes, ...game.allies].find(c=>c._uid===uid)).filter(Boolean);
                    const isValidAttack = attackers.every(a => {
                        const isOwnedByFirst = (a._ownerIdx || 0) === (game.firstPlayerIdx || 0);
                        const isRanged = a.text && a.text.includes('Ranged');
                        return isOwnedByFirst || isRanged;
                    });
                    
                    if (!isValidAttack) {
                        if (engine && engine.toast) engine.toast("Cracked Pillar", "Characters controlled by other players must have Ranged to attack Cracked Pillar.", "warning");
                        return true;
                    }

                    const calculateAttack = (c) => {
                        let atk = c.attack || 0;
                        if(c.attackBonus) atk += c.attackBonus;
                        if(c.getAttackMod) atk += c.getAttackMod(c, card, game);
                        if(engine.window && engine.window.ENCOUNTER_DECK_TEMPLATE) {
                            engine.window.ENCOUNTER_DECK_TEMPLATE.filter(globalCard => globalCard.getAttackMod && globalCard.id && (globalCard.id.startsWith('global_') || globalCard.id.startsWith('oath_global_'))).forEach(globalCard => {
                                const gMod = globalCard.getAttackMod(c, card, game);
                                if (typeof gMod === 'number' && !isNaN(gMod)) atk += gMod;
                            });
                        }
                        if(c.id==='gimli') atk += c.damage;
                        if(c.id==='dunhere' && attackers.length === 1) atk += 1;
                        if(c.attached) {
                            c.attached.forEach(a=>{
                                if(a.id === 'dwarven_axe') {
                                    if((c.trait||'').includes('Dwarf')) atk += 2;
                                    else atk += 1;
                                }
                            });
                        }
                        return atk;
                    };

                    const executeLungeAndDamage = (isDunhereSpecial = false) => {
                        let totalAttack = attackers.reduce((s, a) => s + calculateAttack(a), 0);
                        let dmg = Math.max(0, totalAttack - card.threat);
                        card.damage = (card.damage || 0) + dmg;
                        if (engine && engine.toast) engine.toast("Cracked Pillar", `Attacked Pillar for ${dmg} damage!`, "success");
                        
                        if (isDunhereSpecial && engine && engine.window && engine.window.drawAttackArrow) {
                            // Dunhere staging attack triggers bow animation without simple dotted arrow
                        }
                        
                        attackers.forEach(a => {
                            if (engine.window && engine.window.animateLunge) engine.window.animateLunge(a._uid, card._uid);
                        });
                        setTimeout(() => {
                            attackers.forEach(a => {
                                a.exhausted = true;
                                const el = document.querySelector(`[data-uid="${a._uid}"]`);
                                if(el) el.classList.add('exhausted');

                                if (a._stagingAttackBonusActive) {
                                    setTimeout(() => {
                                        const freshEl = document.querySelector(`[data-uid="${a._uid}"]`);
                                        if (freshEl && engine.window && engine.window.animateTokensAway) {
                                            const atkToken = freshEl.querySelector('img[alt="atk"]');
                                            if (atkToken) engine.window.animateTokensAway([atkToken.closest('.buff-token')]);
                                        }
                                        a.attackBonus = Math.max(0, (a.attackBonus || 0) - 1);
                                        delete a._stagingAttackBonusActive;
                                        if (engine && engine.render) engine.render();
                                    }, 1200);
                                }
                            });
                            game.pendingAttackers = [];
                            if (engine && engine.render) engine.render();
                        }, 250);
                    };

                    const isDunhereAlone = attackers.length === 1 && attackers[0].id === 'dunhere';
                    if (isDunhereAlone) {
                        game.pendingAttackers = []; // Clear early to prevent double click glitch
                        const dunhere = attackers[0];
                        dunhere.exhausted = true;
                        delete dunhere._justExhaustedTime;
                        
                        const snd = new Audio('./sound_effects/bow_and_arrow.mp3');
                        snd.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
                        snd.play().catch(e => {});

                        const dunhereElInit = document.querySelector(`[data-uid="${dunhere._uid}"]`);
                        if (dunhereElInit) dunhereElInit.classList.add('exhausted');
                        
                        setTimeout(() => {
                            dunhere.attackBonus = (dunhere.attackBonus || 0) + 1;
                            dunhere._stagingAttackBonusActive = true;
                            if (engine && engine.render) engine.render();
                            
                            const dunhereEl = document.querySelector(`[data-uid="${dunhere._uid}"]`);
                            if (dunhereEl) {
                                const tokenNode = dunhereEl.querySelector('.buff-token.plus');
                                if (tokenNode) {
                                    const wrapper = tokenNode.closest('.buff-token');
                                    if (wrapper) {
                                        wrapper.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                                        wrapper.style.transform = 'translateY(-50px) scale(1.6)';
                                        wrapper.style.opacity = '0';
                                        void wrapper.offsetWidth;
                                        wrapper.style.transform = 'translateY(0) scale(1)';
                                        wrapper.style.opacity = '1';
                                    }
                                }
                            }
                            if (engine.window && engine.window.floatTextAtElement) {
                                engine.window.floatTextAtElement(dunhere._uid, "+1 Attack (Staging)", '#ff5252');
                            }
                            
                            setTimeout(() => {
                                executeLungeAndDamage(true);
                            }, 650);
                        }, 450);
                    } else {
                        executeLungeAndDamage(false);
                    }
                    return true;
                }
                if (game.phase === 'travel' && game.pendingAction === 'travel' && !game.activeLocation && game.stagingArea.some(x => x._uid === card._uid)) {
                    if ((card.damage || 0) < 4) {
                        engine.toast("Cracked Pillar", "You must have 4 damage on Cracked Pillar to travel here (it only has " + (card.damage || 0) + ").", "warning");
                        return true;
                    }
                }
                return false;
            },
            onTravel: function(loc, game, engine, proceedTravel) {
                if ((loc.damage || 0) >= 4) {
                    const el = document.querySelector(`[data-uid="${loc._uid}"]`);
                    const dmgToken = el ? el.querySelector('.token.damage') : null;
                    if (dmgToken && engine.window && engine.window.animateTokensAway) {
                        engine.window.animateTokensAway([dmgToken]);
                    }
                    if (engine.window && engine.window.floatTextAtElement) {
                        engine.window.floatTextAtElement(loc._uid, "-4 Damage", "#ff5252");
                    }
                    loc.damage -= 4;
                    if (engine.toast) {
                        engine.toast("Cracked Pillar", "Removed 4 damage to travel to Cracked Pillar.", "success");
                    }
                    if (engine.render) engine.render();

                    setTimeout(() => {
                        proceedTravel();
                    }, 400);
                } else {
                    if (engine.toast) {
                        engine.toast("Cracked Pillar", "You must remove 4 damage from Cracked Pillar to travel here (it only has " + (loc.damage || 0) + ").", "warning");
                    }
                }
            },
            onExplored: function(loc, game, engine) {
                window.queueNibinExplored(loc, game, engine, (done) => {
                    const currentStage = window.QUEST_STAGES ? window.QUEST_STAGES[game.questStageIdx] : null;
                    if (currentStage && currentStage.name === 'The Chasm') {
                        engine.toast("Cracked Pillar", "The Pillar falls! Advancing to stage 4.", "success");
                        
                        let origCanAdvance = currentStage.canAdvance;
                        currentStage.canAdvance = function() { return true; };
                        
                        if (engine.addProgressToQuest) {
                            engine.addProgressToQuest(1);
                        } else if (engine.window && engine.window.addProgressToQuest) {
                            engine.window.addProgressToQuest(1);
                        }
                        
                        setTimeout(() => {
                            currentStage.canAdvance = origCanAdvance;
                        }, 500);
                        
                        done();
                    } else {
                        done();
                    }
                });
            }
        },
        {
            id: 'nibin_cave_torch', name: 'Cave Torch', type: 'objective', sphere: 'encounter-objective', portrait: '🔥', restricted: true, trait: 'Light', copies: 1,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/cave_torch.jpg',
            text: 'Guarded. Attach to a hero. Restricted.\nAction: Exhaust Cave Torch to place up to 3 progress tokens on a Dark location.\nForced: After Cave Torch exhausts, discard the top card of the encounter deck. If that card is an enemy, add it to the staging area.',
            onClick: function(card, game, engine) {
                if (card.exhausted || card._isActivating) return false;
                card._isActivating = true;
                
                const darkLocs = game.stagingArea.filter(c => c.type === 'location' && (c.trait||'').includes('Dark'));
                if (game.activeLocation && (game.activeLocation.trait||'').includes('Dark')) darkLocs.push(game.activeLocation);
                
                if (darkLocs.length === 0) {
                    engine.toast("Cave Torch", "No Dark locations in play to target.", "warning");
                    delete card._isActivating;
                    return true; 
                }
                
                const promptHTML = `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Choose a Dark location to place 3 progress on:</span>`;
                
                engine.showEnemyPicker("Cave Torch", promptHTML, darkLocs, (loc) => {
                    if (!loc) {
                        delete card._isActivating;
                        return;
                    }
                    
                    card.exhausted = true;
                    delete card._isActivating;
                    engine.render();

                    const executeForcedDiscard = (onDone) => {
                    const doDiscard = () => {
                        if (!game.encounterDeck || game.encounterDeck.length === 0) {
                            if (game.encounterDiscard && game.encounterDiscard.length > 0) {
                                game.encounterDeck = engine.shuffle(game.encounterDiscard);
                                game.encounterDiscard = [];
                                engine.toast("Encounter Deck", "Reshuffled encounter discard pile into deck.", "info");
                            }
                        }
                        if (game.encounterDeck && game.encounterDeck.length > 0) {
                            const top = game.encounterDeck.pop();
                            if (top.type === 'enemy') {
                                engine.toast("Cave Torch Forced Effect", `Forced: Discarded ${top.name} — it is an enemy! Added to staging.`, "danger");
                                if (engine.window && engine.window.animateDrawDirectToStaging) {
                                    engine.window.animateDrawDirectToStaging(top, () => {
                                        game.stagingArea.push(top);
                                        engine.render();
                                        if (onDone) setTimeout(onDone, 50);
                                    });
                                } else {
                                    game.stagingArea.push(top);
                                    engine.render();
                                    if (onDone) setTimeout(onDone, 50);
                                }
                            } else {
                                engine.toast("Cave Torch Forced Effect", `Forced: Discarded ${top.name} from encounter deck.`, "info");
                                const deckEl = document.getElementById('encounter-deck-pile');
                                const discardEl = document.getElementById('encounter-discard-pile');
                                if (deckEl && discardEl) {
                                    const dRect = deckEl.getBoundingClientRect();
                                    const discRect = discardEl.getBoundingClientRect();
                                    const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                                    const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                                    
                                    const ghost = document.createElement('div');
                                    ghost.style.cssText = `
                                        position: fixed; z-index: 1000;
                                        width: ${cardW}px; height: ${cardH}px;
                                        left: ${dRect.left}px; top: ${dRect.top}px;
                                        transform: scale(${dRect.width / cardW});
                                        transform-origin: top left;
                                        transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                                        pointer-events: none;
                                        box-shadow: 0 8px 24px rgba(0,0,0,0.6);
                                        border-radius: 6px; overflow: hidden;
                                    `;
                                    const topImg = top.img || 'cards/dark_of_mirkwood/caves_of_nibin/cave_torch.jpg';
                                    ghost.innerHTML = `<img src="${topImg}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
                                    ghost.className = 'card encounter-location';
                                    document.body.appendChild(ghost);
                                    
                                    void ghost.offsetWidth;

                                    ghost.style.left = `${discRect.left}px`;
                                    ghost.style.top = `${discRect.top}px`;
                                    ghost.style.transform = `scale(${discRect.width / cardW})`;
                                    
                                    if (window.SoundFX) window.SoundFX.playWhoosh();

                                    setTimeout(() => {
                                        ghost.remove();
                                        game.encounterDiscard.push(top);
                                        engine.render();
                                        if (onDone) onDone();
                                    }, 500);
                                } else {
                                    game.encounterDiscard.push(top);
                                    engine.render();
                                    if (onDone) onDone();
                                }
                            }
                        } else {
                            engine.toast("Cave Torch", "Forced: Encounter deck is empty.", "info");
                            if (onDone) onDone();
                        }
                    };

                    if (engine.window && engine.window.checkEmptyEncounterDeck) {
                        engine.window.checkEmptyEncounterDeck(doDiscard);
                    } else {
                        doDiscard();
                    }
                };

                    const animateTokens = (onComplete) => {
                        const torchEl = document.querySelector(`.is-attachment[data-uid="${card._uid}"]`) || document.querySelector(`[data-uid="${card._uid}"]`);
                        const locEl = document.querySelector(`[data-uid="${loc._uid}"]`);

                        if (!torchEl || !locEl) {
                            loc.progress = (loc.progress || 0) + 3;
                            engine.render();
                            onComplete();
                            return;
                        }

                        const tRect = torchEl.getBoundingClientRect();
                        const lRect = locEl.getBoundingClientRect();
                        const startX = tRect.left + (tRect.width / 2) - 26;
                        const startY = tRect.top + (tRect.height / 2) - 26;
                        const destX = lRect.right - 40;
                        const destY = lRect.top - 20;

                        let landed = 0;
                        for (let i = 0; i < 3; i++) {
                            setTimeout(() => {
                                const animToken = document.createElement('div');
                                animToken.className = 'token progress';
                                animToken.textContent = '1';
                                animToken.style.cssText = `
                                    position: fixed; z-index: 2000;
                                    left: ${startX}px; top: ${startY}px;
                                    opacity: 0; transform: scale(0.5);
                                    transition: opacity 0.25s, transform 0.25s;
                                    pointer-events: none;
                                `;
                                document.body.appendChild(animToken);

                                requestAnimationFrame(() => {
                                    animToken.style.opacity = '1';
                                    animToken.style.transform = 'scale(1)';
                                });

                                setTimeout(() => {
                                    animToken.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                    animToken.style.left = `${destX}px`;
                                    animToken.style.top = `${destY}px`;
                                }, 80);

                                setTimeout(() => {
                                    animToken.remove();
                                    loc.progress = (loc.progress || 0) + 1;
                                    engine.render();

                                    const freshEl = document.querySelector(`[data-uid="${loc._uid}"]`);
                                    if (freshEl && engine.window.spawnBurstAtElement) {
                                        engine.window.spawnBurstAtElement(freshEl, '#4caf50', 12);
                                    }

                                    landed++;
                                    if (landed === 3) {
                                        engine.toast("Cave Torch", `Placed 3 progress on ${loc.name}.`, "success");
                                        onComplete();
                                    }
                                }, 600);
                            }, i * 220);
                        }
                    };

                    // Step 1: Animate progress tokens onto the Dark location
                    animateTokens(() => {
                        // Step 2: Execute Cave Torch's Forced response FIRST
                        executeForcedDiscard(() => {
                            // Step 3: AFTER Cave Torch's Forced action fully completes, check if location is explored & trigger its response
                            const exploreFn = (engine.window && engine.window.checkLocationExplored) || engine.checkLocationExplored;
                            if (loc.progress >= (loc.questPts || 0)) {
                                if (exploreFn) exploreFn(loc);
                            }
                        });
                    });
                }, 'Cancel');
                return true;
            }
        },
        {
            id: 'nibin_great_cave_troll', name: 'Great Cave-troll', type: 'enemy', sphere: 'encounter-enemy', portrait: '🧌', engagement: 36, threat: 3, attack: 6, defense: 4, hp: 6, trait: 'Troll', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/great_cave_troll.jpg',
            text: 'Cannot have attachments.\nFor each point of excess combat damage dealt by Great Cave-troll (damage that is dealt beyond the remaining hit points of the character damaged by its attack) remove 1 progress from the current quest.'
        },
        {
           id: 'nibin_cavern_warg', name: 'Cavern Warg', type: 'enemy', sphere: 'encounter-enemy', portrait: '🐺', engagement: 33, threat: 2, attack: 3, defense: 2, hp: 3, trait: 'Creature · Warg', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/cavern_warg.jpg',
            text: 'Response: When Cavern Warg attacks you, exhaust Cave Torch to cancel the attack and return Cavern Warg to the staging area.\nShadow: If this attack destroys a character, return attacking enemy to the staging area after this attack.',
            shadow: 'Shadow: If this attack destroys a character, return attacking enemy to the staging area after this attack.',
            onShadow: function(shadow, enemy, defChars, game, engine, next) {
                const allChars = [...game.heroes, ...game.allies];
                const cleanups = [];

                const setWargReturn = () => {
                    const isAlreadyInStaging = game && game.stagingArea && game.stagingArea.some(e => e._uid === enemy._uid) && (!game.engagedEnemies || !game.engagedEnemies.some(e => e._uid === enemy._uid));
                    if (isAlreadyInStaging) return;
                    if (!enemy._wargsLikeReturnToStaging) {
                        enemy._wargsLikeReturnToStaging = true;
                        engine.toast("Cavern Warg Shadow", "Character destroyed! Attacking enemy will return to staging area.", "danger");
                    }
                };

                const origOnHero = window.onHeroLeftPlay;
                const origOnAlly = window.onAllyLeftPlay;

                window.onHeroLeftPlay = function(hero) {
                    setWargReturn();
                    if (origOnHero) origOnHero.apply(this, arguments);
                };
                window.onAllyLeftPlay = function(name, ownerIdx) {
                    setWargReturn();
                    if (origOnAlly) origOnAlly.apply(this, arguments);
                };

                cleanups.push(() => {
                    window.onHeroLeftPlay = origOnHero;
                    window.onAllyLeftPlay = origOnAlly;
                });

                allChars.forEach(char => {
                    const desc = Object.getOwnPropertyDescriptor(char, 'damage') || {};
                    const origGet = desc.get || (function() { return this._damage || 0; });
                    const origSet = desc.set || (function(v) { this._damage = v; });

                    Object.defineProperty(char, 'damage', {
                        get: origGet,
                        set: function(val) {
                            const hp = this.hp || 0;
                            if (val >= hp && origGet.call(this) < hp) {
                                setWargReturn();
                            }
                            origSet.call(this, val);
                        },
                        configurable: true
                    });

                    cleanups.push(() => {
                        Object.defineProperty(char, 'damage', {
                            get: origGet,
                            set: origSet,
                            configurable: true
                        });
                    });
                });

                const cleanupTimer = setInterval(() => {
                    if (game.currentEnemyAttacking !== enemy || game.phase === 'refresh' || game.phase === 'combat-player-attack') {
                        clearInterval(cleanupTimer);
                        cleanups.forEach(fn => fn());
                    }
                }, 100);

                next();
            }
        },
        {
            id: 'nibin_goblin_tunnels', name: 'Goblin Tunnels', type: 'location', sphere: 'encounter-location', portrait: '🕳️', threat: 2, questPts: 7, trait: 'Underground · Dark', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/goblin_tunnels.jpg',
            text: 'While Goblin Tunnels is in the staging area, it gains: "Forced: After a Goblin is revealed from the encounter deck, remove a progress token from the current quest card."\nShadow: Attacking enemy gets +1 Attack (+3 Attack instead if attacking enemy is a Goblin.)',
            getThreatMod: function(card, game, engine) {
                let mod = 0;
                if ((card.trait||'').includes('Dark') && game.stagingArea.some(c => c.id === 'nibin_branching_paths')) {
                    mod += game.stagingArea.filter(c => c.id === 'nibin_branching_paths').length;
                }
                return mod;
            }
        },
        {
            id: 'nibin_lightless_passage', name: 'Lightless Passage', type: 'location', sphere: 'encounter-location', portrait: '🌑', threat: 4, questPts: 4, trait: 'Underground · Dark', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/lightless_passage.jpg',
            text: 'Travel: Players must exhaust a Cave Torch to travel here.\nShadow: Cancel all combat damage dealt to attacking enemy.',
            onClick: function(card, game, engine) {
                if (game.phase === 'travel' && game.pendingAction === 'travel' && !game.activeLocation && game.stagingArea.some(x => x._uid === card._uid)) {
                    let torch = null;
                    game.heroes.forEach(h => {
                        if (h.attached) {
                            const t = h.attached.find(a => a.id === 'nibin_cave_torch');
                            if (t) torch = t;
                        }
                    });
                    if (!torch || torch.exhausted) {
                        engine.toast("Lightless Passage", "You must exhaust a ready Cave Torch to travel here.", "danger");
                        return true;
                    }
                }
                return false;
            },
            getThreatMod: function(card, game, engine) {
                let mod = 0;
                if ((card.trait||'').includes('Dark') && game.stagingArea.some(c => c.id === 'nibin_branching_paths')) {
                    mod += game.stagingArea.filter(c => c.id === 'nibin_branching_paths').length;
                }
                return mod;
            },
            onTravel: function(loc, game, engine, proceedTravel) {
                let torch = null;
                game.heroes.forEach(h => {
                    if (h.attached) {
                        const t = h.attached.find(a => a.id === 'nibin_cave_torch');
                        if (t) torch = t;
                    }
                });
                if (torch && !torch.exhausted) {
                    torch.exhausted = true;
                    engine.toast("Lightless Passage", "Exhausted Cave Torch to travel.", "success");
                    engine.render();
                    const triggerForced = () => {
                        if (game.encounterDeck.length === 0 && game.encounterDiscard.length > 0) {
                            game.encounterDeck = engine.shuffle(game.encounterDiscard);
                            game.encounterDiscard = [];
                        }
                        if (game.encounterDeck.length > 0) {
                            const top = game.encounterDeck.pop();
                            if (top.type === 'enemy') {
                                engine.toast("Cave Torch", `Forced: Discarded ${top.name} — it is an enemy! Added to staging.`, "danger");
                                if (engine.window && engine.window.animateDrawDirectToStaging) {
                                    engine.window.animateDrawDirectToStaging(top, () => {
                                        game.stagingArea.push(top);
                                        engine.render();
                                    });
                                } else {
                                    game.stagingArea.push(top);
                                    engine.render();
                                }
                            } else {
                                engine.toast("Cave Torch", `Forced: Discarded ${top.name}.`, "info");
                                const deckEl = document.getElementById('encounter-deck-pile');
                                const startRect = deckEl ? deckEl.getBoundingClientRect() : null;
                                if (engine.window && engine.window.discardCard) {
                                    engine.window.discardCard(top, game.encounterDiscard, false, startRect);
                                } else {
                                    game.encounterDiscard.push(top);
                                }
                                engine.render();
                            }
                        }
                    };
                    if (engine.window && engine.window.checkEmptyEncounterDeck) {
                        engine.window.checkEmptyEncounterDeck(triggerForced);
                    } else {
                        triggerForced();
                    }
                    proceedTravel();
                } else {
                    engine.toast("Lightless Passage", "You must exhaust a ready Cave Torch to travel here.", "danger");
                }
            },
            onShadow: function(shadow, enemy, defChars, game, engine, next) {
                enemy._lightlessPassageActive = true;
                engine.toast("Lightless Passage", "Combat damage against this enemy is cancelled for the phase!", "warning");
                const clearCheck = setInterval(() => {
                    if (game.phase === 'refresh' || game.gameOver || !game.engagedEnemies.includes(enemy)) {
                        delete enemy._lightlessPassageActive;
                        clearInterval(clearCheck);
                    }
                }, 1000);
                next();
            }
        },
        {
            id: 'nibin_branching_paths', name: 'Branching Paths', type: 'location', sphere: 'encounter-location', portrait: '🔱', threat: 1, questPts: 3, trait: 'Underground · Dark', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/branching_paths.jpg',
            text: 'While Branching Paths is in the staging area, each Dark location gets +1 Threat.\nForced: After Branching Paths leaves play as an explored location, look at the top 3 cards of the encounter deck. Players must choose 1 of those to reveal and add to the staging area, moving the other 2 to the bottom of the deck.',
            getThreatMod: function(card, game, engine) {
                let mod = 0;
                if ((card.trait||'').includes('Dark') && game.stagingArea.some(c => c.id === 'nibin_branching_paths')) {
                    mod += game.stagingArea.filter(c => c.id === 'nibin_branching_paths').length;
                }
                return mod;
            },
            onExplored: function(loc, game, engine) {
                game._dungeonResolving = true;
                window.queueNibinExplored(loc, game, engine, (done) => {
                    const wrapUp = () => {
                        game._dungeonResolving = false;
                        if (game._pendingDungeonProgress > 0) {
                            const p = game._pendingDungeonProgress;
                            game._pendingDungeonProgress = 0;
                            if (engine.addProgressToQuest) {
                                engine.addProgressToQuest(p);
                            } else {
                                game.questProgress += p;
                            }
                        }
                        if (engine.render) engine.render();
                        done();
                    };

                    engine.window.checkEmptyEncounterDeck(() => {
                        if (game.encounterDeck.length === 0) {
                            wrapUp();
                            return;
                        }
                        const count = Math.min(3, game.encounterDeck.length);
                        const topCards = [];
                        for(let i=0; i<count; i++) topCards.push(game.encounterDeck.pop());
                        
                        const promptHTML = `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Branching Paths: Choose 1 card to reveal and add to staging:</span>`;
                        
                        engine.showCardPicker("Branching Paths", promptHTML, topCards, (chosen) => {
                            if (!chosen) chosen = topCards[0];
                            const others = topCards.filter(c => c._uid !== chosen._uid);
                            
                            // Push chosen card onto top of deck so engine reveals and adds it to staging properly
                            game.encounterDeck.push(chosen);
                            engine.toast("Branching Paths", `Revealing ${chosen.name}!`, "danger");
                            
                            engine.window.revealEncounterCard(() => {
                                engine.render();
                                
                                if (others.length === 0) {
                                    wrapUp();
                                } else if (others.length === 1) {
                                    game.encounterDeck.unshift(others[0]);
                                    engine.render();
                                    wrapUp();
                                } else {
                                    // Prompt player to select which remaining card goes to the very bottom first
                                    const bottomPrompt = `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Branching Paths: Choose which card to place at the VERY BOTTOM of the encounter deck first:</span>`;
                                    engine.showCardPicker("Branching Paths", bottomPrompt, others, (bottomCard) => {
                                        if (!bottomCard) bottomCard = others[0];
                                        const secondCard = others.find(c => c._uid !== bottomCard._uid) || others[1];
                                        const startRect = engine.window._lastPickerRect;

                                        const animateCardToDeckBottom = (card, rect, onFinish) => {
                                            const deckEl = document.getElementById('encounter-deck-pile');
                                            if (!deckEl || !rect) {
                                                onFinish();
                                                return;
                                            }
                                            const deckRect = deckEl.getBoundingClientRect();
                                            const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                                            const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;

                                            const ghostWrap = document.createElement('div');
                                            ghostWrap.style.cssText = `
                                                position: fixed; z-index: 2000;
                                                width: ${cardW}px; height: ${cardH}px;
                                                left: ${rect.left}px; top: ${rect.top}px;
                                                perspective: 1000px;
                                                transform: scale(${rect.width / cardW});
                                                transform-origin: top left;
                                                transition: all 0.55s cubic-bezier(0.25, 0.8, 0.25, 1);
                                                pointer-events: none;
                                            `;

                                            const ghostInner = document.createElement('div');
                                            ghostInner.style.cssText = `
                                                width: 100%; height: 100%; position: relative;
                                                transform-style: preserve-3d;
                                                transition: transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1);
                                            `;

                                            const ghostFront = document.createElement('div');
                                            ghostFront.style.cssText = `
                                                position: absolute; inset: 0; backface-visibility: hidden;
                                                border-radius: 6px; overflow: hidden;
                                            `;
                                            const cardImg = card.img || 'cards/dark_of_mirkwood/caves_of_nibin/cave_torch.jpg';
                                            ghostFront.innerHTML = `<img src="${cardImg}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;

                                            const ghostBack = document.createElement('div');
                                            ghostBack.style.cssText = `
                                                position: absolute; inset: 0; backface-visibility: hidden;
                                                transform: rotateY(180deg); border-radius: 6px; border: 2px solid #7a2020;
                                                background: url('cards/ecb.png') no-repeat center center;
                                                background-size: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.6);
                                            `;

                                            ghostInner.appendChild(ghostFront);
                                            ghostInner.appendChild(ghostBack);
                                            ghostWrap.appendChild(ghostInner);
                                            document.body.appendChild(ghostWrap);

                                            void ghostWrap.offsetWidth;

                                            ghostWrap.style.left = `${deckRect.left}px`;
                                            ghostWrap.style.top = `${deckRect.top}px`;
                                            ghostWrap.style.transform = `scale(${deckRect.width / cardW})`;
                                            ghostInner.style.transform = 'rotateY(180deg)';

                                            if (window.SoundFX) window.SoundFX.playWhoosh();

                                            setTimeout(() => {
                                                ghostWrap.remove();
                                                onFinish();
                                            }, 550);
                                        };

                                        // Animate bottomCard first (flips face-down to bottom of deck)
                                        animateCardToDeckBottom(bottomCard, startRect, () => {
                                            game.encounterDeck.unshift(bottomCard);
                                            
                                            // Animate secondCard next (flips face-down to bottom of deck, right above bottomCard)
                                            animateCardToDeckBottom(secondCard, startRect, () => {
                                                game.encounterDeck.unshift(secondCard);
                                                engine.toast("Branching Paths", "Placed remaining 2 cards at the bottom of the deck.", "info");
                                                engine.render();
                                                wrapUp();
                                            });
                                        });
                                    }, true);
                                }
                            });
                        }, true);
                    });
                });
            }
        },
        {
            id: 'nibin_collapsed_mine', name: 'Collapsed Mine', type: 'location', sphere: 'encounter-location', portrait: '🪨', threat: 2, questPts: 6, trait: 'Underground · Dark', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/collapsed_mine.jpg',
            text: 'While Collapsed Mine is in the staging area, no more than 4 progress can be placed on the quest each round.\nShadow: Raise your threat by 1 for each point of damage dealt by this attack.',
            getThreatMod: function(card, game, engine) {
                let mod = 0;
                if ((card.trait||'').includes('Dark') && game.stagingArea.some(c => c.id === 'nibin_branching_paths')) {
                    mod += game.stagingArea.filter(c => c.id === 'nibin_branching_paths').length;
                }
                return mod;
            },
            onShadow: function(shadow, enemy, defChars, game, engine, next) {
                const chars = [...game.heroes, ...game.allies];
                const originalDescriptors = new Map();

                chars.forEach(char => {
                    const desc = Object.getOwnPropertyDescriptor(char, 'damage');
                    if (desc) {
                        originalDescriptors.set(char._uid, desc);
                        const origGet = desc.get;
                        const origSet = desc.set;
                        Object.defineProperty(char, 'damage', {
                            get: origGet,
                            set: function(val) {
                                const prev = origGet.call(this);
                                origSet.call(this, val);
                                const diff = val - prev;
                                if (diff > 0) {
                                    const pIdx = enemy._engagedWithPlayerIdx !== undefined ? enemy._engagedWithPlayerIdx : game.activeTabPlayerIdx;
                                    game.threats[pIdx] += diff;
                                    if (game.numPlayers === 1) game.threat += diff;
                                    engine.toast("Shadow Effect", `Collapsed Mine raises threat by ${diff}!`, "danger");

                                    // Full-screen brief red overlay vignette
                                    const overlay = document.createElement('div');
                                    overlay.style.cssText = 'position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(200,0,0,0.45); pointer-events:none; transition: background 0.3s ease-out;';
                                    
                                    // Giant floating center-screen feedback text
                                    const bigText = document.createElement('div');
                                    bigText.style.cssText = "font-family:'Cinzel Decorative', serif; font-size:4.5rem; font-weight:900; color:#ff3030; text-shadow:0 0 35px #ff0000, 0 4px 15px #000; transform:scale(0.5); opacity:0; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);";
                                    bigText.textContent = `+${diff} Threat!`;
                                    overlay.appendChild(bigText);
                                    document.body.appendChild(overlay);

                                    if (engine.window && engine.window.screenShake) {
                                        engine.window.screenShake(18, 500);
                                    }
                                    const hudThreat = document.getElementById('hud-threat');
                                    if (hudThreat && engine.window && engine.window.spawnBurstAtElement) {
                                        engine.window.spawnBurstAtElement(hudThreat, '#c0392b', 15);
                                    }

                                    setTimeout(() => {
                                        bigText.style.transform = 'scale(1)';
                                        bigText.style.opacity = '1';
                                    }, 50);

                                    setTimeout(() => {
                                        overlay.style.background = 'rgba(200,0,0,0)';
                                        bigText.style.transform = 'scale(1.2) translateY(-100px)';
                                        bigText.style.opacity = '0';
                                        setTimeout(() => overlay.remove(), 400);

                                        // Update top HUD element (+# text below Threat Dial)
                                        const diffEl = document.getElementById('hud-threat-diff');
                                        if (diffEl) {
                                            diffEl.textContent = `+${diff}`;
                                            diffEl.classList.remove('threat-diff-active');
                                            void diffEl.offsetWidth; // Trigger DOM reflow to restart CSS keyframe animation
                                            diffEl.classList.add('threat-diff-active');
                                            setTimeout(() => {
                                                diffEl.classList.remove('threat-diff-active');
                                                diffEl.textContent = '';
                                            }, 3500);
                                        }
                                    }, 1500);

                                    engine.render();
                                }
                            },
                            configurable: true,
                            enumerable: true
                        });
                    }
                });

                const cleanupInterval = setInterval(() => {
                    if (!game.currentEnemyAttacking || game.currentEnemyAttacking._uid !== enemy._uid || game.phase === 'refresh' || game.phase === 'combat-player-attack' || game.gameOver) {
                        clearInterval(cleanupInterval);
                        chars.forEach(char => {
                            const origDesc = originalDescriptors.get(char._uid);
                            if (origDesc) {
                                Object.defineProperty(char, 'damage', origDesc);
                            }
                        });
                    }
                }, 100);

                next();
            }
        },
        {
            id: 'nibin_goblin_dungeon', name: 'Goblin Dungeon', type: 'location', sphere: 'encounter-location', portrait: '⛓️', threat: 3, questPts: 5, trait: 'Underground', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/goblin_dungeon.jpg',
            text: 'Travel: Reveal the top card of the encounter deck to travel here.\nResponse: After Goblin Dungeon leaves play as an explored location, the first player searches the top 5 cards of his deck for an ally and puts it into play under his control. Shuffle the rest of the searched cards back into his deck.',
            onTravel: function(loc, game, engine, proceedTravel) {
                engine.toast("Goblin Dungeon", "Revealing top card of encounter deck...", "warning");
                engine.window.revealEncounterCard(proceedTravel);
            },
            onExplored: function(loc, game, engine) {
                game._dungeonResolving = true;
                window.queueNibinExplored(loc, game, engine, (done) => {
                    const wrapUp = () => {
                        game._dungeonResolving = false;
                        if (game._pendingDungeonProgress > 0) {
                            const p = game._pendingDungeonProgress;
                            game._pendingDungeonProgress = 0;
                            if (engine.addProgressToQuest) {
                                engine.addProgressToQuest(p);
                            } else {
                                game.questProgress += p;
                            }
                        }
                        if (engine.render) engine.render();
                        done();
                    };

                    const p1Idx = game.firstPlayerIdx || 0;
                    if (game.activeTabPlayerIdx !== p1Idx && engine.window && engine.window._switchTab) {
                        engine.window._switchTab(p1Idx);
                    }
                    const deck = (game.playerDecks && game.playerDecks[p1Idx]) ? game.playerDecks[p1Idx] : game.playerDeck;
                    if (!deck || deck.length === 0) {
                        wrapUp();
                        return;
                    }
                    const top5 = deck.slice(-5).reverse();
                    
                    const isCardUniqueAndInPlay = (c) => {
                        if (engine.window && engine.window.isUniqueInPlay) return engine.window.isUniqueInPlay(c);
                        if (!c.unique) return false;
                        if (game.heroes.some(h => h.id === c.id || (h.attached && h.attached.some(a => a.id === c.id)))) return true;
                        if (game.allies.some(a => a.id === c.id || (a.attached && a.attached.some(att => att.id === c.id)))) return true;
                        return false;
                    };
                    
                    const rawAllies = top5.filter(c => c.type === 'ally');
                    const allies = rawAllies.filter(c => !isCardUniqueAndInPlay(c));

                    const performShuffle = () => {
                        if (game.playerDecks && game.playerDecks[p1Idx]) {
                            game.playerDecks[p1Idx] = engine.shuffle(deck);
                        } else {
                            game.playerDeck = engine.shuffle(deck);
                        }
                        if (engine.window && engine.window._animateDeckShuffle) {
                            engine.window._animateDeckShuffle('Player Deck', 'Shuffled searched cards back into deck.', true);
                        }
                    };

                    if (allies.length > 0) {
                        engine.showCardPicker("Goblin Dungeon", '<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Choose 1 ally to put into play:</span>', allies, (chosen) => {
                            if (chosen) {
                                const idx = deck.findIndex(c => c._uid === chosen._uid);
                                if (idx >= 0) deck.splice(idx, 1);
                                chosen._ownerIdx = p1Idx;

                                const animFn = window._animatePlayerDeckToZone || (engine.window && engine.window._animatePlayerDeckToZone);
                                if (animFn) {
                                    animFn(chosen, 'player-content', () => {
                                        game.allies.push(chosen);
                                        engine.toast("Goblin Dungeon", `Put ${chosen.name} into play!`, "success");
                                        if (engine.window && engine.window.handleEntersPlay) {
                                            engine.window.handleEntersPlay(chosen);
                                        } else if (window.handleEntersPlay) {
                                            window.handleEntersPlay(chosen);
                                        }
                                        performShuffle();
                                        wrapUp();
                                    });
                                } else {
                                    game.allies.push(chosen);
                                    engine.toast("Goblin Dungeon", `Put ${chosen.name} into play!`, "success");
                                    if (engine.window && engine.window.handleEntersPlay) {
                                        engine.window.handleEntersPlay(chosen);
                                    } else if (window.handleEntersPlay) {
                                        window.handleEntersPlay(chosen);
                                    }
                                    performShuffle();
                                    wrapUp();
                                }
                            } else {
                                performShuffle();
                                wrapUp();
                            }
                        }, true);
                    } else {
                        if (rawAllies.length > 0) {
                            engine.toast("Goblin Dungeon", "All allies in the top 5 cards are Unique and already in play.", "info");
                        } else {
                            engine.toast("Goblin Dungeon", "No allies in the top 5 cards.", "info");
                        }
                        performShuffle();
                        wrapUp();
                    }
                });
            }
        },
        {
            id: 'nibin_crumbling_stairs', name: 'Crumbling Stairs', type: 'location', sphere: 'encounter-location', portrait: '🧱', threat: 3, questPts: 3, trait: 'Underground', copies: 1,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/crumbling_stairs.jpg',
            text: 'While Crumbling Stairs is in the staging area, progress cannot be placed on it.\nForced: When Crumbling Stairs leaves play as an explored location, discard the top card of the encounter deck. If the discarded card is a location, put it into play as the active location.',
            onExplored: function(loc, game, engine) {
                window.queueNibinExplored(loc, game, engine, (done) => {
                    if (game.encounterDeck.length > 0) {
                        const top = game.encounterDeck.pop();
                        
                        const deckEl = document.getElementById('encounter-deck-pile');
                        const startRect = deckEl ? deckEl.getBoundingClientRect() : null;
                        let destRect = null;
                        
                        if (top.type === 'location') {
                            const targetEl = document.getElementById('active-location-content');
                            if (targetEl) {
                                const hasPlaceholder = !game.activeLocation;
                                const originalHTML = targetEl.innerHTML;
                                if (hasPlaceholder) targetEl.innerHTML = '';
                                const stub = document.createElement('div');
                                stub.className = 'card';
                                stub.style.visibility = 'hidden';
                                stub.style.margin = '0';
                                targetEl.appendChild(stub);
                                destRect = stub.getBoundingClientRect();
                                stub.remove();
                                if (hasPlaceholder) targetEl.innerHTML = originalHTML;
                            }
                        } else {
                            const discardEl = document.getElementById('encounter-discard-pile');
                            if (discardEl) destRect = discardEl.getBoundingClientRect();
                        }

                        const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                        const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;

                        if (startRect && destRect) {
                            const ghost = document.createElement('div');
                            ghost.style.cssText = `
                                position: fixed; z-index: 2000;
                                width: ${cardW}px; height: ${cardH}px;
                                left: ${startRect.left}px; top: ${startRect.top}px;
                                transform: scale(${startRect.width / cardW});
                                transform-origin: top left;
                                pointer-events: none;
                                box-shadow: 0 10px 25px rgba(0,0,0,0.8);
                                border-radius: 6px; overflow: hidden;
                                transition: none;
                            `;
                            const cardImg = top.img 
                                ? top.img 
                                : (top.code ? `https://ringsdb.com/bundles/cards/${top.code}.png` : `https://hallofbeorn.com/Images/Cards/Core-Set/${top.name.replace(/ /g, '-').replace(/'/g, '')}.jpg`);
                                
                            ghost.innerHTML = `<img src="${cardImg}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;" alt="${top.name}">`;
                            ghost.className = `card ${top.sphere || 'encounter-location'}`;
                            document.body.appendChild(ghost);

                            requestAnimationFrame(() => {
                                requestAnimationFrame(() => {
                                    ghost.style.transition = 'all 0.65s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                    ghost.style.left = `${destRect.left}px`;
                                    ghost.style.top = `${destRect.top}px`;
                                    ghost.style.transform = `scale(${destRect.width / cardW})`;
                                    if (window.SoundFX && window.SoundFX.playWhoosh) {
                                        window.SoundFX.playWhoosh();
                                    }
                                });
                            });

                            setTimeout(() => {
                                ghost.remove();
                                if (top.type === 'location') {
                                    game.activeLocation = top;
                                    engine.toast("Crumbling Stairs Forced Effect", `${top.name} is now the active location!`, "success");
                                } else {
                                    game.encounterDiscard.push(top);
                                    engine.toast("Crumbling Stairs Forced Effect", `Discarded ${top.name} from top of deck.`, "info");
                                }
                                engine.render();
                                done();
                            }, 650);
                        } else {
                            if (top.type === 'location') {
                                game.activeLocation = top;
                                engine.toast("Crumbling Stairs Forced Effect", `${top.name} is now the active location!`, "success");
                            } else {
                                game.encounterDiscard.push(top);
                                engine.toast("Crumbling Stairs Forced Effect", `Discarded ${top.name} from top of deck.`, "info");
                            }
                            engine.render();
                            done();
                        }
                    } else {
                        done();
                    }
                });
            }
        },
        {
            id: 'nibin_crumbling_ruin', name: 'Crumbling Ruin', type: 'treachery', sphere: 'encounter-treachery', portrait: '🏚️', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/crumbling_ruin.jpg',
            text: 'When Revealed: Each player must exhaust a character and discard the top card of his deck, if able. If the printed cost of the discarded card is equal to or higher than the remaining hit points of the exhausted character, discard the exhausted character.',
            onReveal: function(card, game, engine, cb) {
                let pIdx = 0;
                const destroyedAlliesQueue = [];
                const processNext = () => {
                    while (pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
                    if (pIdx >= game.numPlayers) {
                        const resolveDeferredVS = () => {
                            if (destroyedAlliesQueue.length > 0) {
                                if (engine.window && engine.window.onAllyLeftPlay) {
                                    engine.window.onAllyLeftPlay(destroyedAlliesQueue, () => {
                                        destroyedAlliesQueue.length = 0;
                                        cb();
                                    });
                                } else cb();
                            } else {
                                cb();
                            }
                        };
                        resolveDeferredVS();
                        return;
                    }
                    const deck = (game.playerDecks && game.playerDecks[pIdx]) ? game.playerDecks[pIdx] : game.playerDeck;
                    const discardPile = (game.playerDiscards && game.playerDiscards[pIdx]) ? game.playerDiscards[pIdx] : game.playerDiscard;
                    const readyChars = [...game.heroes, ...game.allies].filter(c => (c._ownerIdx === undefined || c._ownerIdx === pIdx) && !c.exhausted);

                    if (readyChars.length > 0 && deck && deck.length > 0) {
                        if (game.activeTabPlayerIdx !== pIdx) engine.window._switchTab(pIdx);
                        const promptText = `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Player ${pIdx+1}: Choose a character to exhaust:</span>`;
                        engine.showHeroPicker("Crumbling Ruin", promptText, readyChars, (chosen) => {
                            if (chosen) {
                                const charEl = document.querySelector(`[data-uid="${chosen._uid}"]`);
                                const deckEl = document.getElementById('player-deck-pile');
                                const pDiscardEl = document.getElementById('player-discard-pile');
                                const hDiscardEl = document.getElementById('hero-discard-pile') || pDiscardEl;

                                const charRect = charEl ? charEl.getBoundingClientRect() : { left: window.innerWidth / 2 - 160, top: window.innerHeight / 2 - 100, width: 144, height: 202 };
                                const deckRect = deckEl ? deckEl.getBoundingClientRect() : { left: window.innerWidth - 120, top: window.innerHeight - 150, width: 100, height: 140 };

                                if (charEl) charEl.style.opacity = '0';

                                const discarded = deck.pop();

                                const cardW = 144;
                                const cardH = 202;
                                const targetY = (window.innerHeight / 2) - (cardH / 2);
                                const targetCharX = (window.innerWidth / 2) - cardW - 48;
                                const targetDiscX = (window.innerWidth / 2) + 48;

                                // Create center screen ghost for character
                                const gChar = document.createElement('div');
                                gChar.style.cssText = `
                                    position: fixed; z-index: 2500;
                                    width: ${cardW}px; height: ${cardH}px;
                                    left: ${charRect.left + (charRect.width - cardW) / 2}px; top: ${charRect.top + (charRect.height - cardH) / 2}px;
                                    transform: scale(${charRect.width / cardW});
                                    transform-origin: center;
                                    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                                    pointer-events: none;
                                    box-shadow: 0 10px 25px rgba(0,0,0,0.8);
                                    border-radius: 6px; overflow: visible;
                                `;
                                gChar.innerHTML = engine.window.cardHTML ? engine.window.cardHTML(chosen, false, true, true, true) : (charEl ? charEl.innerHTML : '');
                                gChar.className = 'card ' + (chosen.sphere || 'neutral');

                                // Create center screen ghost for discarded card
                                const gCard = document.createElement('div');
                                gCard.style.cssText = `
                                    position: fixed; z-index: 2501;
                                    width: ${cardW}px; height: ${cardH}px;
                                    left: ${deckRect.left + (deckRect.width - cardW) / 2}px; top: ${deckRect.top + (deckRect.height - cardH) / 2}px;
                                    transform: scale(${deckRect.width / cardW});
                                    transform-origin: center;
                                    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                                    pointer-events: none;
                                    box-shadow: 0 10px 25px rgba(0,0,0,0.8);
                                    border-radius: 6px; overflow: visible;
                                `;
                                const cardImg = discarded.code ? `https://ringsdb.com/bundles/cards/${discarded.code}.png` : (discarded.img || 'cards/cardback.png');
                                gCard.innerHTML = `<img src="${cardImg}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
                                gCard.className = 'card ' + (discarded.sphere || 'neutral');

                                document.body.appendChild(gChar);
                                document.body.appendChild(gCard);

                                void gChar.offsetWidth;
                                void gCard.offsetWidth;

                                if (window.SoundFX) window.SoundFX.playWhoosh();

                                // Step 1: Slide both cards to center screen
                                gChar.style.left = `${targetCharX}px`;
                                gChar.style.top = `${targetY}px`;
                                gChar.style.transform = `scale(1.2)`;

                                gCard.style.left = `${targetDiscX}px`;
                                gCard.style.top = `${targetY}px`;
                                gCard.style.transform = `scale(1.2)`;

                                setTimeout(() => {
                                    // Step 2: Discarded card winds up right and bashes left into character
                                    gCard.style.transition = 'transform 0.15s ease-out';
                                    gCard.style.transform = `scale(1.2) translateX(35px)`;

                                    setTimeout(() => {
                                        gCard.style.transition = 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)';
                                        gCard.style.transform = `scale(1.2) translateX(-125px)`;

                                        gChar.style.transition = 'transform 0.12s ease-out';
                                        gChar.style.transform = `scale(1.2) translateX(-25px) rotate(-8deg)`;

                                        if (engine.window && engine.window.screenShake) engine.window.screenShake(15, 300);

                                        setTimeout(() => {
                                            gChar.style.transform = `scale(1.2) translateX(0px) rotate(0deg)`;
                                            gCard.style.transform = `scale(1.2) translateX(0px)`;

                                            // Step 3: Evaluate printed cost vs remaining HP
                                            const cost = Number(discarded.cost) || 0;
                                            const remainingHp = (chosen.hp || 0) - (chosen.damage || 0);
                                            const isDestroyed = cost >= remainingHp;

                                            // Pop-up banner outcome text
                                            const banner = document.createElement('div');
                                            banner.style.cssText = `
                                                position: fixed; top: 38%; left: 50%;
                                                transform: translate(-50%, -50%) scale(0.5);
                                                z-index: 3000; font-family: 'Cinzel Decorative', serif;
                                                font-size: 4.5rem; font-weight: 900;
                                                color: ${isDestroyed ? '#ff3030' : '#4caf50'};
                                                text-shadow: 0 0 35px ${isDestroyed ? '#ff0000' : '#4caf50'}, 0 4px 15px #000;
                                                opacity: 0; pointer-events: none;
                                                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                                            `;
                                            banner.textContent = isDestroyed ? 'Destroyed!' : 'Survived!';
                                            document.body.appendChild(banner);

                                            requestAnimationFrame(() => {
                                                banner.style.opacity = '1';
                                                banner.style.transform = 'translate(-50%, -50%) scale(1)';
                                            });

                                            setTimeout(() => {
                                                banner.style.opacity = '0';
                                                banner.style.transform = 'translate(-50%, -80%) scale(1.3)';
                                                setTimeout(() => banner.remove(), 400);

                                                // Step 4: Resolve card movements to final destinations
                                                gCard.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                                let discRect = pDiscardEl ? pDiscardEl.getBoundingClientRect() : null;
                                                if (!discRect || (discRect.left === 0 && discRect.top === 0)) {
                                                    discRect = { left: window.innerWidth - 120, top: window.innerHeight - 150, width: 100, height: 140 };
                                                }
                                                gCard.style.left = `${discRect.left + (discRect.width - cardW) / 2}px`;
                                                gCard.style.top = `${discRect.top + (discRect.height - cardH) / 2}px`;
                                                gCard.style.transform = `scale(${discRect.width / cardW})`;
                                                gCard.style.opacity = '0.3';

                                                // Move Crumbling Ruin treachery card to encounter discard pile simultaneously
                                                const eGhost = window._activeEncounterGhost || document.getElementById('encounter-limbo-ghost');
                                                const eDiscardEl = document.getElementById('encounter-discard-pile');
                                                if (eGhost && eDiscardEl) {
                                                    const eDiscRect = eDiscardEl.getBoundingClientRect();
                                                    eGhost.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                                    eGhost.style.transformOrigin = 'top left';
                                                    eGhost.style.left = `${eDiscRect.left}px`;
                                                    eGhost.style.top = `${eDiscRect.top}px`;
                                                    eGhost.style.transform = `scale(${eDiscRect.width / cardW}) rotate(0deg)`;
                                                    eGhost.style.opacity = '0.3';

                                                    card._alreadyResolved = true;
                                                    window._activeEncounterGhost = null;
                                                    setTimeout(() => {
                                                        eGhost.remove();
                                                        if (!game.encounterDiscard.includes(card)) {
                                                            game.encounterDiscard.push(card);
                                                        }
                                                    }, 600);
                                                }

                                                gChar.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                                if (isDestroyed) {
                                                    let targetDiscardEl = pDiscardEl;
                                                    if (chosen.isHero) {
                                                        const hDisc = document.getElementById('hero-discard-pile');
                                                        const hDiscCount = document.getElementById('hero-discard-count');
                                                        const hDiscLabel = document.getElementById('hero-discard-label');
                                                        if (hDisc) {
                                                            hDisc.style.display = 'block';
                                                            if (hDiscCount) hDiscCount.style.display = 'block';
                                                            if (hDiscLabel) hDiscLabel.style.display = 'block';
                                                            targetDiscardEl = hDisc;
                                                        }
                                                    }
                                                    let destHeroRect = targetDiscardEl ? targetDiscardEl.getBoundingClientRect() : null;
                                                    if (!destHeroRect || (destHeroRect.left === 0 && destHeroRect.top === 0)) {
                                                        destHeroRect = discRect;
                                                    }
                                                    gChar.style.left = `${destHeroRect.left + (destHeroRect.width - cardW) / 2}px`;
                                                    gChar.style.top = `${destHeroRect.top + (destHeroRect.height - cardH) / 2}px`;
                                                    gChar.style.transform = `scale(${destHeroRect.width / cardW})`;
                                                    gChar.style.opacity = '0.3';

                                                    if (chosen.attached) {
                                                        const torchIdx = chosen.attached.findIndex(a => a.id === 'nibin_cave_torch');
                                                        if (torchIdx >= 0) {
                                                            const torch = chosen.attached.splice(torchIdx, 1)[0];
                                                            delete torch._attachedToUid;

                                                            const torchEl = document.querySelector(`.is-attachment[data-uid="${torch._uid}"]`) || document.querySelector(`[data-uid="${torch._uid}"]`);
                                                            let startTorchRect = torchEl ? torchEl.getBoundingClientRect() : null;
                                                            if (!startTorchRect || startTorchRect.width === 0) startTorchRect = charRect;

                                                            const centerRect = { left: window.innerWidth / 2 - 72, top: window.innerHeight / 2 - 101, width: 144, height: 202 };

                                                            const gTorch = document.createElement('div');
                                                            gTorch.style.cssText = `
                                                                position: fixed; z-index: 2502;
                                                                width: ${cardW}px; height: ${cardH}px;
                                                                left: ${startTorchRect.left + (startTorchRect.width - cardW) / 2}px;
                                                                top: ${startTorchRect.top + (startTorchRect.height - cardH) / 2}px;
                                                                transform: scale(${startTorchRect.width / cardW});
                                                                transform-origin: center;
                                                                transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                                                                pointer-events: none;
                                                                box-shadow: 0 10px 25px rgba(0,0,0,0.8);
                                                                border-radius: 6px; overflow: hidden;
                                                            `;
                                                            const torchImgUrl = torch.img || 'cards/dark_of_mirkwood/caves_of_nibin/cave_torch.jpg';
                                                            gTorch.innerHTML = `<img src="${torchImgUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
                                                            gTorch.className = 'card encounter-objective';
                                                            document.body.appendChild(gTorch);

                                                            void gTorch.offsetWidth;

                                                            gTorch.style.left = `${centerRect.left}px`;
                                                            gTorch.style.top = `${centerRect.top}px`;
                                                            gTorch.style.transform = `scale(1)`;

                                                            if (engine && engine.toast) engine.toast('Removed from Game', 'Cave Torch is removed from the game!', 'danger', 4000);

                                                            setTimeout(() => {
                                                                gTorch.remove();
                                                                if (window._triggerCaveTorchBurn) {
                                                                    window._triggerCaveTorchBurn(torch, centerRect, () => {
                                                                        if (engine && engine.render) engine.render();
                                                                    });
                                                                }
                                                            }, 500);
                                                        }
                                                    }
                                                } else {
                                                    // Return safely to play area position and smoothly rotate to 90deg
                                                    gChar.style.left = `${charRect.left + (charRect.width - cardW) / 2}px`;
                                                    gChar.style.top = `${charRect.top + (charRect.height - cardH) / 2}px`;
                                                    gChar.style.transform = `scale(${charRect.width / cardW}) rotate(90deg)`;
                                                }

                                                if (window.SoundFX) window.SoundFX.playWhoosh();

                                                setTimeout(() => {
																										const gCharRect = gChar.getBoundingClientRect();
																										gChar.remove();
																										gCard.remove();

																										if (engine.discardCard) {
																												engine.discardCard(discarded, discardPile, true);
																										} else {
																												discardPile.push(discarded);
																										}

																										const finishCrumbling = () => {
																												if (engine.render) engine.render();
																												pIdx++;
																												processNext();
																										};

																										if (isDestroyed) {
																												engine.toast("Crumbling Ruin", `Discarded ${discarded.name} (Cost: ${cost}). ${chosen.name} (HP: ${remainingHp}) was destroyed!`, "danger", 4000);
																												if (chosen.isHero) {
																														chosen.damage = chosen.hp;
																														chosen._dead = true;
																														
																														const atts = [...(chosen.attached || [])];
																														chosen.attached = [];
																														atts.forEach(a => {
																																if (a.id === 'nibin_cave_torch') {
																																		delete a._attachedToUid;
																																		const centerRect = { left: window.innerWidth / 2 - 72, top: window.innerHeight / 2 - 101, width: 144, height: 202 };
																																		if (engine && engine.toast) engine.toast('Removed from Game', 'Cave Torch is removed from the game!', 'danger', 4000);
																																		if (window._triggerCaveTorchBurn) {
																																				window._triggerCaveTorchBurn(a, centerRect, () => {
																																						if (engine && engine.render) engine.render();
																																				});
																																		}
																																} else if (a.sphere === 'encounter-objective') {
																																		delete a._attachedToUid;
																																		game.stagingArea.push(a);
																																} else {
																																		if (window.discardCard) window.discardCard(a, game.playerDiscard, false, gCharRect);
																																		else if (engine.discardCard) engine.discardCard(a, game.playerDiscard, false, gCharRect);
																																}
																														});
																														
																														game.heroes = game.heroes.filter(h => h._uid !== chosen._uid);
																														const hDisc = (game.numPlayers > 1 && game.heroDiscards && game.heroDiscards[chosen._ownerIdx !== undefined ? chosen._ownerIdx : 0]) 
																																					? game.heroDiscards[chosen._ownerIdx !== undefined ? chosen._ownerIdx : 0] 
																																					: game.heroDiscard;
																														if (engine.discardCard) engine.discardCard(chosen, hDisc, true);
																														else hDisc.push(chosen);
																														
																														const processHeroLeftPlay = () => {
																																const remainingHeroes = game.heroes.filter(h => (h._ownerIdx === chosen._ownerIdx || (h._ownerIdx === undefined && chosen._ownerIdx === 0)) && !h._prisoner);
																																if (remainingHeroes.length === 0 && engine.eliminatePlayer) engine.eliminatePlayer(chosen._ownerIdx || 0);
																																finishCrumbling();
																														};
																														
																														if (engine.window && engine.window.onHeroLeftPlay) {
																																engine.window.onHeroLeftPlay(chosen, processHeroLeftPlay);
																														} else {
																																processHeroLeftPlay();
																														}
																												} else {
																														game.allies = game.allies.filter(a => a._uid !== chosen._uid);
																														if (engine.discardCard) engine.discardCard(chosen, discardPile, true);
																														else discardPile.push(chosen);
																														
																														destroyedAlliesQueue.push({name: chosen.name, ownerIdx: chosen._ownerIdx});
																														finishCrumbling();
																												}
																										} else {
																												chosen.exhausted = true;
																												delete chosen._justExhaustedTime;
																												if (charEl) charEl.style.opacity = '1';
																												engine.toast("Crumbling Ruin", `Discarded ${discarded.name} (Cost: ${cost}). ${chosen.name} (HP: ${remainingHp}) survived!`, "info", 4000);
																												finishCrumbling();
																										}
																								}, 600);
                                            }, 1000);
                                        }, 120);
                                    }, 150);
                                }, 500);
                            } else {
                                pIdx++;
                                processNext();
                            }
                        }, true);
                    } else if (deck && deck.length > 0) {
                        const discarded = deck.pop();
                        const deckEl = document.getElementById('player-deck-pile');
                        const startRect = deckEl ? deckEl.getBoundingClientRect() : null;
                        if (engine.window && engine.window.discardCard) {
                            engine.window.discardCard(discarded, discardPile, false, startRect);
                        } else {
                            discardPile.push(discarded);
                        }
                        engine.toast("Crumbling Ruin", `Player ${pIdx+1} had no ready characters. Discarded ${discarded.name}.`, "info");
                        engine.render();
                        pIdx++;
                        processNext();
                    } else {
                        pIdx++;
                        processNext();
                    }
                };
                processNext();
            }
        },
        {
            id: 'nibin_lost_in_the_dark', name: 'Lost in the Dark', type: 'treachery', sphere: 'encounter-treachery', portrait: '🕯️', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/lost_in_the_dark.jpg',
            text: 'When Revealed: The player who controls Cave Torch must choose: Either exhaust Cave Torch, or progress cannot be placed on the quest until the end of the phase. (Progress can still be placed on the active location.)\nShadow: Deal 1 damage to the defending character.',
            onReveal: function(card, game, engine, cb) {
                let torch = null;
                let torchOwnerHero = null;
                game.heroes.forEach(h => {
                    if (h.attached) {
                        const t = h.attached.find(a => a.id === 'nibin_cave_torch');
                        if (t) {
                            torch = t;
                            torchOwnerHero = h;
                        }
                    }
                });
                if (torch && !torch.exhausted) {
                    engine.window.showChoiceModal("Lost in the Dark", `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Choose one:</span>`, [
                        {label: "Exhaust Cave Torch", cb: () => {
                            const ownerIdx = torchOwnerHero && torchOwnerHero._ownerIdx !== undefined ? torchOwnerHero._ownerIdx : game.activeTabPlayerIdx;
                            
                            const doDiscard = () => {
                                if (!game.encounterDeck || game.encounterDeck.length === 0) {
                                    if (game.encounterDiscard && game.encounterDiscard.length > 0) {
                                        game.encounterDeck = engine.shuffle(game.encounterDiscard);
                                        game.encounterDiscard = [];
                                    }
                                }
                                if (game.encounterDeck && game.encounterDeck.length > 0) {
                                    const top = game.encounterDeck.pop();
                                    if (top.type === 'enemy') {
                                        engine.toast("Cave Torch", `Forced: Discarded ${top.name} — it is an enemy! Added to staging.`, "danger");
                                        if (engine.window && engine.window.animateDrawDirectToStaging) {
                                            engine.window.animateDrawDirectToStaging(top, () => {
                                                game.stagingArea.push(top);
                                                engine.render();
                                                cb();
                                            });
                                        } else {
                                            game.stagingArea.push(top);
                                            engine.render();
                                            cb();
                                        }
                                    } else {
                                        engine.toast("Cave Torch", `Forced: Discarded ${top.name}.`, "info");
                                        const deckEl = document.getElementById('encounter-deck-pile');
                                        const discardEl = document.getElementById('encounter-discard-pile');
                                        if (deckEl && discardEl) {
                                            const dRect = deckEl.getBoundingClientRect();
                                            const discRect = discardEl.getBoundingClientRect();
                                            const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                                            const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                                            
                                            const ghost = document.createElement('div');
                                            ghost.style.cssText = `
                                                position: fixed; z-index: 1000;
                                                width: ${cardW}px; height: ${cardH}px;
                                                left: ${dRect.left}px; top: ${dRect.top}px;
                                                transform: scale(${dRect.width / cardW});
                                                transform-origin: top left;
                                                transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                                                pointer-events: none;
                                                box-shadow: 0 8px 24px rgba(0,0,0,0.6);
                                                border-radius: 6px; overflow: hidden;
                                            `;
                                            const topImg = top.img || 'cards/dark_of_mirkwood/caves_of_nibin/cave_torch.jpg';
                                            ghost.innerHTML = `<img src="${topImg}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
                                            ghost.className = 'card encounter-location';
                                            document.body.appendChild(ghost);
                                            
                                            void ghost.offsetWidth;

                                            ghost.style.left = `${discRect.left}px`;
                                            ghost.style.top = `${discRect.top}px`;
                                            ghost.style.transform = `scale(${discRect.width / cardW})`;
                                            
                                            if (window.SoundFX) window.SoundFX.playWhoosh();

                                            setTimeout(() => {
                                                ghost.remove();
                                                game.encounterDiscard.push(top);
                                                engine.render();
                                                cb();
                                            }, 500);
                                        } else {
                                            game.encounterDiscard.push(top);
                                            engine.render();
                                            cb();
                                        }
                                    }
                                } else {
                                    cb();
                                }
                            };

                            const proceedExhaust = () => {
                                torch.exhausted = true;
                                engine.toast("Lost in the Dark", "Exhausted Cave Torch.", "info");
                                engine.render();

                                setTimeout(() => {
                                    // Immediately slide "Lost in the Dark" to the encounter discard
                                    const ghost = document.getElementById('encounter-limbo-ghost');
                                    const discardEl = document.getElementById('encounter-discard-pile');
                                    if (ghost && discardEl) {
                                        const discRect = discardEl.getBoundingClientRect();
                                        const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                                        
                                        ghost.style.transformOrigin = 'top left';
                                        ghost.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                        ghost.style.left = `${discRect.left}px`;
                                        ghost.style.top = `${discRect.top}px`;
                                        ghost.style.transform = `scale(${discRect.width / cardW}) rotate(0deg)`;
                                        
                                        // Prevent engine from double-animating it later
                                        if (engine.window) engine.window._activeEncounterGhost = null;
                                        window._activeEncounterGhost = null;
                                        card._alreadyResolved = true;

                                        setTimeout(() => {
                                            ghost.remove();
                                            if (!game.encounterDiscard.includes(card)) {
                                                game.encounterDiscard.push(card);
                                                engine.render();
                                            }
                                            if (engine.window && engine.window.checkEmptyEncounterDeck) {
                                                engine.window.checkEmptyEncounterDeck(doDiscard);
                                            } else {
                                                doDiscard();
                                            }
                                        }, 500);
                                    } else {
                                        if (engine.window && engine.window.checkEmptyEncounterDeck) {
                                            engine.window.checkEmptyEncounterDeck(doDiscard);
                                        } else {
                                            doDiscard();
                                        }
                                    }
                                }, 800);
                            };

                            if (game.activeTabPlayerIdx !== ownerIdx && engine.window && engine.window._switchTab) {
                                engine.window._switchTab(ownerIdx);
                                setTimeout(proceedExhaust, 400);
                            } else {
                                proceedExhaust();
                            }
                        }},
                        {label: "No progress on quest this phase", cb: () => {
                            game._nibinQuestProgressBlock = true;
                            engine.toast("Lost in the Dark", "No progress can be placed on the quest this phase.", "danger");
                            cb();
                        }}
                    ], true);
                } else {
                    engine.window.showChoiceModal("Lost in the Dark", `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Cave Torch is ${torch ? 'exhausted' : 'not controlled'}:</span>`, [
                        {label: "No progress on quest this phase", cb: () => {
                            game._nibinQuestProgressBlock = true;
                            engine.toast("Lost in the Dark", "No progress can be placed on the quest this phase.", "danger");
                            cb();
                        }}
                    ], true);
                }
            },
            onShadow: function(shadow, enemy, defChars, game, engine, next) {
                if (defChars.length > 0) {
                    defChars[0].damage++;
                    engine.checkHeroDeath(defChars[0]);
                    engine.toast("Lost in the Dark", "Shadow: Deal 1 damage to defender.", "danger");
                    engine.render();
                }
                next();
            }
        },
        {
            id: 'nibin_watchful_eyes', name: 'Watchful Eyes', type: 'treachery', sphere: 'encounter-treachery', portrait: '👁️', copies: 1,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/watchful_eyes.jpg',
            text: 'When Revealed: The first player attaches Watchful Eyes to one of his heroes. (Counts as a Condition attachment with the text: "Limit 1 per hero. Forced: If attached hero is exhausted at the end of the combat phase, reveal 1 encounter card and add it to the staging area.")',
            onReveal: function(card, game, engine, cb) {
                const eligible = game.heroes.filter(h => (h._ownerIdx === game.firstPlayerIdx || (h._ownerIdx === undefined && game.firstPlayerIdx === 0)) && !h._prisoner && !h.attached.some(a => a.id === 'nibin_watchful_eyes'));
                if (eligible.length > 0) {
                    if (game.activeTabPlayerIdx !== game.firstPlayerIdx && engine.window && engine.window._switchTab) {
                        engine.window._switchTab(game.firstPlayerIdx);
                    }
                    const promptHTML = `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Attach Watchful Eyes to a hero:</span>`;
                    engine.showHeroPicker("Watchful Eyes", promptHTML, eligible, (chosen) => {
                        if (chosen) {
                            const ghost = window._activeEncounterGhost || (engine.window && engine.window._activeEncounterGhost) || document.getElementById('encounter-limbo-ghost');
                            
                            card._alreadyResolved = true;
                            if (engine.window) engine.window._activeEncounterGhost = null;
                            window._activeEncounterGhost = null;

                            const startRect = ghost ? ghost.getBoundingClientRect() : null;
                            if (ghost) ghost.remove();

                            const finalizeAttach = () => {
                                chosen.attached = chosen.attached || [];
                                card.type = 'attachment';
                                card.trait = 'Condition';
                                chosen.attached.push(card);
                                card._attachedToUid = chosen._uid;
                                engine.toast("Watchful Eyes", `Attached to ${chosen.name}.`, "danger");
                                engine.render();
                                cb();
                            };

                            const animFn = window.animateAttachmentFromHand || (engine.window && engine.window.animateAttachmentFromHand);
                            if (startRect && animFn) {
                                animFn(card, chosen._uid, startRect, null, finalizeAttach);
                            } else {
                                finalizeAttach();
                            }
                        } else {
                            cb();
                        }
                    }, true);
                } else {
                    cb();
                }
            }
        },
        {
            id: 'nibin_goblin_troop', name: 'Goblin Troop', type: 'enemy', sphere: 'encounter-enemy', portrait: '👹', engagement: 35, threat: 3, attack: 5, defense: 3, hp: 6, trait: 'Goblin · Orc', copies: 1,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/goblin_troop.jpg',
            text: 'While Goblin Troop is engaged with you, each other Goblin enemy engaged with you gets +1 Attack and +1 Defense.\nShadow: Attacking enemy gets +2 Attack.',
            shadow: 'Shadow: Attacking enemy gets +2 Attack.',
            onShadow: function(shadow, enemy, defChars, game, engine, next) {
                enemy.attackBonus = (enemy.attackBonus || 0) + 2;
                engine.toast('Shadow Effect', `${shadow.name}: Attacking enemy gets +2 Attack.`, 'danger', 2800);
                engine.render();
                next();
            }
        },
        {
            id: 'nibin_goblin_sniper', name: 'Goblin Sniper', type: 'enemy', sphere: 'encounter-enemy', portrait: '🏹', engagement: 48, threat: 2, attack: 2, defense: 0, hp: 2, trait: 'Goblin · Orc', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/goblin_sniper.jpg',
            text: 'During the encounter phase, players cannot optionally engage Goblin Sniper if there are other enemies in the staging area.\nForced: If Goblin Sniper is in the staging area at the end of the combat phase, each player deals 1 point of damage to 1 character he controls.'
        },
        {
            id: 'nibin_goblin_runners', name: 'Goblin Runners', type: 'enemy', sphere: 'encounter-enemy', portrait: '🏃', engagement: 20, threat: 1, attack: 3, defense: 1, hp: 2, trait: 'Goblin · Orc', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/goblin_runners.jpg',
            text: 'Surge.\nShadow: Attacking enemy makes an additional attack immediately after this one. (Deal a new shadow card for that attack.)',
            shadow: 'Shadow: Attacking enemy makes an additional attack immediately after this one.',
            onShadow: function(shadow, enemy, defChars, game, engine, next) {
                engine.toast("Goblin Runners", "Shadow: Attacking enemy will make an additional attack!", "danger", 4000);
                enemy._extraAttackPending = (enemy._extraAttackPending || 0) + 1;
                game._nibinBlockCombatTransitions = true;
                shadow._shadowResolved = true;
                shadow.shadow = '';
                next();
            }
        },
        {
            id: 'nibin_goblintown_scavengers', name: 'Goblintown Scavengers', type: 'enemy', sphere: 'encounter-enemy', portrait: '🧌', engagement: 12, threat: 1, attack: 1, defense: 0, hp: 3, trait: 'Goblin · Orc', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/goblintown_scavengers.jpg',
            text: 'When Revealed: Discard the top card of each player\'s deck. Until the end of the phase, increase Goblintown Scavengers\' Threat by the total printed cost of all cards discarded in this way.',
            onReveal: function(card, game, engine, cb) {
                let totalCost = 0;
                let pIdx = 0;

                const baseW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 130;
                const baseH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 182;
                const scale = 1.25;
                const cx = window.innerWidth / 2;
                const cy = window.innerHeight / 2;

                const scavX = cx - (baseW * scale) - 20;
                const scavY = cy - (baseH * scale / 2);
                const pCardX = cx + 20;
                const pCardY = scavY;

                const ghostScav = window._activeEncounterGhost || document.getElementById('encounter-limbo-ghost');
                if (ghostScav) {
                    ghostScav.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    ghostScav.style.left = `${scavX}px`;
                    ghostScav.style.top = `${scavY}px`;
                    ghostScav.style.transform = `scale(${scale})`;
                }

                const processNextPlayer = () => {
                    while (pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
                    if (pIdx >= game.numPlayers) {
                        card.threatBonus = totalCost;
                        engine.toast('Goblintown Scavengers', `Scavenged printed cost total: +${totalCost} Threat!`, 'danger', 3500);
                        engine.render();
                        if (cb) cb();
                        return;
                    }

                    if (game.activeTabPlayerIdx !== pIdx && engine.window._switchTab) {
                        engine.window._switchTab(pIdx);
                    }

                    const deck = (game.playerDecks && game.playerDecks[pIdx]) ? game.playerDecks[pIdx] : game.playerDeck;
                    const discardPile = (game.playerDiscards && game.playerDiscards[pIdx]) ? game.playerDiscards[pIdx] : game.playerDiscard;

                    if (deck && deck.length > 0) {
                        const dropped = deck.pop();
                        const cost = Number(dropped.cost) || 0;

                        const deckEl = document.getElementById('player-deck-pile');
                        const pDiscardEl = document.getElementById('player-discard-pile');

                        const startRect = deckEl ? deckEl.getBoundingClientRect() : { left: window.innerWidth - 120, top: window.innerHeight - 150, width: 100, height: 140 };
                        const discRect = pDiscardEl ? pDiscardEl.getBoundingClientRect() : { left: window.innerWidth - 120, top: window.innerHeight - 150, width: 100, height: 140 };

                        const gCard = document.createElement('div');
                        gCard.style.cssText = `
                            position: fixed; z-index: 2200;
                            width: ${baseW}px; height: ${baseH}px;
                            left: ${startRect.left + (startRect.width - baseW) / 2}px;
                            top: ${startRect.top + (startRect.height - baseH) / 2}px;
                            transform: scale(${startRect.width / baseW});
                            transform-origin: center;
                            pointer-events: none;
                            box-shadow: 0 10px 25px rgba(0,0,0,0.8);
                            border-radius: 6px; overflow: hidden;
                            transition: none;
                        `;
                        const cardImg = dropped.code ? `https://ringsdb.com/bundles/cards/${dropped.code}.png` : (dropped.img || 'cards/cardback.png');
                        gCard.innerHTML = `<img src="${cardImg}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;" alt="${dropped.name}">`;
                        gCard.className = 'card ' + (dropped.sphere || 'neutral');
                        document.body.appendChild(gCard);

                        void gCard.offsetWidth;

                        if (window.SoundFX && window.SoundFX.playWhoosh) window.SoundFX.playWhoosh();

                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                gCard.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                gCard.style.left = `${pCardX}px`;
                                gCard.style.top = `${pCardY}px`;
                                gCard.style.transform = `scale(${scale})`;
                            });
                        });

                        setTimeout(() => {
														const scavRect = ghostScav ? ghostScav.getBoundingClientRect() : null;
														const pCardRect = gCard.getBoundingClientRect();

														const tokenSize = baseW * scale * 0.38;
														
														const tokenStartX = pCardRect ? pCardRect.left - 10 : pCardX - 10;
														const tokenStartY = pCardRect ? pCardRect.top - 10 : pCardY - 10;

														const tokenTargetX = scavRect ? (scavRect.left + (2 * scale)) : (scavX + (2 * scale));
														const tokenTargetY = scavRect ? (scavRect.top + (2 * scale)) : (scavY + (2 * scale));

														const threatImgUrl = 'tokens/threat_str.png';

                            const token = document.createElement('div');
                            token.style.cssText = `
                                position: fixed; z-index: 2500;
                                left: ${tokenStartX}px; top: ${tokenStartY}px;
                                width: ${tokenSize}px; height: ${tokenSize}px;
                                border-radius: 50%; background: rgba(0,0,0,0.85);
                                border: 2px solid #ffb74d; box-shadow: 0 0 10px #ffb74d;
                                display: flex; align-items: center; justify-content: center;
                                pointer-events: none; opacity: 0;
                                transform: scale(0.5); transition: none;
                            `;
                            token.innerHTML = `
                                <img src="${threatImgUrl}" style="width:100%;height:100%;object-fit:contain;border-radius:50%;" alt="threat">
                                <div style="position:absolute; top:50%; right:-20px; transform:translateY(-50%); background:#1a120b; border:2px solid #ffb74d; font-size:1.4rem; font-weight:bold; border-radius:4px; padding:2px 6px; color:#fff; font-family:'Cinzel',serif; box-shadow:0 2px 4px rgba(0,0,0,0.9);">+${cost}</div>
                            `;
                            document.body.appendChild(token);

                            void token.offsetWidth;

                            requestAnimationFrame(() => {
                                requestAnimationFrame(() => {
                                    token.style.opacity = '1';
                                    token.style.transform = 'scale(1)';
                                });
                            });

                            setTimeout(() => {
                                token.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                token.style.left = `${tokenTargetX}px`;
                                token.style.top = `${tokenTargetY}px`;

                                if (window.SoundFX && window.SoundFX.playWhoosh) window.SoundFX.playWhoosh();

                                setTimeout(() => {
                                    token.remove();
                                    totalCost += cost;
                                    card.threatBonus = totalCost;

                                    if (ghostScav) {
                                        const targetCard = ghostScav.querySelector('.card');
                                        if (targetCard) {
                                            const existingToken = targetCard.querySelector('.buff-token');
                                            if (existingToken) existingToken.remove();

                                            const buffToken = document.createElement('div');
                                            buffToken.className = 'buff-token';
                                            buffToken.style.cssText = `
                                                position: absolute;
                                                top: 0%; left: 0%;
                                                width: calc(var(--card-w) * 0.38);
                                                height: calc(var(--card-w) * 0.38);
                                                border-radius: 50%;
                                                background: rgba(0,0,0,0.85);
                                                border: calc(var(--card-w) * 0.008) solid #ffb74d;
                                                box-shadow: 0 0 4px #ffb74d;
                                                display: flex; align-items: center; justify-content: center;
                                                z-index: 15;
                                                pointer-events: none;
                                            `;
                                            buffToken.innerHTML = `
                                                <img src="${threatImgUrl}" style="width:100%; height:100%; object-fit:contain; border-radius:50%;" alt="threat">
                                                <div class="badge plus" style="position:absolute; top:50%; right:calc(var(--card-w) * -0.06); transform:translateY(-50%); background:#1a120b; border:calc(var(--card-w) * 0.008) solid #ffb74d; font-size:calc(var(--card-w) * 0.135); font-weight:bold; border-radius:3.5px; padding:calc(var(--card-w) * 0.015) calc(var(--card-w) * 0.035); white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.95); color:#fff;">+${totalCost}</div>
                                            `;
                                            targetCard.appendChild(buffToken);
                                        }
                                        if (engine.window.spawnBurstAtElement) {
                                            engine.window.spawnBurstAtElement(ghostScav, '#ffb74d', 25);
                                        }
                                    }

                                    engine.toast('Goblintown Scavengers', `Scavenged ${dropped.name} (Cost: ${cost})!`, 'danger', 2500);

                                    gCard.style.transition = 'all 0.85s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                    gCard.style.left = `${discRect.left + (discRect.width - baseW) / 2}px`;
                                    gCard.style.top = `${discRect.top + (discRect.height - baseH) / 2}px`;
                                    gCard.style.transform = `scale(${discRect.width / baseW})`;
                                    gCard.style.opacity = '0.3';

                                    if (window.SoundFX && window.SoundFX.playWhoosh) window.SoundFX.playWhoosh();

                                    let nextActivePlayerIdx = pIdx + 1;
                                    while (nextActivePlayerIdx < game.numPlayers && game.eliminated[nextActivePlayerIdx]) {
                                        nextActivePlayerIdx++;
                                    }
                                    const isLastPlayer = (nextActivePlayerIdx >= game.numPlayers);

                                    if (isLastPlayer) {
                                        card.threatBonus = totalCost;
                                        if (cb) {
                                            const origCb = cb;
                                            cb = null;
                                            origCb();
                                        }
                                    }

                                    setTimeout(() => {
                                        gCard.remove();
                                        if (engine.window.discardCard) {
                                            engine.window.discardCard(dropped, discardPile, true);
                                        } else {
                                            discardPile.push(dropped);
                                        }
                                        engine.render();

                                        pIdx++;
                                        setTimeout(processNextPlayer, 50);
                                    }, 850);
                                }, 600);
                            }, 300);
                        }, 500);
                    } else {
                        pIdx++;
                        processNextPlayer();
                    }
                };

                processNextPlayer();
            }
        },
        {
            id: 'nibin_goblins_are_upon_you', name: 'Goblins are Upon You!', type: 'treachery', sphere: 'encounter-treachery', portrait: '👺', copies: 1,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/goblins_are_upon_you.jpg',
            text: 'When Revealed: Each player must search the encounter deck and discard pile for a Goblin enemy and put it into play, engaged with him. Then, shuffle the encounter deck. (This effect cannot be canceled.)\nShadow: Attacking enemy gets +1 Attack for each Goblin enemy engaged with you.',
            onReveal: function(card, game, engine, cb) {
                let pIdx = 0;
                const processNext = () => {
                    while(pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
                    if(pIdx >= game.numPlayers) {
                        game.encounterDeck = engine.shuffle(game.encounterDeck);
                        if(cb) cb();
                        return;
                    }
                    if (game.activeTabPlayerIdx !== pIdx) engine.window._switchTab(pIdx);
                    const goblins = [...game.encounterDeck, ...game.encounterDiscard].filter(x => (x.trait||'').includes('Goblin'));
                    if(goblins.length > 0) {
                        engine.showCardPicker('Goblins are Upon You!', `Player ${pIdx+1}: Choose a Goblin enemy to engage:`, goblins, (chosen) => {
                            if(chosen){
                                let idx = game.encounterDeck.findIndex(x => x._uid === chosen._uid);
                                if(idx >= 0) game.encounterDeck.splice(idx, 1);
                                else {
                                    idx = game.encounterDiscard.findIndex(x => x._uid === chosen._uid);
                                    if(idx >= 0) game.encounterDiscard.splice(idx, 1);
                                }
                                
                                const startRect = engine.window._lastPickerRect;
                                const finalizeEngage = () => {
                                    chosen._engagedWithPlayerIdx = pIdx;
                                    game.engagedEnemies.push(chosen);
                                    engine.toast('Goblins are Upon You!', `Player ${pIdx+1} engaged ${chosen.name}.`, 'danger');
                                    engine.render();
                                    pIdx++; processNext();
                                };

                                if (startRect) {
                                    const engagedZone = document.getElementById('engaged-content');
                                    let destRect = null;
                                    if (engagedZone) {
                                        const hasPlaceholder = game.engagedEnemies.length === 0;
                                        const originalHTML = engagedZone.innerHTML;
                                        if (hasPlaceholder) engagedZone.innerHTML = '';
                                        const stub = document.createElement('div');
                                        stub.className = 'card';
                                        stub.style.visibility = 'hidden';
                                        stub.style.margin = '0';
                                        engagedZone.appendChild(stub);
                                        destRect = stub.getBoundingClientRect();
                                        stub.remove();
                                        if (hasPlaceholder) engagedZone.innerHTML = originalHTML;
                                    }
                                    if (destRect) {
                                        const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                                        const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                                        const ghost = document.createElement('div');
                                        ghost.style.cssText = `
                                            position: fixed; z-index: 2000;
                                            width: ${cardW}px; height: ${cardH}px;
                                            left: ${startRect.left}px; top: ${startRect.top}px;
                                            transform: scale(${startRect.width / cardW});
                                            transform-origin: top left;
                                            transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
                                            pointer-events: none;
                                            box-shadow: 0 10px 25px rgba(0,0,0,0.7);
                                            border-radius: 6px; overflow: hidden;
                                        `;
                                        const cardImg = chosen.img ? chosen.img : (chosen.code ? `https://ringsdb.com/bundles/cards/${chosen.code}.png` : `https://hallofbeorn.com/Images/Cards/Core-Set/${chosen.name.replace(/ /g, '-').replace(/'/g, '')}.jpg`);
                                        ghost.innerHTML = `<img src="${cardImg}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;" alt="${chosen.name}">`;
                                        ghost.className = `card ${chosen.sphere || 'encounter-enemy'}`;
                                        document.body.appendChild(ghost);
                                        void ghost.offsetWidth;

                                        const targetScale = destRect.width / cardW;
                                        ghost.style.left = `${destRect.left}px`;
                                        ghost.style.top = `${destRect.top}px`;
                                        ghost.style.transform = `scale(${targetScale})`;

                                        if (window.SoundFX) window.SoundFX.playWhoosh();

                                        setTimeout(() => {
                                            ghost.remove();
                                            finalizeEngage();
                                        }, 600);
                                    } else {
                                        finalizeEngage();
                                    }
                                } else {
                                    finalizeEngage();
                                }
                            } else {
                                pIdx++; processNext();
                            }
                        }, true);
                    } else {
                        engine.toast('Goblins are Upon You!', 'No Goblins found.', 'info');
                        pIdx++; processNext();
                    }
                };
                processNext();
            }
        },
        {
            id: 'nibin_eyes_in_the_dark', name: 'Eyes in the Dark', type: 'treachery', sphere: 'encounter-treachery', portrait: '👀', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/eyes_in_the_dark.jpg',
            text: 'Doomed 1. When Revealed: Each player must choose: Either raise your threat by 1 for each questing character you control, or discard a questing character you control.\nShadow: If this attack is undefended, discard an ally you control.',
            onReveal: function(card, game, engine, cb) {
                // 1. Doomed 1 Application
                for(let p=0; p<game.numPlayers; p++) if(!game.eliminated[p]) game.threats[p]++;
                if (game.numPlayers === 1) game.threat++;
                engine.toast('Doomed 1', 'Threat increased by 1.', 'danger');
                
                // 2. Doomed 1 Cinematic
                const overlay = document.createElement('div');
                overlay.style.cssText = 'position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(200,0,0,0.45); pointer-events:none; transition: background 0.3s ease-out;';
                
                const bigText = document.createElement('div');
                bigText.style.cssText = "font-family:'Cinzel Decorative', serif; font-size:4.5rem; font-weight:900; color:#ff3030; text-shadow:0 0 35px #ff0000, 0 4px 15px #000; transform:scale(0.5); opacity:0; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);";
                bigText.textContent = `+1 Threat!`;
                overlay.appendChild(bigText);
                document.body.appendChild(overlay);
                
                if (engine.window && engine.window.screenShake) engine.window.screenShake(18, 500);
                const hudThreat = document.getElementById('hud-threat');
                if (hudThreat && engine.window && engine.window.spawnBurstAtElement) engine.window.spawnBurstAtElement(hudThreat, '#c0392b', 15);
                
                setTimeout(() => {
                    bigText.style.transform = 'scale(1)';
                    bigText.style.opacity = '1';
                }, 50);
                
                setTimeout(() => {
                    overlay.style.background = 'rgba(200,0,0,0)';
                    bigText.style.transform = 'scale(1.2) translateY(-100px)';
                    bigText.style.opacity = '0';
                    setTimeout(() => overlay.remove(), 400);
                    
                    const diffEl = document.getElementById('hud-threat-diff');
                    if (diffEl) {
                        diffEl.textContent = `+1 Threat!`;
                        diffEl.classList.remove('threat-diff-active');
                        void diffEl.offsetWidth;
                        diffEl.classList.add('threat-diff-active');
                        setTimeout(() => { diffEl.classList.remove('threat-diff-active'); diffEl.textContent = ''; }, 3500);
                    }
                    
                    for(let p=0; p<game.numPlayers; p++) {
                        if (game.threats[p] >= 50 && engine.eliminatePlayer) engine.eliminatePlayer(p);
                    }
                    
                    // Proceed to player choices
                    setTimeout(() => {
                        let pIdx = 0;
                        const destroyedAlliesQueue = [];
                        const processNext = () => {
                            while(pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
                            if(pIdx >= game.numPlayers) {
                                const resolveDeferredVS = () => {
                                    if (destroyedAlliesQueue.length > 0) {
                                        if (engine.window && engine.window.onAllyLeftPlay) {
                                            engine.window.onAllyLeftPlay(destroyedAlliesQueue, () => {
                                                destroyedAlliesQueue.length = 0;
                                                if (cb) cb();
                                            });
                                        } else { if (cb) cb(); }
                                    } else {
                                        if(cb) cb();
                                    }
                                };
                                resolveDeferredVS();
                                return;
                            }
                            
                            if (game.activeTabPlayerIdx !== pIdx && engine.window && engine.window._switchTab) {
                                engine.window._switchTab(pIdx);
                            }
                            const questing = game.selectedHeroIds.map(uid => [...game.heroes, ...game.allies].find(c => c._uid === uid)).filter(c => c && (c._ownerIdx === undefined ? 0 : c._ownerIdx) === pIdx);
                            
                            if(questing.length > 0) {
                                const promptHTML = `
                                  <div style="font-size:1.6rem;line-height:1.5;color:var(--parchment);text-align:center;">
                                    <span style="font-size:2.2rem;font-weight:bold;color:var(--gold-bright);display:block;margin-bottom:15px;">Eyes in the Dark</span>
                                    Player ${pIdx+1}: Choose to either raise your threat by ${questing.length}, or discard a questing character you control:
                                  </div>
                                `;
                                if (engine.window && engine.window.showChoiceModal) {
                                    engine.window.showChoiceModal('Eyes in the Dark', promptHTML, [
                                        {label: `Raise Threat by ${questing.length}`, cb: () => {
                                           game.threats[pIdx] += questing.length;
                                           if (game.numPlayers === 1) game.threat += questing.length;
                                           engine.toast('Eyes in the Dark', `Player ${pIdx+1} threat raised by ${questing.length}.`, 'danger');
                                           
                                           // Threat cinematic
                                           const overlay2 = document.createElement('div');
                                           overlay2.style.cssText = 'position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(200,0,0,0.45); pointer-events:none; transition: background 0.3s ease-out;';
                                           const bigText2 = document.createElement('div');
                                           bigText2.style.cssText = "font-family:'Cinzel Decorative', serif; font-size:4.5rem; font-weight:900; color:#ff3030; text-shadow:0 0 35px #ff0000, 0 4px 15px #000; transform:scale(0.5); opacity:0; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);";
                                           bigText2.textContent = `+${questing.length} Threat!`;
                                           overlay2.appendChild(bigText2);
                                           document.body.appendChild(overlay2);
                                           
                                           if (engine.window && engine.window.screenShake) engine.window.screenShake(18, 500);
                                           const hudThreat2 = document.getElementById('hud-threat');
                                           if (hudThreat2 && engine.window && engine.window.spawnBurstAtElement) engine.window.spawnBurstAtElement(hudThreat2, '#c0392b', 15);
                                           
                                           setTimeout(() => { bigText2.style.transform = 'scale(1)'; bigText2.style.opacity = '1'; }, 50);
                                           setTimeout(() => {
                                               overlay2.style.background = 'rgba(200,0,0,0)';
                                               bigText2.style.transform = 'scale(1.2) translateY(-100px)';
                                               bigText2.style.opacity = '0';
                                               setTimeout(() => overlay2.remove(), 400);
                                               const diffEl2 = document.getElementById('hud-threat-diff');
                                               if (diffEl2) {
                                                   diffEl2.textContent = `+${questing.length}`;
                                                   diffEl2.classList.remove('threat-diff-active');
                                                   void diffEl2.offsetWidth;
                                                   diffEl2.classList.add('threat-diff-active');
                                                   setTimeout(() => { diffEl2.classList.remove('threat-diff-active'); diffEl2.textContent = ''; }, 3500);
                                               }
                                               engine.render();
                                               if (game.threats[pIdx] >= 50 && engine.eliminatePlayer) engine.eliminatePlayer(pIdx);
                                               
                                               pIdx++; 
                                               processNext();
                                           }, 1500);
                                        }},
                                        {label: 'Discard a Questing Character', cb: () => {
                                           if (engine.showHeroPicker) {
                                               engine.showHeroPicker('Eyes in the Dark', 'Choose a questing character to discard:', questing, (chosen) => {
                                                   if(chosen) {
                                                       if (chosen.isHero) {
                                                           chosen.damage = chosen.hp || 99;
                                                           if (engine.checkHeroDeath) engine.checkHeroDeath(chosen);
                                                       } else {
                                                           game.allies = game.allies.filter(a => a._uid !== chosen._uid);
                                                           if (engine.discardCard) {
                                                               engine.discardCard(chosen, game.playerDiscards[pIdx] || game.playerDiscard, false);
                                                           } else {
                                                               (game.playerDiscards[pIdx] || game.playerDiscard).push(chosen);
                                                           }
                                                           destroyedAlliesQueue.push({name: chosen.name, ownerIdx: chosen._ownerIdx});
                                                       }
                                                       engine.toast('Eyes in the Dark', `Discarded ${chosen.name}.`, 'danger');
                                                       
                                                       // Wait for checkHeroDeath/discardCard to finish visually
                                                       setTimeout(() => {
                                                           if (engine.window && engine.window.updateQuestWillpowerDisplay) engine.window.updateQuestWillpowerDisplay();
                                                           engine.render();
                                                           pIdx++; 
                                                           processNext();
                                                       }, 500);
                                                   } else {
                                                       // If they cancel out of the hero picker, we must raise their threat instead
                                                       game.threats[pIdx] += questing.length;
                                                       if (game.numPlayers === 1) game.threat += questing.length;
                                                       engine.toast('Eyes in the Dark', `Player ${pIdx+1} threat raised by ${questing.length}.`, 'danger');
                                                       
                                                       // Threat cinematic
                                                       const overlay2 = document.createElement('div');
                                                       overlay2.style.cssText = 'position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(200,0,0,0.45); pointer-events:none; transition: background 0.3s ease-out;';
                                                       const bigText2 = document.createElement('div');
                                                       bigText2.style.cssText = "font-family:'Cinzel Decorative', serif; font-size:4.5rem; font-weight:900; color:#ff3030; text-shadow:0 0 35px #ff0000, 0 4px 15px #000; transform:scale(0.5); opacity:0; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);";
                                                       bigText2.textContent = `+${questing.length} Threat!`;
                                                       overlay2.appendChild(bigText2);
                                                       document.body.appendChild(overlay2);
                                                       
                                                       if (engine.window && engine.window.screenShake) engine.window.screenShake(18, 500);
                                                       const hudThreat2 = document.getElementById('hud-threat');
                                                       if (hudThreat2 && engine.window && engine.window.spawnBurstAtElement) engine.window.spawnBurstAtElement(hudThreat2, '#c0392b', 15);
                                                       
                                                       setTimeout(() => { bigText2.style.transform = 'scale(1)'; bigText2.style.opacity = '1'; }, 50);
                                                       setTimeout(() => {
                                                           overlay2.style.background = 'rgba(200,0,0,0)';
                                                           bigText2.style.transform = 'scale(1.2) translateY(-100px)';
                                                           bigText2.style.opacity = '0';
                                                           setTimeout(() => overlay2.remove(), 400);
                                                           const diffEl2 = document.getElementById('hud-threat-diff');
                                                           if (diffEl2) {
                                                               diffEl2.textContent = `+${questing.length}`;
                                                               diffEl2.classList.remove('threat-diff-active');
                                                               void diffEl2.offsetWidth;
                                                               diffEl2.classList.add('threat-diff-active');
                                                               setTimeout(() => { diffEl2.classList.remove('threat-diff-active'); diffEl2.textContent = ''; }, 3500);
                                                           }
                                                           engine.render();
                                                           if (game.threats[pIdx] >= 50 && engine.eliminatePlayer) engine.eliminatePlayer(pIdx);
                                                           
                                                           pIdx++; 
                                                           processNext();
                                                       }, 1500);
                                                   }
                                               }, true);
                                           }
                                        }}
                                    ], true);
                                }
                            } else {
                                pIdx++; 
                                processNext();
                            }
                        };
                        processNext();
                    }, 200); // 200ms delay after cinematic finishes
                }, 1500);
            },
            onShadow: function(shadow, enemy, defChars, game, engine, next) {
                if (defChars.length === 0) {
                    const targetPIdx = enemy._engagedWithPlayerIdx !== undefined ? enemy._engagedWithPlayerIdx : game.activeTabPlayerIdx;
                    const allies = game.allies.filter(a => (a._ownerIdx === undefined ? 0 : a._ownerIdx) === targetPIdx);
                    if (allies.length > 0) {
                        if (game.activeTabPlayerIdx !== targetPIdx) engine.window._switchTab(targetPIdx);
                        
                        const promptHTML = `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Undefended attack! Discard an ally you control:</span>`;
                        
                        engine.showHeroPicker('Shadow Effect: <br>Eyes in the Dark', promptHTML, allies, (chosen) => {
                            if(chosen) {
                                const playAreaEl = document.querySelector(`#player-content [data-uid="${chosen._uid}"]`);
                                const startRect = (playAreaEl && playAreaEl.getBoundingClientRect().width > 0) ? playAreaEl.getBoundingClientRect() : window._lastPickerRect;
                                
                                game.allies = game.allies.filter(a => a._uid !== chosen._uid);
                                if (engine.discardCard) {
                                    engine.discardCard(chosen, game.playerDiscards[targetPIdx] || game.playerDiscard, false, startRect);
                                } else {
                                    game.playerDiscard.push(chosen);
                                    engine.render();
                                }
                                if (engine.window.onAllyLeftPlay) {
                                    engine.window.onAllyLeftPlay(chosen.name, chosen._ownerIdx);
                                }
                                engine.toast('Eyes in the Dark', `Discarded ${chosen.name}.`, 'danger');
                            }
                            next();
                        }, true);
                        return;
                    }
                }
                next();
            }
        },
        {
            id: 'nibin_wild_wargs', name: 'Wild Wargs', type: 'enemy', sphere: 'encounter-enemy', portrait: '🐺', engagement: 28, threat: 2, attack: 2, defense: 1, hp: 3, trait: 'Creature · Warg', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/wild_wargs.jpg',
            text: 'Forced: After Wild Wargs engages a player, discard the top card of the encounter deck. If that card is a Goblin enemy, put it into play engaged with you.'
        },
        {
            id: 'nibin_obsidian_arrows', name: 'Obsidian Arrows', type: 'treachery', sphere: 'encounter-treachery', portrait: '🏹', copies: 2,
            img: 'cards/dark_of_mirkwood/caves_of_nibin/obsidian_arrows.jpg',
            text: 'When Revealed: Deal 2 damage to a character controlled by the first player.\nShadow: Deal 1 damage to a character you control.',
            shadow: 'Shadow: Deal 1 damage to a character you control.',
            onReveal: function(card, game, engine, cb) {
                const fpIdx = game.firstPlayerIdx || 0;
                const eligible = [...game.heroes, ...game.allies].filter(c => !c._prisoner && !c._dead && (c._ownerIdx === fpIdx || (c._ownerIdx === undefined && fpIdx === 0)));
                
                if (eligible.length > 0) {
                    if (game.activeTabPlayerIdx !== fpIdx && engine.window._switchTab) {
                        engine.window._switchTab(fpIdx);
                    }
                    const title = game.numPlayers > 1 ? `Player ${fpIdx + 1} - Obsidian Arrows` : 'Obsidian Arrows';
                    const promptHTML = `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Forced: Choose a character you control to take 2 damage:</span>`;
                    
                    engine.showHeroPicker(title, promptHTML, eligible, (chosen) => {
                        const target = chosen || eligible[0];
                        target.damage += 2;
                        engine.toast("Obsidian Arrows", `Dealt 2 damage to ${target.name}.`, "danger");
                        
                        const el = document.querySelector(`[data-uid="${target._uid}"]`);
                        if (el && engine.window.spawnBurstAtElement) engine.window.spawnBurstAtElement(el, '#c0392b', 25);
                        if (engine.window.screenShake) engine.window.screenShake(12, 400);
                        
                        engine.render();
                        if (engine.checkHeroDeath) engine.checkHeroDeath(target);
                        
                        if (engine.window.waitForAllyDeaths) {
                            engine.window.waitForAllyDeaths(cb);
                        } else {
                            cb();
                        }
                    }, true);
                } else {
                    engine.toast("Obsidian Arrows", "First player controls no characters.", "info");
                    cb();
                }
            },
            onShadow: function(shadow, enemy, defChars, game, engine, next) {
                const targetPIdx = enemy._engagedWithPlayerIdx !== undefined ? enemy._engagedWithPlayerIdx : (game.numPlayers > 1 ? game.activeTabPlayerIdx : 0);
                const eligible = [...game.heroes, ...game.allies].filter(c => !c._prisoner && !c._dead && (c._ownerIdx === targetPIdx || (c._ownerIdx === undefined && targetPIdx === 0)));

                if (eligible.length > 0) {
                    if (game.activeTabPlayerIdx !== targetPIdx && engine.window._switchTab) {
                        engine.window._switchTab(targetPIdx);
                    }
                    const title = game.numPlayers > 1 ? `Player ${targetPIdx + 1} - Shadow Effect` : 'Shadow Effect';
                    const promptHTML = `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Obsidian Arrows: <br>Choose a character you control to take 1 damage:</span>`;
                    
                    engine.showHeroPicker(title, promptHTML, eligible, (chosen) => {
                        const target = chosen || eligible[0];
                        target.damage += 1;
                        engine.toast("Shadow Effect", `Dealt 1 damage to ${target.name}.`, "danger");
                        
                        const el = document.querySelector(`[data-uid="${target._uid}"]`);
                        if (el && engine.window.spawnBurstAtElement) engine.window.spawnBurstAtElement(el, '#c0392b', 15);
                        if (engine.window.screenShake) engine.window.screenShake(8, 300);
                        
                        engine.render();
                        if (engine.checkHeroDeath) engine.checkHeroDeath(target);
                        
                        if (engine.window.waitForAllyDeaths) {
                            engine.window.waitForAllyDeaths(next);
                        } else {
                            next();
                        }
                    }, true);
                } else {
                    engine.toast("Shadow Effect", "No eligible characters to take damage.", "info");
                    next();
                }
            }
        }
    ]
};

if (!window._nibinModalObserverPatched) {
    window._nibinModalObserverPatched = true;
    const patchObserver = () => {
        const modalEl = document.getElementById('modal-overlay');
        if (!modalEl) {
            setTimeout(patchObserver, 100);
            return;
        }
        const observer = new MutationObserver((mutations) => {
            observer.disconnect();
            
            if (modalEl.classList.contains('show')) {
                const content = document.getElementById('modal-content');
                if (content) {
                    const h2 = content.querySelector('h2');
                    const h2Text = h2 ? h2.textContent : '';
                    const htmlContent = content.innerHTML;

                    const game = window.LotrEngine ? window.LotrEngine.game : null;
                    if (game) {
                        const curStage = window.QUEST_STAGES ? window.QUEST_STAGES[game.questStageIdx] : null;
                        const isStg4 = curStage && curStage.name === 'Oathkeepers';
                        const has8Prog = game.questProgress >= 8;
                        const isInvincibleNow = !isStg4 || !has8Prog;

                        // Disable Gandalf's damage button if no valid damageable enemies exist
                        const gandalfDmgBtn = content.querySelector('#gandalf-damage');
                        if (gandalfDmgBtn) {
                            const validEnemies = [...(game.stagingArea || []), ...(game.engagedEnemies || [])].filter(c => 
                                c.type === 'enemy' && (isInvincibleNow ? (c.id !== 'nibin_goblin_chieftain' && c.id !== 'goblin_chieftain') : true)
                            );
                            if (validEnemies.length === 0) {
                                gandalfDmgBtn.disabled = true;
                                gandalfDmgBtn.innerHTML = '⚔ Deal 4 damage to an enemy in play (none in play)';
                            }
                        }

                        // Filter out Goblin Chieftain from Gandalf & Quick Strike target pickers
                        if (isInvincibleNow && (h2Text.includes('Gandalf') || h2Text.includes('Quick Strike'))) {
                            const pickerOptions = content.querySelectorAll('div[onclick*="window._pickerChoice"]');
                            pickerOptions.forEach(opt => {
                                const match = opt.getAttribute('onclick')?.match(/window\._pickerChoice\('([^']+)'\)/);
                                if (match && match[1]) {
                                    const uid = match[1];
                                    const card = window._cardRegistry ? window._cardRegistry[uid] : null;
                                    if (card && (card.id === 'nibin_goblin_chieftain' || card.id === 'goblin_chieftain')) {
                                        opt.remove();
                                    }
                                }
                            });
                        }
                    }

                    // Bypass Swift Strike prompts when Goblin Chieftain is attacking AND invincible
                    if (h2Text.includes('Swift Strike')) {
                        const game = window.LotrEngine ? window.LotrEngine.game : null;
                        const curStage = (window.QUEST_STAGES && game) ? window.QUEST_STAGES[game.questStageIdx] : null;
                        const isStg4 = curStage && curStage.name === 'Oathkeepers';
                        const has8Prog = game && game.questProgress >= 8;
                        const isInvincibleNow = !isStg4 || !has8Prog;

                        const attacker = game ? game.currentEnemyAttacking : null;
                        if (isInvincibleNow && attacker && (attacker.id === 'nibin_goblin_chieftain' || attacker.id === 'goblin_chieftain')) {
                            const noBtn = document.getElementById('confirm-no-btn');
                            if (noBtn) {
                                const sfx = window.SoundFX;
                                let origPlay = null;
                                if (sfx && typeof sfx.playClick === 'function') {
                                    origPlay = sfx.playClick;
                                    sfx.playClick = () => {};
                                }
                                noBtn.click();
                                if (sfx && origPlay) {
                                    sfx.playClick = origPlay;
                                }
                            }
                        }
                    }

                    // Filter immune enemies for Forest Snare
                    if (htmlContent.includes('attach Forest Snare to')) {
                        const pickerOptions = content.querySelectorAll('div[onclick^="window._pickerChoice"]');
                        let validTargets = 0;
                        const immuneEnemies = ['oath_goblin_troop', 'goblin_troop', 'nibin_goblin_chieftain', 'nibin_goblin_troop', 'nibin_great_cave_troll'];
                        
                        pickerOptions.forEach(opt => {
                            const match = opt.getAttribute('onclick').match(/window\._pickerChoice\('([^']+)'\)/);
                            if (match && match[1]) {
                                const uid = match[1];
                                const card = window._cardRegistry ? window._cardRegistry[uid] : null;
                                if (!card || !immuneEnemies.includes(card.id)) {
                                    validTargets++;
                                }
                            }
                        });

                        if (validTargets === 0) {
                            modalEl.classList.remove('show');
                            if (window.LotrEngine && window.LotrEngine.toast) {
                                window.LotrEngine.toast('No Valid Target', 'No eligible engaged enemies to attach Forest Snare to.', 'danger');
                            }
                            if (typeof window._pickerChoice === 'function') {
                                window._pickerChoice(null);
                            }
                        } else {
                            pickerOptions.forEach(opt => {
                                const match = opt.getAttribute('onclick').match(/window\._pickerChoice\('([^']+)'\)/);
                                if (match && match[1]) {
                                    const uid = match[1];
                                    const card = window._cardRegistry ? window._cardRegistry[uid] : null;
                                    if (card && immuneEnemies.includes(card.id)) {
                                        opt.style.display = 'none';
                                    }
                                }
                            });
                        }
                    }
                }
            }
            
            observer.observe(modalEl, { childList: true, subtree: true, attributes: true });
        });
        observer.observe(modalEl, { childList: true, subtree: true, attributes: true });
    };
    patchObserver();
}

const origPickerChoiceNibin = window._pickerChoice;
if (origPickerChoiceNibin && !window._nibinPickerChoicePatched) {
    window._nibinPickerChoicePatched = true;
    window._pickerChoice = function(uid) {
        if (uid) {
            const chosen = window._cardRegistry ? window._cardRegistry[uid] : null;
            const modalContent = document.getElementById('modal-content');
            const immuneEnemies = ['nibin_goblin_chieftain', 'nibin_goblin_troop', 'nibin_great_cave_troll'];
            if (modalContent && modalContent.innerHTML.includes('attach Forest Snare to') && chosen && immuneEnemies.includes(chosen.id)) {
                if (window.LotrEngine && window.LotrEngine.toast) {
                    window.LotrEngine.toast('Cannot Attach', `${chosen.name} cannot have attachments.`, 'danger');
                }
                return;
            }
        }
        origPickerChoiceNibin(uid);
    };
}

// Quick Strike handling for Cracked Pillar & Non-First Player Ranged attacks
function showNibinResourceChooser(card, ownerIdx, onConfirm, onCancel) {
    const overlay = document.getElementById('resource-chooser-overlay');
    const textEl = document.getElementById('resource-chooser-text');
    const costEl = document.getElementById('resource-chooser-cost');
    const selectedEl = document.getElementById('resource-chooser-selected');
    const heroesDiv = document.getElementById('resource-chooser-heroes');
    const confirmBtn = document.getElementById('resource-chooser-confirm');
    const cancelBtn = document.getElementById('resource-chooser-cancel');

    if (!window._origResourceChooserConfirm && confirmBtn && confirmBtn.onclick) {
        window._origResourceChooserConfirm = confirmBtn.onclick;
    }
    if (!window._origResourceChooserCancel && cancelBtn && cancelBtn.onclick) {
        window._origResourceChooserCancel = cancelBtn.onclick;
    }

    const restoreHandlers = () => {
        if (window._origResourceChooserConfirm && confirmBtn) confirmBtn.onclick = window._origResourceChooserConfirm;
        if (window._origResourceChooserCancel && cancelBtn) cancelBtn.onclick = window._origResourceChooserCancel;
    };

    const engine = window.LotrEngine;
    const game = engine ? engine.game : null;

    if (!overlay || !heroesDiv || !confirmBtn || !cancelBtn || !game) {
        restoreHandlers();
        onConfirm();
        return;
    }

    const eligible = game.heroes.filter(h => 
        !h._dead && !h._prisoner && (h._ownerIdx === ownerIdx || (h._ownerIdx === undefined && ownerIdx === 0)) &&
        (h.sphere === 'tactics' || (h.id === 'aragorn' && h.attached && h.attached.some(a => a.id === 'celebrians_stone' && h.sphere === 'tactics')))
    );

    const selections = {};
    eligible.forEach(h => { selections[h._uid] = 0; });

    textEl.innerHTML = `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35;">Choose which heroes' resources to spend for "${card.name}" <br>(Tactics, cost ${card.cost || 1}):</span>`;
    costEl.textContent = card.cost || 1;
    selectedEl.textContent = '0';
    confirmBtn.disabled = true;

    heroesDiv.innerHTML = '';
    eligible.forEach(h => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:12px;padding:0.35rem 1.2rem;background:rgba(30,20,12,0.55);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);border-radius:6px;border-left:4px solid #ef5350;box-shadow:0 4px 12px rgba(0,0,0,0.5);';
        row.innerHTML = `
            <div style="flex:1;">
                <div style="font-family:'Cinzel',serif;font-weight:700;font-size:1.45rem;color:var(--gold-bright);text-shadow:1px 3px 6px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.95);">${h.name}</div>
                <div style="font-size:1.6rem;color:var(--parchment-dark);display:flex;align-items:center;gap:16px;text-shadow:1px 3px 6px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.95);">
                    <img src="tokens/tactics.png" style="width:32px;height:32px;position:relative;top:-15.5px;object-fit:contain;vertical-align:middle;display:inline-block;" title="tactics" />
                    <span style="display:inline-flex;align-items:center;gap:6px;color:var(--gold-bright);font-weight:700;text-shadow:1px 3px 6px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.95);font-size:1.9rem;">
                        <img src="tokens/resource.png" style="width:34px;height:34px;" alt="coin">
                        <span style="margin-left:8px;position:relative;top:-7.5px;font-size:3rem;line-height:0.8;">${h.resources}</span>
                    </span>
                </div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;">
                <button class="btn" style="padding:0.4rem 0.8rem;font-size:1.2rem;min-width:44px;" data-action="dec" data-uid="${h._uid}" disabled>−</button>
                <span id="rc-val-${h._uid}" style="font-family:'Cinzel',serif;font-size:1.5rem;color:var(--gold-bright);font-weight:700;min-width:35px;text-align:center;text-shadow:1px 3px 6px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.95);">0</span>
                <button class="btn" style="padding:0.4rem 0.8rem;font-size:1.2rem;min-width:44px;" data-action="inc" data-uid="${h._uid}" ${h.resources === 0 ? 'disabled' : ''}>+</button>
            </div>
        `;
        heroesDiv.appendChild(row);
    });

    const updateButtons = () => {
        const total = Object.values(selections).reduce((a, b) => a + b, 0);
        selectedEl.textContent = total;
        confirmBtn.disabled = (total !== (card.cost || 1));

        heroesDiv.querySelectorAll('button[data-action]').forEach(b => {
            const u = b.getAttribute('data-uid');
            const a = b.getAttribute('data-action');
            const hh = eligible.find(x => x._uid === u);
            if (a === 'inc') b.disabled = selections[u] >= (hh ? hh.resources : 0);
            if (a === 'dec') b.disabled = selections[u] <= 0;
        });
    };

    heroesDiv.querySelectorAll('button[data-action]').forEach(btn => {
        btn.onclick = (ev) => {
            ev.stopPropagation();
            const u = btn.getAttribute('data-uid');
            const act = btn.getAttribute('data-action');
            const hh = eligible.find(x => x._uid === u);
            if (!hh) return;
            if (act === 'inc' && selections[u] < hh.resources) {
                selections[u]++;
            } else if (act === 'dec' && selections[u] > 0) {
                selections[u]--;
            }
            const valSpan = document.getElementById('rc-val-' + u);
            if (valSpan) valSpan.textContent = selections[u];
            updateButtons();
        };
    });

    cancelBtn.onclick = (ev) => {
        ev.stopPropagation();
        restoreHandlers();
        overlay.style.display = 'none';
        if (onCancel) onCancel();
    };

    confirmBtn.onclick = (ev) => {
        ev.stopPropagation();
        const total = Object.values(selections).reduce((a, b) => a + b, 0);
        if (total !== (card.cost || 1)) return;
        restoreHandlers();
        for (const [u, amount] of Object.entries(selections)) {
            const hh = game.heroes.find(x => x._uid === u);
            if (hh) {
                hh.resources -= amount;
                if (engine.window && engine.window.pulseHeroCoin) engine.window.pulseHeroCoin(hh._uid);
            }
        }
        if (engine.window && engine.window.pulseCoin) engine.window.pulseCoin();
        overlay.style.display = 'none';
        card._paymentSelections = { ...selections };
        onConfirm();
    };

    overlay.style.display = 'flex';
}

document.addEventListener('click', (e) => {
    if (window._blockNextClick || window._draggingActive) return;
    const handCardEl = e.target ? e.target.closest('#hand-content .card') : null;
    if (!handCardEl) return;
    const uid = handCardEl.getAttribute('data-uid');
    if (!uid) return;

    const engine = window.LotrEngine;
    const game = engine ? engine.game : null;
    if (!game) return;

    const card = game.hand ? game.hand.find(c => c._uid === uid) : null;
    if (!card || card.id !== 'quick_strike') return;

    const hasPillar = game.stagingArea && game.stagingArea.some(c => c.id === 'nibin_cracked_pillar');
    if (!hasPillar) return;

    const isCombatPhase = game.phase && game.phase.startsWith('combat');
    if (!isCombatPhase) return;

    const ownerIdx = card._ownerIdx !== undefined ? card._ownerIdx : game.activeTabPlayerIdx;
    const fpIdx = game.firstPlayerIdx || 0;

    const tacticsHeroes = game.heroes.filter(h => 
        !h._dead && !h._prisoner && (h._ownerIdx === ownerIdx || (h._ownerIdx === undefined && ownerIdx === 0)) &&
        (h.sphere === 'tactics' || (h.id === 'aragorn' && h.attached && h.attached.some(a => a.id === 'celebrians_stone' && h.sphere === 'tactics')))
    );
    const totalTactics = tacticsHeroes.reduce((s, h) => s + (Number(h.resources) || 0), 0);
    if (totalTactics < (card.cost || 1)) return;

    const myReadyChars = [...game.heroes, ...game.allies].filter(char => 
        !char.exhausted && 
        !char._prisoner && 
        !(char.attached && char.attached.some(a => a.id === 'gandalfs_map')) && 
        (char._ownerIdx === ownerIdx || (char._ownerIdx === undefined && ownerIdx === 0))
    );

    const getValidTargets = (attacker) => {
        const targets = [];
        if (game.engagedEnemies) {
            game.engagedEnemies.forEach(en => {
                if (en._notActuallyEngaged) return;
                const enOwner = en._engagedWithPlayerIdx !== undefined ? en._engagedWithPlayerIdx : 0;
                if (enOwner === ownerIdx || (attacker.text && attacker.text.includes('Ranged'))) {
                    targets.push(en);
                }
            });
        }
        if (attacker.id === 'dunhere' && game.stagingArea) {
            game.stagingArea.forEach(en => {
                if (en.type === 'enemy' && !targets.some(t => t._uid === en._uid)) {
                    targets.push(en);
                }
            });
        }
        const pillar = game.stagingArea.find(x => x.id === 'nibin_cracked_pillar');
        if (pillar) {
            const isFirst = (ownerIdx === fpIdx);
            const isRanged = (attacker.text && attacker.text.includes('Ranged'));
            if (isFirst || isRanged) {
                if (!targets.some(t => t._uid === pillar._uid)) {
                    targets.push(pillar);
                }
            }
        }
        return targets;
    };

    const eligibleAttackers = myReadyChars.filter(char => getValidTargets(char).length > 0);
    if (eligibleAttackers.length === 0) return;

    e.stopPropagation();
    e.preventDefault();

    const startRect = handCardEl.getBoundingClientRect();

    const refundPayment = () => {
        if (card._paymentSelections) {
            for (const [hUid, amount] of Object.entries(card._paymentSelections)) {
                const h = game.heroes.find(x => x._uid === hUid);
                if (h) {
                    h.resources += amount;
                    if (engine.window && engine.window.pulseHeroCoin) engine.window.pulseHeroCoin(h._uid);
                }
            }
            delete card._paymentSelections;
        }
        if (!game.hand.some(x => x._uid === card._uid)) game.hand.push(card);
        engine.toast('Cancelled', 'Quick Strike was cancelled. Resources refunded.', 'info');
        engine.render();
    };

    const promptAttackerAndTarget = () => {
        engine.showHeroPicker('Quick Strike', '<span style="font-size:1.6rem;font-weight:600;color:var(--parchment);">Choose a ready character to attack:</span>', eligibleAttackers, (attacker) => {
            if (!attacker) {
                refundPayment();
                return;
            }

            const targets = getValidTargets(attacker);
            engine.showEnemyPicker('Quick Strike', `<span style="font-size:1.6rem;font-weight:600;color:var(--parchment);">Choose a target for ${attacker.name} to attack:</span>`, targets, (target) => {
                if (!target) {
                    refundPayment();
                    return;
                }

                // Smoothly discard Quick Strike from hand into the player discard pile
                if (engine.discardCard) {
                    engine.discardCard(card, game.playerDiscards[ownerIdx] || game.playerDiscard, false, startRect);
                } else if (engine.window && engine.window._animateCardToDiscard) {
                    game.hand = game.hand.filter(x => x._uid !== card._uid);
                    engine.window._animateCardToDiscard(card, true, () => {
                        (game.playerDiscards[ownerIdx] || game.playerDiscard).push(card);
                        engine.render();
                    }, startRect);
                } else {
                    game.hand = game.hand.filter(x => x._uid !== card._uid);
                    (game.playerDiscards[ownerIdx] || game.playerDiscard).push(card);
                }

                attacker.exhausted = true;
                delete attacker._justExhaustedTime;
                const el = document.querySelector(`[data-uid="${attacker._uid}"]`);
                if (el) el.classList.add('exhausted');

                const isRanged = attacker.id === 'dunhere' || (attacker.text && attacker.text.includes('Ranged'));
                if (isRanged) {
                    const snd = new Audio('./sound_effects/bow_and_arrow.mp3');
                    snd.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
                    snd.play().catch(() => {});
                }

                const runAttackAction = () => {
                    if (engine.window && engine.window.animateLunge) engine.window.animateLunge(attacker._uid, target._uid);
                    if (isRanged && engine.window && engine.window.drawAttackArrow) engine.window.drawAttackArrow(attacker._uid, target._uid);

                    setTimeout(() => {
                        let totalAttack = attacker.attack || 0;
                        if (attacker.attackBonus) totalAttack += attacker.attackBonus;
                        if (attacker.getAttackMod) totalAttack += attacker.getAttackMod(attacker, target, game);
                        if (attacker.id === 'gimli') totalAttack += attacker.damage;
                        if (attacker.id === 'dunhere' && (target.id === 'nibin_cracked_pillar' || game.stagingArea.includes(target))) totalAttack += 1;
                        if (attacker.attached) {
                            attacker.attached.forEach(a => {
                                if (a.id === 'dwarven_axe') {
                                    totalAttack += ((attacker.trait||'').includes('Dwarf')) ? 2 : 1;
                                }
                            });
                        }

                        if (target.id === 'nibin_cracked_pillar') {
                            const dmg = Math.max(0, totalAttack - (target.threat || 0));
                            target.damage = (target.damage || 0) + dmg;
                            engine.toast('Quick Strike', `${attacker.name} attacks Cracked Pillar for ${dmg} damage!`, 'success');

                            if (dmg > 0 && engine.window && engine.window.spawnBurstAtElement) {
                                const pillarEl = document.querySelector(`[data-uid="${target._uid}"]`);
                                if (pillarEl) engine.window.spawnBurstAtElement(pillarEl, '#f5d76e', 20);
                                if (engine.window.floatTextAtElement) engine.window.floatTextAtElement(target._uid, `-${dmg}`, '#f5d76e');
                            }
                        } else {
                            const def = (target.defense || 0);
                            const dmg = Math.max(0, totalAttack - def);
                            target.damage = (target.damage || 0) + dmg;

                            if (dmg > 0 && engine.window && engine.window.spawnBurstAtElement) {
                                const enemyEl = document.querySelector(`[data-uid="${target._uid}"]`);
                                if (enemyEl) engine.window.spawnBurstAtElement(enemyEl, '#f5d76e', 20);
                                if (engine.window.floatTextAtElement) engine.window.floatTextAtElement(target._uid, `-${dmg}`, '#f5d76e');
                            }

                            if (target.damage >= (target.hp || 0)) {
                                if (engine.defeatEnemy) engine.defeatEnemy(target, attacker);
                            } else {
                                engine.toast('Quick Strike', `${attacker.name} attacks ${target.name} for ${dmg} damage.`, 'info', 2800);
                            }
                        }
                        engine.render();
                    }, 250);
                };

                if (isRanged) {
                    setTimeout(runAttackAction, 850);
                } else {
                    runAttackAction();
                }
            }, 'Cancel');
        }, 'Cancel');
    };

    showNibinResourceChooser(card, ownerIdx, () => {
        promptAttackerAndTarget();
    }, () => {
        engine.render();
    });
}, true);

setInterval(() => {
    const engine = window.LotrEngine;
    const game = engine ? engine.game : null;
    if (!game) return;
    const hasPillar = game.stagingArea && game.stagingArea.some(c => c.id === 'nibin_cracked_pillar');
    if (hasPillar && game.phase && game.phase.startsWith('combat')) {
        const handCards = document.querySelectorAll('#hand-content .card');
        handCards.forEach(el => {
            const uid = el.getAttribute('data-uid');
            const card = game.hand ? game.hand.find(c => c._uid === uid) : null;
            if (card && card.id === 'quick_strike') {
                const ownerIdx = card._ownerIdx !== undefined ? card._ownerIdx : game.activeTabPlayerIdx;
                const tacticsHeroes = game.heroes.filter(h => 
                    !h._dead && !h._prisoner && (h._ownerIdx === ownerIdx || (h._ownerIdx === undefined && ownerIdx === 0)) &&
                    (h.sphere === 'tactics' || (h.id === 'aragorn' && h.attached && h.attached.some(a => a.id === 'celebrians_stone' && h.sphere === 'tactics')))
                );
                const totalTactics = tacticsHeroes.reduce((s, h) => s + (Number(h.resources) || 0), 0);
                if (totalTactics >= (card.cost || 1)) {
                    const fpIdx = game.firstPlayerIdx || 0;
                    const hasEligibleChar = [...game.heroes, ...game.allies].some(char => 
                        !char.exhausted && !char._prisoner && !(char.attached && char.attached.some(a => a.id === 'gandalfs_map')) &&
                        (char._ownerIdx === ownerIdx || (char._ownerIdx === undefined && ownerIdx === 0)) &&
                        ((ownerIdx === fpIdx) || (char.text && char.text.includes('Ranged')))
                    );
                    if (hasEligibleChar && !el.classList.contains('playable-hand')) {
                        el.classList.add('playable-hand');
                    }
                }
            }
        });
    }
}, 200);