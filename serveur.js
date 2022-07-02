const http = require('node:http')
const ws = require('ws');
const server = http.createServer();
const wss  = new ws.WebSocketServer({server})
const getString = require('./lib/generpassword')

let Users=[]
wss.on('connection',(ws)=>{
    console.log('connecter');
    ws.on('message',(i)=>{
        const message = JSON.parse(i.toString())
        switch(message.type){
            case "connection":
                ws.id="Play-"+ getString(7);
                ws.pseudo = message.data;
                Users.push({"id":ws.id,"pseudo":ws.pseudo})
                wss.clients.forEach(client=>{
                    if (client.id === ws.id) {
                      ws.send(JSON.stringify({"type":message.type,"data":{"id":ws.id,"pseudo":ws.pseudo,"users":Users.filter(user => user.id != ws.id)}}))
                    }else{
                        client.send(JSON.stringify({"type":"new_user","data":{"id":ws.id, "pseudo":ws.pseudo}}))
                    }
                })
               
                break;
        }
        console.log('ddd',message);
        
    })

})







server.listen(3000,()=>{
    console.log('connecter au server');
})