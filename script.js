let settingsBtn = document.getElementById("settingsBtn");
let searchInp = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchButton");
let productsContianer = document.querySelector(".productsContianer");
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
let products = JSON.parse(localStorage.getItem("products")) || [];
let searchContianer = document.querySelector(".searchContianer");
function search() {
    if (products.length > 0) {
        searchContianer.innerHTML = `
        <div class="loadingBox">
            <div class="circle"></div>
            <span>جاري البحث عن منتجات تتطابق مع "${searchInp.value.trim()}"</span>
        </div>
        `;
        for (let i = 0; i < products.length; i++) {
            if (products[i].des.toLowerCase().includes(searchInp.value.trim().toLowerCase())) {
                setTimeout(() => {
                    searchContianer.innerHTML = "";
                }, 2905);
                setTimeout(() => {
                    searchContianer.innerHTML = "";
                }, 3100);
                setTimeout(() => {
                    searchContianer.innerHTML += `
                    <div class="productCard" onclick="productPage(${i})">
                        <div class="imgBox"><img src="${products[i].img}"></div>
                        <div class="priceBox"><span>${products[i].price}</span><span id="cionIcon">&#xFDFC;</span></div>
                        <div class="descriptionBox">${products[i].des}</div>
                    </div>
                `;
                }, 3110);
            } else if (!products[i].des.toLowerCase().includes(searchInp.value.trim().toLowerCase())){
                setTimeout(() => {
                    searchContianer.innerHTML = `<div class="notFoundMassege">
                    <i class="fa fa-search" id="searchIcon"></i>
                    <span>لا توجد نتائج بحث متطابقة مع "${searchInp.value.trim()}"</span>
                    </div>`;
                }, 3098);
            }
        }
    } else {
        searchContianer.innerHTML = `<div class="notFoundMassege"><i class="fa fa-triangle-exclamation" id="searchIcon"></i><span>حدث خطأ غير مقصود نتج عنه عدم تحميل المنتجات</span></div>`;
    }
}
function displayProducts() {
    fetch("products.json")
        .then(response => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                productsContianer.innerHTML += `
                <div class="productCard" onclick="productPage(${i})">
                    <div class="imgBox"><img src="${data[i].img}"></div>
                    <div class="priceBox"><span>${data[i].price}</span><span id="cionIcon">&#xFDFC;</span></div>
                    <div class="descriptionBox">${data[i].des}</div>
                </div>
                `;
            }
            localStorage.setItem("products", JSON.stringify(data));
        })
        .catch(err => console.log(err));
}
if (productsContianer) {
    displayProducts();
}
let index = sessionStorage.getItem("index");
function productPage(indexOfProduct) {
    window.location.href = "product.html";
    sessionStorage.setItem("index", indexOfProduct);
}
if (!searchContianer) {
    document.querySelector(".productImage").innerHTML = `<img class="img" src="${products[index].img}">`;
    document.querySelector(".price").innerHTML = `<div>${products[index].price}</div><div class="coin"></span><span id="cionIcon">&#xFDFC;</span></div>`
    document.getElementById("productDes").innerHTML = products[index].des;
}