function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';

  cartItems.forEach((item, index) => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p><strong>R$ ${item.price}</strong></p>
      <button onclick="excluirDoCarrinho(${index})">Excluir do Carrinho</button>
    `;
    cartList.appendChild(productItem);
  });
}

function excluirDoCarrinho(index) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  renderCart();
}

function finalizarCompra() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  if (cartItems.length === 0) {
    alert("Seu carrinho está vazio!");
  } else {
    alert("Compra finalizada com sucesso!");
    localStorage.removeItem('cartItems');
    renderCart();
  }
}

renderCart();
