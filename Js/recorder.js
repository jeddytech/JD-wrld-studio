/* ==========================================
   JD WRLD STUDIO
   recorder.js
========================================== */

let mediaRecorder;
let audioChunks = [];

const recordBtn = document.getElementById("recordBtn");
const stopRecordBtn = document.getElementById("stopRecordBtn");
const audioPlayer = document.getElementById("audioPlayer");

recordBtn.addEventListener("click", async () => {

    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });

    mediaRecorder = new MediaRecorder(stream);

    audioChunks = [];

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {

        const blob = new Blob(audioChunks, {
            type: "audio/webm"
        });

        audioPlayer.src = URL.createObjectURL(blob);

    };

    mediaRecorder.start();

    recordBtn.disabled = true;
    stopRecordBtn.disabled = false;

});

stopRecordBtn.addEventListener("click", () => {

    mediaRecorder.stop();

    recordBtn.disabled = false;
    stopRecordBtn.disabled = true;

});

stopRecordBtn.disabled = true;