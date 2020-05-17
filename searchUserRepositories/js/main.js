const input=document.querySelector('#entrada');
const form=document.querySelector('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(input.value!==''){
        axios.get(`http://api.github.com/users/${input.value}/repos`)
            .then(dados=> {
                criarLista(dados.data);
            })
            .catch(()=>{
                const ul=document.querySelector('.repos');
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
    const ul=document.querySelector('.repos');
    ul.innerHTML='';
    if(dados.length>0){
        for(let dado of dados){
            const li=document.createElement('li');
            const txt=document.createTextNode(dado.name);
            const p=document.createElement('p');
            let description = dado.description === null ? document.createTextNode(' '): document.createTextNode(dado.description);
            p.appendChild(description);
            const link=document.createElement('a');
            link.setAttribute("target",'_blank');
            link.setAttribute('href',dado.html_url);
            link.appendChild(txt);
            li.appendChild(link);
            li.appendChild(p);
            ul.appendChild(li);
        }
    }else{
        const li=document.createElement('li');
        const txt=document.createTextNode(`Não encontrei nenhum repositório do usuário "${input.value}".`);
        li.appendChild(txt);
        ul.appendChild(li);
    }
}