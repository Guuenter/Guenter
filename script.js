function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

var leftOrder = [];
var rightOrder = [];
for(var i = 1; i<32; i++) {
    leftOrder.push(("000" + i).slice (-3));
    rightOrder.push(("000" + i).slice (-3));
}

shuffle(leftOrder);
shuffle(rightOrder);

var finalOrder = [];
var shuffleDegree = (Math.floor(Math.random() * 2) + 1);
for(var i = 1; i<32; i++) {
    finalOrder.push([leftOrder[i-1], ("000" + i).slice (-3), rightOrder[i-1], 0])
    finalOrder.push([leftOrder[i-1], ("000" + i).slice (-3), rightOrder[i-1], shuffleDegree])
}

shuffle(finalOrder);

var progress = 0;
function updateStimuli() {
    document.getElementById("stimulus-left").src = "Images/" + finalOrder[progress][0] + "_scramble-" + finalOrder[progress][3] + ".jpg";
    document.getElementById("stimulus-center").src = "Images/" + finalOrder[progress][1] + "_scramble-" + "0" + ".jpg";
    document.getElementById("stimulus-right").src = "Images/" + finalOrder[progress][2] + "_scramble-" + finalOrder[progress][3] + ".jpg";
}

updateStimuli();

document.getElementById("continue-button").addEventListener("click", function(event) {
    if(progress>0) {
        finalOrder[progress - 1].push("" + document.getElementById("slider").value);
    }
    if(progress==62) {
        document.getElementById("continue-button").classList.add("hidden");
        document.getElementById("slider").classList.add("hidden");
        document.getElementById("download-button").classList.remove("hidden");
        return;
    }

    var stimuli = document.getElementsByClassName("stimulus");
        
    document.getElementById("continue-button").classList.add("hidden");
    document.getElementById("instructions").classList.add("hidden");
    document.getElementById("slider").classList.add("hidden");
    document.getElementById("slider").value = 50;
    document.getElementById("noise-mask").classList.remove("hidden");

    setTimeout(() => {
        document.getElementById("noise-mask").classList.add("hidden");
        document.getElementById("slider").classList.add("hidden");
        document.getElementById("fixation-cross").classList.remove("hidden");
    }, 300);

    setTimeout(() => {
        for (var i = 0; i < stimuli.length; i++) {
            stimuli.item(i).classList.remove("hidden");
        }
    }, 2300);

    setTimeout(() => {
        for (var i = 0; i < stimuli.length; i++) {
            stimuli.item(i).classList.add("hidden");
        }
        document.getElementById("noise-mask").classList.remove("hidden");
    }, 2650);

    setTimeout(() => {
        document.getElementById("noise-mask").classList.add("hidden");
        document.getElementById("fixation-cross").classList.add("hidden");
    }, 3000);

    setTimeout(() => {
        document.getElementById("slider").classList.remove("hidden");
    }, 3300);

    updateStimuli();
    progress = progress + 1;
});

document.getElementById("slider").addEventListener("change", function(event) {
    document.getElementById("continue-button").classList.remove("hidden");
});

document.getElementById("download-button").addEventListener("click", function(event) {
    /*const rows = [
        ["name1", "city1", "some other info"],
        ["name2", "city2", "more info"]
    ];
    */
   var rows = finalOrder
    
    let csvContent = "data:text/csv;charset=utf-8," 
        + rows.map(e => e.join(",")).join("\n");

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "experiment-log_"+Math.floor(Math.random() * 1000000) + 1+".csv");
        document.body.appendChild(link); // Required for FF
        
        link.click();
});