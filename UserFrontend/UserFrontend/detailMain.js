const nameUser = document.getElementById("fullname");
const emailUser = document.getElementById("email");
const phoneUser = document.getElementById("phone");
const passwordUser = document.getElementById("password");
const listAddress = document.getElementById("address");
const changePass = document.getElementById('btn-change-password');
const forgotPass = document.getElementById('btn-forgot-password');
const newPass = document.getElementById('new-password');
const oldPass = document.getElementById('old-password');
const btn_save = document.getElementById('btn-save');
const APIURL = "http://localhost:8080/api/v1/users/";
let url = document.location.href;
let id = url.substring(url.lastIndexOf('=') + 1);
let infoUser = {};
const getProvinceVN = async () => {
    try {
        let res = await axios.get('https://provinces.open-api.vn/api/p/');
        let html = '';
        res.data.forEach(e => {
            html += `<option>${e.name}</option>`;
        });
        listAddress.innerHTML = html;
        detailUsers();
    } catch (error) {
        console.log(error);
    }
};
const getUser = arr => {
    nameUser.value = arr.name;
    emailUser.value = arr.email;
    phoneUser.value = arr.phone;
    listAddress.value = arr.address;
}
const detailUsers = async () => {
    try {
        let res = await axios.get(APIURL + id);
        infoUser = res.data;
        getUser(infoUser);
    } catch (error) {
        console.log(error);
    }
};
changePass.addEventListener("click", async () => {
    let res = await axios({
        method: 'put',
        url: `${APIURL}${id}/update-password`,
        data: {
            oldPassword: oldPass.value,
            newPassword: newPass.value
        }
    });
    alert("Doi mat khau thanh cong")
    console.log(res);
})
forgotPass.addEventListener("click", async () => {
    let res = await axios({
        method: 'post',
        url: `${APIURL}${id}/forgot-password`
    });
    alert("Password moi la : " + res.data);
})
btn_save.addEventListener("click", async () => {
    let res = await axios({
        method: 'put',
        url: `${APIURL}${id}`,
        data: {
            name : nameUser.value,
            email : emailUser.value,
            phone : phoneUser.value,
            address : listAddress.value,
            avatar : infoUser.avatar
        }
    });
    infoUser = res.data;
    getUser(infoUser);
});
getProvinceVN();