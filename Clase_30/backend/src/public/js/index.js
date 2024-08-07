const socket = io();

let userName = null;
let typingTimer;

if (!userName) {
    Swal.fire({
        title: "Welcome to chat!",
        input: "text",
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return "Your username is required!";
            }
        }
    }).then((input) => {
        userName = input.value;
        socket.emit('newUser', userName);
    })
}

const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btn.addEventListener('click', () => {
    socket.emit('chatMessage', {
        userName,
        message: message.value
    })
    message.value = "";
})

// Event listener para detectar cuando el usuario está escribiendo
message.addEventListener('keypress', () => {
    clearTimeout(typingTimer);
    socket.emit('startTyping', userName);    
});

// Event listener para detectar cuando el usuario ha dejado de escribir
message.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        socket.emit('stopTyping')
    }, 2000)
});

socket.on('messages', (data) => {
    actions.innerHTML = '';
    const chatRender = data.map((msg) => {
        return `<p><strong>${msg.userName}</strong>: ${msg.message}</p>`
    }).join(' ');

    output.innerHTML = chatRender;
});

socket.on('newUser', (userX) => {
    Toastify({
        text: `${userX} is logged in`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { }
    }).showToast();
});

socket.on('startTyping', (user) => {
    actions.innerHTML = `<p>${user} is writing a message...</p>`;
})

socket.on('stopTyping', (data) => {
    actions.innerHTML = '';
})
