let skis = [];

const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent the form from submitting normally

    // Get the values from the form
    const price = document.getElementById('price').value;
    const brand = document.getElementById('brand').value;
    const wear = document.getElementById('wear').value;
    const width = document.getElementById('width').value;
    const length = document.getElementById('length').value;
    const image = document.getElementById('image').value;

    // Create an object to store the data
    const newItem = {
        price: price,
        brand: brand,
        wear: wear,
        width: width,
        length: length,
        image: image
    };

    // Add the new item to the array
    skis.push(newItem);

    // Reset the form
    form.reset();
});
