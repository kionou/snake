class Apple{
    constructor(body = [], ctx, cv, ws, hs){
        this.ctx = ctx
        this.cv = cv
        this.ws = ws
        this.hs = hs
        this.body = body
        this.wasEat = false
    }

    draw(){
        let baseImg = new Image()
        baseImg.src = '../img/apple.png'
        baseImg.onload = ()=>{
            this.ctx.drawImage(baseImg, this.body[0]* this.ws, this.body[1] * this.hs, this.ws, this.hs);
        }
    }

    genPosition(){
        this.wasEat = false
        let x = Math.floor(Math.random() * this.cv.width / this.ws)
        let y = Math.floor(Math.random() * this.cv.height / this.hs)
        this.body = [x, y]
    }

    checkEat(predator){
        let predatorHead = predator.body[predator.body.length -1]
        if (JSON.stringify(predatorHead) === JSON.stringify(this.body)){
            this.wasEat = true
            predator.justEat = true
            this.genPosition()
        }
    }
}