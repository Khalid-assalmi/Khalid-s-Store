let peymentCheckBox = document.createElement("div");
function peymentCheck() {
    peymentCheckBox.classList.add("peymentCheckBox");
    peymentCheckBox.innerHTML = `
        <h2>هل أنت متأكد من إتمام عملية الدفع؟</h2>
        <div class="peymentInfo">
            <p>إجمالي المشتريات: ${totalPrice.toFixed(2)} &#xFDFC;</p>
            <p>عدد المنتجات: ${cart.length}</p>
        </div>
        <div class="buttons">
            <button id="cancelPeyment" onclick="cancelPeyment()">لا، إلغاء</button>
            <button id="confirmPeyment">نعم، أكمل الدفع</button>
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