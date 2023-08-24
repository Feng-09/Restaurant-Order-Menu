//"use strict";

/*variables*/
let menuItem = document.querySelectorAll(".item");
let expand = document.querySelectorAll(".itemAdd");
let pick = document.querySelectorAll(".pick");
let order = document.querySelector(".order");
let orderList = document.querySelector(".orderList");
const arr = [];
const costa = [];
let pay = document.querySelectorAll(".pay");
let popUp = document.querySelector(".popUp");
let bg = document.getElementById("bg");
let payInp = document.querySelectorAll(".payInp");
let err = document.querySelectorAll(".errMsg");
let success = document.querySelector(".success");
let cusName = document.getElementById("customerName");
let special = document.querySelector(".special");
let day = document.querySelector(".day");
let inp = document.querySelectorAll(".inp");

expand.forEach((item, i) => {
  item.addEventListener("click", () => {
    menuItem[i].classList.toggle("active");
  });
});

pick.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (event.target.nextElementSibling == null) {
      event.target.previousElementSibling.value++;
    } else {
      if (event.target.nextElementSibling.value == 0) {
      } else {
        event.target.nextElementSibling.value--;
      }
    }

    order.classList.add("active");

    let listItem = document.createElement("div");
    let qty = document.createElement("p");
    qty.classList.add("allQty");
    let itemName = document.createElement("h2");
    let rmv = document.createElement("span");
    rmv.classList.add("allRmv");
    rmv.innerHTML = "remove";
    let price = document.createElement("p");
    price.setAttribute("class", "cost");
    let itemPrice;

    var allQty = document.querySelectorAll(".allQty");
    var cost = document.querySelectorAll(".cost");

    if (event.target.nextElementSibling == null) {
      qty.innerHTML = event.target.previousElementSibling.value;
    } else {
      qty.innerHTML = event.target.nextElementSibling.value;
    }

    itemName.innerHTML = item.firstElementChild.childNodes[0].nodeValue;
    itemName.appendChild(rmv);

    if (item == pick[8]) {
      itemPrice = 0;
      price.innerHTML = "$" + itemPrice;
    } else {
      itemPrice =
        Number(
          item.parentElement.previousElementSibling.firstElementChild.nextElementSibling.lastElementChild.innerHTML
            .split("$")
            .join("")
        ) * Number(qty.innerHTML);
      price.innerHTML = "$" + itemPrice;
    }

    listItem.appendChild(qty);
    listItem.appendChild(itemName);
    listItem.appendChild(price);

    orderList.appendChild(listItem);

    if (arr.includes(itemName.childNodes[0].nodeValue)) {
      let n = arr.indexOf(itemName.childNodes[0].nodeValue);
      allQty[n].innerHTML = qty.innerHTML;
      cost[n].innerHTML = price.innerHTML;
      orderList.removeChild(listItem);
      costa[n] = itemPrice;
    } else {
      arr.push(itemName.childNodes[0].nodeValue);
      costa.push(itemPrice);
    }

    let totalCost = 0;
    for (let i of costa) {
      totalCost += i;
      orderList.nextElementSibling.lastElementChild.innerHTML = "$" + totalCost;
    }
  });
});

orderList.addEventListener("click", (event) => {
  let n = Array.from(orderList.childNodes).indexOf(
    event.target.parentElement.parentElement
  );
  orderList.removeChild(event.target.parentElement.parentElement);

  costa.splice(n, 1);
  arr.splice(n, 1);

  let totalCost = 0;
  for (let i of costa) {
    totalCost += i;
    orderList.nextElementSibling.lastElementChild.innerHTML = "$" + totalCost;
  }

  if (orderList.firstElementChild == null) {
    order.classList.remove("active");
  }
});

pay[0].addEventListener("click", () => {
  popUp.classList.add("active");
  bg.classList.add("active");
});

bg.addEventListener("click", () => {
  popUp.classList.remove("active");
  bg.classList.remove("active");
  err[0].innerHTML = "";
  err[0].classList.remove("active");
  payInp[0].classList.remove("active");
  err[1].innerHTML = "";
  err[1].classList.add("active");
  payInp[1].classList.remove("active");
  err[2].innerHTML = "";
  err[1].classList.add("active");
  payInp[2].classList.remove("active");
});

pay[1].addEventListener("click", () => {
  if (payInp[0].value == "") {
    err[0].innerHTML = "This field is required";
    err[0].classList.add("active");
    payInp[0].classList.add("active");
  } else {
    err[0].innerHTML = "";
    payInp[0].classList.remove("active");
  }

  if (payInp[1].value == "") {
    err[1].innerHTML = "This field is required";
    err[1].classList.add("active");
    payInp[1].classList.add("active");
  } else if (payInp[1].value.length > 16) {
    err[1].innerHTML = "Must be less than 16 digits";
    err[1].classList.add("active");
    payInp[1].classList.add("active");
  } else {
    err[1].innerHTML = "";
    payInp[1].classList.remove("active");
  }

  if (payInp[2].value == "") {
    err[2].innerHTML = "This field is required";
    err[2].classList.add("active");
    payInp[2].classList.add("active");
  } else if (payInp[2].value.length !== 3) {
    err[2].innerHTML = "Must be 3 digits";
    err[2].classList.add("active");
    payInp[2].classList.add("active");
  } else {
    err[2].innerHTML = "";
    payInp[2].classList.remove("active");
  }

  if (
    payInp[0].classList.contains("active") ||
    payInp[1].classList.contains("active") ||
    payInp[2].classList.contains("active")
  ) {
  } else {
    popUp.classList.remove("active");
    cusName.innerHTML = payInp[0].value;
    success.classList.add("active");
    bg.classList.remove("active");
    setTimeout(() => {
      success.classList.remove("active");
    }, 1000);

    order.classList.remove("active");

    for (let i of menuItem) {
      i.classList.remove("active");
    }

    for (let i of inp) {
      i.value = 0;
    }
  }
});
