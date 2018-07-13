const conn = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

conn.on("ReceiveMessage", (message) => {
    const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const encodedMsg = ": " + msg;
    const li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messages").appendChild(li);
});

conn.start().catch(err => console.error(err.toString()));

document.getElementById("send").addEventListener("click", event => {
    const message = document.getElementById("message").value;
    conn.invoke("SendMessage", message).catch(err => console.error(err.toString()));
    event.preventDefault();
});