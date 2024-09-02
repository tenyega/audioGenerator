let multipilcateur = 1;
let volume = 1;
let pan = 0.3;


let arr = [];
for (let i = 750; i < 1000; i += 15) {
    arr.push(i); //Math.round(Math.random() * 3000) + 60);
}
for (let i = 1000; i > 750; i -= 10) {
    arr.push(i); //Math.round(Math.random() * 3000) + 60);
}
// console.log(arr);

let timerId;
let compteursirene = 0;

function sirene() {
    timerId = setInterval(function() {

        osc_source.frequency.value = arr[compteursirene++];

        range_frequence.nextSibling.innerHTML = osc_source.frequency.value + "Hz";
        if (compteursirene == arr.length) {
            compteursirene = 0;
        }

    }, 10)

}

function stopsirene() {
    clearInterval(timerId);
    osc_source.frequency.value = range_frequence.value;
}

/**
 * 
 * On change le type d'onde.
 * Si c'est en cours de lecture, on arrete, on change, et on remet en route.
 * 
 * @param {type} val : le type d'ondes choisie ::: sine, square, sawtooth, triangle
 * @returns {undefined}
 */
function osc_type_fx(val) {
    var caTournait = false;

    if (caToune_b) {
        stop_fx();
        caTournait = true;
    }
    osc_type = val;

    if (caTournait) {
        play_fx();
    }
}