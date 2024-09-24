const url = "http://localhost:8080";

//elementos
const product = document.getElementById("products");
const addToCartBtn = document.getElementById("add_to_cart");

// Datos del user
const currentFirst = document.getElementById("current_first");
const currentLast = document.getElementById("current_last");
fetch(`${url}/api/auth/current`, {
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    const fullName = data.userResponse.fullName.split(" ");
    const firstName = fullName[0];
    const lastName = fullName[1];
    currentFirst.innerText = `${firstName}`;
    currentLast.innerText = `${lastName}`;
  });
// Funcion definida en home.hbs
function agregar(pid) {
  // comprobar si existe carrito en localStorage...
  const cid = localStorage.getItem("cart_id");

  // si no existe el carrito en localStorage lo creo
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
      });
  }
  // si existe el carrito agrego el producto al carrito ya existente
  // El PID lo obtengo del template de la plantilla de handlebars
  fetch(`${url}/api/carts/${cid}/product/${pid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "Error") {
        Toastify({
          text: data.message,
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
          duration: 1400,
          gravity: "top",
          position: "right",
          close: true,
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
        setTimeout(() => {
          window.location.assign("http://localhost:8080/home");
        }, 1300);
      }
    })
    .catch((e) => console.error(e));
}
function seeOwner(pid) {
  fetch(`${url}/api/products/${pid}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      Swal.fire({
        title: `Nombre ${data.owner.first_name} ${data.owner.last_name}`,
        text: `Email: ${data.owner.email}`,
        icon: "info",
        confirmButtonText: "Close",
      });
    })
    .catch((err) => {
      Swal.fire({
        title: err.message,
        text: "err.code",
        icon: "error",
        confirmButtonText: "Cool",
      });
    });
}
