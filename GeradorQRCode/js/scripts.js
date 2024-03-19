const container = document.querySelector(".container")
const qrCodeButton = document.querySelector("#qr-form button")
const qrCodeInput = document.querySelector("#qr-form input")
const qrCodeImg = document.querySelector("#qr-code img")

function generateQrCode() {
    const text = qrCodeInput.value;
    if (!text) return;

    qrCodeButton.textContent = "Generating Code...";

    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;

    qrCodeImg.addEventListener("load", () => {
        container.classList.add("active");
        qrCodeButton.textContent = "Code Created!";
    });
}

qrCodeButton.addEventListener("click", () => {
    generateQrCode();
})

qrCodeInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        generateQrCode();
    }
})

qrCodeInput.addEventListener("keyup", () => {
    if (!qrCodeInput.value) {
        container.classList.remove("active");
        qrCodeButton.textContent = "Generate QR Code";
    }
})