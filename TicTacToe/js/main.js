const msg=document.querySelector(".msg");
var jogada=0; //$ X
criarMSG(false,msg);

document.addEventListener('click', (el)=>{
    e=el.target;
    if(jogada<9  && e.classList.contains('box')){
        if(jogada%2==0){
            if(!(e.querySelector(".box > i"))){
                jogar(true, e);
                jogada++;
                criarMSG(true,msg);
                ganhador();
            }
            if(jogada==9) {
                ganhador();
                msg.textContent='Partida Encerrada'; 
            }
        }else{
            if(!(e.querySelector(".box > i"))){
                jogar(false, e);
                jogada++;
                criarMSG(false,msg);
                ganhador();
            }
            if(jogada==9){
                ganhador();
                msg.textContent='Partida Encerrada'; 
            }
        }
    }
    if(e.classList.contains('reiniciar')){
        reiniciar();
        criarMSG(false, msg);
    }
});

function jogar(jogada, e) {
    if(jogada){
        e.appendChild(criarIcone('xis'));
    }else{
        e.appendChild(criarIcone('circle'));
    }
}
function reiniciar() {
    const board=document.querySelector(".board");
    criarBoxs(board);
}

function criarIcone(tipo) {
    let i=criarElemento('i');
    if(tipo=='circle'){
        i.setAttribute('class','fas fa-circle');
        i.setAttribute('id','o');
    }else{
        i.setAttribute('class','fas fa-times');
        i.setAttribute('id','x');
    }
    return i;
}

function criarElemento(tipo) {
    return document.createElement(tipo);
}

function criarMSG(jogador, msg) {
    if(!jogador){
        msg.innerText="É a vez do ";
        msg.appendChild(criarIcone('times'));
    }else{
        msg.innerText="É a vez do ";
        msg.appendChild(criarIcone('circle'));
    }
}

var jogadorX=0;
var jogadorO=0;
function definirGanhador(ganhador) {
    jogada=0;
    if(ganhador==='x'){
        jogadorX++;
        const X=document.querySelector(".playerX");
        X.innerText=jogadorX;
        msg.innerText=" Ganhou o jogador ";
        msg.appendChild(criarIcone('times'));
    }else{
        jogadorO++;
        const O=document.querySelector(".playerO");
        O.innerText=jogadorO;
        msg.innerText="Ganhou o jogador ";
        msg.appendChild(criarIcone('circle'));
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

function ganhador() {
    const board=document.querySelector(".board");
    let x=pegarIds(board);
    if(linha(x)!==undefined){
        definirGanhador(linha(x));
        reiniciar();
    }else if(coluna(x)!==undefined){
       definirGanhador(coluna(x));
       reiniciar();
    }else if(diagonal(x)!==undefined){
        definirGanhador(diagonal(x));
        reiniciar();
    }
}
function linha(x) {
    if(x[0] === x[1] && x[0] === x[2] && x[0] !== undefined) return x[0];        
    if(x[3] === x[4] && x[3] === x[5] && x[3] !== undefined) return x[3];        
    if(x[6] === x[7] && x[6] === x[8] && x[6] !== undefined) return x[6];        
    return undefined;
    
}

function coluna(x) {
    if(x[0] === x[3] && x[0] === x[6] && x[0] !== undefined) return x[0];        
    if(x[1] === x[4] && x[1] === x[7] && x[1] !== undefined) return x[1];        
    if(x[2] === x[5] && x[2] === x[8] && x[2] !== undefined) return x[2];        
    return undefined;
    
}
function diagonal(x) {
    if(x[0] === x[4] && x[0] === x[8] && x[0] !== undefined) return x[0];        
    if(x[2] === x[4] && x[2] === x[6] && x[2] !== undefined) return x[2];        
    return undefined;
}

function pegarIds() {
    let boxs=document.querySelectorAll('.box');
    const ids=[];
    for(let box of boxs){
        let id;
        if(box.childNodes.length >=1){
            if(box.childNodes.length>1){
                id=box.childNodes[1];
                id=id.getAttribute('id');
                ids.push(id);
                continue;
            }
            if(box.childNodes[0].nodeName!=='#text'){
                id=box.childNodes[0];
                id=id.getAttribute('id');
                ids.push(id);
            }else{
                ids.push(undefined);
            }    
        }
    }
    return ids;
}