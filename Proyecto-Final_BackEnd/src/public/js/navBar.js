const navegation = document.getElementById("navegation");

fetch(
  `https://e-commercecoderhouse-production.up.railway.app/api/auth/current`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    const cid = localStorage.getItem("cart_id");
    const uid = data.userResponse.id;
    if (!cid) {
      fetch(
        `https://e-commercecoderhouse-production.up.railway.app/api/carts/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const cartId = data.cart._id;
          localStorage.setItem("cart_id", cartId);
        })
        .catch((err) => console.log(err));
    }
    if (data.userResponse.role === "admin") {
      const a_products = document.createElement("a");
      const a2_products = document.createElement("a");
      a_products.setAttribute("href", "/realtimeproducts");
      a2_products.setAttribute("href", "/dashboard");
      a_products.innerText = "Manager Products";
      a2_products.innerText = "Dashboard";
      navegation.appendChild(a_products);
      navegation.appendChild(a2_products);
    }
    if (data.userResponse.role === "user") {
      const a_cart = document.createElement("a");
      const a_chat = document.createElement("a");
      a_cart.setAttribute("href", `/cart?cart=${cid}`);
      a_chat.setAttribute("href", "/chat");
      a_cart.innerText = "Cart";
      a_chat.innerText = "Chat";
      navegation.appendChild(a_cart);
      navegation.appendChild(a_chat);
    }
    if (data.userResponse.role === "premium") {
      const a_cart = document.createElement("a");
      const a_chat = document.createElement("a");
      const a_products = document.createElement("a");
      a_cart.setAttribute("href", `/cart?cart=${cid}`);
      a_chat.setAttribute("href", "/chat");
      a_cart.innerText = "Cart";
      a_chat.innerText = "Chat";
      a_products.setAttribute("href", `/realtimeproducts?uid=${uid}`);
      a_products.innerText = "Manager Products";
      navegation.appendChild(a_products);
      navegation.appendChild(a_cart);
      navegation.appendChild(a_chat);
    }
  });
