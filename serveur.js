const http = require('node:http')
const ws = require('ws');
const server = http.createServer();
const wss  = new ws.WebSocketServer({server})
const getString = require('./lib/generpassword')

let Users=[];
let sessions={}
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
                    }else if(client.id){
                        client.send(JSON.stringify({"type":"new_user","data":{"id":ws.id, "pseudo":ws.pseudo}}))
                    }
                })
                break;
            case "asdual":
                let id = getString(10)
                sessions[id] ={params:{ "walls":message.data.walls, "time":message.data.time},players:[{"id":ws.id,"pseudo":ws.pseudo,"score":0,"snake":[]}],apple:[0,0]}
                wss.clients.forEach(client=>{
                    console.log('clientId',client.id,ws.id, message?.data.currentUserId)
                    if (client.id === message.data.currentUserId) {
                        client.send(JSON.stringify({"type":message.type,"data":{params:sessions[id].params,user:ws.id}}))
                    }
                })
            break

        }
    })

})







server.listen(3000,()=>{
    console.log('connecter au server');
})