/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function requete() {
    objetXHR = new XMLHttpRequest();
    objetXHR.onreadystatechange = callback;

    objetXHR.open("get", "expositions.xml", false);
    //objetXHR.overrideMimeType('text/xml');
    objetXHR.send(null);

}

function traitement() {

    var resultat = objetXHR.responseXML;
    var club = resultat.getElementsByTagName("expo");

    var valeur = document.getElementById("result");
    valeur.innerHTML = "";   

    for (i = 0; i < club.length; i++) {

        var valNomClub = club[i].getElementsByTagName("nomClub")[0].firstChild.nodeValue;
        var valTheme = club[i].getElementsByTagName("theme")[0].firstChild.nodeValue;
        var valDate = club[i].getElementsByTagName("date")[0].firstChild.nodeValue;

        var tr = document.createElement("tr");

        var td = document.createElement("td");
        td.appendChild(document.createTextNode(valNomClub));
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createTextNode(valTheme));
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createTextNode(valDate));
        tr.appendChild(td);        
        
        valeur.appendChild(tr);
        
    }
}

function callback() {
    if (objetXHR.readyState == 4) {
        if (objetXHR.status == 200) {
            traitement();
        } else {
            alert("Erreur HTTP n°" + objetXHR.status);
        }
    }
}
