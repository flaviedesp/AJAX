/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function requete() {
    objetXHR = new XMLHttpRequest();
    objetXHR.onreadystatechange = callback;

    objetXHR.open("get", "expositions.json", false);
    objetXHR.send(null);

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

function traitement() {

    var resultat = JSON.parse(objetXHR.responseText);       

    var valeur = document.getElementById("result");
    valeur.innerHTML = "";   

    for (i = 0; i < resultat.length; i++) {

        var valNomClub = resultat[i].nomClub;
        var valTheme = resultat[i].theme;
        var valDate = resultat[i].date;

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


