/* global webaudio_tooling_obj, audio_ctx, source_audio, oscMp3, osc_source, osc_type, micro_b, microphone_stream, script_processor_fft_node, requestAnimId, ondes_draw_fx, barres_draw_fx, Oscilloscope, BUFF_SIZE */

function play_fx() {
    if (!caToune_b) {
        caToune_b = true;
        document.querySelector('#cb_generator').checked = caToune_b;
        updateGenerator();

        console.log('START OSC');
        //
        osc_source.start();

        Oscilloscope.start();
    }
}

function stop_fx() {
    stopsirene();

    caToune_b = false;
    document.querySelector('#cb_generator').checked = caToune_b;
    try {
        osc_source.stop();
        console.log('STOP OSC');
    } catch (e) {
        console.log('echec STOP OSC');
    }


    Oscilloscope.stop();
}


/**
 * 
 * Mise à jour de la fréquence et du volume de l'oscill@or
 * 
 * @returns {undefined}
 */
function updateGenerator() {
    console.log('range_vol.value ' + range_vol.value);
    initGenerator(getRangeFreq(), parseFloat(range_vol.value));
}


/**
 * 
 * Récupère la fréquence des deux ranges.
 * 
 * @returns {jQuery|Number} : la somme des deux range (centaines et unités)
 */
function getRangeFreq() {
    //    var v1 = 1*$('#range_fineFreq').val();
    //    var v2 = 1*$('#range_frequence').val(); 
    //    var v = v1 + v2;
    //    console.log('v1 : v2 :: ' + v1 + " : " + v2 + " => " + v);
    return (1 * range_frequence.value); // + 1 * range_fineFreq * Math.pow(2, range_fois.value * 1));
}

window.addEventListener('mousemove', initAudio);

function initAudio() {
    // Volume


    window.removeEventListener('mousemove', initAudio);
}


function initGenerator(_freq, _vol) {
    //_freq = (typeof _freq !== 'undefined') ? _freq : 432;
    if (!_freq) {
        _freq = 432;
    }
    //    _vol = (typeof _vol !== 'undefined') ? _vol : 0.01;

    if (!gain_node) {
        gain_node = audio_ctx.createGain();
    }
    gain_node.gain.value = _vol; // from 0 to 1, 1 full volume, 0 is muted
    gain_node.connect(audio_ctx.destination); // connect vol to context destination

    // Stereo panner
    panNode = audio_ctx.createStereoPanner();
    // G <-> D
    panNode.connect(gain_node);

    // pour la visualisation
    analyser = audio_ctx.createAnalyser();
    analyser.fftSize = BUFF_SIZE;

    analyser.smoothingTimeConstant = 0.3;
    // Rend l'affichage moins 'frénésique' (mais plus lent... (0 = à fond), max 1.)

    // stockage des infos 
    bufferLength = analyser.frequencyBinCount;
    frequencyBins = new Uint8Array(analyser.frequencyBinCount);
    analyser.connect(panNode);


    // l'oscillateur
    if (oscMp3 === "OSC") {
        osc_source = audio_ctx.createOscillator();
        osc_source.type = osc_type; // ::: sine, square, sawtooth, triangle
        osc_source.frequency.value = range_frequence.value; // Hz
        osc_source.connect(analyser);
    }

    // //Microphone
    // if (micro_b && oscMp3 === "microphone") {

    //     if (!navigator.getUserMedia)
    //         navigator.getUserMedia = navigator.getUserMedia ||
    //             navigator.webkitGetUserMedia ||
    //             navigator.mozGetUserMedia ||
    //             navigator.msGetUserMedia;


    //     if (navigator.getUserMedia) {

    //         navigator.getUserMedia(
    //             {
    //                 audio: true,
    //                 video: false
    //             },
    //             function (stream) {
    //                 start_microphone(stream);
    //                 $('.stopMicro').on('click', function () {
    //                     stopStream(stream);
    //                 });
    //                 //                document.getElementById('stopVideo').addEventListener('click', function () {
    //                 //                    stopStream(stream);
    //                 //                });
    //             },
    //             function (err) {
    //                 // Log the error to the console.
    //                 console.log('Pbm activation microphone : ' + err);
    //             }
    //         );

    //         function stopStream(stream) {
    //             console.log('stop audio');
    //             stream.getAudioTracks().forEach(function (track) {
    //                 track.stop();
    //             });
    //         }

    //     } else {
    //         alert("getUserMedia n'est pas supporté.");
    //     }

    // }

    // filter = audio_ctx.createBiquadFilter();
    // filter.type = "highpass";
    // filter.frequency.value = 0.0001;
    // filter.connect(panNode);
}