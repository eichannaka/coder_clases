// Elementos del DOM
const btnAddProduct = document.getElementById("btn-addProduct");
const btnDeleteProduct = document.getElementById("btn-deleteProduct");

const cid = localStorage.getItem("cart_id");

if (!cid) {
  fetch(`${url}/api/carts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const cartId = data.cart._id;
      localStorage.setItem("cart_id", cartId);
      window.location.reload();
    });
}

function addProduct(pid) {
  fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.data.status === "error") {
        Toastify({
          text: data.data.message,
          duration: 1400,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
          },
        }).showToast();
      }
      if (data.status === "Successful") {
        Toastify({
          text: data.message,
          duration: 2000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
        setTimeout(() => {
          window.location.reload();
        }, 1800);
      }
    })
    .catch((err) => console.log(err));
}

function deleteProduct(pid) {
  fetch(`http://localhost:8080/api/carts/${cid}/products/${pid}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "Successful") {
        Toastify({
          text: data.message,
          duration: 2000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
        setTimeout(() => {
          window.location.reload();
        }, 1800);
      }
      if (data.data.status === "error") {
        Toastify({
          text: data.data.message,
          duration: 1400,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
          },
        }).showToast();
      }
    })
    .catch((err) => console.log(err));
}
function goToBuy() {
  window.location.assign("http://localhost:8080/home");
}
function goToPay() {
  fetch(`${url}/api/carts/${cid}`)
    .then((response) => response.json())
    .then((data) => {
      const products = data.data.cartById.products;
      if (products.length == 0) {
        Toastify({
          text: "No hay productos en el carrito",
          duration: 1400,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
          },
        }).showToast();
      } else {
        window.location.assign(`http://localhost:8080/checkout?cart=${cid}`);
      }
    });
}
