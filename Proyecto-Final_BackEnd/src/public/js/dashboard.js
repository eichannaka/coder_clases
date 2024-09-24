let premium = false;
let user = false;
let admin = false;
function isAdmin() {
  admin ? (admin = false) : (admin = true);
}
function isUser() {
  user ? (user = false) : (user = true);
}
function isPremium() {
  premium ? (premium = false) : (premium = true);
}
function changeRole(uid) {
  if ((admin && premium) || (admin && user) || (user && premium)) {
    Toastify({
      text: "Seleccione solo un rol",
      duration: 2000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
      },
    }).showToast();
  }
  if (admin) {
    fetch(`https://e-commercecoderhouse-production.up.railway.app/api/auth/premium/${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "admin",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "succses") {
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
          }, 2000);
        }
        if (data.status === "error") {
          Toastify({
            text: data.message,
            duration: 2000,
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
  if (premium) {
    fetch(`https://e-commercecoderhouse-production.up.railway.app/api/auth/premium/${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "premium",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "succses") {
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
          }, 2000);
        }
        if (data.status === "error") {
          Toastify({
            text: data.message,
            duration: 2000,
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
  if (user) {
    fetch(`https://e-commercecoderhouse-production.up.railway.app/api/auth/premium/${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "user",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "succses") {
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
          }, 2000);
        }
        if (data.status === "error") {
          Toastify({
            text: data.message,
            duration: 2000,
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
  if (!admin && !premium && !user) {
    Toastify({
      text: "Seleccione almenos un rol",
      duration: 2000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
      },
    }).showToast();
  }
}
function deleteUser(uid) {
  if (!uid) {
    Toastify({
      text: "Porfavor indique un ID para eliminar ",
      duration: 2000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
      },
    }).showToast();
  }
  fetch(`https://e-commercecoderhouse-production.up.railway.app/api/auth/deleteUser/${uid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "succses") {
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
        }, 2000);
      }
      if (data.status === "error") {
        Toastify({
          text: data.message,
          duration: 2000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
          },
        }).showToast();
      }
    })
    .catch((err) => {
      console.error("Error fetch deleteUser", error);
      Toastify({
        text: err.message,
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
        },
      }).showToast();
    });
}
