let Oscilloscope = function() {};

// variable de class
Oscilloscope.typeGraphe = "ondes_draw_fx";
Oscilloscope.nbPassage = 0;
Oscilloscope.caTourne = false;
Oscilloscope.freq = 0;

/**
 * 
 * @returns {undefined}
 */
Oscilloscope.init = function() {
    visu_ctx.lineWidth = 1;
    visu_ctx.strokeStyle = 'rgb(0, 0, 0)';
    visu_ctx.font = "30px Verdana";
};

Oscilloscope.start = function() {
    // if (Oscilloscope.typeGraphe === "ondes_draw_fx") {
    requestAnimationFrame(Oscilloscope.ondes_draw_fx);
    // } else {
    //     requestAnimationFrame(Oscilloscope.barres_draw_fx);
    // }
    Oscilloscope.caTourne = true;
};

Oscilloscope.stop = function() {
    console.log("stop Oscillo");

    cancelAnimationFrame(Oscilloscope.ondes_draw_fx);

    Oscilloscope.caTourne = false;

    visu_ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/* global visu_ctx, canvas, analyser, HEIGHT, frequencyBins, WIDTH, marge, requestAnimId, bufferLength */

Oscilloscope.barres_draw_fx = function() {
    var hz = 0;

    /**
     * 
     * @param {type} v : valeur pour la couleur
     * @param {type} max : la valeur max de v.
     * @param {type} a : alpha.
     * @returns {String}
     */
    function colorHSL(v, max, a) {
        if (!max) {
            max = frequencyBins.length;
        }
        if (!a) {
            a = 0.6;
        }
        return "hsla(" + Math.round(-(v / max) * 359 + 360) + ", 100%, 60%, " + a + ")";
    }

    visu_ctx.clearRect(0, 0, canvas.width, canvas.height);


    // pour la freq
    var frequence_ref = new Float32Array(frequencyBins);
    analyser.getFloatFrequencyData(frequence_ref);
    var frequence = calculateHertz(frequence_ref);

    // pour la visu
    analyser.getByteTimeDomainData(frequencyBins);

    for (var i = 0; i < frequencyBins.length; i++) {
        var v = frequencyBins[i];
        hz += v;
        var h = HEIGHT * (v / 255);
        var w = WIDTH / (frequencyBins.length * 2);
        var w2 = WIDTH / frequencyBins.length;

        visu_ctx.fillStyle = colorHSL(i);
        visu_ctx.fillRect(i * w2, HEIGHT + marge, w, -h);
    }


    Oscilloscope.nbPassage++;
    if (Oscilloscope.nbPassage > 100) {
        Oscilloscope.freq = hz; //Math.round(hz / bufferLength); 
        Oscilloscope.nbPassage = 0;
    }

    Oscilloscope.nbPassage++;
    if (Oscilloscope.nbPassage > 10) {
        Oscilloscope.freq = Math.round(frequence * 2); //hz; //Math.round(hz / bufferLength); 
        Oscilloscope.nbPassage = 0;
    }

    // Affichage Feq
    //visu_ctx.beginPath();   
    visu_ctx.fillStyle = "rgba(255,255,255,0.8)";
    visu_ctx.fillRect(canvas.width - 70, 8, canvas.width - 8, 20);
    visu_ctx.fillStyle = "#000000";
    visu_ctx.fillText(Oscilloscope.freq + " Hz ", canvas.width - 64, 22);
    visu_ctx.fillStyle = "#880000";
    visu_ctx.fillText(noteFromPitch(Oscilloscope.freq), canvas.width - 18, 22);




    if (Oscilloscope.typeGraphe === "barres_draw_fx") {
        if (Oscilloscope.caTourne) {
            requestAnimationFrame(Oscilloscope.barres_draw_fx);
        } else {
            cancelAnimationFrame(Oscilloscope.barres_draw_fx);
        }
    }
};

/**
 * 
 * Dessine une onde style Oscilloscopescope.
 * 
 * @returns {undefined}
 */
Oscilloscope.ondes_draw_fx = function() {
    // console.log('ondes_draw_fx');
    //analyser.getByteFrequencyData(frequencyBins);

    // pour la freq
    var frequence_ref = new Float32Array(frequencyBins);
    analyser.getFloatFrequencyData(frequence_ref);
    // var frequence = calculateHertz(frequence_ref);

    // pour la visu
    analyser.getByteTimeDomainData(frequencyBins);

    // raz
    visu_ctx.clearRect(0, 0, canvas.width, canvas.height);


    //console.log('bufferLength : ' + bufferLength);
    // !!!!
    var sliceWidth = WIDTH / bufferLength;
    var x = 0;

    visu_ctx.beginPath();
    for (var i = 0; i < bufferLength; i++) {
        var v = frequencyBins[i] / 128.0;
        var y = v * HEIGHT / 2 + marge / 2;

        if (!i) {
            visu_ctx.moveTo(x, y);
        } else {
            visu_ctx.lineTo(x, y);
        }
        x += sliceWidth;
    }
    visu_ctx.stroke();


    Oscilloscope.nbPassage++;
    if (Oscilloscope.nbPassage > 10) {
        Oscilloscope.freq = 10; // Math.round(frequence * 2); //hz; //Math.round(hz / bufferLength); 
        Oscilloscope.nbPassage = 0;
    }


    // on boucle sur cette même fx.
    if (Oscilloscope.typeGraphe === "ondes_draw_fx") {
        if (Oscilloscope.caTourne) {

            requestAnimationFrame(Oscilloscope.ondes_draw_fx);
        } else {
            cancelAnimationFrame(Oscilloscope.ondes_draw_fx);
        }
    }
};