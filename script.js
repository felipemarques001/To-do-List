//pegando as variávies
var input = document.getElementById('input');
var btnAdd = document.getElementById('btnAdd');
var ul = document.getElementById('ul');
var btnDeleteAll = document.getElementById('btnDeleteAll')
var p_footer = document.getElementById('p_footer');
var dia = document.getElementById('dia');
var data = document.getElementById('data');

//função para criar a data
function createData(){
    let now = new Date;
    let semana = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
    let meses = ['Jan.','Fev.','Mar.','Abr.','Maio','Jun.','Jul','Ago.','Set.','Out.','Nov.','Dez.'];
    
    dia.innerHTML = semana[now.getDay()];
    data.innerHTML = `${now.getDate()} ${meses[now.getMonth()]}  ${now.getFullYear()}`;
}


//função para adicionar a task
btnAdd.addEventListener('click', () =>{
    let task = input.value; //salvando a task
    if(task == '' || task == ' '){
        alert('Por favor, adiciona uma tarefa')
    }else{
        let getLocalStorage = localStorage.getItem('list'); //criando uma variáviel que irá pegar a lista
        if(getLocalStorage == null){ //se a variáviel estiver vazia, irá criar uma lista
            list = [];
        }else{ //se não estiver vazia, irá fazer a lista voltar ao normal utilizando o JSON
            list = JSON.parse(getLocalStorage);
        }
        list.push(task); 
        localStorage.setItem('list', JSON.stringify(list)); //salvando a lista com o localStorage e transformando ela em uma string com o JSON
        input.value = '';
        addTask();
    }
})


//função para adicionar a task na ul
function addTask(){
    let getLocalStorage = localStorage.getItem('list');
    if (getLocalStorage == null){ //isso aqui será usado quando o usuário limpar todas as tasks
        list = [];
    }else{
        list = JSON.parse(getLocalStorage);
    }
    let li = ''; //irá criar uma variável
    p_footer.innerHTML = 'Você não possui tarefas'//O innerHTML será esse, mas se caso houver alguma task na array, o innerHTML será definido abaixo.
    list.forEach((tarefa, index) => { //para cada task na lista, a função irá rodar estes comandos
        li += `<li>
                    <p id="${index}">${tarefa}</p>
                    <div class="btnTask">
                        <i onclick=removeTask(${index}) class="fas fa-trash-alt"></i>
                    </div>
                </li>`; //irá fazer com que a variável se torne várias li organizadas com as tasks

        //códigos para atualizar o número de tarefas
        if(index + 1 == 1){
            p_footer.innerHTML = `Você possui ${index + 1} tarefa` 
        }else{
            p_footer.innerHTML = `Você possui ${index + 1} tarefas`
        } 
    })
    ul.innerHTML = li; //para a li ser implementada na ul
}



//função para remover uma única task
function removeTask(index){
    let getLocalStorage = localStorage.getItem('list');
    list = JSON.parse(getLocalStorage);     // a linha 44 e 45 é para a lista ser colocada e reconhecida dentro da função

    list.splice(index, 1); //para remover a li que o usuário desejar
    localStorage.setItem('list', JSON.stringify(list)); //salvar a nova array
    addTask(); 
}


//função para remover todas as tasks da ul
btnDeleteAll.addEventListener('click', () =>{   
    localStorage.clear(); //limpar o localStorage
    addTask();
})


//sempre a página for carregada ou recarregada, irá rodar a função que adiciona as tasks na ul
onload = () =>{
    addTask();
    createData();
}