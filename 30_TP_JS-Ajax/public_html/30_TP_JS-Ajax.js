/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function requete() {
    objetXHR = new XMLHttpRequest();
    objetXHR.onreadystatechange = callback;

    objetXHR.open("get", "expositions.csv", false);
    objetXHR.send(null);

}

function traitement() {

    var resultat = objetXHR.responseText;
    var club = resultat.split("\n");

    var valeur = document.getElementById("result");
    valeur.innerHTML = "";

    for (i = 0; i < resultat.length; i++) {

        var tableau = club[i].split(";");
        var tr = document.createElement("tr");
        

        for (j = 0; j < club.length - 1; j++) {

            var td = document.createElement("td");
            td.textContent = tableau[j];
            tr.appendChild(td);
        }
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
