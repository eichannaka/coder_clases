// Elementos del DOM
const formRegister = document.getElementById("form_register");

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
   const user = {
    first_name: e.target[0].value,
    last_name: e.target[1].value,
    age: e.target[2].value,
    email: e.target[3].value,
    password: e.target[4].value,
  };
  fetch(`https://e-commercecoderhouse-production.up.railway.app/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.status === 400) {
        Toastify({
          text: "Faltan campos a rellenar",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
          },
        }).showToast();
      }

      if (res.status === 500) {
        console.log("Error 500", res.statusText, "Pruebe de vuelta");
        Toastify({
          text: "No se pudo crear el usuario",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      }
      if (res.status === 200) {
        Toastify({
          text: "Redireccionando",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
        window.location.assign("https://e-commercecoderhouse-production.up.railway.app/home");
      }
    })
    .catch((e) => console.log("*** ERROR ***", e));
});
