const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaLi() {
    const li = document.createElement('li')
    return li
}

//Utilizando Tecla enter para adcionar uma tarefa
inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
    }
})

//Function para limpar o input logo em seguida que uma tarefa foi adicionada.
function limparInput() {
    inputTarefa.value = ''
    inputTarefa.focus()
}

//criando botão apagar que vai surgir assim que for adicionado uma tarefa.
function criarBotaoApagar(li) {
    li.innerHTML += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerHTML = 'Apagar'
    botaoApagar.setAttribute('Class', 'apagar')
    botaoApagar.setAttribute('title', 'Apagar esta tarefa')
    li.appendChild(botaoApagar)
}

//Não estou redeclarando a Variável 'li', pois estão em escopos diferentes
function criaTarefa(textoinput) {
    const li = criaLi()
    li.innerHTML = textoinput
    tarefas.appendChild(li)
    limparInput()
    criarBotaoApagar(li)
    salvarTarefas()
}

btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
   
})

//Apagando uma Tarefa removendo a classe Pai

document.addEventListener('click', function (e) {
    const el = e.target;

    if (el.classList.contains('apagar')) {
        el.parentElement.remove()
        salvarTarefas();
    }
})

/*salvando as tarefas adcionadas em um array que vai ser gerado um arquivo Json,
 Em um formato Json-String, que nos possibilidar salvar e converter de volta em uma String normal.
*/
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for(let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();


