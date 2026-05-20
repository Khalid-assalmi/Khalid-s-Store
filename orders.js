let ordersCon = document.querySelector(".ordersContainer");
function displayOrders() {
    if (orders.length > 0) {
        ordersCon.innerHTML = "<h3><b>- طلباتي:</b></div>";
        for (let index = 0; index < orders.length; index++) {
            for (let i = 0; i < orders[index].info.length; i++) {
                ordersCon.innerHTML += `
                    <div class="productInOrdersCard">
                        <div class="productImg"><img src="${orders[index].info[i].img}"></div>
                        <div class="count">
                            <span>&nbsp;&nbsp;&nbsp; ${orders[index].info[i].count} &nbsp;&nbsp;&nbsp;</span>
                        </div>
                            <div class="productInfo">
                            <p>${orders[index].info[i].price}<span id="cionIcon">&#xFDFC;</span></p>
                            <h3>${orders[index].info[i].des}</h3>
                            <h6> تاريخ الطلب: ${orders[index].date}</h6>
                        </div>
                        <div><button id="productState${i}">جار معالجة طلبك ...</button></div>
                    </div>
                `;
            }
        }
    }
}
function productState() {
    for (let index = 0; index < orders.length; index++) {
       for (let i = 0; i < orders[index].info.length; i++) {
            let btn = document.getElementById(`productState${i}`);

            let now = new Date();

            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let day = now.getDate();
            let today = `${day} / ${month} / ${year}`;

            let hour = now.getHours();
            let minutes = now.getMinutes();
            if (orders[index].info[i].date == today) {
                console.log(today);
            }
       }
    }
}
setInterval(productState, 1000)
if (ordersCon) {
    displayOrders();
}