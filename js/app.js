// Loaded Data From API
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// Show All Product In UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    // Fixed Image Issue, Rating Issue And Button Styles Issue Below
    div.innerHTML = `<div class="single-product">
      <div>
      <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h4>Rating: ${product.rating.rate} (Rated by ${product.rating.count} people)</h4>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button id="details-btn" class="btn btn-info">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal(); // Fixed Total Payment Amount Issue Here
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);//parseInt replaced By parseFloat For Fixing "Two Digit After Decimal Point" Bug
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  let total = convertedOldPrice + convertPrice;//Starting Place of Fixing two digit after decimal point for Main Price
  total = total.toFixed(2);
  document.getElementById(id).innerText = total;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    let totalTax = priceConverted * 0.2;//Starting Place of Fixing two digit after decimal point for Total Tax
    totalTax = totalTax.toFixed(2);
    setInnerText("total-tax", totalTax);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    let totalTax = priceConverted * 0.3;//Starting Place of Fixing two digit after decimal point for Total Tax
    totalTax = totalTax.toFixed(2);
    setInnerText("total-tax", totalTax);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    let totalTax = priceConverted * 0.4;//Starting Place of Fixing two digit after decimal point for Total Tax
    totalTax = totalTax.toFixed(2);
    setInnerText("total-tax", totalTax);
  }
};

//grandTotal update function
const updateTotal = () => {
  let grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax"); //Starting Place of Fixing two digit after decimal point for Total Price
  grandTotal = grandTotal.toFixed(2);
  document.getElementById("total").innerText = grandTotal;
};
