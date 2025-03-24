const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')


const teclasPressionadas = {
   KeyW: false,
   KeyS: false,
   KeyD: false,
   KeyA: false
};
document.addEventListener('keydown', (e) => {
   for (let tecla in teclasPressionadas) {
       if (teclasPressionadas.hasOwnProperty(e.code)) {
           teclasPressionadas[tecla] = false;
       }
   }
   if (teclasPressionadas.hasOwnProperty(e.code)) {
       teclasPressionadas[e.code] = true;
   }
});


class Entidade {
   constructor(x, y, largura, altura) {
       this.x = x
       this.y = y
       this.largura = largura
       this.altura = altura
   }
   desenhar (){
       ctx.fillStyle = 'black'
       ctx.fillRect(this.x, this.y, this.largura, this.altura)
   }
}


class Cobra extends Entidade {
   constructor(x, y, largura, altura) {
       super(x, y, largura, altura)
   }
   atualizar() {
    if (teclasPressionadas.KeyW) {
        this.y -= 7;
    } else if (teclasPressionadas.KeyS) {
        this.y += 7;
    } else if (teclasPressionadas.KeyA) {
        this.x -= 7;
    } else if (teclasPressionadas.KeyD) {
        this.x += 7;
    }
 
    if (this.x < 0 || this.x + this.largura > canvas.width || 
        this.y < 0 || this.y + this.altura > canvas.height) {
        this.#fimDeJogo();
    }
 }
 
 #fimDeJogo() {
    alert("Game over! \nA cobra tocou na borda!");
    window.location.reload();
 }
 
   verificarColisao(comida){
       if(
           this.x < comida.x + comida.largura &&
           this.x + this.largura > comida.x &&
           this.y < comida.y + comida.altura &&
           this.y + this.altura > comida.y
       ){ 
           this.#houveColisao(comida)
       }
   }
   #houveColisao(comida){
       comida.x = Math.random()*canvas.width-10
       comida.y = Math.random()*canvas.height-10
   }
}
class Comida extends Entidade {
    constructor() {
        const x = Math.max(Math.random() * (canvas.width - 20), 0); // Evita valores negativos
        const y = Math.max(Math.random() * (canvas.height - 20), 0); // Evita valores negativos
        super(x, y, 20, 20); // Tamanho da comida
        this.imagem = new Image();
        this.imagem.src = 'https://www.imagenspng.com.br/wp-content/uploads/2015/04/branca-de-neve-cute-maca-02.png'; // URL da imagem
    }
 
    desenhar() {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura); // Desenha a imagem no canvas
    }
 }

const cobra = new Cobra(100, 200, 20, 20)
const comida = new Comida()


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cobra.desenhar();
    cobra.atualizar();
    comida.desenhar();
    cobra.verificarColisao(comida);
    requestAnimationFrame(loop);
 }
 
loop()