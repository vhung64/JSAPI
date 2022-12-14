const bmi = document.getElementById("bmi");
const getBTN = document.getElementById("getBTN");
const postBTN = document.getElementById("postBTN");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
postBTN.addEventListener("click", async () => {
    try {
        let res = await axios.post("http://localhost:8080/bmi",{
            height : height.value,
            weight : weight.value
        });
        bmi.innerHTML = res.data;
        console.log(res)
    } catch (error) {
        
    }
})

getBTN.addEventListener("click", async () => {
    try {
        let res = await axios.get(`http://localhost:8080/bmi?height=${height.value}&weight=${weight.value}`);
        bmi.innerHTML = res.data;
    } catch (error) {

    }

});

