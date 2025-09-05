const getById = id => document.getElementById(id)

const closeCart = () => getById("cart").style = "display: none;"
const openCart = () => getById("cart").style = "display: block"
let total = null

let cart = []
const products = [
    { id: 1, name: "AEROREADY SHIRT", price: 25, image: "assets/images/product1.jpg" },
    { id: 2, name: "WIRELESS AIRBUDS", price: 100, image: "assets/images/product2.jpg" },
    { id: 3, name: "HOODED PARKA", price: 100, image: "assets/images/product3.jpg" },
    { id: 4, name: "STRAW METAL BOTTLE", price: 24.04, image: "assets/images/product4.jpg" },
    { id: 5, name: "METTLE SUNGLASSES", price: 50, image: "assets/images/product5.jpg" },
    { id: 6, name: "BLACK HAT", price: 50, image: "assets/images/product6.jpg" },
    { id: 7, name: "BACKpACK", price: 70, image: "assets/images/product7.jpg" },
    { id: 8, name: "ULTRABOST 22", price: 45, image: "assets/images/product8.jpg" }
];

const productsSection = document.querySelector('.products');

products.map((product, i) => {
    const productCard = document.createElement('div');
    productCard.className = 'card';

    productCard.innerHTML = `
    <img src="${product.image}" alt="product${product.name}">
    <p>${product.name}</p>
    <div class="price-icon">
    <p>$ ${product.price}</p>
    <p class="icon" onclick= addToCart(${product.id})><i class="fa-solid fa-bag-shopping fa-lg" style="color:white"  ></i></p>
    </div>
            `;

    productsSection.appendChild(productCard);
})

///////////////////////////////////////////////////////////////////

const renderInCart = () => {
    total=null
    const cartProductsSection = document.querySelector('.cartProducts');
    cartProductsSection.innerHTML = ""
    cart.map((product, i) => {

        const cartProduct = document.createElement('div');
        cartProduct.className = 'cartproduct';

        cartProduct.innerHTML = `
    <img src="${product.image}" alt="product1" width="25%">
                   <div class="detail">
                    <p>${product.name}</p>
                    <p>${product.price} $</p>
                    <input type="number" value="${product.quantity}" onchange="handleQuantity(event,${product.id})">
                   </div>
                   <div class="icon" onclick="delCartItem(${product.id})"><i class="fa-solid fa-trash" style="color: red;"></i></div>
                   `;
        cartProductsSection.appendChild(cartProduct);
        total = total + product.price*product.quantity;
        // console.log("total==>", total)
        getById("total").innerText=`Total $ ${total}`
    })
    if(cart.length==0){
        total=0
        getById("total").innerText=`Total $ ${total}`
    }
}

const handleQuantity = (e,productId) =>{
    const newQuantity = parseInt(e.target.value);
    if(newQuantity>=1){
        productInCart = cart.find(p => p.id === productId)
        productInCart.quantity=newQuantity
    }else{
        e.target.value=1
        productInCart.quantity=1
    }
    renderInCart()
}
//////////////////////////////////////////////////////////////////
const addToCart = (productId) => {
    const productToAdd = products.find(p => p.id === productId);
    const productInCart = cart.find(p => p.id === productId)
    if (productToAdd) {
        if (productInCart) {
            productInCart.quantity += 1;
            // productInCart.price = productInCart.price * productInCart.quantity;
        } else {
            cart.push({ ...productToAdd, quantity: 1 });
        }
        // console.log('Current cart:', cart);
        renderInCart()
    }
}

//////////////////////////////////////////////////////////////////
const delCartItem = (productId) =>{
    cart = cart.filter(p => p.id !== productId)
    renderInCart()
}
