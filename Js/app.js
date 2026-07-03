/* ==========================================
   JD WRLD STUDIO v1.0
   app.js
========================================== */

/* ========= Audio Context ========= */

const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContextClass();

/* ========= Instruments ========= */

const instruments = [
    "Kick",
    "Snare",
    "HiHat",
    "Clap"
];

const TOTAL_STEPS = 16;

/* ========= App State ========= */

let bpm = 120;
let currentStep = 0;
let isPlaying = false;
let intervalId = null;

/* ========= Pattern ========= */

const pattern = instruments.map(() =>
    Array(TOTAL_STEPS).fill(false)
);

/* ========= DOM ========= */

const sequencer = document.getElementById("sequencer");
const playBtn = document.getElementById("playBtn");
const bpmSlider = document.getElementById("bpm");
const bpmValue = document.getElementById("bpmValue");

/* ========= Build Sequencer ========= */

function buildSequencer() {

    sequencer.innerHTML = "";

    instruments.forEach((name, row) => {

        const label = document.createElement("div");
        label.className = "instrument";
        label.textContent = name;

        sequencer.appendChild(label);

        for (let col = 0; col < TOTAL_STEPS; col++) {

            const pad = document.createElement("div");

            pad.className = "step";

            pad.dataset.row = row;
            pad.dataset.step = col;

            pad.addEventListener("click", () => {

                pattern[row][col] = !pattern[row][col];

                pad.classList.toggle("active");

            });

            sequencer.appendChild(pad);

        }

    });

}

/* ========= BPM ========= */

bpmSlider.addEventListener("input", () => {

    bpm = Number(bpmSlider.value);

    bpmValue.textContent = bpm;

});

/* ========= Initialize ========= */

buildSequencer();
/* ==========================================
   Drum Sound Engine
========================================== */

function playKick() {

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";

    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
        45,
        audioCtx.currentTime + 0.15
    );

    gain.gain.setValueAtTime(1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + 0.15
    );

    osc.connect(gain);
    gain.connect(mixer.kick);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);

}

function playSnare() {

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.value = 220;

    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + 0.08
    );

    osc.connect(gain);
    gain.connect(mixer.snare);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);

}

function playHiHat() {

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";
    osc.frequency.value = 800;

    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + 0.03
    );

    osc.connect(gain);
    gain.connect(mixer.hihat);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);

}

function playClap() {

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sawtooth";
    osc.frequency.value = 400;

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + 0.05
    );

    osc.connect(gain);
    gain.connect(mixer.clap);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);

}
/* ==========================================
   Sequencer Playback
========================================== */

function playCurrentStep() {

    const pads = document.querySelectorAll(".step");

    pads.forEach(pad => pad.classList.remove("playing"));

    for (let row = 0; row < instruments.length; row++) {

        const index = row * TOTAL_STEPS + currentStep;

        pads[index].classList.add("playing");

        if (pattern[row][currentStep]) {

            switch (row) {

                case 0:
                    playKick();
                    break;

                case 1:
                    playSnare();
                    break;

                case 2:
                    playHiHat();
                    break;

                case 3:
                    playClap();
                    break;

            }

        }

    }

    currentStep++;

    if (currentStep >= TOTAL_STEPS) {

        currentStep = 0;

    }

}

/* ==========================================
   Start / Stop
========================================== */

function startSequencer() {

    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    isPlaying = true;

    playBtn.textContent = "⏹ Stop";

    const speed = (60 / bpm / 4) * 1000;

    playCurrentStep();

    intervalId = setInterval(playCurrentStep, speed);

}

function stopSequencer() {

    clearInterval(intervalId);

    intervalId = null;

    isPlaying = false;

    currentStep = 0;

    playBtn.textContent = "▶ Play";

    document.querySelectorAll(".step").forEach(step => {
        step.classList.remove("playing");
    });

}

playBtn.addEventListener("click", () => {

    if (isPlaying) {

        stopSequencer();

    } else {

        startSequencer();

    }

});