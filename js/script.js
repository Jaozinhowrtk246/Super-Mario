const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

let isJumping = false;
let gameOver = false;

/* =========================
   PULAR
========================= */

function jump() {

    if (isJumping || gameOver) {
        return;
    }

    isJumping = true;

    mario.classList.add('jump');

    setTimeout(() => {

        mario.classList.remove('jump');

        isJumping = false;

    }, 700);
}

/* =========================
   TECLADO
========================= */

document.addEventListener('keydown', (event) => {

    if (
        event.code === 'Space' ||
        event.code === 'ArrowUp' ||
        event.code === 'KeyW'
    ) {
        event.preventDefault();

        jump();
    }

});

/* Também permite clicar na tela para pular */

document.addEventListener('click', jump);

/* =========================
   COLISÃO
========================= */

const loop = setInterval(() => {

    if (gameOver) {
        return;
    }

    const marioRect = mario.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    /*
       Verifica se Mario e tubo estão
       ocupando a mesma área.
    */

    const collision =
        marioRect.right > pipeRect.left &&
        marioRect.left < pipeRect.right &&
        marioRect.bottom > pipeRect.top + 20 &&
        marioRect.top < pipeRect.bottom;

    if (collision) {

        gameOver = true;

        /* Para o tubo */
        pipe.style.animation = 'none';

        /* Mantém o tubo no lugar */
        pipe.style.left = `${pipeRect.left}px`;
        pipe.style.right = 'auto';

        /* Para o Mario */
        mario.style.animation = 'none';

        /* Troca pelo Game Over */
        mario.src = 'game-over.png';

        mario.style.width = '75px';

        mario.style.marginLeft = '35px';

        clearInterval(loop);

        console.log('GAME OVER!');
    }

}, 10);
