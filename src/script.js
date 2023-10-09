'use strict'

const shop = document.getElementById('shop');

// console.log(shop);

let generateShop = () => {
    return (shop.innerHTML = shopData.map((data) => {
        // console.log(data);
        let {id, name, price, description, img} = data;
        let search = counter.find((prod) => prod.id === id) || [];

        return`
            <div id=prod-id-${id} class="item">
            <img src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${description}</p>
                <div class="price-quantity">
                    <h2>$${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                            <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>`
    }).join(''));
};

let counter = JSON.parse(localStorage.getItem('products')) || [];

generateShop();

let increment = (id) => {
    let selectedItem = id;
    
    let search = counter.find((prod) => prod.id === selectedItem);

    if(!search){
        counter.push({
        id: selectedItem,
        item: 1,
    })
    }
    else search.item += 1;

    update(selectedItem);
    // console.log(counter);    
    localStorage.setItem("products", JSON.stringify(counter));

};

let decrement = (id) => {
    let selectedItem = id;
    
    let search = counter.find((prod) => prod.id === selectedItem);

    if(search === undefined) return;
    else if(search.item === 0) return;
    else search.item -= 1;

    update(selectedItem);
    counter = counter.filter((prod) => prod.item !== 0);

    // console.log(counter);
    localStorage.setItem("products", JSON.stringify(counter));
};

let update = (id) => {
    let search = counter.find((prod) => prod.id === id);
    // console.log(id);
    try {
        document.getElementById(id).innerHTML = search.item;
    } catch (error) {
        alert('Update failed. + :))'+'\n'+error);
    }
    newCounter();
};

let newCounter = () => {
    let cartIcon = document.getElementById('cart-counter');
    cartIcon.innerHTML = counter.map((prod) => prod.item)
    .reduce((prev, next) => prev+next,0);
};

newCounter();