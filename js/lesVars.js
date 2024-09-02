
let canvas;
let visu_ctx;
let WIDTH, HEIGHT;
let marge = 20;

let isPlaying = false;
let filter;
let player, proBar, source_audio;
let audio_ctx, osc_source;
let gain_node = null;
let osc_type = 'sine';
let analyser;
let panNode;
let ms_down_b = false;
let caToune_b = false;
let frequencyBins;
let bufferLength;
let localStream;

let BUFF_SIZE = 2048; //16384; //2048;

let microphone_stream = null;

let script_processor_node = null;
let script_processor_fft_node = null;
let analyserNode = null;
// 
// Valeur de départ.
// 
// micro allumer ou éteind.
let micro_b = true;
//
// osc mp3
let oscMp3 = "OSC"; // 
//
// graph
let requestAnimId = "ondes_draw_fx";

