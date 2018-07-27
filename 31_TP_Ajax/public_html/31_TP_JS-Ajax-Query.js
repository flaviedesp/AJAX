/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url = "http://10.75.96.104:81/ws_contacts/ajax.php";
var format = "json";
var queryString = "req=contact&format=" + format + "&wait=";

function requete() {
//    if (wait != "") {
//        queryString += wait;
//    }
    table.clear().draw();
    $.ajax({
        type: 'GET',
        dataType: format,
        url: url,
        data: queryString,
        success: function (result) {
            reponse(result);
        }
    });
}
function choixFormat(select) {
    format = select.value;
}
function reponse(resultat) {
    switch (format) {
        case "json":
            var tr = creerTrJson(resultat);
            break;
        case "csv":
            var tr = creerTrCsv(resultat);
            break;
        case "xml":
            var tr = creerTrXml(resultat);
            break;
    }
    $('#chargeur').hide();
}

function creerTrJson(resultat) {

    for (i = 0; i < resultat.length; i++) {
        table.row.add([
            resultat[i].numero,
            resultat[i].nom,
            resultat[i].adresse,
            resultat[i].code_postal,
            resultat[i].ville,
            resultat[i].code_secteur
        ]).draw();
    }
}

function creerTrCsv(resultat) {
    var tabContact = resultat.split("\n");
    var tr = "";
    for (i = 0; i < tabContact.length; i++) {
        contact = tabContact[i].split(";");
        table.row.add([
            contact[0],
            contact[1],
            contact[2],
            contact[3],
            contact[4],
            contact[5]
        ]).draw();
    }
}
function toggleWait() {
    $('button').click(function () {
        $('btn_wait').delay(3000)
                .val("Enlever le délai d'attente");
    });
    $('input').click(function () {
        $('btn_wait').delay(0)
                .val("Mettre un délai d'attente");
    });
}
var table = "";

//$(document).ready(function () {
//    $('btn_wait').click(toggleWait);
//    $('cbx_format').change(choixFormat);
//    table = $('#tableau').DataTable({
//        language: {
//            "url": "French.json"
//        }
//    });
//});
$(document).ready( function () {
               table = $('table').DataTable({
                   language: {
                    url: "francais.json"
                } 
            });
        });
