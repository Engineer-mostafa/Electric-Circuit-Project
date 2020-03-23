
var elementcount = 0;
var OutFile = "";
var n1 = -1;
var n2 = -1;
var gnd = 0;
var l = OutFile.length;
var elementid = '';

var itm = document.getElementById("0"),
    cln = itm.cloneNode(true);



function DrawVertical(el) {


    document.getElementById((n1 < 10) ? "n0" + n1 : "n" + n1).innerHTML += "<img id='" + el + elementcount + "'" + "src='elements/" + el + "VF.png'>";
    document.getElementById((n2 < 10) ? "n0" + n2 : "n" + n2).innerHTML += "<img id='" + el + elementcount + "'" + "src='elements/" + el + "VE.png'>";
    for (var i = parseInt(n1) + 16; i < parseInt(n2); i += 16)
        document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML += "<img id='" + el + elementcount + "'" + "src='elements/" + el + "VM.png'>";

};
function DrawHorizontal(el) {

    document.getElementById((n1 < 10) ? "n0" + n1 : "n" + n1).innerHTML += "<img id='" + el + elementcount + "'" + "src='elements/" + el + "HF.png'>";
    document.getElementById((n2 < 10) ? "n0" + n2 : "n" + n2).innerHTML += "<img id='" + el + elementcount + "'" + "src='elements/" + el + "HE.png'>";
    for (var i = parseInt(n1) + 1; i < parseInt(n2); i++)
        document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML += "<img id='" + el + elementcount + "'" + "src='elements/" + el + "HM.png'>";


};



function Draw(el) {
    var max = (parseInt(n1) > parseInt(n2)) ? n1 : n2;
    var min = (parseInt(n1) > parseInt(n2)) ? n2 : n1;
    n2 = max;
    n1 = min;

    if (n1 == n2 || n1 > 96 || n1 > 96) {
        n1 = -1;
        n2 = -1;
        return;
    }
    else if (n1 % 16 == n2 % 16) {
        elementcount++;
        DrawVertical(el);
        document.getElementById(el + elementcount).style.zIndex = elementcount;
    }
    else if (parseInt((n1 - 1) / 16) == parseInt((n2 - 1) / 16)) {
        elementcount++;
        DrawHorizontal(el);
        document.getElementById(el + elementcount).style.zIndex = elementcount;
    }
    else
    {
        alert("Not in the same row/column");
        n1 = -1;
        n2 = -1;
        return;
    }
    alert("ELement Count = " + elementcount);
    if (elementcount == 1)
    {
        var freq = prompt("Please enter Circuit.Frequency");
        OutFile += freq + "\n\n";
        gnd = n2;
    }
    if (n1 == gnd)
        OutFile += el[0] + elementcount + ' ' + '0' + ' ' + n2 + ' '; 
    else if (n2 == gnd)
        OutFile += el[0] + elementcount + ' ' + n1 + ' ' + '0' + ' ';
    else
        OutFile += el[0] + elementcount + ' ' + n1 + ' ' + n2 + ' '; 

    var value = prompt(el + " Value =") + "\n\n";
    OutFile += value;
    n1 = -1;
    n2 = -1;
};

function myFunction(id) {
    itm = document.getElementById(id);
    cln = itm.cloneNode(true);
    var x = prompt("Write The number of the node that you need to drag this node into")
    n1 = (document.getElementById(id).className[1] == '1') ? x : n1;
    n2 = (document.getElementById(id).className[1] == '2') ? x : n2;
    elementid = id[0] + id[1] + id[2];
    if (!(n2 == -1 || n1 == -1)) {
        alert("Draw Now");
        alert(n1);
        alert(n2);
        Draw(elementid);
    }
};

function Delete() {
    var x1 = prompt("write the id of the element you want delete")
    if (document.getElementById(x1))
    {
        elementcount--;

        for (var i = 1; i < 97; i++)
        {
            document.getElementById(x1).remove();
        }
    }
};

function Txt() {
    /*OutFile[OutFile.indexOf(gnd)] = '0';
    OutFile[OutFile.indexOf(gnd) + 1] = ' ';*/
    alert(OutFile);
    var textFile = null,
        makeTextFile = function (text) {
            var data = new Blob([text], { type: 'text/plain' });

            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== null) {
                window.URL.revokeObjectURL(textFile);
            }

            textFile = window.URL.createObjectURL(data);

            // returns a URL you can use as a href
            return textFile;
        };
    var link = document.createElement('a');
    link.setAttribute('download', 'info.txt');
    link.href = makeTextFile(OutFile);
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
        var event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
    });

};

/*
function Txt() {
    var found = false;
    gnd = "EM";
    l = OutFile.length;
    for (var i = 0; i < l; i++) {
        if (OutFile[i] == '\n' && OutFile[i + 3] == ' ' && !found) {
            gnd[0] = OutFile[i + 4];
            gnd[1] = OutFile[i + 5];
            found = true;
            alert("found" + gnd + OutFile[i + 4] + OutFile[i + 5]);
        }
        if (OutFile[i] == '\n' && OutFile[i + 4] == ' ' && !found) {
            gnd[0] = OutFile[i + 5];
            gnd[1] = OutFile[i + 6];
            found = true;
            alert("found" + gnd);
        }
        if (found && OutFile[i] == gnd[0] && OutFile[i + 1] == gnd[1])
        {
            OutFile[i] = '0';
            OutFile[i + 1] = ' ';
            alert("edited");
        }

    }
    alert(OutFile);
};*/

/*if (x < 10) {
    selectnodes("n" + x, id);
}
else if (x <= 96) {
    selectnodes("n" + x, id);
}
function selectnodes(id,elid)
{
    document.getElementById(id).innerHTML +=  document.getElementById(elid).innerHTML;
}*/



