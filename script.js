class ListaTarefas {
    constructor() {
        this.tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        this.listaElement = document.getElementById("listaTarefas");
        this.inputElement = document.getElementById("tarefaInput");
        this.botaoAdicionar = document.getElementById("adicionarBtn");

        this.botaoAdicionar.addEventListener("click", () => this.adicionarTarefa());
        this.renderizarLista();
    }

    salvarNoLocalStorage() {
        localStorage.setItem("tarefas", JSON.stringify(this.tarefas));
    }

    adicionarTarefa() {
        const texto = this.inputElement.value.trim();
        if (texto === "") return;

        this.tarefas.push({ texto, concluida: false });
        this.salvarNoLocalStorage();
        this.renderizarLista();
        this.inputElement.value = "";
    }

    removerTarefa(index) {
        this.tarefas.splice(index, 1);
        this.salvarNoLocalStorage();
        this.renderizarLista();
    }

    alternarTarefa(index) {
        this.tarefas[index].concluida = !this.tarefas[index].concluida;
        this.salvarNoLocalStorage();
        this.renderizarLista();
    }

    renderizarLista() {
        this.listaElement.innerHTML = "";
        this.tarefas.forEach((tarefa, index) => {
            const li = document.createElement("li");
            li.textContent = tarefa.texto;
            li.classList.toggle("completed", tarefa.concluida);
            
            li.addEventListener("click", () => this.alternarTarefa(index));

            const botaoRemover = document.createElement("button");
            botaoRemover.textContent = "❌";
            botaoRemover.addEventListener("click", (event) => {
                event.stopPropagation();
                this.removerTarefa(index);
            });

            li.appendChild(botaoRemover);
            this.listaElement.appendChild(li);
        });
    }
}

new ListaTarefas();

