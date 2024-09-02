let range_frequence;
let range_vol;

// http://www.softfluent.fr/blog/expertise/2015/04/28/Enregistrer-du-son-via-le-Microphone-en-JavaScript
function range_vol_fx(leRange) {
    leRange.nextSibling.innerHTML = leRange.value;
    volume = parseFloat(leRange.value);
    gain_node.gain.value = volume;
}

function range_frequence_fx(leRange) {
    leRange.nextSibling.innerHTML = leRange.value + "Hz";
    osc_source.frequency.value = leRange.value;
}

//
// Initialisation des variables et mise en place des écouteurs.
//
window.onload = function() {

    let rangeObj = document.querySelector('#rangeObj')

    //  constructor(libelle, name, parentObj, value, min, max, step) {

    let rrr = new Range("Volume", 'volume', rangeObj, 0.1, 0, 1, 0.1);
    rrr._innerHTML();
    rrr.rangeEvent(range_vol_fx, rrr.baliseObj);

    range_vol = rrr.baliseObj;

    let rrr2 = new Range("Fréquence", 'frequence', rangeObj, 500, 50, 20000, 10);
    rrr2._innerHTML();
    rrr2.rangeEvent(range_frequence_fx, rrr2.baliseObj);

    range_frequence = rrr2.baliseObj;

    audio_ctx = new(window.AudioContext || window.webkitAudioContext)();
    // image
    canvas = document.getElementById("canvas");
    WIDTH = canvas.width;
    HEIGHT = canvas.height - marge;
    visu_ctx = canvas.getContext("2d");

    // audio pour les différents navigateurs
    if (!audio_ctx) {
        audio_ctx = new(window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.msAudioContext)();
    }

    //
    // getUserMedia (pour le micro)
    //
    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    // pour l'oscillateur et le MP3 
    initGenerator(getRangeFreq(), 0.1); //range_vol.value); //432, 0.1);

    // pour l'animation
    // requestAnimationFrame(ondes_draw_fx);


};

// fin de $('document').ready...