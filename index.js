const btnrecord = document.getElementById("start");
const btnstop = document.getElementById("stop");
const btnsend = document.getElementById("send");
const trash = document.getElementById("trash");
const listObject = document.getElementById("recordings");
const inputpop = document.getElementById("audiid");
const url = 'upload.php'
let audio;
  var audio_context;
  var recorder;
  var recordings = 0;
const recording = () => {
    if (audio_context == null) {
        audio_context = new(
            window.AudioContext || window.webkitAudioContext
        );
    }

    audioRecorder.requestDevice(function(recorderObject){
      recorder=recorderObject;

        btnstop.style.display = "block";
        btnrecord.style.display = "none";
        recordings = recordings + 1;
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
            audio = blob;
            console.log(blob);
        });
    }

const deleteaudio = () => {
    location.reload();
}


const submit = () => {
    console.log(audio);
        
    const fd = new FormData();
    fd.append('file', audio);
    jQuery.ajax({
      url: "upload.php",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
      success: function(response) {
          // .. do something
      },
      error: function(jqXHR, textStatus, errorMessage) {
          console.log(errorMessage); // Optional
      }
    });
}
