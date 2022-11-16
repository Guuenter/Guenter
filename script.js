function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function hide(id) {
    document.getElementById(id).classList.add("hidden");
}

function show(id) {
    document.getElementById(id).classList.remove("hidden");
}

function hidePictures() {
    for (var i = 0; i < stimuli.length; i++) {
        stimuli.item(i).classList.add("hidden");
    }
}

function showPictures() {
    for (var i = 0; i < stimuli.length; i++) {
        stimuli.item(i).classList.remove("hidden");
    }
}

function initialiseExperiment() {
    var leftOrder = [];
    var rightOrder = [];
    for(var i = 1; i<32; i++) {
        leftOrder.push(("000" + i).slice (-3));
        rightOrder.push(("000" + i).slice (-3));
    }

    shuffle(leftOrder);
    shuffle(rightOrder);

    //var shuffleDegree = (Math.floor(Math.random() * 3) + 1);
    for(var i = 1; i<32; i++) {
        finalOrder.push([leftOrder[i-1], ("000" + i).slice (-3), rightOrder[i-1], 0]);
        finalOrder.push([leftOrder[i-1], ("000" + i).slice (-3), rightOrder[i-1], 1]);
        finalOrder.push([leftOrder[i-1], ("000" + i).slice (-3), rightOrder[i-1], 2]);
        finalOrder.push([leftOrder[i-1], ("000" + i).slice (-3), rightOrder[i-1], 3]);
        //finalOrder.push([leftOrder[i-1], ("000" + i).slice (-3), rightOrder[i-1], shuffleDegree]);
    }

    shuffle(finalOrder);
}

function swapPictures() {
    document.getElementById("stimulus-left").src = "Images/" + finalOrder[progress][0] + "_scramble-" + finalOrder[progress][3] + ".jpg";
    document.getElementById("stimulus-center").src = "Images/" + finalOrder[progress][1] + "_scramble-" + "0" + ".jpg";
    document.getElementById("stimulus-right").src = "Images/" + finalOrder[progress][2] + "_scramble-" + finalOrder[progress][3] + ".jpg";
}

var stimuli = document.getElementsByClassName("stimulus");
var finalOrder = [];
var progress = 0;
initialiseExperiment();
swapPictures();







document.getElementById("continue-button").addEventListener("click", function(event) {
    if(progress>0) {
        finalOrder[progress - 1].push("" + document.getElementById("slider").value);
    }
    if(progress>123) {
        hide("continue-button");
        hide("slider");
        show("download-button");
        show("submission-instructions")
        return;
    }

    hide("continue-button");
    hide("instructions");
    hide("slider");
    
    //show("noise-mask");

    setTimeout(() => {
        hide("noise-mask");
        hide("slider");
        show("fixation-cross");
    }, 300);

    setTimeout(() => {
        hide("fixation-cross");
        showPictures();
    }, 1300);

    setTimeout(() => {
        hidePictures();
        show("noise-mask");
    }, 2000);

    setTimeout(() => {
        hide("noise-mask");
    }, 2300);

    setTimeout(() => {
        document.getElementById("slider").value = 50;
        show("slider");
    }, 2700);

    swapPictures();
    progress = progress + 1;
});

document.getElementById("slider").addEventListener("change", function(event) {
    show("continue-button");
});



document.getElementById("download-button").addEventListener("click", function(event) {
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