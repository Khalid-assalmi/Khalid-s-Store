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
        function appearAndHideSearchInput() {
            searchBtn.style.opacity = "1";
            searchInp.style.maxWidth = "500px";
            searchInp.style.width = "60vw";
            searchInp.style.padding = "0 12px 0 30px";
            searchInp.style.borderRadius = "12px";
            setInterval(() => {
                if (searchInp.value) {
                    searchBtn.style.removeProperty("--main");
                } else {
                    searchBtn.style.setProperty("--main", "#474747");
                }
            });
        }
        searchInp.addEventListener("focus", appearAndHideSearchInput);
        searchInp.addEventListener("input", () => {
            appearAndHideSearchInput();
            if (searchInp.value.trim()) {
                searchContianer.style.display = "flex";
                document.body.style.overflow = "hidden";
                searchContianer.style.animationName = "";
                search();
            } else if (!searchInp.value.trim()) {
                searchContianer.style.animationName = "hide";
                setTimeout(() => {
                    searchContianer.style.display = "";
                    document.body.style.overflow = "";
                }, 300);
            }
        });
        searchInp.addEventListener("blur", () =>  {
            searchBtn.style.opacity = "";
            searchInp.style.maxWidth = "";
            searchInp.style.width = "";
            searchInp.style.padding = "";
            searchInp.style.borderRadius = "";
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
    } else {
        totalClass.style.display = "";
    }
}
function displayProductsInCart() {
    for (let i = 0; i < cart.length; i++) {
        productsContianerInCart.innerHTML += `
        <div class="productInCartCard" onclick="productPage(${i})">
            <div class="productImg"><img src="${cart[i].img}"></div>
            <div class="productInfo">
                <h3>${cart[i].des}</h3>
                <p>${cart[i].price} ريال</p>
            </div>
        </div>
        `;
    }
}
function productPage(indexOfProduct) {
    window.location.href = "product.html";
    sessionStorage.setItem("index", indexOfProduct);
}