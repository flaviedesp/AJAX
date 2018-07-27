/* 
fichier js du TP : 30_TP_JS-AJAX : version 03
30_TP_JS-AJAX_03.js : lecture par ajax d'un fichier json avec test de la réponse
Didier Bonneau CDI Afpa Créteil
*/

// déclaration du format par défaut et temps de réponse serveur
var format = "json";    // format par défaut
var wait="";    // si vide alors le serveur n'a pas de temps de réponse
                // si non vide :mettre le nombre de secondes

/**
 * Envoi de la requete
 */
function requete() {
    var url = "http://10.75.96.104:81/ws_contacts/ajax.php";
    //var url = "http://localhost/ws_contacts/index.php";
    var queryString = "req=contact&format=" + format + "&wait=";
    if (wait != "") queryString += wait;
    // Création d'un objet XMLHttpRequest
    objetXHR = creationXHR();
    // création de la fonction de callback
    objetXHR.onreadystatechange = reponse;
    // Configuration de requête GET et Synchrone
    objetXHR.open("get", url + "?" + queryString, true);
    //objetXHR.open("post", url, true);
    // supression des tr de la table
    document.getElementById("result").innerHTML = "";
    // Affichage du chargeur
    document.getElementById("chargeur").style.display = "block";
    // Envoi de la requête
    objetXHR.send( null ); 
    //objetXHR.send( queryString ); 
} 

/**
 * traitement de la réponse
 */
function reponse() {
   /*---------- Attente du retour SYNCHRONE  : */
   if(objetXHR.readyState == 4){
       if(objetXHR.status == 200){
           //alert("reponse reçue");
            // Récupération  du résultat renvoyé par le serveur
            //var results = objetXHR.responseText; 
            // création des <tr> du tableau
            // transformation de la string results en tableau
            switch (format) {
                case "json":
                    var tr = creerTrJson(objetXHR.responseText);
                    break;
                case "csv":
                    var tr = creerTrCsv(objetXHR.responseText);
                    break;
                case "xml":
                    var tr = creerTrXml(objetXHR.responseXML);
                    break;
            }
            // suppression du chargeur
            document.getElementById("chargeur").style.display = "none";
            // affichage des résultats
            document.getElementById("result").innerHTML = tr;
       } else {
            // suppression du chargeur
            document.getElementById("chargeur").style.display = "none";
            // affichage de l'erreur
            var tr = '<tr><td colspan="6">'+objetXHR.status+' '+objetXHR.statusText+'</td></tr>';
            document.getElementById("result").innerHTML = tr;
           
       }
   }
}

function creerTrJson(resultat) {
    //var resultat = '{"contacts":' + resultat + '}';  // le tableau est nommé
    var objetJSON = JSON.parse(resultat);
    var tr = "";
    for(i=0; i<objetJSON.length; i++){
    tr += "<tr><td>"+ objetJSON[i].numero+"</td><td>"+objetJSON[i].nom+"</td><td>"+objetJSON[i].adresse+"</td>";
    tr += "<td>"+ objetJSON[i].code_postal+"</td><td>"+objetJSON[i].ville+"</td><td>"+objetJSON[i].code_secteur+"</td></tr>";
    }

    return tr;
}

function creerTrCsv(resultat) {
    var tabContact = resultat.split("\n");
    var tr = "";
    for(i=0; i<tabContact.length; i++){
        contact = tabContact[i].split(";");
        tr += "<tr><td>"+ contact[0]+"</td><td>"+contact[1]+"</td><td>"+contact[2]+"</td>";
        tr += "<td>"+ contact[3]+"</td><td>"+contact[4]+"</td><td>"+contact[5]+"</td></tr>";
    }

    return tr;
}

function creerTrXml(resultat) {
    //var resultat = '{"contacts":' + resultat + '}';  // le tableau est nommé
    var objetJSON = JSON.parse(resultat);
    var tr = "";
    for(i=0; i<objetJSON.length; i++){
    tr += "<tr><td>"+ objetJSON[i].numero+"</td><td>"+objetJSON[i].nom+"</td><td>"+objetJSON[i].adresse+"</td>";
    tr += "<td>"+ objetJSON[i].code_postal+"</td><td>"+objetJSON[i].ville+"</td><td>"+objetJSON[i].code_secteur+"</td></tr>";
    }

    return tr;
}

function choixFormat(select){
    format = select.value;
}

function toggleWait() {
    if(wait == "") {
        wait = "5";     // attente de 5 secondes
        document.getElementById("btn_wait").value = "Enlever le délai d'attente";
    }else {
        wait = "";
        document.getElementById("btn_wait").value = "Mettre un délai d'attente";
    }
}

