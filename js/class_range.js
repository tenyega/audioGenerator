class Range {

    constructor(libelle, name, parentObj, value, min, max, step) {
        this.html = "";
        this.libelle = libelle;

        this.min = min;
        this.max = max;
        this.value = value;
        this.step = step;
        this.name = name;
        this.parentObj = parentObj;
        this.baliseObj;
        this.actif_b = false;

    }

    _innerHTML() {
        this.html += "<p>";

        this.html += "<label>" + this.libelle + "</label>";

        this.html += "<input type='range' min='" + this.min + "' max='"
            + this.max + "' value='" + this.value + "' step='"
            + this.step + "' class='range_" + this.name + "' />"
            + "<span>" + this.value + "</span>";

        this.html += "</p>";

        this.parentObj.innerHTML += this.html;

        this.baliseObj = document.querySelector('input[class="range_' + this.name + '"]');
    }

    rangeEvent(fx, _param) {
        // console.log('input[class="range_' + this.name + '"]');
        let param = _param;

        this.baliseObj 
        this.baliseObj.addEventListener("mousedown", function(){
            this.actif_b = true;
        });
        this.baliseObj.addEventListener("mouseup", function(){
            this.actif_b = false;
        });
        this.baliseObj.addEventListener("change", fx);
        this.baliseObj.addEventListener("mousemove", function () {
            if (this.actif_b) {
                fx(param);
            }
        });

    }
    // range_frequence.addEventListener("change", range_frequence_fx);
    // range_frequence.addEventListener("mousemove", range_frequence_fx);
    // function range_frequence_fx() {
    //     let a = parseInt(this.value);
    //     let b = parseInt(range_fineFreq.value);
    //     this.nextSibling.innerHTML = (a + b) + "Hz";
    //     osc_source.frequency.value = range_frequence.value;
    // }


    // <input type="range" min='1' max='22000' value="400" step="100" id="range_frequence" /><span>400Hz</span>

}