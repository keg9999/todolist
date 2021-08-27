const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

const toDos = [];

function saveTodos(){   //toDos를 가져와서 로컬 스토리지에 저장
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
                        //JSON.stringify: 자바 스크립트 object를 string으로 바꿔줌. (로컬 스토리지에는 string만 저장 할 수 있다)
}

function deleteToDo(event){
    //console.log(event.target.parentNode);
    console.log(event);
}

function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.value = "x";
    delBtn.addEventListener("click", deleteTodo);

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);    //Array.push(): array안에 엘리먼트 하나를 넣음. 
    saveTodos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";   //엔터 누른후 텍스트 삭제
}

function loadTodos(){
    const loadedToDos = localStorage.getItem(TODOS_LS); // 'toDos'키값을 가진 벨류들을 찾아온다. 
    if(toDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintTodo(toDo.text)
        });
    }
}

function init(){
    loadTodos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
