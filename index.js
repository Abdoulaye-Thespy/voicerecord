const btnrecord = document.getElementById("start");
const btnstop = document.getElementById("stop");
const btnsend = document.getElementById("send");
const trash = document.getElementById("trash");
const listObject = document.getElementById("recordings");
      // Enter the API key from the Google Develoepr Console - to handle any unauthenticated
      // requests in the code.
      // The provided key works for this sample only when run from
      // https://google-api-javascript-client.googlecode.com/hg/samples/rpcRequestBody.html
      // To use in your own application, replace this API key with your own.
      var apiKey = 'AIzaSyAdjHPT5Pb7Nu56WJ_nlrMGOAgUAtKjiPM';

      // Enter a client ID for a web application from the Google Developer Console.
      // The provided clientId will only work if the sample is run directly from
      // https://google-api-javascript-client.googlecode.com/hg/samples/rpcRequestBody.html
      // In your Developer Console project, add a JavaScript origin that corresponds to the domain
      // where you will be running the script.
      var clientId = '837050751313';

      var scopes = 'https://www.googleapis.com/auth/calendar';
var myRecorder = {
    objects: {
        context: null,
        stream: null,
        recorder: null
    }
};
// Prepare the recordings list
const recording = () => {
    if (myRecorder.objects.context == null) {
        myRecorder.objects.context = new(
            window.AudioContext || window.webkitAudioContext
        );
    }
    const options = {
        audio: true,
        video: false
    };
    navigator.mediaDevices.getUserMedia(options).then(function (stream) {
        btnstop.style.display = "block";
        btnrecord.style.display = "none";
        myRecorder.objects.stream = stream;
        myRecorder.objects.recorder = new Recorder(
            myRecorder.objects.context.createMediaStreamSource(stream), {
                numChannels: 1
            }
        );
        myRecorder.objects.recorder.record();
    }).catch(function (err) {});
}
const stoprecording = () => {
    btnstop.style.display = "none";
    btnsend.style.display = "block";
    trash.style.display = "block";
    if (null !== myRecorder.objects.stream) {
        myRecorder.objects.stream.getAudioTracks()[0].stop();
    }
    if (null !== myRecorder.objects.recorder) {
        myRecorder.objects.recorder.stop();
        // Export the WAV file
        myRecorder.objects.recorder.exportWAV(function (blob) {
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
}

const deleteaudio = () => {
    location.reload();
}


const submit = () => {

  const accessToken = "jkjkjkj"; // Please set access token here.

  function run(obj) {
    const file = obj.target.files[0];
    if (file.name != "") {
      let fr = new FileReader();
      fr.fileName = file.name;
      fr.fileSize = file.size;
      fr.fileType = file.type;
      fr.readAsArrayBuffer(file);
      fr.onload = resumableUpload;
    }
  }

  function resumableUpload(e) {
    document.getElementById("progress").innerHTML = "Initializing.";
    const f = e.target;
    const resource = {
      fileName: f.fileName,
      fileSize: f.fileSize,
      fileType: f.fileType,
      fileBuffer: f.result,
      accessToken: accessToken
    };
    const ru = new ResumableUploadToGoogleDrive();
    ru.Do(resource, function(res, err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
      let msg = "";
      if (res.status == "Uploading") {
        msg =
          Math.round(
            (res.progressNumber.current / res.progressNumber.end) * 100
          ) + "%";
      } else {
        msg = res.status;
      }
      document.getElementById("progress").innerText = msg;
    });
  }

}
