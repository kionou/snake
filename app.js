
let body = document.querySelector('.entrerNom')
let input = document.createElement('input')
body.prepend(input)
let erreur= document.querySelector('.entrerNom p')
let pseudo= document.querySelector('input') 
let div = document.querySelector('.detail')
let global = document.querySelector('.global')
let contenu = document.querySelector('.tableau')
let modal = document.querySelector('.modal') 

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
                     <div id="contenu">
                    <p>id:</p>
                    <span>${message.data.id}</span>
                </div>
                <div id="contenu">
                    <p>Pseudo:</p>
                    <span>${message.data.pseudo}</span>
                </div>
                    `
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
   
    function open() {
        // modal.style.display='block'
        console.log('bonjour');
      }

    pseudo.addEventListener('change',(e)=>{
        let nom = e.target.value;
        if (nom.length < 5) {
         erreur.innerHTML=`Le pseudo doit etre au moins 5 caracteres`
        }else{
          ws.send(JSON.stringify({"type":"connection","data":nom}))
        }
      
      
      })

     

})