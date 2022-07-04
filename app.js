
let body = document.querySelector('.entrerNom')
let input = document.createElement('input')
body.prepend(input)
let erreur= document.querySelector('.entrerNom p')
let pseudo= document.querySelector('input') 
let div = document.querySelector('.detail')
let global = document.querySelector('.global')
let contenu = document.querySelector('.tableau')
let modal = document.querySelector('.modal') 
let formulaire = document.querySelector('form');
let currentUserId
let Mymodal = document.querySelector('#myModal')


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
                    <button onclick='opene(event)' id="boutton">dual</button>
                 </div>
                    `
                });    
                break
            case "new_user":
                contenu.innerHTML+=`
                <div class="contenu" id=${message.data.id}>
                <p>${message.data.pseudo}</p>
                <button >dual</button>
                </div>
                `
            break;

            case "asdual":
                Mymodal.style.display='flex'
                Mymodal.innerHTML=`
            <div class="modal-content">
              <p>le joueur ${message.data.user}vous demande en dual  </p> 
              <p>  temps de ${message.data.params.time} seconde</p> 
              <p> murs:${message.data.params.walls}</p>
             
              <p>vouliez-vous acceptés ?</p>
              <form action="" id="form">
                <button>oui</button>
                <button>non</button>
              </form>
            </div>
                `
                
                break;
           }

        }
    }
 
    pseudo.addEventListener('change',(e)=>{
        console.log('data',e.target);
        let nom = e.target.value;
        if (nom.length < 5) {
         erreur.innerHTML=`Le pseudo doit etre au moins 5 caracteres`
        }else{
          ws.send(JSON.stringify({"type":"connection","data":nom}))
        }
    
    })

    formulaire.addEventListener('submit',(e)=>{
        e.preventDefault()
        let data = Object.fromEntries(new FormData(e.target))
        ws.send(JSON.stringify({"type":"asdual","data":{...data,currentUserId}}))
      
    })

})

function opene(event) {
 currentUserId=   event.target.parentElement.id;
 console.log(currentUserId);
    modal.style.display='flex'
    console.log('bonjour');
}


window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }