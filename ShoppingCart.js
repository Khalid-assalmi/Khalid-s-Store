let cart = JSON.parse(localStorage.getItem("cart")) || [];
let addBtn = document.getElementById("addToCart");
let totalClass = document.querySelector("#totalClass");
let totalConainer = document.querySelector("#total");
let totalPrice = 0;
let productsContianerInCart = document.querySelector(".productsContainerInCart");
let countConianer = [];
let count = [];
if (addBtn) {
    addBtn.addEventListener("click", function() {
        cart.push({
            img: document.querySelector(".img").getAttribute("src"),
            des: document.querySelector(".description").textContent,
            price: parseFloat(document.querySelector(".price").textContent.replace("ريال", ""))
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].des == localStorage.getItem(`count${i}`)) {
                localStorage.removeItem(`count${i}`);
            }
        }
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
    displayProductsInCart();
    if (cart == "") {
        totalClass.style.display = "none";
        searchInp.style.display = "none";
    } else {
        totalClass.style.display = "";
        searchInp.style.display = "";
    }
}
function calculateTotalPrice() {
    totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * count[i] || cart[i].price;
        totalConainer.textContent = totalPrice.toFixed(2);
    }
}
function displayProductsInCart() {
    productsContianerInCart.innerHTML = "";
    if(cart.length === 0) {
        productsContianerInCart.innerHTML = `
        <div class="empty">
            <i class="fa-solid fa-basket-shopping"></i>
            <h3>لا توجد منتجات في السلة</h3>
        </div>
        `;
    } else {
        for (let i = 0; i < cart.length; i++) {
            productsContianerInCart.innerHTML += `
            <div class="productInCartCard" onclick="productPageInCart(${i})">
                <div class="productImg"><img src="${cart[i].img}"></div>
                <div class="count" onclick="event.stopPropagation()">
                    <button onclick="plus(${i})">+</button>
                    <span id="${i}">1</span>
                    <button onclick="subtract(${i})">-</button>
                </div>
                <div class="productInfo">
                    <p>${cart[i].price}</span><span id="cionIcon">&#xFDFC;</span></p>
                    <h3>${cart[i].des}</h3>
                </div>
            </div>
            `;
        }
    }
}
function productPageInCart(indexOfProduct) {
    let productDes = cart[indexOfProduct].des.split(":");
    for (let i = 0; i < products.length; i++) {
        if (products[i].des == productDes[1]) {
            sessionStorage.setItem("index", i);
            window.location.href = "product.html";
        }
    }
}
for (let i = 0; i < cart.length; i++) {
    countConianer[i]  = document.getElementById(i);
    count[i] = countConianer[i].textContent;
}
function plus(index) {
    count[index]++;
    localStorage.setItem(`count${index}`, count[index]);
    countConianer[index].textContent = count[index];
    calculateTotalPrice();
}
let sureBox = document.createElement("div");
function subtract(index) {
    if (count[index] > 0) {
        if (count[index] === 1) {
            sureBox.className = "sureBox";
            sureBox.innerHTML = `
            <h3>هل أنت متأكد من حذف هذا المنتج من السلة؟</h3>
            <div class="productInfoForSureBox">
                <img src="${cart[index].img}" alt="${cart[index].des}">
                <div class="productInfoForSureBoxText">
                    <p class="productInfoForSureBoxPrice">${cart[index].price} &#xFDFC;</p>
                    <p>${cart[index].des}</p>
                </div>
            </div>
            <div class="sureBtns">
                <button id="no" onclick="noForRemove()">لا</button>
                <button id="yes" onclick="yesForRemove(${index})">نعم</button>
            </div>
            `;
            document.body.appendChild(sureBox);
        } else {
            count[index]--;
            countConianer[index].textContent = count[index];
            localStorage.setItem(`count${index}`, count[index]);
            calculateTotalPrice();
        }
    }
}
function noForRemove() {
    alertBox.remove();
    sureBox.style.animationName = "hide";
    setTimeout(() => {
        sureBox.remove();
        sureBox.style.animationName = "";
    }, 200);
}
function yesForRemove(index) {
    sureBox.remove();
    localStorage.removeItem(`count${index}`);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}
sureBox.addEventListener("click", (event) => {
    event.stopPropagation();
});
document.documentElement.addEventListener("click", () => {
    noForRemove();
});
if (productsContianerInCart) {
    for (let i = 0; i < cart.length; i++) {
        count[i] = parseFloat(localStorage.getItem(`count${i}`)) || 1;
        countConianer[i].textContent = count[i];
        calculateTotalPrice();
    }
}
