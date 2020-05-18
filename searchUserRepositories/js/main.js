const input=document.querySelector('#entrada');
const form=document.querySelector('form');
const ul=document.querySelector('.repos');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(input.value!==''){
        axios.get(`https://api.github.com/users/${input.value}/repos`)
            .then(response=> {
                ul.innerHTML='';
                const li=document.createElement('li');
                const txt=document.createTextNode('Carregando os dados...');
                li.style.color='rgb(17, 86, 102)';
                li.appendChild(txt)
                ul.appendChild(li);
                return response;
            })
            .then(dados=> {
               setInterval(() => {
                    criarLista(dados.data);
               }, 1300);
            })
            .catch(()=>{
                ul.innerHTML='';
                const li=document.createElement('li');
                const txt=document.createTextNode('Erro 404, usuário não encontrado.');
                li.style.color='#e53935';
                li.appendChild(txt)
                ul.appendChild(li);
            });
    }
    
});

function criarLista(dados) {
    ul.innerHTML='';
    if(dados.length>0){
        for(let dado of dados){
           criarRepositorio(dado.name,dado.description, dado.html_url)
        }
    }else{
        criarMensagemError(`Não encontrei nenhum repositório do usuário "${input.value}".`);
    }
}

function criarRepositorio(nome, desc,url){
    const li=document.createElement('li');
    const txt=document.createTextNode(nome);
    const p=document.createElement('p');
    let description = desc === null ? document.createTextNode(' '): document.createTextNode(desc);
    p.appendChild(description);
    const link=document.createElement('a');
    link.setAttribute("target",'_blank');
    link.setAttribute('href',url);
    link.appendChild(txt);
    li.appendChild(link);
    li.appendChild(p);
    ul.appendChild(li);
}

function criarMensagemError(msg) {
    const li=document.createElement('li');
    const txt=document.createTextNode(msg);
    li.appendChild(txt);
    ul.appendChild(li);
}