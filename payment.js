let peymentCheckBox = document.createElement("div");
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let purchases = JSON.parse(localStorage.getItem("purchases")) || [];
function peymentCheck() {
    peymentCheckBox.classList.add("peymentCheckBox");
    peymentCheckBox.innerHTML = `
        <h3 id="questionForPayment">هل أنت متأكد من إتمام عملية الدفع؟</h3>
        <div class="peymentInfo">
            <p>إجمالي المشتريات: ${totalPrice.toFixed(2)} &#xFDFC;</p>
            <p>عدد المنتجات: ${cart.length}</p>
        </div>
        <div class="buttons">
            <button id="cancelPeyment" onclick="cancelPeyment()">لا، إلغاء</button>
            <button onclick="completePayment()">نعم، أكمل الدفع</button>
        </div>
    `;
    document.body.appendChild(peymentCheckBox);
}
function cancelPeyment() {
    peymentCheckBox.style.animationName = "hide";
    setTimeout(() => {
        peymentCheckBox.remove();
        peymentCheckBox.style.animationName = "";
    }, 300);
}
if (document.getElementById("paymentBtn")) {
    peymentCheckBox.addEventListener("click", (event) => {
        event.stopPropagation();
    });
    document.getElementById("peymentBtn").addEventListener("click", (event) => {
        event.stopPropagation();
    });
    document.documentElement.addEventListener("click", () => {
        cancelPeyment();
    });
}
function completePayment() {
    if (info.length > 0) {
        window.location.href = "payment.html";
    } else {
        window.location.href = "enterData.html";
    }
}
function confirmPayment() {
    peymentCheckBox.classList.add("finallyPeymentCheckBox");
    peymentCheckBox.innerHTML = `
        <h3 id="questionForPayment">هل انت متأكد من استئناف الدفع؟</h3>
        <div id="confirmForSendTheOrder">
            <p>بموافقتك على إرسال الطلب تكون قد أقررت بقراءة
            <a>الشروط و الأحكام</a>
            و
            <a>طريقة الدفع و الاستلام</a>
            والموافقة عليهما.</p>
        </div>
        <div class="peymentInfo finallyCheckPaymentInfo">
            <p>إجمالي المشتريات: ${totalPrice.toFixed(2)} &#xFDFC;</p>
            <p>عدد المنتجات: ${cart.length}</p>
        </div>
        <div class="buttons">
            <button id="cancelPeyment" onclick="cancelPeyment()">لا، إلغاء</button>
            <button onclick="sendOrder()">أرسل الطلب</button>
        </div>
    `;
    document.body.appendChild(peymentCheckBox);
}
function sendOrder() {
    let order = "";
    for (let i = 0; i < cart.length; i++) {
        order += `
        المنتج ${i+1}:
        --------------
            كود المنتج: ${cart[i].pCode}
            سعر المنتج: ${cart[i].price} ريال
            عدد القطع: ${count[i]}
        -------------------------------
        `;
    }
    let massege = `
    - طلب جديد:
    ---------------- البيانات الشخصية ----------------

        الاسم: ~${info[0].name}~
        البريد الإلكتروني: ~${info[0].email}~
        رقم الهاتف: ~${info[0].phone}~
        العنوان: ~${info[0].address}~

    ------------------- الطلب -------------------
    ${order}

        الإجمالي: ${totalPrice.toFixed(2)} ريال

    ----------------- نهاية الطلب -----------------
    `;
    let whatsAppUrl = `https://wa.me/967783479908?text=${encodeURIComponent(massege)}`;
    window.open(whatsAppUrl, "_blank");

    let now = new Date();

    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let today = `${day} / ${month} / ${year}`;

    let hour = now.getHours();
    let minutes = now.getMinutes();

    for (let i = 0; i < cart.length; i++) {
        orders.push({
            date: today,
            hour: hour,
            minutes: minutes,
            info: [
                {
                    img: cart[i].img,
                    des: cart[i].des,
                    price: cart[i].price,
                    pCode: cart[i].pCode,
                    count: localStorage.getItem(`count${i}`) || 1
                }
            ]
        });
    }
    localStorage.setItem("orders", JSON.stringify(orders));
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "thanksPage.html";
}
let myPurchasesContainer = document.querySelector(".myPurchasesContainer");
function displayPurchases() {
    if (purchases.length > 0) {
        myPurchasesContainer.innerHTML = "<h3><b>- مشترياتي:</b></div>";
        for (let index = 0; index < purchases.length; index++) {
            for (let i = 0; i < purchases[index].info.length; i++) {
                myPurchasesContainer.innerHTML += `
                <div class="productInPurchasesCard" onclick="productPageInPurchases(${index}, ${i})">
                    <div class="productImg"><img src="${purchases[index].info[i].img}"></div>
                    <div class="count">
                        <span>&nbsp;&nbsp;&nbsp; ${purchases[index].info[i].count} &nbsp;&nbsp;&nbsp;</span>
                    </div>
                        <div class="productInfo">
                        <p>${purchases[index].info[i].price}<span id="cionIcon">&#xFDFC;</span></p>
                        <h3>${purchases[index].info[i].des}</h3>
                        <h6> تاريخ الطلب: ${purchases[index].date}</h6>
                    </div>
                </div>
             `
            }
        }
    } else {
        myPurchasesContainer.innerHTML = `
        <i class="fa-solid fa-bag-shopping"></i>
        <h3 class="noOrders">لا توجد مشتريات سابقة</h3>
        `;
    }
}
function productPageInPurchases(index, i) {
    let productDes = purchases[index].info[i].des;
    for (let i = 0; i < products.length; i++) {
        if (products[i].des == productDes) {
            sessionStorage.setItem("index", i);
            window.location.href = "product.html";
        }
    }
}
if (myPurchasesContainer) {
    displayPurchases();
}