  // Audio-Modio
  // Owen Avon

  // Application that allows the user to record their voice, modify the tones, view the visualization of the audio, and download the recording via .wav. Please see "Audio-Modio_Proposal-Owen_Avon.pdf" for further information.

  "use strict";

  const TWO_FIVE_SIX = 256;


  // This will be moved soon! - NEED TO MOVE TO APPROPRIATE FUNCTION
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


    // FUNCTIONS CALLED INSIDE STOP BUTTON
    stopRecorderFlash(); // Calls the stopRecorderFlash rectangle.

    showHideContentAtStop(); // Calls the show hide conent after stop function.

    // Custom Filter sliders
    volumeSlider(); // Calls the volumeSlider function.
    panSlider(); // Calls the panSLider function.
    lowHighPassSlider(); // Calls the lowPassFilter function.
    pingPongSlider(); // Calls the pingPongSlider function.
    distortionSlider(); // Calls the distortionSlider function.
    ringModulatorSlider(); // Calls the ringModulatorSlider function.
    reverbSlider(); // Calls the reverbSlider function
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


  // HELP BUTTON
  helpButton.addEventListener('click', function() { // Event listener that listens for button click.
    instructionVoice(); // Calls the instructionVoice function.
  });


  // INSTRUCTION VOICE FUNCTION
  function instructionVoice() {

  let instructionLength = instruction.length; // Assigns instructionLength to the number of elements in an array.
    for (let i = 0; i < instructionLength; i++) { // Creates a loop that calls all of the elements in the instruction array in order.
      responsiveVoice.speak(instruction[i]); // ResponsiveVoice speaks the text in the instruction array.
    }
  }


  // SURPRISE BUTTON
  surpriseButton.addEventListener('click', function() { // Event listener that listens for button click.
    surpriseInstructionVoice(); // Calls the instructionVoice function.
    feelingLuckyVoiceInput(); // Calls the feelingLuckyVoiceInput function.
  });


  // SAY INSTRUCTION VOICE FUNCTION
  function surpriseInstructionVoice() {
  let sayInstructionLength = sayInstruction.length; // Assigns instructionLength to the number of elements in an array.
    for (let i = 0; i < sayInstructionLength; i++) { // Creates a loop that calls all of the elements in the instruction array in order.
      responsiveVoice.speak(sayInstruction[i]); // ResponsiveVoice speaks the text in the instruction array.
    }
  }


  // ANNYANG I'M FEELING LUCKY
  function feelingLuckyVoiceInput() {
    if (annyang) { // If annyang is listening, then...
      let commands = { // Defines commands.
        "test": function() {  // User speaks "hello".
        rotateMainContent(); // Calls the rotateMainContent function.
        randomEffectModal(); // Calls the randomEffectModal function.






      }
    };
    annyang.addCommands(commands); // Add our commands to annyang.
    annyang.start(); // Annyang start listening.
    }
  }


  // ROTATE MAIN-CONTENT
  function rotateMainContent() {
    $(document).ready(function () {
      AnimateRotate(360); // Animates an entire rotation.
    });

    function AnimateRotate(d) {
    let rotatedContent = $("#main-content").fadeOut(3000);

    $({deg: 0}).animate({deg: d}, {
      duration: 3000, // Rotates 360 degrees over 7 seconds.
      step: function(rotateClick) { // Upon mouse click,
        rotatedContent.css({ // modifies the css value of id main-content.
          transform: "rotate(" + rotateClick + "deg)" // Transforms the the id by adding degree to every instance.
          });
        }
      });
    }
  }


  // RANDOM EFFECT DIALOG BOX
  function randomEffectModal() {
    $(`#random-effect-modal`).dialog({
      modal: true,
      height: 500,
      width: 500,
      resizable: false,
      draggable: false,
      show: {
        effect: `fade`,
        duration: 3000 // Dialog box fades in over 3 seconds
      },
      hide: {
        effect: `fadeOut`,
        duration: 1000 // Dialog box fades in over 1.5 seconds
      },
      buttons: {
        "Close": function() { // Anonymous function that...
          $(this).dialog(`close`); // Creates a close button for the dialog box
          $("#main-content").fadeIn(1500); // Fades the main-content back in over 1.5 seconds
        }
      }
    });
  }



  // RANDOM DISTORTION EFFECT
  let distortion = new Pizzicato.Effects.Distortion({ // Assigns steroPanner to new Pizzicato effect
    gain: 0.3
  });

  function distortionSlider() {
    let yourDistortedAudio = new Pizzicato.Sound({
      source: 'file',
      options: {
      path: URL.createObjectURL(new Blob(recordedChunks)) }
      });

      let playDistortedAudio = document.getElementById('play-distorted-audio'); // Assigns start id to playDistortedAudio variable.
      let pauseDistortedAudio = document.getElementById('pause-distorted-audio'); // Assigns start id to pauseDistortedAudio variable.

      playDistortedAudio.addEventListener('click', function() { // Event listener that listens for button click.
        yourDistortedAudio.play(); // Plays the recorded src.

        pauseDistortedAudio.addEventListener('click', function() { // Event listener that listens for button click.
          yourDistortedAudio.stop(); // Stops the recorded src.
        });

        yourDistortedAudio.addEffect(distortion); // Creates stereo panner effect.
      });

      $(`#distortion-gain`).on(`change`, function(event) { // Displays panner value upon click on slider.
      let distortedAudio = $(this).val(); // Assigns pannerInput to dynamic value.
      $(`#distortion-gain-location`).text(`Distortion is set to: ${distortedAudio}`); // text method is assigned to pan-location ID, so panner is dsiplayed when the user moves the slider.

      distortion.gain = parseFloat(distortedAudio) // Converts pannerInput string value into a floating-point number for stereoPanner to pan dynamically.
    });
  }


  //---------------------------------------------------------------------//


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
  let yourPanAudio = new Pizzicato.Sound({
    source: 'file',
    options: {
    path: URL.createObjectURL(new Blob(recordedChunks)) }
  });

  let playPanAudio = document.getElementById('play-pan-audio'); // Assigns start id to playPanAudio variable.
  let pausePanAudio = document.getElementById('pause-pan-audio'); // Assigns start id to pausePanAudio variable.

    playPanAudio.addEventListener('click', function() { // Event listener that listens for button click.
    yourPanAudio.play(); // Plays the recorded src.

      pausePanAudio.addEventListener('click', function() { // Event listener that listens for button click.
        yourPanAudio.stop(); // Stops the recorded src.
      });

      yourPanAudio.addEffect(stereoPanner); // Creates stereo panner effect.
    });

    $(`#panner`).on(`change`, function(event) { // Displays panner value upon click on slider.
      let pannerInput = $(this).val(); // Assigns pannerInput to dynamic value.
      $(`#pan-location`).text(`Panning is set to: ${pannerInput}`); // text method is assigned to pan-location ID, so panner is dsiplayed when the user moves the slider.

    stereoPanner.pan = parseFloat(pannerInput) // Converts pannerInput string value into a floating-point number for stereoPanner to pan dynamically.
    });
  }


  // LOW PASS FILTER
  let lowPassFilter = new Pizzicato.Effects.LowPassFilter({ // Assigns steroPanner to new Pizzicato effect
    frequency: 400,
	  peak: 10
  });

  // HIGH PASS FILTER
  let highPassFilter = new Pizzicato.Effects.HighPassFilter({
    frequency: 120,
    peak: 10
  });

  function lowHighPassSlider() {
  let yourLowHighAudio = new Pizzicato.Sound({ // Creates a new Pizzicato sound.
    source: 'file',
    options: {
    path: URL.createObjectURL(new Blob(recordedChunks)) }
  });

  let playLowHighAudio = document.getElementById('play-low-high-audio'); // Assigns start id to playLowHighAudio constant.
  let pauseLowHighAudio = document.getElementById('pause-low-high-audio'); // Assigns start id to playLowHighAudio constant.

    playLowHighAudio.addEventListener('click', function() { // Event listener that listens for button click.
      yourLowHighAudio.play(); // Plays the audio recording.

    pauseLowHighAudio.addEventListener('click', function() { // Event listener that listens for button click.
      yourLowHighAudio.stop(); // Stops the audio recording.
    });

      yourLowHighAudio.addEffect(lowPassFilter); // Creates low Pass Filter effect.
      yourLowHighAudio.addEffect(highPassFilter); // Creates High Pass Filter effect.
    });

    $(`#low-pass-slider`).on(`change`, function(event) { // Displays panner value upon click on slider.
    let lowPassInput = $(this).val(); // Assigns pannerInput to dynamic value.
    $(`#low-pass-location`).text(`Low-pass frequency is set to: ${lowPassInput}`); // text method is assigned to pan-location ID, so panner is dsiplayed when the user moves the slider.

    lowPassFilter.frequency = parseFloat(lowPassInput) // Converts pannerInput string value into a floating-point number for stereoPanner to pan dynamically.
    lowPassFilter.peak = parseFloat(lowPassInput) // Converts pannerInput string value into a floating-point number for stereoPanner to pan dynamically.
    });

    $(`#high-pass-slider`).on(`change`, function(event) { // Displays panner value upon click on slider.
    let highPassInput = $(this).val(); // Assigns pannerInput to dynamic value.
    $(`#high-pass-location`).text(`High-pass frequency is set to: ${highPassInput}`); // text method is assigned to pan-location ID, so panner is dsiplayed when the user moves the slider.

      highPassFilter.frequency = parseFloat(highPassInput) // Converts lowPassInput string value into a floating-point number for lowPassFilter effect.
      highPassFilter.peak = parseFloat(highPassInput) // Converts highPassInput string value into a floating-point number for highPassFilter effect.
    });
  }


  // PING PONG DELAY
  let pingPongDelay = new Pizzicato.Effects.PingPongDelay({ // Assigns steroPanner to new Pizzicato effect
    feedback: 0.3,
    time: 0.3,
    mix: 0.3
  });

  function pingPongSlider() {
  let yourPingPongAudio = new Pizzicato.Sound({
    source: 'file',
    options: {
    path: URL.createObjectURL(new Blob(recordedChunks)) }
    });

    let playPingPongAudio = document.getElementById('play-ping-pong-audio'); // Assigns start id to playPanAudio variable.
    let pausePingPongAudio = document.getElementById('pause-ping-pong-audio'); // Assigns start id to pausePanAudio variable.

    playPingPongAudio.addEventListener('click', function() { // Event listener that listens for button click.
      yourPingPongAudio.play(); // Plays the recorded src.

        pausePingPongAudio.addEventListener('click', function() { // Event listener that listens for button click.
          yourPingPongAudio.stop(); // Stops the recorded src.
        });

      yourPingPongAudio.addEffect(pingPongDelay); // Creates pingPongDelay effect.
    });

    $(`#ping-pong-delay-feedback`).on(`change`, function(event) { // Displays panner value upon click on slider.
    let delayFeedback = $(this).val(); // Assigns delayFeedback to dynamic value.
    $(`#ping-pong-delay-feedback-location`).text(`Delay Feedback is set to: ${delayFeedback}`); // text method is assigned to ping-pong-delay-feedback-location ID, so feedback is dsiplayed when the user moves the slider.

    pingPongDelay.feedback = parseFloat(delayFeedback) // Converts delayFeedback string value into a floating-point number for pingPongDelay effect.
    });

    $(`#ping-pong-delay-time`).on(`change`, function(event) { // Displays panner value upon click on slider.
    let delayTime = $(this).val(); // Assigns delayFeedback to dynamic value.
    $(`#ping-pong-delay-time-location`).text(`Delay Time is set to: ${delayTime}`); // text method is assigned to ping-pong-delay-feedback-location ID, so feedback is dsiplayed when the user moves the slider.

    pingPongDelay.time = parseFloat(delayTime) // Converts delayFeedback string value into a floating-point number for pingPongDelay effect.
    });

    $(`#ping-pong-delay-mix`).on(`change`, function(event) { // Displays panner value upon click on slider.
    let delayMix = $(this).val(); // Assigns delayFeedback to dynamic value.
    $(`#ping-pong-delay-mix-location`).text(`Delay Mix is set to: ${delayMix}`); // text method is assigned to ping-pong-delay-feedback-location ID, so feedback is dsiplayed when the user moves the slider.

    pingPongDelay.mix = parseFloat(delayMix) // Converts delayFeedback string value into a floating-point number for pingPongDelay effect.
    });
  }


  // RING MOULATOR
  let ringModulator = new Pizzicato.Effects.RingModulator({ // Assigns steroPanner to new Pizzicato effect
    speed: 30,
    distortion: 1,
    mix: 0.5
  });

  function ringModulatorSlider() {
  let yourModulatedAudio = new Pizzicato.Sound({
    source: 'file',
    options: {
    path: URL.createObjectURL(new Blob(recordedChunks)) }
    });

    let playRingModulatedAudio = document.getElementById('play-ring-modulated-audio'); // Assigns start id to playPanAudio variable.
    let pauseRingModulatedAudio = document.getElementById('pause-ring-modulated-audio'); // Assigns start id to pausePanAudio variable.

    playRingModulatedAudio.addEventListener('click', function() { // Event listener that listens for button click.
      yourModulatedAudio.play(); // Plays the recorded src.

      pauseRingModulatedAudio.addEventListener('click', function() { // Event listener that listens for button click.
        yourModulatedAudio.stop(); // Stops the recorded src.
      });

      yourModulatedAudio.addEffect(ringModulator); // Creates ringModulator effect.
    });

    $(`#ringmodulated-speed`).on(`change`, function(event) { // Displays panner value upon click on slider.
    let modulatedSpeed = $(this).val(); // Assigns delayFeedback to dynamic value.
    $(`#ringmodulated-speed-location`).text(`Speed is set to: ${modulatedSpeed}`); // text method is assigned to ping-pong-delay-feedback-location ID, so feedback is dsiplayed when the user moves the slider.

    ringModulator.speed = parseFloat(modulatedSpeed) // Converts delayFeedback string value into a floating-point number for pingPongDelay effect.
    });

    $(`#ringmodulated-distortion`).on(`change`, function(event) { // Displays panner value upon click on slider.
    let modulatedDistortion = $(this).val(); // Assigns delayFeedback to dynamic value.
    $(`#ringmodulated-distortion-location`).text(`Distortion is set to: ${modulatedDistortion}`); // text method is assigned to ping-pong-delay-feedback-location ID, so feedback is dsiplayed when the user moves the slider.

      ringModulator.distortion = parseFloat(modulatedDistortion) // Converts delayFeedback string value into a floating-point number for pingPongDelay effect.
    });

    $(`#ringmodulated-mix`).on(`change`, function(event) { // Displays panner value upon click on slider.
    let modulatedMix = $(this).val(); // Assigns delayFeedback to dynamic value.
    $(`#ringmodulated-mix-location`).text(`Mix is set to: ${modulatedMix}`); // text method is assigned to ping-pong-delay-feedback-location ID, so feedback is dsiplayed when the user moves the slider.

      ringModulator.mix = parseFloat(modulatedMix) // Converts delayFeedback string value into a floating-point number for pingPongDelay effect.
    });
  }


  // REVERB
  let reverb = new Pizzicato.Effects.Reverb({ // Assigns steroPanner to new Pizzicato effect
    speed: 0.5,
    decay: 0.5,
    reverse: false,
    mix: 0.5
  });

  function reverbSlider() {
  let yourReverbAudio = new Pizzicato.Sound({
    source: 'file',
    options: {
    path: URL.createObjectURL(new Blob(recordedChunks)) }
  });

  let playReverbAudio = document.getElementById('play-reverb-audio'); // Assigns start id to playReverbAudio variable.
  let pauseReverbAudio = document.getElementById('pause-reverb-audio'); // Assigns start id to pauseReverbAudio variable.

    playReverbAudio.addEventListener('click', function() { // Event listener that listens for button click.
      yourReverbAudio.play(); // Plays the recorded src.

      pauseReverbAudio.addEventListener('click', function() { // Event listener that listens for button click.
        yourReverbAudio.stop(); // Stops the recorded src.
      });

      yourReverbAudio.addEffect(reverb); // Creates reverb effect.
    });

    $(`#reverb-time`).on(`change`, function(event) { // Displays panner value upon click on slider.
    let reverbSpeed = $(this).val(); // Assigns delayFeedback to dynamic value.
    $(`#reverb-time-location`).text(`Time is set to: ${reverbSpeed}`); // text method is assigned to ping-pong-delay-feedback-location ID, so feedback is dsiplayed when the user moves the slider.

    reverb.speed = parseFloat(reverbSpeed) // Converts delayFeedback string value into a floating-point number for pingPongDelay effect.
    });

    $(`#reverb-decay`).on(`change`, function(event) { // Displays panner value upon click on slider.
    let reverbDecay = $(this).val(); // Assigns delayFeedback to dynamic value.
    $(`#reverb-decay-location`).text(`Decay is set to: ${reverbDecay}`); // text method is assigned to ping-pong-delay-feedback-location ID, so feedback is dsiplayed when the user moves the slider.

    reverb.decay = parseFloat(reverbDecay) // Converts delayFeedback string value into a floating-point number for pingPongDelay effect.
    });

    $(`#reverb-mix`).on(`change`, function(event) { // Displays panner value upon click on slider.
    let reverbMix = $(this).val(); // Assigns delayFeedback to dynamic value.
    $(`#reverb-mix-location`).text(`Mix is set to: ${reverbMix}`); // text method is assigned to ping-pong-delay-feedback-location ID, so feedback is dsiplayed when the user moves the slider.

    reverb.mix = parseFloat(reverbMix) // Converts delayFeedback string value into a floating-point number for pingPongDelay effect.
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


  // HIDDEN AND SHOWN CONTENT AT THE START
  function showHideContentAtStart() {
    // Displays content
    $(`#stop`).show(); // Shows the stop button once the user has started the recording.

    // Text strings
    $(`#start-stop-record`).text(`Press the "Stop" button to terminate the recording.`); // Dynamically changes the html text upon clicking the start button.

    // Hides buttons
    $(`#start`).hide(); // Hides the start button once the user has started the recording.
    $(`#start-stop-button`).hide(); // Hides the start-stop-button text.
  }


  // RECORDING ANIMATION
  function startRecorderFlash() {
    setInterval(function() {
      $(`#record-rectangle`).fadeToggle(1000); // Simulates html blink tag by flashing every 1 second
    });
  }


  // CALLS VISAUALIZER DIALOG BOX
  visualizerButton.addEventListener(`click`, function() {
    $(`#visualizer`).dialog({
      modal: true,
      height: 750,
      width: 700,
      resizable: false,
      draggable: false,
      show: {
        effect: `fadeIn`,
        duration: 1000 // Dialog box fades in over 1.5 seconds
      },
      hide: {
        effect: `fadeOut`,
        duration: 1000 // Dialog box fades in over 1.5 seconds
      },
      buttons: {
        "Close": function() { // Anonymous function that...
          $(this).dialog(`close`); // Creates a close button for the dialog box
        }
      }
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
