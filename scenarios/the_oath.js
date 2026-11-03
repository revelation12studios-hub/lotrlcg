window.LotrExpansions = window.LotrExpansions || {};

function playTheEavesOfMirkwoodAudio() {
  try {
    const snd = new Audio('./sound_effects/dark_of_mirkwood/the_eaves_of_mirkwood.mp3');
    const volSlider = document.getElementById('volume-slider');
    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
    snd.play().catch(() => {
      const fallbackSnd = new Audio('./sound_effects/the_eaves_of_mirkwood.mp3');
      fallbackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
      fallbackSnd.play().catch(() => {});
    });
  } catch(e) {}
}
window.playTheEavesOfMirkwoodAudio = playTheEavesOfMirkwoodAudio;
window.playEavesOfMirkwoodAudio = playTheEavesOfMirkwoodAudio;

function playGoblintownScavengersThreatTokenAudio() {
  try {
    const snd = new Audio('./sound_effects/dark_of_mirkwood/goblintown_scavengers_threat_token.mp3');
    const volSlider = document.getElementById('volume-slider');
    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
    snd.play().catch(() => {
      const fallbackSnd = new Audio('./sound_effects/goblintown_scavengers_threat_token.mp3');
      fallbackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
      fallbackSnd.play().catch(() => {});
    });
  } catch(e) {}
}
window.playGoblintownScavengersThreatTokenAudio = playGoblintownScavengersThreatTokenAudio;
window.playScavengersThreatTokenAudio = playGoblintownScavengersThreatTokenAudio;

let _lastSpiderDenRevealTime = 0;
function playSpiderDenAudio() {
  const now = Date.now();
  if (now - _lastSpiderDenRevealTime < 1500) return;
  _lastSpiderDenRevealTime = now;
  try {
    const snd = new Audio('./sound_effects/dark_of_mirkwood/spider_den.mp3');
    const volSlider = document.getElementById('volume-slider');
    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
    snd.play().catch(() => {
      const fallbackSnd = new Audio('./sound_effects/spider_den.mp3');
      fallbackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
      fallbackSnd.play().catch(() => {});
    });
  } catch(e) {}
}
window.playSpiderDenAudio = playSpiderDenAudio;

let _lastGoblinSniperDeathTime = 0;
function playGoblinSniperDeathAudio() {
  const now = Date.now();
  if (now - _lastGoblinSniperDeathTime < 1000) return;
  _lastGoblinSniperDeathTime = now;
  try {
    const snd = new Audio('./sound_effects/dark_of_mirkwood/goblin_sniper_death.mp3');
    const volSlider = document.getElementById('volume-slider');
    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
    snd.play().catch(() => {
      const fallbackSnd = new Audio('./sound_effects/goblin_sniper_death.mp3');
      fallbackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
      fallbackSnd.play().catch(() => {});
    });
  } catch(e) {}
}
window.playGoblinSniperDeathAudio = playGoblinSniperDeathAudio;

let _lastSpidersOfMirkwoodAppearTime = 0;
function playSpidersOfMirkwoodAppearAudio() {
  const now = Date.now();
  if (now - _lastSpidersOfMirkwoodAppearTime < 1000) return;
  _lastSpidersOfMirkwoodAppearTime = now;
  try {
    const snd = new Audio('./sound_effects/dark_of_mirkwood/spiders_of_mirkwood.mp3');
    const volSlider = document.getElementById('volume-slider');
    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
    snd.play().catch(() => {
      const fallbackSnd = new Audio('./sound_effects/spiders_of_mirkwood.mp3');
      fallbackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
      fallbackSnd.play().catch(() => {});
    });
  } catch(e) {}
}
window.playSpidersOfMirkwoodAppearAudio = playSpidersOfMirkwoodAppearAudio;

let _lastSpidersOfMirkwoodDeathTime = 0;
function playSpidersOfMirkwoodDeathAudio() {
  const now = Date.now();
  if (now - _lastSpidersOfMirkwoodDeathTime < 1000) return;
  _lastSpidersOfMirkwoodDeathTime = now;
  try {
    const snd = new Audio('./sound_effects/dark_of_mirkwood/spiders_of_mirkwood_death.mp3');
    const volSlider = document.getElementById('volume-slider');
    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
    snd.play().catch(() => {
      const fallbackSnd = new Audio('./sound_effects/spiders_of_mirkwood_death.mp3');
      fallbackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
      fallbackSnd.play().catch(() => {});
    });
  } catch(e) {}
}
window.playSpidersOfMirkwoodDeathAudio = playSpidersOfMirkwoodDeathAudio;

let _lastSpidersOfMirkwoodAttackTime = 0;
function playSpidersOfMirkwoodAttackAudio(force = false) {
  const now = Date.now();
  if (!force && now - _lastSpidersOfMirkwoodAttackTime < 800) return;
  _lastSpidersOfMirkwoodAttackTime = now;
  try {
    const volSlider = document.getElementById('volume-slider');
    const vol = volSlider ? parseFloat(volSlider.value) : 0.25;
    const snd = new Audio('./sound_effects/dark_of_mirkwood/spiders_of_mirkwood_attack.mp3');
    snd.volume = vol;
    snd.play().catch(() => {
      try {
        const fallbackSnd = new Audio('./sound_effects/spiders_of_mirkwood_attack.mp3');
        fallbackSnd.volume = vol;
        fallbackSnd.play().catch(() => {});
      } catch(e) {}
    });
  } catch(e) {}
}
window.playSpidersOfMirkwoodAttackAudio = playSpidersOfMirkwoodAttackAudio;

let _lastGreatSpiderAttackAudioTime = 0;
function playGreatSpiderAttackAudio(force = false) {
  const now = Date.now();
  if (!force && now - _lastGreatSpiderAttackAudioTime < 800) return;
  _lastGreatSpiderAttackAudioTime = now;
  try {
    const volSlider = document.getElementById('volume-slider');
    const vol = volSlider ? parseFloat(volSlider.value) : 0.25;
    const snd = new Audio('./sound_effects/dark_of_mirkwood/great_spider_attack.mp3');
    snd.volume = vol;
    snd.play().catch(() => {
      try {
        const fallbackSnd = new Audio('./sound_effects/great_spider_attack.mp3');
        fallbackSnd.volume = vol;
        fallbackSnd.play().catch(() => {});
      } catch(e) {}
    });
  } catch(e) {}
}
window.playGreatSpiderAttackAudio = playGreatSpiderAttackAudio;

let _lastGreatSpiderAudioTime = 0;
function playGreatSpiderAudio(force = false) {
  const now = Date.now();
  if (!force && now - _lastGreatSpiderAudioTime < 500) return;
  _lastGreatSpiderAudioTime = now;
  try {
    const volSlider = document.getElementById('volume-slider');
    const vol = volSlider ? parseFloat(volSlider.value) : 0.25;
    const snd = new Audio('./sound_effects/dark_of_mirkwood/great_spider.mp3');
    snd.volume = vol;
    snd.play().catch(() => {
      try {
        const fallbackSnd = new Audio('./sound_effects/great_spider.mp3');
        fallbackSnd.volume = vol;
        fallbackSnd.play().catch(() => {});
      } catch(e) {}
    });
  } catch(e) {}
}
window.playGreatSpiderAudio = playGreatSpiderAudio;

let _lastTangledGroveAudioTime = 0;
function playTangledGroveAudio(force = false) {
  const now = Date.now();
  if (!force && now - _lastTangledGroveAudioTime < 800) return;
  _lastTangledGroveAudioTime = now;
  try {
    const volSlider = document.getElementById('volume-slider');
    const vol = volSlider ? parseFloat(volSlider.value) : 0.25;
    const snd = new Audio('./sound_effects/dark_of_mirkwood/tangled_grove.mp3');
    snd.volume = vol;
    snd.play().catch(() => {
      try {
        const fallbackSnd = new Audio('./sound_effects/tangled_grove.mp3');
        fallbackSnd.volume = vol;
        fallbackSnd.play().catch(() => {});
      } catch(e) {}
    });
  } catch(e) {}
}
window.playTangledGroveAudio = playTangledGroveAudio;

let _lastForestSpiderPowerUpAudioTime = 0;
function playForestSpiderPowerUpAudio() {
  const now = Date.now();
  if (now - _lastForestSpiderPowerUpAudioTime < 800) return;
  _lastForestSpiderPowerUpAudioTime = now;
  try {
    const volSlider = document.getElementById('volume-slider');
    const vol = volSlider ? parseFloat(volSlider.value) : 0.25;
    const s1 = new Audio('./sound_effects/dark_of_mirkwood/forest_spider_powerup.mp3');
    s1.volume = vol;
    s1.play().catch(() => {
      try {
        const s2 = new Audio('./sound_effects/forest_spider_powerup.mp3');
        s2.volume = vol;
        s2.play().catch(() => {});
      } catch(e) {}
    });
  } catch(e) {}
}
window.playForestSpiderPowerUpAudio = playForestSpiderPowerUpAudio;

let _lastForestSpiderAttackDownAudioTime = 0;
function playForestSpiderAttackDownAudio() {
  const now = Date.now();
  if (now - _lastForestSpiderAttackDownAudioTime < 800) return;
  _lastForestSpiderAttackDownAudioTime = now;
  try {
    const volSlider = document.getElementById('volume-slider');
    const vol = volSlider ? parseFloat(volSlider.value) : 0.25;
    const s1 = new Audio('./sound_effects/dark_of_mirkwood/forest_spider_attack_down.mp3');
    s1.volume = vol;
    s1.play().catch(() => {
      try {
        const s2 = new Audio('./sound_effects/forest_spider_attack_down.mp3');
        s2.volume = vol;
        s2.play().catch(() => {});
      } catch(e) {}
    });
  } catch(e) {}
}
window.playForestSpiderAttackDownAudio = playForestSpiderAttackDownAudio;

let _lastGoblinTroopAudioTime = 0;
function playGoblinTroopAudio() {
  const now = Date.now();
  if (now - _lastGoblinTroopAudioTime < 1000) return;
  _lastGoblinTroopAudioTime = now;
  try {
    const snd = new Audio('./sound_effects/dark_of_mirkwood/goblin_troop.mp3');
    const volSlider = document.getElementById('volume-slider');
    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
    snd.play().catch(() => {
      const fallbackSnd = new Audio('./sound_effects/goblin_troop.mp3');
      fallbackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
      fallbackSnd.play().catch(() => {});
    });
  } catch(e) {}
}
window.playGoblinTroopAudio = playGoblinTroopAudio;

let _lastGoblinTroopDefeatedAudioTime = 0;
function playGoblinTroopDefeatedAudio() {
  const now = Date.now();
  if (now - _lastGoblinTroopDefeatedAudioTime < 1000) return;
  _lastGoblinTroopDefeatedAudioTime = now;
  try {
    const snd = new Audio('./sound_effects/dark_of_mirkwood/goblin_troop_defeated.mp3');
    const volSlider = document.getElementById('volume-slider');
    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
    snd.play().catch(() => {
      const fallbackSnd = new Audio('./sound_effects/goblin_troop_defeated.mp3');
      fallbackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
      fallbackSnd.play().catch(() => {});
    });
  } catch(e) {}
}
window.playGoblinTroopDefeatedAudio = playGoblinTroopDefeatedAudio;

let _lastGoblinsAreUponYouAudioTime = 0;
function playGoblinsAreUponYouAudio() {
  const now = Date.now();
  if (now - _lastGoblinsAreUponYouAudioTime < 1500) return;
  _lastGoblinsAreUponYouAudioTime = now;
  try {
    const snd = new Audio('./sound_effects/dark_of_mirkwood/goblins_are_upon_you.mp3');
    const volSlider = document.getElementById('volume-slider');
    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
    snd.play().catch(() => {
      const fallbackSnd = new Audio('./sound_effects/goblins_are_upon_you.mp3');
      fallbackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
      fallbackSnd.play().catch(() => {});
    });
  } catch(e) {}
}
window.playGoblinsAreUponYouAudio = playGoblinsAreUponYouAudio;

let _lastGoblinsAreUponYouPickedAudioTime = 0;
function playGoblinsAreUponYouPickedAudio() {
  const now = Date.now();
  if (now - _lastGoblinsAreUponYouPickedAudioTime < 800) return;
  _lastGoblinsAreUponYouPickedAudioTime = now;
  try {
    const snd = new Audio('./sound_effects/dark_of_mirkwood/goblins_are_upon_you_picked.mp3');
    const volSlider = document.getElementById('volume-slider');
    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
    snd.play().catch(() => {
      const fallbackSnd = new Audio('./sound_effects/goblins_are_upon_you_picked.mp3');
      fallbackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
      fallbackSnd.play().catch(() => {});
    });
  } catch(e) {}
}
window.playGoblinsAreUponYouPickedAudio = playGoblinsAreUponYouPickedAudio;

let _lastEyesInTheDarkAudioTime = 0;
function playEyesInTheDarkAudio() {
  const now = Date.now();
  if (now - _lastEyesInTheDarkAudioTime < 1500) return;
  _lastEyesInTheDarkAudioTime = now;
  try {
    const snd = new Audio('./sound_effects/dark_of_mirkwood/eyes_in_the_dark.mp3');
    const volSlider = document.getElementById('volume-slider');
    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
        snd.play().catch(() => {
            const fallbackSnd = new Audio('./sound_effects/eyes_in_the_dark.mp3');
            fallbackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
            fallbackSnd.play().catch(() => {});
        });
    } catch(e) {}
}
window.playEyesInTheDarkAudio = playEyesInTheDarkAudio;

window.triggerEyesInTheDarkSpiderBite = function(targetEl, onComplete) {
    const r = targetEl.getBoundingClientRect();
    const bite = document.createElement('div');
    bite.style.cssText = `
        position: fixed; left: ${r.left + r.width/2 - 110}px; top: ${r.top + r.height/2 - 110}px;
        width: 220px; height: 235px; z-index: 100005; pointer-events: none;
        perspective: 1000px;
    `;

    // Thicker top bulb and needle-fine stiletto bottom matching the Yin-Yang contour
    const yingYangFangPath = "M 78,8 C 38,8 4,38 2,82 C 0,128 20,174 68,198 C 54,186 46,166 46,138 C 46,104 74,74 96,44 C 104,32 100,10 78,8 Z";
    const yingYangHighlight = "M 72,16 C 38,44 18,98 66,194";

    // Randomly select 2 to 4 fangs to drip venom each time the bite triggers
    const drippingIndices = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 3));

    const buildYingYangFang = (idClass, styleStr, fangIdx) => {
        const hasDrip = drippingIndices.includes(fangIdx);
        const dripDelay = (Math.random() * 0.45).toFixed(2);
        const dripDuration = (0.75 + Math.random() * 0.35).toFixed(2);
        const dripJitter = (68 + (Math.random() * 4 - 2)).toFixed(1);
        const dripHTML = hasDrip ? `
            <div class="creepy-venom-drip" style="left:${dripJitter}%; animation-delay:${dripDelay}s; animation-duration:${dripDuration}s;"></div>
            <div class="creepy-venom-bead" style="left:${dripJitter}%; animation-delay:${dripDelay}s; animation-duration:${dripDuration}s;"></div>
        ` : '';

        return `
            <div class="creepy-fang-container ${idClass}" style="${styleStr}">
                <svg viewBox="0 0 102 208" style="width:100%; height:100%; overflow:visible; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.95));">
                    <defs>
                        <linearGradient id="yyFangBody_${idClass}" x1="0%" y1="0%" x2="55%" y2="100%">
                            <stop offset="0%" stop-color="#000000"/>
                            <stop offset="20%" stop-color="#18181b"/>
                            <stop offset="40%" stop-color="#71717a"/>
                            <stop offset="65%" stop-color="#f4f4f5"/>
                            <stop offset="85%" stop-color="#991b1b"/>
                            <stop offset="100%" stop-color="#ef4444"/>
                        </linearGradient>
                        <radialGradient id="yyFangGloss_${idClass}" cx="60%" cy="26%" r="42%">
                            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                            <stop offset="50%" stop-color="#e2e8f0" stop-opacity="0.6"/>
                            <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <!-- Exact Yin-Yang Paisley Curved Body with Thicker Top Bulb and Thinner Needle Tip -->
                    <path d="${yingYangFangPath}" fill="url(#yyFangBody_${idClass})" stroke="#18181b" stroke-width="2.5" stroke-linejoin="round"/>
                    <!-- Specular Curved Spine Highlight -->
                    <path d="${yingYangHighlight}" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2.8" stroke-linecap="round"/>
                    <!-- Plumper Top Bulb Oval Gloss -->
                    <ellipse cx="60" cy="40" rx="24" ry="18" fill="url(#yyFangGloss_${idClass})" transform="rotate(-18 60 40)"/>
                    <!-- Needle Point Glistening Apex -->
                    <circle cx="68" cy="198" r="1.6" fill="#ffffff" filter="drop-shadow(0 0 3px #ffffff)"/>
                </svg>
                ${dripHTML}
            </div>
        `;
    };

    bite.innerHTML = `
        <style>
            @keyframes creepyEyeGleam {
                0%, 100% { filter: drop-shadow(0 0 4px #ff0000) drop-shadow(0 0 10px #ef4444); transform: scale(1) rotate(var(--erot, 0deg)); }
                50% { filter: drop-shadow(0 0 8px #ff2222) drop-shadow(0 0 16px #ff0000); transform: scale(1.15) rotate(var(--erot, 0deg)); }
            }
            @keyframes venomThreadStretch {
                0% { height: 4px; opacity: 0.3; transform: scaleY(0.2); }
                35% { height: 26px; opacity: 0.95; transform: scaleY(1); }
                70% { height: 38px; opacity: 0.85; transform: translateY(6px) scaleY(1.2); }
                100% { height: 46px; opacity: 0; transform: translateY(20px) scaleY(1.4); }
            }
            @keyframes venomDropFall {
                0% { transform: translateY(0) scale(0.35); opacity: 0; }
                25% { transform: translateY(4px) scale(1); opacity: 0.95; }
                65% { transform: translateY(26px) scale(0.9); opacity: 0.9; }
                100% { transform: translateY(48px) scale(0.45); opacity: 0; }
            }
            .creepy-spider-eye {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle at 35% 30%, #ffffff 0%, #ff6b6b 22%, #ef4444 55%, #7f1d1d 85%, #1f0505 100%);
                box-shadow: inset 0 0 2px #000, 0 0 6px rgba(239, 68, 68, 0.9);
                border: 0.8px solid #2a0808;
                animation: creepyEyeGleam 1.1s ease-in-out infinite alternate;
            }
            .creepy-fang-container {
                position: absolute;
                transform-origin: 75% 10%;
                transition: transform 0.16s cubic-bezier(0.2, 0.85, 0.3, 1.25);
            }
            .creepy-venom-drip {
                position: absolute;
                bottom: -28px;
                width: 1px;
                transform: translateX(-50%);
                background: linear-gradient(to bottom, #ef4444 0%, #a3e635 45%, #84cc16 75%, transparent 100%);
                animation: venomThreadStretch 0.85s ease-in infinite;
                pointer-events: none;
            }
            .creepy-venom-bead {
                position: absolute;
                bottom: -32px;
                width: 3.5px;
                height: 4.5px;
                margin-left: -1.75px;
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                background: radial-gradient(circle at 35% 35%, #fef08a 0%, #a3e635 45%, #65a30d 100%);
                box-shadow: 0 0 6px #84cc16, 0 0 10px rgba(163, 230, 53, 0.7);
                animation: venomDropFall 0.85s cubic-bezier(0.4, 0, 0.8, 1) infinite;
                pointer-events: none;
            }
        </style>
        <div class="spider-3d-cluster" style="width:100%; height:100%; position:relative; transform-style:preserve-3d; transform: translateZ(-130px) rotateX(-12deg) scale(0.65); opacity:0; transition: transform 0.32s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 0.25s ease-in;">
            
            <!-- Bluish-white glowing carapace dome seen in capture.PNG -->
            <div style="position:absolute; left:65px; top:16px; width:90px; height:36px; border-radius:50%; background:radial-gradient(ellipse at 50% 40%, rgba(240, 249, 255, 0.9) 0%, rgba(56, 189, 248, 0.5) 45%, rgba(14, 165, 233, 0.15) 75%, transparent 100%); filter:blur(4px); pointer-events:none;"></div>

            <!-- Tightly Clustered, Smaller, Angled 8 Creepy Red Eyes -->
            <!-- Posterior Top Row (4 eyes) -->
            <div class="creepy-spider-eye" style="left:76px; top:46px; width:7px; height:8px; --erot:-22deg; animation-delay:0.12s;"></div>
            <div class="creepy-spider-eye" style="left:92px; top:40px; width:8px; height:9px; --erot:-10deg; animation-delay:0.28s;"></div>
            <div class="creepy-spider-eye" style="right:92px; top:40px; width:8px; height:9px; --erot:10deg; animation-delay:0.24s;"></div>
            <div class="creepy-spider-eye" style="right:76px; top:46px; width:7px; height:8px; --erot:22deg; animation-delay:0.16s;"></div>

            <!-- Anterior Lower Row (4 eyes) -->
            <div class="creepy-spider-eye" style="left:82px; top:61px; width:9px; height:10px; --erot:-30deg; animation-delay:0.35s;"></div>
            <div class="creepy-spider-eye" style="left:98px; top:56px; width:13px; height:14px; --erot:-8deg; box-shadow:inset 0 0 2px #000, 0 0 10px #ff0000, 0 0 20px #ef4444; animation-delay:0s;"></div>
            <div class="creepy-spider-eye" style="right:98px; top:56px; width:13px; height:14px; --erot:8deg; box-shadow:inset 0 0 2px #000, 0 0 10px #ff0000, 0 0 20px #ef4444; animation-delay:0.04s;"></div>
            <div class="creepy-spider-eye" style="right:82px; top:61px; width:9px; height:10px; --erot:30deg; animation-delay:0.32s;"></div>

            <!-- 6 Paisley Yin-Yang Fangs matching capture.png (Left angled inward, Right mirrored) -->
            <!-- Left 3 Fangs (angled like capture.png, thicker top bulb and needle tip) -->
            ${buildYingYangFang('fang-1', 'left:58px; top:88px; width:27px; height:53px; transform: rotateZ(-16deg);', 0)}
            ${buildYingYangFang('fang-2', 'left:75px; top:91px; width:29px; height:58px; transform: rotateZ(-10deg);', 1)}
            ${buildYingYangFang('fang-3', 'left:93px; top:94px; width:31px; height:63px; transform: rotateZ(-4deg);', 2)}

            <!-- Right 3 Fangs (mirrored facing opposite direction) -->
            ${buildYingYangFang('fang-4', 'right:93px; top:94px; width:31px; height:63px; transform: scaleX(-1) rotateZ(-4deg);', 3)}
            ${buildYingYangFang('fang-5', 'right:75px; top:91px; width:29px; height:58px; transform: scaleX(-1) rotateZ(-10deg);', 4)}
            ${buildYingYangFang('fang-6', 'right:58px; top:88px; width:27px; height:53px; transform: scaleX(-1) rotateZ(-16deg);', 5)}

        </div>
    `;
    document.body.appendChild(bite);

    try {
        const snd = new Audio('./sound_effects/dark_of_mirkwood/great_spider_attack.mp3');
        snd.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
        snd.play().catch(()=>{});
    } catch(e){}

    const cluster = bite.querySelector('.spider-3d-cluster');
    const f1 = bite.querySelector('.fang-1');
    const f2 = bite.querySelector('.fang-2');
    const f3 = bite.querySelector('.fang-3');
    const f4 = bite.querySelector('.fang-4');
    const f5 = bite.querySelector('.fang-5');
    const f6 = bite.querySelector('.fang-6');

    requestAnimationFrame(() => {
        cluster.style.opacity = '1';
        cluster.style.transform = 'translateZ(80px) rotateX(0deg) scale(1.15)';
    });

    setTimeout(() => {
        // Clamp inward: left fangs angle inward rightward, right fangs angle inward leftward
        f1.style.transform = 'translate(4px, 8px) rotateZ(-32deg)';
        f2.style.transform = 'translate(4px, 9px) rotateZ(-22deg)';
        f3.style.transform = 'translate(5px, 10px) rotateZ(-14deg)';
        f4.style.transform = 'translate(-5px, 10px) scaleX(-1) rotateZ(-14deg)';
        f5.style.transform = 'translate(-4px, 9px) scaleX(-1) rotateZ(-22deg)';
        f6.style.transform = 'translate(-4px, 8px) scaleX(-1) rotateZ(-32deg)';
        cluster.style.transform = 'translateZ(105px) rotateX(4deg) translateY(6px) scale(1.18)';

        if (window.LotrEngine && window.LotrEngine.screenShake) window.LotrEngine.screenShake(14, 320);
        if (window.LotrEngine && window.LotrEngine.spawnBurstAtElement) window.LotrEngine.spawnBurstAtElement(targetEl, '#dc2626', 30);

        try {
            const crunch = new Audio('./sound_effects/spider_attack.mp3');
            crunch.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
            crunch.play().catch(()=>{});
        } catch(e){}

        setTimeout(() => {
            cluster.style.opacity = '0';
            cluster.style.transform = 'translateZ(-50px) translateY(-15px) scale(0.85)';
            setTimeout(() => {
                bite.remove();
                if (onComplete) onComplete();
            }, 240);
        }, 340);
    }, 300);
};

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
         // Prevent re-running setup when loading a saved game
         if (game.outOfPlay.some(c => c.id === 'oath_goblin_troop' || c.id === 'goblin_troop') || 
             game.stagingArea.some(c => c.id === 'oath_goblin_troop' || c.id === 'goblin_troop') || 
             game.engagedEnemies.some(c => c.id === 'oath_goblin_troop' || c.id === 'goblin_troop') ||
             game.encounterDiscard.some(c => c.id === 'oath_goblin_troop' || c.id === 'goblin_troop') ||
             game.victoryDisplay.some(c => c.id === 'oath_goblin_troop' || c.id === 'goblin_troop')) {
             return;
         }

         let eaves = null, troop = null;
         const eavesIdx = game.encounterDeck.findIndex(c => c.id === 'oath_the_eaves_of_mirkwood');
         if(eavesIdx >= 0) eaves = game.encounterDeck.splice(eavesIdx, 1)[0];
         
         const troopIdx = game.encounterDeck.findIndex(c => c.id === 'oath_goblin_troop');
         if(troopIdx >= 0) troop = game.encounterDeck.splice(troopIdx, 1)[0];

         setTimeout(() => {
            if(eaves) {
               playTheEavesOfMirkwoodAudio();
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

                                     const uiScale = engine.window._resolutionScale || 1;
                                     const baseW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                                     const baseH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                                     const stepX = baseW + 10;
                                     
                                     const occupiedSlots = new Set();
                                     game.stagingArea.forEach(c => {
                                         if (engine.window.cardPositions && engine.window.cardPositions[c._uid]) {
                                             const slot = Math.round((engine.window.cardPositions[c._uid].x - 10) / stepX);
                                             occupiedSlots.add(slot);
                                         }
                                     });
                                     
                                     let nextSlot = 0;
                                     while (occupiedSlots.has(nextSlot)) {
                                         nextSlot++;
                                     }
                                     
                                     const targetLocalX = 10 + nextSlot * stepX;
                                     const targetLocalY = 19;
                                     
                                     if (!engine.window.cardPositions) engine.window.cardPositions = {};
                                     engine.window.cardPositions[locCard._uid] = { x: targetLocalX, y: targetLocalY };
                                     
                                     const stagingRect = stagingContent.getBoundingClientRect();
                                     const scrollL = stagingContent.scrollLeft || 0;
                                     const scrollT = stagingContent.scrollTop || 0;
                                     
                                     const destLeft = stagingRect.left + (targetLocalX - scrollL) * uiScale;
                                     const destTop = stagingRect.top + (targetLocalY - scrollT) * uiScale;
                                     
                                     const startScale = sRect.width / baseW;
                                     const targetScale = uiScale;

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
                                         width: ${baseW}px; height: ${baseH}px;
                                         pointer-events: none; transition: none;
                                         transform-origin: top left;
                                         transform: scale(${startScale});
                                         box-shadow: 0 10px 30px rgba(0,0,0,0.8);
                                         border-radius: 6px;
                                     `;
                                     ghost.innerHTML = `<div class="card ${locCard.sphere || 'encounter-location'}" style="width:100%; height:100%; margin:0; border-radius:6px; border:2px solid var(--gold-deep); box-shadow:0 4px 10px rgba(0,0,0,0.6); background:linear-gradient(180deg, #1a3a1a 0%, #0a1a0a 100%); overflow:hidden;"><img src="${ringsDbImg || fallback}" onerror="this.src='${fallback}'" style="width:100%;height:100%;object-fit:cover;display:block;"></div>`;
                                     document.body.appendChild(ghost);

                                     try {
                                         const snd = new Audio('./sound_effects/enemy_move.mp3');
                                         const vol = document.getElementById('volume-slider');
                                         snd.volume = vol ? parseFloat(vol.value) : 0.25;
                                         snd.play().catch(()=>{});
                                     } catch(e) {}

                                     void ghost.offsetWidth;

                                     requestAnimationFrame(() => {
                                         ghost.style.transition = 'left 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                         ghost.style.left = `${destLeft}px`;
                                         ghost.style.top = `${destTop}px`;
                                         ghost.style.transform = `scale(${targetScale})`;
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

                 try {
                     const snd = new Audio('./sound_effects/enemy_move.mp3');
                     const vol = document.getElementById('volume-slider');
                     snd.volume = vol ? parseFloat(vol.value) : 0.25;
                     snd.play().catch(()=>{});
                 } catch(e) {}

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
            const stagingContent = document.getElementById('staging-content');
            const cardPositions = engine.window.cardPositions || window.cardPositions || {};
            const uiScale = engine.window._resolutionScale || window._resolutionScale || 1;
            const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
            const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
            const stepX = cardW + 10;

            // Find next available empty slot in the Staging Area
            const occupiedSlots = new Set();
            game.stagingArea.forEach(c => {
               if (cardPositions && cardPositions[c._uid]) {
                  const slot = Math.round((cardPositions[c._uid].x - 10) / stepX);
                  occupiedSlots.add(slot);
               }
            });

            let nextSlot = 0;
            while (occupiedSlots.has(nextSlot)) {
               nextSlot++;
            }

            const targetLocalX = 10 + nextSlot * stepX;
            const targetLocalY = 19;

            // Pre-register exact slot in cardPositions so rendering immediately places card in this empty spot
            if (!engine.window.cardPositions) engine.window.cardPositions = {};
            engine.window.cardPositions[troop._uid] = { x: targetLocalX, y: targetLocalY };
            if (window.cardPositions) window.cardPositions[troop._uid] = { x: targetLocalX, y: targetLocalY };

            // Smoothly collapse the Out of Play area
            const oopZone = document.getElementById('out-of-play-zone');
            const oopContent = document.getElementById('out-of-play-content');
            if (oopZone) {
               oopZone.style.transition = 'flex 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), width 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), padding 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), margin 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)';
               oopZone.style.overflow = 'hidden';
               oopZone.style.flex = '0 0 0px';
               oopZone.style.width = '0px';
               oopZone.style.opacity = '0';
               oopZone.style.padding = '0';
               oopZone.style.margin = '0';
               oopZone.style.borderColor = 'transparent';
               oopZone.style.pointerEvents = 'none';
            }
            if (oopContent) {
               oopContent.innerHTML = '';
            }

            game.outOfPlay.splice(troopIdx, 1);
            playGoblinTroopAudio();

            const finalizeTroop = () => {
               game.stagingArea.push(troop);
               engine.toast('The Rearguard', 'Goblin Troop added to the staging area.', 'danger');
               engine.render();
               if (oopZone) {
                  oopZone.style.border = 'none';
               }
            };

            if (startRect && stagingContent) {
               const startScale = startRect.width / cardW;
               const targetScale = uiScale;

               const ghost = document.createElement('div');
               ghost.style.cssText = `
                  position: fixed; z-index: 100000;
                  left: ${startRect.left}px; top: ${startRect.top}px;
                  width: ${cardW}px; height: ${cardH}px;
                  pointer-events: none;
                  transform-origin: top left;
                  transform: scale(${startScale});
                  box-shadow: 0 12px 32px rgba(0,0,0,0.85);
                  border-radius: 6px;
               `;
               const cardHtml = (typeof window.cardHTML === 'function') ? window.cardHTML(troop) : (troopEl ? troopEl.innerHTML : '');
               ghost.innerHTML = cardHtml;
               if (ghost.firstElementChild) {
                  ghost.firstElementChild.style.margin = '0';
                  ghost.firstElementChild.style.width = '100%';
                  ghost.firstElementChild.style.height = '100%';
               }
               document.body.appendChild(ghost);

               try {
                  const snd = new Audio('./sound_effects/enemy_move.mp3');
                  const vol = document.getElementById('volume-slider');
                  snd.volume = vol ? parseFloat(vol.value) : 0.25;
                  snd.play().catch(()=>{});
               } catch(e) {}

               const duration = 700;
               const animStartTime = performance.now();

               const animateStep = (currentTime) => {
                  const elapsed = currentTime - animStartTime;
                  const progress = Math.min(elapsed / duration, 1);
                  const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out

                  const curStagingRect = stagingContent.getBoundingClientRect();
                  const scrollL = stagingContent.scrollLeft || 0;
                  const scrollT = stagingContent.scrollTop || 0;

                  const destLeft = curStagingRect.left + (targetLocalX - scrollL) * uiScale;
                  const destTop = curStagingRect.top + (targetLocalY - scrollT) * uiScale;

                  const curLeft = startRect.left + (destLeft - startRect.left) * ease;
                  const curTop = startRect.top + (destTop - startRect.top) * ease;
                  const curScale = startScale + (targetScale - startScale) * ease;

                  ghost.style.left = `${curLeft}px`;
                  ghost.style.top = `${curTop}px`;
                  ghost.style.transform = `scale(${curScale})`;

                  if (progress < 1) {
                     requestAnimationFrame(animateStep);
                  } else {
                     ghost.remove();
                     finalizeTroop();
                  }
               };
               requestAnimationFrame(animateStep);
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

                             const stagingContent = document.getElementById('staging-content');
                             const cardPositions = engine.window.cardPositions || window.cardPositions || {};
                             const uiScale = engine.window._resolutionScale || window._resolutionScale || 1;
                             const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                             const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                             const stepX = cardW + 10;

                             const occupiedSlots = new Set();
                             game.stagingArea.forEach(c => {
                                 if (cardPositions && cardPositions[c._uid]) {
                                     const slot = Math.round((cardPositions[c._uid].x - 10) / stepX);
                                     occupiedSlots.add(slot);
                                 }
                             });

                             let nextSlot = 0;
                             while (occupiedSlots.has(nextSlot)) {
                                 nextSlot++;
                             }

                             const targetLocalX = 10 + nextSlot * stepX;
                             const targetLocalY = 19;

                             if (!engine.window.cardPositions) engine.window.cardPositions = {};
                             engine.window.cardPositions[chosen._uid] = { x: targetLocalX, y: targetLocalY };
                             if (window.cardPositions) window.cardPositions[chosen._uid] = { x: targetLocalX, y: targetLocalY };

                             if (startRect && stagingContent) {
                                 const stagingRect = stagingContent.getBoundingClientRect();
                                 const scrollL = stagingContent.scrollLeft || 0;
                                 const scrollT = stagingContent.scrollTop || 0;
                                 const destLeft = stagingRect.left + (targetLocalX - scrollL) * uiScale;
                                 const destTop = stagingRect.top + (targetLocalY - scrollT) * uiScale;
                                 const startScale = startRect.width / cardW;
                                 const targetScale = uiScale;

                                 const ghost = document.createElement('div');
                                 ghost.style.cssText = `
                                     position: fixed; z-index: 100000;
                                     left: ${startRect.left}px; top: ${startRect.top}px;
                                     width: ${cardW}px; height: ${cardH}px;
                                     pointer-events: none; transition: none;
                                     transform-origin: top left;
                                     transform: scale(${startScale});
                                     box-shadow: 0 10px 30px rgba(0,0,0,0.8);
                                     border-radius: 6px;
                                 `;
                                 ghost.innerHTML = (typeof window.cardHTML === 'function') ? window.cardHTML(chosen) : '';
                                 if (ghost.firstElementChild) {
                                     ghost.firstElementChild.style.margin = '0';
                                     ghost.firstElementChild.style.width = '100%';
                                     ghost.firstElementChild.style.height = '100%';
                                 }
                                 document.body.appendChild(ghost);

                                 try {
                                     const snd = new Audio('./sound_effects/enemy_move.mp3');
                                     const vol = document.getElementById('volume-slider');
                                     snd.volume = vol ? parseFloat(vol.value) : 0.25;
                                     snd.play().catch(()=>{});
                                 } catch(e) {}

                                 void ghost.offsetWidth;

                                 requestAnimationFrame(() => {
                                     ghost.style.transition = 'left 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                     ghost.style.left = `${destLeft}px`;
                                     ghost.style.top = `${destTop}px`;
                                     ghost.style.transform = `scale(${targetScale})`;
                                 });

                                 setTimeout(() => {
                                     ghost.remove();
                                     finalizeGoblin();
                                 }, 650);
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
          const g = game || window.game || (window.LotrEngine && window.LotrEngine.game);
          const isEngaged = g && g.engagedEnemies && g.engagedEnemies.includes(c);
          if (isEngaged) {
              const pIdx = c._engagedWithPlayerIdx !== undefined ? c._engagedWithPlayerIdx : (g.activeTabPlayerIdx || 0);
              const playerChars = [...(g.heroes || []), ...(g.allies || [])].filter(char => char && char.exhausted && !char._prisoner && (char._ownerIdx === undefined ? 0 : char._ownerIdx) === pIdx);
              return playerChars.length;
          }
          return 0;
      },
      onShadow: function(shadow, enemy, defChars, game, engine, next) {
          const targetPIdx = enemy._engagedWithPlayerIdx !== undefined ? enemy._engagedWithPlayerIdx : game.activeTabPlayerIdx;
          const readyChars = [...game.heroes, ...game.allies].filter(c => !c.exhausted && !c._prisoner && (c._ownerIdx === undefined ? 0 : c._ownerIdx) === targetPIdx);
          const showUndefendedDamageText = (uid) => {
              requestAnimationFrame(() => {
                  const selectors = [
                      `#player-content [data-uid="${uid}"]`,
                      `#heroes-content [data-uid="${uid}"]`,
                      `#allies-content [data-uid="${uid}"]`,
                      `#combat-defender-slot [data-uid="${uid}"]`
                  ];
                  const target = selectors
                      .map(selector => document.querySelector(selector))
                      .filter(el => el && el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0)
                      .sort((a, b) => {
                          const rectA = a.getBoundingClientRect();
                          const rectB = b.getBoundingClientRect();
                          return rectB.width * rectB.height - rectA.width * rectA.height;
                      })[0];
                  if (!target) return;

                  const rect = target.getBoundingClientRect();
                  const damageText = document.createElement('div');
                  damageText.className = 'damage-float-text';
                  damageText.style.left = `${rect.left + rect.width / 2}px`;
                  damageText.style.top = `${rect.top + rect.height * 0.3}px`;
                  damageText.style.color = '#D20A2E';
                  damageText.style.zIndex = '100001';
                  damageText.textContent = '-2';
                  document.body.appendChild(damageText);
                  setTimeout(() => damageText.remove(), 1750);
              });
          };
          if (readyChars.length > 0) {
              if (game.activeTabPlayerIdx !== targetPIdx) engine.window._switchTab(targetPIdx);
              engine.showHeroPicker('Shadow Effect: Spiders of Mirkwood', 'Choose a ready character to exhaust:', readyChars, (chosen) => {
                  if (!chosen) chosen = readyChars[0]; // Prevent ESC cancel exploit
                  if (chosen) {
                      playSpidersOfMirkwoodAttackAudio(true);
                      if (typeof window.triggerSpidersOfMirkwoodFangBite === 'function') {
                          window.triggerSpidersOfMirkwoodFangBite(chosen._uid, enemy._uid, true);
                      }
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
                           if (defChars && defChars.length === 0) showUndefendedDamageText(chosen._uid);
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
                         if (defChars && defChars.length === 0) showUndefendedDamageText(chosen._uid);
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
          if (typeof playForestSpiderPowerUpAudio === 'function') {
              playForestSpiderPowerUpAudio();
          }
          if (typeof window.triggerForestSpiderPowerUp === 'function') {
              window.triggerForestSpiderPowerUp(enemy._uid, 'red');
          }
          engine.toast('Shadow Effect', `Goblin Troop: Attacking enemy +2 ⚔`, 'danger', 2800);
          engine.render();
          setTimeout(() => {
              next();
          }, 350);
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
          playGoblinRunnersRevealAudio();
          card._surging = true;
          engine.toast('Surge', `${card.name} has Surge! Revealing an additional card.`, 'warning');
          if (cb) cb();
      },
      onShadow: function(shadow, enemy, defChars, game, engine, next) {
          if (typeof triggerGoblinRunnersSecondAttackEffect === 'function') {
              triggerGoblinRunnersSecondAttackEffect(enemy);
          }
          if (typeof startGoblinRunnersSmokeEffect === 'function') {
              startGoblinRunnersSmokeEffect(enemy);
          }

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
                                  const nextIdx = (enemy.shadowCards || []).length;

                                  const applySecondAttack = () => {
                                      enemy.shadowCards = enemy.shadowCards || [];
                                      enemy.shadowCards.push(sc);
                                      if (engine.startEnemyAttack) {
                                          engine.startEnemyAttack(enemy);
                                      } else {
                                          engine.render();
                                      }
                                  };

                                  if (engine.window.animateShadowCard) {
                                      engine.window.animateShadowCard(enemy._uid, sc, applySecondAttack, nextIdx);
                                  } else {
                                      applySecondAttack();
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
                  card._scavengersThreatBonus = totalCost;
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
                  const deckEl = document.getElementById('player-deck-pile');
                  const pDiscardEl = document.getElementById('player-discard-pile');

                  const startRect = deckEl ? deckEl.getBoundingClientRect() : { left: window.innerWidth - 120, top: window.innerHeight - 150, width: 100, height: 140 };
                  const discRect = pDiscardEl ? pDiscardEl.getBoundingClientRect() : { left: window.innerWidth - 120, top: window.innerHeight - 150, width: 100, height: 140 };

                  // 1. Throw dark, slender Orc machete matching capture.png to a random spot on the player's deck
                      const sRect = ghostScav ? ghostScav.getBoundingClientRect() : { left: scavX, top: scavY, width: baseW * scale, height: baseH * scale };
                      const mStartX = sRect.left + sRect.width / 2;
                      const mStartY = sRect.top + sRect.height * 0.45;

                      // Tightly constrain the random offset so the 110px wide machete doesn't hang off the edge of the deck
                      const randOffsetX = (Math.random() - 0.5) * (startRect.width * 0.15);
                      const randOffsetY = (Math.random() - 0.5) * (startRect.height * 0.15);
                      // Shifted mTargetX left by 25px so the visual weight of the blade centers on the deck
                      const mTargetX = startRect.left + startRect.width / 2 - 25 + randOffsetX;
                      const mTargetY = startRect.top + startRect.height / 2 + randOffsetY;
                      const embedAngle = -28 - Math.random() * 32;

                      const machete = document.createElement('div');
                      machete.style.cssText = `
                          position: fixed; z-index: 100000;
                          left: ${mStartX - 55}px; top: ${mStartY - 13}px;
                          width: 110px; height: 26px;
                          transform-origin: 55px 13px;
                          pointer-events: none;
                          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.95)) drop-shadow(0 0 4px rgba(0,0,0,0.8));
                      `;
                      // Slender, dark, chiseled orc cleaver matching capture.png
                      machete.innerHTML = `
                          <svg viewBox="0 0 140 32" width="110" height="26" style="overflow:visible;">
                            <defs>
                              <linearGradient id="scavDarkSteel" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" stop-color="#050505"/>
                                <stop offset="45%" stop-color="#18181b"/>
                                <stop offset="85%" stop-color="#3f3f46"/>
                                <stop offset="100%" stop-color="#52525b"/>
                              </linearGradient>
                              <linearGradient id="scavEdgeBevel" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#3f3f46"/>
                                <stop offset="75%" stop-color="#71717a"/>
                                <stop offset="95%" stop-color="#d4d4d8"/>
                                <stop offset="100%" stop-color="#f4f4f5"/>
                              </linearGradient>
                            </defs>
                            <!-- Crude dark wrapped handle -->
                            <rect x="4" y="11.5" width="28" height="9" rx="1.5" fill="#18110b" transform="rotate(-3 18 16)"/>
                            <line x1="10" y1="10.5" x2="9" y2="21.5" stroke="#090503" stroke-width="2"/>
                            <line x1="16" y1="10.5" x2="15" y2="21.5" stroke="#090503" stroke-width="2"/>
                            <line x1="22" y1="10.5" x2="21" y2="21.5" stroke="#090503" stroke-width="2"/>
                            <line x1="28" y1="10.5" x2="27" y2="21.5" stroke="#090503" stroke-width="2"/>
                            <!-- Iron bolster collar -->
                            <rect x="31" y="9.5" width="4.5" height="13" rx="1" fill="#18181b" stroke="#09090b" stroke-width="1"/>
                            <!-- Long, dark, straight-backed chiseled blade -->
                            <path d="M 35,11 L 115,8 L 136,15.5 L 126,21.5 L 35,21.5 Z" fill="url(#scavDarkSteel)" stroke="#09090b" stroke-width="1.4"/>
                            <!-- Beveled cutting edge with forged metal gleam -->
                            <path d="M 36,20 L 126,20 L 135,15.5 L 124,18 L 36,18 Z" fill="url(#scavEdgeBevel)" opacity="0.85"/>
                            <line x1="35" y1="21" x2="127" y2="21" stroke="#a1a1aa" stroke-width="1"/>
                            <!-- Pommel iron knob -->
                            <circle cx="4" cy="16" r="3.2" fill="#27272a" stroke="#09090b" stroke-width="1"/>
                          </svg>
                      `;
                      document.body.appendChild(machete);

                      // Play Scavengers reveal sound effect when thrown
                      try {
                          const revealSnd = new Audio('./sound_effects/dark_of_mirkwood/goblintown_scavengers_reveal.mp3');
                          const vol = document.getElementById('volume-slider');
                          revealSnd.volume = vol ? parseFloat(vol.value) : 0.25;
                          revealSnd.play().catch(() => {});
                      } catch(e) {}

                      const mStartTime = performance.now();
                      const mDuration = 480;

                      const animateMachete = (now) => {
                          const elapsed = now - mStartTime;
                          const p = Math.min(1, elapsed / mDuration);
                          const curX = mStartX + (mTargetX - mStartX) * p;
                          const curY = mStartY + (mTargetY - mStartY) * p - Math.sin(p * Math.PI) * 45;
                          const rot = p * 1080 + embedAngle;

                          machete.style.left = `${curX - 55}px`;
                          machete.style.top = `${curY - 13}px`;
                          machete.style.transform = `rotate(${rot}deg) scale(${0.85 + p * 0.25})`;

                          if (p < 1) {
                              requestAnimationFrame(animateMachete);
                          } else {
                              // Embed firmly into the deck stack
                              if (deckEl) {
                                  deckEl.style.transition = 'transform 0.08s ease-out';
                              deckEl.style.transform = 'translate(-3px, 2px) scale(1.05)';
                              setTimeout(() => { deckEl.style.transform = ''; }, 120);
                              if (engine.spawnBurstAtElement) engine.spawnBurstAtElement(deckEl, '#a1a1aa', 16);
                          }

                          machete.style.transition = 'opacity 0.3s ease-out';
                          machete.style.transform = `rotate(${embedAngle}deg) scale(1.02)`;

                          setTimeout(() => {
                              machete.style.opacity = '0';
                              setTimeout(() => machete.remove(), 320);
                          }, 1000);

                          // 2. Card gets drawn ONLY AFTER the machete impacts the deck
                          setTimeout(() => {
                              const dropped = deck.pop();
                              const cost = Number(dropped.cost) || 0;

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

                                  const scavH = scavRect ? scavRect.height : (baseH * scale);
                                  const tokenTargetX = scavRect ? (scavRect.left - (2 * scale)) : (scavX - (2 * scale));
                                  const tokenTargetY = scavRect ? (scavRect.top + (scavH * 0.145)) : (scavY + (baseH * scale * 0.145));

                                  const threatImgUrl = 'tokens/threat_str.png';

                                  // Play goblintown_scavengers_threat_token.mp3 when the card has moved to center and threat token appears
                                  playGoblintownScavengersThreatTokenAudio();

                                  // 3. Reverse-disintegration materialization (shards fade out so NO yellow dot lingers)
                                  const tokenCenterWorldX = tokenStartX + tokenSize / 2;
                                  const tokenCenterWorldY = tokenStartY + tokenSize / 2;
                                  const emberCount = 14;

                                  const shardContainer = document.createElement('div');
                                  shardContainer.style.cssText = 'position:fixed; inset:0; pointer-events:none; z-index:100006; overflow:visible;';
                                  document.body.appendChild(shardContainer);

                                  for (let i = 0; i < emberCount; i++) {
                                      const rad = (i / emberCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
                                      const dist = 42 + Math.random() * 36;
                                      const ex = tokenCenterWorldX + Math.cos(rad) * dist;
                                      const ey = tokenCenterWorldY + Math.sin(rad) * dist;
                                      const shardSize = 4 + Math.random() * 3.5;

                                      const shard = document.createElement('div');
                                      shard.style.cssText = `
                                          position: fixed;
                                          left: ${ex}px; top: ${ey}px;
                                          width: ${shardSize}px; height: ${shardSize}px;
                                          background: linear-gradient(135deg, #ffffff, #ffb74d);
                                          clip-path: polygon(0 20%, 80% 0, 100% 80%, 20% 100%);
                                          border-radius: 2px;
                                          filter: drop-shadow(0 0 6px #ffb74d);
                                          pointer-events: none; opacity: 0.95;
                                          transform: rotate(${Math.random() * 360}deg) scale(0.65);
                                          transition: left 0.42s cubic-bezier(0.15, 0.85, 0.25, 1), top 0.42s cubic-bezier(0.15, 0.85, 0.25, 1), transform 0.42s ease-in, opacity 0.4s ease-in;
                                      `;
                                      shardContainer.appendChild(shard);

                                      requestAnimationFrame(() => {
                                          shard.style.left = `${tokenCenterWorldX - shardSize / 2}px`;
                                          shard.style.top = `${tokenCenterWorldY - shardSize / 2}px`;
                                          shard.style.transform = `rotate(180deg) scale(0.1)`;
                                          shard.style.opacity = '0';
                                      });
                                  }

                                  setTimeout(() => shardContainer.remove(), 450);

                                  const token = document.createElement('div');
                                  token.style.cssText = `
                                      position: fixed; z-index: 100005;
                                      left: ${tokenStartX}px; top: ${tokenStartY}px;
                                      width: ${tokenSize}px; height: ${tokenSize}px;
                                      border-radius: 50%; background: rgba(0,0,0,0.85);
                                      border: 2px solid #ffb74d; box-shadow: 0 0 10px #ffb74d;
                                      display: flex; align-items: center; justify-content: center;
                                      pointer-events: none; opacity: 0;
                                      transform: scale(0.3);
                                      filter: brightness(2.2) contrast(1.8) drop-shadow(0 0 16px #ffb74d);
                                      clip-path: circle(0% at 50% 50%);
                                      transition: clip-path 0.5s cubic-bezier(0.15, 0.85, 0.25, 1), transform 0.5s cubic-bezier(0.15, 0.85, 0.25, 1), opacity 0.35s ease-out, filter 0.5s ease-out;
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
                                          token.style.clipPath = 'circle(100% at 50% 50%)';
                                          token.style.filter = 'brightness(1) contrast(1) drop-shadow(0 0 8px #ffb74d)';
                                      });
                                  });

                                  setTimeout(() => {
                                      token.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                                      token.style.left = `${tokenTargetX}px`;
                                      token.style.top = `${tokenTargetY}px`;

                                      setTimeout(() => {
                                          token.remove();
                                          totalCost += cost;
                                          card.threatBonus = totalCost;
                                          card._scavengersThreatBonus = totalCost;

                                          if (ghostScav) {
                                              const targetCard = ghostScav.querySelector('.card');
                                              if (targetCard) {
                                                  const existingToken = targetCard.querySelector('.buff-token');
                                                  if (existingToken) existingToken.remove();

                                                  const buffToken = document.createElement('div');
                                                  buffToken.className = 'buff-token';
                                                  buffToken.style.cssText = `
                                                      position: absolute;
                                                      top: 14.5%; left: 0%;
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

                                          let nextActivePlayerIdx = pIdx + 1;
                                          while (nextActivePlayerIdx < game.numPlayers && game.eliminated[nextActivePlayerIdx]) {
                                              nextActivePlayerIdx++;
                                          }
                                          const isLastPlayer = (nextActivePlayerIdx >= game.numPlayers);

                                          if (isLastPlayer) {
                                              card.threatBonus = totalCost;
                                              card._scavengersThreatBonus = totalCost;
                                              if (cb) {
                                                  const origCb = cb;
                                                  cb = null;
                                                  origCb();
                                              }
                                          } else {
                                              // Overlap multiplayer: Switch to next player sooner while the card is mid-flight to discard pile
                                              setTimeout(() => {
                                                  pIdx++;
                                                  processNextPlayer();
                                              }, 300);
                                          }

                                          setTimeout(() => {
                                              gCard.remove();
                                              if (engine.window.discardCard) {
                                                  engine.window.discardCard(dropped, discardPile, true);
                                              } else {
                                                  discardPile.push(dropped);
                                              }
                                              engine.render();
                                          }, 850);
                                      }, 600);
                                  }, 550);
                              }, 500);
                          }, 90);
                      }
                  };
                  requestAnimationFrame(animateMachete);
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
                      if (typeof window.playGreatSpiderAudio === 'function') {
                          window.playGreatSpiderAudio(true);
                      }
                      if (typeof window.triggerGreatSpiderFangBite === 'function') {
                          window.triggerGreatSpiderFangBite(chosen._uid, (shadow && shadow._uid) || (enemy && enemy._uid), { isShadow: true });
                      }
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
      text: "While The Eaves of Mirkwood is the active location, encounter card effects cannot be canceled.", copies: 2,
      onTravel: function(loc, game, engine, proceedTravel) {
          proceedTravel();
          setTimeout(() => {
              try {
                  const snd = new Audio('./sound_effects/dark_of_mirkwood/eaves_of_mirkwood_travel.mp3');
                  const volSlider = document.getElementById('volume-slider');
                  snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
                  snd.play().catch(() => {});
              } catch(e) {}
          }, 600);
      }
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

          const strangleCardWithRoots = (card, cardEl, onComplete) => {
              if (typeof injectTangledGroveStyles === 'function') injectTangledGroveStyles();

              if (!document.getElementById('tg-strangle-styles')) {
                  const st = document.createElement('style');
                  st.id = 'tg-strangle-styles';
                  st.textContent = `
                      @keyframes tgStrangleCrush {
                          0% { transform: translateY(-26px) scale(1.05); filter: brightness(1); }
                          35% { transform: translateY(-26px) scale(1.07); }
                          70% { transform: translateY(-26px) scale(0.92); filter: brightness(0.65) contrast(1.3); }
                          100% { transform: translateY(-26px) scale(0.84); filter: brightness(0.38) contrast(1.4); }
                      }
                      @keyframes tgStrangleShake {
                          0%, 100% { transform: translateY(-26px) scale(1.05) translate(0, 0); }
                          20% { transform: translateY(-26px) scale(1.05) translate(-4px, 2px); }
                          40% { transform: translateY(-26px) scale(1.05) translate(4px, -3px); }
                          60% { transform: translateY(-26px) scale(1.05) translate(-3px, -2px); }
                          80% { transform: translateY(-26px) scale(1.05) translate(3px, 3px); }
                      }
                  `;
                  document.head.appendChild(st);
              }

              cardEl.style.transition = 'transform 0.2s ease-out';
              cardEl.style.transform = 'translateY(-26px) scale(1.05)';
              cardEl.style.zIndex = '150';

              if (typeof playTangledGroveAudio === 'function') {
                  playTangledGroveAudio(true);
              } else if (engine.window.SoundFX && engine.window.SoundFX.playWhoosh) {
                  engine.window.SoundFX.playWhoosh();
              }

              const seed = Number(String(card._uid).replace(/\D/g, '')) || 777;
              const genSvg = window.generateTangledGroveVeinsSVG || generateTangledGroveVeinsSVG;
              const svgContent = genSvg ? genSvg(seed, true) : '';

              const rootsOverlay = document.createElement('div');
              rootsOverlay.className = 'tangled-grove-roots-overlay growing';
              rootsOverlay.style.cssText = `
                  position: absolute; inset: 0; width: 100%; height: 100%;
                  pointer-events: none; z-index: 50 !important; overflow: hidden;
                  border-radius: 6px;
              `;
              rootsOverlay.innerHTML = svgContent;
              cardEl.appendChild(rootsOverlay);

              const growPaths = rootsOverlay.querySelectorAll('.tg-vein-path.tg-growing');
              growPaths.forEach(p => {
                  const delaySec = parseFloat(p.getAttribute('data-delay') || '0');
                  if (typeof p.animate === 'function') {
                      p.animate([
                          { strokeDashoffset: '1000' },
                          { strokeDashoffset: '0' }
                      ], {
                          duration: 380,
                          delay: delaySec * 220,
                          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                          fill: 'forwards'
                      });
                  }
              });

              cardEl.style.animation = 'tgStrangleShake 0.1s linear infinite';

              setTimeout(() => {
                  cardEl.style.animation = 'tgStrangleCrush 0.32s cubic-bezier(0.2, 0.8, 0.25, 1) forwards';

                  // Smoothly transition from choking directly into the discard pile flight
                  setTimeout(() => {
                      const curRect = cardEl.getBoundingClientRect();
                      const discardEl = document.getElementById('player-discard-pile');
                      const destRect = discardEl ? discardEl.getBoundingClientRect() : { left: window.innerWidth - 110, top: window.innerHeight - 150, width: 100, height: 140 };

                      const baseW = cardEl.offsetWidth || 130;
                      const baseH = cardEl.offsetHeight || 182;
                      const startCenterX = curRect.left + curRect.width / 2;
                      const startCenterY = curRect.top + curRect.height / 2;
                      const startScale = curRect.width / baseW;

                      const ghost = document.createElement('div');
                      ghost.className = 'card ' + (card.sphere || 'neutral');
                      ghost.style.cssText = `
                          position: fixed;
                          z-index: 10005;
                          left: ${startCenterX - baseW / 2}px;
                          top: ${startCenterY - baseH / 2}px;
                          width: ${baseW}px;
                          height: ${baseH}px;
                          margin: 0 !important;
                          padding: 0 !important;
                          transform-origin: center center;
                          transform: scale(${startScale}) rotate(0deg);
                          border-radius: 6px;
                          overflow: hidden;
                          pointer-events: none;
                          filter: brightness(0.38) contrast(1.4);
                          box-shadow: 0 8px 24px rgba(0,0,0,0.8);
                          transition: left 0.75s cubic-bezier(0.25, 0.8, 0.25, 1),
                                      top 0.75s cubic-bezier(0.25, 0.8, 0.25, 1),
                                      transform 0.75s cubic-bezier(0.25, 0.8, 0.25, 1),
                                      filter 0.75s ease-out;
                      `;
                      ghost.innerHTML = cardEl.innerHTML;
                      document.body.appendChild(ghost);

                      // Visually hide the card to preserve the layout gap for the FLIP animation
                      cardEl.style.visibility = 'hidden';
                      rootsOverlay.remove();
                      game.hand = game.hand.filter(c => c._uid !== card._uid);
                      engine.render();

                      // Dynamically intercept and slow down the hand gap-closing FLIP animation
                      requestAnimationFrame(() => {
                          document.querySelectorAll('#hand-content .card').forEach(c => {
                              if (c.style.transition && c.style.transition.includes('0.4s')) {
                                  c.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)';
                              }
                          });
                      });

                      const destCenterX = destRect.left + destRect.width / 2;
                      const destCenterY = destRect.top + destRect.height / 2;
                      const targetScale = destRect.width / baseW;

                      if (engine.window.SoundFX && engine.window.SoundFX.playCardPlay) {
                          engine.window.SoundFX.playCardPlay();
                      }

                      requestAnimationFrame(() => {
                          requestAnimationFrame(() => {
                              ghost.style.left = `${destCenterX - baseW / 2}px`;
                              ghost.style.top = `${destCenterY - baseH / 2}px`;
                              ghost.style.transform = `scale(${targetScale}) rotate(0deg)`;
                              ghost.style.filter = 'brightness(1) contrast(1)';
                          });
                      });

                      setTimeout(() => {
                          ghost.remove();
                          const targetDiscard = game.playerDiscards[pIdx] || game.playerDiscard;
                          if (engine.discardCard) {
                              engine.discardCard(card, targetDiscard, true);
                          } else {
                              targetDiscard.push(card);
                          }
                          engine.render();
                          onComplete();
                      }, 750);
                  }, 320);
              }, 360);
          };

          const processNext = () => {
              while (pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
              if (pIdx >= game.numPlayers) {
                  if (discardedAny) {
                      engine.toast('Tangled Grove', 'Each player discarded 1 random card to travel.', 'danger', 3000);
                  }

                  loc._rootsReceding = true;
                  const locCardEl = document.querySelector(`[data-uid="${loc._uid}"]`);
                  const rootsOverlay = locCardEl ? locCardEl.querySelector('.tangled-grove-roots-overlay') : null;
                  if (rootsOverlay) {
                      rootsOverlay.classList.remove('growing', 'persisting');
                      rootsOverlay.classList.add('receding');
                      const paths = rootsOverlay.querySelectorAll('.tg-vein-path');
                      paths.forEach((p, idx) => {
                          if (typeof p.animate === 'function') {
                              p.animate([
                                  { strokeDashoffset: '0', opacity: 1 },
                                  { strokeDashoffset: '1000', opacity: 0 }
                              ], {
                                  duration: 450,
                                  delay: (idx % 3) * 25,
                                  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                  fill: 'forwards'
                              });
                          }
                      });
                      setTimeout(() => {
                          rootsOverlay.remove();
                          loc._rootsOverlayElement = null;
                          loc._rootsGrown = false;
                      }, 480);
                  }

                  const currentThreatVal = game.stagingArea.filter(x => x.type === 'location').length || 1;
                  if (typeof window.triggerEpicTokenExit === 'function') {
                      window.triggerEpicTokenExit(loc._uid, true, currentThreatVal, () => {
                          delete loc._rootsReceding;
                          proceedTravel();
                      });
                  } else {
                      delete loc._rootsReceding;
                      proceedTravel();
                  }
                  return;
              }
              const pHand = game.hand.filter(c => c._ownerIdx === pIdx || (c._ownerIdx === undefined && pIdx === 0));
              if (pHand.length > 0) {
                  if (game.activeTabPlayerIdx !== pIdx) {
                      engine.window._switchTab(pIdx);
                  }
                  setTimeout(() => {
                      const dropped = pHand[Math.floor(Math.random() * pHand.length)];
                      const cardEl = document.querySelector(`#hand-content [data-uid="${dropped._uid}"]`) || document.querySelector(`[data-uid="${dropped._uid}"]`);

                      if (cardEl) {
                          strangleCardWithRoots(dropped, cardEl, () => {
                              discardedAny = true;
                              setTimeout(() => {
                                  pIdx++;
                                  processNext();
                              }, 180);
                          });
                      } else {
                          game.hand = game.hand.filter(c => c._uid !== dropped._uid);
                          engine.render();
                          engine.discardCard(dropped, game.playerDiscards[pIdx] || game.playerDiscard, false);
                          discardedAny = true;
                          pIdx++;
                          processNext();
                      }
                  }, 60);
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
      onReveal: function(card, game, engine, cb) {
          if (typeof window.playSpiderDenAudio === 'function') {
              window.playSpiderDenAudio();
          }
          if (cb) cb();
      },
      onClick: function(c, game, engine) {
         if (game.phase.startsWith('quest') && (game.stagingArea.includes(c) || game.activeLocation === c)) {
            const spiders = [...game.encounterDeck, ...game.encounterDiscard].filter(x => (x.trait||'').includes('Spider'));
            if (spiders.length > 0) {
               engine.showCardPicker('Spider Den', 'Choose a Spider to engage:', spiders, (chosen) => {
                  if(chosen) {
                        const spiderDenEl = document.querySelector(`[data-uid="${c._uid}"]`);
                        const spiderDenRect = spiderDenEl ? spiderDenEl.getBoundingClientRect() : {left: window.innerWidth/2, top: window.innerHeight/2, width: 144, height: 202};

                        const isFromDeck = game.encounterDeck.some(x => x._uid === chosen._uid);
                        const targetEl = isFromDeck ? document.getElementById('encounter-deck-pile') : document.getElementById('encounter-discard-pile');
                        const targetRect = targetEl ? targetEl.getBoundingClientRect() : {left: window.innerWidth - 100, top: 100, width: 100, height: 140};

                        const startX = spiderDenRect.left + spiderDenRect.width / 2;
                        const startY = spiderDenRect.top + spiderDenRect.height / 2;
                        const endX = targetRect.left + targetRect.width / 2;
                        const endY = targetRect.top + targetRect.height / 2;
                        
                        const dx = endX - startX;
                        const dy = endY - startY;
                        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

                        const glob = document.createElement('div');
                        glob.style.cssText = `
                            position: fixed; left: ${startX}px; top: ${startY}px;
                            width: 52px; height: 52px; margin-left: -26px; margin-top: -26px;
                            z-index: 100000; pointer-events: none;
                            perspective: 600px; transform-style: preserve-3d;
                        `;
                        glob.innerHTML = `
                            <div class="spider-glob-3d" style="width:100%; height:100%; position:relative; transform-style:preserve-3d; filter:drop-shadow(0 6px 12px rgba(0,0,0,0.95));">
                                <svg viewBox="0 0 80 80" style="width:100%; height:100%; overflow:visible;">
                                    <defs>
                                        <radialGradient id="globSphere3D" cx="30%" cy="28%" r="72%">
                                            <stop offset="0%" stop-color="#ffffff"/>
                                            <stop offset="35%" stop-color="#e2e8f0"/>
                                            <stop offset="70%" stop-color="#94a3b8"/>
                                            <stop offset="95%" stop-color="#334155"/>
                                            <stop offset="100%" stop-color="#0f172a"/>
                                        </radialGradient>
                                        <linearGradient id="globSilkWrap" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                                            <stop offset="50%" stop-color="#cbd5e1" stop-opacity="0.75"/>
                                            <stop offset="100%" stop-color="#64748b" stop-opacity="0.2"/>
                                        </linearGradient>
                                    </defs>
                                    <!-- 3D Shaded Viscous Core -->
                                    <circle cx="40" cy="40" r="21" fill="url(#globSphere3D)"/>
                                    <!-- Cylindrical Wrapping Silk Ribbons -->
                                    <ellipse cx="40" cy="40" rx="22" ry="12" fill="none" stroke="url(#globSilkWrap)" stroke-width="2.6" transform="rotate(-28 40 40)"/>
                                    <ellipse cx="40" cy="40" rx="21" ry="8" fill="none" stroke="#ffffff" stroke-width="1.8" opacity="0.9" transform="rotate(42 40 40)"/>
                                    <ellipse cx="40" cy="40" rx="19" ry="15" fill="none" stroke="url(#globSilkWrap)" stroke-width="2" transform="rotate(80 40 40)"/>
                                    <!-- Viscous Nodules & Raised Drops -->
                                    <circle cx="28" cy="30" r="4.5" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
                                    <circle cx="50" cy="32" r="3.2" fill="#e2e8f0"/>
                                    <circle cx="34" cy="48" r="3.8" fill="#cbd5e1"/>
                                    <circle cx="48" cy="50" r="4" fill="#94a3b8"/>
                                </svg>
                            </div>
                        `;
                        document.body.appendChild(glob);

                        try {
                            const snd = new Audio('./sound_effects/dark_of_mirkwood/spider_den_glob.mp3');
                            const volSlider = document.getElementById('volume-slider');
                            snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
                            snd.play().catch(()=>{});
                        } catch(e) {}

                        const launchTime = performance.now();
                        const flightDuration = 480; // Snappier, faster flight speed
                        let lastParticleTime = 0;

                        const animateGlob = (now) => {
                            const elapsed = now - launchTime;
                            const progress = Math.min(1, elapsed / flightDuration);

                            const curX = startX + dx * progress;
                            const curY = startY + dy * progress + Math.sin(progress * Math.PI) * -95; // Balanced high arc

                            // Dynamic tangent flight trajectory
                            const vy = dy - Math.cos(progress * Math.PI) * 95 * Math.PI;
                            const dynamicAngle = Math.atan2(vy, dx) * 180 / Math.PI;

                            // 3D tumble rotation around multiple axes
                            const rollSpin = progress * 720;
                            const pitchSpin = Math.sin(progress * Math.PI) * 45;

                            glob.style.left = `${curX}px`;
                            glob.style.top = `${curY}px`;
                            glob.style.transform = `scale(${0.9 + Math.sin(progress * Math.PI) * 0.35})`;
                            
                            const inner3D = glob.firstElementChild;
                            if (inner3D) {
                                inner3D.style.transform = `rotateZ(${dynamicAngle}deg) rotateY(${rollSpin}deg) rotateX(${pitchSpin}deg)`;
                            }

                            // Emit 3D trailing silk fibers and micro-droplets during flight
                            if (now - lastParticleTime > 26 && progress < 0.92) {
                                lastParticleTime = now;
                                const strand = document.createElement('div');
                                const driftAngle = (dynamicAngle + 180 + (Math.random() - 0.5) * 60) * Math.PI / 180;
                                const dist = 12 + Math.random() * 22;
                                const sx = curX + (Math.random() - 0.5) * 8;
                                const sy = curY + (Math.random() - 0.5) * 8;
                                const ex = sx + Math.cos(driftAngle) * dist;
                                const ey = sy + Math.sin(driftAngle) * dist + 8;
                                
                                strand.style.cssText = `
                                    position: fixed; left: ${sx}px; top: ${sy}px;
                                    width: 32px; height: 32px; margin-left: -16px; margin-top: -16px;
                                    pointer-events: none; z-index: 99998;
                                    transition: transform 0.32s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.32s ease-out;
                                `;
                                strand.innerHTML = `
                                    <svg viewBox="0 0 32 32" style="width:100%; height:100%; overflow:visible;">
                                        <path d="M 16,16 Q ${16 + (Math.random() - 0.5) * 14},${16 + (Math.random() - 0.5) * 14} ${16 + Math.cos(driftAngle) * dist},${16 + Math.sin(driftAngle) * dist}" stroke="#f8fafc" stroke-width="${1.4 + Math.random() * 1.6}" stroke-linecap="round" fill="none" opacity="0.9" style="filter:drop-shadow(0 0 3px #ffffff);"/>
                                        <circle cx="${16 + Math.cos(driftAngle) * (dist * 0.6)}" cy="${16 + Math.sin(driftAngle) * (dist * 0.6)}" r="${1.2 + Math.random() * 1.5}" fill="#ffffff"/>
                                    </svg>
                                `;
                                document.body.appendChild(strand);
                                requestAnimationFrame(() => {
                                    strand.style.transform = `translate(${ex - sx}px, ${ey - sy}px) scale(0.4)`;
                                    strand.style.opacity = '0';
                                });
                                setTimeout(() => strand.remove(), 320);
                            }

                            if (progress < 1) {
                                requestAnimationFrame(animateGlob);
                            } else {
                                glob.remove();

                                // Smaller, detailed 3D tactile spiderweb splatter (140px)
                                const splat = document.createElement('div');
                                splat.style.cssText = `
                                    position: fixed; left: ${endX}px; top: ${endY}px;
                                    width: 140px; height: 140px; margin-left: -70px; margin-top: -70px;
                                    z-index: 99999; pointer-events: none;
                                    transform: scale(0.15) rotate(${Math.random() * 360}deg);
                                    transition: transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1.25), opacity 0.45s ease-out;
                                    filter: drop-shadow(0 6px 14px rgba(0,0,0,0.9)) drop-shadow(0 2px 4px rgba(15,23,42,0.8));
                                `;

                                splat.innerHTML = `
                                    <svg viewBox="0 0 160 160" style="width:100%; height:100%; overflow:visible;">
                                        <defs>
                                            <!-- Cylindrical 3D Silk Cords -->
                                            <linearGradient id="silkCord3D" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stop-color="#ffffff"/>
                                                <stop offset="35%" stop-color="#f1f5f9"/>
                                                <stop offset="70%" stop-color="#cbd5e1"/>
                                                <stop offset="100%" stop-color="#64748b"/>
                                            </linearGradient>
                                            <!-- Glassy Hemispherical Droplet -->
                                            <radialGradient id="wetDrop3D" cx="28%" cy="26%" r="70%">
                                                <stop offset="0%" stop-color="#ffffff"/>
                                                <stop offset="45%" stop-color="#e2e8f0"/>
                                                <stop offset="85%" stop-color="#94a3b8"/>
                                                <stop offset="100%" stop-color="#334155"/>
                                            </radialGradient>
                                            <!-- Viscous Raised Core -->
                                            <radialGradient id="viscousCore3D" cx="35%" cy="30%" r="65%">
                                                <stop offset="0%" stop-color="#ffffff"/>
                                                <stop offset="40%" stop-color="#f8fafc"/>
                                                <stop offset="75%" stop-color="#cbd5e1"/>
                                                <stop offset="95%" stop-color="#475569"/>
                                                <stop offset="100%" stop-color="#0f172a"/>
                                            </radialGradient>
                                        </defs>

                                        <!-- Layer 1: Semitransparent Viscous Web Membrane -->
                                        <path d="M 80,80 Q 100,52 118,58 Q 98,75 80,80 M 80,80 Q 64,52 46,60 Q 68,76 80,80 M 80,80 Q 95,108 114,102 Q 95,88 80,80 M 80,80 Q 62,108 48,98 Q 66,86 80,80" fill="rgba(241, 245, 249, 0.42)"/>
                                        <polygon points="80,80 110,64 122,82 80,80" fill="rgba(226, 232, 240, 0.28)"/>
                                        <polygon points="80,80 50,66 38,84 80,80" fill="rgba(226, 232, 240, 0.28)"/>

                                        <!-- Layer 2: Deep Ambient Cast Shadows -->
                                        <g stroke="rgba(15, 23, 42, 0.65)" stroke-width="3" stroke-linecap="round" fill="none" transform="translate(1.5, 2.5)">
                                            <line x1="80" y1="80" x2="138" y2="44"/>
                                            <line x1="80" y1="80" x2="146" y2="82"/>
                                            <line x1="80" y1="80" x2="128" y2="124"/>
                                            <line x1="80" y1="80" x2="82" y2="148"/>
                                            <line x1="80" y1="80" x2="36" y2="128"/>
                                            <line x1="80" y1="80" x2="16" y2="84"/>
                                            <line x1="80" y1="80" x2="28" y2="42"/>
                                            <line x1="80" y1="80" x2="78" y2="16"/>
                                        </g>

                                        <!-- Layer 3: 3D Cylindrical Structural Silk Cords -->
                                        <g stroke="url(#silkCord3D)" stroke-width="2.6" stroke-linecap="round" fill="none">
                                            <line x1="80" y1="80" x2="138" y2="44"/>
                                            <line x1="80" y1="80" x2="146" y2="82"/>
                                            <line x1="80" y1="80" x2="128" y2="124"/>
                                            <line x1="80" y1="80" x2="82" y2="148"/>
                                            <line x1="80" y1="80" x2="36" y2="128"/>
                                            <line x1="80" y1="80" x2="16" y2="84"/>
                                            <line x1="80" y1="80" x2="28" y2="42"/>
                                            <line x1="80" y1="80" x2="78" y2="16"/>
                                            <!-- Specular Ridge Cords -->
                                            <path d="M 80,80 L 138,44 M 80,80 L 146,82 M 80,80 L 82,148 M 80,80 L 16,84" stroke="#ffffff" stroke-width="1.1" opacity="0.95"/>
                                        </g>

                                        <!-- Layer 4: Organic Sagging Spiral Ribs with Tension Nodes -->
                                        <g stroke="url(#silkCord3D)" stroke-width="1.6" fill="none" opacity="0.92">
                                            <!-- Inner Ring -->
                                            <path d="M 102,66 Q 106,80 106,81 Q 101,96 98,96 Q 88,104 81,105 Q 64,100 63,98 Q 54,84 56,81 Q 61,66 62,66 Q 74,56 79,56 Q 96,60 102,66 Z"/>
                                            <!-- Middle Ring -->
                                            <path d="M 118,56 Q 126,80 126,81 Q 118,108 113,109 Q 92,125 81,126 Q 50,118 48,114 Q 32,86 34,83 Q 44,52 46,50 Q 72,32 79,32 Q 110,42 118,56 Z"/>
                                            <!-- Outer Irregular Tattered Web Strands -->
                                            <path d="M 134,48 Q 142,76 142,82 Q 132,118 124,120" stroke-dasharray="8 3"/>
                                            <path d="M 22,86 Q 24,54 30,46 Q 66,20 78,20" stroke-dasharray="7 2.5"/>
                                            <path d="M 76,144 Q 44,124 38,124"/>
                                        </g>

                                        <!-- Layer 5: Viscous Raised 3D Center Hub -->
                                        <circle cx="80" cy="80" r="18" fill="url(#viscousCore3D)"/>
                                        <circle cx="75" cy="74" r="8" fill="#ffffff" opacity="0.9"/>
                                        <ellipse cx="85" cy="84" rx="10" ry="6" fill="#cbd5e1" opacity="0.6"/>

                                        <!-- Layer 6: Glassy 3D Sticky Droplets with Specular Glints -->
                                        <g>
                                            <circle cx="102" cy="66" r="3.4" fill="url(#wetDrop3D)"/><circle cx="101" cy="65" r="1.1" fill="#fff"/>
                                            <circle cx="106" cy="81" r="3.8" fill="url(#wetDrop3D)"/><circle cx="105" cy="80" r="1.2" fill="#fff"/>
                                            <circle cx="81" cy="105" r="4.2" fill="url(#wetDrop3D)"/><circle cx="79.8" cy="103.8" r="1.3" fill="#fff"/>
                                            <circle cx="56" cy="81" r="3.2" fill="url(#wetDrop3D)"/><circle cx="55" cy="80" r="1.0" fill="#fff"/>
                                            <circle cx="79" cy="56" r="3.6" fill="url(#wetDrop3D)"/><circle cx="78" cy="55" r="1.1" fill="#fff"/>
                                            
                                            <circle cx="118" cy="56" r="4.6" fill="url(#wetDrop3D)"/><circle cx="116.6" cy="54.6" r="1.5" fill="#fff"/>
                                            <circle cx="126" cy="81" r="4.0" fill="url(#wetDrop3D)"/><circle cx="124.8" cy="79.8" r="1.3" fill="#fff"/>
                                            <circle cx="113" cy="109" r="4.8" fill="url(#wetDrop3D)"/><circle cx="111.4" cy="107.4" r="1.5" fill="#fff"/>
                                            <circle cx="81" cy="126" r="3.8" fill="url(#wetDrop3D)"/><circle cx="79.8" cy="124.8" r="1.2" fill="#fff"/>
                                            <circle cx="48" cy="114" r="4.4" fill="url(#wetDrop3D)"/><circle cx="46.6" cy="112.6" r="1.4" fill="#fff"/>
                                            <circle cx="34" cy="83" r="3.6" fill="url(#wetDrop3D)"/><circle cx="32.8" cy="81.8" r="1.1" fill="#fff"/>
                                            <circle cx="46" cy="50" r="4.2" fill="url(#wetDrop3D)"/><circle cx="44.6" cy="48.6" r="1.3" fill="#fff"/>
                                            <circle cx="79" cy="32" r="3.8" fill="url(#wetDrop3D)"/><circle cx="77.8" cy="30.8" r="1.2" fill="#fff"/>

                                            <!-- Micro Dew Beads Along Spidersilk -->
                                            <circle cx="92" cy="72" r="1.8" fill="#ffffff" opacity="0.95"/>
                                            <circle cx="68" cy="72" r="2.0" fill="#ffffff" opacity="0.95"/>
                                            <circle cx="70" cy="90" r="1.9" fill="#ffffff" opacity="0.95"/>
                                            <circle cx="92" cy="90" r="2.1" fill="#ffffff" opacity="0.95"/>
                                            <circle cx="132" cy="62" r="2.2" fill="#ffffff" opacity="0.9"/>
                                            <circle cx="28" cy="68" r="2.2" fill="#ffffff" opacity="0.9"/>
                                        </g>
                                    </svg>
                                `;

                                document.body.appendChild(splat);

                                requestAnimationFrame(() => {
                                    splat.style.transform = `scale(1) rotate(${Math.random() * 360}deg)`;
                                });

                                setTimeout(() => {
                                    splat.style.opacity = '0';
                                    setTimeout(() => splat.remove(), 480);
                                }, 450);

                                if(game.activeLocation === c) game.activeLocation = null;
                                else game.stagingArea = game.stagingArea.filter(x => x._uid !== c._uid);
                                engine.discardCard(c, game.encounterDiscard, false, spiderDenRect);

                                let idxInDeck = game.encounterDeck.findIndex(x => x._uid === chosen._uid);
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
                                               if (typeof window.triggerGreatSpiderFangBite === 'function') {
                                                  window.triggerGreatSpiderFangBite(heroToExhaust._uid, chosen._uid, { isForced: true });
                                               }
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
                                  const startRect2 = startEl.getBoundingClientRect();
                                  const scale = window._resolutionScale || 1;
                                  const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                                  const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                                  
                                  const ghost = document.createElement('div');
                                  ghost.style.cssText = `
                                     position: fixed; z-index: 100000;
                                     left: ${startRect2.left}px; top: ${startRect2.top}px;
                                     width: ${cardW}px; height: ${cardH}px;
                                     transform: scale(${startRect2.width / cardW}) rotate(0deg);
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
                                  
                                  if (engine.window.SoundFX && engine.window.SoundFX.playDraw) {
                                     engine.window.SoundFX.playDraw();
                                  }
                                  
                                  setTimeout(() => {
                                     ghost.remove();
                                     finalizeEngagement();
                                  }, 600);
                               } else {
                                  finalizeEngagement();
                               }
                            }
                        };
                        requestAnimationFrame(animateGlob);
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
			onTravel: function(loc, game, engine, proceedTravel) {
          engine.toast('Goblin Trail', 'Travel: Revealing top encounter card.', 'info');
          
          const locEl = document.querySelector(`[data-uid="${loc._uid}"]`);
          const deckEl = document.getElementById('encounter-deck-pile');
          
          if (!locEl || !deckEl) {
              engine.window.revealEncounterCard(() => proceedTravel());
              return;
          }

          const startRect = locEl.getBoundingClientRect();
          const endRect = deckEl.getBoundingClientRect();
          
          const startX = startRect.left + startRect.width / 2;
          const startY = startRect.top + startRect.height / 2;
          const endX = endRect.left + endRect.width / 2;
          const endY = endRect.top + endRect.height / 2;
          const dx = endX - startX;
          const dy = endY - startY;
          const dist = Math.hypot(dx, dy);
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;

          const overlay = document.createElement('div');
          overlay.style.cssText = `position:fixed; inset:0; z-index:140; pointer-events:none; transition:opacity 0.8s ease; opacity:0;`;
          
          overlay.innerHTML = `
            <div style="position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, transparent 15%, rgba(5, 10, 25, 0.92) 85%); mix-blend-mode:multiply;"></div>
            <div id="gt-cyan-beam" style="position:absolute; left:${startX - 60}px; top:${startY - 60}px; width:${dist + 60}px; height:120px; transform-origin:left center; transform:rotate(${angle}deg); background:linear-gradient(90deg, transparent 0%, transparent 15%, rgba(167,243,208,0.85) 40%, rgba(56,189,248,0.5) 70%, transparent 100%); filter:blur(20px); -webkit-mask-image:linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%); mask-image:linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%); opacity:0; animation:gtBeamIn 0.8s cubic-bezier(0.2,0.8,0.2,1) both;"></div>
            <div id="gt-fog-container" style="position:absolute; inset:0; overflow:hidden;"></div>
            <style>
              @keyframes gtBeamIn { 0% { opacity:0; transform:rotate(${angle}deg) scaleX(0); } 100% { opacity:1; transform:rotate(${angle}deg) scaleX(1); } }
              @keyframes gtFogRoll { 0% { transform:translate(var(--sx), var(--sy)) scale(0.3); opacity:0; } 20% { opacity:0.8; } 80% { opacity:0.8; transform:translate(var(--ex), var(--ey)) scale(1.8); } 100% { transform:translate(var(--ex), var(--ey)) scale(2.4); opacity:0; } }
            </style>
          `;
          document.body.appendChild(overlay);

          const fogCont = overlay.querySelector('#gt-fog-container');
          for(let i = 0; i < 8; i++) {
              const f = document.createElement('div');
              f.style.cssText = `position:absolute; left:0; top:0; width:340px; height:160px; background:radial-gradient(ellipse at center, rgba(186,230,253,0.5) 0%, transparent 65%); border-radius:50%; filter:blur(24px); mix-blend-mode:screen; --sx:${startX - 170}px; --sy:${startY - 80}px; --ex:${endX - 170}px; --ey:${endY - 80}px; animation:gtFogRoll 1.3s ${i * 0.12}s ease-in-out both;`;
              fogCont.appendChild(f);
          }

          try {
              const snd = new Audio('./sound_effects/dark_of_mirkwood/the_eaves_of_mirkwood.mp3');
              const vol = document.getElementById('volume-slider');
              snd.volume = vol ? parseFloat(vol.value) : 0.25;
              snd.play().catch(()=>{});
          } catch(e) {}

          requestAnimationFrame(() => overlay.style.opacity = '1');

          setTimeout(() => {
              deckEl.style.transition = 'box-shadow 0.4s, filter 0.4s';
              deckEl.style.boxShadow = '0 0 35px #7dd3fc, inset 0 0 20px #a7f3d0';
              deckEl.style.filter = 'brightness(1.4)';

              const beam = document.getElementById('gt-cyan-beam');
              if (beam) {
                  beam.style.animation = 'none'; // Kills the CSS keyframe lock so JS transitions can take over
                  void beam.offsetWidth; // Force DOM reflow
                  beam.style.transition = 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1), clip-path 0.9s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease-out';
                  beam.style.transform = `rotate(${angle}deg) translateX(${dist * 0.6}px) scaleX(0.4) scaleY(0.4)`;
                  beam.style.clipPath = 'inset(0 0 0 100%)';
                  beam.style.opacity = '0';
              }

              engine.window.revealEncounterCard(() => {
                  overlay.style.opacity = '0';
                  deckEl.style.boxShadow = '';
                  deckEl.style.filter = '';
                  setTimeout(() => overlay.remove(), 800);
                  proceedTravel();
              });

              const checkGhost = setInterval(() => {
                  const ghost = document.getElementById('encounter-reveal-ghost');
                  if (ghost) {
                      clearInterval(checkGhost);
                      ghost.style.filter = 'drop-shadow(0 0 25px #7dd3fc) brightness(1.25)';
                  }
              }, 30);
              setTimeout(() => clearInterval(checkGhost), 1000);

          }, 1100);
      },
      onExplored: function(loc, game, engine) {
          game._goblinTrailExplored = true;
          engine.toast('Goblin Trail', 'Response: Placed 6 progress on the current quest!', 'success');

          const scale = window._resolutionScale || 1;
          const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
          const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
          const activeContent = document.getElementById('active-location-content');
          const stagingContent = document.getElementById('staging-content');

          // Capture coordinates from any existing card element or in-flight discard ghost before removal
          let startLeft = null;
          let startTop = null;
          const existingCardEl = document.querySelector(`[data-uid="${loc._uid}"]`);
          if (existingCardEl) {
              const r = existingCardEl.getBoundingClientRect();
              if (r.width > 0 && r.height > 0) {
                  startLeft = r.left;
                  startTop = r.top;
              }
          }

          document.querySelectorAll('div').forEach(d => {
              if (d.style.position === 'fixed' && d.innerHTML && d.innerHTML.includes('Goblin-Trail') && !d.id) {
                  if (startLeft === null) {
                      const r = d.getBoundingClientRect();
                      if (r.width > 0 && r.height > 0) {
                          startLeft = r.left;
                          startTop = r.top;
                      }
                  }
                  d.remove();
              }
          });

          // Determine position: preserve exact staging slot if explored in staging, never snapping to active location
          if (startLeft === null || startTop === null) {
              const savedPos = engine.window.cardPositions && engine.window.cardPositions[loc._uid];
              const isActuallyActiveLoc = game.activeLocation && game.activeLocation._uid === loc._uid;
              const wasStaging = loc._wasInStaging || (!isActuallyActiveLoc && !loc._wasActiveLoc);

              if (savedPos && stagingContent) {
                  const sRect = stagingContent.getBoundingClientRect();
                  startLeft = sRect.left + savedPos.x * scale;
                  startTop = sRect.top + savedPos.y * scale;
              } else if (wasStaging && stagingContent) {
                  const sRect = stagingContent.getBoundingClientRect();
                  startLeft = sRect.left + 20 * scale;
                  startTop = sRect.top + 20 * scale;
              } else if (isActuallyActiveLoc && activeContent) {
                  const aRect = activeContent.getBoundingClientRect();
                  startLeft = aRect.left + (aRect.width - cardW) / 2;
                  startTop = aRect.top + 30 * scale;
              } else {
                  startLeft = window.innerWidth / 2 - cardW / 2;
                  startTop = window.innerHeight / 2 - cardH / 2;
              }
          }

          // Anchor Goblin Trail card on-screen with an emerald and gold aura
          const cardGhost = document.createElement('div');
          cardGhost.id = 'gt-epic-' + loc._uid;
          cardGhost.className = 'card encounter-location';
          cardGhost.style.cssText = `
              position: fixed;
              left: ${startLeft}px;
              top: ${startTop}px;
              width: ${cardW}px;
              height: ${cardH}px;
              z-index: 1000;
              pointer-events: none;
              border-radius: 6px;
              border: 2px solid var(--gold-bright);
              box-shadow: 0 0 25px rgba(52, 211, 153, 0.85), 0 0 40px rgba(245, 215, 110, 0.6), 0 8px 24px rgba(0,0,0,0.9);
              transform: scale(1);
              transition: transform 0.12s ease-out, box-shadow 0.2s ease-out;
              overflow: hidden;
          `;
          const trailImg = loc.img || 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Goblin-Trail.jpg';
          cardGhost.innerHTML = `
              <img src="${trailImg}" style="width:100%; height:100%; object-fit:cover; display:block;" alt="${loc.name}">
              <div style="position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, rgba(52,211,153,0.3) 0%, transparent 70%); mix-blend-mode:screen; pointer-events:none;"></div>
          `;
          document.body.appendChild(cardGhost);

          const startX = startLeft + cardW / 2;
          const startY = startTop + cardH / 2;
          const totalTokens = 6;

          for (let i = 0; i < totalTokens; i++) {
              setTimeout(() => {
                  // Card recoil pulse as each token shoots out of the center
                  cardGhost.style.transform = 'scale(0.96)';
                  setTimeout(() => {
                      cardGhost.style.transform = 'scale(1.02)';
                      setTimeout(() => { cardGhost.style.transform = 'scale(1)'; }, 80);
                  }, 60);

                  // Emergence spark on Goblin Trail's card
                  if (engine.spawnBurstAtElement) {
                      engine.spawnBurstAtElement(cardGhost, '#f5d76e', 8);
                      engine.spawnBurstAtElement(cardGhost, '#34d399', 6);
                  }

                  const questCard = document.querySelector('#quest-content .quest-card') || document.getElementById('quest-zone');
                  const qTarget = (questCard && questCard.querySelector('.token.progress')) || questCard || document.body;
                  const qRect = qTarget.getBoundingClientRect();
                  const endX = qRect.left + qRect.width / 2;
                  const endY = qRect.top + qRect.height / 2;

                  const curveOffset = (i % 2 === 0 ? -1 : 1) * (30 + i * 14);
                  const arcApexY = Math.min(startY, endY) - (75 + i * 12);
                  const p0 = { x: startX, y: startY };
                  const p1 = { x: (startX + endX) / 2 + curveOffset, y: arcApexY };
                  const p2 = { x: endX, y: endY };

                  const comet = document.createElement('div');
                  comet.style.cssText = `
                      position: fixed;
                      left: ${startX}px;
                      top: ${startY}px;
                      width: 32px;
                      height: 32px;
                      margin-left: -16px;
                      margin-top: -16px;
                      border-radius: 50%;
                      background: radial-gradient(circle, #ffffff 15%, #34d399 55%, #059669 100%);
                      border: 2px solid #fef08a;
                      box-shadow: 0 0 14px #34d399, 0 0 22px #f5d76e, inset 0 0 6px #ffffff;
                      z-index: 100000;
                      pointer-events: none;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                  `;
                  comet.innerHTML = `<img src="tokens/travel.png" style="width:18px;height:18px;object-fit:contain;filter:brightness(1.8) drop-shadow(0 1px 2px #000);">`;
                  document.body.appendChild(comet);

                  if (engine.window.SoundFX && engine.window.SoundFX.playWhoosh) {
                      engine.window.SoundFX.playWhoosh();
                  }

                  const duration = 380;
                  const startTime = performance.now();
                  let lastDrop = 0;

                  const animateFlight = (now) => {
                      const elapsed = now - startTime;
                      const progress = Math.min(1, elapsed / duration);
                      const inv = 1 - progress;

                      const curX = inv * inv * p0.x + 2 * inv * progress * p1.x + progress * progress * p2.x;
                      const curY = inv * inv * p0.y + 2 * inv * progress * p1.y + progress * progress * p2.y;

                      comet.style.left = `${curX}px`;
                      comet.style.top = `${curY}px`;
                      comet.style.transform = `scale(${0.75 + Math.sin(progress * Math.PI) * 0.45})`;

                      if (now - lastDrop > 45 && progress < 0.9) {
                          lastDrop = now;
                          const spark = document.createElement('div');
                          spark.style.cssText = `
                              position: fixed;
                              left: ${curX - 4}px;
                              top: ${curY - 4}px;
                              width: 8px;
                              height: 8px;
                              border-radius: 50%;
                              background: #a7f3d0;
                              box-shadow: 0 0 8px #34d399;
                              pointer-events: none;
                              z-index: 99999;
                              transition: transform 0.22s ease-out, opacity 0.22s ease-out;
                          `;
                          document.body.appendChild(spark);
                          requestAnimationFrame(() => {
                              spark.style.transform = 'scale(0.2)';
                              spark.style.opacity = '0';
                          });
                          setTimeout(() => spark.remove(), 240);
                      }

                      if (progress < 1) {
                          requestAnimationFrame(animateFlight);
                      } else {
                          comet.remove();

                          if (engine.spawnBurstAtElement) {
                              engine.spawnBurstAtElement(qTarget, '#34d399', 12);
                          }
                          if (engine.screenShake) {
                              engine.screenShake(2, 70);
                          }
                          if (engine.window.SoundFX && engine.window.SoundFX.playClick) {
                              engine.window.SoundFX.playClick(0.92 + i * 0.08);
                          }
                          if (questCard) {
                              questCard.style.transition = 'transform 0.08s ease-out';
                              questCard.style.transform = 'scale(1.03)';
                              setTimeout(() => { questCard.style.transform = ''; }, 85);
                          }

                          const origFloat = engine.window.floatText;
                          engine.window.floatText = () => {};
                          if (engine.addProgressToQuest) {
                              engine.addProgressToQuest(1, true);
                          } else {
                              game.questProgress = (game.questProgress || 0) + 1;
                              if (engine.checkQuestAdvance) engine.checkQuestAdvance();
                          }
                          engine.window.floatText = origFloat;

                          // Visually tick the quest card progress number and bar up on each comet impact
                          const stage = (window.QUEST_STAGES || engine.window?.QUEST_STAGES)?.[game.questStageIdx];
                          const qToken = questCard ? questCard.querySelector('.token.progress') : null;
                          if (qToken && stage) {
                              qToken.textContent = `${game.questProgress}/${stage.questPts}`;
                              qToken.style.transition = 'transform 0.08s ease-out';
                              qToken.style.transform = 'scale(1.3)';
                              setTimeout(() => { qToken.style.transform = ''; }, 85);
                          }
                          const qFill = questCard ? questCard.querySelector('.quest-progress-fill') : null;
                          if (qFill && stage) {
                              qFill.style.width = `${Math.min(100, (game.questProgress / stage.questPts) * 100)}%`;
                          }

                          if (i === totalTokens - 1) {
                              if (engine.screenShake) engine.screenShake(5, 200);
                              if (engine.spawnBurstAtElement) engine.spawnBurstAtElement(qTarget, '#f5d76e', 22);
                              if (origFloat) {
                                  const r = qTarget.getBoundingClientRect();
                                  origFloat(r.left + r.width / 2, r.top + 30, '+6 Progress!', '#f5d76e');
                              }

                              // Once all 6 tokens have impacted, smoothly fly Goblin Trail to the Victory Display
                              const vPile = document.getElementById('victory-display-pile') || document.getElementById('encounter-discard-pile');
                              const vRect = vPile ? vPile.getBoundingClientRect() : { left: window.innerWidth - 110, top: 74, width: 100, height: 140 };
                              const targetScale = vRect.width / cardW;

                              cardGhost.style.transition = 'left 0.65s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.65s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.65s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.65s ease-out';
                              cardGhost.style.left = `${vRect.left + (vRect.width - cardW * targetScale) / 2}px`;
                              cardGhost.style.top = `${vRect.top}px`;
                              cardGhost.style.transform = `scale(${targetScale}) rotate(0deg)`;

                              setTimeout(() => {
                                  cardGhost.remove();
                                  if (loc.victory && !game.victoryDisplay.some(c => c._uid === loc._uid)) {
                                      game.victoryDisplay.push(loc);
                                      game.vp = (game.vp || 0) + loc.victory;
                                      engine.toast('Victory Points', `+${loc.victory} VP from ${loc.name}`, 'success');
                                  }
                                  engine.render();
                              }, 680);
                          }
                      }
                  };
                  requestAnimationFrame(animateFlight);
              }, 120 + i * 85);
          }
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
            if (typeof window.triggerDrivenByShadowBuff === 'function') {
              window.triggerDrivenByShadowBuff(stagingCards.map(c => c._uid));
            }
            engine.toast('Driven by Shadow', 'Each enemy and location in the staging area gets +1 Threat until the end of the phase!', 'danger', 3500);
            if(cb) cb();
          } else {
            if (typeof window.triggerDrivenByShadowSurge === 'function') {
              window.triggerDrivenByShadowSurge();
            }
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
                     
                     const overlay = document.createElement('div');
                     overlay.id = 'surprising-speed-overlay';
                     overlay.style.cssText = 'position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; background: radial-gradient(circle, rgba(200,235,180,0.15) 0%, rgba(30,50,20,0.7) 80%); pointer-events:none; transition: opacity 0.3s ease-out; overflow: hidden;';
                     
                     overlay.innerHTML = `
                        <style>
                            @keyframes speedBeamDrop {
                                0% { transform: scaleY(0); opacity: 1; }
                                10% { transform: scaleY(1); opacity: 1; }
                                80% { transform: scaleY(1) scaleX(1); opacity: 1; }
                                100% { transform: scaleY(1) scaleX(3); opacity: 0; }
                            }
                            @keyframes speedRingSpin {
                                0% { transform: rotateX(75deg) rotateZ(0deg) translateY(-25px); opacity: 0; }
                                20% { opacity: 1; }
                                80% { opacity: 1; }
                                100% { transform: rotateX(75deg) rotateZ(360deg) translateY(25px) scale(1.5); opacity: 0; }
                            }
                            @keyframes speedGroundBurst {
                                0% { transform: rotateX(80deg) scale(0.1); opacity: 1; }
                                100% { transform: rotateX(80deg) scale(2.5); opacity: 0; }
                            }
                            @keyframes speedDarkCore {
                                0% { transform: rotateX(80deg) scale(0); opacity: 1; }
                                30% { transform: rotateX(80deg) scale(1.5); opacity: 1; }
                                100% { transform: rotateX(80deg) scale(0); opacity: 0; }
                            }
                            @keyframes speedCoreRays {
                                0% { transform: rotateX(80deg) rotateZ(0deg) scale(0.5); opacity: 1; }
                                100% { transform: rotateX(80deg) rotateZ(180deg) scale(2); opacity: 0; }
                            }
                        </style>
                        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:0; height:0; z-index:1; display:flex; justify-content:center; align-items:center;">
                            <div style="position:absolute; top:0; width:400px; height:400px; background:repeating-conic-gradient(from 0deg, transparent 0deg, transparent 10deg, rgba(220, 240, 190, 0.7) 11deg, rgba(250, 255, 230, 0.9) 12deg, transparent 13deg); animation: speedGroundBurst 1.2s cubic-bezier(0.1, 0.8, 0.2, 1) forwards; border-radius:50%;"></div>
                            <div style="position:absolute; top:0; width:200px; height:200px; background:repeating-conic-gradient(from 0deg, transparent 0deg, transparent 20deg, rgba(50, 80, 40, 0.8) 22deg, #111 25deg, transparent 28deg); animation: speedCoreRays 1.2s ease-out forwards; border-radius:50%;"></div>
                            <div style="position:absolute; top:0; width:150px; height:150px; background:radial-gradient(circle, #000 20%, rgba(20,40,10,0.8) 50%, transparent 70%); animation: speedDarkCore 1.2s ease-out forwards; border-radius:50%;"></div>
                            <div style="position:absolute; top: -50px; width: 175px; height: 175px; border: 6px solid rgba(180, 220, 150, 0.4); border-top-color: rgba(250, 255, 230, 0.9); border-bottom-color: transparent; border-radius: 50%; animation: speedRingSpin 0.8s linear infinite;"></div>
                            <div style="position:absolute; top: -25px; width: 110px; height: 110px; border: 3px solid rgba(220, 240, 190, 0.6); border-right-color: rgba(255, 255, 255, 0.9); border-left-color: transparent; border-radius: 50%; animation: speedRingSpin 0.5s linear infinite reverse;"></div>
                            <div style="position:absolute; bottom: -50px; width: 80px; height: 110vh; background: linear-gradient(90deg, transparent, rgba(160, 210, 150, 0.5) 15%, rgba(220, 240, 190, 0.8) 35%, #fff 50%, rgba(220, 240, 190, 0.8) 65%, rgba(160, 210, 150, 0.5) 85%, transparent); transform-origin: bottom center; animation: speedBeamDrop 1.2s ease-out forwards; -webkit-mask-image: linear-gradient(to top, transparent 0%, black 110px, black 100%); mask-image: linear-gradient(to top, transparent 0%, black 110px, black 100%);"></div>
                            <div style="position:absolute; bottom: -50px; width: 30px; height: 110vh; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8) 30%, #fff 50%, rgba(255, 255, 255, 0.8) 70%, transparent); transform-origin: bottom center; animation: speedBeamDrop 1.2s ease-out forwards; -webkit-mask-image: linear-gradient(to top, transparent 0%, black 110px, black 100%); mask-image: linear-gradient(to top, transparent 0%, black 110px, black 100%);"></div>
                        </div>

                        <div id="surprising-speed-big-text" style="position:relative; z-index:2; font-family:'Cinzel Decorative', serif; font-size:4.5rem; font-weight:900; color:#ff3030; text-shadow:0 0 35px #ff0000, 0 4px 15px #000, 0 0 25px rgba(255,255,255,0.6); transform:scale(0.5); opacity:0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); text-align:center;">
                            +1 Threat! <br>
                            <span style="font-size:3.5rem; color:#f5d76e; text-shadow:0 0 25px #f5d76e, 0 4px 10px #000;">Surge!</span>
                        </div>
                     `;
                     document.body.appendChild(overlay);

                     try {
                         const expSnd = new Audio('./sound_effects/dark_of_mirkwood/surprising_speed_explosion.mp3');
                         const volSlider = document.getElementById('volume-slider');
                         expSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
                         expSnd.play().catch(() => {});
                     } catch(e) {}
                     
                     if (engine.screenShake) engine.screenShake(25, 600);
                     
                     setTimeout(() => {
                       const bigText = document.getElementById('surprising-speed-big-text');
                       if (bigText) {
                           bigText.style.transform = 'scale(1)';
                           bigText.style.opacity = '1';
                       }
                     }, 50);

                     setTimeout(() => {
                       const threatEl = document.getElementById('hud-threat');
                       if (!threatEl) return;
                       
                       const threatRect = threatEl.getBoundingClientRect();
                       const p0 = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
                       const p2 = { x: threatRect.left + threatRect.width / 2, y: threatRect.top + threatRect.height / 2 };
                       
                       // Side-arcing trajectory guaranteed to NEVER ascend above the threat counter's Y coordinate
                       const archDir = Math.random() < 0.5 ? -1 : 1;
                       const p1 = {
                         x: p0.x + archDir * 280,
                         y: p2.y + (p0.y - p2.y) * 0.35
                       };
                       
                       const dart = document.createElement('div');
                       dart.style.cssText = `
                         position: fixed;
                         left: ${p0.x}px;
                         top: ${p0.y}px;
                         width: 0;
                         height: 0;
                         z-index: 100000;
                         pointer-events: none;
                         transform: translate(0, 0);
                       `;
                       
                       // Canvas-driven Wind-Dart with shortened, intensely animated flaring tail
                       const canvas = document.createElement('canvas');
                       canvas.width = 230;
                       canvas.height = 110;
                       canvas.style.cssText = `
                         position: absolute;
                         left: -175px;
                         top: -55px;
                         width: 230px;
                         height: 110px;
                         pointer-events: none;
                         filter: drop-shadow(0 0 14px rgba(52, 211, 153, 0.9)) drop-shadow(0 0 26px rgba(251, 191, 36, 0.7));
                       `;
                       dart.appendChild(canvas);
                       document.body.appendChild(dart);
                       
                       const ctx = canvas.getContext('2d');
                       const hX = 175; // Lead tip X coordinate on canvas
                       const hY = 55;  // Lead tip Y coordinate on canvas
                       
                       const duration = 700;
                       const startTime = performance.now();
                       let frameCount = 0;

                       const animateWindDart = (now) => {
                         const elapsed = now - startTime;
                         const progress = Math.min(1, elapsed / duration);
                         
                         // Smooth quadratic Bézier flight interpolation
                         const t = progress;
                         const invT = 1 - t;
                         const curX = invT * invT * p0.x + 2 * invT * t * p1.x + t * t * p2.x;
                         const curY = invT * invT * p0.y + 2 * invT * t * p1.y + t * t * p2.y;
                         
                         // Real-time tangential rotation following flight path
                         const vx = 2 * invT * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
                         const vy = 2 * invT * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
                         const angleDeg = Math.atan2(vy, vx) * (180 / Math.PI);
                         
                         dart.style.left = `${curX}px`;
                         dart.style.top = `${curY}px`;
                         dart.style.transform = `rotate(${angleDeg}deg)`;
                         
                         // --- DRAW COMPACT, ACTIVELY FLARING & UNDULATING TAIL ---
                         ctx.clearRect(0, 0, canvas.width, canvas.height);
                         
                         const tailLength = 115; // Cleanly shortened compact tail
                         const points = 26;
                         const step = tailLength / points;
                         const waveSpeed = now * 0.028; // Snappier, high-energy wave velocity
                         
                         // 1. Dual Braided Undulating Ribbon Tails with pulsing flaring waves
                         const drawRibbon = (color, baseWidth, phase, ampMult, freqMult) => {
                           ctx.save();
                           ctx.beginPath();
                           ctx.strokeStyle = color;
                           ctx.lineCap = 'round';
                           ctx.lineJoin = 'round';
                           ctx.shadowColor = color;
                           ctx.shadowBlur = 8;
                           
                           for (let i = 0; i <= points; i++) {
                             const xDist = i * step;
                             const px = hX - xDist;
                             const progressRatio = i / points;
                             // Whip dynamics: flaring waves pulse rapidly down the tail
                             const flarePulse = Math.sin(now * 0.04 - i * 0.5) * 2.2;
                             const taper = Math.sin(progressRatio * Math.PI) * (14 * ampMult) + flarePulse;
                             const py = hY + Math.sin(waveSpeed - i * (0.34 * freqMult) + phase) * taper;
                             
                             // Pulsing dynamic thickness along the tail
                             ctx.lineWidth = Math.max(1.2, baseWidth * (1 - progressRatio * 0.45) * (0.85 + 0.3 * Math.sin(now * 0.035 - i * 0.4)));
                             
                             if (i === 0) ctx.moveTo(px, py);
                             else ctx.lineTo(px, py);
                           }
                           ctx.stroke();
                           ctx.restore();
                         };
                         
                         // Emerald primary wave
                         drawRibbon('#10b981', 5.5, 0, 1.0, 1.0);
                         // Counter-phase golden energy ribbon
                         drawRibbon('#fbbf24', 4.0, Math.PI, 0.85, 1.2);
                         // High-intensity white-hot core ribbon
                         drawRibbon('#ffffff', 2.5, Math.PI * 0.5, 0.65, 1.35);
                         
                         // 2. Translucent undulating shroud connecting tail waves
                         ctx.save();
                         ctx.beginPath();
                         for (let i = 0; i <= points; i++) {
                           const xDist = i * step;
                           const px = hX - xDist;
                           const taper = Math.sin((i / points) * Math.PI) * 12;
                           const py = hY + Math.sin(waveSpeed - i * 0.34) * taper;
                           if (i === 0) ctx.moveTo(px, py);
                           else ctx.lineTo(px, py);
                         }
                         for (let i = points; i >= 0; i--) {
                           const xDist = i * step;
                           const px = hX - xDist;
                           const taper = Math.sin((i / points) * Math.PI) * 12;
                           const py = hY + Math.sin(waveSpeed - i * 0.34 + Math.PI) * taper;
                           ctx.lineTo(px, py);
                         }
                         ctx.closePath();
                         const shroudGrad = ctx.createLinearGradient(hX, hY, hX - tailLength, hY);
                         shroudGrad.addColorStop(0, 'rgba(167, 243, 208, 0.5)');
                         shroudGrad.addColorStop(0.5, 'rgba(52, 211, 153, 0.28)');
                         shroudGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
                         ctx.fillStyle = shroudGrad;
                         ctx.fill();
                         ctx.restore();

                         // 3. Animated tail energy nodes flowing down the stream
                         for (let f = 0; f < 3; f++) {
                           const flowOffset = ((now * 0.16 + f * 38) % tailLength);
                           const flowIdx = Math.min(points, Math.floor(flowOffset / step));
                           const flowRatio = flowIdx / points;
                           const flTaper = Math.sin(flowRatio * Math.PI) * 10;
                           const flX = hX - flowOffset;
                           const flY = hY + Math.sin(waveSpeed - flowIdx * 0.34) * flTaper + (Math.sin(now * 0.05 + f) * 3);
                           ctx.beginPath();
                           ctx.arc(flX, flY, 2.2 + Math.sin(now * 0.045 + f) * 0.8, 0, Math.PI * 2);
                           ctx.fillStyle = f % 2 === 0 ? '#fef08a' : '#86efac';
                           ctx.shadowColor = ctx.fillStyle;
                           ctx.shadowBlur = 6;
                           ctx.fill();
                         }
                         
                         // 4. Counter-Rotating Gyroscopic Energy Rings around the head
                         const drawGyroRing = (tiltAngle, rX, rY, strokeColor) => {
                           ctx.save();
                           ctx.translate(hX - 6, hY);
                           ctx.rotate(tiltAngle);
                           ctx.beginPath();
                           ctx.ellipse(0, 0, rX, rY, 0, 0, Math.PI * 2);
                           ctx.strokeStyle = strokeColor;
                           ctx.lineWidth = 2.2;
                           ctx.stroke();
                           ctx.restore();
                         };
                         drawGyroRing(now * 0.04, 20, 8, 'rgba(251, 191, 36, 0.85)');
                         drawGyroRing(-now * 0.035, 16, 6, 'rgba(167, 243, 208, 0.9)');
                         
                         // 4. Crystalline Piercing Lance-Head
                         ctx.save();
                         ctx.beginPath();
                         ctx.moveTo(hX + 16, hY);                 // Needle tip
                         ctx.lineTo(hX - 12, hY - 11);             // Top barb
                         ctx.lineTo(hX - 4, hY);                  // Center notch
                         ctx.lineTo(hX - 12, hY + 11);             // Bottom barb
                         ctx.closePath();
                         
                         const headGrad = ctx.createLinearGradient(hX - 12, hY, hX + 16, hY);
                         headGrad.addColorStop(0, '#34d399');
                         headGrad.addColorStop(0.65, '#fef08a');
                         headGrad.addColorStop(1, '#ffffff');
                         ctx.fillStyle = headGrad;
                         ctx.strokeStyle = '#ffffff';
                         ctx.lineWidth = 1.5;
                         ctx.shadowColor = '#ffffff';
                         ctx.shadowBlur = 12;
                         ctx.fill();
                         ctx.stroke();
                         
                         // Blazing core glow
                         ctx.beginPath();
                         ctx.arc(hX - 2, hY, 7 + Math.sin(now * 0.05) * 2, 0, Math.PI * 2);
                         ctx.fillStyle = '#ffffff';
                         ctx.shadowColor = '#fef08a';
                         ctx.shadowBlur = 14;
                         ctx.fill();
                         ctx.restore();

                         // 5. World-Space Glowing Motes & Particles shed along trajectory
                         if (frameCount++ % 2 === 0 && progress < 0.96) {
                           const spark = document.createElement('div');
                           const sparkColor = Math.random() < 0.5 ? '#fef08a' : '#34d399';
                           spark.style.cssText = `
                             position: fixed;
                             left: ${curX + (Math.random() - 0.5) * 10}px;
                             top: ${curY + (Math.random() - 0.5) * 10}px;
                             width: ${3 + Math.random() * 4}px;
                             height: ${3 + Math.random() * 4}px;
                             background: ${sparkColor};
                             border-radius: 50%;
                             box-shadow: 0 0 10px ${sparkColor}, 0 0 16px #10b981;
                             z-index: 99999;
                             pointer-events: none;
                             transition: opacity 0.3s ease-out, transform 0.3s ease-out;
                           `;
                           document.body.appendChild(spark);
                           requestAnimationFrame(() => {
                             spark.style.opacity = '0';
                             spark.style.transform = `scale(0.2) translate(${(Math.random() - 0.5) * 24}px, ${(Math.random() - 0.5) * 24}px)`;
                           });
                           setTimeout(() => spark.remove(), 310);
                         }
                         
                         if (progress < 1) {
                           requestAnimationFrame(animateWindDart);
                         } else {
                           dart.remove();
                           
                           try {
                             const threatSnd = new Audio('./sound_effects/threat_increase.mp3');
                             const volSlider = document.getElementById('volume-slider');
                             threatSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
                             threatSnd.play().catch(()=>{});
                           } catch(e) {}
                           
                           // Impact burst on threat number
                           if (engine.spawnBurstAtElement) {
                             engine.spawnBurstAtElement(threatEl, '#ffffff', 14);
                             engine.spawnBurstAtElement(threatEl, '#34d399', 20);
                             engine.spawnBurstAtElement(threatEl, '#fbbf24', 16);
                           }
                           
                           const diffEl = document.getElementById('hud-threat-diff');
                           if (diffEl) {
                             diffEl.textContent = '+1 Threat!';
                             diffEl.classList.remove('threat-diff-active');
                             void diffEl.offsetWidth;
                             diffEl.classList.add('threat-diff-active');
                             
                             setTimeout(() => {
                               diffEl.classList.remove('threat-diff-active');
                               diffEl.textContent = '';
                             }, 3500);
                           }
                         }
                       };
                       
                       requestAnimationFrame(animateWindDart);
                     }, 600);
                     
                     setTimeout(() => {
                       overlay.style.opacity = '0';
                       const bigText = document.getElementById('surprising-speed-big-text');
                       if (bigText) {
                           bigText.style.transform = 'scale(1.2) translateY(-50px)';
                       }
                       
                       setTimeout(() => {
                         overlay.remove();
                       }, 400);
                       
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
                         try {
                             const enemySnd = new Audio('./sound_effects/dark_of_mirkwood/surprising_speed_enemy.mp3');
                             const volSlider = document.getElementById('volume-slider');
                             enemySnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
                             enemySnd.play().catch(() => {});
                         } catch(e) {}

                         const el = document.querySelector(`[data-uid="${chosen._uid}"]`);
                         if (el) {
                             // 1. Get the starting coordinates of the Surprising Speed card
                             const ssGhost = engine.window._activeEncounterGhost || document.getElementById('encounter-limbo-ghost');
                             const startRect = ssGhost ? ssGhost.getBoundingClientRect() : { left: window.innerWidth/2 - 72, top: window.innerHeight/2 - 101, width: 144, height: 202 };
                             const enemyRect = el.getBoundingClientRect();

                             // 2. Create the projectile
                             const projectile = document.createElement('div');
                             projectile.style.cssText = `
                                 position: fixed;
                                 z-index: 10000;
                                 left: ${startRect.left}px;
                                 top: ${startRect.top}px;
                                 width: ${startRect.width}px;
                                 height: ${startRect.height}px;
                                 pointer-events: none;
                                 transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                             `;
                             
                             // 3. Inject the exact visual effect markup inside the projectile (hugging card boundaries)
                             projectile.innerHTML = `
                                 <div style="position:absolute; inset:-8px -8px -14px -8px; pointer-events:none; overflow:visible;">
                                     <style>
                                         @keyframes speedShockWave2 {
                                             0% { transform: scale(0.85) translateY(6px); opacity: 0.95; }
                                             100% { transform: scale(1.15) translateY(-8px); opacity: 0; }
                                         }
                                         @keyframes speedBladeStream2 {
                                             0% { transform: translateY(35px) scaleY(0.5); opacity: 0; }
                                             30% { opacity: 0.95; }
                                             100% { transform: translateY(-50px) scaleY(1.2); opacity: 0; }
                                         }
                                         @keyframes speedAfterimageShift2 {
                                             0%, 100% { transform: translate(0, 0); opacity: 0.35; }
                                             33% { transform: translate(-3px, 6px); opacity: 0.7; }
                                             66% { transform: translate(3px, 8px); opacity: 0.55; }
                                         }
                                         @keyframes speedAuraPulse2 {
                                             0%, 100% { filter: drop-shadow(0 0 8px #38bdf8) drop-shadow(0 0 14px #34d399); }
                                             50% { filter: drop-shadow(0 0 14px #67e8f9) drop-shadow(0 0 24px #a7f3d0); }
                                         }
                                     </style>
                                     <div style="position:absolute; inset:6px; border:2px solid rgba(125,211,252,0.9); border-radius:8px; animation: speedShockWave2 0.35s ease-out infinite;"></div>
                                     <div style="position:absolute; inset:1px; border:1.5px solid rgba(52,211,153,0.8); border-radius:8px; animation: speedShockWave2 0.35s 0.17s ease-out infinite;"></div>
                                     <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(56,189,248,0.2) 0%, rgba(52,211,153,0.45) 100%); border-radius:6px; filter:blur(3px); animation: speedAfterimageShift2 0.22s linear infinite;"></div>
                                     <svg viewBox="0 0 180 240" style="position:absolute; inset:0; width:100%; height:100%; overflow:visible; animation: speedAuraPulse2 0.3s ease-in-out infinite;">
                                         <defs>
                                             <linearGradient id="bladeGradCyan2" x1="0" y1="1" x2="0" y2="0">
                                                 <stop offset="0%" stop-color="rgba(56,189,248,0)"/>
                                                 <stop offset="50%" stop-color="rgba(125,211,252,0.95)"/>
                                                 <stop offset="100%" stop-color="#ffffff"/>
                                             </linearGradient>
                                             <linearGradient id="bladeGradEmerald2" x1="0" y1="1" x2="0" y2="0">
                                                 <stop offset="0%" stop-color="rgba(52,211,153,0)"/>
                                                 <stop offset="60%" stop-color="rgba(110,231,183,0.9)"/>
                                                 <stop offset="100%" stop-color="#ffffff"/>
                                             </linearGradient>
                                         </defs>
                                         <line x1="2" y1="210" x2="0" y2="30" stroke="url(#bladeGradCyan2)" stroke-width="2.6" stroke-linecap="round" style="animation: speedBladeStream2 0.26s linear infinite;"/>
                                         <line x1="8" y1="230" x2="6" y2="15" stroke="url(#bladeGradEmerald2)" stroke-width="2" stroke-linecap="round" style="animation: speedBladeStream2 0.2s 0.08s linear infinite;"/>
                                         <line x1="178" y1="210" x2="180" y2="30" stroke="url(#bladeGradCyan2)" stroke-width="2.6" stroke-linecap="round" style="animation: speedBladeStream2 0.25s 0.04s linear infinite;"/>
                                         <line x1="172" y1="230" x2="174" y2="15" stroke="url(#bladeGradEmerald2)" stroke-width="2" stroke-linecap="round" style="animation: speedBladeStream2 0.22s 0.11s linear infinite;"/>
                                         <line x1="45" y1="230" x2="42" y2="50" stroke="#ffffff" stroke-width="1.6" opacity="0.9" stroke-linecap="round" style="animation: speedBladeStream2 0.18s 0.05s linear infinite;"/>
                                         <line x1="135" y1="230" x2="138" y2="50" stroke="#ffffff" stroke-width="1.6" opacity="0.9" stroke-linecap="round" style="animation: speedBladeStream2 0.18s 0.1s linear infinite;"/>
                                     </svg>
                                 </div>
                             `;

                             document.body.appendChild(projectile);

                             requestAnimationFrame(() => {
                                 requestAnimationFrame(() => {
                                     projectile.style.left = `${enemyRect.left}px`;
                                     projectile.style.top = `${enemyRect.top}px`;
                                     projectile.style.width = `${enemyRect.width}px`;
                                     projectile.style.height = `${enemyRect.height}px`;
                                 });
                             });

                             setTimeout(() => {
                                 projectile.remove();
                                 const warp = document.createElement('div');
                                 warp.className = 'surprising-speed-warp';
                                 warp.style.cssText = `
                                     position: absolute;
                                     inset: -8px -8px -14px -8px;
                                     pointer-events: none;
                                     z-index: 120;
                                     overflow: visible;
                                 `;
                                 warp.innerHTML = projectile.innerHTML;
                                 el.appendChild(warp);

                                 setTimeout(() => {
                                     const doReturn = () => {
                                         if (el) {
                                             const w = el.querySelector('.surprising-speed-warp');
                                             if (w) w.remove();
                                         }
                                         
                                         // Explicitly clear all potential visibility bug flags
                                         delete chosen._returnedToStaging;
                                         delete chosen._drawing;
                                         delete chosen._flyingToDeck;
                                         delete chosen._flipping;
                                         delete chosen._isAnimatingTravel;
                                         
                                         // Safely remove from engaged area
                                         game.engagedEnemies = game.engagedEnemies.filter(x => x._uid !== chosen._uid);
                                         delete chosen._engagedWithPlayerIdx;
                                         chosen._activeAttacker = false;
                                         
                                         if (engine.window && engine.window.cardPositions) {
                                             delete engine.window.cardPositions[chosen._uid];
                                         }
                                         
                                         // Add to staging area if not already there
                                         if (!game.stagingArea.some(x => x._uid === chosen._uid)) {
                                             game.stagingArea.push(chosen);
                                         }
                                         
                                         enemiesReturned++;
                                         engine.toast('Surprising Speed', `Returned ${chosen.name} to staging.`, 'danger');
                                         engine.render();

                                         // Spawn shatter effect attached directly to document.body so render() updates cannot wipe it
                                         const landedEl = document.querySelector(`#staging-content [data-uid="${chosen._uid}"]`);
                                         const r = landedEl ? landedEl.getBoundingClientRect() : null;
                                         if (r && r.width > 0) {
                                             const shatter = document.createElement('div');
                                             shatter.className = 'surprising-speed-shatter';
                                             shatter.style.cssText = `
                                                 position: fixed;
                                                 left: ${r.left}px;
                                                 top: ${r.top}px;
                                                 width: ${r.width}px;
                                                 height: ${r.height}px;
                                                 pointer-events: none;
                                                 z-index: 99999;
                                                 overflow: visible;
                                             `;
                                             shatter.innerHTML = `
                                                 <style>
                                                     @keyframes speedShatterFlash {
                                                         0% { opacity: 0.95; transform: scale(0.9); }
                                                         100% { opacity: 0; transform: scale(1.35); }
                                                     }
                                                     @keyframes speedShatterRing {
                                                         0% { transform: scale(0.95); opacity: 1; border-color: #ffffff; }
                                                         100% { transform: scale(1.5); opacity: 0; border-color: rgba(56, 189, 248, 0); filter: blur(3px); }
                                                     }
                                                     @keyframes speedShardFly {
                                                         0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
                                                         100% { transform: translate(var(--tx), var(--ty)) rotate(var(--tr)) scale(0.1); opacity: 0; }
                                                     }
                                                 </style>
                                                 <!-- Energy flash core -->
                                                 <div style="position:absolute; inset:-8px; border-radius:10px; background:radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(56,189,248,0.55) 50%, transparent 75%); animation:speedShatterFlash 0.35s ease-out forwards;"></div>
                                                 <!-- Expanding shockwave rings -->
                                                 <div style="position:absolute; inset:0; border:3px solid #ffffff; border-radius:8px; box-shadow:0 0 16px #38bdf8; animation:speedShatterRing 0.45s ease-out forwards;"></div>
                                                 <div style="position:absolute; inset:-6px; border:2.5px solid #34d399; border-radius:12px; box-shadow:0 0 20px #34d399; animation:speedShatterRing 0.5s 0.05s ease-out forwards;"></div>
                                                 <!-- Shards bursting outward in all directions -->
                                                 <div style="position:absolute; left:95%; top:15%; width:16px; height:10px; background:linear-gradient(135deg, #ffffff, #38bdf8); clip-path:polygon(0 0, 100% 30%, 50% 100%); filter:drop-shadow(0 0 8px #38bdf8); --tx:55px; --ty:-35px; --tr:115deg; animation:speedShardFly 0.5s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
                                                 <div style="position:absolute; left:98%; top:50%; width:18px; height:11px; background:linear-gradient(135deg, #ffffff, #34d399); clip-path:polygon(10% 0, 100% 40%, 40% 100%); filter:drop-shadow(0 0 8px #34d399); --tx:60px; --ty:4px; --tr:-90deg; animation:speedShardFly 0.48s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
                                                 <div style="position:absolute; left:92%; top:82%; width:15px; height:10px; background:linear-gradient(135deg, #fef08a, #38bdf8); clip-path:polygon(0 20%, 90% 0, 60% 100%); filter:drop-shadow(0 0 8px #38bdf8); --tx:50px; --ty:45px; --tr:135deg; animation:speedShardFly 0.52s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
                                                 <div style="position:absolute; left:50%; top:96%; width:16px; height:10px; background:linear-gradient(135deg, #ffffff, #6ee7b7); clip-path:polygon(20% 0, 100% 30%, 30% 100%); filter:drop-shadow(0 0 8px #34d399); --tx:4px; --ty:55px; --tr:-115deg; animation:speedShardFly 0.5s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
                                                 <div style="position:absolute; left:5%; top:84%; width:16px; height:10px; background:linear-gradient(135deg, #ffffff, #38bdf8); clip-path:polygon(0 0, 100% 40%, 40% 100%); filter:drop-shadow(0 0 8px #38bdf8); --tx:-50px; --ty:42px; --tr:95deg; animation:speedShardFly 0.49s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
                                                 <div style="position:absolute; left:0%; top:50%; width:18px; height:11px; background:linear-gradient(135deg, #ffffff, #34d399); clip-path:polygon(0 10%, 90% 0, 50% 100%); filter:drop-shadow(0 0 8px #34d399); --tx:-60px; --ty:0px; --tr:-135deg; animation:speedShardFly 0.48s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
                                                 <div style="position:absolute; left:6%; top:15%; width:15px; height:10px; background:linear-gradient(135deg, #fef08a, #34d399); clip-path:polygon(20% 0, 100% 20%, 30% 100%); filter:drop-shadow(0 0 8px #38bdf8); --tx:-52px; --ty:-36px; --tr:110deg; animation:speedShardFly 0.51s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
                                                 <div style="position:absolute; left:50%; top:0%; width:16px; height:10px; background:linear-gradient(135deg, #ffffff, #38bdf8); clip-path:polygon(0 0, 100% 10%, 40% 100%); filter:drop-shadow(0 0 8px #38bdf8); --tx:2px; --ty:-55px; --tr:-95deg; animation:speedShardFly 0.5s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
                                             `;
                                             document.body.appendChild(shatter);
                                             if (engine.spawnBurstAtElement) {
                                                 engine.spawnBurstAtElement(landedEl, '#38bdf8', 16);
                                             }
                                             setTimeout(() => shatter.remove(), 550);
                                         }
                                         
                                         pIdx++;
                                         processNext();
                                     };

                                     if (engine.window.animateReturnToStaging) {
                                         engine.window.animateReturnToStaging(chosen, doReturn);
                                     } else {
                                         doReturn();
                                     }
                                 }, 50);
                             }, 400);

                         } else {
                             // Fallback if element not found
                             const doReturn = () => {
                                 delete chosen._returnedToStaging;
                                 delete chosen._drawing;
                                 game.engagedEnemies = game.engagedEnemies.filter(x => x._uid !== chosen._uid);
                                 delete chosen._engagedWithPlayerIdx;
                                 chosen._activeAttacker = false;
                                 if (engine.window && engine.window.cardPositions) {
                                     delete engine.window.cardPositions[chosen._uid];
                                 }
                                 if (!game.stagingArea.some(x => x._uid === chosen._uid)) {
                                     game.stagingArea.push(chosen);
                                 }
                                 enemiesReturned++;
                                 engine.toast('Surprising Speed', `Returned ${chosen.name} to staging.`, 'danger');
                                 engine.render();
                                 pIdx++;
                                 processNext();
                             };
                             if (engine.window.animateReturnToStaging) {
                                 engine.window.animateReturnToStaging(chosen, doReturn);
                             } else {
                                 doReturn();
                             }
                         }

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
          engine.toast('Shadow Effect', `${shadow.name}: Attacking enemy gets +1 ⚔ and returns to staging after attack.`, 'danger');
          enemy._wargsLikeReturnToStaging = true;
          enemy._surprisingSpeedShadowReturn = true;

          try {
              const pwrSnd = new Audio('./sound_effects/forest_spider_powerup.mp3');
              const volSlider = document.getElementById('volume-slider');
              pwrSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
              pwrSnd.play().catch(() => {});
          } catch(e) {}

          // Spawn aura overlay attached directly to document.body so board re-renders do not erase it
          const enemyEl = document.querySelector(`[data-uid="${enemy._uid}"]`);
          if (enemyEl) {
              const r = enemyEl.getBoundingClientRect();
              const warpOverlay = document.createElement('div');
              warpOverlay.style.cssText = `
                  position: fixed;
                  left: ${r.left}px;
                  top: ${r.top}px;
                  width: ${r.width}px;
                  height: ${r.height}px;
                  z-index: 1000;
                  pointer-events: none;
                  overflow: visible;
                  transition: opacity 0.25s ease-out;
              `;
              warpOverlay.innerHTML = window.getSurprisingSpeedWarpHTML ? window.getSurprisingSpeedWarpHTML() : '';
              document.body.appendChild(warpOverlay);
              if (engine.spawnBurstAtElement) {
                  engine.spawnBurstAtElement(enemyEl, '#38bdf8', 25);
              }
              setTimeout(() => {
                  warpOverlay.style.opacity = '0';
                  setTimeout(() => warpOverlay.remove(), 250);
              }, 750);
          }
          engine.render();
          setTimeout(() => {
              next();
          }, 350);
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
                       if (engine.window && engine.window.cardPositions) {
                           delete engine.window.cardPositions[chosen._uid];
                       }

                       const startRect = engine.window._lastPickerRect || {
                           left: window.innerWidth / 2 - 72,
                           top: window.innerHeight / 2 - 101,
                           width: 144,
                           height: 202
                       };

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
                       if (!destRect) {
                           destRect = { left: window.innerWidth / 2 - 72, top: window.innerHeight / 2, width: 144, height: 202 };
                       }

                       const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                       const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                       const startScale = startRect.width / cardW;
                       const targetScaleX = destRect.width / cardW;
                       const targetScaleY = destRect.height / cardH;

                       const startCenterX = startRect.left + startRect.width / 2;
                       const startCenterY = startRect.top + startRect.height / 2;
                       const destCenterX = destRect.left + destRect.width / 2;
                       const destCenterY = destRect.top + destRect.height / 2;

                       let cleanName = (chosen.name || '').replace(/ /g, '-').replace(/'/g, '');
                       let ringsDbImg = chosen.code ? `https://ringsdb.com/bundles/cards/${chosen.code}.png` : '';
                       let fallback = `https://hallofbeorn.com/Images/Cards/Core-Set/${cleanName}.jpg`;
                       if (chosen.img) {
                           fallback = chosen.img.startsWith('http') ? chosen.img : `https://drive.google.com/thumbnail?id=${chosen.img}&sz=w400`;
                       }

                       const ghost = document.createElement('div');
                       ghost.style.cssText = `
                           position: fixed; z-index: 100005;
                           left: ${startCenterX - cardW / 2}px; top: ${startCenterY - cardH / 2}px;
                           width: ${cardW}px; height: ${cardH}px;
                           transform-origin: center center;
                           transform: scale(${startScale});
                           pointer-events: none;
                           overflow: visible;
                       `;

                       ghost.innerHTML = `
                           <style>
                               @keyframes goblinGodRaysSpin {
                                   0% { transform: rotate(0deg); }
                                   100% { transform: rotate(360deg); }
                               }
                               @keyframes goblinGodRaysPulse {
                                   0%, 100% { opacity: 0.9; filter: blur(3px) drop-shadow(0 0 16px #ff2222) drop-shadow(0 0 32px #dc2626); }
                                   50% { opacity: 1; filter: blur(2.5px) drop-shadow(0 0 24px #ff4444) drop-shadow(0 0 45px #ef4444); }
                               }
                               @keyframes goblinShockwave {
                                   0% { transform: translate(-50%, -50%) scale(0.3); opacity: 1; border-width: 3px; }
                                   100% { transform: translate(-50%, -50%) scale(1.35); opacity: 0; border-width: 1px; }
                               }
                               @keyframes goblinEmberRise {
                                   0% { transform: translate(0, 0) scale(1); opacity: 0; }
                                   25% { opacity: 1; }
                                   100% { transform: translate(var(--edrift, 8px), -80px) scale(0.2); opacity: 0; }
                               }
                           </style>
                           <!-- Expanding Shockwave Ring -->
                           <div style="position:absolute; left:50%; top:50%; width:240px; height:240px; border-radius:50%; border:2px solid #ff4444; box-shadow:0 0 14px #ef4444, inset 0 0 10px #ffffff; animation:goblinShockwave 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards; pointer-events:none;"></div>
                           
                           <!-- Soft-Edged, Shorter, Varied God Rays (Centered, 360px) -->
                           <div class="goblin-god-rays" style="position:absolute; left:50%; top:50%; width:360px; height:360px; margin-left:-180px; margin-top:-180px; pointer-events:none; z-index:-1; opacity:0; transition:opacity 0.4s ease-out, transform 0.4s ease-out; animation:goblinGodRaysPulse 0.5s ease-in-out infinite alternate;">
                               <!-- Primary Layer: Asymmetric, Soft-Edged Beams -->
                               <div style="position:absolute; inset:0; border-radius:50%; background:conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.95) 10deg, rgba(239,68,68,0.85) 18deg, transparent 32deg, transparent 48deg, rgba(254,202,202,0.85) 58deg, rgba(220,38,38,0.75) 75deg, transparent 88deg, transparent 110deg, rgba(255,255,255,0.9) 118deg, rgba(239,68,68,0.8) 128deg, transparent 142deg, transparent 168deg, rgba(248,113,113,0.7) 180deg, rgba(185,28,28,0.6) 205deg, transparent 220deg, transparent 242deg, rgba(255,255,255,0.95) 252deg, rgba(239,68,68,0.85) 268deg, transparent 282deg, transparent 315deg, rgba(254,202,202,0.85) 326deg, rgba(220,38,38,0.75) 342deg, transparent 355deg); -webkit-mask-image:radial-gradient(circle, black 20%, rgba(0,0,0,0.75) 38%, rgba(0,0,0,0.2) 52%, transparent 68%); mask-image:radial-gradient(circle, black 20%, rgba(0,0,0,0.75) 38%, rgba(0,0,0,0.2) 52%, transparent 68%); animation:goblinGodRaysSpin 4s linear infinite;"></div>
                               <!-- Counter-Rotating Accent Layer -->
                               <div style="position:absolute; inset:12px; border-radius:50%; background:conic-gradient(from 40deg, transparent 0deg, rgba(254,226,226,0.85) 14deg, rgba(239,68,68,0.6) 30deg, transparent 45deg, transparent 85deg, rgba(255,255,255,0.9) 98deg, rgba(220,38,38,0.7) 116deg, transparent 132deg, transparent 175deg, rgba(254,202,202,0.8) 190deg, rgba(239,68,68,0.65) 212deg, transparent 228deg, transparent 270deg, rgba(255,255,255,0.9) 282deg, rgba(220,38,38,0.7) 302deg, transparent 318deg); -webkit-mask-image:radial-gradient(circle, black 16%, rgba(0,0,0,0.65) 35%, transparent 62%); mask-image:radial-gradient(circle, black 16%, rgba(0,0,0,0.65) 35%, transparent 62%); animation:goblinGodRaysSpin 2.6s linear infinite reverse;"></div>
                           </div>
                           
                           <!-- Rising Ember Particles Detail -->
                           <div style="position:absolute; inset:0; pointer-events:none; overflow:visible;">
                               <div style="position:absolute; left:26%; bottom:20px; width:3.5px; height:3.5px; border-radius:50%; background:#fef08a; box-shadow:0 0 6px #ef4444, 0 0 10px #f97316; --edrift:-12px; animation:goblinEmberRise 1.1s 0.05s ease-out infinite;"></div>
                               <div style="position:absolute; left:48%; bottom:16px; width:4px; height:4px; border-radius:50%; background:#fff; box-shadow:0 0 6px #ef4444, 0 0 12px #f43f5e; --edrift:15px; animation:goblinEmberRise 1.3s 0.15s ease-out infinite;"></div>
                               <div style="position:absolute; left:72%; bottom:22px; width:3px; height:3px; border-radius:50%; background:#fef08a; box-shadow:0 0 5px #ef4444, 0 0 8px #f97316; --edrift:-8px; animation:goblinEmberRise 1.0s 0.25s ease-out infinite;"></div>
                               <div style="position:absolute; left:38%; bottom:28px; width:3.5px; height:3.5px; border-radius:50%; background:#fca5a5; box-shadow:0 0 6px #ef4444; --edrift:10px; animation:goblinEmberRise 1.2s 0.35s ease-out infinite;"></div>
                           </div>

                           <!-- Card with Crimson Shine & Inner Bevel Gleam -->
                           <div class="card ${chosen.sphere || 'encounter-enemy'}" style="width:100%; height:100%; margin:0; border-radius:6px; border:2.5px solid #ff4444; box-shadow:0 0 25px #ef4444, 0 0 50px rgba(220,38,38,0.7), inset 0 0 16px rgba(255,255,255,0.7); background:linear-gradient(180deg, #3a1a1a 0%, #1a0a0a 100%); overflow:hidden;">
                               <img src="${ringsDbImg || fallback}" onerror="this.src='${fallback}'" style="width:100%;height:100%;object-fit:cover;display:block;">
                           </div>
                       `;

                       document.body.appendChild(ghost);
                       const raysEl = ghost.querySelector('.goblin-god-rays');

                       if (typeof playForestSpiderPowerUpAudio === 'function') {
                           playForestSpiderPowerUpAudio();
                       }

                       requestAnimationFrame(() => {
                           ghost.style.transition = 'transform 0.38s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
                           ghost.style.transform = `scale(${startScale * 1.12})`;
                           if (raysEl) raysEl.style.opacity = '1';
                       });

                       // Fade out sooner while the card is smoothly in-flight to engaged area
                       setTimeout(() => {
                           if (raysEl) {
                               raysEl.style.opacity = '0';
                               raysEl.style.transform = 'scale(0.65)';
                           }
                           if (typeof playGoblinsAreUponYouPickedAudio === 'function') {
                               playGoblinsAreUponYouPickedAudio();
                           }

                           ghost.style.transition = 'left 0.62s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.62s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.62s cubic-bezier(0.25, 0.8, 0.25, 1)';
                           ghost.style.left = `${destCenterX - cardW / 2}px`;
                           ghost.style.top = `${destCenterY - cardH / 2}px`;
                           ghost.style.transform = `scale(${targetScaleX}, ${targetScaleY})`;

                           setTimeout(() => {
                               // Seamless landing aura overlay that smoothly fades out
                               const auraOverlay = document.createElement('div');
                               auraOverlay.style.cssText = `
                                   position: fixed; z-index: 10000;
                                   left: ${destRect.left}px; top: ${destRect.top}px;
                                   width: ${destRect.width}px; height: ${destRect.height}px;
                                   border-radius: 6px;
                                   border: 2.5px solid #ff4444;
                                   box-shadow: 0 0 25px #ef4444, 0 0 50px rgba(220,38,38,0.7), inset 0 0 16px rgba(255,255,255,0.7);
                                   pointer-events: none;
                                   opacity: 1;
                                   transition: opacity 0.65s ease-out, box-shadow 0.65s ease-out, border-color 0.65s ease-out;
                               `;
                               document.body.appendChild(auraOverlay);

                               ghost.remove();
                               game.engagedEnemies.push(chosen);
                               engine.toast('Goblins are Upon You!', `Player ${pIdx+1} engaged ${chosen.name}.`, 'danger');
                               if (engine.spawnBurstAtElement) {
                                   engine.spawnBurstAtElement(auraOverlay, '#ef4444', 25);
                               }
                               engine.render();

                               requestAnimationFrame(() => {
                                   requestAnimationFrame(() => {
                                       auraOverlay.style.opacity = '0';
                                       auraOverlay.style.boxShadow = '0 0 0px rgba(239, 68, 68, 0)';
                                       auraOverlay.style.borderColor = 'rgba(255, 68, 68, 0)';
                                   });
                               });
                               setTimeout(() => auraOverlay.remove(), 700);

                               pIdx++;
                               processNext();
                           }, 650);
                       }, 420);
                   } else {
                       pIdx++;
                       processNext();
                   }
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
          if (goblinCount > 0) {
              if (typeof playForestSpiderPowerUpAudio === 'function') {
                  playForestSpiderPowerUpAudio();
              }
              if (typeof window.triggerForestSpiderPowerUp === 'function') {
                  window.triggerForestSpiderPowerUp(enemy._uid, 'red');
              }
          }
          engine.toast('Shadow Effect', `${shadow.name}: Attacking enemy +${goblinCount} ⚔`, 'danger', 2800);
          engine.render();
          setTimeout(() => {
              next();
          }, goblinCount > 0 ? 350 : 0);
      }
    },
    {
      id: "oath_eyes_in_the_dark", name: "Eyes in the Dark", type: "treachery", sphere: "encounter-treachery", portrait: "👁️",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Eyes-in-the-Dark.jpg',
      text: "Doomed 1.\nWhen Revealed: Each player must choose: either raise your threat by 1 for each questing character you control, or discard a questing character you control.",
      shadow: "Shadow: If this attack is undefended, discard an ally you control.", copies: 2,
      onReveal: function(card, game, engine, cb) {
           try {
               const snd = new Audio('./sound_effects/threat_increase.mp3');
               const volSlider = document.getElementById('volume-slider');
               snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
               snd.play().catch(()=>{});
           } catch(e) {}
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
               
               const triggerEyesInTheDarkSpiderBite = (targetEl, onComplete) => {
                   const r = targetEl.getBoundingClientRect();
                   const bite = document.createElement('div');
                   bite.style.cssText = `
                       position: fixed; left: ${r.left + r.width/2 - 110}px; top: ${r.top + r.height/2 - 110}px;
                       width: 220px; height: 235px; z-index: 100005; pointer-events: none;
                       perspective: 1000px;
                   `;

                   // Thicker top bulb and needle-fine stiletto bottom matching the Yin-Yang contour
                   const yingYangFangPath = "M 78,8 C 38,8 4,38 2,82 C 0,128 20,174 68,198 C 54,186 46,166 46,138 C 46,104 74,74 96,44 C 104,32 100,10 78,8 Z";
                   const yingYangHighlight = "M 72,16 C 38,44 18,98 66,194";

                   // Randomly select 2 to 4 fangs to drip venom each time the bite triggers
                   const drippingIndices = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 3));

                   const buildYingYangFang = (idClass, styleStr, fangIdx) => {
                       const hasDrip = drippingIndices.includes(fangIdx);
                       const dripDelay = (Math.random() * 0.45).toFixed(2);
                       const dripDuration = (0.75 + Math.random() * 0.35).toFixed(2);
                       const dripJitter = (68 + (Math.random() * 4 - 2)).toFixed(1);
                       const dripHTML = hasDrip ? `
                           <div class="creepy-venom-drip" style="left:${dripJitter}%; animation-delay:${dripDelay}s; animation-duration:${dripDuration}s;"></div>
                           <div class="creepy-venom-bead" style="left:${dripJitter}%; animation-delay:${dripDelay}s; animation-duration:${dripDuration}s;"></div>
                       ` : '';

                       return `
                           <div class="creepy-fang-container ${idClass}" style="${styleStr}">
                               <svg viewBox="0 0 102 208" style="width:100%; height:100%; overflow:visible; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.95));">
                                   <defs>
                                       <linearGradient id="yyFangBody_${idClass}" x1="0%" y1="0%" x2="55%" y2="100%">
                                           <stop offset="0%" stop-color="#000000"/>
                                           <stop offset="20%" stop-color="#18181b"/>
                                           <stop offset="40%" stop-color="#71717a"/>
                                           <stop offset="65%" stop-color="#f4f4f5"/>
                                           <stop offset="85%" stop-color="#991b1b"/>
                                           <stop offset="100%" stop-color="#ef4444"/>
                                       </linearGradient>
                                       <radialGradient id="yyFangGloss_${idClass}" cx="60%" cy="26%" r="42%">
                                           <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                                           <stop offset="50%" stop-color="#e2e8f0" stop-opacity="0.6"/>
                                           <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
                                       </radialGradient>
                                   </defs>
                                   <!-- Exact Yin-Yang Paisley Curved Body with Thicker Top Bulb and Thinner Needle Tip -->
                                   <path d="${yingYangFangPath}" fill="url(#yyFangBody_${idClass})" stroke="#18181b" stroke-width="2.5" stroke-linejoin="round"/>
                                   <!-- Specular Curved Spine Highlight -->
                                   <path d="${yingYangHighlight}" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2.8" stroke-linecap="round"/>
                                   <!-- Plumper Top Bulb Oval Gloss -->
                                   <ellipse cx="60" cy="40" rx="24" ry="18" fill="url(#yyFangGloss_${idClass})" transform="rotate(-18 60 40)"/>
                                   <!-- Needle Point Glistening Apex -->
                                   <circle cx="68" cy="198" r="1.6" fill="#ffffff" filter="drop-shadow(0 0 3px #ffffff)"/>
                               </svg>
                               ${dripHTML}
                           </div>
                       `;
                   };

                   bite.innerHTML = `
                       <style>
                           @keyframes creepyEyeGleam {
                               0%, 100% { filter: drop-shadow(0 0 4px #ff0000) drop-shadow(0 0 10px #ef4444); transform: scale(1) rotate(var(--erot, 0deg)); }
                               50% { filter: drop-shadow(0 0 8px #ff2222) drop-shadow(0 0 16px #ff0000); transform: scale(1.15) rotate(var(--erot, 0deg)); }
                           }
                           @keyframes venomThreadStretch {
                               0% { height: 4px; opacity: 0.3; transform: scaleY(0.2); }
                               35% { height: 26px; opacity: 0.95; transform: scaleY(1); }
                               70% { height: 38px; opacity: 0.85; transform: translateY(6px) scaleY(1.2); }
                               100% { height: 46px; opacity: 0; transform: translateY(20px) scaleY(1.4); }
                           }
                           @keyframes venomDropFall {
                               0% { transform: translateY(0) scale(0.35); opacity: 0; }
                               25% { transform: translateY(4px) scale(1); opacity: 0.95; }
                               65% { transform: translateY(26px) scale(0.9); opacity: 0.9; }
                               100% { transform: translateY(48px) scale(0.45); opacity: 0; }
                           }
                           .creepy-spider-eye {
                               position: absolute;
                               border-radius: 50%;
                               background: radial-gradient(circle at 35% 30%, #ffffff 0%, #ff6b6b 22%, #ef4444 55%, #7f1d1d 85%, #1f0505 100%);
                               box-shadow: inset 0 0 2px #000, 0 0 6px rgba(239, 68, 68, 0.9);
                               border: 0.8px solid #2a0808;
                               animation: creepyEyeGleam 1.1s ease-in-out infinite alternate;
                           }
                           .creepy-fang-container {
                               position: absolute;
                               transform-origin: 75% 10%;
                               transition: transform 0.16s cubic-bezier(0.2, 0.85, 0.3, 1.25);
                           }
                           .creepy-venom-drip {
                               position: absolute;
                               bottom: -28px;
                               width: 1px;
                               transform: translateX(-50%);
                               background: linear-gradient(to bottom, #ef4444 0%, #a3e635 45%, #84cc16 75%, transparent 100%);
                               animation: venomThreadStretch 0.85s ease-in infinite;
                               pointer-events: none;
                           }
                           .creepy-venom-bead {
                               position: absolute;
                               bottom: -32px;
                               width: 3.5px;
                               height: 4.5px;
                               margin-left: -1.75px;
                               border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                               background: radial-gradient(circle at 35% 35%, #fef08a 0%, #a3e635 45%, #65a30d 100%);
                               box-shadow: 0 0 6px #84cc16, 0 0 10px rgba(163, 230, 53, 0.7);
                               animation: venomDropFall 0.85s cubic-bezier(0.4, 0, 0.8, 1) infinite;
                               pointer-events: none;
                           }
                       </style>
                       <div class="spider-3d-cluster" style="width:100%; height:100%; position:relative; transform-style:preserve-3d; transform: translateZ(-130px) rotateX(-12deg) scale(0.65); opacity:0; transition: transform 0.32s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 0.25s ease-in;">
                           
                           <!-- Bluish-white glowing carapace dome seen in capture.PNG -->
                           <div style="position:absolute; left:65px; top:16px; width:90px; height:36px; border-radius:50%; background:radial-gradient(ellipse at 50% 40%, rgba(240, 249, 255, 0.9) 0%, rgba(56, 189, 248, 0.5) 45%, rgba(14, 165, 233, 0.15) 75%, transparent 100%); filter:blur(4px); pointer-events:none;"></div>

                           <!-- Tightly Clustered, Smaller, Angled 8 Creepy Red Eyes -->
                           <!-- Posterior Top Row (4 eyes) -->
                           <div class="creepy-spider-eye" style="left:76px; top:46px; width:7px; height:8px; --erot:-22deg; animation-delay:0.12s;"></div>
                           <div class="creepy-spider-eye" style="left:92px; top:40px; width:8px; height:9px; --erot:-10deg; animation-delay:0.28s;"></div>
                           <div class="creepy-spider-eye" style="right:92px; top:40px; width:8px; height:9px; --erot:10deg; animation-delay:0.24s;"></div>
                           <div class="creepy-spider-eye" style="right:76px; top:46px; width:7px; height:8px; --erot:22deg; animation-delay:0.16s;"></div>

                           <!-- Anterior Lower Row (4 eyes) -->
                           <div class="creepy-spider-eye" style="left:82px; top:61px; width:9px; height:10px; --erot:-30deg; animation-delay:0.35s;"></div>
                           <div class="creepy-spider-eye" style="left:98px; top:56px; width:13px; height:14px; --erot:-8deg; box-shadow:inset 0 0 2px #000, 0 0 10px #ff0000, 0 0 20px #ef4444; animation-delay:0s;"></div>
                           <div class="creepy-spider-eye" style="right:98px; top:56px; width:13px; height:14px; --erot:8deg; box-shadow:inset 0 0 2px #000, 0 0 10px #ff0000, 0 0 20px #ef4444; animation-delay:0.04s;"></div>
                           <div class="creepy-spider-eye" style="right:82px; top:61px; width:9px; height:10px; --erot:30deg; animation-delay:0.32s;"></div>

                           <!-- 6 Paisley Yin-Yang Fangs matching capture.png (Left angled inward, Right mirrored) -->
                           <!-- Left 3 Fangs (angled like capture.png, thicker top bulb and needle tip) -->
                           ${buildYingYangFang('fang-1', 'left:58px; top:88px; width:27px; height:53px; transform: rotateZ(-16deg);', 0)}
                           ${buildYingYangFang('fang-2', 'left:75px; top:91px; width:29px; height:58px; transform: rotateZ(-10deg);', 1)}
                           ${buildYingYangFang('fang-3', 'left:93px; top:94px; width:31px; height:63px; transform: rotateZ(-4deg);', 2)}

                           <!-- Right 3 Fangs (mirrored facing opposite direction) -->
                           ${buildYingYangFang('fang-4', 'right:93px; top:94px; width:31px; height:63px; transform: scaleX(-1) rotateZ(-4deg);', 3)}
                           ${buildYingYangFang('fang-5', 'right:75px; top:91px; width:29px; height:58px; transform: scaleX(-1) rotateZ(-10deg);', 4)}
                           ${buildYingYangFang('fang-6', 'right:58px; top:88px; width:27px; height:53px; transform: scaleX(-1) rotateZ(-16deg);', 5)}

                       </div>
                   `;
                   document.body.appendChild(bite);

                   try {
                       const snd = new Audio('./sound_effects/dark_of_mirkwood/great_spider_attack.mp3');
                       snd.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
                       snd.play().catch(()=>{});
                   } catch(e){}

                   const cluster = bite.querySelector('.spider-3d-cluster');
                   const f1 = bite.querySelector('.fang-1');
                   const f2 = bite.querySelector('.fang-2');
                   const f3 = bite.querySelector('.fang-3');
                   const f4 = bite.querySelector('.fang-4');
                   const f5 = bite.querySelector('.fang-5');
                   const f6 = bite.querySelector('.fang-6');

                   requestAnimationFrame(() => {
                       cluster.style.opacity = '1';
                       cluster.style.transform = 'translateZ(80px) rotateX(0deg) scale(1.15)';
                   });

                   setTimeout(() => {
                       // Clamp inward: left fangs angle inward rightward, right fangs angle inward leftward
                       f1.style.transform = 'translate(4px, 8px) rotateZ(-32deg)';
                       f2.style.transform = 'translate(4px, 9px) rotateZ(-22deg)';
                       f3.style.transform = 'translate(5px, 10px) rotateZ(-14deg)';
                       f4.style.transform = 'translate(-5px, 10px) scaleX(-1) rotateZ(-14deg)';
                       f5.style.transform = 'translate(-4px, 9px) scaleX(-1) rotateZ(-22deg)';
                       f6.style.transform = 'translate(-4px, 8px) scaleX(-1) rotateZ(-32deg)';
                       cluster.style.transform = 'translateZ(105px) rotateX(4deg) translateY(6px) scale(1.18)';

                       if (engine.screenShake) engine.screenShake(14, 320);
                       if (engine.spawnBurstAtElement) engine.spawnBurstAtElement(targetEl, '#dc2626', 30);

                       try {
                           const crunch = new Audio('./sound_effects/spider_attack.mp3');
                           crunch.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
                           crunch.play().catch(()=>{});
                       } catch(e){}

                       setTimeout(() => {
                           cluster.style.opacity = '0';
                           cluster.style.transform = 'translateZ(-50px) translateY(-15px) scale(0.85)';
                           setTimeout(() => {
                               bite.remove();
                               if (onComplete) onComplete();
                           }, 240);
                       }, 340);
                   }, 300);
               };

               const launchEyesInTheDarkGlobs = (amount, pIdx, onAllComplete) => {
                   const ghost = document.getElementById('encounter-limbo-ghost') || document.querySelector('[data-id="oath_eyes_in_the_dark"]');
                   const threatEl = document.getElementById('hud-threat');
                   
                   const startRect = ghost ? ghost.getBoundingClientRect() : {left: window.innerWidth/2, top: window.innerHeight/2, width: 144, height: 202};
                   const targetRect = threatEl ? threatEl.getBoundingClientRect() : {left: window.innerWidth/2, top: 20, width: 40, height: 40};

                   const startX = startRect.left + startRect.width / 2;
                   const startY = startRect.top + startRect.height / 2;
                   const endX = targetRect.left + targetRect.width / 2;
                   const endY = targetRect.top + targetRect.height / 2;
                   
                   let globsLanded = 0;
                   
                   for (let i = 0; i < amount; i++) {
                       setTimeout(() => {
                           const glob = document.createElement('div');
                           glob.style.cssText = `
                               position: fixed; left: ${startX}px; top: ${startY}px;
                               width: 0px; height: 0px;
                               z-index: 100000; pointer-events: none;
                               perspective: 800px; transform-style: preserve-3d;
                           `;
                           
                           glob.innerHTML = `
                               <div class="glob-projectile" style="position:absolute; top:-25px; left:-25px; width:50px; height:50px; transform-style:preserve-3d;">
                                   <!-- Detailed Trailing Web Tail -->
                                   <svg class="glob-tail" viewBox="0 0 160 50" style="position:absolute; top:0; left:-135px; width:160px; height:50px; filter:drop-shadow(0 0 5px #ffffff) drop-shadow(0 0 8px rgba(186,230,253,0.8)); overflow:visible;">
                                       <path d="M160 25 Q110 4 0 16" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="2.6" stroke-linecap="round"/>
                                       <path d="M160 25 Q95 46 12 36" fill="none" stroke="rgba(226,232,240,0.75)" stroke-width="2.2" stroke-linecap="round"/>
                                       <path d="M160 25 Q75 25 0 25" fill="none" stroke="#ffffff" stroke-width="4.2" stroke-linecap="round"/>
                                       <path d="M125 18 L125 32 M85 12 L85 38 M45 15 L45 35" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.8"/>
                                       <circle cx="20" cy="25" r="2.5" fill="#ffffff"/>
                                       <circle cx="65" cy="25" r="3.2" fill="#ffffff"/>
                                       <circle cx="110" cy="25" r="3.6" fill="#ffffff"/>
                                   </svg>
                                   
                                   <!-- 3D Core -->
                                   <div class="glob-core" style="position:absolute; inset:0; border-radius:50%; background: radial-gradient(circle at 30% 30%, #ffffff 0%, #cbd5e1 40%, #64748b 80%, #0f172a 100%); box-shadow: 0 5px 15px rgba(0,0,0,0.6), 0 0 10px #ffffff, inset -5px -5px 10px rgba(0,0,0,0.5); transform: translateZ(10px); transform-style:preserve-3d;">
                                       <div style="position:absolute; inset:-2px; border-radius:50%; border: 3px solid rgba(255,255,255,0.85); transform: rotateX(45deg) rotateY(45deg); pointer-events:none;"></div>
                                       <div style="position:absolute; inset:-2px; border-radius:50%; border: 2px solid rgba(226,232,240,0.95); transform: rotateX(-45deg) rotateY(-30deg); pointer-events:none;"></div>
                                   </div>
                               </div>
                           `;
                           document.body.appendChild(glob);

                           try {
                               const snd = new Audio('./sound_effects/dark_of_mirkwood/spider_den_glob.mp3');
                               snd.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25) * 0.7;
                               snd.play().catch(()=>{});
                           } catch(e) {}

                           const launchTime = performance.now();
                           const flightDuration = 450 + Math.random() * 150;
                           const arcDir = (i % 2 === 0 ? 1 : -1) * (40 + Math.random() * 50);
                           const p0 = { x: startX, y: startY };
                           const p1 = { x: (startX + endX) / 2 + arcDir, y: (startY + endY) / 2 - 120 };
                           const p2 = { x: endX, y: endY };

                           const animateGlob = (now) => {
                               const elapsed = now - launchTime;
                               const progress = Math.min(1, elapsed / flightDuration);
                               const t = progress;
                               const invT = 1 - t;
                               const curX = invT * invT * p0.x + 2 * invT * t * p1.x + t * t * p2.x;
                               const curY = invT * invT * p0.y + 2 * invT * t * p1.y + t * t * p2.y;

                               const vx = 2 * invT * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
                               const vy = 2 * invT * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
                               const angleDeg = Math.atan2(vy, vx) * (180 / Math.PI);

                               glob.style.left = `${curX}px`;
                               glob.style.top = `${curY}px`;
                               
                               const proj = glob.querySelector('.glob-projectile');
                               const core = glob.querySelector('.glob-core');
                               if (proj) {
                                   proj.style.transform = `scale(${0.8 + Math.sin(progress * Math.PI) * 0.4}) rotateZ(${angleDeg}deg)`;
                               }
                               if (core) {
                                   core.style.transform = `rotateX(${progress * 720}deg) rotateY(${progress * 360}deg)`;
                               }
                               
                               if (progress < 1) {
                                   requestAnimationFrame(animateGlob);
                               } else {
                                   glob.remove();
                                   
                                   // SPLATTER INTO JAGGED, TATTERED NON-CIRCULAR 3D WEB
                                   const splatter = document.createElement('div');
                                   splatter.style.cssText = `
                                       position: fixed; left: ${endX}px; top: ${endY}px;
                                       width: 0px; height: 0px; z-index: 99999;
                                       pointer-events: none; perspective: 1000px;
                                   `;

                                   // Ragged, irregular polygon paths that break completely away from circles
                                   const clipPolygons = [
                                       'polygon(12% 0%, 28% 18%, 52% 4%, 68% 22%, 92% 8%, 84% 38%, 100% 52%, 82% 74%, 96% 94%, 64% 86%, 48% 100%, 32% 84%, 4% 92%, 18% 66%, 0% 48%, 22% 28%)',
                                       'polygon(18% 2%, 35% 22%, 58% 8%, 76% 26%, 98% 12%, 88% 44%, 96% 62%, 78% 80%, 92% 98%, 58% 88%, 42% 96%, 26% 80%, 2% 86%, 14% 58%, 0% 36%, 18% 18%)',
                                       'polygon(6% 8%, 24% 24%, 46% 0%, 72% 16%, 90% 2%, 86% 32%, 100% 46%, 76% 70%, 98% 86%, 66% 80%, 54% 100%, 38% 88%, 0% 96%, 16% 70%, 2% 54%, 26% 36%)'
                                   ];
                                   
                                   let webHTML = '';
                                   for(let w = 0; w < 3; w++) {
                                       const rotZ = Math.random() * 360;
                                       const rotX = (Math.random() - 0.5) * 65;
                                       const rotY = (Math.random() - 0.5) * 65;
                                       const poly = clipPolygons[w % clipPolygons.length];

                                       webHTML += `
                                           <div style="position:absolute; top:-75px; left:-75px; width:150px; height:150px; 
                                               background: repeating-radial-gradient(circle at center, transparent 0, transparent 9px, rgba(255,255,255,0.85) 10px, rgba(226,232,240,0.95) 11.5px), 
                                                           repeating-conic-gradient(from 0deg, rgba(255,255,255,0.95) 0deg, rgba(255,255,255,0.95) 2.2deg, transparent 3.5deg, transparent 28deg);
                                               clip-path: ${poly};
                                               opacity:0;
                                               transform-style: preserve-3d;
                                               transform: translateZ(${w*12}px) rotateZ(${rotZ}deg) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(0.1);
                                               transition: transform 0.38s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 0.2s ease-out;
                                               filter: drop-shadow(0 6px 14px rgba(0,0,0,0.95));"
                                               class="web-splat-layer">
                                           </div>
                                       `;
                                   }
                                   splatter.innerHTML = webHTML;
                                   document.body.appendChild(splatter);
                                   
                                   requestAnimationFrame(() => {
                                       splatter.querySelectorAll('.web-splat-layer').forEach((layer, lIdx) => {
                                           layer.style.opacity = '1';
                                           const origTransform = layer.style.transform.replace('scale(0.1)', `scale(${1.05 + lIdx * 0.28})`);
                                           layer.style.transform = origTransform;
                                       });
                                   });
                                   
                                   setTimeout(() => {
                                       splatter.querySelectorAll('.web-splat-layer').forEach(layer => {
                                           layer.style.transition = 'opacity 0.45s ease-in, transform 0.45s ease-in';
                                           layer.style.opacity = '0';
                                           layer.style.transform += ' scale(1.22)';
                                       });
                                       setTimeout(() => splatter.remove(), 480);
                                   }, 750);

                                   try {
                                       const incSnd = new Audio('./sound_effects/threat_increase.mp3');
                                       incSnd.volume = parseFloat(document.getElementById('volume-slider')?.value || 0.25);
                                       incSnd.play().catch(()=>{});
                                   } catch(e) {}
                                   
                                   game.threats[pIdx] += 1;
                                   if (game.numPlayers === 1) game.threat += 1;
                                   engine.render();
                                   
                                   if (threatEl) {
                                       threatEl.style.transform = 'scale(1.4)';
                                       setTimeout(() => threatEl.style.transform = 'scale(1)', 100);
                                   }
                                   if (engine.spawnBurstAtElement) engine.spawnBurstAtElement(threatEl, '#ffffff', 20);
                                   if (engine.screenShake) engine.screenShake(6, 200);
                                   
                                   const diffEl = document.getElementById('hud-threat-diff');
                                   if (diffEl) {
                                       diffEl.textContent = `+${globsLanded + 1}`;
                                       diffEl.classList.remove('threat-diff-active');
                                       void diffEl.offsetWidth;
                                       diffEl.classList.add('threat-diff-active');
                                       setTimeout(() => { diffEl.classList.remove('threat-diff-active'); diffEl.textContent = ''; }, 3500);
                                   }
                                   
                                   globsLanded++;
                                   if (globsLanded === amount) {
                                       setTimeout(() => {
                                           if (game.threats[pIdx] >= 50) engine.eliminatePlayer(pIdx);
                                           if (onAllComplete) onAllComplete();
                                       }, 400);
                                   }
                               }
                           };
                           requestAnimationFrame(animateGlob);
                       }, i * 300);
                   }
               };

               let pIdx = 0;
               const processNext = () => {
                 while(pIdx < game.numPlayers && game.eliminated[pIdx]) pIdx++;
                 if(pIdx >= game.numPlayers) {
                    if(cb) cb();
                    return;
                 }
                 if (game.activeTabPlayerIdx !== pIdx && engine.window._switchTab) {
                    engine.window._switchTab(pIdx);
                 }
                 const questing = (game.selectedHeroIds || []).map(uid => [...game.heroes, ...game.allies].find(c => c._uid === uid)).filter(c => c && (c._ownerIdx === undefined ? 0 : c._ownerIdx) === pIdx);

                 if(questing.length > 0) {
                    const promptHTML = `
                      <div style="font-size:1.6rem;line-height:1.5;color:var(--parchment);text-align:center;">
                        <span style="font-size:2.2rem;font-weight:bold;color:var(--gold-bright);display:block;margin-bottom:15px;">Eyes in the Dark</span>
                        Player ${pIdx+1}: Choose to either raise your threat by ${questing.length}, or discard a questing character you control:
                      </div>
                    `;
                    engine.showConfirmModal('Eyes in the Dark', promptHTML,
                      () => {
                         engine.toast('Eyes in the Dark', `Player ${pIdx+1} threat raised by ${questing.length}.`, 'danger');
                         launchEyesInTheDarkGlobs(questing.length, pIdx, () => {
                            pIdx++; processNext();
                         });
                      },
                      () => {
                         engine.showHeroPicker('Eyes in the Dark', 'Choose a questing character to discard:', questing, (chosen) => {
                            if(chosen) {
                               const executeDiscard = () => {
                                   try {
                                       if (chosen.isHero) {
                                          chosen.damage = chosen.hp || 99;
                                          if (engine.checkHeroDeath) engine.checkHeroDeath(chosen);
                                          else if (window.checkHeroDeath) window.checkHeroDeath(chosen);
                                       } else {
                                          game.allies = game.allies.filter(a => a._uid !== chosen._uid);
                                          const discardPile = (game.playerDiscards && game.playerDiscards[pIdx]) ? game.playerDiscards[pIdx] : game.playerDiscard;
                                          if (engine.discardCard) engine.discardCard(chosen, discardPile, false);
                                          else if (window.discardCard) window.discardCard(chosen, discardPile, false);
                                          
                                          if (window.onAllyLeftPlay) window.onAllyLeftPlay(chosen.name, chosen._ownerIdx);
                                       }
                                       game.selectedHeroIds = (game.selectedHeroIds || []).filter(uid => uid !== chosen._uid);
                                       engine.toast('Eyes in the Dark', `Discarded ${chosen.name}.`, 'danger');
                                       if (window.updateQuestWillpowerDisplay) window.updateQuestWillpowerDisplay();
                                       engine.render();
                                   } catch(err) {
                                       console.error("Eyes in the Dark Discard Execution Error:", err);
                                   }

                                   setTimeout(() => {
                                       pIdx++;
                                       processNext();
                                   }, 550);
                               };

                               const targetEl = document.querySelector(`[data-uid="${chosen._uid}"]`);
                               if (targetEl && typeof window.triggerEyesInTheDarkSpiderBite === 'function') {
                                   window.triggerEyesInTheDarkSpiderBite(targetEl, executeDiscard);
                               } else {
                                   executeDiscard();
                               }
                            } else {
                               engine.toast('Eyes in the Dark', `Player ${pIdx+1} threat raised by ${questing.length}.`, 'danger');
                               launchEyesInTheDarkGlobs(questing.length, pIdx, () => {
                                  pIdx++; processNext();
                               });
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
                         const executeDiscard = () => {
                             game.allies = game.allies.filter(a => a._uid !== chosen._uid);
                             engine.discardCard(chosen, game.playerDiscards[targetPIdx] || game.playerDiscard, false);
                             engine.window.onAllyLeftPlay(chosen.name, chosen._ownerIdx);
                             engine.toast('Eyes in the Dark', `Discarded ${chosen.name}.`, 'danger');
                             engine.render();
                             next();
                         };
                         const targetEl = document.querySelector(`[data-uid="${chosen._uid}"]`);
                         if (targetEl && typeof window.triggerEyesInTheDarkSpiderBite === 'function') {
                             window.triggerEyesInTheDarkSpiderBite(targetEl, executeDiscard);
                         } else {
                             executeDiscard();
                         }
                      } else {
                         next();
                      }
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
        if (typeof patchGoblinModifiers === 'function') patchGoblinModifiers();
        const g = game || window.game || (window.LotrEngine && window.LotrEngine.game);
        if (!g || !g.engagedEnemies) return 0;
        const isGoblin = (c.trait || '').includes('Goblin') && c.id !== 'oath_goblin_troop' && c.id !== 'goblin_troop' && c.id !== 'nibin_goblin_troop' && c.name !== 'Goblin Troop';
        if (!isGoblin) return 0;
        const isEngaged = g.engagedEnemies.some(e => e._uid === c._uid);
        if (!isEngaged) return 0;
        const cPIdx = c._engagedWithPlayerIdx !== undefined ? c._engagedWithPlayerIdx : (g.activeTabPlayerIdx || 0);
        const hasTroop = g.engagedEnemies.some(e => 
            (e.id === 'oath_goblin_troop' || e.id === 'goblin_troop' || e.id === 'nibin_goblin_troop' || e.name === 'Goblin Troop') &&
            !e._dead && (e.damage || 0) < (e.hp || 6) &&
            (e._engagedWithPlayerIdx !== undefined ? e._engagedWithPlayerIdx : (g.activeTabPlayerIdx || 0)) === cPIdx &&
            e._uid !== c._uid
        );
        return hasTroop ? 1 : 0;
    },
    getDefenseMod: function(c, game) {
        if (typeof patchGoblinModifiers === 'function') patchGoblinModifiers();
        const g = game || window.game || (window.LotrEngine && window.LotrEngine.game);
        if (!g || !g.engagedEnemies) return 0;
        const isGoblin = (c.trait || '').includes('Goblin') && c.id !== 'oath_goblin_troop' && c.id !== 'goblin_troop' && c.id !== 'nibin_goblin_troop' && c.name !== 'Goblin Troop';
        if (!isGoblin) return 0;
        const isEngaged = g.engagedEnemies.some(e => e._uid === c._uid);
        if (!isEngaged) return 0;
        const cPIdx = c._engagedWithPlayerIdx !== undefined ? c._engagedWithPlayerIdx : (g.activeTabPlayerIdx || 0);
        const hasTroop = g.engagedEnemies.some(e => 
            (e.id === 'oath_goblin_troop' || e.id === 'goblin_troop' || e.id === 'nibin_goblin_troop' || e.name === 'Goblin Troop') &&
            !e._dead && (e.damage || 0) < (e.hp || 6) &&
            (e._engagedWithPlayerIdx !== undefined ? e._engagedWithPlayerIdx : (g.activeTabPlayerIdx || 0)) === cPIdx &&
            e._uid !== c._uid
        );
        return hasTroop ? 1 : 0;
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
                    const res = origAtk.apply(this, arguments);
                    if (res > 0 && c && (c.trait || '').includes('Goblin')) {
                        return 0; // Prevent duplicate +1; oath_global_goblin_modifiers handles the single source of truth
                    }
                    return res;
                };
            }
            if (card.getDefenseMod) {
                const origDef = card.getDefenseMod;
                card.getDefenseMod = function(c, game) {
                    const res = origDef.apply(this, arguments);
                    if (res > 0 && c && (c.trait || '').includes('Goblin')) {
                        return 0; // Prevent duplicate +1; oath_global_goblin_modifiers handles the single source of truth
                    }
                    return res;
                };
            }
        }
    });
};
patchGoblinModifiers();
setTimeout(patchGoblinModifiers, 250);
setTimeout(patchGoblinModifiers, 800);

window.LotrExpansions['the_oath'].encounterCards.push(
  {
      id: "oath_abandoned_camp", name: "Abandoned Camp", type: "location", sphere: "encounter-location", portrait: "🏕️",
      img: 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Abandoned-Camp.jpg',
      threat: 2, questPts: 3, trait: "Forest",
      text: "Response: After the players travel to Abandoned Camp, the first player discards the top card of their deck. If that card is an ally, put it into play under their control.\n\nTravel: Discard the top card of the encounter deck. If that card is an enemy, add it to the staging area.",
      copies: 1,
      onTravel: function(loc, game, engine, proceedTravel) {
          try {
              const campSnd = new Audio('./sound_effects/dark_of_mirkwood/abandoned_camp.mp3');
              const vol = document.getElementById('volume-slider');
              campSnd.volume = vol ? parseFloat(vol.value) : 0.25;
              campSnd.play().catch(() => {});
          } catch(e) {}
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
                                  
                                  if (engine.window.SoundFX && typeof engine.window.SoundFX.playCardPlay === 'function') {
                                      engine.window.SoundFX.playCardPlay();
                                  } else {
                                      try {
                                          const playSnd = new Audio('./sound_effects/card_play.wav');
                                          const vol = document.getElementById('volume-slider');
                                          playSnd.volume = vol ? parseFloat(vol.value) : 0.25;
                                          playSnd.play().catch(()=>{});
                                      } catch(e) {}
                                  }
                                  
                                  if (engine.window._animatePlayerDeckToZone) {
                                      engine.window._animatePlayerDeckToZone(topP, 'player-content', finalizeAlly, 900);
                                  } else if (startRect && engine.window.animateAllyDeployment && engine.window.getLayoutLandingRect) {
                                      const destRect = engine.window.getLayoutLandingRect('player-content');
                                      engine.window.animateAllyDeployment(topP, startRect, destRect, finalizeAlly);
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

                  // --- DUAL SPIRIT TETHER VISUAL EFFECT ---
                  const locEl = document.querySelector(`[data-uid="${loc._uid}"]`);
                  const pDeckEl = document.getElementById('player-deck-pile');
                  const eDeckEl = document.getElementById('encounter-deck-pile');

                  if (!locEl || !pDeckEl || !eDeckEl) {
                      setTimeout(runEncounterEffect, 200);
                      return;
                  }

                  const locRect = locEl.getBoundingClientRect();
                  const pRect = pDeckEl.getBoundingClientRect();
                  const eRect = eDeckEl.getBoundingClientRect();

                  const sX = locRect.left + locRect.width / 2;
                  const sY = locRect.top + locRect.height / 2;
                  const pX = pRect.left + pRect.width / 2;
                  const pY = pRect.top + pRect.height / 2;
                  const eX = eRect.left + eRect.width / 2;
                  const eY = eRect.top + eRect.height / 2;

                  // Complex interwoven bezier control points for the multi-layered beams
                  const pCpX1 = sX + (pX - sX) * 0.3 - 180;
                  const pCpY1 = sY + (pY - sY) * 0.6 - 250;
                  const pCpX2 = sX + (pX - sX) * 0.7 + 120;
                  const pCpY2 = sY + (pY - sY) * 0.4 + 50;

                  const eCpX1 = sX + (eX - sX) * 0.6 + 200;
                  const eCpY1 = sY + (eY - sY) * 0.3 - 220;
                  const eCpX2 = sX + (eX - sX) * 0.3 - 100;
                  const eCpY2 = sY + (eY - sY) * 0.7 + 100;

                  const dPlayer1 = `M ${sX},${sY} Q ${pCpX1},${pCpY1} ${pX},${pY}`;
                  const dPlayer2 = `M ${sX},${sY} Q ${pCpX2},${pCpY2} ${pX},${pY}`;
                  const dPlayer3 = `M ${sX},${sY} Q ${(sX+pX)/2},${(sY+pY)/2 - 120} ${pX},${pY}`;

                  const dEnc1 = `M ${sX},${sY} Q ${eCpX1},${eCpY1} ${eX},${eY}`;
                  const dEnc2 = `M ${sX},${sY} Q ${eCpX2},${eCpY2} ${eX},${eY}`;
                  const dEnc3 = `M ${sX},${sY} Q ${(sX+eX)/2},${(sY+eY)/2 - 120} ${eX},${eY}`;

                  const overlay = document.createElement('div');
                  overlay.style.cssText = 'position:fixed; inset:0; z-index:9999; pointer-events:none; overflow:visible;';
                  overlay.innerHTML = `
                      <style>
                          @keyframes acDarken {
                              0% { opacity: 0; }
                              15% { opacity: 1; }
                              85% { opacity: 1; }
                              100% { opacity: 0; }
                          }
                          @keyframes acCampGather {
                              0% { transform: translate(-50%, -50%) scale(1.5); filter: brightness(1); opacity: 0; }
                              20% { opacity: 1; }
                              100% { transform: translate(-50%, -50%) scale(0.2); filter: brightness(3) drop-shadow(0 0 30px #ef4444); opacity: 0; }
                          }
                          @keyframes acVortexSpin {
                              0% { transform: translate(-50%, -50%) rotate(0deg) scale(1.5); opacity: 0; }
                              20% { opacity: 1; }
                              80% { transform: translate(-50%, -50%) rotate(360deg) scale(0.5); opacity: 1; filter: brightness(1.5); }
                              100% { transform: translate(-50%, -50%) rotate(450deg) scale(0); opacity: 0; filter: brightness(2); }
                          }
                          @keyframes acTetherFlow {
                              0% { stroke-dashoffset: 1000; opacity: 0; }
                              6% { opacity: 0.95; }
                              100% { stroke-dashoffset: 0; opacity: 0.95; }
                          }
                          @keyframes acSmokeVaporizeGold {
                              0% { opacity: 0.95; filter: url(#acBlendGold) blur(0px); }
                              40% { opacity: 0.8; filter: url(#acBlendGold) blur(8px) brightness(1.3); }
                              100% { opacity: 0; filter: url(#acBlendGold) blur(24px) brightness(0.6); }
                          }
                          @keyframes acSmokeVaporizeRed {
                              0% { opacity: 0.95; filter: url(#acBlendRed) blur(0px); }
                              40% { opacity: 0.8; filter: url(#acBlendRed) blur(9px) brightness(1.3); }
                              100% { opacity: 0; filter: url(#acBlendRed) blur(26px) brightness(0.5); }
                          }
                          @keyframes acPuffFade {
                              0% { transform: translate(-50%, -50%) scale(0.5) rotate(0deg); opacity: 0; }
                              20% { opacity: 0.8; }
                              60% { opacity: 0.6; }
                              100% { transform: translate(-50%, -50%) translateY(var(--driftY, -24px)) scale(2.4) rotate(var(--rot, 35deg)); opacity: 0; filter: blur(10px); }
                          }
                          @keyframes acLocPulse {
                              0% { filter: brightness(1) drop-shadow(0 0 0px transparent); transform: scale(1); }
                              30% { filter: brightness(1.8) drop-shadow(0 0 25px #f5d76e) drop-shadow(0 0 40px #ef4444); transform: scale(1.08); }
                              100% { filter: brightness(1) drop-shadow(0 0 0px transparent); transform: scale(1); }
                          }
                          @keyframes acDeckImpact {
                              0% { transform: scale(1) translateY(0); }
                              20% { transform: scale(1.2) translateY(-12px); }
                              60% { transform: scale(0.9) translateY(6px); }
                              100% { transform: scale(1) translateY(0); }
                          }
                          @keyframes acImpactRing {
                              0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; border-width: 12px; }
                              100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; border-width: 1px; }
                          }
                      </style>

                      <!-- Darken background -->
                      <div style="position:absolute; inset:0; background:radial-gradient(circle at ${sX}px ${sY}px, transparent 5%, rgba(10, 0, 0, 0.92) 75%); animation: acDarken 2.1s ease-in-out forwards; mix-blend-mode: multiply;"></div>

                      <!-- Gathering Energy Vortex -->
                      <div style="position:absolute; left:${sX}px; top:${sY}px; width:220px; height:220px; border-radius:50%; animation: acVortexSpin 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
                          <div style="position:absolute; inset:10px; border:6px solid transparent; border-top:6px solid rgba(245, 215, 110, 0.9); border-right:6px solid rgba(245, 215, 110, 0.9); border-radius:50%; box-shadow:0 0 20px #f5d76e; filter:blur(1px);"></div>
                          <div style="position:absolute; inset:25px; border:6px solid transparent; border-bottom:6px solid rgba(239, 68, 68, 0.9); border-left:6px solid rgba(239, 68, 68, 0.9); border-radius:50%; box-shadow:0 0 20px #ef4444; filter:blur(1px);"></div>
                          <div style="position:absolute; inset:50px; border-radius:50%; box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.8);"></div>
                      </div>
                      
                      <!-- Energy Implosion -->
                      <div style="position:absolute; left:${sX}px; top:${sY}px; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle, #fff 10%, #f5d76e 40%, transparent 70%); mix-blend-mode: screen; animation: acCampGather 0.4s cubic-bezier(0.5, 0, 1, 1) forwards;"></div>

                      <svg style="position:absolute; inset:0; width:100%; height:100%; overflow:visible;">
                          <defs>
                              <linearGradient id="goldTetherGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                                  <stop offset="0%" stop-color="#ffffff"/>
                                  <stop offset="30%" stop-color="#f5d76e"/>
                                  <stop offset="70%" stop-color="#d4af37"/>
                                  <stop offset="100%" stop-color="#fef08a"/>
                              </linearGradient>
                              <linearGradient id="redTetherGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                                  <stop offset="0%" stop-color="#ffffff"/>
                                  <stop offset="30%" stop-color="#ef4444"/>
                                  <stop offset="70%" stop-color="#991b1b"/>
                                  <stop offset="100%" stop-color="#450a0a"/>
                              </linearGradient>
                              <filter id="acBlendGold" x="-30%" y="-30%" width="160%" height="160%">
                                  <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
                                      <animate attributeName="baseFrequency" values="0.015;0.03;0.015" dur="1s" repeatCount="indefinite"/>
                                  </feTurbulence>
                                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" result="warped"/>
                                  <feGaussianBlur in="warped" stdDeviation="2.5" result="soft"/>
                                  <feMerge>
                                      <feMergeNode in="soft"/>
                                      <feMergeNode in="warped"/>
                                  </feMerge>
                              </filter>
                              <filter id="acBlendRed" x="-30%" y="-30%" width="160%" height="160%">
                                  <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise">
                                      <animate attributeName="baseFrequency" values="0.02;0.04;0.02" dur="0.8s" repeatCount="indefinite"/>
                                  </feTurbulence>
                                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G" result="warped"/>
                                  <feGaussianBlur in="warped" stdDeviation="3" result="soft"/>
                                  <feMerge>
                                      <feMergeNode in="soft"/>
                                      <feMergeNode in="warped"/>
                                  </feMerge>
                              </filter>
                          </defs>

                          <!-- Player Streams -->
                          <g id="ac-gold-streams" filter="url(#acBlendGold)">
                              <path d="${dPlayer1}" fill="none" stroke="rgba(245, 215, 110, 0.7)" stroke-width="18" stroke-linecap="round" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" style="opacity:0; animation: acTetherFlow 0.7s 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) both;" />
                              <path d="${dPlayer2}" fill="none" stroke="rgba(255, 255, 255, 0.85)" stroke-width="10" stroke-linecap="round" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" style="opacity:0; animation: acTetherFlow 0.7s 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) both;" />
                              <path d="${dPlayer3}" fill="none" stroke="url(#goldTetherGrad)" stroke-width="5" stroke-linecap="round" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" style="opacity:0; animation: acTetherFlow 0.7s 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) both;" />
                          </g>

                          <!-- Encounter Streams -->
                          <g id="ac-red-streams" filter="url(#acBlendRed)">
                              <path d="${dEnc1}" fill="none" stroke="rgba(220, 38, 38, 0.7)" stroke-width="22" stroke-linecap="round" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" style="opacity:0; animation: acTetherFlow 0.7s 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) both;" />
                              <path d="${dEnc2}" fill="none" stroke="rgba(69, 10, 10, 0.9)" stroke-width="14" stroke-linecap="round" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" style="opacity:0; animation: acTetherFlow 0.7s 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) both;" />
                              <path d="${dEnc3}" fill="none" stroke="url(#redTetherGrad)" stroke-width="5.5" stroke-linecap="round" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" style="opacity:0; animation: acTetherFlow 0.7s 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) both;" />
                          </g>
                      </svg>
                  `;
                  document.body.appendChild(overlay);

                  // Trigger Card Pulse
                  locEl.style.animation = 'acLocPulse 0.5s ease-in-out forwards';

                  // Gathering Siphon Particles
                  for (let i = 0; i < 28; i++) {
                      setTimeout(() => {
                          const angle = Math.random() * Math.PI * 2;
                          const dist = 120 + Math.random() * 200;
                          const px = sX + Math.cos(angle) * dist;
                          const py = sY + Math.sin(angle) * dist;
                          const part = document.createElement('div');
                          const color = Math.random() > 0.5 ? '#f5d76e' : '#ef4444';
                          part.style.cssText = `position:fixed; left:${px}px; top:${py}px; width:5px; height:5px; background:${color}; box-shadow:0 0 10px ${color}, 0 0 20px #fff; border-radius:50%; z-index:10000; pointer-events:none; transition:all 0.25s cubic-bezier(0.5, 0, 1, 1);`;
                          document.body.appendChild(part);

                          requestAnimationFrame(() => {
                              requestAnimationFrame(() => {
                                  part.style.left = sX + 'px';
                                  part.style.top = sY + 'px';
                                  part.style.opacity = '0';
                                  part.style.transform = 'scale(0.1)';
                              });
                          });
                          setTimeout(() => part.remove(), 250);
                      }, Math.random() * 250);
                  }

                  // Sound effects
                  try {
                      const gatherSnd = new Audio('./sound_effects/dark_of_mirkwood/tangled_grove.mp3'); 
                      const v = document.getElementById('volume-slider');
                      gatherSnd.volume = v ? parseFloat(v.value) : 0.25;
                      gatherSnd.playbackRate = 2.0;
                      gatherSnd.play().catch(()=>{});
                  } catch(e) {}

                  // Start the actual projectile beams after 400ms gather phase
                  setTimeout(() => {
                      if (engine.window.SoundFX && typeof engine.window.SoundFX.playWhoosh === 'function') {
                          engine.window.SoundFX.playWhoosh();
                          setTimeout(() => engine.window.SoundFX.playWhoosh(), 80);
                      }

                      const startT = performance.now();
                      const dur = 700;
                      
                      // Smooth Spherical Glowing Orb Heads
                      const pHead = document.createElement('div');
                      pHead.style.cssText = 'position:fixed; width:48px; height:48px; margin-left:-24px; margin-top:-24px; z-index:10000; pointer-events:none; display:flex; align-items:center; justify-content:center;';
                      pHead.innerHTML = `
                          <div style="position:absolute; inset:0; background:radial-gradient(circle at 35% 35%, #ffffff 0%, #fef08a 35%, #f5d76e 65%, transparent 85%); border-radius:50%; filter:drop-shadow(0 0 16px #f5d76e) drop-shadow(0 0 35px #eab308);"></div>
                          <div style="position:absolute; inset:6px; background:radial-gradient(circle, #ffffff 30%, transparent 70%); border-radius:50%;"></div>
                      `;
                      
                      const eHead = document.createElement('div');
                      eHead.style.cssText = 'position:fixed; width:48px; height:48px; margin-left:-24px; margin-top:-24px; z-index:10000; pointer-events:none; display:flex; align-items:center; justify-content:center;';
                      eHead.innerHTML = `
                          <div style="position:absolute; inset:0; background:radial-gradient(circle at 35% 35%, #fee2e2 0%, #ef4444 40%, #7f1d1d 75%, transparent 90%); border-radius:50%; filter:drop-shadow(0 0 18px #ef4444) drop-shadow(0 0 38px #b91c1c);"></div>
                          <div style="position:absolute; inset:6px; background:radial-gradient(circle, #ffffff 20%, #f87171 60%, transparent 80%); border-radius:50%; mix-blend-mode:screen;"></div>
                      `;
                      
                      document.body.appendChild(pHead);
                      document.body.appendChild(eHead);

                      const getBezierPoint = (t, p0, p1, p2) => {
                          const inv = 1 - t;
                          return inv * inv * p0 + 2 * inv * t * p1 + t * t * p2;
                      };

                      let particlesEmitted = 0;

                      const animLoop = (now) => {
                          const elapsed = now - startT;
                          let t = Math.min(1, elapsed / dur);
                          t = 1 - Math.pow(1 - t, 2.5);

                          const curPx = getBezierPoint(t, sX, (sX+pX)/2, pX);
                          const curPy = getBezierPoint(t, sY, (sY+pY)/2 - 120, pY);
                          
                          const curEx = getBezierPoint(t, sX, (sX+eX)/2, eX);
                          const curEy = getBezierPoint(t, sY, (sY+eY)/2 - 120, eY);

                          pHead.style.left = curPx + 'px';
                          pHead.style.top = curPy + 'px';
                          eHead.style.left = curEx + 'px';
                          eHead.style.top = curEy + 'px';

                          // Trail emitting
                          if (t > particlesEmitted * 0.03 && t < 0.95) {
                              particlesEmitted++;
                              if (engine.spawnBurstAtElement) {
                                  const vP = document.createElement('div'); vP.style.cssText=`position:fixed;left:${curPx}px;top:${curPy}px;width:1px;height:1px;`; document.body.appendChild(vP);
                                  engine.spawnBurstAtElement(vP, '#f5d76e', 4);
                                  vP.remove();
                                  
                                  const vE = document.createElement('div'); vE.style.cssText=`position:fixed;left:${curEx}px;top:${curEy}px;width:1px;height:1px;`; document.body.appendChild(vE);
                                  engine.spawnBurstAtElement(vE, '#ef4444', 4);
                                  vE.remove();
                              }
                          }

                          if (t < 1) {
                              requestAnimationFrame(animLoop);
                          } else {
                              pHead.remove();
                              eHead.remove();

                              // Vaporize the SVG paths into smoke on impact
                              const gGold = overlay.querySelector('#ac-gold-streams');
                              const gRed = overlay.querySelector('#ac-red-streams');
                              if (gGold) gGold.style.animation = 'acSmokeVaporizeGold 0.55s ease-out forwards';
                              if (gRed) gRed.style.animation = 'acSmokeVaporizeRed 0.55s ease-out forwards';

                              // Billowing smoke puffs along the full arc trajectories
                              const numPuffs = 12;
                              for (let i = 0; i <= numPuffs; i++) {
                                  const stepT = i / numPuffs;
                                  const pPtX = getBezierPoint(stepT, sX, (sX + pX) / 2, pX);
                                  const pPtY = getBezierPoint(stepT, sY, (sY + pY) / 2 - 120, pY);
                                  const ePtX = getBezierPoint(stepT, sX, (sX + eX) / 2, eX);
                                  const ePtY = getBezierPoint(stepT, sY, (sY + eY) / 2 - 120, eY);

                                  setTimeout(() => {
                                      // Gold/Amber smoke puff
                                      const pPuff = document.createElement('div');
                                      const pSize = 45 + Math.random() * 32;
                                      pPuff.style.cssText = `
                                          position: fixed; left: ${pPtX}px; top: ${pPtY}px;
                                          width: ${pSize}px; height: ${pSize}px;
                                          border-radius: 50%;
                                          background: radial-gradient(circle at 45% 45%, rgba(255, 255, 255, 0.8) 0%, rgba(254, 240, 138, 0.45) 30%, rgba(245, 215, 110, 0.2) 60%, transparent 75%);
                                          filter: blur(4px);
                                          pointer-events: none; z-index: 9998;
                                          --driftY: ${-14 - Math.random() * 22}px;
                                          --rot: ${(Math.random() - 0.5) * 55}deg;
                                          animation: acPuffFade 0.6s cubic-bezier(0.2, 0.8, 0.25, 1) forwards;
                                      `;
                                      document.body.appendChild(pPuff);
                                      setTimeout(() => pPuff.remove(), 620);

                                      // Red/Crimson smoke puff
                                      const ePuff = document.createElement('div');
                                      const eSize = 48 + Math.random() * 34;
                                      ePuff.style.cssText = `
                                          position: fixed; left: ${ePtX}px; top: ${ePtY}px;
                                          width: ${eSize}px; height: ${eSize}px;
                                          border-radius: 50%;
                                          background: radial-gradient(circle at 45% 45%, rgba(254, 202, 202, 0.75) 0%, rgba(239, 68, 68, 0.45) 35%, rgba(69, 10, 10, 0.25) 60%, transparent 75%);
                                          filter: blur(5px);
                                          pointer-events: none; z-index: 9998;
                                          --driftY: ${-16 - Math.random() * 24}px;
                                          --rot: ${(Math.random() - 0.5) * 55}deg;
                                          animation: acPuffFade 0.62s cubic-bezier(0.2, 0.8, 0.25, 1) forwards;
                                      `;
                                      document.body.appendChild(ePuff);
                                      setTimeout(() => ePuff.remove(), 640);
                                  }, i * 16);
                              }

                              // Massive Impact Effects
                              const spawnImpact = (x, y, color, shadowColor) => {
                                  const imp = document.createElement('div');
                                  imp.style.cssText = `position:fixed; left:${x}px; top:${y}px; width:20px; height:20px; margin-left:-10px; margin-top:-10px; border-radius:50%; border:8px solid ${color}; box-shadow:0 0 40px ${color}, inset 0 0 20px ${shadowColor}; z-index:9999; pointer-events:none; animation:acImpactRing 0.7s ease-out forwards;`;
                                  document.body.appendChild(imp);
                                  setTimeout(() => imp.remove(), 750);

                                  if (engine.spawnBurstAtElement) {
                                      const vP = document.createElement('div'); vP.style.cssText=`position:fixed;left:${x}px;top:${y}px;width:1px;height:1px;`; document.body.appendChild(vP);
                                      engine.spawnBurstAtElement(vP, color, 45);
                                      engine.spawnBurstAtElement(vP, '#ffffff', 20);
                                      vP.remove();
                                  }
                              };

                              spawnImpact(pX, pY, '#f5d76e', '#d4af37');
                              spawnImpact(eX, eY, '#ef4444', '#991b1b');

                              pDeckEl.style.animation = 'acDeckImpact 0.4s ease-out forwards';
                              pDeckEl.style.boxShadow = '0 0 45px #f5d76e, inset 0 0 25px #d4af37';
                              
                              eDeckEl.style.animation = 'acDeckImpact 0.4s ease-out forwards';
                              eDeckEl.style.boxShadow = '0 0 45px #ef4444, inset 0 0 25px #991b1b';

                              if (engine.screenShake) engine.screenShake(16, 500);
                              
                              try {
                                  const hitSnd = new Audio('./sound_effects/enemy_move.mp3');
                                  const v = document.getElementById('volume-slider');
                                  hitSnd.volume = v ? parseFloat(v.value) : 0.25;
                                  hitSnd.playbackRate = 0.8;
                                  hitSnd.play().catch(()=>{});
                              } catch(e) {}

                              setTimeout(() => {
                                  pDeckEl.style.animation = '';
                                  pDeckEl.style.boxShadow = '';
                                  eDeckEl.style.animation = '';
                                  eDeckEl.style.boxShadow = '';
                                  locEl.style.animation = '';
                                  
                                  overlay.style.transition = 'opacity 0.45s ease';
                                  overlay.style.opacity = '0';
                                  setTimeout(() => overlay.remove(), 450);

                                  // Finally trigger the encounter/player effects
                                  runEncounterEffect();
                              }, 620);
                          }
                      };
                      requestAnimationFrame(animLoop);
                  }, 400); // Wait for gather phase
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
                      const sourceEl = document.getElementById('encounter-limbo-ghost') ||
                                       document.getElementById('encounter-reveal-ghost') ||
                                       document.querySelector('[data-id="oath_obsidian_arrows"]') ||
                                       document.querySelector('[data-id="obsidian_arrows"]');
                      window.launch3DObsidianArrows({
                          sourceEl: sourceEl,
                          targetUid: chosen._uid,
                          count: 6,
                          soundPath: './sound_effects/dark_of_mirkwood/obsidian_arrows_shoot.mp3',
                          onComplete: () => {
                              chosen.damage += 2;
                              engine.toast('Obsidian Arrows', `Dealt 2 damage to ${chosen.name}.`, 'danger');
                              engine.spawnBurstAtElement(document.querySelector(`[data-uid="${chosen._uid}"]`), '#c0392b', 24);

                              window._pauseAllyDeathProcessing = true;
                              if (cb) cb();

                              setTimeout(() => {
                                  window._pauseAllyDeathProcessing = false;
                                  engine.checkHeroDeath(chosen);
                                  engine.render();
                              }, 850);
                          }
                      });
                  } else {
                      if (cb) cb();
                  }
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
                      const enemyEl = document.querySelector(`[data-uid="${enemy._uid}"]`);
                      const shadowEl = document.getElementById('encounter-limbo-ghost') ||
                                       (enemyEl ? enemyEl.querySelector(`[data-uid="${shadow._uid}"]`) : null) ||
                                       (enemyEl ? enemyEl.querySelector('.token.shadow-revealed') : null) ||
                                       enemyEl;

                      window.launch3DObsidianArrows({
                          sourceEl: shadowEl,
                          targetUid: chosen._uid,
                          count: 1,
                          soundPath: './sound_effects/dark_of_mirkwood/obsidian_arrows_shadow_card.mp3',
                          onComplete: () => {
                              chosen.damage += 1;
                              engine.toast('Obsidian Arrows', `Dealt 1 damage to ${chosen.name}.`, 'danger');
                              engine.spawnBurstAtElement(document.querySelector(`[data-uid="${chosen._uid}"]`), '#c0392b', 18);
                              engine.checkHeroDeath(chosen);
                              engine.render();
                              next();
                          }
                      });
                  } else {
                      next();
                  }
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
        const gameRef = window.LotrEngine ? window.LotrEngine.game : (window.game || null);
        if (!gameRef) {
            return origAnimateCardToEngaged(card, cb);
        }

        if (card.id === 'oath_wild_wargs' || card.name === 'Wild Wargs') {
            const wrappedCb = () => {
                // Call original callback so Wargs is fully placed in Engaged Enemies in DOM
                if (cb) cb();

                const doWargsEffect = () => {
                    try {
                        const howlSnd = new Audio('./sound_effects/dark_of_mirkwood/wild_wargs_howl.mp3');
                        const volSlider = document.getElementById('volume-slider');
                        howlSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
                        howlSnd.play().catch(()=>{});
                    } catch(e) {}

                    // EPIC 3D HOWL ANIMATION
                    const wargsEl = document.querySelector(`[data-uid="${card._uid}"]`);
                    if (wargsEl) {
                        const wRect = wargsEl.getBoundingClientRect();
                        const centerX = wRect.left + wRect.width / 2;
                        const centerY = wRect.top + wRect.height / 2;

                        // Separate clean background vignette centered directly on Wild Wargs
                        const dimOverlay = document.createElement('div');
                        dimOverlay.style.cssText = `
                            position: fixed; inset: 0; z-index: 9999;
                            background: radial-gradient(circle at ${centerX}px ${centerY}px, transparent 12%, rgba(10, 15, 20, 0.72) 60%, rgba(5, 5, 10, 0.88) 100%);
                            pointer-events: none; opacity: 0;
                            transition: opacity 0.2s ease-out;
                        `;
                        document.body.appendChild(dimOverlay);
                        requestAnimationFrame(() => dimOverlay.style.opacity = '1');
                        setTimeout(() => {
                            dimOverlay.style.transition = 'opacity 0.4s ease-out';
                            dimOverlay.style.opacity = '0';
                            setTimeout(() => dimOverlay.remove(), 400);
                        }, 900);

                        const waveContainer = document.createElement('div');
                        waveContainer.style.cssText = `
                            position: fixed;
                            left: ${centerX}px;
                            top: ${centerY}px;
                            width: 0; height: 0;
                            z-index: 10000;
                            pointer-events: none;
                            overflow: visible;
                            perspective: 800px;
                            transform-style: preserve-3d;
                        `;
                        
                        let particlesHTML = '';
                        for(let i=0; i<32; i++) {
                            let theta = Math.random() * Math.PI * 2;
                            let phi = Math.acos(2 * Math.random() - 1);
                            let speed = 180 + Math.random() * 320;
                            let tx = speed * Math.sin(phi) * Math.cos(theta);
                            let ty = speed * Math.sin(phi) * Math.sin(theta);
                            let tz = speed * Math.cos(phi);
                            let size = 2 + Math.random() * 5;
                            let delay = Math.random() * 0.15;
                            let color = Math.random() > 0.6 ? '#ffffff' : (Math.random() > 0.5 ? '#d1d5db' : '#9ca3af');
                            particlesHTML += `<div style="position:absolute; left:0; top:0; margin-left:-${size/2}px; margin-top:-${size/2}px; width:${size}px; height:${size}px; background:${color}; border-radius:50%; box-shadow:0 0 8px ${color}; --tx:${tx}px; --ty:${ty}px; --tz:${tz}px; animation: wargParticleFly ${0.7 + Math.random()*0.5}s ${delay}s cubic-bezier(0.15, 0.85, 0.25, 1) forwards; opacity:0;"></div>`;
                        }

                        waveContainer.innerHTML = `
                            <style>
                                @keyframes wargCore {
                                    0% { transform: scale(0.2); opacity: 1; }
                                    100% { transform: scale(3); opacity: 0; }
                                }
                                @keyframes wargRing2D {
                                    0% { transform: scale(0.1); opacity: 1; border-width: 26px; }
                                    100% { transform: scale(4.8); opacity: 0; border-width: 1px; }
                                }
                                @keyframes wargRing3D {
                                    0% { transform: rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(0deg) scale(0.1); opacity: 1; border-width: 12px; }
                                    100% { transform: rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(var(--rz)) scale(4.2); opacity: 0; border-width: 1px; }
                                }
                                @keyframes wargConicBurst {
                                    0% { transform: scale(0.35) rotate(var(--rot)); opacity: 0.95; }
                                    100% { transform: scale(1.65) rotate(calc(var(--rot) + 20deg)); opacity: 0; }
                                }
                                @keyframes wargParticleFly {
                                    0% { transform: translate3d(0,0,0) scale(1); opacity: 1; }
                                    100% { transform: translate3d(var(--tx), var(--ty), var(--tz)) scale(0.1); opacity: 0; }
                                }
                            </style>

                            <!-- 24-Ray Conic Halo (Centered Directly on Wild Wargs) -->
                            <div style="position:absolute; left:0; top:0; margin-left:-180px; margin-top:-180px; width:360px; height:360px; background:repeating-conic-gradient(from 15deg, transparent 0deg, transparent 6deg, rgba(156, 163, 175, 0.75) 8.5deg, rgba(255, 255, 255, 0.98) 10.5deg, transparent 15deg); -webkit-mask-image:radial-gradient(circle, transparent 20%, black 42%, transparent 70%); mask-image:radial-gradient(circle, transparent 20%, black 42%, transparent 70%); --rot:15deg; animation: wargConicBurst 0.85s cubic-bezier(0.1, 0.8, 0.3, 1) forwards; filter:drop-shadow(0 0 12px #ffffff);"></div>

                            <!-- Core Flash -->
                            <div style="position:absolute; left:0; top:0; margin-left:-60px; margin-top:-60px; width:120px; height:120px; border-radius:50%; background:radial-gradient(circle, #ffffff 0%, #cbd5e1 35%, transparent 75%); box-shadow:0 0 45px #ffffff, 0 0 85px #9ca3af; animation: wargCore 0.6s cubic-bezier(0.1, 0.8, 0.2, 1) forwards; mix-blend-mode:screen;"></div>

                            <!-- 2D Sonic Shockwave Rings -->
                            <div style="position:absolute; left:0; top:0; margin-left:-80px; margin-top:-80px; width:160px; height:160px; border-radius:50%; border:solid #ffffff; box-shadow:0 0 25px #ffffff, inset 0 0 20px #e5e7eb; animation: wargRing2D 0.75s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;"></div>
                            <div style="position:absolute; left:0; top:0; margin-left:-80px; margin-top:-80px; width:160px; height:160px; border-radius:50%; border:solid #d1d5db; box-shadow:0 0 35px #9ca3af, inset 0 0 25px #9ca3af; animation: wargRing2D 0.95s 0.12s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;"></div>

                            <!-- 3D Sonic Spheres -->
                            ${[
                                {rx: 65, ry: 25, rz: 120, c: '#e5e7eb', d: 0},
                                {rx: -50, ry: 70, rz: -90, c: '#9ca3af', d: 0.08},
                                {rx: 35, ry: -80, rz: 180, c: '#d1d5db', d: 0.16},
                                {rx: -75, ry: -30, rz: -180, c: '#6b7280', d: 0.24}
                            ].map(p => `
                                <div style="position:absolute; left:0; top:0; margin-left:-100px; margin-top:-100px; width:200px; height:200px; border-radius:50%; border:solid ${p.c}; box-shadow: 0 0 18px ${p.c}, inset 0 0 14px ${p.c}; transform-style:preserve-3d; --rx:${p.rx}deg; --ry:${p.ry}deg; --rz:${p.rz}deg; animation: wargRing3D 1.05s ${p.d}s cubic-bezier(0.15, 0.85, 0.25, 1) forwards; opacity:0;"></div>
                            `).join('')}

                            <!-- 3D Saliva/Dust Particles -->
                            <div style="position:absolute; left:0; top:0; width:0; height:0; transform-style:preserve-3d;">
                                ${particlesHTML}
                            </div>
                        `;
                        document.body.appendChild(waveContainer);
                        setTimeout(() => waveContainer.remove(), 1600);
                        
                        if (window.LotrEngine && window.LotrEngine.screenShake) {
                            window.LotrEngine.screenShake(6, 400);
                        }
                    }

                    if (gameRef.encounterDeck.length > 0) {
                        const topCard = gameRef.encounterDeck.pop();
                        
                        if (topCard.type === 'enemy' && (topCard.trait || '').includes('Goblin')) {
                            topCard._engagedWithPlayerIdx = card._engagedWithPlayerIdx;
                            
                            const deckEl = document.getElementById('encounter-deck-pile');
                            const engagedZone = document.getElementById('engaged-content');
                            
                            if (deckEl && engagedZone) {
                                const startRect = deckEl.getBoundingClientRect();
                                
                                // We calculate a stub representing the exact slot next to Wargs
                                const hasPlaceholder = gameRef.engagedEnemies.length === 0;
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

                                const cardW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                                const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                                
                                const ghostWrap = document.createElement('div');
                                ghostWrap.style.cssText = `
                                    position: fixed; z-index: 10005;
                                    left: ${startRect.left}px; top: ${startRect.top}px;
                                    width: ${cardW}px; height: ${cardH}px;
                                    transform-origin: top left;
                                    transform: scale(${startRect.width / cardW});
                                    perspective: 1000px;
                                    transition: left 0.75s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.75s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.75s cubic-bezier(0.25, 0.8, 0.25, 1);
                                    pointer-events: none;
                                    box-shadow: 0 10px 25px rgba(0,0,0,0.7);
                                `;
                                
                                const ghostInner = document.createElement('div');
                                ghostInner.style.cssText = `
                                    width: 100%; height: 100%; position: relative;
                                    transform-style: preserve-3d;
                                    transition: transform 0.75s cubic-bezier(0.25, 0.8, 0.25, 1);
                                    transform: rotateY(0deg);
                                `;
                                
                                const ghostBack = document.createElement('div');
                                ghostBack.style.cssText = `
                                    position: absolute; inset: 0; backface-visibility: hidden;
                                    border-radius: 6px; border: 2px solid #7a2020;
                                    background: linear-gradient(135deg,#2a0e0e 0%,#0a0303 100%);
                                    box-shadow: 0 4px 10px rgba(0,0,0,0.6);
                                `;
                                const backImgSrc = window.ENCOUNTER_BACK || 'cards/ecb.png';
                                ghostBack.innerHTML = `<img src="${backImgSrc}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
                                
                                const ghostFront = document.createElement('div');
                                ghostFront.style.cssText = `
                                    position: absolute; inset: 0; backface-visibility: hidden;
                                    transform: rotateY(180deg); border-radius: 6px;
                                    box-shadow: 0 4px 10px rgba(0,0,0,0.6); background: #000;
                                `;
                                
                                topCard._drawing = true;
                                ghostFront.innerHTML = window.cardHTML ? window.cardHTML(topCard) : '';
                                const innerCard = ghostFront.querySelector('.card');
                                if (innerCard) {
                                    innerCard.style.width = '100%';
                                    innerCard.style.height = '100%';
                                    innerCard.style.margin = '0';
                                }
                                delete topCard._drawing;
                                
                                ghostInner.appendChild(ghostBack);
                                ghostInner.appendChild(ghostFront);
                                ghostWrap.appendChild(ghostInner);
                                document.body.appendChild(ghostWrap);
                                
                                void ghostWrap.offsetWidth;
                                
                                if (window.LotrEngine && window.LotrEngine.window && window.LotrEngine.window.SoundFX && window.LotrEngine.window.SoundFX.playDraw) {
                                    window.LotrEngine.window.SoundFX.playDraw();
                                }

                                const targetScale = destRect.width / cardW;
                                requestAnimationFrame(() => {
                                    ghostWrap.style.left = `${destRect.left}px`;
                                    ghostWrap.style.top = `${destRect.top}px`;
                                    ghostWrap.style.transform = `scale(${targetScale})`;
                                    ghostInner.style.transform = 'rotateY(180deg)';
                                });
                                
                                setTimeout(() => {
                                    ghostWrap.remove();
                                    gameRef.engagedEnemies.push(topCard);
                                    window.LotrEngine.toast('Wild Wargs', `Forced: ${topCard.name} engaged you!`, 'danger');
                                    window.LotrEngine.render();
                                }, 800);
                            } else {
                                gameRef.engagedEnemies.push(topCard);
                                window.LotrEngine.toast('Wild Wargs', `Forced: ${topCard.name} engaged you!`, 'danger');
                                window.LotrEngine.render();
                            }
                        } else {
                            const deckEl = document.getElementById('encounter-deck-pile');
                            const startRect = deckEl ? deckEl.getBoundingClientRect() : null;
                        
                            const doDiscard = () => {
                                window.LotrEngine.discardCard(topCard, gameRef.encounterDiscard, true);
                                window.LotrEngine.toast('Wild Wargs', `Forced: Discarded ${topCard.name}.`, 'info');
                                window.LotrEngine.render();
                            };

                            if (startRect && typeof window._animateCardToDiscard === 'function') {
                                window._animateCardToDiscard(topCard, false, doDiscard, startRect);
                            } else {
                                doDiscard();
                            }
                        }
                    }
                };

                if (gameRef.encounterDeck.length === 0) {
                    window.LotrEngine.checkEmptyEncounterDeck(doWargsEffect);
                } else {
                    doWargsEffect();
                }
            };
            
            return origAnimateCardToEngaged(card, wrappedCb);
        }

        if (card.id === 'oath_great_spider' || card.name === 'Great Spider') {
             const wrappedCb = () => {
                 if (cb) cb();
                 const targetPIdx = card._engagedWithPlayerIdx !== undefined ? card._engagedWithPlayerIdx : gameRef.activeTabPlayerIdx;
                 const readyChars = [...gameRef.heroes, ...gameRef.allies].filter(char => !char.exhausted && !char._prisoner && (char._ownerIdx === undefined ? 0 : char._ownerIdx) === targetPIdx);
                 if (readyChars.length > 0) {
                     if (gameRef.activeTabPlayerIdx !== targetPIdx) window.LotrEngine.window._switchTab(targetPIdx);
                     window.LotrEngine.showHeroPicker('Forced Engagement', `Forced: After ${card.name} engages you, exhaust a character you control:`, readyChars, (chosen) => {
                         if (chosen) {
                             if (typeof window.triggerGreatSpiderFangBite === 'function') {
                                 window.triggerGreatSpiderFangBite(chosen._uid, card._uid, { isForced: true });
                             }
                             const el = document.querySelector(`[data-uid="${chosen._uid}"]`);
                             if (el) {
                                 el.classList.add('exhausted');
                                 setTimeout(() => {
                                     chosen.exhausted = true;
                                     delete chosen._justExhaustedTime;
                                     window.LotrEngine.render();
                                 }, 350);
                             } else {
                                 chosen.exhausted = true;
                                 delete chosen._justExhaustedTime;
                                 window.LotrEngine.render();
                             }
                             window.LotrEngine.toast(card.name, `Exhausted ${chosen.name}.`, 'danger');
                         }
                     }, true);
                 }
             };
             return origAnimateCardToEngaged(card, wrappedCb);
        }

        return origAnimateCardToEngaged(card, cb);
    };
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

// Prevent Hasty Stroke modal and shadow movement when The Eaves of Mirkwood is active
const hookShadowRevealForEaves = () => {
    if (window.animateShadowReveal && !window.animateShadowReveal._eavesBlocked) {
        const origAnim = window.animateShadowReveal;
        window.animateShadowReveal = function(enemy, cb, idx = 0) {
            const g = window.game || (window.LotrEngine && window.LotrEngine.game);
            const activeLoc = g?.activeLocation;
            const isEaves = activeLoc && (
                activeLoc.id === 'oath_the_eaves_of_mirkwood' ||
                activeLoc.id === 'the_eaves_of_mirkwood' ||
                (activeLoc.name && activeLoc.name.includes('Eaves of Mirkwood'))
            );

            let suppressedCards = [];
            if (isEaves && g?.hand) {
                g.hand.forEach(c => {
                    if (c && c.id === 'hasty_stroke') {
                        c.id = '_hasty_stroke_eaves_blocked';
                        suppressedCards.push(c);
                    }
                });
            }

            const restoreHastyStroke = () => {
                if (suppressedCards.length > 0) {
                    suppressedCards.forEach(c => {
                        if (c.id === '_hasty_stroke_eaves_blocked') {
                            c.id = 'hasty_stroke';
                        }
                    });
                    suppressedCards = [];
                }
            };

            const wrappedCb = function() {
                try {
                    if (cb) cb.apply(this, arguments);
                } finally {
                    restoreHastyStroke();
                }
            };

            try {
                return origAnim.call(this, enemy, wrappedCb, idx);
            } catch(e) {
                restoreHastyStroke();
                throw e;
            }
        };
        window.animateShadowReveal._eavesBlocked = true;
    }
};
hookShadowRevealForEaves();
setInterval(hookShadowRevealForEaves, 300);

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
                    
                    let shouldBlock = false;
                    
                    // Eaves blocks all Encounter Card cancellations (e.g. Hasty Stroke)
                    if (eavesActive && (title.includes("Eleanor") || title.includes("Test of Will") || title.includes("Hasty Stroke"))) {
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

						if (window.LotrEngine && window.LotrEngine.render) {
								window.LotrEngine.render();
						} else if (typeof render === 'function') {
								render();
						}

						// Wrap aura around the card and play audio as it moves back to the Staging Area
						if (card._surprisingSpeedShadowReturn) {
                if (typeof window.playSurprisingSpeedEnemyReturnAudio === 'function') {
                    window.playSurprisingSpeedEnemyReturnAudio();
                }
                if (window.createSurprisingSpeedWarp) {
                    window.createSurprisingSpeedWarp(ghost);
                }
            }

            void ghost.offsetWidth;

            ghost.style.left = `${destRect.left}px`;
            ghost.style.top = `${destRect.top}px`;
            ghost.style.transform = `scale(${destRect.width / baseW}, ${destRect.height / baseH})`;

            setTimeout(() => {
                card._attackedThisRound = true;
                const innerCard = ghost.querySelector('.card') || ghost;
                if (innerCard) innerCard.classList.add('attacked-this-round');

                // Clear all layout/opacity flags so card renders visibly upon arrival
                delete card._returnedToStaging;
                delete card._drawing;
                delete card._flyingToDeck;
                delete card._flipping;
                delete card._isAnimatingTravel;

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

                // Ensure the landed card in Staging is fully visible
                const newEl = document.querySelector(`#staging-content [data-uid="${card._uid}"]`);
                if (newEl) {
                    newEl.style.opacity = '1';
                    newEl.style.pointerEvents = 'auto';
                    void newEl.offsetWidth;
                }

                // Trigger shatter effect upon landing in Staging Area
                if (card._surprisingSpeedShadowReturn) {
                    delete card._surprisingSpeedShadowReturn;
                    if (window.triggerSurprisingSpeedShatter) {
                        window.triggerSurprisingSpeedShatter(card._uid);
                    }
                }

                requestAnimationFrame(() => {
										ghost.remove();
								});
							}, 500);
						};
				}

window.playSurprisingSpeedEnemyReturnAudio = function() {
    try {
        const snd = new Audio('./sound_effects/dark_of_mirkwood/surprising_speed_enemy_return.mp3');
        const volSlider = document.getElementById('volume-slider');
        snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
        snd.play().catch(() => {});
    } catch(e) {}
};

window.getSurprisingSpeedWarpHTML = function() {
    try {
        const snd = new Audio('./sound_effects/dark_of_mirkwood/surprising_speed_enemy.mp3');
        const volSlider = document.getElementById('volume-slider');
        snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
        snd.play().catch(() => {});
    } catch(e) {}
};

window.getSurprisingSpeedWarpHTML = function() {
    return `
        <div class="surprising-speed-warp" style="position: absolute; inset: -8px -8px -14px -8px; pointer-events: none; z-index: 120; overflow: visible;">
            <style>
                @keyframes speedShockWave2 {
                    0% { transform: scale(0.85) translateY(6px); opacity: 0.95; }
                    100% { transform: scale(1.15) translateY(-8px); opacity: 0; }
                }
                @keyframes speedBladeStream2 {
                    0% { transform: translateY(35px) scaleY(0.5); opacity: 0; }
                    30% { opacity: 0.95; }
                    100% { transform: translateY(-50px) scaleY(1.2); opacity: 0; }
                }
                @keyframes speedAfterimageShift2 {
                    0%, 100% { transform: translate(0, 0); opacity: 0.35; }
                    33% { transform: translate(-3px, 6px); opacity: 0.7; }
                    66% { transform: translate(3px, 8px); opacity: 0.55; }
                }
                @keyframes speedAuraPulse2 {
                    0%, 100% { filter: drop-shadow(0 0 8px #38bdf8) drop-shadow(0 0 14px #34d399); }
                    50% { filter: drop-shadow(0 0 14px #67e8f9) drop-shadow(0 0 24px #a7f3d0); }
                }
            </style>
            <div style="position:absolute; inset:6px; border:2.5px solid rgba(125,211,252,0.9); border-radius:8px; animation: speedShockWave2 0.35s ease-out infinite;"></div>
            <div style="position:absolute; inset:1px; border:1.5px solid rgba(52,211,153,0.8); border-radius:8px; animation: speedShockWave2 0.35s 0.17s ease-out infinite;"></div>
            <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(56,189,248,0.2) 0%, rgba(52,211,153,0.45) 100%); border-radius:6px; filter:blur(3px); animation: speedAfterimageShift2 0.22s linear infinite;"></div>
            <svg viewBox="0 0 180 240" style="position:absolute; inset:0; width:100%; height:100%; overflow:visible; animation: speedAuraPulse2 0.3s ease-in-out infinite;">
                <defs>
                    <linearGradient id="bladeGradCyan2" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stop-color="rgba(56,189,248,0)"/>
                        <stop offset="50%" stop-color="rgba(125,211,252,0.95)"/>
                        <stop offset="100%" stop-color="#ffffff"/>
                    </linearGradient>
                    <linearGradient id="bladeGradEmerald2" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stop-color="rgba(52,211,153,0)"/>
                        <stop offset="60%" stop-color="rgba(110,231,183,0.9)"/>
                        <stop offset="100%" stop-color="#ffffff"/>
                    </linearGradient>
                </defs>
                <line x1="2" y1="210" x2="0" y2="30" stroke="url(#bladeGradCyan2)" stroke-width="2.6" stroke-linecap="round" style="animation: speedBladeStream2 0.26s linear infinite;"/>
                <line x1="8" y1="230" x2="6" y2="15" stroke="url(#bladeGradEmerald2)" stroke-width="2" stroke-linecap="round" style="animation: speedBladeStream2 0.2s 0.08s linear infinite;"/>
                <line x1="178" y1="210" x2="180" y2="30" stroke="url(#bladeGradCyan2)" stroke-width="2.6" stroke-linecap="round" style="animation: speedBladeStream2 0.25s 0.04s linear infinite;"/>
                <line x1="172" y1="230" x2="174" y2="15" stroke="url(#bladeGradEmerald2)" stroke-width="2.2" stroke-linecap="round" style="animation: speedBladeStream2 0.22s 0.11s linear infinite;"/>
                <line x1="45" y1="230" x2="42" y2="50" stroke="#ffffff" stroke-width="1.6" opacity="0.9" stroke-linecap="round" style="animation: speedBladeStream2 0.18s 0.05s linear infinite;"/>
                <line x1="135" y1="230" x2="138" y2="50" stroke="#ffffff" stroke-width="1.6" opacity="0.9" stroke-linecap="round" style="animation: speedBladeStream2 0.18s 0.1s linear infinite;"/>
            </svg>
        </div>
    `;
};

window.createSurprisingSpeedWarp = function(el) {
    if (!el) return null;
    const existing = el.querySelector('.surprising-speed-warp');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.innerHTML = window.getSurprisingSpeedWarpHTML();
    const warp = container.firstElementChild;
    el.appendChild(warp);
    return warp;
};

window.createSurprisingSpeedWarp = function(el) {
    if (!el) return null;
    const existing = el.querySelector('.surprising-speed-warp');
    if (existing) existing.remove();

    const warp = document.createElement('div');
    warp.className = 'surprising-speed-warp';
    warp.style.cssText = `
        position: absolute;
        inset: -8px -8px -14px -8px;
        pointer-events: none;
        z-index: 120;
        overflow: visible;
    `;
    warp.innerHTML = `
        <style>
            @keyframes speedShockWave2 {
                0% { transform: scale(0.85) translateY(6px); opacity: 0.95; }
                100% { transform: scale(1.15) translateY(-8px); opacity: 0; }
            }
            @keyframes speedBladeStream2 {
                0% { transform: translateY(35px) scaleY(0.5); opacity: 0; }
                30% { opacity: 0.95; }
                100% { transform: translateY(-50px) scaleY(1.2); opacity: 0; }
            }
            @keyframes speedAfterimageShift2 {
                0%, 100% { transform: translate(0, 0); opacity: 0.35; }
                33% { transform: translate(-3px, 6px); opacity: 0.7; }
                66% { transform: translate(3px, 8px); opacity: 0.55; }
            }
            @keyframes speedAuraPulse2 {
                0%, 100% { filter: drop-shadow(0 0 8px #38bdf8) drop-shadow(0 0 14px #34d399); }
                50% { filter: drop-shadow(0 0 14px #67e8f9) drop-shadow(0 0 24px #a7f3d0); }
            }
        </style>
        <div style="position:absolute; inset:6px; border:2.5px solid rgba(125,211,252,0.9); border-radius:8px; animation: speedShockWave2 0.35s ease-out infinite;"></div>
        <div style="position:absolute; inset:1px; border:1.5px solid rgba(52,211,153,0.8); border-radius:8px; animation: speedShockWave2 0.35s 0.17s ease-out infinite;"></div>
        <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(56,189,248,0.2) 0%, rgba(52,211,153,0.45) 100%); border-radius:6px; filter:blur(3px); animation: speedAfterimageShift2 0.22s linear infinite;"></div>
        <svg viewBox="0 0 180 240" style="position:absolute; inset:0; width:100%; height:100%; overflow:visible; animation: speedAuraPulse2 0.3s ease-in-out infinite;">
            <defs>
                <linearGradient id="bladeGradCyan2" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stop-color="rgba(56,189,248,0)"/>
                    <stop offset="50%" stop-color="rgba(125,211,252,0.95)"/>
                    <stop offset="100%" stop-color="#ffffff"/>
                </linearGradient>
                <linearGradient id="bladeGradEmerald2" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stop-color="rgba(52,211,153,0)"/>
                    <stop offset="60%" stop-color="rgba(110,231,183,0.9)"/>
                    <stop offset="100%" stop-color="#ffffff"/>
                </linearGradient>
            </defs>
            <line x1="2" y1="210" x2="0" y2="30" stroke="url(#bladeGradCyan2)" stroke-width="2.6" stroke-linecap="round" style="animation: speedBladeStream2 0.26s linear infinite;"/>
            <line x1="8" y1="230" x2="6" y2="15" stroke="url(#bladeGradEmerald2)" stroke-width="2" stroke-linecap="round" style="animation: speedBladeStream2 0.2s 0.08s linear infinite;"/>
            <line x1="178" y1="210" x2="180" y2="30" stroke="url(#bladeGradCyan2)" stroke-width="2.6" stroke-linecap="round" style="animation: speedBladeStream2 0.25s 0.04s linear infinite;"/>
            <line x1="172" y1="230" x2="174" y2="15" stroke="url(#bladeGradEmerald2)" stroke-width="2" stroke-linecap="round" style="animation: speedBladeStream2 0.22s 0.11s linear infinite;"/>
            <line x1="45" y1="230" x2="42" y2="50" stroke="#ffffff" stroke-width="1.6" opacity="0.9" stroke-linecap="round" style="animation: speedBladeStream2 0.18s 0.05s linear infinite;"/>
            <line x1="135" y1="230" x2="138" y2="50" stroke="#ffffff" stroke-width="1.6" opacity="0.9" stroke-linecap="round" style="animation: speedBladeStream2 0.18s 0.1s linear infinite;"/>
        </svg>
    `;
    el.appendChild(warp);
    return warp;
};

window.triggerSurprisingSpeedShatter = function(uid) {
    const landedEl = document.querySelector(`#staging-content [data-uid="${uid}"]`);
    const r = landedEl ? landedEl.getBoundingClientRect() : null;
    if (r && r.width > 0) {
        const shatter = document.createElement('div');
        shatter.className = 'surprising-speed-shatter';
        shatter.style.cssText = `
            position: fixed;
            left: ${r.left}px;
            top: ${r.top}px;
            width: ${r.width}px;
            height: ${r.height}px;
            pointer-events: none;
            z-index: 99999;
            overflow: visible;
        `;
        shatter.innerHTML = `
            <style>
                @keyframes speedShatterFlash {
                    0% { opacity: 0.95; transform: scale(0.9); }
                    100% { opacity: 0; transform: scale(1.35); }
                }
                @keyframes speedShatterRing {
                    0% { transform: scale(0.95); opacity: 1; border-color: #ffffff; }
                    100% { transform: scale(1.5); opacity: 0; border-color: rgba(56, 189, 248, 0); filter: blur(3px); }
                }
                @keyframes speedShardFly {
                    0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
                    100% { transform: translate(var(--tx), var(--ty)) rotate(var(--tr)) scale(0.1); opacity: 0; }
                }
            </style>
            <div style="position:absolute; inset:-8px; border-radius:10px; background:radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(56,189,248,0.55) 50%, transparent 75%); animation:speedShatterFlash 0.35s ease-out forwards;"></div>
            <div style="position:absolute; inset:0; border:3px solid #ffffff; border-radius:8px; box-shadow:0 0 16px #38bdf8; animation:speedShatterRing 0.45s ease-out forwards;"></div>
            <div style="position:absolute; inset:-6px; border:2.5px solid #34d399; border-radius:12px; box-shadow:0 0 20px #34d399; animation:speedShatterRing 0.5s 0.05s ease-out forwards;"></div>
            <div style="position:absolute; left:95%; top:15%; width:16px; height:10px; background:linear-gradient(135deg, #ffffff, #38bdf8); clip-path:polygon(0 0, 100% 30%, 50% 100%); filter:drop-shadow(0 0 8px #38bdf8); --tx:55px; --ty:-35px; --tr:115deg; animation:speedShardFly 0.5s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
            <div style="position:absolute; left:98%; top:50%; width:18px; height:11px; background:linear-gradient(135deg, #ffffff, #34d399); clip-path:polygon(10% 0, 100% 40%, 40% 100%); filter:drop-shadow(0 0 8px #34d399); --tx:60px; --ty:4px; --tr:-90deg; animation:speedShardFly 0.48s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
            <div style="position:absolute; left:92%; top:82%; width:15px; height:10px; background:linear-gradient(135deg, #fef08a, #38bdf8); clip-path:polygon(0 20%, 90% 0, 60% 100%); filter:drop-shadow(0 0 8px #38bdf8); --tx:50px; --ty:45px; --tr:135deg; animation:speedShardFly 0.52s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
            <div style="position:absolute; left:50%; top:96%; width:16px; height:10px; background:linear-gradient(135deg, #ffffff, #6ee7b7); clip-path:polygon(20% 0, 100% 30%, 30% 100%); filter:drop-shadow(0 0 8px #34d399); --tx:4px; --ty:55px; --tr:-115deg; animation:speedShardFly 0.5s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
            <div style="position:absolute; left:5%; top:84%; width:16px; height:10px; background:linear-gradient(135deg, #ffffff, #38bdf8); clip-path:polygon(0 0, 100% 40%, 40% 100%); filter:drop-shadow(0 0 8px #38bdf8); --tx:-50px; --ty:42px; --tr:95deg; animation:speedShardFly 0.49s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
            <div style="position:absolute; left:0%; top:50%; width:18px; height:11px; background:linear-gradient(135deg, #ffffff, #34d399); clip-path:polygon(0 10%, 90% 0, 50% 100%); filter:drop-shadow(0 0 8px #34d399); --tx:-60px; --ty:0px; --tr:-135deg; animation:speedShardFly 0.48s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
            <div style="position:absolute; left:6%; top:15%; width:15px; height:10px; background:linear-gradient(135deg, #fef08a, #34d399); clip-path:polygon(20% 0, 100% 20%, 30% 100%); filter:drop-shadow(0 0 8px #38bdf8); --tx:-52px; --ty:-36px; --tr:110deg; animation:speedShardFly 0.51s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
            <div style="position:absolute; left:50%; top:0%; width:16px; height:10px; background:linear-gradient(135deg, #ffffff, #38bdf8); clip-path:polygon(0 0, 100% 10%, 40% 100%); filter:drop-shadow(0 0 8px #38bdf8); --tx:2px; --ty:-55px; --tr:-95deg; animation:speedShardFly 0.5s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"></div>
        `;
        document.body.appendChild(shatter);
        if (window.LotrEngine && window.LotrEngine.spawnBurstAtElement) {
            window.LotrEngine.spawnBurstAtElement(landedEl, '#38bdf8', 16);
        }
        setTimeout(() => shatter.remove(), 550);
    }
};

// === GOBLIN RUNNERS LIQUID FLAMES & RISING SMOKE ===
let _activeRunnerSmokeCleanup = null;
function startGoblinRunnersSmokeEffect(enemy) {
    if (_activeRunnerSmokeCleanup) {
        _activeRunnerSmokeCleanup();
    }

    const enemyEl = document.querySelector(`[data-uid="${enemy._uid}"]`);
    if (!enemyEl) return;

    const smokeOverlay = document.createElement('div');
    smokeOverlay.className = 'goblin-runner-smoke-overlay';
    smokeOverlay.style.cssText = `
        position: absolute;
        inset: 0;
        border-radius: inherit;
        overflow: hidden;
        pointer-events: none;
        z-index: 8;
    `;

    smokeOverlay.innerHTML = `
        <svg width="0" height="0" style="position:absolute; pointer-events:none;">
            <defs>
                <filter id="liquidFlameWarp">
                    <feTurbulence type="fractalNoise" baseFrequency="0.035 0.04" numOctaves="2">
                        <animate attributeName="baseFrequency" values="0.035 0.04; 0.02 0.06; 0.035 0.04" dur="2.8s" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </defs>
        </svg>

        <style>
            @keyframes liquidLick1 {
                0% {
                    transform: translateX(-50%) scale(1, 0.94) rotate(-3deg);
                    border-radius: 44% 56% 22% 22% / 65% 55% 30% 30%;
                }
                35% {
                    transform: translateX(-50%) scale(0.94, 1.18) rotate(2deg);
                    border-radius: 30% 70% 30% 22% / 72% 48% 40% 26%;
                }
                70% {
                    transform: translateX(-50%) scale(1.06, 0.88) rotate(-3deg);
                    border-radius: 50% 50% 25% 25% / 55% 65% 35% 35%;
                }
                100% {
                    transform: translateX(-50%) scale(1, 0.94) rotate(-3deg);
                    border-radius: 44% 56% 22% 22% / 65% 55% 30% 30%;
                }
            }
            @keyframes liquidLick2 {
                0% {
                    transform: translateX(-50%) scale(0.95, 1.1) rotate(3deg);
                    border-radius: 48% 52% 24% 24% / 55% 65% 32% 32%;
                }
                40% {
                    transform: translateX(-50%) scale(1.05, 0.9) rotate(-3deg);
                    border-radius: 34% 66% 24% 26% / 65% 48% 35% 30%;
                }
                75% {
                    transform: translateX(-50%) scale(0.92, 1.2) rotate(3deg);
                    border-radius: 46% 54% 28% 22% / 75% 50% 38% 25%;
                }
                100% {
                    transform: translateX(-50%) scale(0.95, 1.1) rotate(3deg);
                    border-radius: 48% 52% 24% 24% / 55% 65% 32% 32%;
                }
            }
            @keyframes liquidLick3 {
                0% {
                    transform: translateX(-50%) scale(1.03, 0.92) rotate(-2deg);
                    border-radius: 38% 62% 24% 22% / 62% 58% 34% 30%;
                }
                50% {
                    transform: translateX(-50%) scale(0.9, 1.22) rotate(3deg);
                    border-radius: 54% 46% 22% 26% / 70% 46% 38% 26%;
                }
                100% {
                    transform: translateX(-50%) scale(1.03, 0.92) rotate(-2deg);
                    border-radius: 38% 62% 24% 22% / 62% 58% 34% 30%;
                }
            }
            .liquid-flame-tongue {
                position: absolute;
                bottom: 0;
                transform-origin: bottom center;
                pointer-events: none;
                mix-blend-mode: screen;
            }
            .liquid-flame-body {
                background: linear-gradient(to top, 
                    rgba(239, 68, 68, 0.95) 0%, 
                    rgba(185, 28, 28, 0.88) 28%, 
                    rgba(75, 12, 12, 0.78) 55%, 
                    rgba(20, 4, 4, 0.45) 75%, 
                    transparent 100%
                );
                filter: blur(2.5px);
            }
            .liquid-flame-core {
                background: linear-gradient(to top, 
                    rgba(254, 202, 202, 0.98) 0%, 
                    rgba(248, 113, 113, 0.92) 30%, 
                    rgba(220, 38, 38, 0.72) 65%, 
                    transparent 100%
                );
                filter: blur(1.5px);
            }
            .liquid-spark {
                position: absolute;
                bottom: 14px;
                width: 3px;
                height: 3px;
                border-radius: 50%;
                background: #fca5a5;
                box-shadow: 0 0 5px #ef4444;
                pointer-events: none;
                animation: flameSparkRise 1.4s ease-out infinite;
            }
            @keyframes flameSparkRise {
                0% { transform: translateY(0) scale(1); opacity: 0; }
                25% { opacity: 0.9; }
                100% { transform: translateY(-70px) translateX(var(--drift, 4px)) scale(0.2); opacity: 0; }
            }
        </style>

        <!-- Connected base ember glow to fuse the flames together -->
        <div style="position:absolute; bottom:0; left:0; width:100%; height:20px; background:linear-gradient(to top, rgba(239, 68, 68, 0.85) 0%, rgba(185, 28, 28, 0.5) 50%, transparent 100%); box-shadow:inset 0 -16px 14px -3px rgba(239, 68, 68, 0.85); filter:blur(1px); pointer-events:none;"></div>
        <div style="position:absolute; bottom:0; left:12%; width:76%; height:32px; background:linear-gradient(to top, rgba(239, 68, 68, 0.9) 0%, rgba(185, 28, 28, 0.6) 45%, transparent 100%); filter:blur(3px); mix-blend-mode:screen; pointer-events:none;"></div>

        <!-- Blended liquid flames container -->
        <div style="position:absolute; inset:0; filter:url(#liquidFlameWarp); -webkit-mask-image: linear-gradient(to top, black 25%, black 60%, rgba(0,0,0,0.85) 75%, transparent 100%); mask-image: linear-gradient(to top, black 25%, black 60%, rgba(0,0,0,0.85) 75%, transparent 100%); pointer-events:none;">
            <!-- Overlapping, fused liquid flame tongues -->
            <div class="liquid-flame-tongue liquid-flame-body" style="left:18%; width:32px; height:50px; animation: liquidLick1 0.95s ease-in-out infinite;"></div>
            
            <div class="liquid-flame-tongue liquid-flame-body" style="left:34%; width:38px; height:66px; animation: liquidLick2 1.1s 0.2s ease-in-out infinite;"></div>
            <div class="liquid-flame-tongue liquid-flame-core" style="left:34%; width:20px; height:36px; animation: liquidLick2 1.1s 0.2s ease-in-out infinite;"></div>
            
            <div class="liquid-flame-tongue liquid-flame-body" style="left:50%; width:44px; height:80px; animation: liquidLick3 0.85s ease-in-out infinite;"></div>
            <div class="liquid-flame-tongue liquid-flame-core" style="left:50%; width:22px; height:46px; animation: liquidLick3 0.85s ease-in-out infinite;"></div>
            
            <div class="liquid-flame-tongue liquid-flame-body" style="left:66%; width:38px; height:64px; animation: liquidLick1 1.05s 0.4s ease-in-out infinite;"></div>
            <div class="liquid-flame-tongue liquid-flame-core" style="left:66%; width:20px; height:34px; animation: liquidLick1 1.05s 0.4s ease-in-out infinite;"></div>

            <div class="liquid-flame-tongue liquid-flame-body" style="left:82%; width:32px; height:48px; animation: liquidLick2 0.9s 0.1s ease-in-out infinite;"></div>

            <!-- Rising ember sparks -->
            <div class="liquid-spark" style="left:34%; --drift:-8px; animation-duration:1.3s;"></div>
            <div class="liquid-spark" style="left:50%; --drift:6px; animation-duration:1.5s; animation-delay:0.4s;"></div>
            <div class="liquid-spark" style="left:66%; --drift:-5px; animation-duration:1.4s; animation-delay:0.8s;"></div>
        </div>
    `;

    enemyEl.appendChild(smokeOverlay);

    let active = true;
    const cleanup = () => {
        if (!active) return;
        active = false;
        smokeOverlay.remove();
        if (_activeRunnerSmokeCleanup === cleanup) {
            _activeRunnerSmokeCleanup = null;
        }
    };
    _activeRunnerSmokeCleanup = cleanup;

    const syncSmoke = () => {
        if (!active) return;
        const gameRef = window.game || (window.LotrEngine && window.LotrEngine.game);

        // Instantly remove if combat phase has ended
        if (!gameRef || !gameRef.phase || !gameRef.phase.startsWith('combat')) {
            cleanup();
            return;
        }

        // Instantly remove if enemy was defeated or removed from play
        if (!gameRef.engagedEnemies || !gameRef.engagedEnemies.some(e => e._uid === enemy._uid) || (enemy.damage || 0) >= (enemy.hp || 0)) {
            cleanup();
            return;
        }

        const target = document.querySelector(`[data-uid="${enemy._uid}"]`);
        if (target) {
            if (smokeOverlay.parentElement !== target) {
                target.appendChild(smokeOverlay);
            }
        } else {
            cleanup();
            return;
        }

        requestAnimationFrame(syncSmoke);
    };
    requestAnimationFrame(syncSmoke);
}
window.startGoblinRunnersSmokeEffect = startGoblinRunnersSmokeEffect;

// === GOBLIN RUNNERS SHADOW SECOND ATTACK INDICATOR ===
function triggerGoblinRunnersSecondAttackEffect(enemy) {
    const enemyEl = document.querySelector(`[data-uid="${enemy._uid}"]`);
    if (!enemyEl) return;
    const r = enemyEl.getBoundingClientRect();

    const playShadowAudio = () => {
        try {
            const snd = new Audio('./sound_effects/dark_of_mirkwood/goblin_runner_shadow.mp3');
            const volSlider = document.getElementById('volume-slider');
            snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
            snd.play().catch(() => {});
        } catch(e) {}
    };

    playShadowAudio();
    setTimeout(playShadowAudio, 220);

    const overlay = document.createElement('div');
    overlay.className = 'runners-second-attack-overlay';
    overlay.style.cssText = `
        position: fixed;
        left: ${r.left}px;
        top: ${r.top}px;
        width: ${r.width}px;
        height: ${r.height}px;
        z-index: 10000;
        pointer-events: none;
        overflow: visible;
        transition: opacity 0.45s ease-out, transform 0.45s ease-out, filter 0.45s ease-out;
    `;

    const spearSvg = window.getGoblinRunnersSpearSvg ? window.getGoblinRunnersSpearSvg() : '';

    overlay.innerHTML = `
        <style>
            @keyframes runnersSpearRiseLeft {
                0% {
                    transform: translate(-50%, calc(-50% + 95px)) rotate(-68deg) scale(0.65);
                    opacity: 0;
                }
                70% {
                    transform: translate(-50%, calc(-50% - 4px)) rotate(-68deg) scale(1.02);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) rotate(-68deg) scale(0.95);
                    opacity: 1;
                    filter: drop-shadow(0 0 3px #000) drop-shadow(0 6px 14px rgba(0,0,0,0.95)) drop-shadow(0 0 8px rgba(0,0,0,0.85));
                }
            }
            @keyframes runnersSpearRiseRight {
                0% {
                    transform: translate(-50%, calc(-50% + 95px)) rotate(-112deg) scale(0.65);
                    opacity: 0;
                }
                70% {
                    transform: translate(-50%, calc(-50% - 4px)) rotate(-112deg) scale(1.02);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) rotate(-112deg) scale(0.95);
                    opacity: 1;
                    filter: drop-shadow(0 0 3px #000) drop-shadow(0 6px 14px rgba(0,0,0,0.95)) drop-shadow(0 0 8px rgba(0,0,0,0.85));
                }
            }
            @keyframes runnersGlintFlash {
                0% { transform: scale(0) rotate(0deg); opacity: 0; }
                50% { transform: scale(1.3) rotate(90deg); opacity: 1; }
                100% { transform: scale(0) rotate(180deg); opacity: 0; }
            }
            @keyframes runnersRingPulse {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.85; border-color: #fef08a; }
                100% { transform: translate(-50%, -50%) scale(1.35); opacity: 0; border-color: rgba(239, 68, 68, 0); }
            }
            .runners-second-attack-overlay.fading {
                opacity: 0 !important;
                transform: translateY(-8px) scale(0.97);
                filter: blur(2px);
            }
        </style>
        <div style="position:absolute; inset:0; border:2px solid rgba(239, 68, 68, 0.7); border-radius:6px; box-shadow:0 0 8px rgba(239, 68, 68, 0.4); pointer-events:none;"></div>
        <div style="position:absolute; top:50%; left:50%; width:100px; height:100px; border:2px solid #ef4444; border-radius:50%; animation: runnersRingPulse 0.55s ease-out forwards; pointer-events:none;"></div>

        <div style="position:absolute; inset:0; pointer-events:none;">
            <div style="position:absolute; top:50%; left:50%; width:220px; height:54px; transform-origin:center; transform: translate(-50%, calc(-50% + 95px)) rotate(-68deg) scale(0.65); opacity:0; filter: drop-shadow(0 0 3px #000) drop-shadow(0 6px 14px rgba(0,0,0,0.95)); animation: runnersSpearRiseLeft 0.42s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;">
                ${spearSvg}
            </div>
            <div style="position:absolute; top:50%; left:50%; width:220px; height:54px; transform-origin:center; transform: translate(-50%, calc(-50% + 95px)) rotate(-112deg) scale(0.65); opacity:0; filter: drop-shadow(0 0 3px #000) drop-shadow(0 6px 14px rgba(0,0,0,0.95)); animation: runnersSpearRiseRight 0.42s 0.22s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;">
                ${spearSvg}
            </div>

            <!-- Tip glint sparks on spear appearance -->
            <div style="position:absolute; left:calc(50% + 41px); top:calc(50% - 102px); width:24px; height:24px; margin-left:-12px; margin-top:-12px; pointer-events:none; opacity:0; animation: runnersGlintFlash 0.32s 0.35s ease-out forwards;">
                <svg viewBox="0 0 24 24" width="24" height="24"><polygon points="12,0 14.5,9.5 24,12 14.5,14.5 12,24 9.5,14.5 0,12 9.5,9.5" fill="#ffffff" filter="drop-shadow(0 0 3px #fef08a)"/></svg>
            </div>
            <div style="position:absolute; left:calc(50% - 41px); top:calc(50% - 102px); width:24px; height:24px; margin-left:-12px; margin-top:-12px; pointer-events:none; opacity:0; animation: runnersGlintFlash 0.32s 0.57s ease-out forwards;">
                <svg viewBox="0 0 24 24" width="24" height="24"><polygon points="12,0 14.5,9.5 24,12 14.5,14.5 12,24 9.5,14.5 0,12 9.5,9.5" fill="#ffffff" filter="drop-shadow(0 0 3px #fef08a)"/></svg>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    let active = true;
    const syncPos = () => {
        if (!active) return;
        const target = document.querySelector(`[data-uid="${enemy._uid}"]`);
        if (target) {
            const rect = target.getBoundingClientRect();
            overlay.style.left = `${rect.left}px`;
            overlay.style.top = `${rect.top}px`;
            overlay.style.width = `${rect.width}px`;
            overlay.style.height = `${rect.height}px`;
        }
        requestAnimationFrame(syncPos);
    };
    requestAnimationFrame(syncPos);

    setTimeout(() => {
        if (window.LotrEngine && window.LotrEngine.spawnBurstAtElement) {
            window.LotrEngine.spawnBurstAtElement(enemyEl, '#fbbf24', 14);
        }
        overlay.classList.add('fading');
        setTimeout(() => {
            active = false;
            overlay.remove();
        }, 480);
    }, 2400);
}
window.triggerGoblinRunnersSecondAttackEffect = triggerGoblinRunnersSecondAttackEffect;

// === GOBLIN RUNNERS SPEAR SVG MARKUP GENERATOR ===
window.getGoblinRunnersSpearSvg = function() {
    return `
        <svg viewBox="0 0 220 54" width="220" height="54" style="overflow:visible; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.95)) drop-shadow(0 0 3px rgba(255,255,255,0.35));">
          <defs>
            <linearGradient id="grBladeUpper" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#334155"/>
              <stop offset="45%" stop-color="#94a3b8"/>
              <stop offset="90%" stop-color="#f8fafc"/>
              <stop offset="100%" stop-color="#ffffff"/>
            </linearGradient>
            <linearGradient id="grBladeLower" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#0f172a"/>
              <stop offset="40%" stop-color="#334155"/>
              <stop offset="85%" stop-color="#64748b"/>
              <stop offset="100%" stop-color="#cbd5e1"/>
            </linearGradient>
            <linearGradient id="grShaft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#543722"/>
              <stop offset="35%" stop-color="#3b2416"/>
              <stop offset="70%" stop-color="#24140b"/>
              <stop offset="100%" stop-color="#140a05"/>
            </linearGradient>
          </defs>

          <!-- Thick Weathered Wood Shaft -->
          <path d="M 8,27 L 165,27" stroke="url(#grShaft)" stroke-width="5.5" stroke-linecap="round"/>
          <path d="M 12,25.5 L 160,25.5" stroke="#71482b" stroke-width="1.2" opacity="0.6"/>

          <!-- Leather Wrappings & Grips -->
          <rect x="42" y="24" width="12" height="6" fill="#784d2b" rx="0.8"/>
          <line x1="45" y1="24" x2="47" y2="30" stroke="#1f1107" stroke-width="1.2"/>
          <line x1="49" y1="24" x2="51" y2="30" stroke="#1f1107" stroke-width="1.2"/>

          <rect x="95" y="24" width="16" height="6" fill="#653f22" rx="0.8"/>
          <line x1="98" y1="24" x2="101" y2="30" stroke="#1a0c05" stroke-width="1.2"/>
          <line x1="103" y1="24" x2="106" y2="30" stroke="#1a0c05" stroke-width="1.2"/>
          <line x1="108" y1="24" x2="111" y2="30" stroke="#1a0c05" stroke-width="1.2"/>

          <!-- Dangling Leather Cord Loops & Fetish Charms -->
          <path d="M 112,29 Q 100,50 88,29" fill="none" stroke="#221107" stroke-width="2.4"/>
          <path d="M 97,44 L 94,52" stroke="#1a0c05" stroke-width="2"/>
          <polygon points="94,52 90,59 97,57" fill="#fdf6e2" stroke="#684518" stroke-width="0.8"/>

          <path d="M 142,28 Q 133,45 124,28" fill="none" stroke="#2a160a" stroke-width="2"/>
          <circle cx="133" cy="40" r="2.2" fill="#d97706" stroke="#451a03" stroke-width="0.8"/>

          <!-- Sinew-Bound Socket Neck -->
          <rect x="158" y="23.5" width="10" height="7" fill="#8f5b33" rx="0.8"/>
          <line x1="160" y1="23.5" x2="161" y2="30.5" stroke="#2d1709" stroke-width="1.2"/>
          <line x1="163" y1="23.5" x2="164" y2="30.5" stroke="#2d1709" stroke-width="1.2"/>
          <line x1="166" y1="23.5" x2="167" y2="30.5" stroke="#2d1709" stroke-width="1.2"/>

          <!-- Barbed Head Base -->
          <polygon points="166,27 160,18 172,21" fill="#1e293b"/>
          <polygon points="166,27 160,36 172,33" fill="#0f172a"/>

          <!-- Wide Faceted Steel Blade -->
          <polygon points="168,21 216,27 168,27" fill="url(#grBladeUpper)"/>
          <polygon points="168,27 216,27 168,33" fill="url(#grBladeLower)"/>
          <line x1="167" y1="27" x2="217" y2="27" stroke="#ffffff" stroke-width="1.5"/>

          <!-- Iron Butt Cap -->
          <polygon points="8,24 2,27 8,30" fill="#334155" stroke="#0f172a" stroke-width="0.8"/>
        </svg>
    `;
};

// === GOBLIN RUNNERS DUAL SPEAR THROW ANIMATION ===
window.triggerGoblinRunnersSpearAttack = function(attackerUid, targetUid) {
    const attackerEl = document.querySelector(`[data-uid="${attackerUid}"]`);
    const targetEl = document.querySelector(`[data-uid="${targetUid}"]`);
    if (!attackerEl || !targetEl) return;

    const attRect = attackerEl.getBoundingClientRect();
    const tarRect = targetEl.getBoundingClientRect();

    const startX = attRect.left + attRect.width / 2;
    const startY = attRect.top + attRect.height / 2;
    const targetCenterX = tarRect.left + tarRect.width / 2;
    const targetCenterY = tarRect.top + tarRect.height / 2;

    // Play goblin_runners_attack.mp3 right when spears are thrown
    try {
        const snd = new Audio('./sound_effects/dark_of_mirkwood/goblin_runners_attack.mp3');
        const volSlider = document.getElementById('volume-slider');
        snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
        snd.play().catch(() => {});
    } catch(e) {}

    const spearSvgMarkup = window.getGoblinRunnersSpearSvg();

    const launchSpear = (delayMs, index) => {
        setTimeout(() => {
            // Generate non-stacking random landing spots clustered mostly within the center of the card
            const angleOffset = index === 0 ? (Math.random() * Math.PI) : (Math.random() * Math.PI + Math.PI);
            const distRadius = (0.1 + Math.random() * 0.25); 
            const offsetX = Math.cos(angleOffset) * (tarRect.width * distRadius);
            const offsetY = Math.sin(angleOffset) * (tarRect.height * distRadius);

            const endX = targetCenterX + offsetX;
            const endY = targetCenterY + offsetY;

            const dx = endX - startX;
            const dy = endY - startY;
            const straightDist = Math.hypot(dx, dy) || 1;

            const spear = document.createElement('div');
            spear.style.cssText = `
                position: fixed;
                left: ${startX}px;
                top: ${startY}px;
                width: 220px;
                height: 54px;
                margin-left: -190px;
                margin-top: -27px;
                transform-origin: 190px 27px;
                z-index: 100000;
                pointer-events: none;
                opacity: 0;
            `;
            spear.innerHTML = spearSvgMarkup;
            document.body.appendChild(spear);

            // Ballistic Arc with upward lift
            const lateralOffset = index === 0 ? -12 : 12;
            const perpX = -dy / straightDist * lateralOffset;
            const perpY = dx / straightDist * lateralOffset;
            
            const arcApexY = Math.min(startY, endY) - (70 + straightDist * 0.12);
            const p0 = { x: startX + perpX, y: startY + perpY };
            const p1 = { x: (startX + endX) / 2 + perpX * 0.5, y: arcApexY };
            const p2 = { x: endX, y: endY };

            const flightDuration = 340; // Increased speed slightly
            const launchTime = performance.now();

            const animateFlight = (now) => {
                const elapsed = now - launchTime;
                const progress = Math.min(1, elapsed / flightDuration);

                const t = progress;
                const invT = 1 - t;
                const curX = invT * invT * p0.x + 2 * invT * t * p1.x + t * t * p2.x;
                const curY = invT * invT * p0.y + 2 * invT * t * p1.y + t * t * p2.y;

                const vx = 2 * invT * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
                const vy = 2 * invT * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
                const currentAngleDeg = Math.atan2(vy, vx) * (180 / Math.PI);

                spear.style.left = `${curX}px`;
                spear.style.top = `${curY}px`;
                spear.style.transform = `rotate(${currentAngleDeg}deg) scale(${0.85 + progress * 0.15})`;
                spear.style.opacity = Math.min(1, progress * 4);

                if (progress < 1) {
                    requestAnimationFrame(animateFlight);
                } else {
                    // Impact at target
                    if (window.LotrEngine && window.LotrEngine.spawnBurstAtElement) {
                        window.LotrEngine.spawnBurstAtElement(targetEl, '#c0392b', 16);
                    }

                    spear.style.transition = 'transform 0.18s ease-out, opacity 0.25s ease-out';
                    spear.style.transform = `rotate(${currentAngleDeg + (Math.random() > 0.5 ? 4 : -4)}deg) scale(0.96)`;

                    // Floating damage number appears 250ms later after impact
                    setTimeout(() => {
                        if (targetEl && targetEl.getAttribute) {
                            const uid = targetEl.getAttribute('data-uid');
                            if (uid && window.floatTextAtElement) {
                                window.floatTextAtElement(uid, `-2`, '#ff5050');
                            }
                        }
                    }, 250);

                    // Stay visible on the card for 350ms longer (140 + 350 = 490ms embed time)
                    setTimeout(() => {
                        spear.style.opacity = '0';
                        setTimeout(() => spear.remove(), 250);
                    }, 490);
                }
            };

            requestAnimationFrame(animateFlight);
        }, delayMs);
    };

    // Staggered launch
    launchSpear(0, 0);
    launchSpear(110, 1);
};

// === WILD WARGS VICIOUS CHOMP ATTACK ANIMATION ===
window.triggerWildWargsBite = function(targetUid) {
    const targetEl = document.querySelector(`[data-uid="${targetUid}"]`) ||
                     document.querySelector('#combat-defender-slot .card, #heroes-content .card.selected, #heroes-content .card');
    if (!targetEl) return;

    try {
        const attackSnd = new Audio('./sound_effects/wargs_attack.mp3');
        const volSlider = document.getElementById('volume-slider');
        attackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
        attackSnd.play().catch(()=>{});
    } catch(e) {}

    const r = targetEl.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    const bite = document.createElement('div');
    bite.className = 'wild-wargs-bite-effect';
    bite.style.cssText = `
        position: fixed;
        left: ${cx - 105}px;
        top: ${cy - 98}px;
        width: 210px;
        height: 195px;
        z-index: 100005;
        pointer-events: none;
        overflow: visible;
        perspective: 800px;
        filter: drop-shadow(0 6px 14px rgba(0,0,0,0.92));
    `;

    // Symmetrically modeled left half of upper fangs with 3D conical facets and specular ridges
    const upperFangsHalf = `
        <!-- Main Saber Canine (Curved Inward toward Center) -->
        <g>
            <path d="M 44,52 C 40,74 46,104 68,124 C 74,104 70,78 61,53 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="1.1"/>
            <path d="M 48,52 C 46,74 52,102 68,124 C 65,102 61,78 57,53 Z" fill="url(#toothLight3D)"/>
            <path d="M 52,55 Q 50,88 67,122" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.95"/>
            <path d="M 45,55 Q 43,84 58,110" stroke="rgba(0,0,0,0.55)" stroke-width="1" fill="none"/>
        </g>
        <!-- Outer Corner Premolar -->
        <g>
            <path d="M 28,50 C 26,64 30,78 38,88 C 42,75 40,62 36,51 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="0.9"/>
            <path d="M 31,50 C 30,64 34,77 38,88 C 37,74 36,62 34,51 Z" fill="url(#toothLight3D)"/>
            <path d="M 33,52 Q 33,70 37,86" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.85"/>
        </g>
        <!-- Intermediate Premolar -->
        <g>
            <path d="M 64,53 C 64,68 68,84 76,96 C 80,82 78,67 73,53 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="0.9"/>
            <path d="M 67,53 C 67,68 71,83 76,96 C 75,81 74,67 70,53 Z" fill="url(#toothLight3D)"/>
            <path d="M 70,55 Q 71,76 75,94" stroke="#ffffff" stroke-width="1.1" fill="none" opacity="0.85"/>
        </g>
        <!-- Third Incisor -->
        <g>
            <path d="M 80,54 C 81,66 84,78 90,88 C 93,77 92,65 88,54 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="0.8"/>
            <path d="M 83,54 C 84,66 87,77 90,88 C 89,76 88,65 86,54 Z" fill="url(#toothLight3D)"/>
            <path d="M 85,55 Q 86,72 89,86" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.85"/>
        </g>
        <!-- Second Incisor -->
        <g>
            <path d="M 96,54 C 97,66 100,77 106,86 C 109,76 108,65 104,54 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="0.8"/>
            <path d="M 99,54 C 100,66 103,76 106,86 C 105,75 104,65 102,54 Z" fill="url(#toothLight3D)"/>
            <path d="M 101,55 Q 102,71 105,84" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.85"/>
        </g>
        <!-- First Incisor -->
        <g>
            <path d="M 112,54 C 113,66 116,77 122,85 C 125,75 124,65 120,54 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="0.8"/>
            <path d="M 115,54 C 116,66 119,76 122,85 C 121,75 120,65 118,54 Z" fill="url(#toothLight3D)"/>
            <path d="M 117,55 Q 118,70 121,83" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.85"/>
        </g>
        <!-- Central Incisor (Hugging Centerline at x=140) -->
        <g>
            <path d="M 127,54 C 129,66 132,77 137,85 C 140,75 139,65 135,54 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="0.8"/>
            <path d="M 130,54 C 131,66 134,76 137,85 C 136,75 135,65 133,54 Z" fill="url(#toothLight3D)"/>
            <path d="M 132,55 Q 133,70 136,83" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.9"/>
        </g>
    `;

    // Symmetrically modeled left half of lower fangs pointing inward/upward
    const lowerFangsHalf = `
        <!-- Main Lower Canine (Curved Upward/Inward) -->
        <g>
            <path d="M 52,204 C 48,180 52,150 72,128 C 78,148 76,176 69,204 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="1.1"/>
            <path d="M 56,204 C 53,180 57,152 72,128 C 70,150 67,176 63,204 Z" fill="url(#toothLight3D)"/>
            <path d="M 57,198 Q 57,162 71,132" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.95"/>
        </g>
        <!-- Outer Lower Premolar -->
        <g>
            <path d="M 36,207 C 36,192 40,178 48,168 C 51,180 50,195 46,207 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="0.9"/>
            <path d="M 39,207 C 39,192 43,179 48,168 C 47,180 46,195 43,207 Z" fill="url(#toothLight3D)"/>
            <path d="M 42,204 Q 43,186 47,171" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.85"/>
        </g>
        <!-- Intermediate Lower Premolar -->
        <g>
            <path d="M 72,203 C 73,187 77,172 84,160 C 88,174 86,189 81,203 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="0.9"/>
            <path d="M 75,203 C 76,187 80,173 84,160 C 83,174 82,189 78,203 Z" fill="url(#toothLight3D)"/>
            <path d="M 78,200 Q 79,180 83,163" stroke="#ffffff" stroke-width="1.1" fill="none" opacity="0.85"/>
        </g>
        <!-- Third Lower Incisor -->
        <g>
            <path d="M 88,202 C 89,189 93,176 98,166 C 102,178 100,191 96,202 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="0.8"/>
            <path d="M 91,202 C 92,189 95,177 98,166 C 97,178 96,191 93,202 Z" fill="url(#toothLight3D)"/>
            <path d="M 94,199 Q 95,182 97,169" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.85"/>
        </g>
        <!-- Second Lower Incisor -->
        <g>
            <path d="M 103,202 C 104,189 108,177 113,167 C 117,179 115,191 111,202 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="0.8"/>
            <path d="M 106,202 C 107,189 110,178 113,167 C 112,179 111,191 108,202 Z" fill="url(#toothLight3D)"/>
            <path d="M 109,199 Q 110,183 112,170" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.85"/>
        </g>
        <!-- First Lower Incisor -->
        <g>
            <path d="M 118,202 C 119,189 123,178 128,168 C 132,179 130,191 126,202 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="0.8"/>
            <path d="M 121,202 C 122,189 125,179 128,168 C 127,179 126,191 123,202 Z" fill="url(#toothLight3D)"/>
            <path d="M 124,199 Q 125,184 127,171" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.85"/>
        </g>
        <!-- Central Lower Incisor (Meeting Centerline at x=140) -->
        <g>
            <path d="M 132,202 C 133,189 136,178 139,168 C 142,179 141,191 138,202 Z" fill="url(#toothShadow3D)" stroke="#18181b" stroke-width="0.8"/>
            <path d="M 134,202 C 135,189 137,179 139,168 C 139,179 138,191 136,202 Z" fill="url(#toothLight3D)"/>
            <path d="M 136,199 Q 137,184 138,171" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.9"/>
        </g>
    `;

    bite.innerHTML = `
        <style>
            @keyframes wargChompUpper3D {
                0% { transform: translateY(-50px) rotateX(-18deg) scale(0.92); opacity: 0; }
                18% { transform: translateY(-46px) rotateX(-10deg) scale(1); opacity: 1; }
                42% { transform: translateY(12px) rotateX(6deg) scale(1.04); }
                50% { transform: translateY(8px) rotateX(2deg) scale(1); }
                78% { transform: translateY(8px) rotateX(0deg) scale(1); opacity: 1; }
                100% { transform: translateY(-24px) rotateX(-14deg) scale(0.86); opacity: 0; }
            }
            @keyframes wargChompLower3D {
                0% { transform: translateY(50px) rotateX(18deg) scale(0.92); opacity: 0; }
                18% { transform: translateY(46px) rotateX(10deg) scale(1); opacity: 1; }
                42% { transform: translateY(-12px) rotateX(-6deg) scale(1.04); }
                50% { transform: translateY(-8px) rotateX(-2deg) scale(1); }
                78% { transform: translateY(-8px) rotateX(0deg) scale(1); opacity: 1; }
                100% { transform: translateY(24px) rotateX(14deg) scale(0.86); opacity: 0; }
            }
            @keyframes wargDroolSnap3D {
                0% { opacity: 0; transform: scaleY(1.4); }
                20% { opacity: 0.95; transform: scaleY(1); }
                42% { opacity: 0.95; transform: scaleY(0.3); }
                48% { opacity: 0; transform: scaleY(0.06); }
                100% { opacity: 0; }
            }
            @keyframes wargDroolDripsFall {
                0% { opacity: 0.95; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(32px); }
            }
        </style>
        <svg viewBox="0 0 280 260" width="210" height="195" style="overflow:visible;">
            <defs>
                <!-- 3D Volumetric Dual-Tone Tooth Shading (Shadow & Light Facets) -->
                <linearGradient id="toothShadow3D" x1="0%" y1="0%" x2="100%" y2="20%">
                    <stop offset="0%" stop-color="#18181b"/>
                    <stop offset="28%" stop-color="#3f3f46"/>
                    <stop offset="65%" stop-color="#71717a"/>
                    <stop offset="100%" stop-color="#d4d4d8"/>
                </linearGradient>
                <linearGradient id="toothLight3D" x1="0%" y1="0%" x2="100%" y2="20%">
                    <stop offset="0%" stop-color="#d4d4d8"/>
                    <stop offset="35%" stop-color="#ffffff"/>
                    <stop offset="75%" stop-color="#f4f4f5"/>
                    <stop offset="100%" stop-color="#a1a1aa"/>
                </linearGradient>

                <!-- Slim 3D Scalloped Gum Gradient -->
                <radialGradient id="wargGum3DSlim" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stop-color="#261014"/>
                    <stop offset="45%" stop-color="#140608"/>
                    <stop offset="85%" stop-color="#080203"/>
                    <stop offset="100%" stop-color="#000000"/>
                </radialGradient>

                <!-- Natural Soft Fade for the Left and Right Edges of the Gums -->
                <mask id="wargSideFadeMask">
                    <rect x="0" y="0" width="280" height="260" fill="url(#wargSideFadeAlpha)"/>
                </mask>
                <linearGradient id="wargSideFadeAlpha" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
                    <stop offset="15%" stop-color="#ffffff" stop-opacity="0.8"/>
                    <stop offset="28%" stop-color="#ffffff" stop-opacity="1"/>
                    <stop offset="72%" stop-color="#ffffff" stop-opacity="1"/>
                    <stop offset="85%" stop-color="#ffffff" stop-opacity="0.8"/>
                    <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                </linearGradient>

                <!-- Drool Gradient -->
                <linearGradient id="wargDrool3D" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.95)"/>
                    <stop offset="35%" stop-color="rgba(241,245,249,0.72)"/>
                    <stop offset="75%" stop-color="rgba(203,213,225,0.55)"/>
                    <stop offset="100%" stop-color="rgba(255,255,255,0.95)"/>
                </linearGradient>
            </defs>

            <!-- UPPER JAW (Bilateral Symmetrical across x=140 with Slim Gums) -->
            <g class="warg-upper-jaw" mask="url(#wargSideFadeMask)" style="transform-origin:140px 45px; animation: wargChompUpper3D 0.65s cubic-bezier(0.2, 0.85, 0.25, 1) forwards;">
                <!-- Slim Shaggy Muzzle Fur Line -->
                <path d="M 22,34 Q 60,26 140,28 Q 220,26 258,34 Q 248,46 230,47 Q 140,45 50,47 Q 32,46 22,34 Z" fill="#18181b" stroke="#09090b" stroke-width="1.2"/>
                
                <!-- Slim 3D Wrinkled Black Gum Ribbon (Only 11px Thick!) -->
                <path d="M 24,44 Q 60,38 140,39 Q 220,38 256,44 Q 252,55 238,55 Q 140,54 42,55 Q 28,55 24,44 Z" fill="url(#wargGum3DSlim)" stroke="#090305" stroke-width="1.2"/>
                <!-- Sculpted Symmetrical 3D Root Bulb Arches -->
                <path d="M 30,52 Q 37,56 44,52 Q 54,57 64,53 Q 72,57 80,54 Q 88,57 96,54 Q 104,57 112,54 Q 120,57 128,54 Q 134,57 140,54 Q 146,57 152,54 Q 160,57 168,54 Q 176,57 184,54 Q 192,57 200,54 Q 208,57 216,53 Q 226,57 236,52 Q 243,56 250,52" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.1" stroke-linecap="round"/>

                <!-- Left Upper Fangs -->
                <g>${upperFangsHalf}</g>

                <!-- Right Upper Fangs (Mathematically Mirrored via x=140 Centerline) -->
                <g transform="translate(280, 0) scale(-1, 1)">${upperFangsHalf}</g>
            </g>

            <!-- LOWER JAW (Bilateral Symmetrical across x=140 with Slim Gums) -->
            <g class="warg-lower-jaw" mask="url(#wargSideFadeMask)" style="transform-origin:140px 202px; animation: wargChompLower3D 0.65s cubic-bezier(0.2, 0.85, 0.25, 1) forwards;">
                <!-- Volumetric Deep Mouth Throat & Symmetrical Tongue -->
                <path d="M 64,204 Q 140,224 216,204 Q 198,176 140,174 Q 82,176 64,204 Z" fill="#3b0312" opacity="0.94"/>
                <path d="M 94,200 C 112,190 168,190 186,200 C 172,216 108,216 94,200 Z" fill="#881337"/>
                <line x1="140" y1="191" x2="140" y2="213" stroke="#4c0519" stroke-width="2" stroke-linecap="round"/>

                <!-- Slim 3D Lower Black Gum Ribbon (Only 11px Thick!) -->
                <path d="M 24,208 Q 60,203 140,203 Q 220,203 256,208 Q 252,219 238,219 Q 140,218 42,219 Q 28,219 24,208 Z" fill="url(#wargGum3DSlim)" stroke="#090305" stroke-width="1.2"/>
                <path d="M 30,206 Q 38,202 46,206 Q 56,201 66,204 Q 74,201 82,203 Q 90,200 98,203 Q 106,200 114,203 Q 122,200 130,203 Q 135,200 140,203 Q 145,200 150,203 Q 158,200 166,203 Q 174,200 182,203 Q 190,201 198,203 Q 206,201 214,204 Q 224,201 234,206 Q 242,202 250,206" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.1" stroke-linecap="round"/>

                <!-- Left Lower Fangs -->
                <g>${lowerFangsHalf}</g>

                <!-- Right Lower Fangs (Mathematically Mirrored via x=140 Centerline) -->
                <g transform="translate(280, 0) scale(-1, 1)">${lowerFangsHalf}</g>

                <!-- Slim Symmetrical Chin Fur Rim -->
                <path d="M 22,217 Q 60,228 140,229 Q 220,228 258,217 Q 248,230 230,233 Q 140,234 50,233 Q 32,230 22,217 Z" fill="#262626" opacity="0.92"/>
            </g>

            <!-- SYMMETRICALLY BRIDGED VISCOUS DROOL STRANDS -->
            <g class="warg-drool-strands" stroke="url(#wargDrool3D)" stroke-linecap="round" fill="none" style="transform-origin:140px 130px; animation: wargDroolSnap3D 0.65s cubic-bezier(0.2, 0.85, 0.25, 1) forwards;">
                <!-- Left & Right Canine Main Drool Threads -->
                <path d="M 68,124 Q 69,142 72,160" stroke-width="2.6"/>
                <path d="M 68,124 Q 69,142 72,160" stroke="#ffffff" stroke-width="1" opacity="0.95"/>
                <path d="M 212,124 Q 211,142 208,160" stroke-width="2.6"/>
                <path d="M 212,124 Q 211,142 208,160" stroke="#ffffff" stroke-width="1" opacity="0.95"/>
                
                <!-- Premolar Drool Bridges -->
                <path d="M 76,96 Q 79,128 84,160" stroke-width="2"/>
                <path d="M 204,96 Q 201,128 196,160" stroke-width="2"/>

                <!-- Incisor Drool Strands -->
                <path d="M 106,86 Q 109,126 113,167" stroke-width="1.8"/>
                <path d="M 174,86 Q 171,126 167,167" stroke-width="1.8"/>

                <!-- Central Symmetrical Drool Column -->
                <path d="M 137,85 Q 138,126 139,168" stroke-width="2.2"/>
                <path d="M 143,85 Q 142,126 141,168" stroke-width="2.2"/>
                <path d="M 140,85 L 140,168" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>
            </g>

            <!-- 3D SPHERICAL DRIPPING DROOL BEADS (Symmetrically Positioned along Chin) -->
            <g class="warg-drool-drips" fill="rgba(240, 248, 255, 0.95)" style="animation: wargDroolDripsFall 0.65s ease-in forwards;">
                <ellipse cx="68" cy="220" rx="1.8" ry="3.2" opacity="0.9"/>
                <ellipse cx="106" cy="223" rx="2" ry="3.6" opacity="0.95"/>
                <ellipse cx="140" cy="225" rx="2.4" ry="4.2" opacity="0.95"/>
                <ellipse cx="174" cy="223" rx="2" ry="3.6" opacity="0.95"/>
                <ellipse cx="212" cy="220" rx="1.8" ry="3.2" opacity="0.9"/>
            </g>
        </svg>
    `;

    document.body.appendChild(bite);

    // Synchronize impact effects at the jaw clamp moment (~270ms)
    setTimeout(() => {
        if (window.LotrEngine && window.LotrEngine.screenShake) {
            window.LotrEngine.screenShake(10, 320);
        }
        if (window.LotrEngine && window.LotrEngine.spawnBurstAtElement) {
            window.LotrEngine.spawnBurstAtElement(targetEl, '#dc2626', 24);
            window.LotrEngine.spawnBurstAtElement(targetEl, '#f8fafc', 16);
        }
        if (window.shakeCard) {
            window.shakeCard(targetUid);
        }

        // High-velocity saliva explosion bursting outward from between the fangs
        const salivaExplosion = document.createElement('div');
        salivaExplosion.style.cssText = `
            position: fixed;
            left: ${cx}px;
            top: ${cy}px;
            width: 0; height: 0;
            z-index: 100006;
            pointer-events: none;
        `;
        let salivaHTML = `
            <style>
                @keyframes wargSalivaFly {
                    0% { transform: translate(0, 0) scale(var(--s0, 0.4)) rotate(var(--rot, 0deg)); opacity: 1; }
                    40% { opacity: 0.95; }
                    100% { transform: translate(var(--tx), var(--ty)) scale(var(--s1, 1.2)) rotate(var(--rot, 0deg)); opacity: 0; }
                }
                @keyframes wargSalivaShock {
                    0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0.9; border-width: 6px; }
                    100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; border-width: 1px; }
                }
            </style>
            <div style="position:absolute; left:0; top:0; width:90px; height:90px; border-radius:50%; border:3px solid rgba(255,255,255,0.9); box-shadow:0 0 16px rgba(224,242,254,0.8); animation:wargSalivaShock 0.4s ease-out forwards;"></div>
        `;
        const dropCount = 30;
        for (let i = 0; i < dropCount; i++) {
            const angle = (i / dropCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
            const dist = 50 + Math.random() * 95;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            const rot = (angle * 180 / Math.PI) + 90;
            const w = 3 + Math.random() * 3.5;
            const h = 8 + Math.random() * 14;
            const dur = 0.32 + Math.random() * 0.26;
            salivaHTML += `
                <div style="position:absolute; left:0; top:0; margin-left:-${w/2}px; margin-top:-${h/2}px; width:${w}px; height:${h}px; border-radius:50% 50% 40% 40% / 60% 60% 40% 40%; background:radial-gradient(circle at 30% 30%, #ffffff 0%, rgba(240,249,255,0.95) 45%, rgba(186,230,253,0.7) 100%); box-shadow:0 0 6px #ffffff, 0 0 10px rgba(186,230,253,0.6); --tx:${tx}px; --ty:${ty}px; --rot:${rot}deg; --s0:${0.3 + Math.random()*0.3}; --s1:${0.8 + Math.random()*0.5}; animation:wargSalivaFly ${dur}s cubic-bezier(0.12, 0.8, 0.25, 1) forwards;"></div>
            `;
        }
        salivaExplosion.innerHTML = salivaHTML;
        document.body.appendChild(salivaExplosion);
        setTimeout(() => salivaExplosion.remove(), 650);
    }, 270);

    setTimeout(() => {
        bite.remove();
    }, 660);
};

// Function for Goblin Troop multi-blade slash: Dol Guldur Orcs slash + rapid cross-cleave & sparks
window.triggerGoblinTroopSlash = function(targetUid) {
    if (typeof window.triggerDolGuldurOrcsSlash === 'function') {
        window.triggerDolGuldurOrcsSlash(targetUid, true);
    }
    setTimeout(() => {
        const targetEl = document.querySelector(`[data-uid="${targetUid}"]`);
        if (!targetEl) return;
        const r = targetEl.getBoundingClientRect();
        const slash = document.createElement('div');
        slash.style.cssText = `
            position: fixed; left: ${r.left - 24}px; top: ${r.top - 24}px;
            width: ${r.width + 48}px; height: ${r.height + 48}px;
            pointer-events: none; z-index: 100002; overflow: visible;
        `;
        slash.innerHTML = `
            <style>
                @keyframes troopCounterSlash {
                    0% { stroke-dashoffset: 280; opacity: 1; filter: drop-shadow(0 0 10px #ff2222) drop-shadow(0 0 3px #fff); }
                    60% { opacity: 1; }
                    100% { stroke-dashoffset: 0; opacity: 0; filter: drop-shadow(0 0 4px #b91c1c); }
                }
                @keyframes troopClashGlint {
                    0% { transform: scale(0) rotate(0deg); opacity: 1; }
                    50% { transform: scale(1.4) rotate(90deg); opacity: 1; }
                    100% { transform: scale(0) rotate(180deg); opacity: 0; }
                }
            </style>
            <svg viewBox="0 0 180 240" style="width:100%; height:100%; overflow:visible;">
                <defs>
                    <linearGradient id="troopBladeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="25%" stop-color="#fca5a5"/>
                        <stop offset="70%" stop-color="#dc2626"/>
                        <stop offset="100%" stop-color="#450a0a"/>
                    </linearGradient>
                </defs>
                <path d="M 162,32 Q 92,120 18,205" fill="none" stroke="url(#troopBladeGrad)" stroke-width="5" stroke-linecap="round" stroke-dasharray="280" stroke-dashoffset="280" style="animation: troopCounterSlash 0.24s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"/>
                <path d="M 158,35 Q 94,122 22,201" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-dasharray="280" stroke-dashoffset="280" style="animation: troopCounterSlash 0.24s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;"/>
                <g style="transform-origin: 90px 120px; animation: troopClashGlint 0.28s 0.08s ease-out forwards; opacity: 0;">
                    <polygon points="90,104 94,116 106,120 94,124 90,136 86,124 74,120 86,116" fill="#ffffff" filter="drop-shadow(0 0 6px #fca5a5)"/>
                </g>
            </svg>
        `;
        document.body.appendChild(slash);
        if (window.LotrEngine && typeof window.LotrEngine.spawnBurstAtElement === 'function') {
            window.LotrEngine.spawnBurstAtElement(targetEl, '#ef4444', 14);
        }
        setTimeout(() => slash.remove(), 320);
    }, 100);
};

// Hook into animateLunge to seamlessly trigger the spears whenever Goblin Runners attacks, and sword slash for Goblin Troop
if (!window._animateLungeGoblinRunnersHooked && window.animateLunge) {
    window._animateLungeGoblinRunnersHooked = true;
    const origAnimateLunge = window.animateLunge;
    window.animateLunge = function(attackerUid, targetUid) {
        const attacker = (window._cardRegistry && window._cardRegistry[attackerUid]) || 
                         (window.game && [...(window.game.engagedEnemies || []), ...(window.game.stagingArea || [])].find(c => c._uid === attackerUid));
        if (attacker && (attacker.id === 'oath_goblin_runners' || attacker.name === 'Goblin Runners')) {
            window.triggerGoblinRunnersSpearAttack(attackerUid, targetUid);
        }
        if (attacker && (attacker.id === 'oath_goblin_troop' || attacker.id === 'goblin_troop' || attacker.id === 'nibin_goblin_troop' || attacker.name === 'Goblin Troop')) {
            if (typeof window.triggerGoblinTroopSlash === 'function') {
                window.triggerGoblinTroopSlash(targetUid);
            } else if (typeof window.triggerDolGuldurOrcsSlash === 'function') {
                window.triggerDolGuldurOrcsSlash(targetUid, true);
            }
        }
        if (attacker && (attacker.id === 'oath_wild_wargs' || attacker.id === 'wild_wargs' || attacker.name === 'Wild Wargs' || attacker.id === 'wargs')) {
            if (typeof window.triggerWildWargsBite === 'function') {
                window.triggerWildWargsBite(targetUid);
            }
        }
        return origAnimateLunge.apply(this, arguments);
    };
}

// Patch Great Spider reveal and defeat sound effects
if (!window._oathGreatSpiderAudioPatched) {
    window._oathGreatSpiderAudioPatched = true;

    let _lastGoblinRunnersRevealTime = 0;
    const playGoblinRunnersRevealAudio = () => {
        const now = Date.now();
        if (now - _lastGoblinRunnersRevealTime < 1500) return;
        _lastGoblinRunnersRevealTime = now;
        try {
            const snd = new Audio('./sound_effects/dark_of_mirkwood/goblin_runners.mp3');
            const volSlider = document.getElementById('volume-slider');
            snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
            snd.play().catch(() => {});
        } catch(e) {}
    };
    window.playGoblinRunnersRevealAudio = playGoblinRunnersRevealAudio;

    let _lastGoblinRunnersDeathTime = 0;
    const playGoblinRunnersDeathAudio = () => {
        const now = Date.now();
        if (now - _lastGoblinRunnersDeathTime < 1000) return;
        _lastGoblinRunnersDeathTime = now;
        try {
            const snd = new Audio('./sound_effects/dark_of_mirkwood/goblin_runners_death.mp3');
            const volSlider = document.getElementById('volume-slider');
            snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
            snd.play().catch(() => {});
        } catch(e) {}
    };
    window.playGoblinRunnersDeathAudio = playGoblinRunnersDeathAudio;

    let _lastScavengersRevealTime = 0;
    const playScavengersRevealAudio = () => {
        const now = Date.now();
        if (now - _lastScavengersRevealTime < 1500) return;
        _lastScavengersRevealTime = now;
        try {
            const snd = new Audio('./sound_effects/dark_of_mirkwood/goblintown_scavengers.mp3');
            const volSlider = document.getElementById('volume-slider');
            snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
            snd.play().catch(() => {});
        } catch(e) {}
    };
    window.playScavengersRevealAudio = playScavengersRevealAudio;

    let _lastScavengersDefeatTime = 0;
    const playScavengersDefeatAudio = () => {
        const now = Date.now();
        if (now - _lastScavengersDefeatTime < 1000) return;
        _lastScavengersDefeatTime = now;
        try {
            const snd = new Audio('./sound_effects/dark_of_mirkwood/goblintown_scavengers_defeat.mp3');
            const volSlider = document.getElementById('volume-slider');
            snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
            snd.play().catch(() => {});
        } catch(e) {}
    };
    window.playScavengersDefeatAudio = playScavengersDefeatAudio;

    let _lastGoblinRunnersSurgeSpearTime = 0;
    const triggerGoblinRunnersSurgeSpear = (sourceEl) => {
        const now = Date.now();
        if (now - _lastGoblinRunnersSurgeSpearTime < 2000) return;
        _lastGoblinRunnersSurgeSpearTime = now;

        const deckEl = document.getElementById('encounter-deck-pile');
        if (!deckEl) return;

        const srcRect = sourceEl ? sourceEl.getBoundingClientRect() : null;
        const startX = srcRect ? (srcRect.left + srcRect.width / 2) : (window.innerWidth / 2);
        const startY = srcRect ? (srcRect.top + srcRect.height / 2) : (window.innerHeight / 2);

        const deckRect = deckEl.getBoundingClientRect();
        const deckCenterX = deckRect.left + deckRect.width / 2;
        const deckCenterY = deckRect.top + deckRect.height / 2;

        // Randomized landing spot clustered toward the middle of the encounter deck
        const angle = Math.random() * Math.PI * 2;
        const jitterDist = 0.08 + Math.random() * 0.22;
        const endX = deckCenterX + Math.cos(angle) * (deckRect.width * jitterDist);
        const endY = deckCenterY + Math.sin(angle) * (deckRect.height * jitterDist);
        const embedJitter = (Math.random() - 0.5) * 8;

        const dx = endX - startX;
        const dy = endY - startY;
        const straightDist = Math.hypot(dx, dy) || 1;

        try {
            const snd = new Audio('./sound_effects/dark_of_mirkwood/goblin_runners_attack.mp3');
            const volSlider = document.getElementById('volume-slider');
            snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
            snd.play().catch(() => {});
        } catch(e) {}

        const spear = document.createElement('div');
        spear.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: ${startY}px;
            width: 220px;
            height: 54px;
            margin-left: -190px;
            margin-top: -27px;
            transform-origin: 190px 27px;
            z-index: 100000;
            pointer-events: none;
            opacity: 0;
            filter: drop-shadow(0 0 10px rgba(245, 183, 77, 0.8)) drop-shadow(0 4px 10px rgba(0,0,0,0.9));
        `;
        spear.innerHTML = window.getGoblinRunnersSpearSvg ? window.getGoblinRunnersSpearSvg() : '';
        document.body.appendChild(spear);

        const arcApexY = Math.min(startY, endY) - (65 + straightDist * 0.14);
        const p0 = { x: startX, y: startY };
        const p1 = { x: (startX + endX) / 2, y: arcApexY };
        const p2 = { x: endX, y: endY };

        const flightDuration = 420;
        const launchTime = performance.now();

        const animateFlight = (timestamp) => {
            const elapsed = timestamp - launchTime;
            const progress = Math.min(1, elapsed / flightDuration);

            const t = progress;
            const invT = 1 - t;
            const curX = invT * invT * p0.x + 2 * invT * t * p1.x + t * t * p2.x;
            const curY = invT * invT * p0.y + 2 * invT * t * p1.y + t * t * p2.y;

            const vx = 2 * invT * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
            const vy = 2 * invT * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
            const currentAngleDeg = Math.atan2(vy, vx) * (180 / Math.PI);

            spear.style.left = `${curX}px`;
            spear.style.top = `${curY}px`;
            spear.style.transform = `rotate(${currentAngleDeg}deg) scale(${0.85 + progress * 0.2})`;
            spear.style.opacity = Math.min(1, progress * 4);

            if (progress < 1) {
                requestAnimationFrame(animateFlight);
            } else {
                if (window.LotrEngine && window.LotrEngine.spawnBurstAtElement) {
                    window.LotrEngine.spawnBurstAtElement(deckEl, '#ffb74d', 22);
                    window.LotrEngine.spawnBurstAtElement(deckEl, '#c0392b', 16);
                } else if (window.spawnBurstAtElement) {
                    window.spawnBurstAtElement(deckEl, '#ffb74d', 22);
                    window.spawnBurstAtElement(deckEl, '#c0392b', 16);
                }

                deckEl.style.transition = 'transform 0.08s ease-out';
                deckEl.style.transform = 'translate(-4px, 3px) scale(1.08) rotate(-3deg)';
                setTimeout(() => {
                    deckEl.style.transform = 'translate(3px, -2px) scale(1.04) rotate(2deg)';
                    setTimeout(() => {
                        deckEl.style.transform = '';
                    }, 120);
                }, 80);

                const surgeText = document.createElement('div');
                surgeText.style.cssText = `
                    position: fixed;
                    left: ${endX}px;
                    top: ${endY - 30}px;
                    transform: translate(-50%, 0) scale(0.6);
                    font-family: 'Cinzel Decorative', serif;
                    font-size: 2.2rem;
                    font-weight: 900;
                    color: #f5d76e;
                    text-shadow: 0 0 15px #f5d76e, 0 0 25px #ff5050, 0 2px 4px #000;
                    z-index: 100001;
                    pointer-events: none;
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                `;
                surgeText.textContent = 'SURGE!';
                document.body.appendChild(surgeText);

                requestAnimationFrame(() => {
                    surgeText.style.opacity = '1';
                    surgeText.style.transform = 'translate(-50%, -24px) scale(1.15)';
                });

                setTimeout(() => {
                    surgeText.style.transition = 'all 0.35s ease-out';
                    surgeText.style.opacity = '0';
                    surgeText.style.transform = 'translate(-50%, -50px) scale(0.9)';
                    setTimeout(() => surgeText.remove(), 350);
                }, 650);

                spear.style.transition = 'transform 0.15s ease-out, opacity 0.3s ease-out';
                spear.style.transform = `rotate(${currentAngleDeg + embedJitter}deg) scale(0.95)`;

                setTimeout(() => {
                    spear.style.opacity = '0';
                    setTimeout(() => spear.remove(), 300);
                }, 350);
            }
        };

        requestAnimationFrame(animateFlight);
    };
    window.triggerGoblinRunnersSurgeSpear = triggerGoblinRunnersSurgeSpear;

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
            if (card && (card.id === 'oath_spiders_of_mirkwood' || card.id === 'spiders_of_mirkwood' || card.name === 'Spiders of Mirkwood')) {
                window._lastDefeatedMirkwoodSpider = card;
            }
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
            if (inst && (inst.id === 'oath_goblin_troop' || inst.id === 'goblin_troop' || inst.name === 'Goblin Troop')) {
                const origSetDmg = Object.getOwnPropertyDescriptor(inst, 'damage')?.set;
                if (origSetDmg) {
                    Object.defineProperty(inst, 'damage', {
                        get() { return this._damage || 0; },
                        set(val) {
                            if (val >= (this.hp || 6) && !this._dead && !this._deathSoundPlayed) {
                                this._deathSoundPlayed = true;
                                playGoblinTroopDefeatedAudio();
                            } else if (val === 0) {
                                this._deathSoundPlayed = false;
                            }
                            origSetDmg.call(this, val);
                        },
                        enumerable: true,
                        configurable: true
                    });
                }
            }
            if (inst && (inst.id === 'oath_goblin_runners' || inst.id === 'goblin_runners' || inst.name === 'Goblin Runners')) {
                const origSetDmg = Object.getOwnPropertyDescriptor(inst, 'damage')?.set;
                if (origSetDmg) {
                    Object.defineProperty(inst, 'damage', {
                        get() { return this._damage || 0; },
                        set(val) {
                            if (val >= (this.hp || 2) && !this._dead && !this._deathSoundPlayed) {
                                this._deathSoundPlayed = true;
                                playGoblinRunnersDeathAudio();
                            } else if (val === 0) {
                                this._deathSoundPlayed = false;
                            }
                            origSetDmg.call(this, val);
                        },
                        enumerable: true,
                        configurable: true
                    });
                }
            }
            if (inst && (inst.id === 'oath_goblin_sniper' || inst.id === 'goblin_sniper' || inst.name === 'Goblin Sniper')) {
                const origSetDmg = Object.getOwnPropertyDescriptor(inst, 'damage')?.set;
                if (origSetDmg) {
                    Object.defineProperty(inst, 'damage', {
                        get() { return this._damage || 0; },
                        set(val) {
                            if (val >= (this.hp || 2) && !this._dead && !this._deathSoundPlayed) {
                                this._deathSoundPlayed = true;
                                playGoblinSniperDeathAudio();
                            } else if (val === 0) {
                                this._deathSoundPlayed = false;
                            }
                            origSetDmg.call(this, val);
                        },
                        enumerable: true,
                        configurable: true
                    });
                }
            }
            if (inst && (inst.id === 'oath_wild_wargs' || inst.id === 'wild_wargs' || inst.name === 'Wild Wargs' || inst.id === 'wargs')) {
                const origSetDmg = Object.getOwnPropertyDescriptor(inst, 'damage')?.set;
                if (origSetDmg) {
                    Object.defineProperty(inst, 'damage', {
                        get() { return this._damage || 0; },
                        set(val) {
                            if (val >= (this.hp || 3) && !this._dead && !this._deathSoundPlayed) {
                                this._deathSoundPlayed = true;
                                try {
                                    const snd = new Audio('./sound_effects/wargs_death.mp3');
                                    const volSlider = document.getElementById('volume-slider');
                                    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
                                    snd.play().catch(()=>{});
                                } catch(e) {}
                            } else if (val === 0) {
                                this._deathSoundPlayed = false;
                            }
                            origSetDmg.call(this, val);
                        },
                        enumerable: true,
                        configurable: true
                    });
                }
            }
            if (inst && (inst.id === 'oath_spiders_of_mirkwood' || inst.id === 'spiders_of_mirkwood' || inst.name === 'Spiders of Mirkwood')) {
                if (!inst.getAttackMod) {
                    inst.getAttackMod = function(c, target, game) {
                        const g = game || window.game || (window.LotrEngine && window.LotrEngine.game);
                        const isEngaged = g && g.engagedEnemies && g.engagedEnemies.includes(c);
                        if (isEngaged) {
                            const pIdx = c._engagedWithPlayerIdx !== undefined ? c._engagedWithPlayerIdx : (g.activeTabPlayerIdx || 0);
                            const playerChars = [...(g.heroes || []), ...(g.allies || [])].filter(char => char && char.exhausted && !char._prisoner && (char._ownerIdx === undefined ? 0 : char._ownerIdx) === pIdx);
                            return playerChars.length;
                        }
                        return 0;
                    };
                }
                const origSetDmg = Object.getOwnPropertyDescriptor(inst, 'damage')?.set;
                if (origSetDmg) {
                    Object.defineProperty(inst, 'damage', {
                        get() { return this._damage || 0; },
                        set(val) {
                            if (val >= (this.hp || 4)) {
                                window._lastDefeatedMirkwoodSpider = this;
                            }
                            if (val >= (this.hp || 4) && !this._dead && !this._deathSoundPlayed) {
                                this._deathSoundPlayed = true;
                                playSpidersOfMirkwoodDeathAudio();
                            } else if (val === 0) {
                                this._deathSoundPlayed = false;
                            }
                            origSetDmg.call(this, val);
                        },
                        enumerable: true,
                        configurable: true
                    });
                }
            }
            if (inst && (inst.id === 'oath_goblintown_scavengers' || inst.id === 'goblintown_scavengers' || inst.name === 'Goblintown Scavengers')) {
                const origSetDmg = Object.getOwnPropertyDescriptor(inst, 'damage')?.set;
                if (origSetDmg) {
                    Object.defineProperty(inst, 'damage', {
                        get() { return this._damage || 0; },
                        set(val) {
                            if (val >= (this.hp || 3) && !this._dead && !this._deathSoundPlayed) {
                                this._deathSoundPlayed = true;
                                playScavengersDefeatAudio();
                            } else if (val === 0) {
                                this._deathSoundPlayed = false;
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
            const isSpidersOfMirkwood = (window._currentRevealingCard && (window._currentRevealingCard.id === 'oath_spiders_of_mirkwood' || window._currentRevealingCard.id === 'spiders_of_mirkwood' || window._currentRevealingCard.name === 'Spiders of Mirkwood')) ||
                document.querySelector('#encounter-reveal-ghost [data-id="oath_spiders_of_mirkwood"], #encounter-reveal-ghost [data-id="spiders_of_mirkwood"]');
            
            if (isSpidersOfMirkwood) {
                playSpidersOfMirkwoodAppearAudio();
                return;
            }

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
            const isSpidersOfMirkwood = (window._lastDefeatedMirkwoodSpider && (window._lastDefeatedMirkwoodSpider.id === 'oath_spiders_of_mirkwood' || window._lastDefeatedMirkwoodSpider.id === 'spiders_of_mirkwood' || window._lastDefeatedMirkwoodSpider.name === 'Spiders of Mirkwood')) ||
                (window._lastDiscardedCard && (window._lastDiscardedCard.id === 'oath_spiders_of_mirkwood' || window._lastDiscardedCard.id === 'spiders_of_mirkwood' || window._lastDiscardedCard.name === 'Spiders of Mirkwood'));
            
            if (isSpidersOfMirkwood) {
                window._lastDefeatedMirkwoodSpider = null;
                playSpidersOfMirkwoodDeathAudio();
                return;
            }

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

// Patch The Eaves of Mirkwood reveal sound effect
if (!window._oathEavesOfMirkwoodAudioPatched) {
    window._oathEavesOfMirkwoodAudioPatched = true;

    let _lastGoblinTrailRevealTime = 0;
    window.playGoblinTrailAudio = function() {
        const now = Date.now();
        if (now - _lastGoblinTrailRevealTime < 1500) return;
        _lastGoblinTrailRevealTime = now;
        try {
            const snd = new Audio('./sound_effects/dark_of_mirkwood/goblin_trail.mp3');
            const volSlider = document.getElementById('volume-slider');
            snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
            snd.play().catch(()=>{});
        } catch(e) {}
    };

    let _lastAbandonedCampRevealTime = 0;
    window.playAbandonedCampAudio = function() {
        const now = Date.now();
        if (now - _lastAbandonedCampRevealTime < 1500) return;
        _lastAbandonedCampRevealTime = now;
        try {
            const snd = new Audio('./sound_effects/dark_of_mirkwood/abandoned_camp.mp3');
            const volSlider = document.getElementById('volume-slider');
            snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
            snd.play().catch(()=>{});
        } catch(e) {}
    };

    const playEavesOfMirkwoodAudio = () => {
        const snd = new Audio('./sound_effects/dark_of_mirkwood/the_eaves_of_mirkwood.mp3');
        const volSlider = document.getElementById('volume-slider');
        snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
        snd.play().catch(() => {
            const fallbackSnd = new Audio('./sound_effects/the_eaves_of_mirkwood.mp3');
            fallbackSnd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
            fallbackSnd.play().catch(() => {});
        });
    };
    window.playEavesOfMirkwoodAudio = playEavesOfMirkwoodAudio;

    let _lastEavesRevealTime = 0;
    const triggerEavesOfMirkwoodReveal = (card) => {
        if (!card) return;
        const isEaves = card.id === 'oath_the_eaves_of_mirkwood' || 
                        card.id === 'the_eaves_of_mirkwood' || 
                        card.id === 'eaves_of_mirkwood' || 
                        card.name === 'The Eaves of Mirkwood' ||
                        (card.name && card.name.includes('Eaves of Mirkwood'));
        if (isEaves) {
            const now = Date.now();
            if (now - _lastEavesRevealTime < 1500) return;
            _lastEavesRevealTime = now;
            playEavesOfMirkwoodAudio();
        }
    };
    window.triggerEavesOfMirkwoodReveal = triggerEavesOfMirkwoodReveal;

    let _lastObsidianArrowsRevealAudioTime = 0;
    window.playObsidianArrowsAudio = function() {
        const now = Date.now();
        if (now - _lastObsidianArrowsRevealAudioTime < 1500) return;
        _lastObsidianArrowsRevealAudioTime = now;
        try {
            const snd = new Audio('./sound_effects/dark_of_mirkwood/obsidian_arrows.mp3');
            const volSlider = document.getElementById('volume-slider');
            snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
            snd.play().catch(() => {});
        } catch(e) {}
    };

    window.launch3DObsidianArrows = function({ sourceEl, targetUid, count = 1, soundPath = '', onComplete = null }) {
        if (soundPath) {
            try {
                const snd = new Audio(soundPath);
                const volSlider = document.getElementById('volume-slider');
                snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
                snd.play().catch(() => {});
            } catch(e) {}
        }

        const targetEl = document.querySelector(`[data-uid="${targetUid}"]`);
        const sRect = sourceEl ? sourceEl.getBoundingClientRect() : { left: window.innerWidth / 2 - 72, top: window.innerHeight / 2 - 101, width: 144, height: 202 };
        const tRect = targetEl ? targetEl.getBoundingClientRect() : { left: window.innerWidth / 2 - 72, top: window.innerHeight / 2 - 101, width: 144, height: 202 };

        const arrowSvgMarkup = `
            <svg viewBox="0 0 130 26" width="130" height="26" style="overflow:visible; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.95));">
                <defs>
                    <linearGradient id="obsidianGlass" x1="0%" y1="0%" x2="100%" y2="50%">
                        <stop offset="0%" stop-color="#050508"/>
                        <stop offset="35%" stop-color="#1e1b4b"/>
                        <stop offset="70%" stop-color="#0f172a"/>
                        <stop offset="92%" stop-color="#e2e8f0"/>
                        <stop offset="100%" stop-color="#ffffff"/>
                    </linearGradient>
                    <linearGradient id="obsidianFacetUnder" x1="0%" y1="50%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#020204"/>
                        <stop offset="50%" stop-color="#09090b"/>
                        <stop offset="100%" stop-color="#1e1b4b"/>
                    </linearGradient>
                    <linearGradient id="arrowShaft" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#451a03"/>
                        <stop offset="40%" stop-color="#271206"/>
                        <stop offset="100%" stop-color="#0f0502"/>
                    </linearGradient>
                    <linearGradient id="ravenFeather" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#0f172a"/>
                        <stop offset="50%" stop-color="#1e1b4b"/>
                        <stop offset="100%" stop-color="#334155"/>
                    </linearGradient>
                </defs>
                <line x1="6" y1="13" x2="106" y2="13" stroke="url(#arrowShaft)" stroke-width="3.6" stroke-linecap="round"/>
                <line x1="8" y1="12.2" x2="104" y2="12.2" stroke="#78350f" stroke-width="0.8" opacity="0.6"/>
                <path d="M 10,12.5 L 18,5 L 34,5 L 36,12.5 Z" fill="url(#ravenFeather)"/>
                <path d="M 10,13.5 L 18,21 L 34,21 L 36,13.5 Z" fill="url(#ravenFeather)"/>
                <line x1="16" y1="6" x2="14" y2="12" stroke="#020617" stroke-width="0.8"/>
                <line x1="22" y1="6" x2="20" y2="12" stroke="#020617" stroke-width="0.8"/>
                <line x1="28" y1="6" x2="26" y2="12" stroke="#020617" stroke-width="0.8"/>
                <line x1="16" y1="20" x2="14" y2="14" stroke="#020617" stroke-width="0.8"/>
                <line x1="22" y1="20" x2="20" y2="14" stroke="#020617" stroke-width="0.8"/>
                <line x1="28" y1="20" x2="26" y2="14" stroke="#020617" stroke-width="0.8"/>
                <rect x="8" y="11" width="3" height="4" fill="#991b1b" rx="0.5"/>
                <rect x="35" y="11" width="3.5" height="4" fill="#991b1b" rx="0.5"/>
                <rect x="101" y="11" width="7" height="4.2" fill="#78350f" rx="0.8"/>
                <line x1="103" y1="11" x2="104" y2="15.2" stroke="#451a03" stroke-width="1"/>
                <line x1="106" y1="11" x2="107" y2="15.2" stroke="#451a03" stroke-width="1"/>
                <polygon points="106,13 111,6 128,13" fill="url(#obsidianGlass)"/>
                <polygon points="106,13 111,20 128,13" fill="url(#obsidianFacetUnder)"/>
                <polygon points="104,13 108,7 112,11 108,13" fill="#09090b"/>
                <polygon points="104,13 108,19 112,15 108,13" fill="#020204"/>
                <line x1="107" y1="13" x2="128" y2="13" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round"/>
                <path d="M 111,6 L 128,13 L 111,20" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="0.8"/>
            </svg>
        `;

        let completed = 0;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const startX = sRect.left + sRect.width / 2 + (count > 1 ? (Math.random() - 0.5) * 45 : 0);
                const startY = sRect.top + sRect.height / 2 + (count > 1 ? (Math.random() - 0.5) * 45 : 0);
                const endX = tRect.left + tRect.width / 2 + (count > 1 ? (Math.random() - 0.5) * (tRect.width * 0.45) : (Math.random() - 0.5) * 14);
                const endY = tRect.top + tRect.height / 2 + (count > 1 ? (Math.random() - 0.5) * (tRect.height * 0.45) : (Math.random() - 0.5) * 14);

                const lateralArc = (i % 2 === 0 ? -1 : 1) * (20 + Math.random() * 25);
                const arcHeight = 55 + Math.random() * 35;
                const midX = (startX + endX) / 2 + lateralArc;
                const midY = Math.min(startY, endY) - arcHeight;

                const p0 = { x: startX, y: startY };
                const p1 = { x: midX, y: midY };
                const p2 = { x: endX, y: endY };

                const arrowWrap = document.createElement('div');
                arrowWrap.style.cssText = `
                    position: fixed;
                    left: ${startX}px;
                    top: ${startY}px;
                    width: 130px;
                    height: 26px;
                    margin-left: -128px;
                    margin-top: -13px;
                    transform-origin: 128px 13px;
                    z-index: 100005;
                    pointer-events: none;
                    perspective: 800px;
                    opacity: 0;
                `;

                const arrow3D = document.createElement('div');
                arrow3D.style.cssText = `
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                `;
                arrow3D.innerHTML = arrowSvgMarkup;
                arrowWrap.appendChild(arrow3D);
                document.body.appendChild(arrowWrap);

                const flightDuration = 390 + Math.random() * 70;
                const startTime = performance.now();
                const spinDirection = i % 2 === 0 ? 1 : -1;
                const totalRotations = (3 + Math.random()) * 360 * spinDirection;

                const animateArrow = (now) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(1, elapsed / flightDuration);
                    const t = progress;
                    const invT = 1 - t;

                    const curX = invT * invT * p0.x + 2 * invT * t * p1.x + t * t * p2.x;
                    const curY = invT * invT * p0.y + 2 * invT * t * p1.y + t * t * p2.y;

                    const vx = 2 * invT * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
                    const vy = 2 * invT * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
                    const flightAngle = Math.atan2(vy, vx) * (180 / Math.PI);

                    arrowWrap.style.left = `${curX}px`;
                    arrowWrap.style.top = `${curY}px`;
                    arrowWrap.style.transform = `rotate(${flightAngle}deg) scale(${0.85 + progress * 0.15})`;
                    arrowWrap.style.opacity = Math.min(1, progress * 4);
                    arrow3D.style.transform = `rotateX(${t * totalRotations}deg)`;

                    if (progress < 1) {
                        requestAnimationFrame(animateArrow);
                    } else {
                        if (window.shakeCard) window.shakeCard(targetUid);
                        if (window.LotrEngine && window.LotrEngine.spawnBurstAtElement) {
                            window.LotrEngine.spawnBurstAtElement(targetEl, '#c0392b', 10);
                            window.LotrEngine.spawnBurstAtElement(targetEl, '#0f172a', 8);
                        }

                        arrowWrap.style.transition = 'opacity 0.28s ease-out';
                        setTimeout(() => {
                            arrowWrap.style.opacity = '0';
                            setTimeout(() => arrowWrap.remove(), 280);
                        }, 260);

                        completed++;
                        if (completed === count && onComplete) {
                            onComplete();
                        }
                    }
                };

                requestAnimationFrame(animateArrow);
            }, i * 55);
        }
    };

    // 1. Hook animateRevealEncounterCard
    const hookEavesReveal = () => {
        if (window.animateRevealEncounterCard && !window.animateRevealEncounterCard._eavesAudioHooked) {
            const origAnim = window.animateRevealEncounterCard;
            window.animateRevealEncounterCard = function(card, cb) {
                if (card && (card.id === 'oath_the_eaves_of_mirkwood' || card.id === 'the_eaves_of_mirkwood' || card.name === 'The Eaves of Mirkwood')) {
                    setTimeout(() => {
                        triggerEavesOfMirkwoodReveal(card);
                    }, 450);
                }
                if (card && (card.id === 'oath_goblin_trail' || card.id === 'goblin_trail' || card.name === 'Goblin Trail')) {
                    setTimeout(window.playGoblinTrailAudio, 450);
                }
                if (card && (card.id === 'oath_abandoned_camp' || card.id === 'abandoned_camp' || card.name === 'Abandoned Camp')) {
                    setTimeout(window.playAbandonedCampAudio, 450);
                }
                if (card && (card.id === 'oath_obsidian_arrows' || card.id === 'obsidian_arrows' || card.name === 'Obsidian Arrows')) {
                    setTimeout(window.playObsidianArrowsAudio, 450);
                }
								if (card && (card.id === 'oath_driven_by_shadow' || card.id === 'driven_by_shadow' || card.name === 'Driven by Shadow')) {
                    setTimeout(() => {
                        if (typeof window.triggerDrivenByShadow === 'function') {
                            window.triggerDrivenByShadow();
                        }
                    }, 500);
                }
                if (card && (card.id === 'oath_surprising_speed' || card.name === 'Surprising Speed')) {
                    setTimeout(() => {
                        try {
                            const snd = new Audio('./sound_effects/dark_of_mirkwood/surprising_speed.mp3');
                            const volSlider = document.getElementById('volume-slider');
                            snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
                            snd.play().catch(()=>{});
                        } catch(e) {}
                    }, 450);
                }
                if (card && (card.id === 'oath_goblins_are_upon_you' || card.name === 'Goblins are Upon You!' || (card.name && card.name.includes('Goblins are Upon You')))) {
                    setTimeout(playGoblinsAreUponYouAudio, 450);
                }
                if (card && (card.id === 'oath_eyes_in_the_dark' || card.name === 'Eyes in the Dark' || (card.name && card.name.includes('Eyes in the Dark')))) {
                    setTimeout(playEyesInTheDarkAudio, 600);
                }
                if (card && (card.id === 'oath_goblin_runners' || card.id === 'goblin_runners' || card.name === 'Goblin Runners')) {
                    setTimeout(playGoblinRunnersRevealAudio, 450);
                    setTimeout(() => {
                        const ghost = document.getElementById('encounter-reveal-ghost') || document.querySelector(`[data-uid="${card._uid}"]`);
                        triggerGoblinRunnersSurgeSpear(ghost);
                    }, 850);
                }
                if (card && (card.id === 'oath_goblintown_scavengers' || card.id === 'goblintown_scavengers' || card.name === 'Goblintown Scavengers')) {
                    setTimeout(playScavengersRevealAudio, 450);
                }
                if (card && (card.id === 'oath_spiders_of_mirkwood' || card.id === 'spiders_of_mirkwood' || card.name === 'Spiders of Mirkwood')) {
                    setTimeout(playSpidersOfMirkwoodAppearAudio, 450);
                }
                if (card && (card.id === 'oath_spider_den' || card.id === 'spider_den' || card.name === 'Spider Den')) {
                    setTimeout(window.playSpiderDenAudio, 300);
                }
                if (card && (card.id === 'oath_goblin_troop' || card.id === 'goblin_troop' || card.name === 'Goblin Troop')) {
                    setTimeout(playGoblinTroopAudio, 450);
                }
                if (card && (card.id === 'oath_tangled_grove' || card.id === 'tangled_grove' || card.name === 'Tangled Grove')) {
                    card._justRevealedTangled = Date.now();
                    if (typeof window.animateRevealTangledGrove === 'function') {
                        return window.animateRevealTangledGrove(card, cb, origAnim);
                    }
                }
                return origAnim.apply(this, arguments);
            };
            window.animateRevealEncounterCard._eavesAudioHooked = true;
        }
    };
    hookEavesReveal();
    setInterval(hookEavesReveal, 300);

    // 2. Hook window.SoundFX
    const hookSoundFX = () => {
        if (window.SoundFX) {
            if (!window.SoundFX.playTheEavesOfMirkwood) {
                window.SoundFX.playTheEavesOfMirkwood = playEavesOfMirkwoodAudio;
            }
            if (!window.SoundFX.playEavesOfMirkwood) {
                window.SoundFX.playEavesOfMirkwood = playEavesOfMirkwoodAudio;
            }
            if (!window.SoundFX.playGoblintownScavengersThreatToken) {
                window.SoundFX.playGoblintownScavengersThreatToken = playGoblintownScavengersThreatTokenAudio;
            }
            if (!window.SoundFX.playGoblinSniperDeath) {
                window.SoundFX.playGoblinSniperDeath = playGoblinSniperDeathAudio;
            }
            if (!window.SoundFX.playSpidersOfMirkwoodAppear) {
                window.SoundFX.playSpidersOfMirkwoodAppear = playSpidersOfMirkwoodAppearAudio;
            }
            if (!window.SoundFX.playSpidersOfMirkwoodDeath) {
                window.SoundFX.playSpidersOfMirkwoodDeath = playSpidersOfMirkwoodDeathAudio;
            }
            if (!window.SoundFX.playSpidersOfMirkwoodAttack) {
                window.SoundFX.playSpidersOfMirkwoodAttack = playSpidersOfMirkwoodAttackAudio;
            }
            if (!window.SoundFX.playTangledGrove) {
                window.SoundFX.playTangledGrove = playTangledGroveAudio;
            }
            if (!window.SoundFX.playSpiderDen) {
                window.SoundFX.playSpiderDen = playSpiderDenAudio;
            }
            if (!window.SoundFX.playAbandonedCamp) {
                window.SoundFX.playAbandonedCamp = window.playAbandonedCampAudio;
            }
        }
    };
    hookSoundFX();
    if (!window.SoundFX) setTimeout(hookSoundFX, 500);

    // 3. Observer on encounter-reveal-ghost
    const eavesObs = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const n of m.addedNodes) {
                if (n && n.nodeType === 1) {
                    const isGhost = n.id === 'encounter-reveal-ghost' || (n.querySelector && n.querySelector('#encounter-reveal-ghost'));
                    if (isGhost) {
                        const target = n.id === 'encounter-reveal-ghost' ? n : n.querySelector('#encounter-reveal-ghost');
                        if (target && (target.querySelector('[data-id="oath_the_eaves_of_mirkwood"]') || (target.textContent || '').includes('The Eaves of Mirkwood'))) {
                            setTimeout(() => {
                                const now = Date.now();
                                if (now - _lastEavesRevealTime < 1500) return;
                                _lastEavesRevealTime = now;
                                playEavesOfMirkwoodAudio();
                            }, 450);
                        }
                        if (target && (target.querySelector('[data-id="oath_surprising_speed"]') || (target.textContent || '').includes('Surprising Speed'))) {
                            setTimeout(() => {
                                try {
                                    const snd = new Audio('./sound_effects/dark_of_mirkwood/surprising_speed.mp3');
                                    const volSlider = document.getElementById('volume-slider');
                                    snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
                                    snd.play().catch(()=>{});
                                } catch(e) {}
                            }, 450);
                        }
                        if (target && (target.querySelector('[data-id="oath_goblins_are_upon_you"]') || (target.textContent || '').includes('Goblins are Upon You'))) {
                            setTimeout(playGoblinsAreUponYouAudio, 600);
                        }
                        if (target && (target.querySelector('[data-id="oath_eyes_in_the_dark"]') || (target.textContent || '').includes('Eyes in the Dark'))) {
                            setTimeout(playEyesInTheDarkAudio, 600);
                        }
                        if (target && (target.querySelector('[data-id="oath_goblin_runners"], [data-id="goblin_runners"]') || (target.textContent || '').includes('Goblin Runners'))) {
                            setTimeout(playGoblinRunnersRevealAudio, 450);
                            setTimeout(() => {
                                triggerGoblinRunnersSurgeSpear(target);
                            }, 850);
                        }
                        if (target && (target.querySelector('[data-id="oath_goblintown_scavengers"], [data-id="goblintown_scavengers"]') || (target.textContent || '').includes('Goblintown Scavengers'))) {
                            setTimeout(playScavengersRevealAudio, 450);
                        }
                        if (target && (target.querySelector('[data-id="oath_spiders_of_mirkwood"], [data-id="spiders_of_mirkwood"]') || (target.textContent || '').includes('Spiders of Mirkwood'))) {
                            setTimeout(playSpidersOfMirkwoodAppearAudio, 450);
                        }
                        if (target && (target.querySelector('[data-id="oath_spider_den"], [data-id="spider_den"]') || (target.textContent || '').includes('Spider Den'))) {
                            setTimeout(window.playSpiderDenAudio, 450);
                        }
                        if (target && (target.querySelector('[data-id="oath_goblin_troop"], [data-id="goblin_troop"]') || (target.textContent || '').includes('Goblin Troop'))) {
                            setTimeout(playGoblinTroopAudio, 450);
                        }
                        if (target && (target.querySelector('[data-id="oath_goblin_trail"], [data-id="goblin_trail"]') || (target.textContent || '').includes('Goblin Trail'))) {
                            setTimeout(window.playGoblinTrailAudio, 450);
                        }
                        if (target && (target.querySelector('[data-id="oath_abandoned_camp"], [data-id="abandoned_camp"]') || (target.textContent || '').includes('Abandoned Camp'))) {
                            setTimeout(window.playAbandonedCampAudio, 450);
                        }
                        if (target && (target.querySelector('[data-id="oath_obsidian_arrows"], [data-id="obsidian_arrows"]') || (target.textContent || '').includes('Obsidian Arrows'))) {
                            setTimeout(window.playObsidianArrowsAudio, 450);
                        }
                        const isTangled = target && (
                            target.querySelector('[data-id*="tangled_grove"]') ||
                            target.innerHTML.includes('Tangled Grove') ||
                            target.innerHTML.includes('Tangled-Grove') ||
                            (target.textContent || '').includes('Tangled Grove')
                        );
                        if (isTangled) {
                            setTimeout(() => {
                                playTangledGroveAudio(true);
                            }, 950);
                        }
                    }
                }
            }
        }
    });
    eavesObs.observe(document.body, { childList: true, subtree: true });

    // 4. Observer for defeat notifications on Goblin Runners and Goblintown Scavengers
    const enemyDeathObs = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const n of m.addedNodes) {
                if (n && n.nodeType === 1) {
                    const txt = n.textContent || '';
                    if (txt.includes('Enemy Defeated!')) {
                        if (txt.includes('Goblin Runners')) {
                            playGoblinRunnersDeathAudio();
                        } else if (txt.includes('Goblintown Scavengers')) {
                            playScavengersDefeatAudio();
                        } else if (txt.includes('Goblin Sniper')) {
                            playGoblinSniperDeathAudio();
                        } else if (txt.includes('Spiders of Mirkwood')) {
                            playSpidersOfMirkwoodDeathAudio();
                        } else if (txt.includes('Goblin Troop')) {
                            playGoblinTroopDefeatedAudio();
                        } else if (txt.includes('Wild Wargs') || txt.includes('Wargs')) {
                            try {
                                const snd = new Audio('./sound_effects/wargs_death.mp3');
                                const volSlider = document.getElementById('volume-slider');
                                snd.volume = volSlider ? parseFloat(volSlider.value) : 0.25;
                                snd.play().catch(()=>{});
                            } catch(e) {}
                        }
                    }
                }
            }
        }
    });
    const tc = document.getElementById('toast-container');
    if (tc) enemyDeathObs.observe(tc, { childList: true });

    // 4. Hook animateDrawDirectToStaging so anytime Eaves of Mirkwood or Tangled Grove appears (such as setup) it plays the audio
    const hookDrawDirectToStaging = () => {
        const origDirect = window.animateDrawDirectToStaging || (window.LotrEngine && window.LotrEngine.animateDrawDirectToStaging);
        if (origDirect && !origDirect._eavesAudioHooked) {
            const wrappedDirect = function(card, cb) {
                if (card && (card.id === 'oath_the_eaves_of_mirkwood' || card.id === 'the_eaves_of_mirkwood' || card.name === 'The Eaves of Mirkwood')) {
                    triggerEavesOfMirkwoodReveal(card);
                }
                if (card && (card.id === 'oath_spiders_of_mirkwood' || card.id === 'spiders_of_mirkwood' || card.name === 'Spiders of Mirkwood')) {
                    setTimeout(playSpidersOfMirkwoodAppearAudio, 300);
                }
                if (card && (card.id === 'oath_goblin_troop' || card.id === 'goblin_troop' || card.name === 'Goblin Troop')) {
                    setTimeout(playGoblinTroopAudio, 300);
                }
                if (card && (card.id === 'oath_goblin_trail' || card.id === 'goblin_trail' || card.name === 'Goblin Trail')) {
                    setTimeout(window.playGoblinTrailAudio, 300);
                }
                if (card && (card.id === 'oath_abandoned_camp' || card.id === 'abandoned_camp' || card.name === 'Abandoned Camp')) {
                    setTimeout(window.playAbandonedCampAudio, 300);
                }
                if (card && (card.id === 'oath_tangled_grove' || card.id === 'tangled_grove' || card.name === 'Tangled Grove')) {
                    card._justRevealedTangled = Date.now();
                    setTimeout(() => {
                        if (typeof triggerTangledGroveReveal === 'function') {
                            triggerTangledGroveReveal(card);
                        } else if (typeof window.triggerTangledGroveReveal === 'function') {
                            window.triggerTangledGroveReveal(card);
                        }
                    }, 1100);
                }
                return origDirect.apply(this, arguments);
            };
            wrappedDirect._eavesAudioHooked = true;
            window.animateDrawDirectToStaging = wrappedDirect;
            if (window.LotrEngine) {
                window.LotrEngine.animateDrawDirectToStaging = wrappedDirect;
            }
        }
    };
    hookDrawDirectToStaging();
    setInterval(hookDrawDirectToStaging, 300);
}

// === TANGLED GROVE ENCOUNTER REVEAL SOUND & PERSISTENT STAGING VEIN ROOTS ANIMATION ===
if (!window._oathTangledGroveRootsPatched) {
    window._oathTangledGroveRootsPatched = true;

    // 1. Inject CSS for Tangled Grove vein-roots and epic token emergence
    const injectTangledGroveStyles = () => {
        if (document.getElementById('tangled-grove-roots-style')) return;
        const style = document.createElement('style');
        style.id = 'tangled-grove-roots-style';
        style.textContent = `
            .tangled-grove-roots-overlay {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 5 !important;
                overflow: hidden;
                border-radius: 6px;
            }
            .tangled-grove-roots-overlay svg {
                width: 100%;
                height: 100%;
                display: block;
                overflow: visible;
            }
            .card .token-layer,
            .card .status-buff-tokens,
            .card .buff-token,
            .card [class*="threat"],
            .card .token {
                z-index: 25 !important;
            }
            .tangled-grove-roots-overlay.persisting .tg-vein-path {
                stroke-dashoffset: 0 !important;
            }
        `;
        document.head.appendChild(style);
    };
    injectTangledGroveStyles();

    // 2. Procedural SVG generator for larger, thicker roots with tapered fine ends
    const generateTangledGroveVeinsSVG = (seed = 101, isGrowing = false) => {
        let s = Math.abs(seed || 101);
        const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
        const randRange = (min, max) => min + rand() * (max - min);

        // Branch origins: spread across edges and reaching across the card
        const origins = [
            { x: -2, y: randRange(80, 130), angle: randRange(-0.25, 0.25), steps: 3 },
            { x: -2, y: 36, angle: randRange(-0.05, 0.32), steps: 3 },
            { x: 146, y: randRange(50, 95), angle: Math.PI + randRange(-0.25, 0.25), steps: 3 },
            { x: 146, y: randRange(130, 170), angle: Math.PI + randRange(-0.25, 0.25), steps: 3 },
            { x: randRange(45, 95), y: 204, angle: -Math.PI / 2 + randRange(-0.25, 0.25), steps: 3 }
        ];

        const paths = [];

        function growBranch(startX, startY, currentAngle, stepsLeft, depth, maxDepth, branchStartDelay = 0) {
            if (stepsLeft <= 0 || depth > maxDepth) return;
            let cx = startX;
            let cy = startY;
            const stepCount = stepsLeft;
            let curAngle = currentAngle;
            // Full, thick root base trunks (6.2px -> 3.8px -> 2.2px)
            const baseWidth = depth === 0 ? 6.2 : (depth === 1 ? 3.8 : 2.2);

            for (let i = 0; i < stepCount; i++) {
                const segLen = randRange(20, 30) * (1 - depth * 0.15);
                curAngle += randRange(-0.26, 0.26);

                const cp1x = cx + Math.cos(curAngle) * (segLen * 0.35) + Math.cos(curAngle + Math.PI / 2) * randRange(-2.2, 2.2);
                const cp1y = cy + Math.sin(curAngle) * (segLen * 0.35) + Math.sin(curAngle + Math.PI / 2) * randRange(-2.2, 2.2);
                const nextX = cx + Math.cos(curAngle) * segLen;
                const nextY = cy + Math.sin(curAngle) * segLen;
                const cp2x = nextX - Math.cos(curAngle) * (segLen * 0.35) + Math.cos(curAngle + Math.PI / 2) * randRange(-2.2, 2.2);
                const cp2y = nextY - Math.sin(curAngle) * (segLen * 0.35) + Math.sin(curAngle + Math.PI / 2) * randRange(-2.2, 2.2);

                const segD = `M ${cx.toFixed(1)} ${cy.toFixed(1)} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${nextX.toFixed(1)} ${nextY.toFixed(1)}`;

                const t = (i + 1) / stepCount;
                const taperFactor = Math.max(0.14, 1.0 - t * 0.86);
                const sw = Math.max(0.65, baseWidth * taperFactor);
                const segDelay = branchStartDelay + i * 0.16;

                paths.push({ d: segD, depth, sw, delaySec: segDelay.toFixed(2) });

                cx = nextX;
                cy = nextY;

                if (depth < maxDepth && i >= 1 && rand() < 0.35) {
                    const branchAngle = curAngle + randRange(0.42, 0.68) * (rand() > 0.5 ? 1 : -1);
                    growBranch(cx, cy, branchAngle, 2, depth + 1, maxDepth, segDelay + 0.08);
                }
            }
        }

        origins.forEach(orig => {
            growBranch(orig.x, orig.y, orig.angle, orig.steps, 0, 1, 0);
        });

        const growCls = isGrowing ? "tg-vein-path tg-growing" : "tg-vein-path";
        const initOffset = isGrowing ? "1000" : "0";

        let shadowPaths = "";
        let woodPaths = "";
        let ridgePaths = "";
        let mossPaths = "";

        paths.forEach((p, idx) => {
            const swTrunk = p.sw;
            const swShadow = swTrunk + Math.max(1.4, swTrunk * 0.7);
            const swRidge = Math.max(0.4, swTrunk * 0.38);

            shadowPaths += `<path class="${growCls}" data-delay="${p.delaySec}" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="${initOffset}" stroke-width="${swShadow.toFixed(2)}" d="${p.d}" />\n`;
            woodPaths += `<path class="${growCls}" data-delay="${p.delaySec}" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="${initOffset}" stroke-width="${swTrunk.toFixed(2)}" d="${p.d}" />\n`;
            if (swTrunk > 0.8) {
                ridgePaths += `<path class="${growCls}" data-delay="${p.delaySec}" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="${initOffset}" stroke-width="${swRidge.toFixed(2)}" d="${p.d}" />\n`;
            }
            if (idx % 2 === 0 && swTrunk > 0.65) {
                mossPaths += `<path class="${growCls}" data-delay="${p.delaySec}" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="${initOffset}" stroke-width="${(swTrunk * 0.5).toFixed(2)}" d="${p.d}" />\n`;
            }
        });

        return `
<svg viewBox="0 0 144 202" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <defs>
    <filter id="tgVeinShadow_${seed}" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" flood-color="#040201" flood-opacity="0.95"/>
    </filter>
    <linearGradient id="tgVeinWoodGrad_${seed}" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#1f0f04"/>
      <stop offset="50%" stop-color="#3b1d09"/>
      <stop offset="100%" stop-color="#5a2e12"/>
    </linearGradient>
    <linearGradient id="tgVeinHighlightGrad_${seed}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7c461c"/>
      <stop offset="100%" stop-color="#9a5a26"/>
    </linearGradient>
    <linearGradient id="tgVeinSapGrad_${seed}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#65a30d"/>
      <stop offset="100%" stop-color="#365314"/>
    </linearGradient>
  </defs>

  <g filter="url(#tgVeinShadow_${seed})" stroke="#090502" stroke-linecap="round" stroke-linejoin="round">
    ${shadowPaths}
  </g>
  <g stroke="url(#tgVeinWoodGrad_${seed})" stroke-linecap="round" stroke-linejoin="round">
    ${woodPaths}
  </g>
  <g stroke="url(#tgVeinHighlightGrad_${seed})" stroke-linecap="round" stroke-linejoin="round">
    ${ridgePaths}
  </g>
  <g stroke="url(#tgVeinSapGrad_${seed})" stroke-linecap="round" stroke-linejoin="round">
    ${mossPaths}
  </g>
</svg>
`;
    };
    window.generateTangledGroveVeinsSVG = generateTangledGroveVeinsSVG;

    // 3. Attach roots to a card and trigger Goblin Troop-style token emergence
    const attachRootsToCardElement = (cardEl, isGrowing = false, cardObj = null) => {
        if (!cardEl) return;
        injectTangledGroveStyles();
        let existingOverlay = cardEl.querySelector('.tangled-grove-roots-overlay');
        if (existingOverlay) {
            if (!isGrowing) return;
            existingOverlay.remove();
        }

        let seed = 101;
        if (cardObj && cardObj._uid) {
            seed = Number(String(cardObj._uid).replace(/\D/g, '')) || 101;
        } else {
            const uidAttr = cardEl.getAttribute('data-uid');
            if (uidAttr) {
                seed = Number(String(uidAttr).replace(/\D/g, '')) || 101;
            }
        }

        let svgContent = generateTangledGroveVeinsSVG(seed, isGrowing);
        if (cardObj) {
            cardObj._tangledGroveRootsSeed = seed;
        }

        const overlay = document.createElement('div');
        overlay.className = `tangled-grove-roots-overlay ${isGrowing ? 'growing' : 'persisting'}`;
        overlay.innerHTML = svgContent;
        cardEl.appendChild(overlay);

        if (cardObj) {
            cardObj._rootsOverlayElement = overlay;
        }

        if (!isGrowing) {
            cardEl.classList.add('tg-roots-finished');
            if (cardObj) cardObj._rootsGrown = true;
            cardEl.querySelectorAll('.status-buff-tokens .buff-token').forEach(t => t.classList.add('buff-token-ready'));
            return;
        }

        cardEl.classList.remove('tg-roots-finished');
        if (cardObj) {
            cardObj._rootsGrown = false;
        }

        const growPaths = overlay.querySelectorAll('.tg-vein-path.tg-growing');
        growPaths.forEach(p => {
            const delaySec = parseFloat(p.getAttribute('data-delay') || '0');
            if (typeof p.animate === 'function') {
                p.animate([
                    { strokeDashoffset: '1000' },
                    { strokeDashoffset: '0' }
                ], {
                    duration: 1250,
                    delay: delaySec * 1000,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    fill: 'forwards'
                });
            }
        });

        // Trigger threat token appearance in the exact same Goblin Troop entrance style
        if (!cardObj?._threatTokenTimerStarted) {
            if (cardObj) cardObj._threatTokenTimerStarted = true;
            
            setTimeout(() => {
                const liveEl = document.querySelector(`[data-uid="${cardObj._uid}"]`);
                if (liveEl && typeof window.triggerEpicTokenEntrance === 'function') {
                    window.triggerEpicTokenEntrance(liveEl, true);
                }
                if (cardObj) cardObj._threatTokenEntered = true;
                
                setTimeout(() => {
                    if (cardObj) cardObj._rootsGrown = true;
                }, 700);
            }, 100); // Threat token blooms almost immediately as the roots begin spreading
        }

        setTimeout(() => {
            if (overlay) {
                overlay.classList.remove('growing');
                overlay.classList.add('persisting');
                const paths = overlay.querySelectorAll('.tg-vein-path');
                paths.forEach(p => {
                    p.classList.remove('tg-growing');
                    p.style.strokeDashoffset = '0';
                });
            }
        }, 1800);
    };
    window.attachTangledGroveRoots = attachRootsToCardElement;

    // 4. Reveal Animation for Tangled Grove:
    // Flips completely face-up in center with sound, slides to staging, and THEN grows roots on the card in staging!
    const animateRevealTangledGrove = (card, cb, origAnim) => {
        if (!card || typeof cardHTML !== 'function') {
            if (typeof origAnim === 'function') return origAnim(card, cb);
            if (typeof cb === 'function') cb();
            return;
        }

        card._tangledRevealedHandled = true;

        const staging = document.getElementById('staging-content') || document.body;
        const startX = staging.getBoundingClientRect().right - 100;
        const startY = staging.getBoundingClientRect().top;

        const ghostWrap = document.createElement('div');
        ghostWrap.id = 'encounter-reveal-ghost';
        ghostWrap.style.cssText = `
            position: fixed; z-index: 150;
            width: var(--card-w); height: var(--card-h);
            left: ${startX}px; top: ${startY}px;
            perspective: 1000px;
            transition: left 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            pointer-events: none;
        `;

        const ghostInner = document.createElement('div');
        ghostInner.style.cssText = `
            width: 100%; height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.5s;
        `;

        // Face Down Backing
        const ghostBack = document.createElement('div');
        ghostBack.style.cssText = `
            position: absolute; inset: 0;
            backface-visibility: hidden;
            border-radius: 6px; border: 2px solid #7a2020;
            background: linear-gradient(135deg,#2a0e0e 0%,#0a0303 100%);
            box-shadow: 0 4px 10px rgba(0,0,0,0.6);
        `;
        const backImg = document.createElement('img');
        backImg.src = window.ENCOUNTER_BACK || 'https://raw.githubusercontent.com/stgemma/lotr-lcg-web/main/cards/encounter-back.jpg';
        backImg.style.cssText = 'width:100%; height:100%; object-fit:cover; border-radius:4px;';
        ghostBack.appendChild(backImg);

        // Face Up Front
        const ghostFront = document.createElement('div');
        ghostFront.style.cssText = `
            position: absolute; inset: 0;
            backface-visibility: hidden;
            transform: rotateY(180deg);
            border-radius: 6px;
            background: #000;
            box-shadow: 0 4px 10px rgba(0,0,0,0.6);
        `;
        ghostFront.innerHTML = cardHTML(card);
        const innerCard = ghostFront.querySelector('.card');
        if (innerCard) {
            innerCard.style.width = '100%';
            innerCard.style.height = '100%';
            innerCard.style.margin = '0';
            innerCard.style.transform = 'none';
        }

        ghostInner.appendChild(ghostBack);
        ghostInner.appendChild(ghostFront);
        ghostWrap.appendChild(ghostInner);
        document.body.appendChild(ghostWrap);

        void ghostWrap.offsetWidth; // flush layout

        // Stage 1: Slide card to screen center and scale up (0 to 500ms)
        ghostWrap.style.left = 'calc(50vw - calc(var(--card-w) / 2))';
        ghostWrap.style.top = 'calc(50vh - calc(var(--card-h) / 2))';
        ghostWrap.style.transform = 'scale(1.6)';

        if (window.SoundFX && typeof window.SoundFX.playDraw === 'function') {
            window.SoundFX.playDraw();
        }

        // Stage 2: Flip card face up (starts at 500ms, finishes at 1000ms)
        setTimeout(() => {
            ghostInner.style.transform = 'rotateY(180deg)';

            // When flipped face up in center: play sound immediately, NO roots on floating card
            setTimeout(() => {
                if (typeof playTangledGroveAudio === 'function') {
                    playTangledGroveAudio(true);
                } else if (typeof window.playTangledGroveAudio === 'function') {
                    window.playTangledGroveAudio(true);
                }

                // Short pause in center so player sees card, then slide cleanly to staging
                setTimeout(() => {
                    card._drawing = true;
                    if (window.game && window.game.stagingArea && !window.game.stagingArea.some(c => c._uid === card._uid)) {
                        window.game.stagingArea.push(card);
                    }
                    if (typeof window.render === 'function') window.render();

                    const realCardEl = document.querySelector(`#staging-content [data-uid="${card._uid}"]`);
                    const stagingBox = document.getElementById('staging-content') || document.body;
                    const destRect = realCardEl ? realCardEl.getBoundingClientRect() : stagingBox.getBoundingClientRect();
                    const gw = ghostWrap.offsetWidth || 144;
                    const targetScale = destRect.width / gw;

                    const currentRect = ghostWrap.getBoundingClientRect();
                    const currentScale = currentRect.width / gw;

                    ghostWrap.style.transition = 'none';
                    ghostWrap.style.transformOrigin = 'top left';
                    ghostWrap.style.left = `${currentRect.left}px`;
                    ghostWrap.style.top = `${currentRect.top}px`;
                    ghostWrap.style.transform = `scale(${currentScale}) rotate(0deg)`;

                    void ghostWrap.offsetWidth;

                    ghostWrap.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    ghostWrap.style.left = `${destRect.left}px`;
                    ghostWrap.style.top = `${destRect.top}px`;
                    ghostWrap.style.transform = `scale(${targetScale}) rotate(0deg)`;

                    // Landing in Staging Area: remove ghost, complete game state render, THEN animate roots!
                    setTimeout(() => {
                        ghostWrap.remove();
                        delete card._drawing;
                        if (typeof cb === 'function') cb();
                    }, 500);
                }, 350);
            }, 500);
        }, 500);
    };
    window.animateRevealTangledGrove = animateRevealTangledGrove;

    // 5. Fallback trigger function for Tangled Grove
    let _lastTangledGroveRevealTime = 0;
    const triggerTangledGroveReveal = (card) => {
        const now = Date.now();
        if (now - _lastTangledGroveRevealTime < 1200) return;
        _lastTangledGroveRevealTime = now;

        if (typeof playTangledGroveAudio === 'function') {
            playTangledGroveAudio(true);
        } else if (typeof window.playTangledGroveAudio === 'function') {
            window.playTangledGroveAudio(true);
        }
    };
    window.triggerTangledGroveReveal = triggerTangledGroveReveal;

    // Hook discard flight so Tangled Grove stays in Staging Area, animates token/roots off, then smoothly flies to discard
    const origAnimateCardToDiscard = window._animateCardToDiscard;
    if (origAnimateCardToDiscard) {
        window._animateCardToDiscard = function(card, isPlayer, callback, startRect = null) {
            const isTangled = card && (card.id === 'oath_tangled_grove' || card.id === 'tangled_grove' || card.name === 'Tangled Grove');
            const el = document.querySelector(`[data-uid="${card?._uid}"]`);
            const gameRef = window.game || (window.LotrEngine && window.LotrEngine.game);
            const isFromStaging = isTangled && !isPlayer && !card._isTangledDiscardAnimating && (
                (el && el.closest('#staging-content')) || (gameRef?.stagingArea?.some(c => c._uid === card._uid))
            );

            if (isFromStaging) {
                card._isTangledDiscardAnimating = true;

                let rect = startRect;
                if (!rect && el) {
                    const tr = el.getBoundingClientRect();
                    if (tr.width > 0 && tr.height > 0) rect = tr;
                }
                if (!rect) {
                    rect = { left: window.innerWidth / 2 - 72, top: 120, width: 144, height: 202 };
                }

                if (el) {
                    el.style.opacity = '0';
                    el.style.visibility = 'hidden';
                }

                const baseW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) || 144;
                const baseH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) || 202;
                const destEl = document.getElementById('encounter-discard-pile');
                const destRect = destEl ? destEl.getBoundingClientRect() : { left: window.innerWidth - 110, top: 74, width: 100, height: 140 };

                const startScale = rect.width / baseW;
                const targetScale = destRect.width / baseW;

                // Fixed ghost anchored right in its exact slot in the Staging Area
                const ghost = document.createElement('div');
                ghost.className = 'card encounter-location';
                ghost.style.cssText = `
                    position: fixed;
                    z-index: 10005;
                    left: ${rect.left}px;
                    top: ${rect.top}px;
                    width: ${baseW}px;
                    height: ${baseH}px;
                    margin: 0 !important;
                    padding: 0 !important;
                    transform-origin: top left;
                    transform: scale(${startScale}) rotate(0deg);
                    border-radius: 6px;
                    overflow: visible;
                    pointer-events: none;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.6);
                `;

                const threatVal = (gameRef && gameRef.stagingArea) 
                    ? Math.max(1, gameRef.stagingArea.filter(x => x.type === 'location').length) 
                    : 1;

                const cleanImg = card.img ? card.img : 'https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Dark-of-Mirkwood/Tangled-Grove.jpg';
                ghost.innerHTML = `
                    <div style="width:100%; height:100%; border-radius:6px; overflow:hidden; position:relative;">
                        <img src="${cleanImg}" style="width:100%;height:100%;object-fit:cover;display:block;" alt="${card.name}">
                    </div>
                `;

                // Add Tangled Grove roots overlay onto ghost
                const seed = Number(String(card._uid).replace(/\D/g, '')) || 101;
                const genSvg = window.generateTangledGroveVeinsSVG || generateTangledGroveVeinsSVG;
                if (genSvg) {
                    const rootsDiv = document.createElement('div');
                    rootsDiv.className = 'tangled-grove-roots-overlay persisting';
                    rootsDiv.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:15; overflow:hidden; border-radius:6px;';
                    rootsDiv.innerHTML = genSvg(seed, false);
                    ghost.firstElementChild.appendChild(rootsDiv);
                }

                // Add Threat Token onto ghost
                const tokenSize = 'calc(var(--card-w, 130px) * 0.38)';
                const fontSize = 'calc(var(--card-w, 130px) * 0.135)';
                const badgePad = 'calc(var(--card-w, 130px) * 0.015) calc(var(--card-w, 130px) * 0.035)';
                const badgeRight = 'calc(var(--card-w, 130px) * -0.06)';
                const borderWidth = 'calc(var(--card-w, 130px) * 0.008)';

                const tokenWrapper = document.createElement('div');
                tokenWrapper.className = 'status-buff-tokens';
                tokenWrapper.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:25;';
                tokenWrapper.innerHTML = `
                    <div class="buff-token exit-threat buff-token-ready" style="position:absolute; top:14.5%; left:0%; width:${tokenSize}; height:${tokenSize}; border-radius:50%; background:rgba(0,0,0,0.85); border:${borderWidth} solid #ffb74d; box-shadow:0 0 4px #ffb74d; display:flex; align-items:center; justify-content:center; z-index:25;">
                        <img src="tokens/threat_str.png" style="width:100%; height:100%; object-fit:contain; border-radius:50%;" alt="threat">
                        <div class="badge plus" style="position:absolute; top:50%; right:${badgeRight}; transform:translateY(-50%); background:#1a120b; border:${borderWidth} solid #ffb74d; font-size:${fontSize}; font-weight:bold; border-radius:3.5px; padding:${badgePad}; white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.95); color:#fff;">+${threatVal}</div>
                    </div>
                `;
                ghost.firstElementChild.appendChild(tokenWrapper);
                document.body.appendChild(ghost);

                // Play token power down audio
                if (typeof playForestSpiderAttackDownAudio === 'function') {
                    playForestSpiderAttackDownAudio();
                }

                // 1. Goblin Troop-style token exit (epicTokenExit, collapsing shockwave ring, badge reverse flash, amber burst)
                const thrToken = tokenWrapper.querySelector('.exit-threat');
                if (thrToken) {
                    thrToken.style.animation = 'epicTokenExit 0.55s cubic-bezier(0.2, 0.9, 0.3, 1) forwards';

                    const ring = document.createElement('div');
                    ring.style.cssText = `
                        position: absolute;
                        left: ${thrToken.offsetLeft + thrToken.offsetWidth / 2}px;
                        top: ${thrToken.offsetTop + thrToken.offsetHeight / 2}px;
                        width: ${thrToken.offsetWidth}px;
                        height: ${thrToken.offsetHeight}px;
                        border-radius: 50%;
                        border: 3px solid #ffb74d;
                        box-shadow: 0 0 12px #f59e0b, inset 0 0 10px #ffffff;
                        pointer-events: none;
                        z-index: 26;
                        animation: epicTokenRingCollapse 0.5s ease-in forwards;
                    `;
                    tokenWrapper.appendChild(ring);
                    setTimeout(() => ring.remove(), 550);

                    const badge = thrToken.querySelector('.badge');
                    if (badge) {
                        badge.style.animation = 'epicBadgeReverseFlash 0.5s cubic-bezier(0.2, 0.9, 0.3, 1) forwards';
                    }

                    if (window.LotrEngine && window.LotrEngine.spawnBurstAtElement) {
                        window.LotrEngine.spawnBurstAtElement(thrToken, '#ffb74d', 14);
                    }
                }

                // 2. Reverse roots recede (stroke-dashoffset from 0 back to 1000 and fade out)
                const rootsOverlay = ghost.querySelector('.tangled-grove-roots-overlay');
                if (rootsOverlay) {
                    rootsOverlay.classList.remove('growing', 'persisting');
                    rootsOverlay.classList.add('receding');
                    const paths = rootsOverlay.querySelectorAll('.tg-vein-path');
                    paths.forEach((p, idx) => {
                        if (typeof p.animate === 'function') {
                            p.animate([
                                { strokeDashoffset: '0', opacity: 1 },
                                { strokeDashoffset: '1000', opacity: 0 }
                            ], {
                                duration: 480,
                                delay: (idx % 3) * 20,
                                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                fill: 'forwards'
                            });
                        }
                    });
                }

                // 3. Smooth flight directly from Staging Area to Encounter Discard Pile once animations finish
                setTimeout(() => {
                    if (rootsOverlay) rootsOverlay.remove();
                    if (tokenWrapper) tokenWrapper.remove();

                    ghost.style.transition = 'left 0.75s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.75s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.75s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    ghost.style.left = `${destRect.left + (destRect.width - baseW * targetScale) / 2}px`;
                    ghost.style.top = `${destRect.top}px`;
                    ghost.style.transform = `scale(${targetScale}) rotate(0deg)`;

                    if (window.SoundFX && window.SoundFX.playWhoosh) {
                        window.SoundFX.playWhoosh();
                    }

                    setTimeout(() => {
                        ghost.remove();
                        delete card._isTangledDiscardAnimating;
                        if (callback) callback();
                    }, 780);
                }, 520);

                return;
            }

            return origAnimateCardToDiscard.apply(this, arguments);
        };
    }

    // 6. Staging sync function to start growth on landing and persist thereafter
    const syncTangledGroveStagingRoots = () => {
        if (!window.game || !window.game.stagingArea) return;
        const stagingEl = document.getElementById('staging-content');
        if (!stagingEl) return;

        const tgCards = window.game.stagingArea.filter(c => 
            c && (c.id === 'oath_tangled_grove' || c.id === 'tangled_grove' || c.name === 'Tangled Grove')
        );

        tgCards.forEach(card => {
            if (card._drawing || card._isAnimatingTravel || card._rootsReceding || card._isTangledDiscardAnimating) return;
            const cardEl = stagingEl.querySelector(`[data-uid="${card._uid}"]`);
            if (cardEl && cardEl.style.opacity !== '0') {
                // Invalidate plain JSON object serialized across saves
                if (card._rootsOverlayElement && !(card._rootsOverlayElement instanceof Node)) {
                    card._rootsOverlayElement = null;
                }

                if (card._rootsGrown) {
                    cardEl.classList.add('tg-roots-finished');
                    cardEl.classList.remove('gt-buff-entering');
                    cardEl.querySelectorAll('.status-buff-tokens .buff-token').forEach(t => t.classList.add('buff-token-ready'));
                } else {
                    cardEl.classList.add('gt-buff-entering');
                    if (card._threatTokenEntered) {
                        cardEl.querySelectorAll('.status-buff-tokens .buff-token').forEach(t => t.classList.add('buff-token-ready'));
                    }
                }
                
                const hasOverlay = cardEl.querySelector('.tangled-grove-roots-overlay');
                if (!hasOverlay) {
                    if (card._rootsOverlayElement && (card._rootsOverlayElement instanceof Node)) {
                        cardEl.appendChild(card._rootsOverlayElement);
                    } else {
                        card._rootsOverlayElement = null;
                        attachRootsToCardElement(cardEl, !card._rootsGrown, card);
                    }
                }
            }
        });
    };
    window.syncTangledGroveStagingRoots = syncTangledGroveStagingRoots;

    // Interval and observer for staging roots persistence
    setInterval(syncTangledGroveStagingRoots, 200);

    const stagingEl = document.getElementById('staging-content');
    if (stagingEl) {
        const stagingObs = new MutationObserver(syncTangledGroveStagingRoots);
        stagingObs.observe(stagingEl, { childList: true, subtree: true });
    }
}
// Patch Eaves of Mirkwood active location organic branch & leaf vortex visual effect
if (!window._oathEavesVisualPatched) {
    window._oathEavesVisualPatched = true;

    // Inject SVG Filter to warp the vortex into organic tree limbs/roots
    if (!document.getElementById('mirkwood-branches-filter')) {
        const svgDiv = document.createElement('div');
        svgDiv.innerHTML = `
            <svg width="0" height="0" style="position:absolute; pointer-events:none;">
                <defs>
                    <filter id="mirkwood-branches-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.035 0.05" numOctaves="4" result="noise">
                            <animate attributeName="baseFrequency" values="0.035 0.05; 0.045 0.06; 0.035 0.05" dur="8s" repeatCount="indefinite" />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="45" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>
        `;
        document.body.appendChild(svgDiv);
    }

    const eavesStyle = document.createElement('style');
    eavesStyle.textContent = `
        @keyframes oathEavesBranchSwirl {
            0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); opacity: 0.85; }
            50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.15); opacity: 1; }
            100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); opacity: 0.85; }
        }
        @keyframes oathEavesOrganicShape {
            0% { border-radius: 50%; }
            25% { border-radius: 60% 40% 50% 50% / 50% 50% 40% 60%; }
            50% { border-radius: 40% 60% 60% 40% / 60% 40% 50% 50%; }
            75% { border-radius: 50% 50% 40% 60% / 40% 60% 60% 40%; }
            100% { border-radius: 50%; }
        }
        @keyframes oathEavesCorePulse {
            0% { transform: translate(-50%, -50%) scale(0.7); opacity: 0.6; }
            100% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
        }
        @keyframes oathEavesLeafOrbit1 {
            0% { transform: rotate(0deg) translateY(-50px) rotate(0deg) scale(0.8); }
            50% { transform: rotate(180deg) translateY(-70px) rotate(-90deg) scale(1.3); }
            100% { transform: rotate(360deg) translateY(-50px) rotate(-180deg) scale(0.8); }
        }
        @keyframes oathEavesLeafOrbit2 {
            0% { transform: rotate(120deg) translateY(-60px) rotate(0deg) scale(1); }
            50% { transform: rotate(300deg) translateY(-40px) rotate(180deg) scale(0.7); }
            100% { transform: rotate(480deg) translateY(-60px) rotate(360deg) scale(1); }
        }
        @keyframes oathEavesLeafOrbit3 {
            0% { transform: rotate(240deg) translateY(-70px) rotate(0deg) scale(0.9); }
            50% { transform: rotate(60deg) translateY(-50px) rotate(-180deg) scale(1.2); }
            100% { transform: rotate(-120deg) translateY(-70px) rotate(-360deg) scale(0.9); }
        }
        #persistent-eaves-vortex {
            position: fixed;
            pointer-events: none;
            z-index: 45;
            opacity: 0;
            transform: translate(-50%, -50%);
            transition: opacity 0.4s ease-out;
            will-change: transform, left, top, width, height, opacity;
        }
        .eaves-branch-layer {
            position: absolute;
            top: 50%; left: 50%;
            width: 100%; height: 100%;
            background: conic-gradient(from 0deg, 
                transparent 0deg, 
                rgba(30, 200, 80, 0.5) 45deg, 
                rgba(100, 255, 120, 0.95) 90deg, 
                transparent 135deg, 
                transparent 180deg, 
                rgba(30, 200, 80, 0.5) 225deg, 
                rgba(100, 255, 120, 0.95) 270deg, 
                transparent 315deg
            );
            -webkit-mask-image: radial-gradient(circle, white 5%, rgba(255,255,255,0.8) 35%, transparent 65%);
            mask-image: radial-gradient(circle, white 5%, rgba(255,255,255,0.8) 35%, transparent 65%);
            mix-blend-mode: screen;
            animation: oathEavesBranchSwirl 8s linear infinite, oathEavesOrganicShape 6s ease-in-out infinite;
            filter: url(#mirkwood-branches-filter) drop-shadow(0 0 10px rgba(50, 255, 120, 0.8));
        }
        .eaves-core {
            position: absolute;
            top: 50%; left: 50%;
            width: 40%; height: 40%;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(150, 255, 200, 0.95) 0%, rgba(30, 200, 80, 0.5) 50%, transparent 80%);
            animation: oathEavesCorePulse 2.5s ease-in-out infinite alternate;
            mix-blend-mode: screen;
        }
        .eaves-leaf {
            position: absolute;
            top: 50%; left: 50%;
            width: 24px; height: 24px;
            margin-top: -12px; margin-left: -12px;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%2388ffaa" d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22l1-2.3A13.89,13.89,0,0,0,20.25,8.12L21,7.24V6A14,14,0,0,0,17,8Z"/></svg>');
            background-size: contain;
            background-repeat: no-repeat;
            filter: drop-shadow(0 0 4px #4caf50);
            mix-blend-mode: screen;
            will-change: transform;
        }
    `;
    document.head.appendChild(eavesStyle);

    const vortexEl = document.createElement('div');
    vortexEl.id = 'persistent-eaves-vortex';
    vortexEl.innerHTML = `
        <div class="eaves-branch-layer"></div>
        <div class="eaves-core"></div>
        <div class="eaves-leaf" style="animation: oathEavesLeafOrbit1 5s ease-in-out infinite;"></div>
        <div class="eaves-leaf" style="animation: oathEavesLeafOrbit2 6.5s ease-in-out infinite;"></div>
        <div class="eaves-leaf" style="animation: oathEavesLeafOrbit3 7.5s ease-in-out infinite;"></div>
    `;
    document.body.appendChild(vortexEl);



    // Highly performant hardware-accelerated tracking loop bypassing DOM rebuilds
    const syncEavesVortex = () => {
        const activeCard = document.querySelector('#active-location-content .card[data-id="oath_the_eaves_of_mirkwood"], #active-location-content .card[data-id="the_eaves_of_mirkwood"]');
        
        if (activeCard && activeCard.style.visibility !== 'hidden' && activeCard.style.opacity !== '0') {
            const rect = activeCard.getBoundingClientRect();
            vortexEl.style.width = `${rect.width * 2.2}px`;
            vortexEl.style.height = `${rect.height * 1.6}px`; // Slightly oval to match perspective
            vortexEl.style.left = `${rect.left + rect.width / 2}px`;
            vortexEl.style.top = `${rect.top + rect.height / 2}px`;
            if (vortexEl.style.opacity === '0' || vortexEl.style.opacity === '') {
                vortexEl.style.opacity = '1';
            }
        } else {
            if (vortexEl.style.opacity !== '0') {
                vortexEl.style.opacity = '0';
            }
        }
        requestAnimationFrame(syncEavesVortex);
    };
    requestAnimationFrame(syncEavesVortex);
}

// Disintegration animation for Goblintown Scavengers threat token
if (!window.disintegrateGoblintownScavengersThreatTokens) {
    window.disintegrateGoblintownScavengersThreatTokens = function() {
        if (!window.game) return;
        const game = window.game;
        const cardsToCheck = [
            ...(game.stagingArea || []),
            ...(game.engagedEnemies || [])
        ];

        const scavengersCards = cardsToCheck.filter(c => {
            if (!c) return false;
            const isScavenger = (
                c.id === 'oath_goblintown_scavengers' ||
                c.id === 'goblintown_scavengers' ||
                c.id === 'nibin_goblintown_scavengers' ||
                (c.name && c.name.toLowerCase().includes('goblintown scaveng'))
            );
            const bonus = c.threatBonus || c._scavengersThreatBonus || 0;
            return isScavenger && bonus > 0;
        });

        if (scavengersCards.length === 0) return;

        scavengersCards.forEach(card => {
            const bonus = card.threatBonus || card._scavengersThreatBonus || 0;
            card._scavengersThreatBonus = 0;

            const cardEl = document.querySelector(`#staging-content [data-uid="${card._uid}"]`) ||
                           document.querySelector(`[data-uid="${card._uid}"]`);
            if (!cardEl) return;

            const tokenEl = cardEl.querySelector('.status-buff-tokens img[alt="threat"]')?.closest('.buff-token') ||
                            cardEl.querySelector('.status-buff-tokens .buff-token') ||
                            cardEl.querySelector('.buff-token');

            let tokenRect = null;
            if (tokenEl) {
                const r = tokenEl.getBoundingClientRect();
                if (r.width > 0 && r.height > 0) {
                    tokenRect = r;
                }
            }

            if (!tokenRect) {
                const cRect = cardEl.getBoundingClientRect();
                if (cRect.width > 0 && cRect.height > 0) {
                    const tokenSize = cRect.width * 0.38;
                    tokenRect = {
                        left: cRect.left,
                        top: cRect.top + cRect.height * 0.145,
                        width: tokenSize,
                        height: tokenSize
                    };
                }
            }

            if (!tokenRect) return;

            if (tokenEl) {
                tokenEl.style.opacity = '0';
                tokenEl.style.visibility = 'hidden';
            }

            const threatImgUrl = 'tokens/threat_str.png';
            const floatingToken = document.createElement('div');
            floatingToken.className = 'disintegrating-threat-token';
            floatingToken.style.cssText = `
                position: fixed;
                z-index: 100005;
                left: ${tokenRect.left}px;
                top: ${tokenRect.top}px;
                width: ${tokenRect.width}px;
                height: ${tokenRect.height}px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.85);
                border: 2px solid #ffb74d;
                box-shadow: 0 0 10px #ffb74d;
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
                opacity: 1;
                transform: scale(1);
                clip-path: circle(100% at 50% 50%);
                filter: brightness(1) contrast(1) drop-shadow(0 0 8px #ffb74d);
                transition: clip-path 0.5s cubic-bezier(0.15, 0.85, 0.25, 1), transform 0.5s cubic-bezier(0.15, 0.85, 0.25, 1), opacity 0.42s ease-in, filter 0.45s ease-in;
            `;
            if (tokenEl && tokenEl.innerHTML) {
                floatingToken.innerHTML = tokenEl.innerHTML;
            } else {
                floatingToken.innerHTML = `
                    <img src="${threatImgUrl}" style="width:100%; height:100%; object-fit:contain; border-radius:50%;" alt="threat">
                    <div class="badge plus" style="position:absolute; top:50%; right:calc(var(--card-w, 130px) * -0.06); transform:translateY(-50%); background:#1a120b; border:calc(var(--card-w, 130px) * 0.008) solid #ffb74d; font-size:calc(var(--card-w, 130px) * 0.135); font-weight:bold; border-radius:3.5px; padding:calc(var(--card-w, 130px) * 0.015) calc(var(--card-w, 130px) * 0.035); white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.95); color:#fff; font-family:'Cinzel', serif;">+${bonus}</div>
                `;
            }
            document.body.appendChild(floatingToken);

            const tokenCenterWorldX = tokenRect.left + tokenRect.width / 2;
            const tokenCenterWorldY = tokenRect.top + tokenRect.height / 2;
            const emberCount = 14;

            const shardContainer = document.createElement('div');
            shardContainer.style.cssText = 'position:fixed; inset:0; pointer-events:none; z-index:100006; overflow:visible;';
            document.body.appendChild(shardContainer);

            const shards = [];
            for (let i = 0; i < emberCount; i++) {
                const rad = (i / emberCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
                const dist = 42 + Math.random() * 36;
                const ex = tokenCenterWorldX + Math.cos(rad) * dist;
                const ey = tokenCenterWorldY + Math.sin(rad) * dist;
                const shardSize = 4 + Math.random() * 3.5;

                const shard = document.createElement('div');
                shard.style.cssText = `
                    position: fixed;
                    left: ${tokenCenterWorldX - shardSize / 2}px;
                    top: ${tokenCenterWorldY - shardSize / 2}px;
                    width: ${shardSize}px;
                    height: ${shardSize}px;
                    background: linear-gradient(135deg, #ffffff, #ffb74d);
                    clip-path: polygon(0 20%, 80% 0, 100% 80%, 20% 100%);
                    border-radius: 2px;
                    filter: drop-shadow(0 0 6px #ffb74d);
                    pointer-events: none;
                    opacity: 0.95;
                    transform: rotate(180deg) scale(0.1);
                    transition: left 0.45s cubic-bezier(0.15, 0.85, 0.25, 1), top 0.45s cubic-bezier(0.15, 0.85, 0.25, 1), transform 0.45s ease-out, opacity 0.45s ease-out;
                `;
                shardContainer.appendChild(shard);
                shards.push({ el: shard, ex, ey });
            }

            void floatingToken.offsetWidth;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    floatingToken.style.opacity = '0';
                    floatingToken.style.transform = 'scale(0.3)';
                    floatingToken.style.clipPath = 'circle(0% at 50% 50%)';
                    floatingToken.style.filter = 'brightness(2.2) contrast(1.8) drop-shadow(0 0 16px #ffb74d)';

                    shards.forEach(({ el, ex, ey }) => {
                        el.style.left = `${ex}px`;
                        el.style.top = `${ey}px`;
                        el.style.transform = `rotate(${Math.random() * 360}deg) scale(0.65)`;
                        el.style.opacity = '0';
                    });
                });
            });

            try {
                if (window.SoundFX && typeof window.SoundFX.playWhoosh === 'function') {
                    window.SoundFX.playWhoosh();
                }
                const snd = new Audio('./sound_effects/threat_increase.mp3');
                const volSlider = document.getElementById('volume-slider');
                snd.volume = volSlider ? Math.min(parseFloat(volSlider.value), 0.25) : 0.2;
                snd.playbackRate = 1.35;
                snd.play().catch(() => {});
            } catch(e) {}

            setTimeout(() => {
                floatingToken.remove();
                shardContainer.remove();
            }, 550);
        });
    };
}

// Goblin Sniper Forced ability archer sniper lock-on attack animation hook
(function initOathGoblinSniperForcedHook() {
    function wrapSniperChoice(fn) {
        if (!fn || fn._oathSniperHooked) return fn;
        const wrapped = function(uid) {
            const modal = document.getElementById('modal-overlay');
            const modalContent = document.getElementById('modal-content');
            const titleText = (modal?.querySelector('h2')?.textContent || '') + ' ' + (modal?.querySelector('.modal-title')?.textContent || '');
            const promptText = modal?.querySelector('p')?.textContent || '';
            const allText = modalContent ? (modalContent.textContent || '') : '';
            const isUndefended = titleText.includes('Undefended') || promptText.includes('Undefended') || allText.includes('Undefended');
            const isSniper = !isUndefended && (
                (titleText.includes('Goblin Sniper') || promptText.includes('Goblin Sniper') || allText.includes('Goblin Sniper')) &&
                (titleText.includes('Forced') || promptText.includes('Forced') || allText.includes('Forced') || allText.includes('take 1 damage'))
            );

            if (isSniper && uid) {
                if (modal) modal.classList.remove('show');
                if (modalContent) modalContent.innerHTML = '';
                window._modalHideSkip = false;

                const triggerFn = window.triggerGoblinSniperTargetingAndArrow || window.triggerGoblinSniperShot;
                if (typeof triggerFn === 'function') {
                    triggerFn(uid, () => {
                        fn.call(this, uid);
                    }, false);
                    return;
                }
            }
            return fn.apply(this, arguments);
        };
        wrapped._oathSniperHooked = true;
        return wrapped;
    }

    function hookGoblinSniperForcedAnimation() {
        try {
            const curChoice = window._heroPickerChoice;
            if (curChoice && !curChoice._oathSniperHooked) {
                const wrappedChoice = wrapSniperChoice(curChoice);
                try {
                    window._heroPickerChoice = wrappedChoice;
                } catch(err) {
                    try {
                        Object.defineProperty(window, '_heroPickerChoice', {
                            value: wrappedChoice,
                            writable: true,
                            configurable: true
                        });
                    } catch(e) {}
                }
            }
        } catch(e) {}
    }

    hookGoblinSniperForcedAnimation();
    setInterval(hookGoblinSniperForcedAnimation, 300);
})();

// Spiders of Mirkwood Attack Token Buff Power Up & Power Down Watcher
(function initOathSpidersOfMirkwoodBuffWatcher() {
    const _mirkwoodSpiderBuffMap = new Map();
    const _lastMirkwoodBuffTriggerTime = new Map();
    const _lastMirkwoodFangBiteTime = new Map();

    function calculateSpidersOfMirkwoodBuff(spider, game) {
        if (!spider || !game) return 0;
        const engaged = game.engagedEnemies || [];
        const isEngaged = engaged.some(e => e._uid === spider._uid);
        if (!isEngaged) return 0;
        const pIdx = spider._engagedWithPlayerIdx !== undefined ? spider._engagedWithPlayerIdx : (game.activeTabPlayerIdx || 0);
        const chars = [...(game.heroes || []), ...(game.allies || [])];
        const exhaustedCount = chars.filter(c => c && c.exhausted && !c._prisoner && (c._ownerIdx === undefined ? 0 : c._ownerIdx) === pIdx).length;
        return exhaustedCount;
    }

    function checkAllSpidersOfMirkwoodBuffs() {
        const game = window.game || (window.LotrEngine && window.LotrEngine.game);
        if (!game) return;

        const allEnemies = [...(game.engagedEnemies || []), ...(game.stagingArea || [])];
        const mirkwoodSpiders = allEnemies.filter(e => e && (e.id === 'oath_spiders_of_mirkwood' || e.id === 'spiders_of_mirkwood' || e.name === 'Spiders of Mirkwood'));

        mirkwoodSpiders.forEach(spider => {
            const uid = spider._uid;
            if (!uid) return;

            const isDead = spider._dead || (spider.damage || 0) >= (spider.hp || 4);
            if (isDead) {
                _mirkwoodSpiderBuffMap.set(uid, 0);
                return;
            }

            const currBuff = calculateSpidersOfMirkwoodBuff(spider, game);
            const prevBuff = _mirkwoodSpiderBuffMap.has(uid) ? _mirkwoodSpiderBuffMap.get(uid) : 0;

            if (currBuff !== prevBuff) {
                _mirkwoodSpiderBuffMap.set(uid, currBuff);
                const now = Date.now();
                const lastTime = _lastMirkwoodBuffTriggerTime.get(uid) || 0;

                if (currBuff > prevBuff && currBuff > 0) {
                    if (now - lastTime > 600) {
                        _lastMirkwoodBuffTriggerTime.set(uid, now);
                        // triggerForestSpiderPowerUp already plays forest_spider_powerup.mp3 internally;
                        // if triggerForestSpiderPowerUp is available, call it; otherwise fallback to audio helper
                        if (typeof window.triggerForestSpiderPowerUp === 'function') {
                            window.triggerForestSpiderPowerUp(uid, 'red');
                        } else {
                            playForestSpiderPowerUpAudio();
                        }
                    }
                } else if (currBuff < prevBuff && prevBuff > 0) {
                    if (now - lastTime > 600) {
                        _lastMirkwoodBuffTriggerTime.set(uid, now);
                        playForestSpiderAttackDownAudio();
                        if (currBuff === 0) {
                            const cardEl = document.querySelector(`[data-uid="${uid}"]`);
                            if (cardEl) {
                                const atkToken = cardEl.querySelector('.buff-token img[alt="atk"]')?.closest('.buff-token');
                                if (atkToken && typeof window.animateTokensAway === 'function') {
                                    window.animateTokensAway([atkToken]);
                                }
                            }
                        }
                        if (typeof window.triggerForestSpiderPowerDown === 'function') {
                            window.triggerForestSpiderPowerDown(uid);
                        }
                    }
                }
            }
        });

        // Cleanup spiders that left the field
        for (const [uid, lastBuff] of _mirkwoodSpiderBuffMap.entries()) {
            const stillPresent = allEnemies.some(e => e._uid === uid);
            if (!stillPresent) {
                _mirkwoodSpiderBuffMap.delete(uid);
            }
        }
    }

    function triggerSpidersOfMirkwoodFangBite(targetUid, attackerUid, force = false) {
        if (!targetUid || !attackerUid) return;
        const targetAreas = force
            ? ['#player-content', '#heroes-content', '#allies-content', '#combat-defender-slot']
            : ['#player-content', '#heroes-content', '#allies-content', '#combat-defender-slot', 'body'];
        const targetEls = targetAreas.flatMap(selector => {
            const area = document.querySelector(selector);
            return area ? Array.from(area.querySelectorAll('[data-uid]')) : [];
        });
        const targetEl = targetEls
            .filter((el, index, elements) => el.dataset.uid === String(targetUid) && elements.indexOf(el) === index)
            .map(el => ({ el, rect: el.getBoundingClientRect(), style: getComputedStyle(el) }))
            .filter(({ rect, style }) => rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0)
            .sort((a, b) => (b.rect.width * b.rect.height) - (a.rect.width * a.rect.height))[0]?.el;
        if (!targetEl) return;

        const now = Date.now();
        const attackKey = `${attackerUid}:${targetUid}`;
        if (!force && now - (_lastMirkwoodFangBiteTime.get(attackKey) || 0) < 1200) return;
        _lastMirkwoodFangBiteTime.set(attackKey, now);
        for (const [key, time] of _lastMirkwoodFangBiteTime) {
            if (now - time >= 1200) _lastMirkwoodFangBiteTime.delete(key);
        }

        const targetRect = targetEl.getBoundingClientRect();
        const width = Math.max(240, Math.min(360, targetRect.width + 130));
        const height = width * 220 / 320;
        const bite = document.createElement('div');
        bite.style.cssText = `
            position: fixed;
            left: ${targetRect.left + targetRect.width / 2 - width / 2}px;
            top: ${targetRect.top + targetRect.height / 2 - height / 2 + 30}px;
            width: ${width}px;
            height: ${height}px;
            z-index: 100000;
            pointer-events: none;
            filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.8));
        `;
        bite.innerHTML = `
            <svg viewBox="-40 -27.5 400 275" width="100%" height="100%" style="overflow:visible">
                <defs>
                    <linearGradient id="mirkwoodFangChitin" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stop-color="#98563f"/>
                        <stop offset="0.48" stop-color="#653629"/>
                        <stop offset="1" stop-color="#321b19"/>
                    </linearGradient>
                    <linearGradient id="mirkwoodFangIvory" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stop-color="#c88768"/>
                        <stop offset="0.55" stop-color="#985642"/>
                        <stop offset="1" stop-color="#d9a184"/>
                    </linearGradient>
                    <radialGradient id="mirkwoodVenom" cx="35%" cy="28%" r="75%">
                        <stop offset="0" stop-color="#eaffb0"/>
                        <stop offset="0.32" stop-color="#baff55"/>
                        <stop offset="1" stop-color="#4bba18"/>
                    </radialGradient>
                </defs>
                <g class="mirkwood-bite-fang">
                    <path d="M5 67 Q0 48 15 37 Q27 27 44 35 Q54 19 72 28 Q88 34 88 51 Q105 57 106 76 Q108 94 94 106 Q79 119 59 108 Q41 119 24 106 Q8 96 13 81 Q4 77 5 67 Z"
                          fill="url(#mirkwoodFangChitin)" stroke="#321b19" stroke-width="6" stroke-linejoin="round"/>
                    <path d="M19 51 Q33 38 46 43 M57 37 Q72 36 78 49 M25 96 Q40 108 53 101 M16 67 Q26 59 38 62 M67 95 Q81 102 94 91"
                          fill="none" stroke="#c17a5b" stroke-width="4" stroke-linecap="round" opacity="0.75"/>
                    <path d="M24 46 Q35 35 44 40 M61 33 Q72 31 80 43 M20 88 Q30 99 41 101"
                          fill="none" stroke="#e2a17e" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
                    <circle cx="51" cy="51" r="2.3" fill="#321b19" opacity="0.75"/>
                    <circle cx="88" cy="68" r="2" fill="#d29270" opacity="0.8"/>
                    <path d="M72 78 Q91 82 105 84 Q124 84 139 69 Q148 59 154 43 Q154 65 143 82 Q129 100 110 109 Q89 114 69 101 Q63 91 72 78 Z"
                          fill="url(#mirkwoodFangIvory)" stroke="#512d27" stroke-width="4" stroke-linejoin="round"/>
                    <path d="M77 84 Q101 84 119 70 Q138 57 150 49" fill="none" stroke="#f0c0a2" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
                    <path d="M84 91 Q104 94 121 81 Q138 68 146 57" fill="none" stroke="#713e32" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>
                    <path d="M101 88 Q119 78 132 63" fill="none" stroke="#f6d0b2" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
                </g>
                <g class="mirkwood-bite-fang">
                    <g transform="translate(320 0) scale(-1 1)">
                        <path d="M5 67 Q0 48 15 37 Q27 27 44 35 Q54 19 72 28 Q88 34 88 51 Q105 57 106 76 Q108 94 94 106 Q79 119 59 108 Q41 119 24 106 Q8 96 13 81 Q4 77 5 67 Z"
                              fill="url(#mirkwoodFangChitin)" stroke="#321b19" stroke-width="6" stroke-linejoin="round"/>
                        <path d="M19 51 Q33 38 46 43 M57 37 Q72 36 78 49 M25 96 Q40 108 53 101 M16 67 Q26 59 38 62 M67 95 Q81 102 94 91"
                              fill="none" stroke="#c17a5b" stroke-width="4" stroke-linecap="round" opacity="0.75"/>
                        <path d="M24 46 Q35 35 44 40 M61 33 Q72 31 80 43 M20 88 Q30 99 41 101"
                              fill="none" stroke="#e2a17e" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
                        <circle cx="51" cy="51" r="2.3" fill="#321b19" opacity="0.75"/>
                        <circle cx="88" cy="68" r="2" fill="#d29270" opacity="0.8"/>
                        <path d="M72 78 Q91 82 105 84 Q124 84 139 69 Q148 59 154 43 Q154 65 143 82 Q129 100 110 109 Q89 114 69 101 Q63 91 72 78 Z"
                              fill="url(#mirkwoodFangIvory)" stroke="#512d27" stroke-width="4" stroke-linejoin="round"/>
                        <path d="M77 84 Q101 84 119 70 Q138 57 150 49" fill="none" stroke="#f0c0a2" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
                        <path d="M84 91 Q104 94 121 81 Q138 68 146 57" fill="none" stroke="#713e32" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>
                        <path d="M101 88 Q119 78 132 63" fill="none" stroke="#f6d0b2" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
                    </g>
                </g>
                <g class="mirkwood-venom-streams" opacity="0" fill="none" stroke="url(#mirkwoodVenom)" stroke-linecap="round" filter="drop-shadow(0 0 5px rgba(96, 255, 20, 0.9))">
                    <path d="M153 43 Q153 53 158 61 Q160 65 160 70" stroke-width="4.5"/>
                    <path d="M167 43 Q167 53 162 61 Q160 65 160 70" stroke-width="4.5"/>
                    <path d="M153 44 Q154 55 159 63 M167 44 Q166 55 161 63" stroke="#eaffb0" stroke-width="1.2" opacity="0.9"/>
                </g>
                <g class="mirkwood-venom-gush" fill="url(#mirkwoodVenom)" stroke="#d7ff9a" stroke-width="1.2" stroke-linejoin="round" filter="drop-shadow(0 0 5px rgba(96, 255, 20, 0.9))">
                </g>
            </svg>
        `;
        document.body.appendChild(bite);

        const fangs = bite.querySelectorAll('.mirkwood-bite-fang');
        fangs.forEach((fang, index) => {
            const outward = index === 0 ? -1 : 1;
            if (typeof fang.animate === 'function') {
                fang.animate([
                    { transform: 'translateX(0)', opacity: 0 },
                    { transform: 'translateX(0)', opacity: 1, offset: 0.2 },
                    { transform: `translateX(${outward * 105}px)`, opacity: 1, offset: 0.4 },
                    { transform: `translateX(${outward * -12}px)`, opacity: 1, offset: 0.51 },
                    { transform: `translateX(${outward * -12}px)`, opacity: 1, offset: 0.86 },
                    { transform: `translateX(${outward * 28}px)`, opacity: 0 }
                ], { duration: 1200, fill: 'forwards', easing: 'cubic-bezier(0.2, 0.75, 0.25, 1)' });
            }
        });
        if (typeof targetEl.animate === 'function') {
            targetEl.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-12px)', offset: 0.16 },
                { transform: 'translateX(12px)', offset: 0.34 },
                { transform: 'translateX(-10px)', offset: 0.52 },
                { transform: 'translateX(8px)', offset: 0.7 },
                { transform: 'translateX(-4px)', offset: 0.86 },
                { transform: 'translateX(0)' }
            ], {
                duration: 420,
                delay: 600,
                easing: 'cubic-bezier(0.35, 0, 0.65, 1)'
            });
        }
        const venomStreams = bite.querySelector('.mirkwood-venom-streams');
        if (typeof venomStreams.animate === 'function') {
            venomStreams.animate([
                { opacity: 0, transform: 'scaleY(0.2)' },
                { opacity: 1, transform: 'scaleY(1)', offset: 0.3 },
                { opacity: 0, transform: 'scaleY(0.85)' }
            ], {
                duration: 220,
                delay: 100,
                fill: 'forwards',
                easing: 'ease-out'
            });
        }
        const venomGroup = bite.querySelector('.mirkwood-venom-gush');
        const svgNamespace = 'http://www.w3.org/2000/svg';
        for (let i = 0; i < 56; i++) {
            const drop = document.createElementNS(svgNamespace, 'ellipse');
            const radius = 1.4 + Math.random() * 3;
            const sourceX = Math.random() < 0.5 ? 153 : 167;
            const sourceY = 39 + Math.random() * 10;
            drop.setAttribute('class', 'mirkwood-venom-drop');
            drop.setAttribute('cx', String(sourceX + (Math.random() - 0.5) * 4));
            drop.setAttribute('cy', String(sourceY + (Math.random() - 0.5) * 4));
            drop.setAttribute('rx', radius.toFixed(1));
            drop.setAttribute('ry', (radius * (1.4 + Math.random() * 1.8)).toFixed(1));
            drop.setAttribute('opacity', '0');
            drop.setAttribute('fill', Math.random() > 0.5 ? '#dcff91' : '#74d927');
            drop.setAttribute('stroke', '#eaffb0');
            drop.setAttribute('stroke-width', '0.8');
            venomGroup.appendChild(drop);
        }
        const venomDrops = bite.querySelectorAll('.mirkwood-venom-drop');
        venomDrops.forEach((drop, index) => {
            const sourceX = Number(drop.getAttribute('cx'));
            const sourceY = Number(drop.getAttribute('cy'));
            const angle = Math.random() * Math.PI;
            const distance = 48 + Math.random() * 90;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            drop.style.transformBox = 'view-box';
            drop.style.transformOrigin = `${sourceX}px ${sourceY}px`;
            if (typeof drop.animate === 'function') {
                drop.animate([
                    { transform: 'translate(0, 0) scale(0.2)', opacity: 0 },
                    { transform: `translate(${x * 0.35}px, ${y * 0.12}px) scale(1.25)`, opacity: 1, offset: 0.2 },
                    { transform: `translate(${x * 0.72}px, ${y * 0.62}px) scale(1)`, opacity: 0.95, offset: 0.58 },
                    { transform: `translate(${x}px, ${y * 1.35}px) scale(0.7)`, opacity: 0.75, offset: 0.82 },
                    { transform: `translate(${x * 1.12}px, ${y * 1.8}px) scale(0.45)`, opacity: 0 }
                ], { duration: 720 + Math.random() * 220, delay: 100 + Math.random() * 12, fill: 'both', easing: 'cubic-bezier(0.15, 0.75, 0.3, 1)' });
            }
        });
        setTimeout(() => bite.remove(), 2400);
		}
		window.triggerSpidersOfMirkwoodFangBite = triggerSpidersOfMirkwoodFangBite;

		// Hook enemy attacks for Spiders of Mirkwood & Great Spider to play custom fang bite animations
		function hookSpidersOfMirkwoodAttackSound() {
        const isGreatSpiderType = function(spiderType) {
            if (spiderType === 'oath_great_spider' || spiderType === 'great_spider') return true;
            if (typeof spiderType === 'string') {
                const lower = spiderType.toLowerCase();
                if (lower === 'oath_great_spider' || lower === 'great_spider' || lower.includes('great_spider') || lower.includes('great spider')) return true;
                if (lower === 'forest_spider') {
                    const game = window.game || (window.LotrEngine && window.LotrEngine.game);
                    const cur = game?.currentEnemyAttacking;
                    if (cur && (cur.id === 'oath_great_spider' || cur.id === 'great_spider' || cur.name === 'Great Spider')) return true;
                }
            }
            if (typeof spiderType === 'object' && spiderType) {
                if (spiderType.id === 'oath_great_spider' || spiderType.id === 'great_spider' || spiderType.name === 'Great Spider') return true;
            }
            if (!spiderType) {
                const game = window.game || (window.LotrEngine && window.LotrEngine.game);
                const cur = game?.currentEnemyAttacking;
                if (cur && (cur.id === 'oath_great_spider' || cur.id === 'great_spider' || cur.name === 'Great Spider')) return true;
            }
            return false;
        };

        if (typeof window.triggerSpiderChomp === 'function' && !window.triggerSpiderChomp._oathSpiderFilterHooked) {
            const origSpiderChomp = window.triggerSpiderChomp._origSpiderChomp || window._origSpiderChomp || window.triggerSpiderChomp;
            window._origSpiderChomp = origSpiderChomp;
            const wrappedSpiderChomp = function(targetUid, spiderType) {
                if (spiderType === 'oath_spiders_of_mirkwood' || spiderType === 'spiders_of_mirkwood') return;
                if (isGreatSpiderType(spiderType)) {
                    if (typeof window.triggerGreatSpiderFangBite === 'function') {
                        window.triggerGreatSpiderFangBite(targetUid, null, { isAttack: true });
                    }
                    return;
                }
                return origSpiderChomp.apply(this, arguments);
            };
            wrappedSpiderChomp._mirkwoodFangBiteFilter = true;
            wrappedSpiderChomp._oathSpiderFilterHooked = true;
            wrappedSpiderChomp._origSpiderChomp = origSpiderChomp;
            window.triggerSpiderChomp = wrappedSpiderChomp;
        }

        if (window.SoundFX && !window.SoundFX._oathSpiderAttackAudioHooked) {
            const origPlaySpiderAttack = window.SoundFX.playSpiderAttack;
            window.SoundFX.playSpiderAttack = function() {
                const game = window.game || (window.LotrEngine && window.LotrEngine.game);
                const enemy = game?.currentEnemyAttacking;
                const isMirkwoodSpider = enemy && (enemy.id === 'oath_spiders_of_mirkwood' || enemy.id === 'spiders_of_mirkwood' || enemy.name === 'Spiders of Mirkwood');
                if (isMirkwoodSpider) {
                    playSpidersOfMirkwoodAttackAudio();
                    return;
                }
                const isGreatSpider = enemy && (enemy.id === 'oath_great_spider' || enemy.id === 'great_spider' || enemy.name === 'Great Spider');
                if (isGreatSpider) {
                    playGreatSpiderAttackAudio();
                    return;
                }
                if (origPlaySpiderAttack) {
                    return origPlaySpiderAttack.apply(this, arguments);
                }
            };
            window.SoundFX._spidersOfMirkwoodAttackHooked = true;
            window.SoundFX._oathSpiderAttackAudioHooked = true;
        }

        if (window.animateLunge && !window.animateLunge._oathSpiderAttackHooked) {
            const origLunge = window.animateLunge;
            window.animateLunge = function(attackerUid, targetUid) {
                try {
                    const game = window.game || (window.LotrEngine && window.LotrEngine.game);
                    const enemy = (game?.engagedEnemies || []).find(e => e._uid === attackerUid) ||
                                  (game?.stagingArea || []).find(e => e._uid === attackerUid) ||
                                  game?.currentEnemyAttacking;
                    if (enemy && (enemy.id === 'oath_spiders_of_mirkwood' || enemy.id === 'spiders_of_mirkwood' || enemy.name === 'Spiders of Mirkwood')) {
                        playSpidersOfMirkwoodAttackAudio();
                        triggerSpidersOfMirkwoodFangBite(targetUid, attackerUid);
                    } else if (enemy && (enemy.id === 'oath_great_spider' || enemy.id === 'great_spider' || enemy.name === 'Great Spider')) {
                        playGreatSpiderAttackAudio();
                        setTimeout(() => {
                            if (typeof window.triggerGreatSpiderFangBite === 'function') {
                                window.triggerGreatSpiderFangBite(targetUid, attackerUid, { isAttack: true });
                            }
                        }, 150);
                    }
                } catch(e) {}
                return origLunge.apply(this, arguments);
            };
            window.animateLunge._mirkwoodSpiderAttackHooked = true;
            window.animateLunge._oathSpiderAttackHooked = true;
        }
    }

    function hookRender() {
        try {
            if (typeof window.render === 'function' && !window.render._mirkwoodBuffHooked) {
                const origRender = window.render;
                const wrappedRender = function() {
                    const res = origRender.apply(this, arguments);
                    try { checkAllSpidersOfMirkwoodBuffs(); } catch(e) {}
                    try { if (typeof window.syncTangledGroveStagingRoots === 'function') window.syncTangledGroveStagingRoots(); } catch(e) {}
                    return res;
                };
                wrappedRender._mirkwoodBuffHooked = true;
                window.render = wrappedRender;
            }
        } catch(e) {}
    }

    function hookAnimateToEngaged() {
        try {
            if (typeof window.animateCardToEngaged === 'function' && !window.animateCardToEngaged._mirkwoodBuffHooked) {
                const origAnimate = window.animateCardToEngaged;
                const wrappedAnimate = function(card, cb) {
                    const wrappedCb = function() {
                        if (cb) cb.apply(this, arguments);
                        if (card && (card.id === 'oath_spiders_of_mirkwood' || card.id === 'spiders_of_mirkwood' || card.name === 'Spiders of Mirkwood')) {
                            setTimeout(checkAllSpidersOfMirkwoodBuffs, 30);
                        }
                    };
                    return origAnimate.call(this, card, wrappedCb);
                };
                wrappedAnimate._mirkwoodBuffHooked = true;
                window.animateCardToEngaged = wrappedAnimate;
            }
        } catch(e) {}
    }

    hookRender();
    hookAnimateToEngaged();
    hookSpidersOfMirkwoodAttackSound();
    setInterval(() => {
        hookRender();
        hookAnimateToEngaged();
        hookSpidersOfMirkwoodAttackSound();
        checkAllSpidersOfMirkwoodBuffs();
    }, 120);
})();

// === GOBLIN TROOP PERSISTENT BUFF VISUAL EFFECT (RED SOFT STREAKS & SQUARE MOTES) ===
(function initGoblinTroopBuffAura() {
    const _activeTroopAuras = new Map(); // uid -> persistent aura element
    const _previouslyBuffedGoblins = new Set();

    if (!document.getElementById('goblin-troop-epic-token-style')) {
        const style = document.createElement('style');
        style.id = 'goblin-troop-epic-token-style';
        style.textContent = `
            /* Only suppress tokens on cards currently preparing the entrance animation */
            #engaged-content .card.gt-buff-entering .status-buff-tokens .buff-token:not(.buff-token-ready) {
                opacity: 0 !important;
                visibility: hidden !important;
                transform: scale(0) !important;
            }
            @keyframes gtAuraMaterialize {
                0% { opacity: 0; transform: scale(0.88); filter: brightness(1.8) blur(3px); }
                60% { opacity: 0.95; transform: scale(1.02); filter: brightness(1.15) blur(0.5px); }
                100% { opacity: 1; transform: scale(1); filter: brightness(1) blur(0px); }
            }
            @keyframes gtAuraHaze {
                0%, 100% { opacity: 0.4; transform: scale(0.95); }
                50% { opacity: 0.75; transform: scale(1.06); }
            }
            @keyframes gtSoftFadeA {
                0%, 100% { opacity: 0.25; transform: scaleY(0.94); }
                50% { opacity: 0.95; transform: scaleY(1.04); }
            }
            @keyframes gtSoftFadeB {
                0%, 100% { opacity: 0.85; transform: scaleY(1.05); }
                50% { opacity: 0.2; transform: scaleY(0.92); }
            }
            @keyframes gtSoftFadeC {
                0%, 100% { opacity: 0.15; transform: scaleY(0.96); }
                50% { opacity: 0.8; transform: scaleY(1.03); }
            }
            @keyframes gtSoftFadeD {
                0%, 100% { opacity: 0.9; transform: scaleY(1.02); }
                50% { opacity: 0.3; transform: scaleY(0.95); }
            }
            @keyframes gtStarkRiseA {
                0% { transform: translateY(16px); opacity: 0; }
                25% { opacity: 0.55; }
                65% { opacity: 0.45; }
                100% { transform: translateY(-26px); opacity: 0; }
            }
            @keyframes gtStarkRiseB {
                0% { transform: translateY(16px); opacity: 0; }
                25% { opacity: 0.55; }
                65% { opacity: 0.45; }
                100% { transform: translateY(-26px); opacity: 0; }
            }
            @keyframes gtAuraSqDrift {
                0% { transform: translateY(14px) scale(0.8); opacity: 0; }
                25% { opacity: 0.95; }
                75% { opacity: 0.85; }
                100% { transform: translateY(-30px) scale(1.15); opacity: 0; }
            }
            .gt-aura-sq {
                position: absolute;
                background: #fee2e2;
                border: 1px solid #fca5a5;
                box-shadow: 0 0 6px #ef4444, 0 0 12px #b91c1c;
                border-radius: 1px;
                animation: gtAuraSqDrift 2.4s ease-in-out infinite;
                will-change: transform, opacity;
            }
            @keyframes epicTokenEntrance {
                0% { transform: scale(0) rotate(-140deg); opacity: 0; filter: brightness(3.5) drop-shadow(0 0 20px #ff2222) drop-shadow(0 0 35px #ffffff); }
                50% { transform: scale(1.65) rotate(12deg); opacity: 1; filter: brightness(2.2) drop-shadow(0 0 24px #ff3b30) drop-shadow(0 0 12px #ffedd5); }
                75% { transform: scale(0.92) rotate(-4deg); filter: brightness(1.3) drop-shadow(0 0 14px #ef4444); }
                100% { transform: scale(1) rotate(0deg); opacity: 1; filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.6)); }
            }
            @keyframes epicTokenExit {
                0% { transform: scale(1) rotate(0deg); opacity: 1; filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.6)); }
                25% { transform: scale(0.92) rotate(-4deg); filter: brightness(1.3) drop-shadow(0 0 14px #ef4444); }
                50% { transform: scale(1.65) rotate(12deg); opacity: 1; filter: brightness(2.2) drop-shadow(0 0 24px #ff3b30) drop-shadow(0 0 12px #ffedd5); }
                100% { transform: scale(0) rotate(-140deg); opacity: 0; filter: brightness(3.5) drop-shadow(0 0 20px #ff2222) drop-shadow(0 0 35px #ffffff); }
            }
            @keyframes epicTokenRingShock {
                0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; border-width: 4px; }
                60% { opacity: 0.9; }
                100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; border-width: 1px; }
            }
            @keyframes epicTokenRingCollapse {
                0% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; border-width: 1px; }
                40% { opacity: 0.9; }
                100% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; border-width: 4px; }
            }
            @keyframes epicBadgeFlash {
                0% { transform: translateY(-50%) scale(0); background: #ffffff; color: #000; }
                50% { transform: translateY(-50%) scale(1.5); background: #ffffff; color: #ff2222; box-shadow: 0 0 15px #ffffff, 0 0 25px #ef4444; }
                100% { transform: translateY(-50%) scale(1); background: #1a120b; color: #fff; }
            }
            @keyframes epicBadgeReverseFlash {
                0% { transform: translateY(-50%) scale(1); background: #1a120b; color: #fff; }
                50% { transform: translateY(-50%) scale(1.5); background: #ffffff; color: #ff2222; box-shadow: 0 0 15px #ffffff, 0 0 25px #ef4444; }
                100% { transform: translateY(-50%) scale(0); background: #ffffff; color: #000; }
            }

            /* Universal token suppression across all card containers while entering */
            .card.gt-buff-entering .status-buff-tokens .buff-token:not(.buff-token-ready),
            #staging-content .card.gt-buff-entering .status-buff-tokens .buff-token:not(.buff-token-ready),
            #engaged-content .card.gt-buff-entering .status-buff-tokens .buff-token:not(.buff-token-ready) {
                opacity: 0 !important;
                visibility: hidden !important;
                transform: scale(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    function createTroopBuffAuraElement() {
        const aura = document.createElement('div');
        aura.className = 'goblin-troop-buff-aura';
        aura.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 45;
            overflow: visible;
            animation: gtAuraMaterialize 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            will-change: transform, opacity, left, top, width, height;
            transition: opacity 0.3s ease-out;
        `;

        aura.innerHTML = `
            <!-- Soft ruby/crimson nebula haze core -->
            <div style="position:absolute; inset:8px; background:radial-gradient(ellipse at 50% 50%, rgba(239, 68, 68, 0.42) 0%, rgba(185, 28, 28, 0.26) 45%, rgba(127, 29, 29, 0.12) 65%, transparent 80%); filter:blur(6px); animation: gtAuraHaze 3.2s ease-in-out infinite alternate; pointer-events:none;"></div>

            <!-- Soft fading vertical streaks matching capture.png -->
            <div style="position:absolute; inset:-8px -4px; -webkit-mask-image: linear-gradient(to top, transparent 0%, black 14%, black 86%, transparent 100%); mask-image: linear-gradient(to top, transparent 0%, black 14%, black 86%, transparent 100%); pointer-events:none;">
                <svg viewBox="0 0 160 220" style="width:100%; height:100%; overflow:visible;">
                    <defs>
                        <linearGradient id="gtRedRayGrad" x1="0" y1="0" x2="0" y2="100%">
                            <stop offset="0%" stop-color="rgba(254, 202, 202, 0)"/>
                            <stop offset="25%" stop-color="rgba(252, 165, 165, 0.8)"/>
                            <stop offset="50%" stop-color="rgba(255, 255, 255, 0.92)"/>
                            <stop offset="75%" stop-color="rgba(239, 68, 68, 0.85)"/>
                            <stop offset="100%" stop-color="rgba(185, 28, 28, 0)"/>
                        </linearGradient>
                        <linearGradient id="gtRedSoftGrad" x1="0" y1="0" x2="0" y2="100%">
                            <stop offset="0%" stop-color="rgba(220, 38, 38, 0)"/>
                            <stop offset="35%" stop-color="rgba(248, 113, 113, 0.75)"/>
                            <stop offset="50%" stop-color="rgba(254, 226, 226, 0.88)"/>
                            <stop offset="65%" stop-color="rgba(239, 68, 68, 0.75)"/>
                            <stop offset="100%" stop-color="rgba(153, 27, 27, 0)"/>
                        </linearGradient>
                        <filter id="gtRedGlow" x="-25%" y="-10%" width="150%" height="120%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="blur"/>
                            <feMerge>
                                <feMergeNode in="blur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    <!-- Stream Group A -->
                    <g filter="url(#gtRedGlow)" style="transform-origin: center; animation: gtSoftFadeA 2.5s ease-in-out infinite;">
                        <line x1="38" y1="26" x2="38" y2="194" stroke="url(#gtRedSoftGrad)" stroke-width="1.6"/>
                        <line x1="56" y1="6" x2="56" y2="214" stroke="url(#gtRedRayGrad)" stroke-width="2.8"/>
                        <line x1="82" y1="20" x2="82" y2="200" stroke="url(#gtRedRayGrad)" stroke-width="2.2"/>
                        <line x1="114" y1="22" x2="114" y2="198" stroke="url(#gtRedSoftGrad)" stroke-width="1.8"/>
                    </g>

                    <!-- Stream Group B -->
                    <g filter="url(#gtRedGlow)" style="transform-origin: center; animation: gtSoftFadeB 3.2s ease-in-out infinite;">
                        <line x1="46" y1="16" x2="46" y2="204" stroke="url(#gtRedSoftGrad)" stroke-width="2.0"/>
                        <line x1="66" y1="8" x2="66" y2="212" stroke="url(#gtRedRayGrad)" stroke-width="2.6"/>
                        <line x1="94" y1="14" x2="94" y2="206" stroke="url(#gtRedRayGrad)" stroke-width="2.4"/>
                        <line x1="122" y1="32" x2="122" y2="188" stroke="url(#gtRedSoftGrad)" stroke-width="1.5"/>
                    </g>

                    <!-- Stream Group C -->
                    <g filter="url(#gtRedGlow)" style="transform-origin: center; animation: gtSoftFadeC 2.8s ease-in-out infinite;">
                        <line x1="50" y1="12" x2="50" y2="208" stroke="url(#gtRedRayGrad)" stroke-width="2.2"/>
                        <line x1="74" y1="22" x2="74" y2="198" stroke="url(#gtRedSoftGrad)" stroke-width="1.8"/>
                        <line x1="104" y1="10" x2="104" y2="210" stroke="url(#gtRedRayGrad)" stroke-width="2.6"/>
                    </g>

                    <!-- Stream Group D -->
                    <g filter="url(#gtRedGlow)" style="transform-origin: center; animation: gtSoftFadeD 3.6s ease-in-out infinite;">
                        <line x1="60" y1="16" x2="60" y2="204" stroke="url(#gtRedSoftGrad)" stroke-width="1.8"/>
                        <line x1="88" y1="18" x2="88" y2="202" stroke="url(#gtRedSoftGrad)" stroke-width="2.0"/>
                        <line x1="110" y1="12" x2="110" y2="208" stroke="url(#gtRedRayGrad)" stroke-width="2.4"/>
                    </g>

                    <!-- Stark solid lines: faint, randomized spots & heights, rising and fading -->
                    ${Array.from({length: 5}, (_, i) => {
                        const rx = Math.round(26 + Math.random() * 108);
                        const lineH = Math.round(55 + Math.random() * 135);
                        const midY = 110 + (Math.random() - 0.5) * 40;
                        const y1 = Math.max(8, Math.round(midY - lineH / 2));
                        const y2 = Math.min(212, y1 + lineH);
                        const dur = (2.2 + Math.random() * 1.1).toFixed(2);
                        const delay = (i * 0.6 + Math.random() * 0.4).toFixed(2);
                        const anim = i % 2 === 0 ? 'gtStarkRiseA' : 'gtStarkRiseB';
                        return `<g style="animation: ${anim} ${dur}s ${delay}s ease-in-out infinite; will-change: transform, opacity;"><line x1="${rx}" y1="${y1}" x2="${rx}" y2="${y2}" stroke="#ffffff" stroke-width="1.3" style="filter: drop-shadow(0 0 3px rgba(254, 202, 202, 0.75));"/></g>`;
                    }).join('')}
                </svg>
            </div>

            <!-- Floating ruby square motes matching capture.png -->
            <div style="position:absolute; inset:0; pointer-events:none;">
                <div class="gt-aura-sq" style="left:34%; top:40%; width:6px; height:6px; animation-delay:0s;"></div>
                <div class="gt-aura-sq" style="left:27%; top:66%; width:4px; height:4px; animation-delay:0.7s;"></div>
                <div class="gt-aura-sq" style="left:46%; top:33%; width:5px; height:5px; animation-delay:1.4s;"></div>
                <div class="gt-aura-sq" style="left:60%; top:54%; width:5px; height:5px; animation-delay:0.35s;"></div>
                <div class="gt-aura-sq" style="left:72%; top:68%; width:4px; height:4px; animation-delay:1.8s;"></div>
                <div class="gt-aura-sq" style="left:39%; top:79%; width:5px; height:5px; animation-delay:0.95s;"></div>
                <div class="gt-aura-sq" style="left:21%; top:48%; width:4px; height:4px; animation-delay:1.55s;"></div>
                <div class="gt-aura-sq" style="left:80%; top:36%; width:3px; height:3px; animation-delay:1.15s;"></div>
                <div class="gt-aura-sq" style="left:52%; top:72%; width:4px; height:4px; animation-delay:2.0s;"></div>
                <div class="gt-aura-sq" style="left:67%; top:26%; width:4px; height:4px; animation-delay:0.5s;"></div>
            </div>
        `;
        return aura;
    }

    function getOrCreateTroopAura(uid) {
        let aura = _activeTroopAuras.get(uid);
        if (!aura) {
            aura = createTroopBuffAuraElement();
            document.body.appendChild(aura);
            _activeTroopAuras.set(uid, aura);
        }
        return aura;
    }

    // High-performance RAF tracking loop: keeps aura steady over card without re-mounting on render
    function syncAuraPositions() {
        _activeTroopAuras.forEach((aura, uid) => {
            const cardEl = document.querySelector(`#engaged-content [data-uid="${uid}"]`);
            if (cardEl && cardEl.style.display !== 'none' && cardEl.style.visibility !== 'hidden' && cardEl.style.opacity !== '0') {
                const rect = cardEl.getBoundingClientRect();
                aura.style.left = `${rect.left - 10}px`;
                aura.style.top = `${rect.top - 14}px`;
                aura.style.width = `${rect.width + 20}px`;
                aura.style.height = `${rect.height + 24}px`;
                if (aura.style.opacity === '0') aura.style.opacity = '1';
            } else {
                if (aura.style.opacity !== '0') aura.style.opacity = '0';
            }
        });
        requestAnimationFrame(syncAuraPositions);
    }
    requestAnimationFrame(syncAuraPositions);

    function triggerEpicTokenEntrance(cardEl, isThreat = false) {
        if (!cardEl) return;
        const uid = cardEl.getAttribute('data-uid');
        if (!uid) return;
        
        cardEl.classList.add('gt-buff-entering');

        const tokens = cardEl.querySelectorAll('.status-buff-tokens .buff-token');
        if (tokens.length === 0) {
            cardEl.classList.remove('gt-buff-entering');
            return;
        }

        if (typeof playForestSpiderPowerUpAudio === 'function') {
            playForestSpiderPowerUpAudio();
        }

        Array.from(tokens).forEach((_, idx) => {
            const delay = idx * 130;
            setTimeout(() => {
                // Re-query the live element so DOM re-renders don't cancel the animation on detached nodes
                const liveCard = document.querySelector(`[data-uid="${uid}"]`);
                if (!liveCard) return;
                
                liveCard.classList.add('gt-buff-entering');

                const liveTokens = liveCard.querySelectorAll('.status-buff-tokens .buff-token');
                const token = liveTokens[idx];
                if (!token) return;

                token.classList.add('buff-token-ready');
                token.style.animation = 'none';
                void token.offsetWidth;
                token.style.animation = 'epicTokenEntrance 0.65s cubic-bezier(0.2, 0.9, 0.3, 1) forwards';

                const isAttack = !!token.querySelector('img[alt="atk"]');
                const isThr = isThreat || !!token.querySelector('img[alt="threat"]');
                const shockColor = isThr ? '#ffb74d' : (isAttack ? '#ff4444' : '#60a5fa');
                const glowColor = isThr ? '#f59e0b' : (isAttack ? '#ff2222' : '#3b82f6');

                const ring = document.createElement('div');
                ring.style.cssText = `
                    position: absolute;
                    left: ${token.offsetLeft + token.offsetWidth / 2}px;
                    top: ${token.offsetTop + token.offsetHeight / 2}px;
                    width: ${token.offsetWidth}px;
                    height: ${token.offsetHeight}px;
                    border-radius: 50%;
                    border: 3px solid ${shockColor};
                    box-shadow: 0 0 12px ${glowColor}, inset 0 0 10px #ffffff;
                    pointer-events: none;
                    z-index: 25;
                    animation: epicTokenRingShock 0.55s ease-out forwards;
                `;
                token.parentElement.appendChild(ring);
                setTimeout(() => ring.remove(), 600);

                const badge = token.querySelector('.badge');
                if (badge) {
                    badge.style.animation = 'none';
                    void badge.offsetWidth;
                    badge.style.animation = 'epicBadgeFlash 0.55s 0.12s cubic-bezier(0.2, 0.9, 0.3, 1) forwards';
                }

                if (window.LotrEngine && window.LotrEngine.spawnBurstAtElement) {
                    window.LotrEngine.spawnBurstAtElement(token, shockColor, 14);
                }

                if (idx === liveTokens.length - 1) {
                    setTimeout(() => {
                        const finalCard = document.querySelector(`[data-uid="${uid}"]`);
                        if (finalCard) finalCard.classList.remove('gt-buff-entering');
                    }, 650);
                }
            }, delay);
        });
    }
    window.triggerEpicTokenEntrance = triggerEpicTokenEntrance;

    function triggerEpicTokenExit(uid, isThreat = false, threatVal = 1, onComplete = null) {
        const cardEl = document.querySelector(`[data-uid="${uid}"]`);
        if (!cardEl) {
            if (onComplete) onComplete();
            return;
        }

        // Prevent duplicate trigger calls on the same element
        if (cardEl._isExitingTokens) {
            if (onComplete) onComplete();
            return;
        }
        cardEl._isExitingTokens = true;

        if (typeof playForestSpiderAttackDownAudio === 'function') {
            playForestSpiderAttackDownAudio();
        }

        // Remove existing static tokens immediately so only the exiting token exists
        const existingTokens = cardEl.querySelectorAll('.status-buff-tokens');
        existingTokens.forEach(t => t.remove());

        const exitContainer = document.createElement('div');
        exitContainer.className = 'status-buff-tokens goblin-troop-exiting-tokens';
        exitContainer.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:30;';

        const tokenSize = 'calc(var(--card-w, 130px) * 0.38)';
        const fontSize = 'calc(var(--card-w, 130px) * 0.135)';
        const badgePad = 'calc(var(--card-w, 130px) * 0.015) calc(var(--card-w, 130px) * 0.035)';
        const badgeRight = 'calc(var(--card-w, 130px) * -0.06)';
        const borderWidth = 'calc(var(--card-w, 130px) * 0.008)';

        let tokenList = [];

        if (isThreat) {
            exitContainer.innerHTML = `
                <div class="buff-token exit-threat buff-token-ready" style="position:absolute; top:14.5%; left:0%; width:${tokenSize}; height:${tokenSize}; border-radius:50%; background:rgba(0,0,0,0.85); border:${borderWidth} solid #ffb74d; box-shadow:0 0 4px #ffb74d; display:flex; align-items:center; justify-content:center; z-index:25;">
                    <img src="tokens/threat_str.png" style="width:100%; height:100%; object-fit:contain; border-radius:50%;" alt="threat">
                    <div class="badge plus" style="position:absolute; top:50%; right:${badgeRight}; transform:translateY(-50%); background:#1a120b; border:${borderWidth} solid #ffb74d; font-size:${fontSize}; font-weight:bold; border-radius:3.5px; padding:${badgePad}; white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.95); color:#fff;">+${threatVal}</div>
                </div>
            `;
            const thrToken = exitContainer.querySelector('.exit-threat');
            tokenList = [
                { el: thrToken, color: '#ffb74d', glow: '#f59e0b', delay: 0 }
            ];
        } else {
            exitContainer.innerHTML = `
                <div class="buff-token exit-atk buff-token-ready" style="position:absolute; top:42%; left:0%; width:${tokenSize}; height:${tokenSize}; border-radius:50%; background:rgba(0,0,0,0.85); border:${borderWidth} solid #4caf50; box-shadow:0 0 4px #4caf50; display:flex; align-items:center; justify-content:center; z-index:15;">
                    <img src="tokens/attack.png" style="width:100%; height:100%; object-fit:contain; border-radius:50%;" alt="atk">
                    <div class="badge plus" style="position:absolute; top:50%; right:${badgeRight}; transform:translateY(-50%); background:#1a120b; border:${borderWidth} solid #4caf50; font-size:${fontSize}; font-weight:bold; border-radius:3.5px; padding:${badgePad}; white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.95); color:#fff;">+1</div>
                </div>
                <div class="buff-token exit-def buff-token-ready" style="position:absolute; top:42%; left:55%; width:${tokenSize}; height:${tokenSize}; border-radius:50%; background:rgba(0,0,0,0.85); border:${borderWidth} solid #4caf50; box-shadow:0 0 4px #4caf50; display:flex; align-items:center; justify-content:center; z-index:15;">
                    <img src="tokens/shield.png" style="width:100%; height:100%; object-fit:contain; border-radius:50%;" alt="def">
                    <div class="badge plus" style="position:absolute; top:50%; right:${badgeRight}; transform:translateY(-50%); background:#1a120b; border:${borderWidth} solid #4caf50; font-size:${fontSize}; font-weight:bold; border-radius:3.5px; padding:${badgePad}; white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.95); color:#fff;">+1</div>
                </div>
            `;
            const atkToken = exitContainer.querySelector('.exit-atk');
            const defToken = exitContainer.querySelector('.exit-def');
            tokenList = [
                { el: defToken, color: '#60a5fa', glow: '#3b82f6', delay: 0 },
                { el: atkToken, color: '#ff4444', glow: '#ff2222', delay: 130 }
            ];
        }
        cardEl.appendChild(exitContainer);

        tokenList.forEach(item => {
            setTimeout(() => {
                item.el.style.animation = 'epicTokenExit 0.65s cubic-bezier(0.2, 0.9, 0.3, 1) forwards';

                const ring = document.createElement('div');
                ring.style.cssText = `
                    position: absolute;
                    left: ${item.el.offsetLeft + item.el.offsetWidth / 2}px;
                    top: ${item.el.offsetTop + item.el.offsetHeight / 2}px;
                    width: ${item.el.offsetWidth}px;
                    height: ${item.el.offsetHeight}px;
                    border-radius: 50%;
                    border: 3px solid ${item.color};
                    box-shadow: 0 0 12px ${item.glow}, inset 0 0 10px #ffffff;
                    pointer-events: none;
                    z-index: 25;
                    animation: epicTokenRingCollapse 0.55s ease-in forwards;
                `;
                exitContainer.appendChild(ring);
                setTimeout(() => ring.remove(), 600);

                const badge = item.el.querySelector('.badge');
                if (badge) {
                    badge.style.animation = 'epicBadgeReverseFlash 0.55s cubic-bezier(0.2, 0.9, 0.3, 1) forwards';
                }

                if (window.LotrEngine && window.LotrEngine.spawnBurstAtElement) {
                    window.LotrEngine.spawnBurstAtElement(item.el, item.color, 14);
                }
            }, item.delay);
        });

        const totalDuration = isThreat ? 480 : 790;
        setTimeout(() => {
            exitContainer.remove();
            delete cardEl._isExitingTokens;
            if (onComplete) onComplete();
        }, totalDuration);
    }
    window.triggerEpicTokenExit = triggerEpicTokenExit;

    function syncGoblinTroopBuffAuras() {
        const game = window.game || (window.LotrEngine && window.LotrEngine.game);
        if (!game || !game.engagedEnemies) {
            _activeTroopAuras.forEach(aura => aura.remove());
            _activeTroopAuras.clear();
            _previouslyBuffedGoblins.forEach(uid => triggerEpicTokenExit(uid));
            _previouslyBuffedGoblins.clear();
            return;
        }

        const troops = game.engagedEnemies.filter(e => 
            (e.id === 'oath_goblin_troop' || e.id === 'goblin_troop' || e.id === 'nibin_goblin_troop' || e.name === 'Goblin Troop') &&
            !e._dead && (e.damage || 0) < (e.hp || 6)
        );

        const buffedGoblinsUids = new Set();
        troops.forEach(troop => {
            const pIdx = troop._engagedWithPlayerIdx !== undefined ? troop._engagedWithPlayerIdx : (game.activeTabPlayerIdx || 0);
            game.engagedEnemies.forEach(e => {
                if (e._uid !== troop._uid && (e.trait || '').includes('Goblin') && !e._dead && (e.damage || 0) < (e.hp || 1)) {
                    const ePIdx = e._engagedWithPlayerIdx !== undefined ? e._engagedWithPlayerIdx : (game.activeTabPlayerIdx || 0);
                    if (ePIdx === pIdx) {
                        buffedGoblinsUids.add(e._uid);
                    }
                }
            });
        });

        // Clean up persistent auras that are no longer buffed
        _activeTroopAuras.forEach((aura, uid) => {
            if (!buffedGoblinsUids.has(uid)) {
                aura.style.transition = 'opacity 0.3s ease-out';
                aura.style.opacity = '0';
                setTimeout(() => aura.remove(), 320);
                _activeTroopAuras.delete(uid);
            }
        });

        const unbuffedUids = [];
        for (const uid of _previouslyBuffedGoblins) {
            if (!buffedGoblinsUids.has(uid)) {
                unbuffedUids.push(uid);
                _previouslyBuffedGoblins.delete(uid);
            }
        }
        unbuffedUids.forEach(uid => triggerEpicTokenExit(uid));

        buffedGoblinsUids.forEach(uid => {
            const cardEl = document.querySelector(`[data-uid="${uid}"]`);
            getOrCreateTroopAura(uid);

            if (!_previouslyBuffedGoblins.has(uid)) {
                _previouslyBuffedGoblins.add(uid);
                triggerEpicTokenEntrance(cardEl);
            } else if (cardEl) {
                // Ensure ongoing tokens remain visible across renders without flashing
                cardEl.querySelectorAll('.status-buff-tokens .buff-token').forEach(token => {
                    token.classList.add('buff-token-ready');
                });
            }
        });
    }

    // Microtask DOM observer to intercept incoming tokens synchronously before browser paints
    const engagedContainer = document.getElementById('engaged-content');
    if (engagedContainer) {
        const obs = new MutationObserver(() => {
            try { syncGoblinTroopBuffAuras(); } catch(e) {}
        });
        obs.observe(engagedContainer, { childList: true, subtree: true });
    }

    if (typeof window.render === 'function') {
            const origRender = window.render;
            window.render = function() {
                const res = origRender.apply(this, arguments);
                try { syncGoblinTroopBuffAuras(); } catch(e) {}
                try { if (typeof window.syncTangledGroveStagingRoots === 'function') window.syncTangledGroveStagingRoots(); } catch(e) {}
                return res;
            };
        }
        setInterval(syncGoblinTroopBuffAuras, 120);
    })();

// === GREAT SPIDER FANG BITE ANIMATION (Forest Spider Model with Mahogany Chitin & Extra Detail) ===
window.triggerGreatSpiderFangBite = function(targetUid, attackerUid, options = {}) {
    let targetEl = null;
    if (targetUid instanceof Element) {
        targetEl = targetUid;
    } else if (typeof targetUid === 'object' && targetUid && targetUid._uid) {
        targetEl = document.querySelector(`[data-uid="${targetUid._uid}"]`);
    } else if (typeof targetUid === 'string') {
        targetEl = document.querySelector(`[data-uid="${targetUid}"]`);
    }

    if (!targetEl) {
        targetEl = document.querySelector('#combat-defender-slot .card, #heroes-content .card.selected, #heroes-content .card');
    }

    const rect = targetEl ? targetEl.getBoundingClientRect() : {
        left: window.innerWidth / 2 - 70,
        top: window.innerHeight / 2 - 100,
        width: 140,
        height: 200
    };

    // Debounce duplicate triggers on the same target within 280ms
    const now = Date.now();
    const biteTargetKey = targetUid && typeof targetUid === 'string' ? targetUid : (targetEl ? targetEl.getAttribute('data-uid') || 'general' : 'general');
    if (!window._lastGreatSpiderBiteTimes) window._lastGreatSpiderBiteTimes = {};
    if (window._lastGreatSpiderBiteTimes[biteTargetKey] && (now - window._lastGreatSpiderBiteTimes[biteTargetKey] < 280)) {
        return;
    }
    window._lastGreatSpiderBiteTimes[biteTargetKey] = now;

    const isShadow = !!(options && options.isShadow);
    const isForced = !!(options && options.isForced);
    const isAttack = !!(options && options.isAttack) || (!isShadow && !isForced && (
        !!(window.game?.currentEnemyAttacking && (window.game.currentEnemyAttacking.id === 'oath_great_spider' || window.game.currentEnemyAttacking.id === 'great_spider' || window.game.currentEnemyAttacking.name === 'Great Spider'))
    ));

    if (!options || !options.skipSound) {
        if (isAttack) {
            playGreatSpiderAttackAudio();
        } else if (isShadow || isForced) {
            if (typeof window.playGreatSpiderAudio === 'function') {
                window.playGreatSpiderAudio(isShadow);
            } else {
                if (!window._lastGreatSpiderBiteSoundTime || (now - window._lastGreatSpiderBiteSoundTime > 500)) {
                    window._lastGreatSpiderBiteSoundTime = now;
                    try {
                        const snd = new Audio('./sound_effects/dark_of_mirkwood/great_spider.mp3');
                        const vol = document.getElementById('volume-slider');
                        snd.volume = vol ? parseFloat(vol.value) : 0.25;
                        snd.play().catch(() => {});
                    } catch(e) {}
                }
            }
        }
    }

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2 + 12; // Moved up a tiny bit (from +24px to +12px)

    const canvas = document.createElement('canvas');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.cssText = 'position:fixed; inset:0; width:100vw; height:100vh; pointer-events:none; z-index:99999;';
    canvas.style.maskImage = 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)';
    canvas.style.webkitMaskImage = 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    let frame = 0;
    const totalFrames = isShadow ? 115 : 68;
    const venomParticles = [];

    // Top two fangs are angled inward and have a slightly random angle every time
    // (Negative rotation rotates the tip inward toward the center line)
    const topAngleL = -(0.11 + Math.random() * 0.08); // e.g. -0.11 to -0.19 rad (~6.5° to ~11° inward)
    const topAngleR = -(0.11 + Math.random() * 0.08); // slightly distinct random inward angle per execution
    const botAngleL = isShadow ? 0.08 + Math.random() * 0.06 : 0;
    const botAngleR = isShadow ? 0.08 + Math.random() * 0.06 : 0;

    // Base color palettes for Great Spider: Rich Russet-Mahogany Chitin & Toxic Lime/Amber Venom
    const v = {
      venomColor: '#84cc16',
      venomGlow: '#22c55e'
    };

    // 2 Top and 2 Bottom Mandibles:
    // "make the fangs a tiny bit smaller" (0.70 top, 0.59 bottom vs Forest Spider's 0.78 and 0.66)
    // "and a little farther apart" (ox: ±28 top, ±23 bottom vs Forest Spider's ±20 and ±16)
    const topMandibles = [
      {
        ox: -28,
        scale: 0.70,
        props: { lengthMult: 0.95, curveHook: 1.02, thickness: 0.96, fangSpread: 19, venomDropSize: 2.3, bristleOffset: 0 }
      },
      {
        ox: 28,
        scale: 0.70,
        props: { lengthMult: 0.95, curveHook: 1.02, thickness: 0.96, fangSpread: 19, venomDropSize: 2.3, bristleOffset: 0 }
      }
    ];

    const bottomMandibles = [
      {
        ox: -23,
        scale: 0.59,
        props: { lengthMult: 0.92, curveHook: 0.96, thickness: 0.92, fangSpread: 17, venomDropSize: 2.1, bristleOffset: 1 }
      },
      {
        ox: 23,
        scale: 0.59,
        props: { lengthMult: 0.92, curveHook: 0.96, thickness: 0.92, fangSpread: 17, venomDropSize: 2.1, bristleOffset: 1 }
      }
    ];

    function drawSpiderChelicera(x, y, scaleX, scaleY, biteAngle, p) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scaleX, scaleY);
      ctx.rotate(biteAngle);

      const lengthMult = p.lengthMult;
      const curveHook = p.curveHook;
      const thickness = p.thickness;
      const fangSpread = p.fangSpread;
      const venomDropSize = p.venomDropSize;

      // Rich Russet-Mahogany Chitin with Dark Sclerotized Core
      const baseGradColors = ['#5e2e17', '#36160b', '#170703'];
      const clawGradColors = ['#2c150b', '#52150d', '#280604', '#100202'];

      // --- 1. Chelicera Base (Jaw Root) ---
      const baseGrad = ctx.createRadialGradient(-5, -60, 5, 0, -50, 35);
      baseGrad.addColorStop(0, baseGradColors[0]);
      baseGrad.addColorStop(0.5, baseGradColors[1]);
      baseGrad.addColorStop(1, baseGradColors[2]);

      ctx.fillStyle = baseGrad;
      ctx.strokeStyle = '#3a1708';
      ctx.lineWidth = 1.6;
      ctx.shadowColor = 'rgba(217, 119, 6, 0.45)';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.moveTo(-22 * thickness, -85);
      ctx.bezierCurveTo(-26 * thickness, -65, -20 * thickness, -35, -12, -28);
      ctx.bezierCurveTo(-2, -24, 14 * thickness, -26, 22 * thickness, -34);
      ctx.bezierCurveTo(25 * thickness, -55, 22 * thickness, -75, 12, -85);
      ctx.bezierCurveTo(12, -105, -22 * thickness, -105, -22 * thickness, -85);
      ctx.fill();
      ctx.stroke();

      // Bristle / hair follicles on jaw root
      ctx.strokeStyle = '#382012';
      ctx.lineWidth = 1;
      const bristleSeeds = [
        [[-16, -60, -22, -68], [-12, -48, -18, -54], [-8, -36, -14, -40], [14, -50, 20, -56], [16, -62, 24, -68]],
        [[-18, -64, -25, -72], [-14, -52, -20, -58], [-7, -38, -12, -44], [12, -46, 18, -52], [18, -66, 26, -72]],
        [[-15, -58, -20, -66], [-10, -45, -15, -50], [-9, -34, -16, -38], [15, -52, 22, -58], [14, -60, 21, -65]],
        [[-17, -62, -24, -70], [-13, -50, -19, -56], [-6, -35, -11, -40], [13, -48, 19, -54], [17, -64, 25, -70]],
        [[-14, -56, -19, -64], [-11, -46, -16, -52], [-8, -37, -15, -42], [16, -54, 23, -60], [15, -58, 22, -64]]
      ];
      const selectedBristles = bristleSeeds[p.bristleOffset % bristleSeeds.length];
      selectedBristles.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath();
        ctx.moveTo(x1 * thickness, y1);
        ctx.lineTo(x2 * thickness, y2);
        ctx.stroke();
      });

      // Extra Details on Jaw Root:
      // A. Transverse chitinous segmental striations across jaw root
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.35)';
      ctx.lineWidth = 1.1;
      [-72, -60, -48, -38].forEach((ry, idx) => {
        ctx.beginPath();
        ctx.moveTo((-16 + idx * 1.5) * thickness, ry);
        ctx.quadraticCurveTo(0, ry - 3, (14 - idx * 1.2) * thickness, ry + 1);
        ctx.stroke();
      });

      // B. Dense lateral sensory setae / micro-hairs along outer jaw edge
      ctx.strokeStyle = '#3e1a0b';
      ctx.lineWidth = 0.85;
      for (let i = 0; i < 7; i++) {
        const sy = -80 + i * 8;
        ctx.beginPath();
        ctx.moveTo(-20 * thickness, sy);
        ctx.lineTo(-26 * thickness - (i % 2) * 3, sy - 4);
        ctx.stroke();
        ctx.fillStyle = '#170703';
        ctx.fillRect(-21 * thickness, sy - 0.5, 1.2, 1.2);
      }

      // C. Cheliceral teeth / micro-denticles along inner groove margin
      ctx.fillStyle = '#e2c59b';
      ctx.strokeStyle = '#2c0804';
      ctx.lineWidth = 0.7;
      const microTeeth = [
        [-5, -28, -2, -23, -7, -23],
        [0, -29, 3, -24, -2, -24],
        [5, -30, 8, -25, 3, -25]
      ];
      microTeeth.forEach(([x1, y1, x2, y2, x3, y3]) => {
        ctx.beginPath();
        ctx.moveTo(x1 * thickness, y1);
        ctx.lineTo(x2 * thickness, y2);
        ctx.lineTo(x3 * thickness, y3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });

      // D. Sclerotized articular joint socket / hinge condyle
      ctx.beginPath();
      ctx.ellipse(0, -30, 10 * thickness, 3.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#120402';
      ctx.fill();
      ctx.strokeStyle = '#782d0e';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // --- 2. Curved Articulated Claw (The Fang) ---
      const clawGrad = ctx.createLinearGradient(0, -30, 20, 30);
      clawGrad.addColorStop(0, clawGradColors[0]);
      clawGrad.addColorStop(0.40, clawGradColors[1]);
      clawGrad.addColorStop(0.75, clawGradColors[2]);
      clawGrad.addColorStop(1, clawGradColors[3]);

      ctx.fillStyle = clawGrad;
      ctx.strokeStyle = '#45100a';
      ctx.lineWidth = 1.3;
      ctx.shadowColor = 'rgba(217, 119, 6, 0.55)';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.moveTo(-10 * thickness, -30);
      ctx.bezierCurveTo(-14 * curveHook, -5, -4, 15 * lengthMult, fangSpread * curveHook, 28 * lengthMult);
      ctx.bezierCurveTo(6, 12 * lengthMult, 4, -8, 12 * thickness, -30);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // --- 3. Glossy Specular Reflection along Spine ---
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(-8, -25);
      ctx.bezierCurveTo(-10 * curveHook, -5, -2, 10 * lengthMult, (fangSpread - 3) * curveHook, 24 * lengthMult);
      ctx.stroke();

      // --- 4. Toxic Venom Duct & Orifice Droplet ---
      ctx.strokeStyle = v.venomColor;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(3, -18);
      ctx.quadraticCurveTo(5, 5, fangSpread - 4, 20 * lengthMult);
      ctx.stroke();

      // Glowing venom drop bead at puncture opening
      ctx.fillStyle = v.venomColor;
      ctx.shadowColor = v.venomGlow;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(fangSpread - 1, 26 * lengthMult, venomDropSize, 0, Math.PI * 2);
      ctx.fill();

      // Extra Details on Fang:
      // E. Internal longitudinal venom canal luminescence
      ctx.strokeStyle = 'rgba(163, 230, 53, 0.45)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(-2, -26);
      ctx.bezierCurveTo(-6 * curveHook, -3, 0, 14 * lengthMult, (fangSpread - 2) * curveHook, 26 * lengthMult);
      ctx.stroke();

      // F. Secondary 3D cylindrical outer-edge rim specular highlight
      ctx.strokeStyle = 'rgba(254, 243, 199, 0.45)';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(10 * thickness, -28);
      ctx.bezierCurveTo(3, -5, 5, 10 * lengthMult, fangSpread * curveHook, 27 * lengthMult);
      ctx.stroke();

      // G. Glistening sub-terminal venom orifice opening pore
      ctx.strokeStyle = '#fef3c7';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.ellipse((fangSpread - 1.5) * curveHook, 25 * lengthMult, 1.8, 1.0, 0.3, 0, Math.PI * 2);
      ctx.stroke();

      // H. Needle tip glint star
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(fangSpread * curveHook, 28 * lengthMult, 1.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function loop() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      frame++;

      const snapProg = Math.min(1.0, frame / 16);
      const easeBite = Math.sin((snapProg * Math.PI) / 2);
      const clampY = (1 - easeBite) * 42;
      const alpha = frame <= 46 ? 1.0 : Math.max(0, 1 - (frame - 46) / 20);

      // Pre-impact dripping (frames 8 to 15)
      if (frame >= 8 && frame < 16) {
        for (let i = 0; i < 2; i++) {
          const randMandible = topMandibles[Math.floor(Math.random() * topMandibles.length)];
          const fangX = cx + randMandible.ox + (Math.random() - 0.5) * 10;
          const fangY = cy - clampY - 10 + 20 * (randMandible.props?.lengthMult || 1);
          const spd = 2.0 + Math.random() * 3.5;
          const ang = Math.PI / 2 + (Math.random() - 0.5) * 0.6;
          venomParticles.push({
            x: fangX,
            y: fangY,
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd,
            size: 2.2 + Math.random() * 1.8,
            alpha: 1.0,
            decay: 0.035 + Math.random() * 0.02,
            color: Math.random() > 0.3 ? v.venomColor : '#bef264'
          });
        }
      }

      // High-impact wet splash and venom burst on frame 16
      if (frame === 16) {
        if (window.shakeCard && targetUid) window.shakeCard(targetUid);

        // Standard impact splatter
        for (let i = 0; i < 20; i++) {
          const ang = Math.random() * Math.PI * 2;
          const spd = 2.8 + Math.random() * 5.2;
          venomParticles.push({
            x: cx + (Math.random() - 0.5) * 24,
            y: cy + (Math.random() - 0.5) * 20,
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd - 1.2,
            size: 2.4 + Math.random() * 2.8,
            alpha: 1.0,
            decay: 0.028 + Math.random() * 0.02,
            color: Math.random() > 0.35 ? v.venomColor : '#86efac'
          });
        }

        // Violent high-velocity poison burst from both fangs on attack
        if (isAttack) {
          const rotLX = 19 * Math.cos(topAngleL) - 26 * Math.sin(topAngleL);
          const rotLY = 19 * Math.sin(topAngleL) + 26 * Math.cos(topAngleL);
          const rotRX = 19 * Math.cos(topAngleR) - 26 * Math.sin(topAngleR);
          const rotLY_R = 19 * Math.sin(topAngleR) + 26 * Math.cos(topAngleR);

          const fangTipLX = cx - 28 + (rotLX * 0.70);
          const fangTipLY = cy - clampY - 10 + (rotLY * 0.70);
          const fangTipRX = cx + 28 - (rotRX * 0.70);
          const fangTipRY = cy - clampY - 10 + (rotLY_R * 0.70);

          const burstFangs = [
            { x: fangTipLX, y: fangTipLY, dir: -1, minAngle: Math.PI * 0.35, maxAngle: Math.PI * 0.95 },
            { x: fangTipRX, y: fangTipRY, dir: 1, minAngle: Math.PI * 0.05, maxAngle: Math.PI * 0.65 }
          ];

          burstFangs.forEach(fang => {
            const count = 28;
            for (let i = 0; i < count; i++) {
              const ang = fang.minAngle + Math.random() * (fang.maxAngle - fang.minAngle);
              const spd = 4.2 + Math.random() * 7.5;
              const size = 2.4 + Math.random() * 3.4;
              const palette = ['#eaffb0', '#bef264', '#a3e635', '#84cc16', '#22c55e', '#4ade80'];
              venomParticles.push({
                isPoisonDrop: true,
                x: fang.x + (Math.random() - 0.5) * 4,
                y: fang.y + (Math.random() - 0.5) * 4,
                vx: Math.cos(ang) * spd + fang.dir * 1.5,
                vy: Math.sin(ang) * spd + 1.2,
                size: size,
                alpha: 1.0,
                decay: 0.018 + Math.random() * 0.016,
                color: palette[Math.floor(Math.random() * palette.length)]
              });
            }
          });
        }
      }

      // Detailed poison dripping down for a bit after the fangs bite (Shadow mode)
      if (isShadow && frame >= 16 && frame <= 72) {
        if (frame % 2 === 0 || frame <= 30) {
          const spawnCount = frame <= 34 ? 3 : (frame <= 54 ? 2 : 1);
          const rotLX = 19 * Math.cos(topAngleL) - 26 * Math.sin(topAngleL);
          const rotRX = 19 * Math.cos(topAngleR) - 26 * Math.sin(topAngleR);
          for (let s = 0; s < spawnCount; s++) {
            const side = (s % 2 === 0) ? -1 : 1;
            const fangTipX = side === -1 ? (cx - 28 + rotLX * 0.70) : (cx + 28 - rotRX * 0.70);
            const dropX = fangTipX + (Math.random() - 0.5) * 6;
            const dropY = cy - 2 + (Math.random() - 0.5) * 6;
            const dropSize = 2.4 + Math.random() * 2.6;
            const speed = 1.6 + Math.random() * 2.8;
            const colorPalette = ['#bef264', '#a3e635', '#4ade80', '#22c55e', '#84cc16'];
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

            venomParticles.push({
              isPoisonDrop: true,
              x: dropX,
              y: dropY,
              vx: (side * 0.3) + (Math.random() - 0.5) * 0.6,
              vy: speed,
              size: dropSize,
              alpha: 1.0,
              decay: 0.012 + Math.random() * 0.008,
              color: color
            });
          }
        }
      }

      if (alpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = alpha;

        // 1. Render Top Mandibles (angled inward with slightly random angle every time)
        topMandibles.forEach(m => {
          const yPos = cy - clampY - 10;
          if (m.ox <= 0) {
            drawSpiderChelicera(cx + m.ox, yPos, m.scale, m.scale, topAngleL, m.props);
          } else {
            drawSpiderChelicera(cx + m.ox, yPos, -m.scale, m.scale, topAngleR, m.props);
          }
        });

        // 2. Render Bottom Opposing Mandibles facing vertically (with slight flare in shadow mode)
        bottomMandibles.forEach(m => {
          const yPos = cy + clampY + 10;
          if (m.ox <= 0) {
            drawSpiderChelicera(cx + m.ox, yPos, m.scale, -m.scale, botAngleL, m.props);
          } else {
            drawSpiderChelicera(cx + m.ox, yPos, -m.scale, -m.scale, botAngleR, m.props);
          }
        });

        // 3. Render Viscous Venom Strands stretching between upper & lower fangs during bite hold
        if (frame >= 14 && frame <= 36) {
          const strandAlpha = frame <= 28 ? 0.95 : Math.max(0, (36 - frame) / 8 * 0.95);
          ctx.save();
          ctx.globalAlpha = alpha * strandAlpha;
          ctx.strokeStyle = 'rgba(190, 242, 100, 0.85)';
          ctx.lineWidth = 1.3;
          ctx.shadowColor = '#22c55e';
          ctx.shadowBlur = 8;

          const rotLX = 19 * Math.cos(topAngleL) - 26 * Math.sin(topAngleL);
          const rotLY = 19 * Math.sin(topAngleL) + 26 * Math.cos(topAngleL);
          const rotRX = 19 * Math.cos(topAngleR) - 26 * Math.sin(topAngleR);
          const rotRY = 19 * Math.sin(topAngleR) + 26 * Math.cos(topAngleR);

          const topLX = cx - 28 + (rotLX * 0.70);
          const topLY = cy - clampY - 10 + (rotLY * 0.70);
          const topRX = cx + 28 - (rotRX * 0.70);
          const topRY = cy - clampY - 10 + (rotRY * 0.70);
          const botLY = cy + clampY + 10 - (26 * 0.92 * 0.59);
          const botRY = cy + clampY + 10 - (26 * 0.92 * 0.59);
          const botLX = cx - 23 + (17 * 0.59);
          const botRX = cx + 23 - (17 * 0.59);

          // Left viscous strand
          ctx.beginPath();
          ctx.moveTo(topLX, topLY);
          ctx.quadraticCurveTo((topLX + botLX) / 2 - 4, (topLY + botLY) / 2, botLX, botLY);
          ctx.stroke();

          // Right viscous strand
          ctx.beginPath();
          ctx.moveTo(topRX, topRY);
          ctx.quadraticCurveTo((topRX + botRX) / 2 + 4, (topLY + botRY) / 2, botRX, botRY);
          ctx.stroke();

          // Center suspended micro-beads
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc((topLX + botLX) / 2 - 4, (topLY + botLY) / 2, 1.5, 0, Math.PI * 2);
          ctx.arc((topRX + botRX) / 2 + 4, (topLY + botRY) / 2, 1.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }

        ctx.restore();
      }

      // Splashing gushing wet venom particles and falling poison drops
      let activeParticles = 0;
      venomParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.isPoisonDrop ? 0.30 : 0.22;
        p.vx *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          activeParticles++;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);

          if (p.isPoisonDrop) {
            // Detailed poison droplet: fluid teardrop, inner luminous acidic core, specular gleam & satellite drop
            const spd = Math.hypot(p.vx, p.vy);
            const stretch = Math.min(30, Math.max(p.size * 1.6, spd * 2.8));

            ctx.translate(p.x, p.y);
            ctx.rotate(Math.atan2(p.vy, p.vx));

            ctx.shadowColor = '#22c55e';
            ctx.shadowBlur = 12;

            // Outer poison droplet
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, stretch, p.size, 0, 0, Math.PI * 2);
            ctx.fill();

            // Inner bright luminous acidic core
            ctx.fillStyle = '#fef08a';
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.ellipse(stretch * 0.2, 0, stretch * 0.45, p.size * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Specular reflection bead at leading tip
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(stretch * 0.45, -p.size * 0.2, p.size * 0.35, 0, Math.PI * 2);
            ctx.fill();

            // Trailing satellite micro-droplet for fluid realism
            if (p.size > 3.0) {
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.arc(-stretch * 1.15, 0, p.size * 0.38, 0, Math.PI * 2);
              ctx.fill();
            }
          } else {
            const spd = Math.hypot(p.vx, p.vy);
            if (spd > 1.2) {
              ctx.translate(p.x, p.y);
              ctx.rotate(Math.atan2(p.vy, p.vx));
              const stretch = Math.min(24, Math.max(p.size * 1.5, spd * 2.2));
              ctx.fillStyle = p.color;
              ctx.shadowColor = v.venomGlow;
              ctx.shadowBlur = 10;
              ctx.beginPath();
              ctx.ellipse(0, 0, stretch, p.size, 0, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
              ctx.beginPath();
              ctx.arc(stretch * 0.35, 0, p.size * 0.45, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillStyle = p.color;
              ctx.shadowColor = v.venomGlow;
              ctx.shadowBlur = 8;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          ctx.restore();
        }
      });

      if (frame < totalFrames || activeParticles > 0) {
        requestAnimationFrame(loop);
      } else {
        canvas.remove();
      }
    }

    requestAnimationFrame(loop);
};