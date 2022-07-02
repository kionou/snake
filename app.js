
let body = document.querySelector('.entrerNom')
let input = document.createElement('input')
body.prepend(input)
let pseudo= document.querySelector('input') 
let div = document.querySelector('.detail')
let global = document.querySelector('.global')
let contenu = document.querySelector('.tableau')


var modal = document.getElementById("myModal");

 function open() {
  modal.style.display = "block";
}

// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

window.addEventListener("load",()=>{
    
    const ws = new  WebSocket('ws:localhost:3000')
    ws.onopen =()=>{
        ws.onmessage = (i)=>{
           const message = JSON.parse(i.data)
           switch(message.type){
            case"connection":
                body.style.display='none'
                global.style.display='flex'
                div.innerHTML=`
                    <p>id:${message.data.id}</p>
                    <p>pseudo:${message.data.pseudo}</p>`
                message.data.users.forEach(el => {
                    contenu.innerHTML+=`
                    <div class="contenu" id=${el.id}>
                    <p>${el.pseudo}</p>
                    <button onclick="open()" id="boutton">dual</button>

                 </div>
                    `
                });    
                break
            case "new_user":
                contenu.innerHTML+=`
                <div class="contenu" id=${message.data.id}>
                <p>${message.data.pseudo}</p>
                <button id="}">dual</button>
                </div>
                `
                break;
           }

        }
    }
   
  

    pseudo.addEventListener('change',(e)=>{
        console.log('hjeoo')
        let nom = e.target.value;
        console.log(nom.length);
        if (nom.length < 5) {
          alert("pseudo 5 caractere");
        }else{
          ws.send(JSON.stringify({"type":"connection","data":nom}))
        }
      
      
      })

})