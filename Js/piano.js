/* ==========================================
   JD WRLD STUDIO
   piano.js
========================================== */

const piano = document.getElementById("piano");

const notes = [
    {name:"C4",freq:261.63},
    {name:"D4",freq:293.66},
    {name:"E4",freq:329.63},
    {name:"F4",freq:349.23},
    {name:"G4",freq:392.00},
    {name:"A4",freq:440.00},
    {name:"B4",freq:493.88},

    {name:"C5",freq:523.25},
    {name:"D5",freq:587.33},
    {name:"E5",freq:659.25},
    {name:"F5",freq:698.46},
    {name:"G5",freq:783.99},
    {name:"A5",freq:880.00},
    {name:"B5",freq:987.77}
];

function playNote(freq){

    if(audioCtx.state==="suspended"){
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";

    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0.3,audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime+1
    );

    osc.connect(gain);
    gain.connect(mixer.piano);

    osc.start();
    osc.stop(audioCtx.currentTime+1);

}

function buildPiano(){

    piano.innerHTML="";

    notes.forEach(note=>{

        const key=document.createElement("div");

        key.className="white-key";

        key.textContent=note.name;

        key.addEventListener("mousedown",()=>{
            playNote(note.freq);
        });

        key.addEventListener("touchstart",(e)=>{
            e.preventDefault();
            playNote(note.freq);
        });

        piano.appendChild(key);

    });

}

buildPiano();