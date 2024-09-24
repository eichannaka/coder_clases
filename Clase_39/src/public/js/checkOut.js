const productContainer = document.getElementById("productos");
const ticketContainer = document.getElementById("ticket");
const cardImg = document.getElementById("card_img");
const productTitle = document.getElementById("product_title");
const productDescription = document.getElementById("product_description");
const productQuantity = document.getElementById("product_quantity");
const productPrice = document.getElementById("product_price");
const codeTicket = document.getElementById("code_compra");
const compradorTicket = document.getElementById("comprador_compra");
const fechaTicket = document.getElementById("fecha_compra");
const totalTicket = document.getElementById("total_compra");
const volverAtras = document.getElementById("volver");
const cartId = localStorage.getItem("cart_id");

fetch(`http://localhost:8080/api/carts/${cartId}/purchase`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const cart = data.cart.cartById;
    const ticket = data.ticket;
    cart.products.forEach((product) => {
      productTitle.innerHTML = product._id.title;
      productDescription.innerHTML = product._id.description;
      productPrice.innerHTML = product._id.price;
      productQuantity.innerHTML = product.quantity;
      product._id.thumbnail.forEach((urlImg) => {
        cardImg.setAttribute("src", urlImg);
      });
    });
    codeTicket.innerHTML = ticket.code;
    compradorTicket.innerHTML = ticket.purchaser;
    fechaTicket.innerHTML = ticket.purchase_datetime;
    totalTicket.innerHTML = ticket.amount;
  });

volverAtras.addEventListener("click", () => {
  window.location.href = "http://localhost:8080/home";
});
