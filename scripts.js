// let bancoDeDados = [
//     {matricula: 1, nome: "Isaac", curso: "JavaScript", nota: 9.8},
//     {matricula: 2, nome: "Rebeca", curso: "Python", nota: 7.8}
// ]

// Como armazenar no local storage
// localStorage.setItem("alunos", JSON.stringify(bancoDeDados));

// Como pegar os dados do localStorage
// const data = localStorage.getItem("alunos");
// console.log(data);

// ------------------------------------------------
// Criando o nosso banco de Dados
const storage = localStorage.getItem("tasks") || "[]";
let dados = JSON.parse(storage);

const inputAdd = document.querySelector(".input-add");
const btnAdd = document.querySelector(".btn-add");
const tasks = document.querySelector(".tasks");

// Função que add tarefa na lista
function addTasksToList() {
    // Pegando o valor digitado
    const tarefa = inputAdd.value;

    // Criando o objeto que será adicionado
    const item = {
        id: crypto.randomUUID(),
        name: tarefa,
        checked: false
    }

    // Adicionando a tarefa
    dados.push(item);

    // Adicionando no localStorage
    localStorage.setItem("tasks", JSON.stringify(dados));
    // alert("Tarefa adicionanda com sucesso!");
    inputAdd.value = ""
    inputAdd.focus();
    populateTasks();
}

function populateTasks() {
    let tasksItems = "";
    // Percorrendo todas as tasks
    dados.forEach(tasks => {
        tasksItems += `
        <li>
            <label for="${tasks.id}">
                <input onChange="changeTasks('${tasks.id}')" type="checkbox" id="${tasks.id}"
                ${tasks.checked ? "checked" : ""}>
                <span>${tasks.name}</span>
            </label>
            <i class="bx bx-trash" onclick="deleteTasks('${tasks.id}')"></i>
        </li>
        `
    });
    tasks.innerHTML = tasksItems;
}

function deleteTasks(id) {
    // atualizando a lista com todos os itens menos o item com o id passado
    const newList = dados.filter(item => item.id !== id);
    dados = newList;
    populateTasks();
    localStorage.setItem("tasks", JSON.stringify(dados));
}

function changeTasks(id) {
    const checkbox = document.getElementById(id);
    let newList = dados.map(item => {
        if (item.id === id) {
            item.checked = checkbox.checked;
        }
        return item;
    });
    dados = newList;
    localStorage.setItem("tasks", JSON.stringify(dados));
    populateTasks();
}

inputAdd.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        addTasksToList();
    }
})

btnAdd.addEventListener("click", addTasksToList);
populateTasks();
