  // Audio Modio
  // Owen Avon

  // Prototype that displays the potential of modifying a users voice with the api tuna.

  "use strict";

  const downloadRaw = document.getElementById('download-raw'); // Assigns download-raw id to the downloadRaw constant.
  const downloadEdit = document.getElementById('download-edit'); // Assigns download-raw id to the downloadRaw constant.
  const player = document.getElementById('player'); // Assigns player id to player constant.
  const startButton = document.getElementById('start'); // Assigns start id to startButton constant.
  const stopButton = document.getElementById('stop'); // Assigns stop id to stopButton constant.
  const visualizerButton = document.getElementById('see-visualizer'); // Assigns see-visualizer id to visualizerButton constant.


  $(`#player`).hide(); // Hides the player id by default.
  $(`#download-raw`).hide(); // Hides the download-raw id by default.
  $(`#download-edit`).hide(); // Hides the download-edit id by default.
  $(`#stop`).hide(); // Hides the stop button by default.
  $(`#done-edit`).hide(); // Hides the done-edit button by default.
  $(`#see-visualizer`).hide(); // Hides the see-visualizer button by default.
  $(`#visualizer`).hide(); // Hides the visualizer content upon starting the program.
  $(`.master-controls`).hide(); // Hides the master editable sliders by default.
  $(`#visual-content`).hide(); // Hides the visual content.
  $(`#accordion`).hide(); // Hides the accordion by default.
  $(`#record-rectangle`).hide(); // Hides the record-rectangle by default.

  $(`#start-stop-button`).text(`Press the "Start" button to record your voice.`); // Default displayed text


  // Assigns the stream function to the handleSuccess constant.
  const handleSuccess = function(stream) {
    const options = {
      mimeType: 'audio/webm'
    };
    const recordedChunks = []; // Creates an empty array called recorded chunks.
    const mediaRecorder = new MediaRecorder(stream, options); // Assigns the MediaRecorder class to the mediaRecorder constant.


    // DATA_AVAILABLE METHOD
    mediaRecorder.addEventListener('dataavailable', function(e) { // dataavailable fires when mediaRecorder delivers media.
      if (e.data.size > 0) recordedChunks.push(e.data);
    });


    // EVENT lISTENER UPON STOP BUTTON
    mediaRecorder.addEventListener('stop', function() { // Defines actions that happen upon cliking on the stop button
      player.src = URL.createObjectURL(new Blob(recordedChunks)); // Assigns the recorded audio src to player.

      downloadRaw.href = URL.createObjectURL(new Blob(recordedChunks)); // Gnerates audio doownload link.
      downloadRaw.download = 'testRecording.wav'; // Name the recording to testRecording.wav.

      // Displays content
      $("#download-raw").show(); // Shows the download-raw button once the recording has stopped.
      $("#download-edit").show(); // Shows the download-show button once the user says the modifications are complete.
      $("#player").show(); // Displays the player interface upon stopping the event litener.
      $(".master-controls").show(); // Shows the master editable sliders by default.
      $("#done-edit").show(); // Displays the done-edit button.
      $("#see-visualizer").show(); // Displays the see-visualizer button.

      // Text strings
      $("#edit-recording").text(`Edit your recording (not yet functional):`); // Default displayed text.
      $("#press-play-text").text(`Press the "Play" arrow to hear your recording.`); // Dynamically changes the html text upon clicking the start button.

      // Hides buttons
      $("#start-stop-record").hide(); // Hides the start-stop-record text.
      $("#start-stop-button").hide(); // Hides the player interface upon stopping the event litener.
      $("#start-stop-record").hide(); // Hides the player interface upon stopping the event litener.
      $("#stop").hide(); // Hides the player interface upon stopping the event litener.
      $("#start").hide(); // Hides the player interface upon stopping the event litener.

      // Accordion UI
      $("#accordion").show(); // Shows the accordion.
      $(`#accordion`).accordion(); // Creates the accordion UI.

      // Removes the setInterval
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

      // Displays content
      $("#stop").show(); // Shows the stop button once the user has started the recording.

      // Text strings
      $("#start-stop-record").text(`Press the "Stop" button to terminate the recording.`); // Dynamically changes the html text upon clicking the start button.

      // Hides buttons
      $("#start").hide(); // Hides the start button once the user has started the recording.
      $("#start-stop-button").hide(); // Hides the start-stop-button text.

      // Simulates html blink tag
      setInterval(function() {
        $(`#record-rectangle`).fadeToggle(1000);
      });
    });


    // CALLS DIALOG BOX
    visualizerButton.addEventListener(`click`, function() {
      $(`#visualizer`).dialog();
      $("#visual-content").show(); // Displays the html content that builds the visualizer.


    // SEE VISUALIZER (Current code will be heavily modified, and is only to show intention)
    // https://codepen.io/nfj525/pen/rVBaab

    let file = document.getElementById("thefile");
    let audio = document.getElementById("audio");

    file.onchange = function() {
      let files = this.files;
      audio.src = URL.createObjectURL(files[0]);
      audio.load();
      audio.play();
      let context = new AudioContext();
      let src = context.createMediaElementSource(audio);
      let analyser = context.createAnalyser();

      let canvas = document.getElementById("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      let ctx = canvas.getContext("2d");

      src.connect(analyser);
      analyser.connect(context.destination);

      analyser.fftSize = 256;

      let bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);

      let dataArray = new Uint8Array(bufferLength);

      let WIDTH = canvas.width;
      let HEIGHT = 300;

      let barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      function renderFrame() {
        requestAnimationFrame(renderFrame);
        x = 0;

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];

          let r = barHeight + (25 * (i/bufferLength));
          let g = 250 * (i/bufferLength);
          let b = 50;

            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;
          }
        }

        audio.play();
        renderFrame();
      };
    });


    // Curenlty does not connect to src getUserMedia();
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
