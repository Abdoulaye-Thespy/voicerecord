<!doctype html>
<html>
    <head>
        <title>Audio Recorder</title>
        <link rel="icon" type="image/png" href="https://stephino.github.io/dist/favicon.png" />
            <link rel="stylesheet" href="index.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
                <script src="https://cdn.jsdelivr.net/gh/tanaikech/ResumableUploadForGoogleDrive_js@master/resumableupload_js.min.js"></script>
            
        <script type="text/javascript" src="https://code.jquery.com/jquery.min.js"></script>
    </head>
    <body>

        <div class="cover">
        <div class="btns">
                <button id="start" onclick="recording()" class="mybtns">Start</button>
                <button id="stop" onclick="stoprecording()" class="mybtns">Stop</button>
                <button id="send" onclick="submit()" class="mybtns">Send</button>
       </div>
        <div class="record">
        <div class="audiobox">
            <div id="recordings"></div>
            <span id="trash" onclick="deleteaudio()"><i class="fas fa-trash-alt"></i></span>
        </div>
        </div>
    </div>
    <div id="progress"></div>
     <script src="index.js"></script> 
    <script src="js/audioRecord.js"></script>
    </body>
</html>