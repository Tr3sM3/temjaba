// ======================================================
// TEM-JABÁ
// map.js v1.0
// ======================================================


console.log(
"MAP.JS CARREGADO"
);



const map =
L.map("map")
.setView(
[-8.9985937,13.2657029],
15
);



L.tileLayer(

"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

{

maxZoom:19,

attribution:
"&copy; OpenStreetMap"

}

).addTo(map);





const listaATM=[



{
nome:"ATM BANCO BIC Q2",
lat:-8.995659,
lng:13.269662,
pagina:"kiatmQ2.html"
},


{
nome:"ATM BANCO BCS Q3",
lat:-8.996174,
lng:13.269702,
pagina:"kiatmQ3.html"
},

{
nome:"ATM BANCO BCS A4",
lat:-8.994543,
lng: 13.254534,
pagina:"kiatmA4.html"
},


{
nome:"ATM BANCO SOL R18",
lat:-8.995649,
lng:13.270003,
pagina:"kiatmR18.html"
},

{
nome:"ATM BANCO BFA L13",
lat:-8.991974,
lng:13.269734,
pagina:"kiatmL13.html"
},

{
nome:"ATM BANCO BCA L15",
lat:-8.994557,  
lng: 13.268853,
pagina:"kiatmL15.html"
},

{
nome:"ATM BANCO BAI F4",
lat:-8.995435,
lng:13.263868,
pagina:"kiatmF4.html"
},

{
nome:"ATM BANCO BAI F1",
lat:-8.994728,
lng:13.262677,
pagina:"kiatmF1.html"
}


];




const marcadores=[];



listaATM.forEach(atm=>{


const marker=L.marker([

atm.lat,

atm.lng

])
.addTo(map);



marker.bindPopup(`

<b>${atm.nome}</b>

<br><br>

<a href="${atm.pagina}">
Abrir ATM
</a>

`);



marcadores.push({

nome:atm.nome,

marker

});



});





const search=
document.getElementById(
"searchATM"
);



const suggestions=
document.getElementById(
"suggestions"
);



if(search){


search.addEventListener(
"keydown",

e=>{


if(
e.key!=="Enter"
)
return;



const texto=
search.value
.toLowerCase()
.trim();



const atm=
listaATM.find(

x=>
x.nome
.toLowerCase()
.includes(texto)

);



if(!atm)
return;



const marcador=
marcadores.find(

x=>
x.nome===atm.nome

);



if(marcador){


map.setView(

marcador.marker.getLatLng(),

18

);



marcador.marker.openPopup();



setTimeout(()=>{


window.location.href=
atm.pagina;



},800);



}



}

);



}