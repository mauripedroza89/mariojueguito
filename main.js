const canvas = document.getElementById("canvas") //llendo por la etiqueta
//quiero el contexto

const ctx = canvas.getContext("2d")
//variables deben declararse aqui, imagenes, colores, fondos, ataques, etc
//contadores.....


let frames = 0 //este se declara despues de ejecutar a mario en linea 74
let requestID;

//insertamos imagen al canvas
/*
const img = new Image()//instanciar una clase Image en una variable

img.src = "https://bit.ly/2L7yH3f"
img.onload  = function (){
    //le decimos al contexto que dibuje nuestra imagen
    
    ctx.drawImage(img,100,100,100,120)
}
*/

class Hero {
    constructor(x,y,w,h,imgs){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        //imagen
        this.image1 = new Image()
        this.image1.src = imgs[0] //esta es la imagen de mario
        this.image2 = new Image();
        this.image2.src = imgs[1]  //las jalo del arreglo de la constante en linea 50
        this.image = this.image1
    }

        //este metodo es para dibujarlo!
        //Methos nameMethod(){}

        //se reemplaza la propiedad ctx.drawImage por este metodo
        draw () {

            if(this.y <= 286) this.y += 2
            //este if va despues de ejecutar a mario en linea 74
            if(frames % 10 === 0){
                //if ternario "?('if') : ("else")"
                this.image = this.image === this.image1 ? this.image2 : this.image1
            }
/*  esto es lo mismo que el ternario 
if(this.image === this.image1){
    this.image = this.image2
}else {
    this.image = this.image1
}*/

            //aqui van las propiedades del consturctor
            //ctx.drawImage(img,x,y,width,height)
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        }
       collition(enemy){ //detener el juego cuando el enemigo te toca
            return (
                    this.x < enemy.x + enemy.width && //derecha
                    this.x + this.width > enemy.x  && //izquierda
                    this.y < enemy.y + enemy.height && //arriba
                    this.y + this.height > enemy.y //abajo
                ) 
            
       }
    
}

//esto va una vez que mario se mueve
class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image ()
        this.image.src = "https://orig15.deviantart.net/8bed/f/2015/058/a/8/smb1_background_by_steamerthesteamtrain-d8jq7ea.png"
    }

    gameOver (){ //el texto si tocamos al enemigo
            ctx.font="80px Arial"
            ctx.fillText("Mamaste!!",250,200)
    }
    draw(){
        this.x --; //retrocede la imagen
        if(this.x < -canvas.width) this.x = 0; //esto hace que cuando sale la imagen vuelva a salir
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx.drawImage(
            this.image,
            this.x + canvas.width,
            this.y,
            this.width,
            this.height
        )

    }
}
//hacemos al enemigo hasta que mario se mueva
class Enemy{
    constructor(){
        this.x = canvas.width;
        this.y = 256;
        this.width = 80;
        this.height = 80;
        //imagen
        this.image = new Image();
        this.image.src = "https://bit.ly/2BAISL4";

   }
      draw(){ //va a avanzar con el if
        if(frames % 10 ) this.x -= 5;
                
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
 
      }
}
//este debe ir hasta arriba, pero para no hacer scroll
const marioImgs = [
    "https://bit.ly/2L7yH3f",
    "https://art.pixilart.com/33b1bbc23398be7.png"
]


const mario = new Hero(200,286,50,50,marioImgs)
const fondito = new Background() //esto lo ponemos despues del mario
// solo con un enemigo, const enemy = new Enemy() //esto despues de que mario se mueve
//se debe actualizar sta funcion para ver los nuevos movimientos
//y que se refleje en el canvas
function update(){
    //esto va despues de la cosa en linea 44
    frames ++;
    //limpiar el canvas para que no se sobrepongan las capas
    ctx.clearRect(0,0,canvas.width,canvas.height)
    fondito.draw()
    mario.draw() //va despues de mario
    generateEnemies()//despues de mover a mario
    drawEnemies()

    //if(mario.collision(enemy)){    esto se corta y pega en la funcion de dibujar enemigos
    //   console.log("Me esta tocando!!!!!!")
    //    gameOver()
   // }
   if(requestID){
    requestID =  requestAnimationFrame(update)
 }
}

//con esta funcion ejecutamos el juego
function start(){
    requestID =  requestAnimationFrame(update)
 }

//acaba el juego
function gameOver(){
    fondito.gameOver()
    requestID = undefined
}

//con esto generamos enemigos y lo subimos al arrelgo 
function generateEnemies(){
    if (frames % 100 === 0 || frames % 60 ===0 || frames % 170 === 0){
    
    let widthRan = Math.floor(Math.random() * 300) //para el random de los carritos
    let x = ath.floor(Math.random() * canvas.width - 400)
    const enemy = new Enemy() //Enemy (widthRan,x)
    //enemies.push(enemy)
    enemies = [...enemies,enemy]
}
}


//dibujamos enemigos del arrelgo
function drawEnemies(){
    enemies.forEach((enemy,index)=>{
        enemy.draw()

    if(mario.collision(enemy)){
        console.log("Me esta tocando!!!!!!")
        gameOver()
    }
    })
}

//mover el mario

addEventListener("keydown", (event)=>{
    //izq
    if(event.keyCode === 65){
        mario.x -= 20;
    }
    //de
    if(event.keyCode === 68){
        mario.x += 20
    }
    //salto
    if(event.keyCode === 32){
        mario.y -= 60;
    }

    if(event.keyCode === 13){
        start()
    }
    
})

