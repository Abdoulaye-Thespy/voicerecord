const btnrecord = document.getElementById("start");
const btnstop = document.getElementById("stop");
const btnsend = document.getElementById("send");
const trash = document.getElementById("trash");
const listObject = document.getElementById("recordings");
  var audio_context;
  var recorder;
  var recording = 0;
const recording = () => {
    if (audio_context == null) {
        audio_context = new(
            window.AudioContext || window.webkitAudioContext
        );
    }

    audioRecorder.requestDevice(function(recorderObject){

        btnstop.style.display = "block";
        btnrecord.style.display = "none";
        recording = recording + 1;
        recorder.clear();
         recorder && recorder.record();
    }, {recordAsOGG: false});
}



const stoprecording = () => {
    btnstop.style.display = "none";
    btnsend.style.display = "block";
    trash.style.display = "block";
    recorder && recorder.stop();
        // Export the MP3 file
           recorder.exportMP3(function(blob) {
            const url = (window.URL || window.webkitURL)
                .createObjectURL(blob);
            // Prepare the playback
            const node = document.createElement("audio");
            var att = document.createAttribute("src");
            att.value = url;
            var att2 = document.createAttribute("controls"); 
            node.setAttributeNode(att2);
            node.setAttributeNode(att);
            listObject.appendChild(node);
            console.log(blob);
        });
    }

const deleteaudio = () => {
    location.reload();
}


const submit = () => {
  location.reload();
}
