const axios = require("axios")
let addToCart = document.querySelectorAll(".add-to-cart")
let cartCounter = document.querySelector("#cartCounter")

function updateCart(cake) {
    axios.post("/update-cart", cake).then(res =>{
        cartCounter.innerText = res.data.totalQty
        console.log(res);
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener("click", () => {
        let cake = JSON.parse(btn.dataset.cake)
        updateCart(cake)
    })
})