const currentName = document.getElementById("first_name");
const currentLastName = document.getElementById("last_name");
const currentAge = document.getElementById("current_age");
const currentEmail = document.getElementById("current_email");
const userData = document.getElementById("user_data");
const logout = document.getElementById("btn_logout");
fetch("http://localhost:8080/api/auth/current", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    const fullName = data.userResponse.fullName.split(" ");
    const firstName = fullName[0];
    const lastName = fullName[1];
    currentName.innerText = `${firstName}`;
    currentLastName.innerText = `${lastName}`;
    currentEmail.innerText = `${data.userResponse.email}`;
    currentAge.innerText = `${data.userResponse.age || 0}`;
    if (data.userResponse.role === "admin" || "premium") {
      const p = document.createElement("p");
      p.setAttribute("class", "admin");
      p.innerText = `You are an ${data.userResponse.role}!`;
      userData.appendChild(p);
    }
  });

logout.addEventListener("click", () => {
  fetch("http://localhost:8080/api/auth/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status) {
        localStorage.clear();
        window.location.href = "http://localhost:8080/";
      }
      Toastify({
        text: "Error al salir de la session",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
        },
      }).showToast();
    })
    .catch((err) => console.log(err));
});
