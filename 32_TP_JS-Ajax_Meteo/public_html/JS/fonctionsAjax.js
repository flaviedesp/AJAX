// JavaScript Document
 function creationXHR() {

    var resultat = null;

    try {  // Test pour les navigateurs : Mozilla, Opéra, ...
        resultat = new XMLHttpRequest();
//		alert('XMHttpRequest OK');
    } 
   catch ( Error ) {
     try { // Test pour les navigateurs Internet Explorer > 5.0
     	resultat = new ActiveXObject("Msxml2.XMLHTTP");
//        alert('Msxml2.XMLHTTP OK');
     }
     catch ( Error ) {
         try {   //  Test pour le navigateur Internet Explorer 5.0
         resultat = new ActiveXObject("Microsoft.XMLHTTP");
//        alert('Microsoft.XMLHTTP OK');
         }
         catch ( Error ) {
            resultat= null;
         }
     }
  }
return resultat;
}
//------------Fonctions de gestion du DOM ( solution alternative à innerHTML )
function remplacerContenu( id, texte ) {
  var element = document.getElementById( id );
  if ( element != null ) {
    supprimerContenu( element );
    var nouveauContenu = document.createTextNode( texte );
    element.appendChild( nouveauContenu );
  }
}
function supprimerContenu( element ) {
if ( element != null )  {
    while( element.firstChild )
        element.removeChild( element.firstChild );
   }
}
function addEvent( emt, evt, fnc, bbl)
{
    if( 'addEventListener' in emt) emt.addEventListener( evt, fnc, bbl); //pour ECMA ex: FireFox
    else if( 'attachEvent' in emt){
        emt.attachEvent( 'on' + evt, fnc); //pour MS IE
    }
}
