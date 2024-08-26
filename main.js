let wrapper = document.querySelector("#wrapper");
let BOT_TOKEN = '7221678251:AAFV89Oa9ELmcJsDCbU4y20Y_sX_NYws3os'
let CHAT_ID = '-1002075267842'

fetch("https://fakestoreapi.com/products")
    .then((request) => request.json())
    .then((response) => {
        console.log(response);
        response.map((item) => {
            let card = document.createElement("div");
            card.className = "card bg-base-100 flex-1 min-w-64 shadow-xl";
            card.innerHTML = `
        <figure>
          <img
            src=${item.image}
            class="w-full h-44 object-cover"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-sm h-20">
            ${item.title}
            <div class="badge badge-secondary">NEW</div>
          </h2>
          <p class="text-xs h-10">${item.description.length > 66 ? item.description.slice(0, 66) + "..." : item.description}</p>
          <div class="flex justify-between items-center">
            <p class="text-accent">$${item.price}</p>
            <button class="btn btn-primary" data-title="${item.title} data-price="${item.price} data-image="${item.image}">Купить</button>
          </div>
        </div>
        `;



            wrapper.appendChild(card);
        });

        let buttons = document.querySelectorAll(".btn-primary");

        buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
                let title = event.target.getAttribute("data-title");
                let price = event.target.getAttribute("data-price");
                let image = event.target.getAttribute("data-image");
                let ism = prompt("ism yoz")
                sendToTelegram(title, price, image, ism);
            });
        });
    });

function sendToTelegram(product, price, image, fromName) {
    let message = `*${fromName}*\n\n*${product}*\n\nКуплено за: *$${price}[Ссылка на товар](${image})`
    let URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id-${CHAT_ID}&parse_mode=Markdown&text-${encodeURIComponent(message)}`;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}