const form = document.getElementById('form');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const button = document.getElementById('button');

form.onsubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((response) => {
        localStorage.setItem('token', response.token)
    })
}

button.onclick = () => {
    fetch('http://localhost:8080/users/private', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
    })
}