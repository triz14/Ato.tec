let botaoIniciar = document.querySelector("#botaoIniciar");
let caixaQuiz = document.querySelector(".caixaQuiz");
let header = document.querySelector("header");
let titulo = document.querySelector(".titulo");
let inicio = document.querySelector(".grupoQuiz")
let pontuacao = document.querySelector(".pontuacaoAtual");
let contagem_Tempo = caixaQuiz.querySelector(".tempo .segundosTempo");
let tempoAcabou = caixaQuiz.querySelector(".tempo .segundosTempo");
let linha_Tempo = caixaQuiz.querySelector(".caixaQuiz .linhaFundoTempo .linhaTempo");
let headerElementos = header.querySelector(".container, .logo-container, .nav-btn, .log-sign, .hamburguer-menu-container, .overlay");
let tituloQuiz = titulo.querySelector("#tituloQuiz");


let lista_Alt = document.querySelector(".questoesAlt");

inicio.classList.add("activeInicio");
botaoIniciar.onclick = ()=> {
    caixaQuiz.classList.add("activeQuiz");
    pontuacao.classList.add("activePontuacao");
    inicio.classList.remove("activeInicio");

    showQuestions(0);
    contagemQuestoes(1);
    temporizador(15);
    bloquearRedirec();
    if(cont_Questoes == 0){
        linha_Tempo.setAttribute("style", "width:0");
    }
    tituloQuiz.setAttribute("style", "margin-top: 5rem;");
    contagemPontuacao(0);
}

let cont_Questoes = 0;
let questoes_Num = 1;
let contador;
let tempo_Val = 15;
let pontuacaoU = 0;

let botao_Proximo = caixaQuiz.querySelector(".proxBotao");
let caixaResultados = document.querySelector(".caixaResultados");
let reiniciarQuiz = caixaResultados.querySelector(".botaoJogarNov");
// let botao_Responder = caixaQuiz.querySelector(".respBotao");

reiniciarQuiz.onclick = ()=> {
    caixaQuiz.classList.add("activeQuiz");
    pontuacao.classList.add("activePontuacao");
    caixaResultados.classList.remove("activeResultados");
    cont_Questoes = 0;
    questoes_Num = 1;
    let contador;
    tempo_Val = 15;
    pontuacaoU = 0;
    if(cont_Questoes < questoes.length - 1){
        if(cont_Questoes == 0){
            linha_Tempo.setAttribute("style", "width:0");
        }
        showQuestions(cont_Questoes);
        contagemQuestoes(questoes_Num);
        clearInterval(contador);
        temporizador(tempo_Val);
        bloquearRedirec();
        comecarLinhaTempo();
        contagemPontuacao(0);
        // contagemPontuacao(totalPontuacaoAtual);
        botao_Proximo.style.display = "none";
    } else{
        console.log("Questões finalizadas");
        mostrarCaixaResultados();
    }
}

botao_Proximo.onclick = ()=> {
    if(cont_Questoes < questoes.length - 1){
        cont_Questoes++;
        questoes_Num++;
        showQuestions(cont_Questoes);
        contagemQuestoes(questoes_Num);
        clearInterval(contador);
        temporizador(tempo_Val);
        console.log(cont_Questoes);
        comecarLinhaTempo();
        contagemPontuacao(pontuacaoU);
        botao_Proximo.style.display = "none";
        // ajustarAlternativas();
        
    } else{
        console.log("Questões finalizadas");
        mostrarCaixaResultados();
        pontuacao.classList.remove("activePontuacao");
    }
}


function bloquearRedirec() {
    headerElementos.setAttribute("style", "pointer-events: none");
}

function showQuestions(index) {
    let texto_Questoes = document.querySelector(".questoesTexto");
    let questoes_Tag = '<span>'+ questoes[index].num + ". " + questoes[index].questao +'</span>';
    let alt_Tag = '<div class="alternativa">'+ questoes[index].alternativas[0] +'<span></span></div>'
                + '<div class="alternativa">'+ questoes[index].alternativas[1] +'<span></span></div>'
                + '<div class="alternativa">'+ questoes[index].alternativas[2] +'<span></span></div>'
                + '<div class="alternativa">'+ questoes[index].alternativas[3] +'<span></span></div>';
    texto_Questoes.innerHTML = questoes_Tag;
    lista_Alt.innerHTML = alt_Tag;
    let alternativa = lista_Alt.querySelectorAll(".alternativa");
    for (let i = 0; i < alternativa.length; i++) {
        alternativa[i].setAttribute("onclick", "altSelecionada(this)");
    }
}

// function ajustarAlternativas() {
//     let alternativa = lista_Alt.querySelectorAll(".alternativa");
//     num = questoes.num;
//     // alternativas.setAttribute("style", "height: 100%");
//     if(num = 5){
//         alternativa.setAttribute("style", "font-size: 11px");
//     }
// }

let iconeTick = "<div class='iconeTick'><i class='fas fa-check'></i></div>";
let iconeCross = "<div class='iconeCross'><i class='fas fa-times'></i></div>";

function comecarLinhaTempo() {
    progresso(cont_Questoes);
    function progresso() {
        contadorLinha = linha_Tempo.setAttribute("style", "width: " + cont_Questoes * 2.2 + "rem");
    }
}

function altSelecionada(resposta) {
    clearInterval(contador);
    let resp_Usuario = resposta.textContent;
    let respostaCorreta = questoes[cont_Questoes].resposta;
    let todasAlternativas = lista_Alt.children.length;
    if(resp_Usuario == respostaCorreta){
        pontuacaoU += 10;
        resposta.classList.add("correta");
        resposta.insertAdjacentHTML("beforeend", iconeTick);
        contagemPontuacao(pontuacaoU);
    } else{
        resposta.classList.add("errada");
        resposta.insertAdjacentHTML("beforeend", iconeCross);

        for (let i = 0; i < todasAlternativas; i++) {
            if(lista_Alt.children[i].textContent == respostaCorreta){
                lista_Alt.children[i].setAttribute("class", "alternativa correta");
                lista_Alt.children[i].insertAdjacentHTML("beforeend", iconeTick);
            }
        }
    }

    for(let i = 0; i < todasAlternativas; i++){
        lista_Alt.children[i].classList.add("desabilitada");
    }
    botao_Proximo.style.display = "block";
}

function mostrarCaixaResultados() {
    caixaQuiz.classList.remove("activeQuiz");
    caixaResultados.classList.add("activeResultados");
    let pontuacaoTexto = caixaResultados.querySelector(".pontuacaoFinal");
    let pontuacaoTag = "<p>Pontuação final: <span>" + pontuacaoU + "</span></p>";
    pontuacaoTexto.innerHTML = pontuacaoTag;
    tituloQuiz.setAttribute("style", "margin-top: 0.5rem;");
}

function contagemQuestoes(index) {
    let contador_Questoes = caixaQuiz.querySelector(".totalQuestoes");
    let total_cont_quest = "<span id='texto_TotalQ'><p>" + index + "</p>de<p>" + questoes.length + "</p>questões</span>";
    contador_Questoes.innerHTML = total_cont_quest;
    if (index >= 10){
        let rodape = caixaQuiz.querySelector(".rodapeQuiz");
        rodape.setAttribute("style", "margin-left: 51%");
    }
}

function contagemPontuacao() {
    let totalPontuacaoAtual = "<span>Pontuação atual: <p>" + pontuacaoU + "</p></span>";
    pontuacao.innerHTML = totalPontuacaoAtual;
}


function temporizador(tempo) {
    contador = setInterval(timer, 1000);
    function timer() {
        contagem_Tempo.textContent = "0:" + tempo;
        tempo--;
         
        if(tempo < 9){
            contagem_Tempo.textContent = tempo;
            let addZero = contagem_Tempo.textContent;
            contagem_Tempo.textContent = "0:0" + addZero;
        }
        
        if(tempo < 0){
            clearInterval(contador);
            contagem_Tempo.textContent = "0:00";
            let respostaCorreta = questoes[cont_Questoes].resposta;
            let todasAlternativas = lista_Alt.children.length;

            for (let i = 0; i < todasAlternativas; i++){
                if(lista_Alt.children[i].textContent == respostaCorreta){
                    lista_Alt.children[i].setAttribute("class", "alternativa correta");
                    lista_Alt.children[i].insertAdjacentHTML("beforeend", iconeTick);
                }
            }

            for(let i = 0; i < todasAlternativas; i++){
                lista_Alt.children[i].classList.add("desabilitada");
            }
            botao_Proximo.style.display = "block";
        }
    }
}
