const paymentButton = document.getElementById("payment-button");
const toast = document.querySelector(".toast");
const closeIcon = document.querySelector(".toast__close");
const progress = document.querySelector(".toast__progress");

let paymentTime, progressTime;

paymentButton.addEventListener("click", () => {
    if (!toast.classList.contains("toast--active")) {
        toast.classList.add("toast--active");
        progress.classList.add("toast--active");

        paymentTime = setTimeout(() => {
            toast.classList.remove("toast--active");
        }, 5000); //1s = 1000 milliseconds

        progressTime = setTimeout(() => {
            progress.classList.remove("toast--active");
        }, 5300);
    }
});

closeIcon.addEventListener("click", () => {
    if (toast.classList.contains("toast--active")) {
        toast.classList.remove("toast--active");

        setTimeout(() => {
            progress.classList.remove("toast--active");
        }, 300);

        clearTimeout(paymentTime);
        clearTimeout(progressTime);
    }
});