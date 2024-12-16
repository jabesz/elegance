function renderLook() {
  const lookItems = JSON.parse(localStorage.getItem('lookItems')) || [];
  const lookList = document.getElementById('look-list');

  lookList.innerHTML = '';

  console.log(lookItems);

  lookItems.forEach((item, index) => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');

    console.log(item.img);

    productItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}" style="width: 200px; height: auto;"> <!-- Definir uma largura fixa para testar -->
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <button class="action-button" onclick="adicionarAoCarrinho(${index})">Adicionar ao Carrinho</button>
      <button onclick="excluirDoLook(${index})">Excluir</button>
    `;

    lookList.appendChild(productItem);
  });

  if (lookItems.length === 0) {
    lookList.innerHTML = '<p>Nenhum look disponível no momento.</p>';
  }
}

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartList = document.getElementById('cart-list');

  cartList.innerHTML = '';

  cartItems.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}" style="width: 100px; height: 100px;">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>Preço: R$ ${item.price}</p>
      <p>Disponibilidade: ${item.availability}</p>
      <p>Avaliação: ${item.rating}</p>
    `;

    cartList.appendChild(cartItem);
  });

  if (cartItems.length === 0) {
    cartList.innerHTML = '<p>Nenhum item.</p>';
  }
}

function adicionarAoCarrinho(index) {
  const lookItems = JSON.parse(localStorage.getItem('lookItems')) || [];

  if (index < 0 || index >= lookItems.length) {
    alert('Item não encontrado.');
    return;
  }

  const produtoSelecionado = lookItems[index];

  produtoSelecionado.price = (Math.random() * 100).toFixed(2);
  produtoSelecionado.availability = 'Em estoque';
  produtoSelecionado.rating = '★★★★★';

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(produtoSelecionado);

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  lookItems.splice(index, 1);
  localStorage.setItem('lookItems', JSON.stringify(lookItems));

  alert(`${produtoSelecionado.name} foi adicionado ao carrinho!`);

  renderLook();
  renderCart();
}

function excluirDoLook(index) {
  const lookItems = JSON.parse(localStorage.getItem('lookItems')) || [];

  if (index < 0 || index >= lookItems.length) {
    alert('Item não encontrado.');
    return;
  }

  lookItems.splice(index, 1);
  localStorage.setItem('lookItems', JSON.stringify(lookItems));

  renderLook();
}

document.addEventListener('DOMContentLoaded', () => {
  renderLook();
  renderCart();
});
