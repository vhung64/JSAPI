const btnName = document.getElementById("name");
const h1color = document.getElementById("color");

// btnName.addEventListener("click", async function () {
//     try {
//         let res = await axios.get("http://localhost:8080/random-color?type=1");
//         document.body.style.backgroundColor = res.data;
//         h1color.innerHTML = res.data;
//     } catch (error) {
//     }
// });
// lang nghe toan nut
const btn = document.querySelectorAll("button");
btn.forEach((btn1, index) => btn1.addEventListener("click", async() => {
    try {
        console.log(btn1.dataset.type);
        let res = await axios.get(`http://localhost:8080/random-color?type=${index+1}`);
        document.body.style.backgroundColor = res.data;
        h1color.innerHTML = res.data;
    } catch (error) {
    }
}));