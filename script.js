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
    searchBtn.style.display = "block";
    searchInp.style.maxWidth = "500px";
    searchInp.style.width = "60vw";
    searchInp.style.padding = "0 12px 0 30px";
    searchInp.style.borderRadius = "12px";
    setInterval(() => {
        if (searchInp.value) {
            searchBtn.style.removeProperty("--main");
        } else {
            searchBtn.style.setProperty("--main", "#3b3b3b");
        }
    });
}
searchInp.addEventListener("focus", appearAndHideSearchInput);
searchInp.addEventListener("input", appearAndHideSearchInput);
searchInp.addEventListener("blur", () =>  {
    searchBtn.style.display = "";
    searchInp.style.maxWidth = "";
    searchInp.style.width = "";
    searchInp.style.padding = "";
    searchInp.style.borderRadius = "";
});