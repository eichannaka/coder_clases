// Elementos del DOM
const newPass = document.getElementById("newPass");
const confirmPass = document.getElementById("confirmPass");
const form = document.getElementById("setPass");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const params = window.location.search;
  const uid = params.split("=")[1];
  if (newPass.value !== confirmPass.value) {
    Toastify({
      text: "The passwords are not the same",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
      },
    }).showToast();
  }
  if (!newPass.value || !confirmPass.value) {
    Toastify({
      text: "The field are not the complete",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
      },
    }).showToast();
  }
  fetch(
    `
  https://e-commercecoderhouse-production.up.railway.app/api/auth/setNewPass/${uid}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPass: newPass.value,
      }),
    }
  )
    .then((res) => res.json())
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
          window.location.assign(url);
        }, 1800);
      }
      if (data.status === "error") {
        Toastify({
          text: data.message,
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
          },
        }).showToast();
      }
    })
    .catch((err) => {
      console.log(err);
      Toastify({
        text: err.message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
        },
      }).showToast();
    });
});
