window.LotrExpansions = window.LotrExpansions || {};
window.LotrExpansions['the_oath'] = {
  questStages: [
    {
      stage: 1, side: 'B', name: 'After the Raid', questPts: 9, trait: 'The Oath',
      imgA: 'cards/dark_of_mirkwood/after_the_raid1A.jpg',
      imgB: 'cards/dark_of_mirkwood/after_the_raid1B.jpg',
      sideA: "Marauding Goblins have raided a woodman village on the eaves of Mirkwood forest. The Goblins killed the guards and took many of the villages captive. Those left behind beg you to rescue their loved ones.\n\nSetup: Search the encounter deck for 1 copy of The Eaves of Mirkwood and Goblin Troop. Add The Eaves of Mirkwood to the staging area and set Goblin Troop aside, out of play. Shuffle the encounter deck.",
      sideB: "You swear an oath to the survivors that you will rescue the captured woodmen and bring justice to the Goblins who attacked them, then you enter Mirkwood forest to find their trail.",
      paletteIdx: 1,
      onSetup: function(stage, game, engine) {
         let eaves = null, troop = null;
         const eavesIdx = game.encounterDeck.findIndex(c => c.id === 'oath_the_eaves_of_mirkwood');
         if(eavesIdx >= 0) eaves = game.encounterDeck.splice(eavesIdx, 1)[0];
         
         const troopIdx = game.encounterDeck.findIndex(c => c.id === 'oath_goblin_troop');
         if(troopIdx >= 0) troop = game.encounterDeck.splice(troopIdx, 1)[0];

         setTimeout(() => {
            if(eaves) {
               engine.animateDrawDirectToStaging(eaves, () => {
                  if (!game.stagingArea.some(c => c._uid === eaves._uid)) game.stagingArea.push(eaves);
                  engine.render();
               });
            }
         }, 200);
         
         setTimeout(() => {
            if(troop) {
               game.outOfPlay.push(troop);
               engine.toast('Goblin Troop', 'Goblin Troop set aside, out of play.', 'info');
               engine.render();
               game.encounterDeck = engine.shuffle(game.encounterDeck);
               engine.window._animateDeckShuffle('Encounter Deck Shuffled', 'The staging cards have been set up and the deck shuffled.');
            }
         }, 1200);
      }
    },
    {
      stage: 2, side: 'B', name: 'Mirkwood Forest', questPts: 12, trait: 'The Oath',
      imgA: 'cards/dark_of_mirkwood/mirkwood_forest2A.jpg',
      imgB: 'cards/dark_of_mirkwood/mirkwood_forest2B.jpg',
      sideA: "The Goblins' trail leads you deeper into the dark forest of Mirkwood. The enemy has a significant lead, but the sign of their passing is easy to follow. You may yet overtake them if you press on.",
      sideB: "When Revealed: Each player searches the encounter deck and discard pile for a Forest location and adds it to the staging area. Shuffle the encounter deck.\n\nThis stage cannot be defeated unless at least 1 copy of Goblin Trail is in the victory display.",
      paletteIdx: 1,
      setupButtons: function(stage, game, engine) {
         let btn = document.getElementById('forest-search-btn');
         if (!btn) {
            btn = document.createElement('button');
            btn.className = 'btn';
            btn.id = 'forest-search-btn';
            btn.style.cssText = 'min-width:180px;font-size:1rem;padding:0.85rem 2rem;border-color:var(--gold-bright);color:var(--gold-bright);';
            btn.textContent = 'Search Forest Location';
            document.getElementById('quest-reveal-actions').insertBefore(btn, document.getElementById('flip-quest-btn'));
         }

         btn.onclick = () => {
             const qrCard = document.getElementById('quest-card-inner');
             const qZone = document.getElementById('quest-zone');
             const questReveal = document.getElementById('quest-reveal');
             const targetIdx = (game.tempQuestStageIdx !== undefined) ? game.tempQuestStageIdx : (game.questStageIdx + 1);

             const startSearchFlow = () => {
                 let pIdx = 0;
                 const processNext = () => {
                     while(pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
                     if (pIdx >= game.numPlayers) {
                         game._oathStage2BDone = true;
                         btn.style.display = 'none';
                         game.encounterDeck = engine.shuffle(game.encounterDeck);
                         if (engine.window._animateDeckShuffle) {
                             engine.window._animateDeckShuffle('Encounter Deck', 'Encounter deck shuffled.');
                         }
                         engine.render();
                         return;
                     }
                     engine.window._switchTab(pIdx);
										 const forests = [...game.encounterDeck, ...game.encounterDiscard].filter(c => (c.trait||'').includes('Forest'));
										 if (forests.length > 0) {
												 const promptText = `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Player ${pIdx+1}: Choose a Forest location to add to staging:</span>`;
												 engine.showCardPicker('Mirkwood Forest', promptText, forests, (chosen) => {
                             if (chosen) {
                                 let idx = game.encounterDeck.findIndex(x => x._uid === chosen._uid);
                                 if(idx >= 0) game.encounterDeck.splice(idx, 1);
                                 else {
                                    idx = game.encounterDiscard.findIndex(x => x._uid === chosen._uid);
                                    if(idx >= 0) game.encounterDiscard.splice(idx, 1);
                                 }
                                 
                                 const startRect = engine.window._lastPickerRect;

                                 const animateLocationToStaging = (locCard, sRect, onComplete) => {
                                     const stagingContent = document.getElementById('staging-content');
                                     if (!sRect || !stagingContent) {
                                         onComplete();
                                         return;
                                     }

                                     const hasPlaceholder = game.stagingArea.length === 0;
                                     const originalHTML = stagingContent.innerHTML;
                                     if (hasPlaceholder) stagingContent.innerHTML = '';

                                     const stub = document.createElement('div');
                                     stub.className = 'card';
                                     stub.style.visibility = 'hidden';
                                     stub.style.margin = '0';
                                     stagingContent.appendChild(stub);
                                     const destRect = stub.getBoundingClientRect();
                                     stub.remove();

                                     if (hasPlaceholder) stagingContent.innerHTML = originalHTML;

                                     let cleanName = (locCard.name || '').replace(/ /g, '-').replace(/'/g, '');
                                     let ringsDbImg = locCard.code ? `https://ringsdb.com/bundles/cards/${locCard.code}.png` : '';
                                     let fallback = `https://hallofbeorn.com/Images/Cards/Core-Set/${cleanName}.jpg`;
                                     if (locCard.img) {
                                         fallback = locCard.img.startsWith('http') ? locCard.img : `https://drive.google.com/thumbnail?id=${locCard.img}&sz=w400`;
                                     }

                                     const ghost = document.createElement('div');
                                     ghost.style.cssText = `
                                         position: fixed; z-index: 100000;
                                         left: ${sRect.left}px; top: ${sRect.top}px;
                                         width: ${sRect.width}px; height: ${sRect.height}px;
                                         pointer-events: none; transition: none;
                                         box-shadow: 0 10px 30px rgba(0,0,0,0.8);
                                     `;
                                     ghost.innerHTML = `<div class="card ${locCard.sphere || 'encounter-location'}" style="width:100%; height:100%; border-radius:6px; border:2px solid var(--gold-deep); box-shadow:0 4px 10px rgba(0,0,0,0.6); background:linear-gradient(180deg, #1a3a1a 0%, #0a1a0a 100%); overflow:hidden;"><img src="${ringsDbImg || fallback}" onerror="this.src='${fallback}'" style="width:100%;height:100%;object-fit:cover;display:block;"></div>`;
                                     document.body.appendChild(ghost);

                                     if (engine.window.SoundFX && engine.window.SoundFX.playWhoosh) {
                                         engine.window.SoundFX.playWhoosh();
                                     }

                                     requestAnimationFrame(() => {
                                         requestAnimationFrame(() => {
                                             ghost.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                             ghost.style.left = `${destRect.left}px`;
                                             ghost.style.top = `${destRect.top}px`;
                                             ghost.style.width = `${destRect.width}px`;
                                             ghost.style.height = `${destRect.height}px`;
                                         });
                                     });

                                     setTimeout(() => {
                                         ghost.remove();
                                         onComplete();
                                     }, 650);
                                 };

                                 animateLocationToStaging(chosen, startRect, () => {
                                     game.stagingArea.push(chosen);
                                     engine.toast('Mirkwood Forest', `Added ${chosen.name} to staging.`, 'success');
                                     engine.render();
                                     pIdx++; processNext();
                                 });
                             } else {
                                 engine.toast('Mirkwood Forest', 'No Forest location chosen.', 'info');
                                 pIdx++; processNext();
                             }
                         }, true);
                     } else {
                         engine.toast('Mirkwood Forest', 'No Forest locations found.', 'info');
                         pIdx++; processNext();
                     }
                 };
                 processNext();
             };

             if (qrCard && qZone) {
                 const startRect = qrCard.getBoundingClientRect();
                 game.questBegun = true;
                 game._questAnimating = true;
                 game.questStageIdx = targetIdx;
                 game.questProgress = 0;
                 
                 engine.render();
                 void qZone.offsetWidth;

                 const realCard = document.querySelector('#quest-content .quest-card');
                 const destRect = realCard ? realCard.getBoundingClientRect() : qZone.getBoundingClientRect();

                 if (questReveal) questReveal.classList.remove('show');

                 const baseW = 700;
                 const baseH = 500;
                 const startScaleX = startRect.width / baseW;
                 const startScaleY = startRect.height / baseH;
                 
                 const uiScale = engine.window._resolutionScale || 1;
                 const expectedDestW = 280 * uiScale;
                 const expectedDestH = 200 * uiScale;
                 
                 const destScaleX = expectedDestW / baseW;
                 const destScaleY = expectedDestH / baseH;
                 
                 let destLeft = destRect.left;
                 let destTop = destRect.top;
                 if (!realCard) {
                     destLeft = destRect.left + (destRect.width / 2) - (expectedDestW / 2);
                     destTop = destRect.top + (24 * uiScale);
                 }

                 const questGhost = document.createElement('div');
                 questGhost.className = 'card quest-card';
                 questGhost.style.cssText = `
                     position: fixed; z-index: 1000;
                     left: ${startRect.left}px; top: ${startRect.top}px;
                     width: ${baseW}px; height: ${baseH}px;
                     transform: scale(${startScaleX}, ${startScaleY});
                     transition: transform 0.65s cubic-bezier(0.25, 0.8, 0.25, 1), left 0.65s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.65s cubic-bezier(0.25, 0.8, 0.25, 1);
                     transform-origin: top left;
                     pointer-events: none;
                     box-shadow: 0 4px 10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08);
                     margin: 0; padding: 0; overflow: visible;
                 `;

                 const imgUrl = 'cards/dark_of_mirkwood/mirkwood_forest2B.jpg';
                 questGhost.innerHTML = `
                     <img src="${imgUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;display:block;">
                     <div class="quest-progress-bar"><div class="quest-progress-fill" style="width:0%;"></div></div>
                     <div class="token-layer"><div class="token progress">0/12</div></div>
                 `;
                 document.body.appendChild(questGhost);

                 if (engine.window.SoundFX && engine.window.SoundFX.playWhoosh) {
                     engine.window.SoundFX.playWhoosh();
                 }

                 requestAnimationFrame(() => {
                     requestAnimationFrame(() => {
                         questGhost.style.left = `${destLeft}px`;
                         questGhost.style.top = `${destTop}px`;
                         questGhost.style.transform = `scale(${destScaleX}, ${destScaleY})`;
                     });
                 });

                 setTimeout(() => {
                     questGhost.remove();
                     game._questAnimating = false;
                     engine.render();
                     startSearchFlow();
                 }, 650);
             } else {
                 if (questReveal) questReveal.classList.remove('show');
                 game.questStageIdx = targetIdx;
                 game.questProgress = 0;
                 engine.render();
                 startSearchFlow();
             }
         };
         
         const flipBtn = document.getElementById('flip-quest-btn');
         const beginBtn = document.getElementById('begin-stage-btn');
         
         setTimeout(() => {
             if (beginBtn) beginBtn.style.display = 'none';
             if (game._oathStage2BFlipped) {
                 if (flipBtn) flipBtn.style.display = 'none';
                 if (btn) btn.style.display = 'inline-block';
             } else {
                 if (flipBtn) flipBtn.style.display = 'inline-block';
                 if (btn) btn.style.display = 'none';
             }
         }, 0);
      },
      canAdvance: function(stage, game, engine) {
         const hasTrailInVictory = game.victoryDisplay && game.victoryDisplay.some(c => c.id === 'oath_goblin_trail' || c.id === 'goblin_trail' || c.name === 'Goblin Trail');
         if (hasTrailInVictory) {
            game._goblinTrailExplored = true;
         }
         if (!game._goblinTrailExplored) {
            if (game.questProgress >= stage.questPts && !game._trailBlockToast) {
               engine.toast('Quest Blocked', 'You cannot defeat this stage unless Goblin Trail is in the victory display!', 'warning', 5000);
               game._trailBlockToast = true;
            }
            return false;
         }
         return true;
      }
    },
    {
      stage: 3, side: 'B', name: 'The Rearguard', questPts: 6, trait: 'The Oath',
      imgA: 'cards/dark_of_mirkwood/the_rearguard3A.jpg',
      imgB: 'cards/dark_of_mirkwood/the_rearguard3B.jpg',
      sideA: "When Revealed: The first player adds the set-aside Goblin Troop to the staging area. Each other player searches the encounter deck and discard pile for a Goblin enemy and adds it to the staging area.",
      sideB: "The Goblins are aware of your pursuit and form a rearguard to confront you while the others retreat to their secret hideaway. You must defeat this troop before you can continue your chance.\n\nThis stage cannot be defeated while Goblin Troop is in play. When this stage is defeated, the heroes discover the trail to the Goblins' secret lair and the players win the game.",
      paletteIdx: 1,
      setupButtons: function(stage, game, engine) {
         const qrOverlay = document.getElementById('quest-reveal');
         if (qrOverlay) qrOverlay.style.background = 'transparent';

         // Self-clearing high-frequency watcher to keep hardcoded buttons suppressed and flip visible
         const watchButtons = setInterval(() => {
            const flip = document.getElementById('flip-quest-btn');
            const begin = document.getElementById('begin-stage-btn');
            const oldSetup = document.getElementById('rearguard-setup-btn');
            if (oldSetup) oldSetup.remove();
            
            if (game.numPlayers > 1) {
               if (begin) begin.style.display = 'none';
            } else {
               if (game._oathStage3BFlipped) {
                   if (begin) begin.style.display = 'inline-block';
               } else {
                   if (begin) begin.style.display = 'none';
               }
            }
            if (flip && !game._oathStage3BFlipped) flip.style.display = 'inline-block';
            
            if (!qrOverlay || !qrOverlay.classList.contains('show')) {
               clearInterval(watchButtons);
            }
         }, 30);

         const flipBtn = document.getElementById('flip-quest-btn');
         const beginBtn = document.getElementById('begin-stage-btn');
         if (flipBtn) flipBtn.style.display = 'inline-block';
         if (beginBtn) beginBtn.style.display = 'none';

         // Smoothly animate Goblin Troop moving from Out of Play to Staging Area
         const troopIdx = game.outOfPlay.findIndex(c => c.id === 'oath_goblin_troop' || c.id === 'goblin_troop');
         if (troopIdx >= 0) {
            const troop = game.outOfPlay[troopIdx];
            const troopEl = document.querySelector(`[data-uid="${troop._uid}"]`);
            const startRect = troopEl ? troopEl.getBoundingClientRect() : null;
            
            // Temporarily disable Out of Play transitions so it collapses instantly
            const oopZone = document.getElementById('out-of-play-zone');
            let originalTransition = '';
            if (oopZone) {
               originalTransition = oopZone.style.transition;
               oopZone.style.transition = 'none';
               oopZone.style.flex = '0 0 0px';
               oopZone.style.width = '0px';
               oopZone.style.padding = '0';
               oopZone.style.margin = '0';
               oopZone.style.border = 'none';
               oopZone.style.opacity = '0';
               void oopZone.offsetHeight; // Force instant layout recalculation
            }

            game.outOfPlay.splice(troopIdx, 1);
            engine.render();

            const finalizeTroop = () => {
               game.stagingArea.push(troop);
               engine.toast('The Rearguard', 'Goblin Troop added to the staging area.', 'danger');
               engine.render();
               if (oopZone) {
                  oopZone.style.transition = originalTransition; // Restore transition for future cards
               }
            };

            if (startRect && engine.window._animateCardToStaging) {
               engine.window._animateCardToStaging(troop, startRect, finalizeTroop);
            } else {
               finalizeTroop();
            }
         }

         let btn = document.getElementById('rearguard-search-btn');
         if (!btn) {
            btn = document.createElement('button');
            btn.className = 'btn';
            btn.id = 'rearguard-search-btn';
            btn.style.cssText = 'min-width:220px;font-size:1rem;padding:0.85rem 2rem;border-color:var(--gold-bright);color:var(--gold-bright);';
            btn.textContent = 'Search Encounter Deck and Discard Pile';
            const actionsContainer = document.getElementById('quest-reveal-actions');
            if (actionsContainer) actionsContainer.appendChild(btn);
         }
         btn.style.display = game.numPlayers > 1 ? 'inline-block' : 'none';

         btn.onclick = () => {
             btn.style.display = 'none';
             let otherPlayers = [];
             for (let p = 0; p < game.numPlayers; p++) {
                 if (p !== game.firstPlayerIdx && !game.eliminated[p]) {
                     otherPlayers.push(p);
                 }
             }

             let pIdxOrder = 0;

             const finishStage3Setup = () => {
                 clearInterval(watchButtons);
                 if (qrOverlay) {
                     qrOverlay.style.background = '';
                 }
                 game._oathStage3BDone = true;
                 game.questBegun = true;
                 game.questStageIdx = (game.tempQuestStageIdx !== undefined) ? game.tempQuestStageIdx : 2;
                 
                 if (beginBtn) {
                     beginBtn.click(); // Trigger native smooth top-left flight animation
                 } else {
                     if (qrOverlay) qrOverlay.classList.remove('show');
                     engine.render();
                 }
             };

             const processNextOtherPlayer = () => {
                 if (pIdxOrder >= otherPlayers.length) {
                     game.encounterDeck = engine.shuffle(game.encounterDeck);
                     if (engine.window._animateDeckShuffle) {
                         engine.window._animateDeckShuffle('Encounter Deck', 'Encounter deck shuffled after Goblin search.');
                     }
                     finishStage3Setup();
                     return;
                 }

                 const pIdx = otherPlayers[pIdxOrder];
                 engine.window._switchTab(pIdx);
                 const goblins = [...game.encounterDeck, ...game.encounterDiscard].filter(c => (c.trait || '').includes('Goblin'));

                 if (goblins.length > 0) {
                     const promptText = `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Player ${pIdx+1}: Choose a Goblin enemy to add to staging:</span>`;
                     engine.showCardPicker('The Rearguard', promptText, goblins, (chosen) => {
                         if (chosen) {
                             let idx = game.encounterDeck.findIndex(x => x._uid === chosen._uid);
                             if (idx >= 0) game.encounterDeck.splice(idx, 1);
                             else {
                                 idx = game.encounterDiscard.findIndex(x => x._uid === chosen._uid);
                                 if (idx >= 0) game.encounterDiscard.splice(idx, 1);
                             }

                             const startRect = engine.window._lastPickerRect;

                             const finalizeGoblin = () => {
                                 game.stagingArea.push(chosen);
                                 engine.toast('The Rearguard', `Player ${pIdx+1} added ${chosen.name} to staging.`, 'success');
                                 engine.render();
                                 pIdxOrder++;
                                 processNextOtherPlayer();
                             };

                             if (startRect && engine.window._animateCardToStaging) {
                                 engine.window._animateCardToStaging(chosen, startRect, finalizeGoblin);
                             } else {
                                 finalizeGoblin();
                             }
                         } else {
                             pIdxOrder++;
                             processNextOtherPlayer();
                         }
                     }, true);
                 } else {
                     engine.toast('The Rearguard', `Player ${pIdx+1}: No Goblin enemies found.`, 'info');
                     pIdxOrder++;
                     processNextOtherPlayer();
                 }
             };

             if (otherPlayers.length > 0) {
                 processNextOtherPlayer();
             } else {
                 engine.toast('The Rearguard', 'No other players to search.', 'info');
                 finishStage3Setup();
             }
         };
      },
      canAdvance: function(stage, game, engine) {
         const troopInPlay = game.stagingArea.some(c => c.id === 'oath_goblin_troop') || game.engagedEnemies.some(c => c.id === 'oath_goblin_troop');
         if (troopInPlay) {
             if (game.questProgress >= stage.questPts && !game._troopBlockToast) {
                engine.toast('Quest Blocked', 'You cannot defeat this stage while Goblin Troop is in play!', 'warning', 5000);
                game._troopBlockToast = true;
             }
             return false;
         }
         return true;
      }
    }
  ],
  encounterCards: [
    {
      id: "oath_spiders_of_mirkwood", name: "Spiders of Mirkwood", type: "enemy", sphere: "encounter-enemy", portrait: "🕷️",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Spiders-of-Mirkwood.jpg',
      engagement: 18, threat: 3, attack: 2, defense: 2, hp: 4, trait: "Spider",
      text: "While it is engaged with you, Spiders of Mirkwood gets +1 Attack for each exhausted character you control.",
      shadow: "Shadow: Choose and exhaust 1 character you control. If this attack was undefended, also deal that character 2 damage.", copies: 2,
      getAttackMod: function(c, target, game) {
          const isEngaged = game.engagedEnemies.includes(c);
          if (isEngaged && c._engagedWithPlayerIdx !== undefined) {
              const pIdx = c._engagedWithPlayerIdx;
              const playerChars = [...game.heroes, ...game.allies].filter(char => char.exhausted && !char._prisoner && (char._ownerIdx === undefined ? 0 : char._ownerIdx) === pIdx);
              return playerChars.length;
          }
          return 0;
      },
      onShadow: function(shadow, enemy, defChars, game, engine, next) {
          const targetPIdx = enemy._engagedWithPlayerIdx !== undefined ? enemy._engagedWithPlayerIdx : game.activeTabPlayerIdx;
          const readyChars = [...game.heroes, ...game.allies].filter(c => !c.exhausted && !c._prisoner && (c._ownerIdx === undefined ? 0 : c._ownerIdx) === targetPIdx);
          if (readyChars.length > 0) {
              if (game.activeTabPlayerIdx !== targetPIdx) engine.window._switchTab(targetPIdx);
              engine.showHeroPicker('Shadow Effect: Spiders of Mirkwood', 'Choose a ready character to exhaust:', readyChars, (chosen) => {
                  if (!chosen) chosen = readyChars[0]; // Prevent ESC cancel exploit
                  if (chosen) {
                      const cardEl = document.querySelector(`[data-uid="${chosen._uid}"]`);
                      if (cardEl) {
                         cardEl.classList.add('exhausted');
                         setTimeout(() => {
                           chosen.exhausted = true;
                           delete chosen._justExhaustedTime;
                           engine.toast('Spiders of Mirkwood', `${chosen.name} exhausted.`, 'danger');
                           
                           if (defChars && defChars.length === 0) {
                              chosen.damage += 2;
                              engine.toast('Spiders of Mirkwood (Undefended)', `${chosen.name} takes 2 damage from undefended attack shadow effect!`, 'danger');
                              engine.spawnBurstAtElement(document.querySelector(`[data-uid="${chosen._uid}"]`), '#c0392b', 20);
                              engine.checkHeroDeath(chosen);
                           }
                           
                           engine.render();
                           next();
                         }, 300);
                         return;
                      } else {
                         chosen.exhausted = true;
                         engine.toast('Spiders of Mirkwood', `${chosen.name} exhausted.`, 'danger');
                         
                         if (defChars && defChars.length === 0) {
                            chosen.damage += 2;
                            engine.toast('Spiders of Mirkwood (Undefended)', `${chosen.name} takes 2 damage from undefended attack shadow effect!`, 'danger');
                            engine.checkHeroDeath(chosen);
                         }
                         
                         engine.render();
                      }
                  }
                  next();
              }, true);
          } else {
              next();
          }
      }
    },
    {
      id: "oath_goblin_troop", name: "Goblin Troop", type: "enemy", sphere: "encounter-enemy", portrait: "👺",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Goblin-Troop.jpg',
      engagement: 35, threat: 3, attack: 5, defense: 3, hp: 6, trait: "Goblin · Orc",
      text: "Cannot have attachments.\nWhile Goblin Troop is engaged with you, each other Goblin enemy engaged with you gets +1 Attack and +1 Defense.",
      shadow: "Shadow: Attacking enemy gets +2 Attack.", copies: 1,
      onShadow: function(shadow, enemy, defChars, game, engine, next) {
          enemy.attackBonus = (enemy.attackBonus || 0) + 2;
          engine.toast('Shadow Effect', `Goblin Troop: Attacking enemy +2 ⚔`, 'danger', 2800);
          engine.render();
          next();
      }
    },
    {
      id: "oath_goblin_sniper", name: "Goblin Sniper", type: "enemy", sphere: "encounter-enemy", portrait: "🏹",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Goblin-Sniper.jpg',
      engagement: 48, threat: 2, attack: 2, defense: 0, hp: 2, trait: "Goblin · Orc",
      text: "During the encounter phase, players cannot optionally engage Goblin Sniper if there are other enemies in the staging area.\nForced: If Goblin Sniper is in the staging area at the end of the combat phase, each player deals 1 damage to 1 character he controls.",
      copies: 2
    },
    {
      id: "oath_goblin_runners", name: "Goblin Runners", type: "enemy", sphere: "encounter-enemy", portrait: "🏃",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Goblin-Runners.jpg',
      engagement: 20, threat: 1, attack: 3, defense: 1, hp: 2, trait: "Goblin · Orc", text: "Surge.",
      shadow: "Shadow: Attacking enemy makes an additional attack immediately after this one. (Deal a new shadow card for that attack.)", copies: 2,
      onReveal: function(card, game, engine, cb) {
          card._surging = true;
          engine.toast('Surge', `${card.name} has Surge! Revealing an additional card.`, 'warning');
          if (cb) cb();
      },
      onShadow: function(shadow, enemy, defChars, game, engine, next) {
          Object.defineProperty(enemy, '_attackedThisRound', {
              get() { return false; },
              set(val) {
                  Object.defineProperty(enemy, '_attackedThisRound', {
                      value: val === true ? false : val,
                      writable: true,
                      configurable: true,
                      enumerable: true
                  });

                  if (val === true) {
                      // Deactivate all first-attack shadow effects so they stay attached but do not resolve a second time!
                      if (enemy.shadowCards) {
                          enemy.shadowCards.forEach(sc => {
                              delete sc.shadow;
                              delete sc.onShadow;
                          });
                      }

                      queueMicrotask(() => {
                          if (!game.engagedEnemies.some(e => e._uid === enemy._uid)) return;

                          engine.checkEmptyEncounterDeck(() => {
                              if (game.encounterDeck.length > 0) {
                                  const sc = game.encounterDeck.pop();
                                  enemy.shadowCards = enemy.shadowCards || [];
                                  const nextIdx = enemy.shadowCards.length;
                                  enemy.shadowCards.push(sc);

                                  if (engine.startEnemyAttack) {
                                      engine.startEnemyAttack(enemy);
                                  }

                                  if (engine.window.animateShadowCard) {
                                      engine.window.animateShadowCard(enemy._uid, sc, () => {
                                          engine.render();
                                      }, nextIdx);
                                  } else {
                                      engine.render();
                                  }
                              } else {
                                  if (engine.startEnemyAttack) {
                                      engine.startEnemyAttack(enemy);
                                  }
                              }
                          });
                      });
                  }
              },
              configurable: true,
              enumerable: true
          });

          engine.toast('Shadow Effect', `${shadow.name}: Enemy will make an additional attack immediately after this one!`, 'danger', 4000);
          next();
      }
    },
    {
      id: "oath_goblintown_scavengers", name: "Goblintown Scavengers", type: "enemy", sphere: "encounter-enemy", portrait: "🗡️",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Goblintown-Scavengers.jpg',
      engagement: 12, threat: 1, attack: 1, defense: 0, hp: 3, trait: "Goblin · Orc",
      text: "When Revealed: Discard the top card of each player's deck. Until the end of the phase, increase Goblintown Scavenger's Threat by the total printed cost of all cards discarded in this way.", copies: 2,
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
      id: "oath_great_spider", name: "Great Spider", type: "enemy", sphere: "encounter-enemy", portrait: "🕷️",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Great-Spider.jpg',
      engagement: 34, threat: 2, attack: 3, defense: 1, hp: 3, trait: "Spider",
      text: "Forced: After Great Spider engages you, exhaust a character you control.",
      shadow: "Shadow: Deal 1 damage to an exhausted character you control.", copies: 2,
      onShadow: function(shadow, enemy, defChars, game, engine, next) {
          const targetPIdx = enemy._engagedWithPlayerIdx !== undefined ? enemy._engagedWithPlayerIdx : game.activeTabPlayerIdx;
          const exhaustedChars = [...game.heroes, ...game.allies].filter(c => c.exhausted && !c._prisoner && (c._ownerIdx === undefined ? 0 : c._ownerIdx) === targetPIdx);
          if (exhaustedChars.length > 0) {
              if (game.activeTabPlayerIdx !== targetPIdx) engine.window._switchTab(targetPIdx);
              engine.showHeroPicker('Shadow Effect: <br>Great Spider', '<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Forced: Choose an exhausted character to suffer 1 damage:</span>', exhaustedChars, (chosen) => {
                  if (chosen) {
                      chosen.damage += 1;
                      engine.toast('Great Spider', `Dealt 1 damage to ${chosen.name}.`, 'danger');
                      engine.spawnBurstAtElement(document.querySelector(`[data-uid="${chosen._uid}"]`), '#c0392b', 15);
                      engine.checkHeroDeath(chosen);
                      engine.render();
                  }
                  next();
              }, true);
          } else {
              next();
          }
      }
    },
    {
      id: "oath_the_eaves_of_mirkwood", name: "The Eaves of Mirkwood", type: "location", sphere: "encounter-location", portrait: "🌲",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/The-Eaves-of-Mirkwood.jpg',
      threat: 2, questPts: 2, trait: "Forest",
      text: "While The Eaves of Mirkwood is the active location, encounter card effects cannot be canceled.", copies: 2
    },
    {
      id: "oath_tangled_grove", name: "Tangled Grove", type: "location", sphere: "encounter-location", portrait: "🌳",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Tangled-Grove.jpg',
      threat: 0, questPts: 3, trait: "Forest",
      text: "X Threat where X is the number of locations in the staging area.\nTravel: Each player must discard 1 random card from his hand to travel here.", copies: 2,
      getThreatMod: function(c, game, engine) {
          if (game.stagingArea.includes(c)) return game.stagingArea.filter(x => x.type === 'location').length;
          return 0;
      },
      onTravel: function(loc, game, engine, proceedTravel) {
          let pIdx = 0;
          let discardedAny = false;
          const processNext = () => {
              while (pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
              if (pIdx >= game.numPlayers) {
                  if (discardedAny) {
                      engine.toast('Tangled Grove', 'Each player discarded 1 random card to travel.', 'danger', 3000);
                  }
                  proceedTravel();
                  return;
              }
              const pHand = game.hand.filter(c => c._ownerIdx === pIdx || (c._ownerIdx === undefined && pIdx === 0));
              if (pHand.length > 0) {
                  if (game.activeTabPlayerIdx !== pIdx) {
                      engine.window._switchTab(pIdx);
                  }
                  setTimeout(() => {
                      const dropped = pHand[Math.floor(Math.random() * pHand.length)];
                      const cardEl = document.querySelector(`[data-uid="${dropped._uid}"]`);
                      const startRect = cardEl ? cardEl.getBoundingClientRect() : null;
                      
                      game.hand = game.hand.filter(c => c._uid !== dropped._uid);
                      engine.render();
                      
                      engine.discardCard(dropped, game.playerDiscards[pIdx] || game.playerDiscard, false, startRect);
                      discardedAny = true;
                      
                      setTimeout(() => {
                          pIdx++;
                          processNext();
                      }, 800);
                  }, 150);
              } else {
                  pIdx++;
                  processNext();
              }
          };
          processNext();
      }
    },
    {
      id: "oath_spider_den", name: "Spider Den", type: "location", sphere: "encounter-location", portrait: "🕸️",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Spider-Den.jpg',
      threat: 4, questPts: 4, trait: "Forest",
      text: "Quest Action: Search the encounter deck and discard pile for a Spider enemy and put it into play engaged with you to discard Spider Den. (Any player may trigger this effect.)", copies: 2,
      onClick: function(c, game, engine) {
         if (game.phase.startsWith('quest') && (game.stagingArea.includes(c) || game.activeLocation === c)) {
            const spiders = [...game.encounterDeck, ...game.encounterDiscard].filter(x => (x.trait||'').includes('Spider'));
            if (spiders.length > 0) {
               engine.showCardPicker('Spider Den', 'Choose a Spider to engage:', spiders, (chosen) => {
                  if(chosen) {
                        const spiderDenEl = document.querySelector(`[data-uid="${c._uid}"]`);
                        const spiderDenRect = spiderDenEl ? spiderDenEl.getBoundingClientRect() : null;

                        if(game.activeLocation === c) game.activeLocation = null;
                        else game.stagingArea = game.stagingArea.filter(x => x._uid !== c._uid);
                        engine.discardCard(c, game.encounterDiscard, false, spiderDenRect);

                        const idxInDeck = game.encounterDeck.findIndex(x => x._uid === chosen._uid);
                        if(idxInDeck >= 0) {
                           game.encounterDeck.splice(idxInDeck, 1);
                        } else {
                           const idxInDiscard = game.encounterDiscard.findIndex(x => x._uid === chosen._uid);
                           if(idxInDiscard >= 0) game.encounterDiscard.splice(idxInDiscard, 1);
                        }

                        chosen._engagedWithPlayerIdx = game.activeTabPlayerIdx;

                        const startEl = idxInDeck >= 0 ? document.getElementById('encounter-deck-pile') : document.getElementById('encounter-discard-pile');
                        const engagedZone = document.getElementById('engaged-content');
                        
                        const finalizeEngagement = () => {
                           game.engagedEnemies.push(chosen);
                           engine.toast('Spider Den', `Discarded Spider Den and engaged ${chosen.name}.`, 'success');
                           engine.render();
                           
                           if (chosen.id === 'oath_great_spider' || chosen.id === 'great_spider') {
                              const readyChars = [...game.heroes, ...game.allies].filter(char => !char.exhausted && !char._prisoner && (char._ownerIdx === undefined ? 0 : char._ownerIdx) === game.activeTabPlayerIdx);
                              if (readyChars.length > 0) {
                                 engine.showHeroPicker('Great Spider Forced Action', 'Forced: After Great Spider engages you, exhaust a character you control:', readyChars, (heroToExhaust) => {
                                    if (heroToExhaust) {
                                       const el = document.querySelector(`[data-uid="${heroToExhaust._uid}"]`);
                                       if (el) {
                                          el.classList.add('exhausted');
                                          setTimeout(() => {
                                             heroToExhaust.exhausted = true;
                                             delete heroToExhaust._justExhaustedTime;
                                             engine.render();
                                          }, 350);
                                       } else {
                                          heroToExhaust.exhausted = true;
                                          delete heroToExhaust._justExhaustedTime;
                                          engine.render();
                                       }
                                       engine.toast('Great Spider', `${heroToExhaust.name} exhausted.`, 'danger');
                                    }
                                 }, true);
                              }
                           }
                        };

                     if (startEl && engagedZone) {
                        const startRect = startEl.getBoundingClientRect();
                        const scale = window._resolutionScale || 1;
                        const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                        const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                        
                        const ghost = document.createElement('div');
                        ghost.style.cssText = `
                           position: fixed; z-index: 100000;
                           left: ${startRect.left}px; top: ${startRect.top}px;
                           width: ${cardW}px; height: ${cardH}px;
                           transform: scale(${startRect.width / cardW}) rotate(0deg);
                           transform-origin: top left;
                           transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
                           pointer-events: none;
                           box-shadow: 0 10px 25px rgba(0,0,0,0.7);
                        `;
                        
                        let cleanName = (chosen.name || '').replace(/ /g, '-').replace(/'/g, '');
                        let ringsDbImg = chosen.code ? `https://ringsdb.com/bundles/cards/${chosen.code}.png` : '';
                        let fallback = `https://hallofbeorn.com/Images/Cards/Core-Set/${cleanName}.jpg`;
                        if (chosen.img) {
                           fallback = chosen.img.startsWith('http') ? chosen.img : `https://drive.google.com/thumbnail?id=${chosen.img}&sz=w400`;
                        }
                        ghost.innerHTML = `<div class="card ${chosen.sphere || 'neutral'}" style="width:144px; height:202px; border-radius:6px; border:2px solid var(--gold-deep); box-shadow:0 4px 10px rgba(0,0,0,0.6); background:linear-gradient(180deg, #1a3a1a 0%, #0a1a0a 100%); overflow:hidden;"><img src="${ringsDbImg || fallback}" onerror="this.src='${fallback}'" style="width:100%;height:100%;object-fit:cover;display:block;"></div>`;
                        document.body.appendChild(ghost);
                        
                        const hasPlaceholder = game.engagedEnemies.length === 0;
                        const originalHTML = engagedZone.innerHTML;
                        if (hasPlaceholder) engagedZone.innerHTML = '';
                        
                        const stub = document.createElement('div');
                        stub.className = 'card';
                        stub.style.visibility = 'hidden';
                        stub.style.margin = '0';
                        engagedZone.appendChild(stub);
                        const destRect = stub.getBoundingClientRect();
                        stub.remove();
                        
                        if (hasPlaceholder) engagedZone.innerHTML = originalHTML;
                        
                        void ghost.offsetWidth;
                        
                        ghost.style.left = `${destRect.left}px`;
                        ghost.style.top = `${destRect.top}px`;
                        ghost.style.transform = `scale(${destRect.width / cardW})`;
                        
                        if (window.SoundFX && window.SoundFX.playDraw) {
                           window.SoundFX.playDraw();
                        }
                        
                        setTimeout(() => {
                           ghost.remove();
                           finalizeEngagement();
                        }, 600);
                     } else {
                        finalizeEngagement();
                     }
                  }
               }, 'Cancel');
               return true;
            } else {
               engine.toast('Spider Den', 'No spiders found in deck or discard.', 'info');
               return true;
            }
         }
         return false;
      }
    },
    {
      id: "oath_goblin_trail", name: "Goblin Trail", type: "location", sphere: "encounter-location", portrait: "🐾",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Goblin-Trail.jpg',
      threat: 3, questPts: 6, trait: "Forest",
      text: "Travel: Reveal the top card of the encounter deck to travel here.\nResponse: When Goblin Trail leaves play as an explored location, place 6 progress on the current quest.", copies: 2, victory: 3,
      onTravel: function(loc, game, engine, proceedTravel) {
          engine.toast('Goblin Trail', 'Travel: Revealing top encounter card.', 'info');
          engine.window.revealEncounterCard(() => {
             proceedTravel();
          });
      },
      onExplored: function(loc, game, engine) {
          game._goblinTrailExplored = true;
          engine.toast('Goblin Trail', 'Response: Placed 6 progress on the current quest!', 'success');
          engine.addProgressToQuest(6);
      }
    },
    {
      id: "oath_forest_gate", name: "Forest Gate", type: "location", sphere: "encounter-location", portrait: "🌲",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Forest-Gate.jpg',
      threat: 2, questPts: 4, trait: "Forest",
      text: "Response: After you travel to Forest Gate, the first player draws 2 cards.", copies: 2,
      onTravel: function(loc, game, engine, proceedTravel) {
          const promptText = game.numPlayers > 1 
            ? `Response: After you travel to Forest Gate, the first player (Player ${game.firstPlayerIdx + 1}) may draw 2 cards?`
            : `Response: After you travel to Forest Gate, draw 2 cards?`;

          engine.showConfirmModal('Forest Gate', `<span style="font-size:1.8rem; font-weight:600; color:var(--parchment); display:block; text-align:center; line-height:1.45;">${promptText}</span>`, ()=>{
            const originalTab = game.activeTabPlayerIdx;
            const fpIdx = game.firstPlayerIdx;

            if (originalTab !== fpIdx) {
               engine.window._switchTab(fpIdx);
            }

            engine.window.drawCard(null, fpIdx);
            engine.window.drawCard(() => {
               if (originalTab !== fpIdx) {
                  setTimeout(() => {
                     engine.window._switchTab(originalTab);
                  }, 550);
               }
            }, fpIdx);

            engine.toast('Forest Gate', game.numPlayers > 1 ? `Player ${fpIdx + 1} drew 2 cards!` : 'Drew 2 cards!', 'success');
            proceedTravel();
          }, ()=>{
            engine.toast('Forest Gate', 'Skipped drawing.', 'info');
            proceedTravel();
          });
      }
    },
    {
      id: "oath_driven_by_shadow", name: "Driven by Shadow", type: "treachery", sphere: "encounter-treachery", portrait: "🌑",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Driven-by-Shadow.jpg',
      text: "When Revealed: Each enemy and each location currently in the staging area gets +1 Threat until the end of the phase. If there are no cards in the staging area, Driven by Shadow gains surge.",
      shadow: "Shadow: Choose and discard 1 attachment from the defending character. (If undefended, discard all attachments you control.)", copies: 2,
      onReveal: function(card, game, engine, cb) {
          const stagingCards = game.stagingArea.filter(c => c.type === 'enemy' || c.type === 'location');
          if(stagingCards.length > 0){
            stagingCards.forEach(c => {
              c.threatBonus = (c.threatBonus || 0) + 1;
            });
            engine.toast('Driven by Shadow', 'Each enemy and location in the staging area gets +1 Threat until the end of the phase!', 'danger', 3500);
            if(cb) cb();
          } else {
            engine.toast('Driven by Shadow', 'No enemies or locations in staging! Driven by Shadow gains Surge.', 'danger', 3500);
            card._surging = true;
            if(cb) cb();
          }
      }
    },
    {
      id: "oath_caught_in_web", name: "Caught in a Web", type: "treachery", sphere: "encounter-treachery", portrait: "🕸️",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Caught-in-a-Web.jpg',
      text: "When Revealed: The player with the highest threat level attaches this card to one of his heroes. (Counts as a Condition attachment with the text: 'Attached hero does not ready during the refresh phase unless you pay 2 resources from that hero's pool.')", copies: 1,
      onReveal: function(card, game, engine, cb) {
          let highestThreat = -1;
          let highestPlayers = [];
          for(let p=0; p<game.numPlayers; p++) {
            if(!game.eliminated[p]){
              if(game.threats[p] > highestThreat) {
                highestThreat = game.threats[p];
                highestPlayers = [p];
              } else if(game.threats[p] === highestThreat) {
                highestPlayers.push(p);
              }
            }
          }
          const eligibleHeroes = game.heroes.filter(h => !h._prisoner && highestPlayers.includes(h._ownerIdx));
          engine.showHeroPicker('Caught in a Web', 'Choose a hero to attach Caught in a Web to:', eligibleHeroes, (chosen)=>{
            if(chosen){
              const startEl = document.getElementById('encounter-limbo-ghost') || document.querySelector(`.modal [data-uid="${card._uid}"]`);
              const startRect = startEl ? startEl.getBoundingClientRect() : null;
              if (startEl && startEl.id === 'encounter-limbo-ghost') {
                startEl.remove();
              }

              const webInst = engine.window.makeCardInst({...card, type:'attachment', trait:'Condition', text:'Hero does not ready during the refresh phase unless you pay 2 resources from that hero\'s pool.'});
              webInst.isWeb = true;
              webInst._ownerIdx = chosen._ownerIdx;
              
              const finalizeAttach = () => {
                chosen.attached.push(webInst);
                engine.toast('Caught in a Web', `Attached to ${chosen.name}.`, 'danger');
                engine.render();
                if (cb) cb();
              };

              if (startRect && engine.window.animateAttachmentFromHand) {
                document.getElementById('modal-overlay').classList.remove('show');
                engine.window.animateAttachmentFromHand(webInst, chosen._uid, startRect, null, finalizeAttach);
              } else {
                finalizeAttach();
              }
            } else {
              if(cb) cb();
            }
            engine.window._caughtInWebTargetHero = chosen;
          }, true, card);
      }
    },
    {
      id: "oath_surprising_speed", name: "Surprising Speed", type: "treachery", sphere: "encounter-treachery", portrait: "💨",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Surprising-Speed.jpg',
      text: "When Revealed: Each player returns 1 enemy engaged with him to the staging area. If no enemy was returned to the staging area this way, Surprising Speed gains surge and doomed 1.",
      shadow: "Shadow: Attacking enemy gets +1 Attack. Return attacking enemy to the staging area after this attack.", copies: 2,
      onReveal: function(card, game, engine, cb) {
         let pIdx = 0;
         let enemiesReturned = 0;
         const processNext = () => {
             while(pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
             if(pIdx >= game.numPlayers) {
                 if (enemiesReturned === 0) {
                     for(let p=0; p<game.numPlayers; p++) if(!game.eliminated[p]) game.threats[p]++;
                     if(game.numPlayers === 1) game.threat++;
                     card._surging = true;
                     engine.toast('Surprising Speed', 'Doomed 1. Surge!', 'danger');
                     engine.spawnBurstAtElement(document.getElementById('hud-threat'), '#c0392b', 15);
                     
                     const overlay = document.createElement('div');
                     overlay.id = 'doomed-threat-overlay';
                     overlay.style.cssText = 'position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(200,0,0,0.45); pointer-events:none; transition: background 0.3s ease-out;';
                     
                     const bigText = document.createElement('div');
                     bigText.style.cssText = "font-family:'Cinzel Decorative', serif; font-size:4.5rem; font-weight:900; color:#ff3030; text-shadow:0 0 35px #ff0000, 0 4px 15px #000; transform:scale(0.5); opacity:0; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);";
                     bigText.textContent = `+1 Threat!`;
                     overlay.appendChild(bigText);
                     document.body.appendChild(overlay);
                     
                     if (engine.screenShake) engine.screenShake(18, 500);
                     
                     setTimeout(() => {
                       bigText.style.transform = 'scale(1)';
                       bigText.style.opacity = '1';
                     }, 50);
                     
                     setTimeout(() => {
                       overlay.style.background = 'rgba(200,0,0,0)';
                       bigText.style.transform = 'scale(1.2) translateY(-100px)';
                       bigText.style.opacity = '0';
                       
                       setTimeout(() => {
                         overlay.remove();
                       }, 400);
                       
                       const diffEl = document.getElementById('hud-threat-diff');
                       if (diffEl) {
                         diffEl.textContent = `+1 Threat!`;
                         diffEl.classList.remove('threat-diff-active');
                         void diffEl.offsetWidth;
                         diffEl.classList.add('threat-diff-active');
                         
                         setTimeout(() => {
                           diffEl.classList.remove('threat-diff-active');
                           diffEl.textContent = '';
                         }, 3500);
                       }
                       
                       for(let p=0; p<game.numPlayers; p++) {
                           if (window.game && window.game.threats && window.game.threats[p] >= 50) engine.eliminatePlayer(p);
                       }
                     }, 1500);
                 }
                 if(cb) cb();
                 return;
             }
             if (game.activeTabPlayerIdx !== pIdx) engine.window._switchTab(pIdx);
             const engaged = game.engagedEnemies.filter(e => e._engagedWithPlayerIdx === pIdx || (e._engagedWithPlayerIdx === undefined && pIdx === 0));
             if (engaged.length > 0) {
                 engine.showEnemyPicker('Surprising Speed', `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Player ${pIdx+1}: Return 1 enemy to the staging area:</span>`, engaged, (chosen) => {
                     if (chosen) {
                         setTimeout(() => {
                             const doReturn = () => {
                                 game.engagedEnemies = game.engagedEnemies.filter(x => x._uid !== chosen._uid);
                                 delete chosen._engagedWithPlayerIdx;
                                 chosen._activeAttacker = false;
                                 if (engine.window && engine.window.cardPositions) {
                                     delete engine.window.cardPositions[chosen._uid];
                                 }
                                 game.stagingArea.push(chosen);
                                 enemiesReturned++;
                                 engine.toast('Surprising Speed', `Returned ${chosen.name} to staging.`, 'danger');
                                 engine.render();
                                 pIdx++;
                                 processNext();
                             };

                             if (window.animateReturnToStaging) {
                                 window.animateReturnToStaging(chosen, doReturn);
                             } else {
                                 doReturn();
                             }
                         }, 50);
                     } else {
                         pIdx++;
                         processNext();
                     }
                 }, true);
             } else {
                 pIdx++;
                 processNext();
             }
         };
         processNext();
      },
      onShadow: function(shadow, enemy, defChars, game, engine, next) {
          engine.toast('Shadow Effect', `${shadow.name}: Return attacking enemy to staging after this attack.`, 'danger');
          enemy._wargsLikeReturnToStaging = true;
          engine.render();
          next();
      }
    },
    {
      id: "oath_goblins_are_upon_you", name: "Goblins are Upon You!", type: "treachery", sphere: "encounter-treachery", portrait: "👺",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Goblins-Are-Upon-You.jpg',
      text: "When Revealed: Each player must search the encounter deck and discard pile for a Goblin enemy and put it into play, engaged with him. Then, shuffle the encounter deck. (This effect cannot be canceled.)",
      shadow: "Shadow: Attacking enemy gets +1 Attack for each Goblin enemy engaged with you.", copies: 1,
      onReveal: function(card, game, engine, cb) {
          let pIdx = 0;
          const processNext = () => {
             while(pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
             if(pIdx >= game.numPlayers) {
                game.encounterDeck = engine.shuffle(game.encounterDeck);
                engine.window._animateDeckShuffle('Encounter Deck', 'Shuffled after Goblins are Upon You!');
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
                       chosen._engagedWithPlayerIdx = pIdx;
                       game.engagedEnemies.push(chosen);
                       engine.toast('Goblins are Upon You!', `Player ${pIdx+1} engaged ${chosen.name}.`, 'danger');
                       engine.render();
                   }
                   pIdx++; processNext();
                }, true);
             } else {
                engine.toast('Goblins are Upon You!', 'No Goblins found.', 'info');
                pIdx++; processNext();
             }
          };
          processNext();
      },
      onShadow: function(shadow, enemy, defChars, game, engine, next) {
          const targetPIdx = enemy._engagedWithPlayerIdx !== undefined ? enemy._engagedWithPlayerIdx : game.activeTabPlayerIdx;
          const goblinCount = game.engagedEnemies.filter(e => (e.trait||'').includes('Goblin') && (e._engagedWithPlayerIdx === undefined ? 0 : e._engagedWithPlayerIdx) === targetPIdx).length;
          enemy.attackBonus = (enemy.attackBonus || 0) + goblinCount;
          engine.toast('Shadow Effect', `${shadow.name}: Attacking enemy +${goblinCount} ⚔`, 'danger', 2800);
          engine.render();
          next();
      }
    },
    {
      id: "oath_eyes_in_the_dark", name: "Eyes in the Dark", type: "treachery", sphere: "encounter-treachery", portrait: "👁️",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Eyes-in-the-Dark.jpg',
      text: "Doomed 1.\nWhen Revealed: Each player must choose: either raise your threat by 1 for each questing character you control, or discard a questing character you control.",
      shadow: "Shadow: If this attack is undefended, discard an ally you control.", copies: 2,
      onReveal: function(card, game, engine, cb) {
           for(let p=0; p<game.numPlayers; p++) if(!game.eliminated[p]) game.threats[p]++;
           if (game.numPlayers === 1) game.threat++;
           engine.spawnBurstAtElement(document.getElementById('hud-threat'), '#c0392b', 15);
           engine.toast('Eyes in the Dark', 'Doomed 1.', 'danger');

           const overlay = document.createElement('div');
           overlay.id = 'doomed-threat-overlay-eyes';
           overlay.style.cssText = 'position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(200,0,0,0.45); pointer-events:none; transition: background 0.3s ease-out;';
           
           const bigText = document.createElement('div');
           bigText.style.cssText = "font-family:'Cinzel Decorative', serif; font-size:4.5rem; font-weight:900; color:#ff3030; text-shadow:0 0 35px #ff0000, 0 4px 15px #000; transform:scale(0.5); opacity:0; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);";
           bigText.textContent = `+1 Threat!`;
           overlay.appendChild(bigText);
           document.body.appendChild(overlay);
           
           if (engine.screenShake) engine.screenShake(18, 500);
           
           setTimeout(() => {
             bigText.style.transform = 'scale(1)';
             bigText.style.opacity = '1';
           }, 50);
           
           setTimeout(() => {
             overlay.style.background = 'rgba(200,0,0,0)';
             bigText.style.transform = 'scale(1.2) translateY(-100px)';
             bigText.style.opacity = '0';
             
             const diffEl = document.getElementById('hud-threat-diff');
             if (diffEl) {
               diffEl.textContent = `+1 Threat!`;
               diffEl.classList.remove('threat-diff-active');
               void diffEl.offsetWidth;
               diffEl.classList.add('threat-diff-active');
               
               setTimeout(() => {
                 diffEl.classList.remove('threat-diff-active');
                 diffEl.textContent = '';
               }, 3500);
             }
             
             for(let p=0; p<game.numPlayers; p++) {
                 if (game.threats && game.threats[p] >= 50) engine.eliminatePlayer(p);
             }
             
             setTimeout(() => {
               overlay.remove();
               
               let pIdx = 0;
               const processNext = () => {
                 while(pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
                 if(pIdx >= game.numPlayers) {
                    if(cb) cb();
                    return;
                 }
                 if (game.activeTabPlayerIdx !== pIdx) engine.window._switchTab(pIdx);
                 const questing = game.selectedHeroIds.map(uid => [...game.heroes, ...game.allies].find(c => c._uid === uid)).filter(c => c && (c._ownerIdx === undefined ? 0 : c._ownerIdx) === pIdx);

                 if(questing.length > 0) {
                    const promptHTML = `
                      <div style="font-size:1.6rem;line-height:1.5;color:var(--parchment);text-align:center;">
                        <span style="font-size:2.2rem;font-weight:bold;color:var(--gold-bright);display:block;margin-bottom:15px;">Eyes in the Dark</span>
                        Player ${pIdx+1}: Choose to either raise your threat by ${questing.length}, or discard a questing character you control:
                      </div>
                    `;
                    engine.showConfirmModal('Eyes in the Dark', promptHTML,
                      () => {
                         game.threats[pIdx] += questing.length;
                         if (game.numPlayers === 1) game.threat += questing.length;
                         engine.toast('Eyes in the Dark', `Player ${pIdx+1} threat raised by ${questing.length}.`, 'danger');
                         
                         const overlayRaise = document.createElement('div');
                         overlayRaise.id = 'eyes-dark-threat-overlay-raise';
                         overlayRaise.style.cssText = 'position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(200,0,0,0.45); pointer-events:none; transition: background 0.3s ease-out;';
                         
                         const bigTextRaise = document.createElement('div');
                         bigTextRaise.style.cssText = "font-family:'Cinzel Decorative', serif; font-size:4.5rem; font-weight:900; color:#ff3030; text-shadow:0 0 35px #ff0000, 0 4px 15px #000; transform:scale(0.5); opacity:0; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);";
                         bigTextRaise.textContent = `+${questing.length} Threat!`;
                         overlayRaise.appendChild(bigTextRaise);
                         document.body.appendChild(overlayRaise);
                         
                         if (engine.screenShake) engine.screenShake(18, 500);
                         
                         setTimeout(() => {
                           bigTextRaise.style.transform = 'scale(1)';
                           bigTextRaise.style.opacity = '1';
                         }, 50);
                         
                         setTimeout(() => {
                           overlayRaise.style.background = 'rgba(200,0,0,0)';
                           bigTextRaise.style.transform = 'scale(1.2) translateY(-100px)';
                           bigTextRaise.style.opacity = '0';
                           setTimeout(() => { overlayRaise.remove(); }, 400);
                           
                           const dEl = document.getElementById('hud-threat-diff');
                           if (dEl) {
                             dEl.textContent = `+${questing.length} Threat!`;
                             dEl.classList.remove('threat-diff-active');
                             void dEl.offsetWidth;
                             dEl.classList.add('threat-diff-active');
                             setTimeout(() => { dEl.classList.remove('threat-diff-active'); dEl.textContent = ''; }, 3500);
                           }
                           if (game.threats[pIdx] >= 50) engine.eliminatePlayer(pIdx);
                           pIdx++; processNext();
                         }, 1500);
                      },
                      () => {
                         engine.showHeroPicker('Eyes in the Dark', 'Choose a questing character to discard:', questing, (chosen) => {
                            if(chosen) {
                               try {
                                   if (chosen.isHero) {
                                      chosen.damage = chosen.hp || 99;
                                      engine.checkHeroDeath(chosen);
                                   } else {
                                      game.allies = game.allies.filter(a => a._uid !== chosen._uid);
                                      engine.discardCard(chosen, game.playerDiscards[pIdx] || game.playerDiscard, false);
                                      engine.window.onAllyLeftPlay(chosen.name, chosen._ownerIdx);
                                   }
                                   game.selectedHeroIds = game.selectedHeroIds.filter(uid => uid !== chosen._uid);
                                   engine.toast('Eyes in the Dark', `Discarded ${chosen.name}.`, 'danger');
                                   engine.window.updateQuestWillpowerDisplay();
                                   engine.render();
                               } catch(err) { console.error("Eyes in the Dark Discard Error:", err); }
                               
                               setTimeout(() => { pIdx++; processNext(); }, 600);
                            } else {
                               game.threats[pIdx] += questing.length;
                               if (game.numPlayers === 1) game.threat += questing.length;
                               engine.toast('Eyes in the Dark', `Player ${pIdx+1} threat raised by ${questing.length}.`, 'danger');
                               
                               const overlayRaise = document.createElement('div');
                               overlayRaise.style.cssText = 'position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(200,0,0,0.45); pointer-events:none; transition: background 0.3s ease-out;';
                               
                               const bigTextRaise = document.createElement('div');
                               bigTextRaise.style.cssText = "font-family:'Cinzel Decorative', serif; font-size:4.5rem; font-weight:900; color:#ff3030; text-shadow:0 0 35px #ff0000, 0 4px 15px #000; transform:scale(0.5); opacity:0; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);";
                               bigTextRaise.textContent = `+${questing.length} Threat!`;
                               overlayRaise.appendChild(bigTextRaise);
                               document.body.appendChild(overlayRaise);
                               
                               if (engine.screenShake) engine.screenShake(18, 500);
                               
                               setTimeout(() => {
                                 bigTextRaise.style.transform = 'scale(1)';
                                 bigTextRaise.style.opacity = '1';
                               }, 50);
                               
                               setTimeout(() => {
                                 overlayRaise.style.background = 'rgba(200,0,0,0)';
                                 bigTextRaise.style.transform = 'scale(1.2) translateY(-100px)';
                                 bigTextRaise.style.opacity = '0';
                                 setTimeout(() => { overlayRaise.remove(); }, 400);
                                 
                                 const dEl = document.getElementById('hud-threat-diff');
                                 if (dEl) {
                                   dEl.textContent = `+${questing.length} Threat!`;
                                   dEl.classList.remove('threat-diff-active');
                                   void dEl.offsetWidth;
                                   dEl.classList.add('threat-diff-active');
                                   setTimeout(() => { dEl.classList.remove('threat-diff-active'); dEl.textContent = ''; }, 3500);
                                 }
                                 if (game.threats[pIdx] >= 50) engine.eliminatePlayer(pIdx);
                                 pIdx++; processNext();
                               }, 1500);
                            }
                         }, true);
                      }, 'Discard Character', `Raise Threat by ${questing.length}`
                    );
                 } else {
                    pIdx++; processNext();
                 }
               };
               processNext();
             }, 400);
           }, 1500);
      },
      onShadow: function(shadow, enemy, defChars, game, engine, next) {
          if (defChars.length === 0) {
              const targetPIdx = enemy._engagedWithPlayerIdx !== undefined ? enemy._engagedWithPlayerIdx : game.activeTabPlayerIdx;
              const allies = game.allies.filter(a => (a._ownerIdx === undefined ? 0 : a._ownerIdx) === targetPIdx);
              if (allies.length > 0) {
                  if (game.activeTabPlayerIdx !== targetPIdx) engine.window._switchTab(targetPIdx);
                  engine.showHeroPicker('Shadow Effect: <br>Eyes in the Dark', '<span style="font-size: 1.6rem; font-weight: 600; color: var(--gold-bright);">Undefended attack! Discard an ally you control:</span>', allies, (chosen) => {
                      if(chosen) {
                         game.allies = game.allies.filter(a => a._uid !== chosen._uid);
                         engine.discardCard(chosen, game.playerDiscards[targetPIdx] || game.playerDiscard, false);
                         engine.window.onAllyLeftPlay(chosen.name, chosen._ownerIdx);
                         engine.toast('Eyes in the Dark', `Discarded ${chosen.name}.`, 'danger');
                         engine.render();
                      }
                      next();
                  }, true);
                  return;
              }
          }
          next();
      }
    }
  ]
};

window.LotrExpansions['the_oath'].encounterCards.push({
    id: 'oath_global_goblin_modifiers',
    getAttackMod: function(c, target, game) {
        if (c._goblinTroopAtkEvaluated) return 0;
        if ((c.trait || '').includes('Goblin') && c.id !== 'oath_goblin_troop' && c.id !== 'goblin_troop' && c.id !== 'nibin_goblin_troop') {
            const isEngaged = game && game.engagedEnemies && game.engagedEnemies.some(e => e._uid === c._uid);
            if (isEngaged) {
                const cardPIdx = c._engagedWithPlayerIdx !== undefined ? c._engagedWithPlayerIdx : 0;
                const hasTroop = game.engagedEnemies.some(e => 
                    (e.id === 'oath_goblin_troop' || e.id === 'goblin_troop' || e.id === 'nibin_goblin_troop') &&
                    (e._engagedWithPlayerIdx !== undefined ? e._engagedWithPlayerIdx : 0) === cardPIdx &&
                    e._uid !== c._uid
                );
                if (hasTroop) {
                    c._goblinTroopAtkEvaluated = true;
                    Promise.resolve().then(() => { c._goblinTroopAtkEvaluated = false; });
                    return 1;
                }
            }
        }
        return 0;
    },
    getDefenseMod: function(c, game) {
        if (c._goblinTroopDefEvaluated) return 0;
        if ((c.trait || '').includes('Goblin') && c.id !== 'oath_goblin_troop' && c.id !== 'goblin_troop' && c.id !== 'nibin_goblin_troop') {
            const isEngaged = game && game.engagedEnemies && game.engagedEnemies.some(e => e._uid === c._uid);
            if (isEngaged) {
                const cardPIdx = c._engagedWithPlayerIdx !== undefined ? c._engagedWithPlayerIdx : 0;
                const hasTroop = game.engagedEnemies.some(e => 
                    (e.id === 'oath_goblin_troop' || e.id === 'goblin_troop' || e.id === 'nibin_goblin_troop') &&
                    (e._engagedWithPlayerIdx !== undefined ? e._engagedWithPlayerIdx : 0) === cardPIdx &&
                    e._uid !== c._uid
                );
                if (hasTroop) {
                    c._goblinTroopDefEvaluated = true;
                    Promise.resolve().then(() => { c._goblinTroopDefEvaluated = false; });
                    return 1;
                }
            }
        }
        return 0;
    }
});

const patchGoblinModifiers = () => {
    const allCards = [
        ...(window.ENCOUNTER_DECK_TEMPLATE || []),
        ...Object.values(window.LotrExpansions || {}).flatMap(p => p.encounterCards || [])
    ];
    allCards.forEach(card => {
        if (card && card.id === 'global_nibin_modifiers' && !card._oathTroopPatched) {
            card._oathTroopPatched = true;
            if (card.getAttackMod) {
                const origAtk = card.getAttackMod;
                card.getAttackMod = function(c, target, game) {
                    if (c && c._goblinTroopAtkEvaluated) return 0;
                    const res = origAtk.apply(this, arguments);
                    if (res > 0 && c && (c.trait || '').includes('Goblin')) {
                        c._goblinTroopAtkEvaluated = true;
                        Promise.resolve().then(() => { c._goblinTroopAtkEvaluated = false; });
                    }
                    return res;
                };
            }
            if (card.getDefenseMod) {
                const origDef = card.getDefenseMod;
                card.getDefenseMod = function(c, game) {
                    if (c && c._goblinTroopDefEvaluated) return 0;
                    const res = origDef.apply(this, arguments);
                    if (res > 0 && c && (c.trait || '').includes('Goblin')) {
                        c._goblinTroopDefEvaluated = true;
                        Promise.resolve().then(() => { c._goblinTroopDefEvaluated = false; });
                    }
                    return res;
                };
            }
        }
    });
};
patchGoblinModifiers();
setTimeout(patchGoblinModifiers, 500);

window.LotrExpansions['the_oath'].encounterCards.push(
  {
      id: "oath_abandoned_camp", name: "Abandoned Camp", type: "location", sphere: "encounter-location", portrait: "🏕️",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Abandoned-Camp.jpg',
      threat: 2, questPts: 3, trait: "Forest",
      text: "Response: After the players travel to Abandoned Camp, the first player discards the top card of their deck. If that card is an ally, put it into play under their control.\n\nTravel: Discard the top card of the encounter deck. If that card is an enemy, add it to the staging area.",
      copies: 1,
      onTravel: function(loc, game, engine, proceedTravel) {
          const doTravelEff = () => {
              proceedTravel(() => {
                  const runPlayerEffect = () => {
                      const fpIdx = game.firstPlayerIdx;
                      const pDeck = game.playerDecks[fpIdx] || game.playerDeck;
                      if (pDeck.length > 0) {
                          if (game.activeTabPlayerIdx !== fpIdx) engine.window._switchTab(fpIdx);
                          
                          const promptText = game.numPlayers > 1 
                            ? `Response: Discard the top of Player ${fpIdx + 1}'s deck? <br>(If it's an ally, it is put into play)`
                            : `Response: Discard the top of your deck? <br>(If it's an ally, it is put into play)`;
                            
                          engine.showConfirmModal('Abandoned Camp', `<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">${promptText}</span>`, () => {
                              const topP = pDeck.pop();
                              const pDeckEl = document.getElementById('player-deck-pile');
                              const startRect = pDeckEl ? pDeckEl.getBoundingClientRect() : null;

                              if (topP.type === 'ally') {
                                  topP._ownerIdx = fpIdx;
                                  topP._entering = true;
                                  const finalizeAlly = () => {
                                      delete topP._entering;
                                      game.allies.push(topP);
                                      engine.toast('Abandoned Camp', `Response: Ally ${topP.name} put into play!`, 'success');
                                      if (engine.window.handleEntersPlay) engine.window.handleEntersPlay(topP);
                                      engine.render();
                                      setTimeout(() => engine.window.encounterPhase(), 400);
                                  };
                                  
                                  if (startRect && engine.window.animateAllyDeployment && engine.window.getLayoutLandingRect) {
                                      const destRect = engine.window.getLayoutLandingRect('player-content');
                                      engine.window.animateAllyDeployment(topP, startRect, destRect, finalizeAlly, 400);
                                  } else {
                                      finalizeAlly();
                                  }
                              } else {
                                  const finalizeDiscard = () => {
                                      engine.discardCard(topP, game.playerDiscards[fpIdx] || game.playerDiscard, true);
                                      engine.toast('Abandoned Camp', `Response: Discarded ${topP.name}.`, 'info');
                                      engine.render();
                                      setTimeout(() => engine.window.encounterPhase(), 400);
                                  };
                                  
                                  if (startRect && engine.window._animateCardToDiscard) {
                                      engine.window._animateCardToDiscard(topP, true, finalizeDiscard, startRect);
                                  } else {
                                      finalizeDiscard();
                                  }
                              }
                          }, () => {
                              engine.toast('Abandoned Camp', 'Declined to discard top card.', 'info');
                              setTimeout(() => engine.window.encounterPhase(), 400);
                          });
                      } else {
                          engine.toast('Abandoned Camp', 'Response: Player deck is empty.', 'info');
                          setTimeout(() => engine.window.encounterPhase(), 400);
                      }
                  };

                  const runEncounterEffect = () => {
                      if (game.encounterDeck.length > 0) {
                          const topEnc = game.encounterDeck.pop();
                          const eDeckEl = document.getElementById('encounter-deck-pile');
                          const eStartRect = eDeckEl ? eDeckEl.getBoundingClientRect() : null;

                          if (topEnc.type === 'enemy') {
                              const finalizeEnemy = () => {
                                  if (!game.stagingArea.some(c => c._uid === topEnc._uid)) game.stagingArea.push(topEnc);
                                  engine.toast('Abandoned Camp', `Travel: Added ${topEnc.name} to staging!`, 'danger');
                                  engine.render();
                                  setTimeout(runPlayerEffect, 200);
                              };
                              if (engine.animateDrawDirectToStaging) {
                                  engine.animateDrawDirectToStaging(topEnc, finalizeEnemy);
                              } else {
                                  finalizeEnemy();
                              }
                          } else {
                              const finalizeEDiscard = () => {
                                  engine.discardCard(topEnc, game.encounterDiscard, true);
                                  engine.toast('Abandoned Camp', `Travel: Discarded ${topEnc.name}.`, 'info');
                                  engine.render();
                                  setTimeout(runPlayerEffect, 200);
                              };
                              
                              if (eStartRect && engine.window._animateCardToDiscard) {
                                  engine.window._animateCardToDiscard(topEnc, false, finalizeEDiscard, eStartRect);
                              } else {
                                  finalizeEDiscard();
                              }
                          }
                      } else {
                          setTimeout(runPlayerEffect, 200);
                      }
                  };

                  setTimeout(runEncounterEffect, 200);
              });
          };
          
          if (game.encounterDeck.length === 0) {
              engine.window.checkEmptyEncounterDeck(doTravelEff);
          } else {
              doTravelEff();
          }
      }
  },
  {
      id: "oath_wild_wargs", name: "Wild Wargs", type: "enemy", sphere: "encounter-enemy", portrait: "🐺",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Wild-Wargs.jpg',
      engagement: 28, threat: 2, attack: 2, defense: 1, hp: 3, trait: "Creature · Warg",
      text: "Forced: After Wild Wargs engages you, discard the top card of the encounter deck. If that card is a Goblin enemy, put it into play engaged with you.",
      copies: 1
  },
  {
      id: "oath_obsidian_arrows", name: "Obsidian Arrows", type: "treachery", sphere: "encounter-treachery", portrait: "🏹",
      img: 'cards/dark_of_mirkwood/Obsidian_Arrows.jpg',
      text: "When Revealed: Deal 2 damage to a character controlled by the first player.",
      shadow: "Shadow: Deal 1 damage to a character you control.", copies: 2,
      onReveal: function(card, game, engine, cb) {
          if (engine.window._activeEncounterGhost) {
              engine.window._activeEncounterGhost.id = 'encounter-limbo-ghost';
              if (typeof engine.window._repositionGhostLeftOfModal === 'function') {
                  engine.window._repositionGhostLeftOfModal();
              }
          }
          const fpIdx = game.firstPlayerIdx;
          const fpChars = [...game.heroes, ...game.allies].filter(c => !c._prisoner && (c._ownerIdx === undefined ? 0 : c._ownerIdx) === fpIdx);
          if (fpChars.length > 0) {
              if (game.activeTabPlayerIdx !== fpIdx) engine.window._switchTab(fpIdx);
              engine.showHeroPicker('Obsidian Arrows', '<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Deal 2 damage to a character you control:</span>', fpChars, (chosen) => {
                  if (chosen) {
                      chosen.damage += 2;
                      engine.toast('Obsidian Arrows', `Dealt 2 damage to ${chosen.name}.`, 'danger');
                      engine.spawnBurstAtElement(document.querySelector(`[data-uid="${chosen._uid}"]`), '#c0392b', 20);
                      engine.checkHeroDeath(chosen);
                      engine.render();
                  }
                  if (cb) cb();
              }, true);
          } else {
              engine.toast('Obsidian Arrows', 'First player has no characters to damage.', 'info');
              if (cb) cb();
          }
      },
      onShadow: function(shadow, enemy, defChars, game, engine, next) {
          const targetPIdx = enemy._engagedWithPlayerIdx !== undefined ? enemy._engagedWithPlayerIdx : game.activeTabPlayerIdx;
          const myChars = [...game.heroes, ...game.allies].filter(c => !c._prisoner && (c._ownerIdx === undefined ? 0 : c._ownerIdx) === targetPIdx);
          if (myChars.length > 0) {
              if (game.activeTabPlayerIdx !== targetPIdx) engine.window._switchTab(targetPIdx);
              engine.showHeroPicker('Shadow Effect: Obsidian Arrows', '<span style="font-size:1.6rem; font-weight:600; color:var(--gold-bright); display:block; margin-bottom:12px; line-height:1.35; text-align:center;">Deal 1 damage to a character you control:</span>', myChars, (chosen) => {
                  if (chosen) {
                      chosen.damage += 1;
                      engine.toast('Obsidian Arrows', `Dealt 1 damage to ${chosen.name}.`, 'danger');
                      engine.spawnBurstAtElement(document.querySelector(`[data-uid="${chosen._uid}"]`), '#c0392b', 15);
                      engine.checkHeroDeath(chosen);
                      engine.render();
                  }
                  next();
              }, true);
          } else {
              next();
          }
      }
  }
);

const origAnimateCardToEngaged = window.animateCardToEngaged;
if (origAnimateCardToEngaged && !window._oathWargsPatched) {
    window._oathWargsPatched = true;
    window.animateCardToEngaged = function(card, cb) {
        const gameRef = window.LotrEngine ? window.LotrEngine.game : null;
        if (!gameRef) {
            origAnimateCardToEngaged(card, cb);
            return;
        }

        const runEffectChain = () => {
						const wasInStaging = gameRef.stagingArea.findIndex(c => c._uid === card._uid);
						if (wasInStaging >= 0) {
								gameRef.stagingArea.splice(wasInStaging, 1);
								gameRef.engagedEnemies.push(card);
								window.LotrEngine.render();
						}

						const nextChain = () => {
								if (wasInStaging >= 0) {
										const engIdx = gameRef.engagedEnemies.findIndex(c => c._uid === card._uid);
										if (engIdx >= 0) gameRef.engagedEnemies.splice(engIdx, 1);
										gameRef.stagingArea.splice(wasInStaging, 0, card);
								}
								cb();
						};

						if (card.id === 'oath_wild_wargs') {
                const doWargsEffect = () => {
                    if (gameRef.encounterDeck.length > 0) {
                        const topCard = gameRef.encounterDeck.pop();
                        
                        if (topCard.type === 'enemy' && (topCard.trait || '').includes('Goblin')) {
                            topCard._engagedWithPlayerIdx = card._engagedWithPlayerIdx;
                            
                            if (typeof window._animateDeckToZone === 'function') {
                                window._animateDeckToZone(topCard, 'engaged-content', () => {
                                    gameRef.engagedEnemies.push(topCard);
                                    window.LotrEngine.toast('Wild Wargs', `Forced: ${topCard.name} engaged you!`, 'danger');
                                    window.LotrEngine.render();
                                    nextChain();
                                }, 750);
                            } else {
                                gameRef.engagedEnemies.push(topCard);
                                window.LotrEngine.toast('Wild Wargs', `Forced: ${topCard.name} engaged you!`, 'danger');
                                window.LotrEngine.render();
                                nextChain();
                            }
                        } else {
                            const deckEl = document.getElementById('encounter-deck-pile');
                            const startRect = deckEl ? deckEl.getBoundingClientRect() : null;
                            
                            const doDiscard = () => {
                                window.LotrEngine.discardCard(topCard, gameRef.encounterDiscard, true);
                                window.LotrEngine.toast('Wild Wargs', `Forced: Discarded ${topCard.name}.`, 'info');
                                window.LotrEngine.render();
                                nextChain();
                            };

                            if (startRect && typeof window._animateCardToDiscard === 'function') {
                                window._animateCardToDiscard(topCard, false, doDiscard, startRect);
                            } else {
                                doDiscard();
                            }
                        }
                    } else {
                        nextChain();
                    }
                };
                if (gameRef.encounterDeck.length === 0) {
                    window.LotrEngine.checkEmptyEncounterDeck(doWargsEffect);
                } else {
                    doWargsEffect();
                }
                return;
            }
            
            if (card.id === 'oath_great_spider' || card.id === 'great_spider') {
                const targetPIdx = card._engagedWithPlayerIdx !== undefined ? card._engagedWithPlayerIdx : gameRef.activeTabPlayerIdx;
                const readyChars = [...gameRef.heroes, ...gameRef.allies].filter(char => !char.exhausted && !char._prisoner && (char._ownerIdx === undefined ? 0 : char._ownerIdx) === targetPIdx);
                if (readyChars.length > 0) {
                    if (gameRef.activeTabPlayerIdx !== targetPIdx) window.LotrEngine.window._switchTab(targetPIdx);
                    window.LotrEngine.showHeroPicker('Forced Engagement', `Forced: After ${card.name} engages you, exhaust a character you control:`, readyChars, (chosen) => {
                        if (chosen) {
                            const el = document.querySelector(`[data-uid="${chosen._uid}"]`);
                            if (el) {
                                el.classList.add('exhausted');
                                setTimeout(() => {
                                    chosen.exhausted = true;
                                    delete chosen._justExhaustedTime;
                                    window.LotrEngine.render();
                                    nextChain();
                                }, 350);
                            } else {
                                chosen.exhausted = true;
                                delete chosen._justExhaustedTime;
                                window.LotrEngine.render();
                                nextChain();
                            }
                            window.LotrEngine.toast(card.name, `Exhausted ${chosen.name}.`, 'danger');
                        } else {
                            nextChain();
                        }
                    }, true);
                    return;
                }
            }

            nextChain();
        };

        origAnimateCardToEngaged(card, runEffectChain);
    }
}

const origShuffle = window.shuffle;
if (origShuffle && !window._oathShufflePatched) {
    window._oathShufflePatched = true;
    window.shuffle = function(arr) {
        if (window.game && window.game.phase === 'setup' && arr.length > 0 && window.QUEST_STAGES[window.game.questStageIdx]?.trait === 'The Oath') {
            if (arr[0].sphere && arr[0].sphere.startsWith('encounter') && !arr.some(c => c.id === 'oath_abandoned_camp')) {
                const extraIds = ['oath_abandoned_camp', 'oath_wild_wargs', 'oath_obsidian_arrows'];
                extraIds.forEach(id => {
                    const tmpl = window.ENCOUNTER_DECK_TEMPLATE.find(c => c.id === id);
                    if (tmpl) {
                        for (let i=0; i<(tmpl.copies||1); i++) {
                            arr.push(window.makeCardInst(tmpl));
                        }
                    }
                });
            }
        }
        return origShuffle(arr);
    };
}

if (!window._oathModalObserverPatched) {
    window._oathModalObserverPatched = true;
    
    const patchObserver = () => {
        const modalEl = document.getElementById('modal-overlay');
        if (!modalEl) {
            setTimeout(patchObserver, 100);
            return;
        }
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class' && modalEl.classList.contains('show')) {
                    const content = document.getElementById('modal-content');
                    if (!content) return;
                    
                    const titleEl = content.querySelector('h2');
                    if (!titleEl) return;
                    
                    const title = titleEl.textContent || "";
                    const htmlContent = content.innerHTML;
                    
                    // Check if Eaves of Mirkwood is the active location on the board
                    const activeLocEl = document.querySelector('#active-location-content .card');
                    const eavesActive = activeLocEl && activeLocEl.innerHTML.includes('The Eaves of Mirkwood');
                    
                    // Check if the prompt is asking to cancel Goblins are Upon You!
                    const isGoblins = htmlContent.includes('Goblins are Upon You!') || htmlContent.includes('Goblins-Are-Upon-You');
                    
                    let shouldBlock = false;
                    
                    // Eaves blocks all Encounter Card cancellations
                    if (eavesActive && (title.includes("Eleanor") || title.includes("Test of Will") || title.includes("Hasty Stroke"))) {
                        shouldBlock = true;
                    }
                    
                    // Goblins blocks When Revealed cancellations (Eleanor/Test of Will) but allows Hasty Stroke
                    if (isGoblins && (title.includes("Eleanor") || title.includes("Test of Will"))) {
                        shouldBlock = true;
                    }
                    
                    if (shouldBlock) {
                        const noButton = document.getElementById('confirm-no-btn');
                        if (noButton && !noButton.dataset.autoClicked) {
                            noButton.dataset.autoClicked = "true";
                            
                            // Instantly lock out the modal so the player can't click Yes
                            content.style.pointerEvents = 'none';
                            content.style.opacity = '0.5';
                            
                            if (window.LotrEngine && window.LotrEngine.toast) {
                                window.LotrEngine.toast('Cannot Cancel', 'This encounter card effect cannot be canceled.', 'warning', 4000);
                            }
                            
                            // Auto-click "No" without playing click.mp3
                            setTimeout(() => {
                                if (window.SoundFX && window.SoundFX.playClick) {
                                    const origPlayClick = window.SoundFX.playClick;
                                    window.SoundFX.playClick = () => {};
                                    noButton.click();
                                    setTimeout(() => {
                                        window.SoundFX.playClick = origPlayClick;
                                    }, 50);
                                } else {
                                    noButton.click();
                                }
                                
                                setTimeout(() => { 
                                    delete noButton.dataset.autoClicked;
                                    content.style.pointerEvents = '';
                                    content.style.opacity = '1';
                                }, 100);
                            }, 50);
                        }
                    }

                    // Prevent Forest Snare from attaching to Goblin Troop
                    if (htmlContent.includes('attach Forest Snare to')) {
                        const pickerOptions = content.querySelectorAll('div[onclick^="window._pickerChoice"]');
                        let validTargets = 0;
                        
                        pickerOptions.forEach(opt => {
                            const match = opt.getAttribute('onclick').match(/window\._pickerChoice\('([^']+)'\)/);
                            if (match && match[1]) {
                                const uid = match[1];
                                const card = window._cardRegistry[uid];
                                if (!card || (card.id !== 'oath_goblin_troop' && card.id !== 'goblin_troop')) {
                                    validTargets++;
                                }
                            }
                        });

                        if (validTargets === 0) {
                            // Instantly close the modal before the frame paints
                            modalEl.classList.remove('show');
                            
                            if (window.LotrEngine && window.LotrEngine.toast) {
                                window.LotrEngine.toast('No Valid Target', 'No eligible engaged enemies to attach Forest Snare to.', 'danger');
                            }
                            
                            // Trigger the skip/cancel callback internally to clean up game state
                            if (typeof window._pickerChoice === 'function') {
                                window._pickerChoice(null);
                            }
                        } else {
                            // If there are other enemies to target, completely hide the Goblin Troop option
                            pickerOptions.forEach(opt => {
                                const match = opt.getAttribute('onclick').match(/window\._pickerChoice\('([^']+)'\)/);
                                if (match && match[1]) {
                                    const uid = match[1];
                                    const card = window._cardRegistry[uid];
                                    if (card && (card.id === 'oath_goblin_troop' || card.id === 'goblin_troop')) {
                                        opt.style.display = 'none';
                                    }
                                }
                            });
                        }
                    }
                }
            });
        });
        observer.observe(modalEl, { attributes: true, attributeFilter: ['class'] });
    };
    patchObserver();
}

if (!window._oathReturnToStagingFlickerPatched) {
    window._oathReturnToStagingFlickerPatched = true;
    window.animateReturnToStaging = function(card, callback) {
      const el = document.querySelector(`[data-uid="${card._uid}"]`);
      const stagingContent = document.getElementById('staging-content');
      if (!el || !stagingContent) {
        if (callback) callback();
        return;
      }
      
      const rect = el.getBoundingClientRect();
      let gameRef = null;
      if (window.LotrEngine && window.LotrEngine.game) gameRef = window.LotrEngine.game;
      else if (window.game) gameRef = window.game;
      
      const hasPlaceholder = gameRef && gameRef.stagingArea.length === 0;
      const originalHTML = stagingContent.innerHTML;
      if (hasPlaceholder) {
        stagingContent.innerHTML = '';
      }
      
      const stub = document.createElement('div');
      stub.className = 'card';
      stub.style.visibility = 'hidden';
      stub.style.margin = '0';
      stagingContent.appendChild(stub);
      const destRect = stub.getBoundingClientRect();
      stub.remove();
      
      if (hasPlaceholder) {
        stagingContent.innerHTML = originalHTML;
      }
      
      el.style.opacity = '0';
      
      const baseW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
      const baseH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
      const ghost = document.createElement('div');
      ghost.style.cssText = `
        position: fixed; z-index: 1000;
        width: ${baseW}px; height: ${baseH}px;
        left: ${rect.left}px; top: ${rect.top}px;
        transform: scale(${rect.width / baseW}, ${rect.height / baseH});
        transform-origin: top left;
        transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        pointer-events: none;
        box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      `;
      ghost.innerHTML = el.innerHTML;
      ghost.className = el.className;
      document.body.appendChild(ghost);
      
      void ghost.offsetWidth;
      
      ghost.style.left = `${destRect.left}px`;
      ghost.style.top = `${destRect.top}px`;
      ghost.style.transform = `scale(${destRect.width / baseW}, ${destRect.height / baseH})`;
      
      setTimeout(() => {
        // Mark attacked flag so ghost and new rendered card match state instantly upon arrival
        card._attackedThisRound = true;
        const innerCard = ghost.querySelector('.card') || ghost;
        if (innerCard) innerCard.classList.add('attacked-this-round');

        // Re-render DOM into staging area
        if (callback) callback();
        if (window.LotrEngine && window.LotrEngine.render) window.LotrEngine.render();
        
        if (card._wargsLikeReturnToStargs || card._wargsLikeReturnToStaging) {
            delete card._wargsLikeReturnToStaging;
            setTimeout(() => {
                const toasts = document.querySelectorAll('.toast .t-title');
                toasts.forEach(t => {
                    if (t.textContent === 'Wargs') t.textContent = card.name;
                });
            }, 10);
        }

        // Force synchronous paint update on the new DOM element, then remove ghost in next frame
        const newEl = document.querySelector(`#staging-content [data-uid="${card._uid}"]`);
        if (newEl) void newEl.offsetWidth;

        requestAnimationFrame(() => {
            ghost.remove();
        });
      }, 500);
    };
}

// Patch Great Spider reveal and defeat sound effects
if (!window._oathGreatSpiderAudioPatched) {
    window._oathGreatSpiderAudioPatched = true;

    const playGreatSpiderSnd = (file) => {
        const snd = new Audio(`./sound_effects/dark_of_mirkwood/${file}`);
        snd.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
        snd.play().catch(() => {});
    };

    const origReveal = window.revealEncounterCard;
    if (origReveal) {
        window.revealEncounterCard = function(cb) {
            const deck = window.game?.encounterDeck;
            if (deck && deck.length > 0) {
                window._currentRevealingCard = deck[deck.length - 1];
            }
            return origReveal.call(this, function() {
                window._currentRevealingCard = null;
                if (cb) cb.apply(this, arguments);
            });
        };
    }

    const origAnimateDiscard = window._animateCardToDiscard;
    if (origAnimateDiscard) {
        window._animateCardToDiscard = function(card, isPlayer, callback, startRect) {
            window._lastDiscardedCard = card;
            return origAnimateDiscard.apply(this, arguments);
        };
    }

    const origMakeCardInst = window.makeCardInst;
    if (origMakeCardInst) {
        window.makeCardInst = function(tmpl) {
            const inst = origMakeCardInst.apply(this, arguments);
            if (inst && (inst.id === 'oath_great_spider' || inst.id === 'great_spider')) {
                const origSetDmg = Object.getOwnPropertyDescriptor(inst, 'damage')?.set;
                if (origSetDmg) {
                    Object.defineProperty(inst, 'damage', {
                        get() { return this._damage || 0; },
                        set(val) {
                            if (val >= (this.hp || 3)) {
                                window._lastDefeatedSpider = this;
                            }
                            origSetDmg.call(this, val);
                        },
                        enumerable: true,
                        configurable: true
                    });
                }
            }
            return inst;
        };
    }

    const patchSoundFX = () => {
        if (!window.SoundFX) return;

        const origSpiderAppears = window.SoundFX.playSpiderAppears;
        window.SoundFX.playSpiderAppears = function() {
            const isGreatSpider = (window._currentRevealingCard && (window._currentRevealingCard.id === 'oath_great_spider' || window._currentRevealingCard.id === 'great_spider')) ||
                document.querySelector('#encounter-reveal-ghost [data-id="oath_great_spider"], #encounter-reveal-ghost [data-id="great_spider"]');
            
            if (isGreatSpider) {
                playGreatSpiderSnd('great_spider.mp3');
                return;
            }
            if (origSpiderAppears) origSpiderAppears.apply(this, arguments);
        };

        const origSpiderDies = window.SoundFX.playSpiderDies;
        window.SoundFX.playSpiderDies = function() {
            const isGreatSpider = (window._lastDefeatedSpider && (window._lastDefeatedSpider.id === 'oath_great_spider' || window._lastDefeatedSpider.id === 'great_spider')) ||
                (window._lastDiscardedCard && (window._lastDiscardedCard.id === 'oath_great_spider' || window._lastDiscardedCard.id === 'great_spider'));
            
            window._lastDefeatedSpider = null;
            window._lastDiscardedCard = null;

            if (isGreatSpider) {
                playGreatSpiderSnd('great_spider_dead.mp3');
                return;
            }
            if (origSpiderDies) origSpiderDies.apply(this, arguments);
        };
    };

    patchSoundFX();
    if (!window.SoundFX) setTimeout(patchSoundFX, 500);
}