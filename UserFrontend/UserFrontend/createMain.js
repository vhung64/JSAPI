const listAddress = document.getElementById("address");
const btnSave = document.getElementById("btn-save");
const nameUser = document.getElementById("name");
const emailUser = document.getElementById("email");
const phoneUser = document.getElementById("phone");
const passwordUser = document.getElementById("password");
const errorMess = document.getElementById("error");
const APIURL = "http://localhost:8080/api/v1";
const getProvinceVN = async () => {
    renderError('');
    try {
        let res = await axios.get('https://provinces.open-api.vn/api/p/');
        let html = '';
        res.data.forEach(e => {
            html += `<option>${e.name}</option>`;
        });
        listAddress.innerHTML = html;
    } catch (error) {
        console.log(error);
    }
};
btnSave.addEventListener("click", async () => {
    try {
        let nameDate = nameUser.value;
        let emailDate = emailUser.value;
        let phoneDate = phoneUser.value;
        let passwordDate = passwordUser.value;
        await axios.post(APIURL + `/users`, {
            name: nameDate,
            email: emailDate,
            phone: phoneDate,
            address: listAddress.value,
            password: passwordDate
        })
        nameUser.value = '';
        emailUser.value = '';
        phoneUser.value = '';
        passwordUser.value = '';
        renderError("Tao moi user thanh cong");
    } catch (error) {
        console.log(error);
    }

})
function renderError(str) {
    errorMess.innerHTML = str;
}

getProvinceVN();