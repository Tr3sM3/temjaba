// ======================================================
// TEM-JABÁ
// atms.js v1.1 SECURITY
// ======================================================


import { db } from "./firebase.js";


import {

collection,
addDoc,
getDocs,
query,
where,
orderBy,
limit

} from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



// ============================
// Elementos
// ============================


const commentsDiv =
document.getElementById("comments");


const nameInput =
document.getElementById("name");


const commentInput =
document.getElementById("comment");


const lastUpdate =
document.getElementById("lastUpdate");




// ============================
// Estados permitidos
// ============================


const STATUS_VALIDOS = [

"Tem dinheiro",

"Não tem dinheiro",

"Fila longa",

"Fora de serviço"

];




// ============================
// Segurança
// ============================


function limparTexto(text){


return text

.trim()

.replace(/[<>]/g,"")

.substring(0,250);


}





function podeEnviar(){


const ultimo =
localStorage.getItem(
"ultimoComentario"
);



if(!ultimo){

return true;

}



return (

Date.now() - Number(ultimo)

) > 20000;


}





function timeAgo(time){


const segundos =
Math.floor(
(Date.now()-time)/1000
);



if(segundos < 60)

return "Agora mesmo";



const minutos =
Math.floor(segundos/60);



if(minutos < 60)

return `Há ${minutos} minuto(s)`;



const horas =
Math.floor(minutos/60);



return `Há ${horas} hora(s)`;


}





// ============================
// Publicar informação
// ============================


async function addComment(){



if(!podeEnviar()){


alert(
"Aguarde alguns minutos antes de enviar outra informação."
);


return;

}




const name =
limparTexto(
nameInput.value
);



const comment =
limparTexto(
commentInput.value
);



const status =
document.querySelector(
'input[name="status"]:checked'
);





if(!name){


alert(
"Introduza o seu nome."
);


return;

}




if(!status){


alert(
"Escolha o estado do ATM."
);


return;

}




if(
!STATUS_VALIDOS.includes(
status.value
)
){


alert(
"Estado inválido."
);


return;

}





try{


await addDoc(

collection(
db,
"comentarios"
),

{


atm:
window.atmID,


name:name,


status:
status.value,


comment:comment,


time:
Date.now()


}

);





localStorage.setItem(

"ultimoComentario",

Date.now()

);





alert(
"Informação publicada com sucesso!"
);





limparFormulario();



mostrarComentarios();




}

catch(error){


console.error(
"Erro ao publicar:",
error
);



alert(
"Erro ao publicar informação."
);



}



}





window.addComment =
addComment;






// ============================
// Limpar formulário
// ============================


function limparFormulario(){


if(nameInput)

nameInput.value="";



if(commentInput)

commentInput.value="";





document

.querySelectorAll(
'input[name="status"]'
)

.forEach(

radio =>

radio.checked=false

);


}







// ============================
// Mostrar comentários
// ============================


async function mostrarComentarios(){



if(!commentsDiv)

return;



try{


commentsDiv.replaceChildren();




const q =
query(


collection(
db,
"comentarios"
),


where(

"atm",

"==",

window.atmID

),


orderBy(

"time",

"desc"

),


limit(10)


);






const snapshot =
await getDocs(q);





let encontrados = 0;





snapshot.forEach(doc=>{


const item =
doc.data();




if(

Date.now()-item.time

<

1800000

){


criarComentario(item);


encontrados++;


}



});





if(encontrados===0){



commentsDiv.textContent =
"Sem informações recentes.";



if(lastUpdate)

lastUpdate.textContent =
"Última atualização: sem dados";



}

else{


if(lastUpdate)

lastUpdate.textContent =

"Última atualização: "

+

timeAgo(
snapshot.docs[0].data().time
);



}



}

catch(error){



console.error(

"Erro ao carregar comentários:",

error

);



if(commentsDiv)

commentsDiv.textContent =

"Erro ao carregar informações.";





}



}







// ============================
// Criar comentário visual
// ============================


function criarComentario(item){



const div =
document.createElement("div");


div.className =
"comment";




const nome =
document.createElement("strong");


nome.textContent =
item.name;




const estado =
document.createElement("p");


estado.textContent =

"Estado: "

+

item.status;





const texto =
document.createElement("p");


texto.textContent =

item.comment ||

"Sem observações.";





const data =
document.createElement("small");


data.textContent =

timeAgo(item.time);





div.append(

nome,

estado,

texto,

data

);




commentsDiv.appendChild(div);



}







// ============================
// Inicialização
// ============================


mostrarComentarios();



setInterval(

mostrarComentarios,

60000

);







// ============================
// Botão publicar
// ============================


const sendButton =

document.getElementById(
"sendComment"
);



if(sendButton){


sendButton.addEventListener(

"click",

addComment

);


}