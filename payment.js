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
            <button id="confirmPeyment" onclick="completePayment()">نعم، أكمل الدفع</button>
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
peymentCheckBox.addEventListener("click", (event) => {
    event.stopPropagation();
});
document.getElementById("peymentBtn").addEventListener("click", (event) => {
    event.stopPropagation();
});
document.documentElement.addEventListener("click", () => {
    cancelPeyment();
});
let alertBox = document.createElement("div");
function completePayment() {
    sureBox.remove();
    alertBox.classList.add("sureBox");
    alertBox.id = "alertBox";
    alertBox.innerHTML = `
        <h3>تحتاج إلى تسجيل الدخول أولاً قبل إستئناف عملية الدفع!</h3>
        <div class="alertBtns">
            <a href="signIn.html">تسجيل الدخول</a>
            <button id="closeAlert" onclick="closeAlert()">إغلاق</button>
        </div>
    `;
    document.body.appendChild(alertBox);
    cancelPeyment();
}
function closeAlert() {
    alertBox.style.animationName = "hide";
    setTimeout(() => {
        alertBox.remove();
        alertBox.style.animationName = "";
    }
    , 300);
}