let peymentCheckBox = document.createElement("div");
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
    let orders = "";
    for (let i = 0; i < cart.length; i++) {
        orders += `
        المنتج ${i+1}:
        --------------
            كود المنتج: ${cart[i].pCode}
            سعر المنتج: ${cart[i].price} ريال
            عدد القطع: ${count[i]}
        ------------***------------
        `;
    }
    let massege = `
    - طلب جديد:
    -[***============ البيانات الشخصية ===========***]-
        الاسم: ${info[0].name}
        البريد الإلكتروني: ${info[0].email}
        رقم الهاتف: ${info[0].phone}
        العنوان: ${info[0].address}
    -[***============== الطلب ==============***]-
    ${orders}
    -[***============== ***** ===============***]-
        الإجمالي: ${totalPrice.toFixed(2)} ريال
    -[***=============== نهاية الطلب ==============***]-
    `;
    let whatsAppUrl = `https://wa.me/967783479908?text=${encodeURIComponent(massege)}`;
    window.open(whatsAppUrl, "_blank");
}