'use strict';


const basketWindow = document.querySelector(`.basket`);
const basketTotalPrice = document.querySelector('.basketTotal'); 

document.querySelector(`.logo_basket`).addEventListener(`click`, () => {
    basketWindow.classList.toggle(`hidden`)
});

const basket = {};

document.querySelector(`.content_block`).addEventListener(`click`, event => {
    if (!event.target.closest(`.block_basket`)){
        return;
    }
    const BlockId = event.target.closest(`.block`);
    const id = +BlockId.dataset.id;
    const name = BlockId.dataset.name;
    const price = +BlockId.dataset.price;
    addInCart(id, name, price)
});

const basketNum = document.querySelector(`.logo_basket span`);
const basketTotalValue = document.querySelector(`.basketTotalValue`);
function addInCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {
            id: id,
            name: name,
            price: price,
            count: 0,
        };
    }
    basket[id].count++;
    basketNum.textContent = getTotalNumber();
    basketTotalValue.textContent = getTotalPrice();
    addTextToCart(id)
    }

function getTotalNumber () {
    const productsArr = Object.values(basket);
    let count = 0;
    for(const product of productsArr){
        return(count += product.count);
    }
}

function getTotalPrice () {
    const productsArr = Object.values(basket);
    let price = 0;
    for(const product of productsArr){
        price += product.price * product.count;
    }
    return(price)
}

function addTextToCart (id) {
    const basketRowWindow = basketWindow.querySelector
    (`.basketRow[data-Id="${id}"]`);
    if (!basketRowWindow) {
        addNewTextToCart(id);
        return; 
    }   
    basketRowWindow.querySelector('.productCount').textContent = basket[id].count;
    basketRowWindow.querySelector('.productTotalRow')
    .textContent = basket[id].count * basket[id].price;
}

function addNewTextToCart (productId) {
    const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId]
            .price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    basketTotalPrice.insertAdjacentHTML("beforebegin", productRow);
}
