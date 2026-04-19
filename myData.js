let info = JSON.parse(localStorage.getItem("info")) || [];
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let phoneInput = document.getElementById("phoneInput");
let addressInput = document.getElementById("addressInput");
let saveButton = document.getElementById("saveBtn");
let deleteButton = document.getElementById("deleteBtn");
let nextButton = document.getElementById("nextAfterEnterData");
if (saveButton) {
    saveButton.addEventListener("click", () => {
        info = [];
        let name = nameInput.value.trim();
        let email = emailInput.value.trim();
        let phone = phoneInput.value.trim();
        let address = addressInput.value.trim();
        let userInfo = {
            name: name,
            email: email,
            phone: phone,
            address: address
        };
        if (name === "" || email === "" || phone === "") {
            alert("Please fill in all fields.");
        } else {
            alert("Information saved successfully!");
            info.push(userInfo);
            localStorage.setItem("info", JSON.stringify(info));
        }
    });
    deleteButton.addEventListener("click", () => {
        if (info.length > 0) {
            alert("تم حذف البيانات السابقة بنجاح!");
            info = [];
            localStorage.removeItem("info");
            location.reload();
        }
    });
    loadInfo();
} else if (nextButton) {
    nextButton.addEventListener("click", () => {
        let name = nameInput.value.trim();
        let email = emailInput.value.trim();
        let phone = phoneInput.value.trim();
        let address = addressInput.value.trim();
        let userInfo = {
            name: name,
            email: email,
            phone: phone,
            address: address
        };
        if (name === "" || email === "" || phone === "") {
            alert("Please fill in all fields.");
        } else {
            info.push(userInfo);
            localStorage.setItem("info", JSON.stringify(info));
            window.location.href = "payment.html";
        }
    });
}
function loadInfo() {
    if (info.length > 0) {
        let userInfo = info[0];
        nameInput.value = userInfo.name;
        emailInput.value = userInfo.email;
        phoneInput.value = userInfo.phone;
        addressInput.value = userInfo.address;
    }
}