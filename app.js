const productItems = document.querySelector(".productItems");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
//
let cart = [];

class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { img, title, price, id } = item;
        return { img, title, price, id };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `<div
                   class="name group relative col-span-12 md:col-span-6 lg:col-span-4 border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition ease-in-out duration-300">
                      <a href="productDetails.html"><img class="h-48 w-full object-cover" src=${product.img}
                       alt=""></a>
                     <div class="flex justify-between px-7 py-1">
                    <span class="font-semibold text-black">${product.title}</span>

  <button class="py-1 flex items-center bag-btn transform translate-x-60 group-hover:translate-x-0 transition duration-500 absolute right-0 top-5 bg-gray-50 hover:bg-blue-500 hover:text-white px-7 rounded-l-full bag-btn" data-id=${product.id}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 px-1 box-content">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg> Add to Cart</button>

                            <span class="font-semibold text-black">${product.price}</span>
                        </div>
                    </div>`;
    });
    productItems.innerHTML = result;
  }
  getBgBtns() {
    const btns = [...document.querySelectorAll(".bag-btn")];
    btns.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "in cart";
        button.disabled = true;
      } else {
        button.addEventListener("click", (event) => {
          event.target.innerText = "In cart";
          event.target.disabled = true;
        });
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBgBtns();
    });
});

// ABOUT PAGE
let bg = document.querySelector("#bg");
let moon = document.querySelector("#moon");
let mountain = document.querySelector("#mountain");
let road = document.querySelector("#road");
let text = document.querySelector("#text");

window.addEventListener("scroll", function () {
  let value = this.window.scrollY;

  bg.style.top = value * 0.5 + "px";
  moon.style.left = -value * 0.6 + "px";
  mountain.style.top = -value * 0.15 + "px";
  road.style.top = value * 0.15 + "px";
  text.style.top = value * 1 + "px";
});

//SEARCH ICON
$("#searchbtn").click(function () {
  $(".searchbox").toggleClass("hidden");
});

// HOME SLIDER
const slides = document.querySelectorAll(".imgg");
let i = 0;
function nextSlide() {
  slides[i].classList.remove("active");
  i = (i + 1) % slides.length;
  slides[i].classList.add("active");
}
function PrevSlide() {
  slides[i].classList.remove("active");
  i = (i - 1 + slides.length) % slides.length;
  slides[i].classList.add("active");
}

// HOME CONTENT CHANGE
const contentbox = document.querySelector(".contentbox");
const slideText = contentbox.querySelectorAll("div");
let j = 0;
function nextSlideText() {
  slideText[j].classList.remove("active");
  j = (j + 1) % slideText.length;
  slideText[i].classList.add("active");
}
function PrevSlideText() {
  slideText[j].classList.remove("active");
  j = (j - 1 + slideText.length) % slideText.length;
  slideText[j].classList.add("active");
}

//LOGIN VALIDATION
function val(elem) {
  // document.querySelector("#result").innerText = elem.value;
  if (isNaN(elem.value)) {
    document.querySelector("#result").innerText = "Please enter only numbers";
  } else {
    document.querySelector("#result").innerText = "";
    if (elem.value.length > 10) {
      document.querySelector("#result").innerText =
        "Please enter 10 digits only";
    } else {
      document.querySelector("#result").innerText = "";
    }
  }
}

//LOGIN BUTTON DISABLE
const inputField = document.getElementById("myInput");
const submitButton = document.getElementById("myButton");

inputField.addEventListener("input", () => {
  if (inputField.value.length != null) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

//SLIDER product
function updateSlider(slideAmount) {
  var sliderDiv = document.getElementById("sliderAmount");
  sliderDiv.innerHTML = slideAmount;
}

function backtozero() {
  var sliderDiv = document.getElementById("sliderAmount");
  sliderDiv.innerHTML = "100";
}

//BUTTON PLUS
var counter = 0;

function plus() {
  counter += 1;

  document.getElementById("counter").innerHTML = counter;
}

function minus() {
  if (counter > 0) {
    counter -= 1;
  }
  document.getElementById("counter").innerHTML = counter;
}
