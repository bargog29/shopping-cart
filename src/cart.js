let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let counter = JSON.parse(localStorage.getItem('products')) || [];

let newCounter = () => {
    let cartIcon = document.getElementById('cart-counter');
    cartIcon.innerHTML = counter.map((prod) => prod.item)
    .reduce((prev, next) => prev+next,0);
};

newCounter();

let generateProd = () => {
    if(counter.length !== 0) {
        // console.log('Not empty');
        return shoppingCart.innerHTML = counter
        .map((prod) => {
            let {id, item} = prod;
            let search = shopData.find((prod) => prod.id === id) || [];
            return `
                <div class="cart-prod">
                    <img width="100" src=${search.img} alt="" />
                    <div class="details">

                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${search.name}</p>
                                <p>$${search.price}</p>
                            </h4>
                            <i onclick="removeProd('${id}')" class="bi bi-x-lg"></i>
                        </div>

                        <div class="buttons">
                            <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                        </div>

                        <h3>$${item*search.price}</h3>
                    </div>
                </div>
            `
        }).join('')
    }
    else {
        // console.log('empty');
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Shopping Cart is empty :((</h2>
            <a href="index.html">
            <button class="home-button">Back To Main Page</button>
            </a>
        `;
    }

};

generateProd();

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
    generateProd();  
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

    generateProd();
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
    totalBill();
};

let removeProd = (id) => {
    let selectedItem = id;
    // console.log(selectedItem);
    counter = counter.filter((prod) => prod.id !== selectedItem);
    localStorage.setItem("products", JSON.stringify(counter));
    generateProd();
    newCounter();
    totalBill();
};

let clearCart = () => {
    counter = [];
    generateProd();
    localStorage.setItem("products", JSON.stringify(counter));
    newCounter();
};

let totalBill = () => {
    if(counter.length !== 0) {
        let bill = counter.map((prod) => {
            let {id, item} = prod;
            let search = shopData.find((prod) => prod.id === id) || [];
            return item * search.price;
        }).reduce((prev, next) => prev+next,0);
        // console.log(bill);
        label.innerHTML = `
            <h2>Total bill: $${bill}</h2>
            <button onclick="clearCart()" class="remove-products">Remove Products</button>
            <button class="checkout">Checkout</button>
        `;
    }
    else return;
};

totalBill();