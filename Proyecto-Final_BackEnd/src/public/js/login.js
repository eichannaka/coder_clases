// Elementos
const email = document.getElementById("email_login");
// const password = document.getElementById("password_login");
const formLogin = document.getElementById("form_login");
const loginGithub = document.getElementById("login_github");
const recovery = document.getElementById("recovery");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    email: e.target[0].value,
    password: e.target[1].value,
  };
  fetch(
    `https://e-commercecoderhouse-production.up.railway.app/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "Error") {
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

      if (data.status === "Successful") {
        Toastify({
          text: "Redireccionando",
          duration: 2000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
        setTimeout(() => {
          window.location.assign(`https://e-commercecoderhouse-production.up.railway.app/home`);
        }, 1800);
      }
    })
    .catch((e) => console.log("*** ERROR ***", e));
});

loginGithub.addEventListener("click", (e) => {
  e.preventDefault();
  Toastify({
    text: "Redireccionando",
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
    },
  }).showToast();
  location.assign(`https://e-commercecoderhouse-production.up.railway.app/api/auth/login/github`);
});
recovery.addEventListener("click", () => {
  try {
    fetch(`https://e-commercecoderhouse-production.up.railway.app/api/mailer/recovery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
        if (data.status === "succses") {
          Toastify({
            text: "Correcto",
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
            },
          }).showToast();
          setTimeout(() => {
            window.location.assign(`https://e-commercecoderhouse-production.up.railway.app/recoveryPass`);
          }, 1800);
        }
      })
      .catch((err) => console.log("ERROR---", err));
  } catch (error) {
    console.log("ERROR---CATCH", error);
  }
});
