// Audio Modio
// Owen Avon

// Prototype that displays the potential of modifying a users voice with the api tuna.

"use strict";


  const downloadRaw = document.getElementById('download-raw');
  const player = document.getElementById('player');
  const startButton = document.getElementById('start');
  const stopButton = document.getElementById('stop');
  const visualizerButton = document.getElementById('see-visualizer');


  $("#player").hide(); // Hides the player id by default.
  $("#download-raw").hide(); // Hides the download-raw id by default.
  $("#download-edit").hide(); // Hides the download-edit id by default.
  $("#stop").hide(); // Hides the stop button by default.
  $("#done-edit").hide(); // Hides the done-edit button by default.
  $("#see-visualizer").hide(); // Hides the see-visualizer button by default.
  $(`#visualizer`).hide(); // Hides the visualizer content upon starting the program.
  $(".master-controls").hide(); // Hides the master editable sliders by default.


  $("#start-stop-button").text(`Press the "Start" button to record your voice.`); // Default displayed text

  $(`#record-rectangle`).hide();

  const handleSuccess = function(stream) {
    const options = {
      mimeType: 'audio/webm'
    };
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);


    // DATA_AVAILABLE METHOD
    mediaRecorder.addEventListener('dataavailable', function(e) { // dataavailable fires when mediaRecorder delivers media.
      if (e.data.size > 0) recordedChunks.push(e.data);
    });


    // EVENT lISTENER UPON STOP BUTTON
    mediaRecorder.addEventListener('stop', function() { // Defines actions that happen upon cliking on the stop button
      player.src = URL.createObjectURL(new Blob(recordedChunks)); // Assigns the recorded audio src to player.

      downloadRaw.href = URL.createObjectURL(new Blob(recordedChunks)); // Gnerates audio doownload link.
      downloadRaw.download = 'testRecording.wav'; // Name the recording to testRecording.wav.
      $("#download-raw").show(); // Shows the download-raw button once the recording has stopped.

      $("#download-edit").show(); // Shows the download-show button once the user says the modifications are complete.

      $("#edit-recording").text(`Edit your recording:`); // Default displayed text.
      $("#player").show(); // Displays the player interface upon stopping the event litener.
      $(".master-controls").show(); // Shows the master editable sliders by default.
      $("#done-edit").show(); // Displays the done-edit button.
      $("#see-visualizer").show(); // Displays the see-visualizer button.

      $("#start-stop-record").hide(); // Hides the start-stop-record text.
      $("#press-play-text").text(`Press the "Play" arrow to hear your recording.`); // Dynamically changes the html text upon clicking the start button.

      $("#start-stop-button").hide(); // Hides the player interface upon stopping the event litener.
      $("#start-stop-record").hide(); // Hides the player interface upon stopping the event litener.
      $("#stop").hide(); // Hides the player interface upon stopping the event litener.
      $("#start").hide(); // Hides the player interface upon stopping the event litener.

      setInterval(function() {
        $(`#record-rectangle`).remove(); // Removes the recording rectangle.
      });

    });


    // STOP RECORIDNG
    stopButton.addEventListener('click', function() { // Event listener that listens for button click.
      mediaRecorder.stop(); // Stops audio input recording upon event listener button.

    });


    // START RECORDING
    startButton.addEventListener('click', function() { // Event listener that listens for button click.
      mediaRecorder.start(); // Starts audio input recording upon event listener button.

      $("#start-stop-button").hide(); // Hides the start-stop-button text.
      $("#start-stop-record").text(`Press the "Stop" button to terminate the recording.`); // Dynamically changes the html text upon clicking the start button.

      $("#stop").show(); // Shows the stop button once the user has started the recording.
      $("#start").hide(); // Hides the start button once the user has started the recording.

      setInterval(function() {
        $(`#record-rectangle`).fadeToggle(1000);
      });
    });

    // SEE VISUALIZER
    visualizerButton.addEventListener(`click`, function() {
      $(`#visualizer`).dialog(); // Opens the dialogbox.
    })


    // CROSS BROWSER
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();


    // VOLUME
    const gainNode = audioCtx.createGain();

    const volumeControl = document.querySelector('[data-action="volume"]');
    volumeControl.addEventListener('input', function() {
    	gainNode.gain.value = this.value;
    }, false);


    // PANNING
    const pannerOptions = {pan: 0};
    const panner = new StereoPannerNode(audioCtx, pannerOptions);

    const pannerControl = document.querySelector('[data-action="panner"]');
    pannerControl.addEventListener('input', function() {
    	panner.pan.value = this.value;
    }, false);
  };


  // GET USER MEDIA VIA AUDIO INPUT
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  }).then(handleSuccess);
