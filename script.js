
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
    cart: {} ,
}
return dataBase
}
function htmlProducts (articles) {
  const articlesOnHtml = document.querySelector(".central_items");
  let index = "";
  for (const items of articles) {
    console.log(items);
    const {id, image, description, name, price} = items;
    index += `<div id=${id} class="singleArticle">
              <figure class="singleArticle__img">
              <img src=" ${image}" alt="">
              </figure>
              <h2>${name}</h2>
              <div class="singleArticle__colors">
              <section class="Color1"></section>
              <section class="Color2"></section>
              </div>
              <p class="singleArticle__price"><span>$${price}.00</span></p>
              </div>`
  }
  articlesOnHtml.innerHTML = index;
}
async function main () {
  const db = await dataBase();
 // console.log(db.products);
  htmlProducts(db.products);
}
main();