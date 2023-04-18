const itemCards = document.querySelectorAll('.item-card');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupImage = document.getElementById('popup-image');
const popupPrice = document.getElementById('popup-price');
const popupBrand = document.getElementById('popup-brand');
const popupName = document.getElementById('popup-name');
const popupWear = document.getElementById('popup-wear');
const popupWidth = document.getElementById('popup-width');
const popupLength = document.getElementById('popup-length');
const popupBindings = document.getElementById('popup-bindings');
const closeButton = document.getElementById('close-button');

function popupFunction() {
    document.getElementById("popup").style.display = "block";
}

itemCards.forEach((itemCard) => {
    itemCard.addEventListener('click', () => {
        const itemId = itemCard.getAttribute('data-item-id');
        const itemTitle = itemCard.querySelector('h2').textContent;
        const itemImage = itemCard.querySelector('img').getAttribute('src');
        const itemPrice = itemCard.querySelector('p').textContent;
        const itemBrand = itemCard.getAttribute('data-brand');
        const itemName = itemCard.getAttribute('data-name');
        const itemWear = itemCard.getAttribute('data-wear');
        const itemWidth = itemCard.getAttribute('data-width');
        const itemLength = itemCard.getAttribute('data-length');
        const itemBindings = itemCard.getAttribute('data-bindings');

        popupTitle.textContent = itemTitle;
        popupImage.setAttribute('src', itemImage);
        popupPrice.textContent = itemPrice;
        popupBrand.textContent = `Brand: ${itemBrand}`;
        popupName.textContent = `Name: ${itemName}`;
        popupWear.textContent = `Wear: ${itemWear}`;
        popupWidth.textContent = `Width: ${itemWidth}`;
        popupLength.textContent = `Length: ${itemLength}`;
        popupBindings.textContent = `Bindings: ${itemBindings}`;

        popup.style.display = 'flex';
    });
});

closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const nameDisplay = document.querySelector('#name-display');
    nameDisplay.textContent = name;
});