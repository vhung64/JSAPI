const tbody = document.getElementById("tbody");
const search = document.getElementById("search");
const APIURL = "http://localhost:8080/api/v1";
let list_User = []
const getUser = async () => {
    try {
        let res = await axios.get(`${APIURL}/usersall`);
        list_User = res.data;
        renderUser(list_User);
    } catch (error) {
        console.log(error);
    }
};
const renderUser = arr => {
    tbody.innerHTML = '';
    if (arr.length == 0) {
        tbody.innerHTML = '<li>Khong co User</li>';
        return;
    }
    let html = '';
    let temp = 0;
    arr.forEach(e => {
        html += `
        <tr>
            <td>${++temp}</td>
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td>${e.phone}</td>
            <td>${e.address}</td>
            <td>
                <a href="./detail.html?id=${e.id}" class="btn btn-success">Xem chi tiết</a>
                <button class="btn btn-danger">Xóa</button>
            </td>
        </tr>
        `
    });
    tbody.innerHTML = html;
    let btnDanger = document.querySelectorAll(".btn-danger");
    btnDanger.forEach(btn => btn.addEventListener("click", async () => {
        try {
            let stringHref = btn.parentElement.firstElementChild.href;
            let id = stringHref.substring(stringHref.lastIndexOf('=') + 1);
            await axios.delete(APIURL + `/users/${id}`);
            list_User = list_User.filter(user => user.id != id);
            renderUser(list_User);
        } catch (error) {
            console.log(error);
        }
    }));
}
function searchUser() {
    search.addEventListener("keydown", event => {
        if (event.key == "Enter") {
            if (search.value == '') {
                return;
            }
            let res = axios({
                method: "get",
                url: `${APIURL}/users/search?name=${search.value}`,
            })
            res
                .then((result) => {
                    list_User = result.data;
                    renderUser(list_User);
                }).catch((err) => {
                    console.log(err);
                });
        }
    });
}
getUser();
searchUser();