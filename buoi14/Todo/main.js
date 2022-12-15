const todolist = document.getElementById("todolist");
const text = document.getElementById("text-input");
const add = document.getElementById("add");
const err = document.getElementById("error");
const APIURL = "http://localhost:8080/api/v1/todos";
let list_Todo = [];
const getTodos = async () => {
    // goi APi
    try {
        let res = await axios.get(APIURL);
        list_Todo = res.data;
        // Hien thi tren giao dien
        renderTodo(list_Todo);
    } catch (error) {

    }

}
const renderTodo = arr => {
    //console.log(arr);
    todolist.innerHTML = '';
    if (arr.length == 0) {
        todolist.innerHTML = '<li>Khong co cong viec</li>';
        return;
    }
    let html = '';
    arr.forEach(element => {
        html += `
    <li data-type=${element.id}>
        <input id="check" type="checkbox" ${element.status ? "checked" : ""}>
        <span class=${element.status ? "todo-active" : ""}>${element.title}</span>
        <button id="update-title">Update title</button>
        <button id="update-status">Update status</button>
        <button id="delete">Delete</button>
    </li>`
    });
    todolist.innerHTML = html;
    err.textContent = '';
    // Xóa todo
    let del = document.querySelectorAll("#delete");
    del.forEach(del1 => del1.addEventListener("click", async () => {
        try {
            let id = del1.parentElement.dataset.type;
            await axios.delete(APIURL + `/${id}`)
            list_Todo = list_Todo.filter(todo => todo.id != id);
            renderTodo(list_Todo);
        } catch (error) {
        }
    }));
    // Cập nhật todo
    let updateStatus = document.querySelectorAll("#update-status");
    updateStatus.forEach(up => up.addEventListener("click", async () => {
        try {
            let id = up.parentElement.dataset.type;
            let status = up.parentElement.firstElementChild.checked;
            axios.put(APIURL + `/${id}`,{
                status : status
            });
            list_Todo.forEach(function myFunction(todo) {
                if(todo.id == id){
                    todo.status = status;
                }
            });
            renderTodo(list_Todo);
        } catch (error) {
            console.log(error);
        }
    }));
    // title
    let updateTitle = document.querySelectorAll("#update-title");
    updateTitle.forEach(up => up.addEventListener("click", async () => {
        try {
            let id = up.parentElement.dataset.type;
            let title = text.value;
            axios.put(APIURL + `/${id}`,{
                title : title
            });
            list_Todo.forEach(function myFunction(todo) {
                if(todo.id == id){
                    todo.title = title;
                }
            });
            renderTodo(list_Todo);
        } catch (error) {
            console.log(error);
        }
    }));
};
// Thêm todo
add.addEventListener("click", async () => {
    // {"title": "Đi bơi"}
    try {
        if(text.value == ''){
            err.textContent = 'Không được add todo rỗng!!!'
            return;
        }
        let res = await axios.post(APIURL, {
            title : text.value
        });
        list_Todo.push(res.data);
        renderTodo(list_Todo);
    } catch (error) {
    }
});
// goi khi vua vao trang
getTodos();