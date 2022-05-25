// Importações de pacotes node
import chalk from 'chalk';

import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Importações de funções e variaveis relacionadas com o timer do jogo
import {CreateNewGameTimer, UpdateGameTimer, GameTimer} from './modules/GameTimer.js'


// Criação do array de letras
const LettersCollection = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


// Definição de variáveis que precisam ser globais
let CurrentLetter;

let Points = 0;
let Level;
let IsFirstLevel = true;


// Função que é executada quando o jogo é iniciado (Ao executar o index.js)
function GameStart(){
    // Limpeza total do terminal
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);


    // Definição do menu para o primeiro nivel
    rl.write('Pontos: 0       Nível: 1\n\n');
}


// Função responsável por retornar uma letra aleatoria do conjunto de letras
function GetRandomLetter(){
    return LettersCollection[Math.floor(Math.random() * (LettersCollection.length))];
}


// Função responsável por crial o nível atual
function CreateCurrentLevel(){
    CurrentLetter = GetRandomLetter();


    // Condições para definir com base na pontuação atual, qual o nível
    if(Points > 15){
        Level = 5;
    } else{
        switch(Points){
            case 0:
                Level = 1;
                break;
            
            case 5:
                Level = 2;
                break;

            case 10:
                Level = 3;
                break;

            case 15:
                Level = 4;
                break;
        }
    }

    CreateNewGameTimer(Level);


    // Condição que verifica se é o primeiro nível ou não(Necessario por conta do layout que sempre é limpo por completo)
    if(!IsFirstLevel){
        // Código que limpa o terminal
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);


        // Código que reseta o layout do menu
        readline.cursorTo(process.stdout, 0, 0);
        rl.write(`Pontos: ${Points}       Nível: ${Level}\n\n`);
    } else if(IsFirstLevel){
        IsFirstLevel = false;
    }


    // Digita o texto do nivel atual
    process.stdout.write(`Digite ${CurrentLetter}\n`);
}

GameStart();
CreateCurrentLevel();


// Observa a entrada de dados no terminal
process.stdin.on('data', data => {
    // Pega as informações passadas no terminal e transforma em string
    let DataStringified = data.toString().trim();

    // Verifica se a letra digitada é a correta
    if(DataStringified === CurrentLetter)
    {
        // Limpa a contagem regressiva do jogo
        clearTimeout(GameTimer);


        // Aumenta os pontos do jogador
        Points++;


        // Cria o feedback de acerto
        readline.cursorTo(process.stdout, 8, 0);
        rl.write(`${Points} ${chalk.green.bold('+1')}`);
        readline.cursorTo(process.stdout, 0, 3);


        // Delay para que seja possivel visualizar o feedback de que o jogador acertou a letra
        setTimeout(CreateCurrentLevel, 500);
    } else if (DataStringified != CurrentLetter){
        // Quando a tecla errada é precionada esse código adiciona 1 segundo ao timer
        UpdateGameTimer('Add', 1000);
    }
});

// Escreve a mensagem final do jogo, quando o comando de exit é executado
process.on('exit', () => {
    process.stdout.write(`\n\nJogo acabou\n\nVocê fez ${chalk.green.underline(Points,'pontos')} e chegou no ${chalk.yellow.underline('nível', Level)}\n`);
})



