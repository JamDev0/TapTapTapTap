// Variaveis que precisam ser globais
let CurrentTime;
let MaxTime;
let GameTimer;


// Função que cria um novo timer para o jogo
function CreateNewGameTimer(Level){
    // Resetando a variavel que conta quanto tempo se passou
    CurrentTime = 0;


    // Definindo qual sera o intervalo do timer em milisegundos
    let Interval = 1;


    // Verificando qual o nivel atual e assim definindo o tempo maximo para digitar a letra
    switch(Level){
        case 1:
            MaxTime = 5000;
            break;

        case 2:
            MaxTime = 4000;
            break;

        case 3:
            MaxTime = 3000;
            break;

        case 4:
            MaxTime = 2000;
            break;
        
        case 5: 
            MaxTime = 1500;
            break;
    }
    

    // Criando o timer
    GameTimer = setInterval(() => {
        if(CurrentTime < MaxTime){
            CurrentTime++;
        } else if(CurrentTime >= MaxTime){
            process.exit();
        }
    }, Interval);
}


// Função que atualiza o timer do jogo
function UpdateGameTimer(Type, Quantity){
    // Verificando qual o tipo de update
    if(Type === 'Sub'){
        // Subtraindo quanto tempo se passou durante o nivel atual
        CurrentTime -= Quantity;
    } else if(Type === 'Add'){
        // Somando quanto tempo se passou durante o nivel atual
        CurrentTime += Quantity;
    }
}


// Exportando as funções e o timer em si
export {CreateNewGameTimer, UpdateGameTimer, GameTimer};