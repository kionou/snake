/**All constants */
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const widthSquare = 25
const heigthSquare = 25
const st = document.querySelector(".st")
const speed = document.querySelector("#speed")
const select = document.querySelector("#wall")

let wall = false
let isPaused = true
let fps = 1;
let now;
let then = Date.now();
let interval = 1000/fps;
let delta;


window.addEventListener("load", ()=>{
   

  
   

    const snake = new Snake([[5, 18], [6, 18], [7, 18], [8, 18], [9, 18]], ctx, canvas, widthSquare, heigthSquare)
    const apple = new Apple([], ctx, canvas, widthSquare, heigthSquare)
    snake.draw()
    apple.genPosition()
    apple.draw()
    
    const move = ()=>{
        wall = select.options[select.selectedIndex].value;
        console.log("wall state : ", wall)
        snake.wall = wall === "true"
        fps = Number(speed.value)
        interval = 1000/fps;
        if (!snake.dead){
            if (!isPaused)
            {
                requestAnimationFrame(move)
                now = Date.now();
                delta = now - then;
                if (delta > interval){
                    then = now - (delta % interval);
                    apple.draw()
                    snake.move()
                    apple.checkEat(snake)
                    snake.grow()
                }
            }
        }
        else{
            alert("Snake is dead")
        }
    }

    window.addEventListener("keydown", (e)=>{
        snake.setPosition(e.key)
    })

    st.addEventListener("click", ()=>{
        if (isPaused){
            st.style.color="rgb(194, 26, 26)"
            st.textContent = "Stop"
        }
        else{
            st.style.color = "rgb(20, 184, 20)"
            st.textContent = "Start"
        }
        isPaused = !isPaused
        move()
    })
}
)