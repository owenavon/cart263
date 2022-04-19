  // Audio-Modio
  // Owen Avon

  // Application that allows the user to record their voice, modify the tones, view the visualization of the audio, and download the recording via .wav. Please see "Audio-Modio_Proposal-Owen_Avon.pdf" for further information.

  "use strict";

  const TWO_FIVE_SIX = 256;


  // This will be moved soon! - NEED TO MOVE TO APPROPRIATE FUNCTION
  const downloadRandomEffect = document.getElementById('download-random-effect'); // Assigns download-random-effect id to the downloadRandomEffect constant.
  const randomEffectPlayer = document.getElementById(`random-effect-player`); // Assigns visualizerPlayer variable to visualizer-player id.


  const helpButton = document.getElementById('help'); // Assigns help id to helpButton constant.
  const surpriseButton = document.getElementById('surprise'); // Assigns help id to surpriseButton constant.
  const player = document.getElementById('player'); // Assigns player id to player constant.
  const startButton = document.getElementById('start'); // Assigns start id to startButton constant.
  const stopButton = document.getElementById('stop'); // Assigns stop id to stopButton constant.
  const visualizerButton = document.getElementById('see-visualizer'); // Assigns see-visualizer id to visualizerButton constant.
  const downloadRaw = document.getElementById('download-raw'); // Assigns download-raw id to the downloadRaw constant.

  let sayInstruction = [
    `Say "I'm feeling lucky"`,
    `Say "I'm feeling lucky"`,
    `Say "I'm feeling lucky"`,
    `Have you said it yet?`
  ];

  let instruction = [
    `Welcome to`,
    `Audio Modio.`,
    `Modify the sound of your voice by using the sliders below.`,
  ];

  hideShowContentAtStart(); // Calls the hideContentFromStart function.

  // HIDE CONTENT FROM START FUNCTION
  function hideShowContentAtStart() {

    // Hide Content
    $(`#player`).hide(); // Hides the player id by default.
    $(`#download-raw`).hide(); // Hides the download-raw id by default.
    $(`#download-edit`).hide(); // Hides the download-edit id by default.
    $(`#stop`).hide(); // Hides the stop button by default.
    $(`#done-edit`).hide(); // Hides the done-edit button by default.
    $(`#see-visualizer`).hide(); // Hides the see-visualizer button by default.
    $(`#visualizer`).hide(); // Hides the visualizer content upon starting the program.
    $(`#visual-content`).hide(); // Hides the visual content.
    $(`#accordion`).hide(); // Hides the accordion by default.
    $(`#record-rectangle`).hide(); // Hides the record-rectangle by default.
    $(`#random-effect-modal`).hide(); // Hides the record-rectangle by default.
    $(`#surprise`).hide(); // Hides the surprise button by default.
    $(`#help`).hide(); // Hides the help button by default.

    // Show content
    $(`#start-stop-button`).text(`Press the "Start" button to record your voice.`); // Default displayed text
  }


  const handleSuccess = function(stream) { // Assigns the stream function to the handleSuccess constant.
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
    player.src = URL.createObjectURL(new Blob(recordedChunks)); // Assigns the recorded audio input src to player.

    downloadRaw.href = URL.createObjectURL(new Blob(recordedChunks)); // Gnerates audio doownload link.
    downloadRaw.download = 'Your_Recording.wav'; // Name the recording to testRecording.wav.


    // Test for random effect button download.
    randomEffectPlayer.src = URL.createObjectURL(new Blob(recordedChunks)); // Assigns the recorded audio input src to player.

    downloadRandomEffect.href = URL.createObjectURL(new Blob(recordedChunks)); // Gnerates audio doownload link.
    downloadRandomEffect.download = 'testRecording.wav'; // Name the recording to testRecording.wav.


    // FUNCTIONS CALLED INSIDE STOP BUTTON
    stopRecorderFlash(); // Calls the stopRecorderFlash rectangle.

    showHideContentAtStop(); // Calls the show hide conent after stop function.

    volumeSlider(); // Calls the volumeSlider function.
    panSlider(); // Calls the panSLider function.
    lowPassFilter(); // Calls the lowPassFilter function.
    highPassFilter(); // Calls the highPassFilter function.
  });


  // STOP RECORDER FLASH RECTANGLE
  function stopRecorderFlash() {
    setInterval(function() {
      $(`#record-rectangle`).remove(); // Removes the recording rectangle.
    });
  }


  // SHOW HIDE CONTENT AT STOP BUTTON PUSH
  function showHideContentAtStop() {
    // Displays content
    $(`#download-raw`).show(); // Shows the download-raw button once the recording has stopped.
    $(`#download-edit`).show(); // Shows the download-show button once the user says the modifications are complete.
    $(`#player`).show(); // Displays the player interface upon stopping the event listener.
    $(`#done-edit`).show(); // Displays the done-edit button.
    $(`#see-visualizer`).show(); // Displays the see-visualizer button.
    $(`#surprise`).show(); // Displays the surprise button.
    $(`#help`).show(); // Displays the help button.

    // Text strings
    $(`#press-play-text`).text(`Press the "Play" arrow to hear your recording.`); // Dynamically changes the html text upon clicking the start button.
    $(`#edit-recording`).text(`Edit your recording:`); // Default displayed text.
    $(`#extra`).text(`Extra functionality:`); // Default displayed text.

    // Hides buttons
    $(`#start-stop-record`).hide(); // Hides the start-stop-record text.
    $(`#start-stop-button`).hide(); // Hides the player interface upon stopping the event listener.
    $(`#start-stop-record`).hide(); // Hides the player interface upon stopping the event listener.
    $(`#stop`).hide(); // Hides the player interface upon stopping the event listener.
    $(`#start`).hide(); // Hides the player interface upon stopping the event listener.

    // Accordion UI
    $(`#accordion`).show(); // Shows the accordion.
    $(`#accordion`).accordion({
      collapsible: true, // Allows the user to collapse the accordion options.
      active: false // Starts the Accordion as completely collapsed.
    }); // Creates the accordion UI.
  }


  // SURPRISE BUTTON
  surpriseButton.addEventListener('click', function() { // Event listener that listens for button click.
    rotateMainContent(); // Calls the rotateMainContent function.
    surpriseInstructionVoice(); // Calls the instructionVoice function.
    feelingLuckyVoiceInput(); // Calls the feelingLuckyVoiceInput function.
  });


  // ROTATE MAIN-CONTENT
  function rotateMainContent() {
    $(document).ready(function () {
      AnimateRotate(360); // Animates an entire rotation.
    });

    function AnimateRotate(d) {
    let rotatedContent = $("#main-content");

    $({deg: 0}).animate({deg: d}, {
      duration: 6000, // Rotates 360 degrees over 7 seconds.
      step: function(rotateClick) { // Upon mouse click,
        rotatedContent.css({ // modifies the css value of id main-content.
          transform: "rotate(" + rotateClick + "deg)" // Transforms the the id by adding degree to every instance.
          });
        }
      });
    }
  }


  // HELP BUTTON
  helpButton.addEventListener('click', function() { // Event listener that listens for button click.
    instructionVoice(); // Calls the instructionVoice function.
  });


  // SAY INSTRUCTION VOICE FUNCTION
  function surpriseInstructionVoice() {

  let sayInstructionLength = sayInstruction.length; // Assigns instructionLength to the number of elements in an array.
    for (let i = 0; i < sayInstructionLength; i++) { // Creates a loop that calls all of the elements in the instruction array in order.
      responsiveVoice.speak(sayInstruction[i]); // ResponsiveVoice speaks the text in the instruction array.
    }
  }


  // INSTRUCTION VOICE FUNCTION
  function instructionVoice() {

  let instructionLength = instruction.length; // Assigns instructionLength to the number of elements in an array.
    for (let i = 0; i < instructionLength; i++) { // Creates a loop that calls all of the elements in the instruction array in order.
      responsiveVoice.speak(instruction[i]); // ResponsiveVoice speaks the text in the instruction array.
    }
  }


  // ANNYANG I'M FEELING LUCKY
  function feelingLuckyVoiceInput() {
    if (annyang) { // If annyang is listening, then...
      let commands = { // Defines commands.
        "I'm feeling lucky": function() {  // User speaks "hello".
        randomEffectModal(); // Calls the randomEffectModal function.
      }
    };
    annyang.addCommands(commands); // Add our commands to annyang.
    annyang.start(); // Annyang start listening.
    }
  }


  // PLAY AND DOWNLOAD EIDTED TRACK - NEED TO EDIT (DIALOG BOX)
  function randomEffectModal() {
    $(`#random-effect-modal`).dialog({
      modal: true,
      height: 400,
      width: 500,
      resizable: true
    });
  }


  // VOLUME SLIDER
  function volumeSlider() {
    $(`#volume-slider`).on(`change`, function(event) { // Change method is applied to allow different values to display.
    let volumeInput = $(this).val(); // volumeInput ID is set to val method.
    $(`#volume-level`).text(`Volume is set to: ${volumeInput}`); // text method is assigned to volume-level ID, so volume-input is dsiplayed when user moves slider.
  });

  let volume = document.querySelector("#volume-slider"); // Assigns volume variable to volume-slider ID.
    volume.addEventListener("change", function(e) { // Change function is applied to allow for volume minpulation
    (player).volume = e.currentTarget.value / 100; // Assigns the player constant streamed data to the volume-slider ID.
    console.log(recordedChunks);
    });
  }


  // PAN SLIDER
  let stereoPanner = new Pizzicato.Effects.StereoPanner({ // Assigns steroPanner to new Pizzicato effect
    pan: 0
  });

  function panSlider() {
    const playPanAudio = document.getElementById('play-pan-audio'); // Assigns start id to playPanAudio constant.
    playPanAudio.addEventListener('click', function() { // Event listener that listens for button click.

      let sawtoothWave = new Pizzicato.Sound({ // Creates a new Pizzicato sound.
        source: 'wave',
        volume: 0.3,
        attack: 0.3,
        options: {
        type: 'sawtooth'
        }
      });

      sawtoothWave.addEffect(stereoPanner); // Creates stereo panner effect.
      sawtoothWave.play(); // Plays the sawtooth effect.
      });

      $(`#panner`).on(`change`, function(event) { // Displays panner value upon click on slider.
      let pannerInput = $(this).val(); // Assigns pannerInput to dynamic value.
      $(`#pan-location`).text(`Panning is set to: ${pannerInput}`); // text method is assigned to pan-location ID, so panner is dsiplayed when the user moves the slider.

      stereoPanner.pan = parseFloat(pannerInput) // Converts pannerInput string value into a floating-point number for stereoPanner to pan dynamically.
    });
  }


  // LOW PASS FILTER - NEED TO EDIT
  function lowPassFilter() {
    $(`#low-pass-slider`).on(`change`, function(event) { // Change method is applied to allow different values to display.
      let lowPassInput = $(this).val(); // volumeInput ID is set to val method
      $(`#low-pass-location`).text(`Low-pass frequency is set to: ${lowPassInput}`); // Text method is assigned to low-pass-location ID, so low-pass-slider is displayed when the user moves the slider.
    });
  }


  // HIGH PASS FILTER - NEED TO EDIT
  function highPassFilter() {
  $(`#high-pass-slider`).on(`change`, function(event) { // Change method is applied to allow different values to display.
    let highPassInput = $(this).val(); // volumeInput ID is set to val method
      $(`#high-pass-location`).text(`High-pass frequency is set to: ${highPassInput}`); // Text method is assigned to high-pass-location ID, so high-pass-slider is displayed when user moves slider.
    });
  }


  // STOP RECORDING BUTTON
  stopButton.addEventListener('click', function() { // Event listener that listens for button click.
    mediaRecorder.stop(); // Stops audio input recording upon event listener button.
  });


  // START RECORDING BUTTON
  startButton.addEventListener('click', function() { // Event listener that listens for button click.
    mediaRecorder.start(); // Starts audio input recording upon event listener button.

    showHideContentAtStart(); // Calls the showHideContentAtStart function.
    startRecorderFlash(); // Calls the startRecorderFlash function.
  });


  function showHideContentAtStart() {
    // Displays content
    $(`#stop`).show(); // Shows the stop button once the user has started the recording.

    // Text strings
    $(`#start-stop-record`).text(`Press the "Stop" button to terminate the recording.`); // Dynamically changes the html text upon clicking the start button.

    // Hides buttons
    $(`#start`).hide(); // Hides the start button once the user has started the recording.
    $(`#start-stop-button`).hide(); // Hides the start-stop-button text.
  }


  function startRecorderFlash() {
    setInterval(function() {
      $(`#record-rectangle`).fadeToggle(1000); // Simulates html blink tag by flashing every 1 second
    });
  }


  // CALLS VISAUALIZER DIALOG BOX
  visualizerButton.addEventListener(`click`, function() {
    $(`#visualizer`).dialog({
      modal: true,
      height: 600,
      width: 700,
      resizable: false,
    });
    $(`#visual-content`).show(); // Displays the html content that builds the visualizer.

    soundVisualizer(); // Calls the soundVisualizer function.
  });


  function soundVisualizer() {
    // AUDIO VISUALIZER
    // https://codepen.io/nfj525/pen/rVBaab

    let visualizerPlayer = document.getElementById(`visualizer-player`); // Assigns visualizerPlayer variable to visualizer-player id.

    let context = new AudioContext(); // Assigns an audio processing graph to the varibale context.
    let srcAudio = context.createMediaElementSource(visualizerPlayer); // Assigns srcAudio to visualizerPlayer for audio to playblack in audio player.
    let analyser = context.createAnalyser(); //
    let canvas = document.getElementById(`canvas`); // Provides the visualizer with coordinates for viewport.
    let ctx = canvas.getContext("2d");

    visualizerPlayer.src = URL.createObjectURL(new Blob(recordedChunks)); // Assigns the recorded audio input src to visualizerPlayer.
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    srcAudio.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = TWO_FIVE_SIX; // Assigns...

    let bufferLength = analyser.frequencyBinCount; // Assigns bufferLength to frequencyBinCount as a read only property for the analyser node.
    console.log(`Buffer Length = ${bufferLength}`);

    let dataArray = new Uint8Array(bufferLength); // Assigns dataArray to special array of 8-bit unsigned integers.

    let WIDTH = canvas.width; // Assigns width variable to canvas.
    let HEIGHT = canvas.height; // Assigns height varibale to canvas.

    let barWidth = (WIDTH / bufferLength) * 2.5; // Sets the visual bar length width based off of 256 units.
    let barHeight; // Sets barHeight as undefined.
    let x = 0; // Assigns x position to zero (0).

      function renderFrame() {
        requestAnimationFrame(renderFrame); // Tells the browser to perform an animation, and uses renderFrame function as the callback.
        x = 0; // Assigns x position to zero (0).

        analyser.getByteFrequencyData(dataArray); // Copies the current frequency data into the passed unsigned byte array. If the array has fewer elements than the frequencyBinCount, the excess elements will be dropped.

        ctx.fillStyle = `#f5f5f5`; // Sets the canvas background to light grey.
        ctx.fillRect(0, 0, WIDTH, HEIGHT); // Necssary for bars to not overlap.

        for (let i = 0; i < bufferLength; i++) { // for loop to call bars.
          barHeight = dataArray[i];

          let r = barHeight + (25 * (i/bufferLength)); // Sets r to barHeight for high frequnecies.
          let g = 250 * (i/bufferLength); // Sets g to mid frequnecies.
          let b = 50; // Sets b to low frequnecies.

          ctx.fillStyle = `rgb(` + r + `,` + g + `,` + b + `)`; // Assigns rgb dynamic values to rgb string.
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight); // Draws the bar widths and heights?

          x += barWidth + 1; // Allows the bar width to increase in size with added frequency.
        }
      }

      // visualizerPlayer.play(); // Autoplays when visualizer dialog box opens.
      renderFrame(); // Calls renderFrame function to apply animations.
    }
  }; // Function Stream


  // GET USER MEDIA VIA AUDIO INPUT
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  }).then(handleSuccess);
