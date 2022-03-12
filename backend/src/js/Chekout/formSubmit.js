(function () {
  const formRef = document.querySelector('.form');

  if (!formRef) return;

  const BASE_URL = 'http://localhost:3000';

  formRef.addEventListener('submit', e => {
    e.preventDefault();

    const productCart = JSON.parse(localStorage.getItem('productCart'));
    const totalPrice = document.querySelector('.chekout__total-price');

    if (!productCart.length > 0) return;

    const products = productCart.map(({ id, quantity }) => ({
      productId: Number(id),
      quantity: Number(quantity),
    }));

    const date = new Date().toLocaleString();

    const formData = {
      orderData: {
        contact: formRef.elements.contact.value,
        newsletter: formRef.elements.newsletter.checked,
        firstName: formRef.elements.FirstName.value,
        lastName: formRef.elements.LastName.value,
        address: formRef.elements.address.value,
        apartments: formRef.elements.apartments.value,
        city: formRef.elements.city.value,
        country: formRef.elements.country.value,
        postalCode: formRef.elements.postalCode.value,
        totalPrice: totalPrice.innerText,
        date,
      },
      products,
    };

    fetch(`${BASE_URL}/order/chekout`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => console.log('Success', res))
      .catch(err => console.log('Error', err));
  });
})();
