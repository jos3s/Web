const board=document.querySelector(".board");
const msg=document.querySelector(".msg");
const reiniciar=document.querySelector('.reiniciar');
var jogada=0; //$ X

document.addEventListener('click', (el)=>{
    e=el.target;
    if(jogada<9  && e.classList.contains('box')){
        if(jogada%2==0){
            if(!(e.querySelector(".box > i"))){
                jogar(true, e);
                criarMSG(true,msg);
                jogada++;
            }
            if(jogada==9) {
                msg.textContent='Partida Encerrada'; 
            }
        }else{
            jogar(false, e);
            criarMSG(false,msg);
            jogada++;
            if(jogada==9){
                msg.textContent='Partida Encerrada'; 
            }
        }
    }
    if(e.classList.contains('reiniciar')){
        criarBoxs(board);
        criarMSG(jogada, msg);
    }
});

function jogar(jogada, e) {
    if(jogada){
        e.appendChild(criarIcone('xis'));
    }else{
        e.appendChild(criarIcone('circle'));
    }
}

function criarIcone(tipo) {
    let i=criarElemento('i');
    if(tipo=='circle'){
        i.setAttribute('class','fas fa-circle');
    }else{
        i.setAttribute('class','fas fa-times');
    }
    return i;
}

function criarElemento(tipo) {
    return document.createElement(tipo);
}

function criarMSG(jogador, msg) {
    if(!jogador){
        msg.innerText="É a vez do X";
    }else{
        msg.innerText="É a vez do O";
    }
}

function criarBoxs(board){
    const boxs=document.querySelectorAll('.box');
    for(let box of boxs){
        box.remove();
    }
    for(let i=0;i<9;i++){
        const box=criarElemento('div');
        box.setAttribute('class','box');
        board.appendChild(box);
    }
    jogada=0;
}


