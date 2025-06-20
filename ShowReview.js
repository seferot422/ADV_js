const listProducts = document.querySelector(".reviews");

for (let i = 0; i < localStorage.length; i++) {
    let product = localStorage.key(i);
    let reviewSet = JSON.parse(localStorage.getItem(product));

    const divProduct = document.createElement("div");
    listProducts.insertAdjacentElement("beforeend", divProduct);
    divProduct.insertAdjacentHTML(
        "beforeend",
        `<h2>${product} <button onclick="openReview(this)">показать отзывы</button> </h2>`
    );

    const divReviews = document.createElement("div");
    divReviews.hidden = true;
    divProduct.insertAdjacentElement("beforeend", divReviews);

    reviewSet.forEach((element) => {
        const newReview = document.createElement("div");
        divReviews.insertAdjacentElement("beforeend", newReview);

        const reviewText = document.createElement("span");
        reviewText.textContent = element;
        newReview.insertAdjacentElement("beforeend", reviewText);

        newReview.insertAdjacentElement(
            "beforeend",
            deleteReviewBtn(reviewText, reviewSet, product)
        );
    });
}

function deleteReviewBtn(textReview, setReview, product) {
    const delBtn = document.createElement("button");
    delBtn.textContent = "Удалить";

    delBtn.addEventListener("click", () => {
        if (setReview.length > 1) {
            let indexItem = setReview.findIndex(
                (element) => element === textReview.textContent
            );
            setReview.splice(indexItem, 1);
            localStorage.setItem(product, JSON.stringify(setReview));
        } else {
            localStorage.removeItem(product);
            delBtn.parentElement.parentElement.parentElement.remove();
        }
        textReview.parentElement.remove();
        delBtn.remove();
    });

    return delBtn;
}

function openReview(elem) {
    let hiddenElement = elem.parentElement.parentElement.lastChild;
    if (hiddenElement.hidden) {
        hiddenElement.hidden = false;
        elem.textContent = "скрыть отзывы";
    } else {
        hiddenElement.hidden = true;
        elem.textContent = "показать отзывы";
    }
}
