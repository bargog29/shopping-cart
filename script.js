const shop = document.getElementById('shop');

// console.log(shop);

const shopData = [
{
    id:'1st',
    name: 'Nike T-Shirt V1',
    price: 69,
    description: 'Ullamco ea incididunt id fugiat',
    img: 'images/f1.jpg'
}, 
{
    id:'2nd',
    name: 'Nike T-Shirt V2',
    price: 35,
    description: 'Ullamco ea incididunt id fugiat',
    img: 'images/f2.jpg'
}, 
{
    id:'3rd',
    name: 'Nike T-Shirt V3',
    price: 34,
    description: 'Ullamco ea incididunt id fugiat',
    img: 'images/f3.jpg'
}, 
{
    id:'4th',
    name: 'Nike T-Shirt V4',
    price: 10,
    description: 'Ullamco ea incididunt id fugiat',
    img: 'images/f4.jpg'
}
];

let generateShop = () => {
    return (shop.innerHTML = shopData.map((data) => {
        // console.log(data);
        let {id, name, price, description, img} = data;
        return`
            <div id=prod-id-${id} class="item">
            <img src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${description}</p>
                <div class="price-quantity">
                    <h2>$${price}</h2>
                    <div class="buttons">
                        <i class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">0</div>
                        <i class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>`
    }).join(''));
};

generateShop();