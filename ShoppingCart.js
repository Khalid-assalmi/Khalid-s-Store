let cart = JSON.parse(localStorage.getItem("cart")) || [];
let addBtn = document.getElementById("addToCart");
let productsContianerInCart = document.querySelector(".productsContainerInCart");
if (addBtn) {
    addBtn.addEventListener("click", function() {
        cart.push({
            img: document.querySelector(".img").getAttribute("src"),
            des: document.querySelector(".description").textContent,
            price: parseFloat(document.querySelector(".price").textContent.replace("ريال", ""))
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("تم إضافة المتتج إلى السلة");
    });
} else {
    let settingsBtn = document.getElementById("settingsBtn");
    let searchInp = document.getElementById("searchInput");
    let searchBtn = document.getElementById("searchButton");
    let div = document.createElement("div");
    div.className = "settingsBox";
    let settingCard = document.createElement("div");
    settingCard.className = "settingCard";
    let conditions = document.createElement("a");
    conditions.textContent = "الشروط والأحكام";
    let conditionsIcon = document.createElement("i");
    conditionsIcon.className = "fa-solid fa-circle-info";
    let settingCard2 = document.createElement("div");
    settingCard2.className = "settingCard";
    let payment = document.createElement("a");
    payment.textContent = "الدفع و الاستلام"
    settingCard2.id = "paymentCard";
    let paymentIcon = document.createElement("i");
    paymentIcon.className = "fa-regular fa-credit-card";
    let settingCard3 = document.createElement("div");
    settingCard3.className = "settingCard";
    let socailMedia = document.createElement("a");
    socailMedia.textContent = "وسائل التواصل الاجتماعي";
    let socailMediaIcon = document.createElement("i");
    socailMediaIcon.className = "fa-brands fa-whatsapp";
    let turn = false;
    if (searchInp) {
        settingsBtn.addEventListener("click", (e) => {
            if (!turn) {
                settingsBtn.appendChild(div);
                div.append(settingCard, settingCard2, settingCard3);
                settingCard.append(conditions, conditionsIcon);
                settingCard2.append(payment, paymentIcon);
                settingCard3.append(socailMedia, socailMediaIcon);
                e.stopPropagation();
                turn = true;
            } else {
                turn = false;
            }
        });
        div.addEventListener("click", (e) => {
            e.stopPropagation();
        });
        document.addEventListener("click", () => {
        div.style.animationName = "hideSettingsBox";
        setTimeout(() => {
            div.style.animationName = "";
            div.remove();
        }, 40);
            turn = false;
        });
    }
    let totalClass = document.querySelector("#totalClass");
    let totalConainer = document.querySelector("#total");
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price;
    }
    totalConainer.textContent = totalPrice;
    displayProductsInCart();
    if (cart == "") {
        totalClass.style.display = "none";
        searchInp.style.display = "none";
    } else {
        totalClass.style.display = "";
        searchInp.style.display = "";
    }
}
function displayProductsInCart() {
    productsContianerInCart.innerHTML = "";
    for (let i = 0; i < cart.length; i++) {
        productsContianerInCart.innerHTML += `
        <div class="productInCartCard" onclick="productPage(${i})">
            <div class="productImg"><img src="${cart[i].img}"></div>
            <div class="productInfo">
                <h3>${cart[i].des}</h3>
                <p>${cart[i].price}</span><span id="cionIcon">&#xFDFC;</span></p>
            </div>
        </div>
        `;
    }
}