// ======================================================
// TEM-JABÁ
// homepage.js v1.1
// ======================================================


import { db } from "./firebase.js";


import {

collection,
getDocs

} from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



const DEZ_MINUTOS =
10 * 60 * 1000;



const ATM_LIST=[

"BIC_Q2",

"BCS_Q3",

"SOL_R14",

"BFA_L3",

"BAI_F4",

"BAI_F1"

];



// ===================================
// Atualizar estado ATM
// ===================================


async function atualizarEstados(){


try{


const snapshot =
await getDocs(
collection(db,"comentarios")
);



const ultimos={};



snapshot.forEach(doc=>{


const dados=doc.data();



if(
!dados.atm ||
!dados.time ||
!dados.status
)
return;



if(
!ultimos[dados.atm]
||
dados.time >
ultimos[dados.atm].time
){


ultimos[dados.atm]=dados;


}



});





ATM_LIST.forEach(atm=>{


const elemento =
document.getElementById(
"status-"+atm
);



if(!elemento)
return;



const ultimo =
ultimos[atm];



if(!ultimo){


elemento.textContent=
"⚪ Sem informação";


return;

}



if(
Date.now()-ultimo.time >
DEZ_MINUTOS
){


elemento.textContent=
"⚪ Informação antiga";


return;


}



switch(ultimo.status){



case "Tem dinheiro":

elemento.textContent=
"🟢 Tem dinheiro";

break;



case "Não tem dinheiro":

elemento.textContent=
"🔴 Sem dinheiro";

break;



case "Fila longa":

elemento.textContent=
"👥 Fila longa";

break;



case "Fora de serviço":

elemento.textContent=
"⚠️ Fora de serviço";

break;



default:

elemento.textContent=
"⚪ Sem informação";


}



});



}

catch(error){


console.error(
"Erro ao buscar ATM:",
error
);



}



}




atualizarEstados();



setInterval(
atualizarEstados,
60000
);




// ===================================
// POPUP DE APOIO
// ===================================


document.addEventListener(
"DOMContentLoaded",
()=>{


const popup =
document.getElementById("popup");


const closeBtn =
document.getElementById("closePopup");



if(
popup &&
closeBtn
){


closeBtn.onclick=()=>{


popup.style.display="none";


};


}



});

// ===================================
// PESQUISA ATM
// ===================================


const searchInput =
document.getElementById("searchATM");


const suggestions =
document.getElementById("suggestions");



const ATM_SEARCH = [


{
nome:"ATM BANCO BIC Q2 KILAMBA",
link:"kiatmQ2.html"
},


{
nome:"ATM BANCO BCS Q3 KILAMBA",
link:"kiatmQ3.html"
},


{
nome:"ATM BANCO BAI F4 KILAMBA",
link:"kiatmF4.html"
},


{
nome:"ATM BANCO BAI F1 KILAMBA",
link:"kiatmF1.html"
},


{
nome:"ATM BANCO SOL R14 KILAMBA",
link:"kiatmR14.html"
},


{
nome:"ATM BANCO BFA L3 KILAMBA",
link:"kiatmL3.html"
}


];





if(searchInput){


searchInput.addEventListener(
"input",
()=>{


const texto =
searchInput.value
.toLowerCase()
.trim();



suggestions.innerHTML="";



if(!texto)
return;



const resultados =
ATM_SEARCH.filter(

atm =>

atm.nome
.toLowerCase()
.includes(texto)

);



resultados.forEach(atm=>{


const div =
document.createElement("div");


div.textContent =
atm.nome;



div.onclick=()=>{


window.location.href =
atm.link;


};



suggestions.appendChild(div);



});


}

);


}