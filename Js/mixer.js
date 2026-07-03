/* ==========================================
   JD WRLD STUDIO
   mixer.js
========================================== */

const mixer = {

    master: audioCtx.createGain(),

    kick: audioCtx.createGain(),

    snare: audioCtx.createGain(),

    hihat: audioCtx.createGain(),

    clap: audioCtx.createGain(),

    piano: audioCtx.createGain()

};

mixer.master.gain.value = 1;

mixer.kick.gain.value = 0.8;
mixer.snare.gain.value = 0.8;
mixer.hihat.gain.value = 0.8;
mixer.clap.gain.value = 0.8;
mixer.piano.gain.value = 0.8;

/* Routing */

mixer.kick.connect(mixer.master);
mixer.snare.connect(mixer.master);
mixer.hihat.connect(mixer.master);
mixer.clap.connect(mixer.master);
mixer.piano.connect(mixer.master);

mixer.master.connect(audioCtx.destination);

/* Volume Controls */

const sliders = document.querySelectorAll("#mixer input[type='range']");

sliders.forEach((slider, index) => {

    slider.addEventListener("input", () => {

        const volume = slider.value / 100;

        switch(index){

            case 0:
                mixer.kick.gain.value = volume;
                break;

            case 1:
                mixer.snare.gain.value = volume;
                break;

            case 2:
                mixer.hihat.gain.value = volume;
                break;

            case 3:
                mixer.clap.gain.value = volume;
                break;

        }

    });

});

const masterSlider = document.getElementById("masterVolume");

masterSlider.addEventListener("input", () => {

    mixer.master.gain.value = masterSlider.value / 100;

});

const pianoSlider = document.getElementById("pianoVolume");

pianoSlider.addEventListener("input", () => {

    mixer.piano.gain.value = pianoSlider.value / 100;

});