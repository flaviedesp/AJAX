/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var table;
var format = "json";


function requete() {
    $.ajax({
        type: 'get',
        url: "https://www.prevision-meteo.ch/services/json/orleans",
        dataType: format,
        success: function (result) {
            reponse(result);
        }
    });
    $('#pied').show();    
}

function reponse(resultat) {
    var meteo = resultat;
    var tr = "";
    var heure = "";
    $('#pied').hide();    
    for (i = 0; i < 24; i++) {
        heure = i + 'H00';
        tr += '<tr><td>' + i + 'H00</td><td>' + meteo.fcst_day_0.hourly_data[heure].TMP2m + '</td></tr>';
    }
    $('#table').html(tr);
}

