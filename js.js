const grid = document.querySelector('.div_prin')//selecionei a classe grid e botei dentro de uma variavel
const player = document.querySelector('.jogador')

const time = document.querySelector('.tempo')

const nomes = [
'background-color',
'HTML',
'CSS',
'JS',
'REACT',
'NODE',
'JAVA',
'GABRIEL'
]

const createElement = (tag, className) => {//essa funçao do js cria direto uma tag (ex: div) e com uma classe dentro, botei dois parametros que vai ser as duas escritas, uma para a tag e outra para a class
    const criar = document.createElement(tag)//primeiro criei uma tag para dentro de uma variavel
    criar.className = className//dentro da variavel eu disse para ele receber uma nome de classe como parametro  
    return criar 
}

let primeirocard = ''
let segundocard = ''

const final = () =>{
    const desabilitada = document.querySelectorAll('.desabilitar')
    if(desabilitada.length === 16){
        alert(`parabens, ${player.innerHTML} você concluiu o jogo. Seu tempo foi ${time.innerHTML}`)
        const confirmar = window.confirm('deseja jogar de novo?')
        
        
            setTimeout(function() {
                window.location.reload();
              }, 1000);
              
              
            
    
        
    }

    
}

const checar = () => {
    const primeiroNome = primeirocard.getAttribute('data-nomes')//estou salvando dentro da variavel o atributo para verificar dps
    const segundoNome = segundocard.getAttribute('data-nomes')

    if(primeiroNome === segundoNome){//estou verificando se as cartas sao iguais

        primeirocard.firstChild.classList.add('desabilitar')
        segundocard.firstChild.classList.add('desabilitar')

        primeirocard = ''//estou deixando a carta vazia caso ela nao seja igual, pois quando ela é igual, é adiconado um atributo nela, e nao posso verificar de novo pois ja tem algo dentro
        segundocard = ''

        final()

    } else{

        setTimeout(() => { //adicionar segundos para uma função caso eu erre
            primeirocard.classList.remove('revelar')//estou removendo a classe revelar caso elas nao sejam iguais
            segundocard.classList.remove('revelar')

            primeirocard = ''//estou deixando a carta vazia caso ela nao seja igual, pois quando ela é igual, é adiconado um atributo nela, e nao posso verificar de novo pois ja tem algo dentro
            segundocard = ''
        }, 600)

        

    }
}

const revelar = ({target}) =>{//criei uma função de quando eu clicar, ele faça oq esta dentro da função
    if(target.parentNode.className.includes('revelar')){//aqui estou verificando ao clicar se essa carta ja foi virada, se ja foi, ele n tem como apertar denovo (evitar um bug) ele adiona a classe quando eu clico, caso ela ja tenha a classe, ela nao faça nada
        return
    }

    if(primeirocard === ''){//estou dizendo que, se a primeira carta que a pessoa clicou estiver vazia ou n foi clicada ainda, ela entra dentro desse if
        target.parentNode.classList.add('revelar')// e adiona a classe de revelar, girar e mostrar a outra classe frente
        primeirocard = target.parentNode //estou dizendo que quando a primeira carta for clicada, eu vou salvar algo dentro dela para dizer que foi clicada, tirando os ''
        tempo()
    } else if (segundocard === ''){//estou verificando se a segunda carta esta vazia, caso a primeira nao esteja
        target.parentNode.classList.add('revelar')// e adiona a classe de revelar, girar e mostrar a outra classe frente
        segundocard = target.parentNode
        checar()
    }
    
   
}

const criarCarta = (nomes) => {//função que esta erdando. criei um html no js

    const card = createElement('div', 'card');//estou criando divs no html
    const frente = createElement('div', 'frente ver');
    const costa = createElement('div');

    frente.style.backgroundImage = `url('../imagens/${nomes}.png')`;//estou dizendo que cada carta vai ter os nomes que eu botei dentro da array la de cima, e automaticamente criar novas cartas para cada nome
    frente.textContent= `${nomes}`;
   

    costa.className = 'costa ver'//aqui, atraves da variavel que eu criei e adicionei uma div dentro dela, estou dizendo para a variavel adicionar uma classe na div

    card.appendChild(frente)//estou adicionando as classes dentro da div card. pois eu so criei, como se estivesse de baixo da outra, e agora botei tudo dentro do card 
    card.appendChild(costa)

    card.addEventListener('click', revelar)//estou adicionando um evento a variavel card que, quadno eu der um click, ele vai ativar a função revelar
    card.setAttribute('data-nomes', nomes)

    return card;
    //grid.appendChild(card)//adicionei como filho (dentro de) os cartoes no grid 
}

const carregar = () => {//é a variavel função que vai carregar as cartas

    const duplicado = [ ...nomes, ...nomes]//criei uma array que vai pegar a array la de cima, de nomes, e multiplicar, por isso tem dois

    const aleatorio = duplicado.sort( () => Math.random() - 0.5);// estou criando uma variavel que vai receber as duas arreys duplicadas de cima, e com a função sort, ele ordena da forma que eu ordenar, normalmente sem nada dentro dos () ele ordena por ordem alfabetica

    //match.random = tras um numero aleatorio entre 0 a 1. e quando eu boto para subtrair entre 0.5, ele vaidar numeros negativos e positivos de forma aleatoria
    
    aleatorio.forEach((nomes) => {//aqui estou dizendo que vou percorrer toda a array
        const card = criarCarta(nomes)//vriei uma variavel card dentro dessa função e nessa variavel eu etou chamando a função que faz as cartas, e cada carta é criada apartir de uum nome que esta na array la de cima
        grid.appendChild(card)//estou falando  que a variavel card esta dentro da div grid, e que so é para criar se tiver um nome para por dentro do grid
    })
}

const tempo = () =>{
    this.loop = setInterval(() => {
    const correndo = +time.innerHTML
    time.innerHTML = correndo + 1

    }, 2000)
}

window.onload = () =>{
    
    
    player.innerHTML = localStorage.getItem('jogador')
    
    carregar()
}


