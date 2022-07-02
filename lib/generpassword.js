getString = (length)=>{
    let chars="1234567890";
    let Api_Key='';
    for (let i = 0; i <length; i++) {
       let randomNumber=Math.floor(Math.random()*chars.length);
       console.log(randomNumber);
       Api_Key += chars.substring(randomNumber ,randomNumber + 1) ;  
    }
    return Api_Key
}

module.exports=getString;