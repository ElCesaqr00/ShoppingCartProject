
async function getApi (){
  const url = "https://ecommercebackend.fundamentos-29.repl.co";
  try {
    const data = await fetch(url);
    const res = await data.json();
    localStorage.setItem("articles", JSON.stringify(res))
    return res
  } catch (error) {
    console.log(error);
  }
}

async function dataBase () {
  const dataBase = {
    products: JSON.parse(localStorage.getItem("articles")) || await getApi(),
    cart: JSON.parse(localStorage.getItem("cart"))|| {} ,
}
return dataBase
}
function htmlProducts (articles) {
  const articlesOnHtml = document.querySelector(".central_items");
  let index = "";
  for (const items of articles) {
    const {id, image, description, name, price} = items;
    index += `<div class="product_container"><div id=${id} class="singleArticle">
              <figure class="singleArticle__img">
              <img src=" ${image}" alt="">
              </figure>
              <h2>${name}</h2>
              <div class="singleArticle__colors">
              <section class="Color1"></section>
              <section class="Color2"></section>
              </div>
              <button class="details" onclick="btn_details_info()">Details</button>
              <p class="singleArticle__price"><span>$${price}.00</span></p>
              </div>
              </div>`
  }
  articlesOnHtml.innerHTML = index;
}
function nombre (id, products) {
  const containerDetails = document.querySelector(".description__items")
  let htmlItem = ""; 
  for (const items of products) {
  const {} = items ;
   if(id === items.id){
    htmlItem += `<div id=${items.id} class="container_detail" id="details_head">
              <figure class="details_img">
              <section class="font_detail_image"></section>
              <img src=" ${items.image}" class:"details__image" alt="">
              </figure>
              <div class="details__section2">
              <h2 class:"details__name">${items.name}</h2>
              <p class="details__price"><span>$${items.price}.00</span></p>
              <p class="description">${items.description} </p>
              <div class="colors">
              <section class="color1"></section>
              <section class="color2"></section>
              </div>
              <div class="btn__cartShop">
              <button class="addToCart">Añadir al carrito</button>
              </div>
              </div>
              </div>`
   };
    } containerDetails.innerHTML = htmlItem;
  }
function descriptionItem(descriptionArticle){
const test = document.querySelector(".central_items");
test.addEventListener("click", (event)=>{
  // console.log(event.target.classList.contains('details'));
  if (event.target.classList.contains('details')) {
    const id = +event.target.closest('.singleArticle').id;
    nombre(id, descriptionArticle);
   // console.log(id);
  }
})
}
function btn_details_info(db) {
  const cartButtons = document.querySelectorAll(".details");
  const cartButtonSec = document.querySelectorAll(".description__items");
  cartButtons.forEach(function(button, index) {
    button.addEventListener("click", function() {
      cartButtonSec[index].classList.toggle("show");
    });
  });
}
function btn_details_close() {
  const cartButton = document.querySelector(".close_details");
  const cartButtonSec = document.querySelector(".description__items");
  cartButton.addEventListener("click", function(){
    cartButtonSec.classList.remove("show");
  });
}
function btn_toggle () {
  const cartButton = document.querySelector(".header_cartShopping");
  const cartButtonSec = document.querySelector(".info_card_shopping");
  cartButton.addEventListener("click", function(){
    cartButtonSec.classList.toggle("active");
  });
}
function addToCart (db){
let cartList = document.querySelector(".description__items");
cartList.addEventListener("click", (event)=>{
 //console.log(event.target.classList.contains("addToCart"));
  if(event.target.classList.contains("addToCart")){
    let id = +event.target.closest(".container_detail").id;
    const articleId = db.products.find(element => element.id === id);
  //console.log(articleId);
    if (articleId.id in db.cart) {
      db.cart[articleId.id].amount++;      
    } else{
      articleId.amount = 1;
      db.cart[articleId.id] = articleId;
    }
    localStorage.setItem("cart",JSON.stringify(db.cart))
  }
});
}

async function main () {
  const db = await dataBase();
  htmlProducts(db.products);
  btn_toggle();
  descriptionItem(db.products);
  btn_details_info(db);
  addToCart(db);
}
main();