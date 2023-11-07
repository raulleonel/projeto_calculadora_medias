const form = document.getElementById('form-atividade'); /*criacao de variavel 'form' usando id do form*/
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';
const atividade = []; /* para calcular a media, vamos precisar adicionar em 2 arrays todas as atividade e notas que o usuario digitou */
const notas = []; /* para calcular a media, vamos precisar adicionar em 2 arrays todas as atividade e notas que o usuario digitou */
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a nota minima para aprovacao:')); /* possibilita que o usuario digite a nota minima para aprovacao - IMPORTANTE, O PROMPT VEM COMO STRING, POR ISSO PARSEFLOAT PARA MUDAR PARA NUMBER */

let linhas = ''; /* se adicionado no nivel global, mantem conteudo e adiciona uma nova linha*/

form.addEventListener('submit', function(e) { /*criacao do evento de sumbmit , remover comportamento do formulario de quando ser submetido atualizar a tela > para isso cria uma funcao que recebe um parametro que eh o proprio evento e para remover o comportamento de atualizar a pagina chamamos a funcaco (e) preventDefault*/
    e.preventDefault();

    adicionaLinha(); /*chama a funcao criada 'adicionaLinha*/
    atualizaTabela(); /*chama a funcao criada 'atualizaTabela*/
    atualizaMediaFinal(); /*chama a funcao criada 'atualizaMediaFinal*/
}); 

/* ESSA FUNCAO APENAS ADICIONA UMA LINHA NOVA A VARIAVEL 'LINHAS' */
function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade'); /*capturar campos, Nome da atividade*/
    const inputNotaAtividade = document.getElementById('nota-atividade'); /*capturar campos, Nota da atividade*/

    /* impossibilita adicionar atividades duplicadas com o mesmo nome */
    if (atividade.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} ja foi inserida`);
    } else {
        /* foi usado parseFloat para transformar os valores do array que estavam em STRING em NUMERO - caso continuasse em STRING, ao somar ocorreria uma concatenacao ('10'+'3'='103') e agora (10+3=13) */
        atividade.push(inputNomeAtividade.value); /* toda vez que a funcao adicionaLinha for chamada, vamos fazer um push(adicionar) nos arrays para adicionar o conteudo */
        notas.push(parseFloat(inputNotaAtividade.value)); /* toda vez que a funcao adicionaLinha for chamada, vamos fazer um push(adicionar) nos arrays para adicionar o conteudo */
    
        /*adicionar informacoes nome da atividade, nota e se o aluno foi aprovado ou nao ao corpo da tabela como uma linha*/
        let linha = '<tr>'; //*criando variavel 'linha' que vai receber o codigo HTML como uma string > para criar linha, usasse o <tr> */
        linha += `<td>${inputNomeAtividade.value}</td>`; /* += significa "concatenacao" >> criando coluna > para criar coluna, usasse o <td> >> isso significa que a linha vai ser composta da concatenacao de 3 colunas IMPORTANTE USAR CRASE */
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; /* para dizer se o aluno foi aprovado ou nao, usaremos o operador TERNARIO -- if(positivo) usasse '?' else(negativo) usasse ':' */
        linha += '</tr>';
    
        linhas += linha /*concatenando 'linha' dentro da variavel 'linhas', assim podesse adicionar quantas 'linha' quiser dentro de 'linhas'*/
    }

    inputNomeAtividade.value = ''; /* limpar campo depois de adicionar conteudo */
    inputNotaAtividade.value = ''; /* limpar campo depois de adicionar conteudo */
}

/* ESSA FUNCAO APENAS ATUALIZA O CONTEUDO DA TABELA */
function atualizaTabela () {
    const corpoTabela = document.querySelector('tbody'); /* insersao do conteudo dentro do corpo da tabela - para isso, criar uma constante (corpoTabela) e usar o seletor querySelector chamando o corpo da tabela (tbody) */
    corpoTabela.innerHTML = linhas; /* para inserir um conteudo dentro de uma tag HTML, usamos o atributo innerHTML */
}

/* ESSA FUNCAO APENAS ATUALIZA O A MEDIA FINAL DA TABELA */
function atualizaMediaFinal () {
    const mediaFinal = calculaMediaFinal(); /* criada funcao que recebe o valor resultante do valor da funcao calculaMediaFinal */

    document.getElementById('media-final-valor').innerHTML = mediaFinal; /* recebe o valor da mediaFinal no codigo HTML exibido no pagina */
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado; /* novamente o uso do operador TERNARIO para classificar a media */
}

function calculaMediaFinal () {
    let somaDasNotas = 0; /* para calcular a media vamos precisar criar um laco, para isso, criar uma variavel comecando com valor '0'*/

    for (let i = 0; i < notas.length; i++) { /* criando um laco 'for' > comeca com [i]=0, i < notas.lenght (quantidade de notas q o usuario inseriu); i++ (i sera incrementado cada vez q entrar no laco for) EX: [I] COMECA COM 0, USUARIO INSERE UMA NOTA PORTANTO [I] < NOTAS (0<1) PORTANTO [I] EH INCREMENTADO E PASSA A SER 1*/
        somaDasNotas += notas[i]; /* somaDasNotas = somaDasNotas + notas[i] - supondo q a primeira nota inserida foi 10, somaDasNotas que inicialmente era 0 passa a ser somaDasNotas = 0 + [10] igual a 10, supondo que a segunda nota foi 5, somaDasNotas que agora era 10 fica somaDasNotas = 10 + [5] igual 15 */
    }

    return somaDasNotas / notas.length; /* para tirar a media basta dividir somaDasNotas pela quantidade de entrada de notas que o usuario fez (notas.lenght) */
}


