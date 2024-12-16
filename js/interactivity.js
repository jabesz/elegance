document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', (event) => {
    const button = event.target;
    if (button.classList.contains('action-button')) {
      const action = button.dataset.action;
      const product = button.dataset.product;

      switch (action) {
        case 'verLooks':
          window.location.href = '#produtos';
          break;

        case 'logout':
          alert('Logout realizado com sucesso!');
          window.location.href = "login.html";
          break;

        case 'adicionarAoLook':
          adicionarAoLook(product, button);
          break;

        case 'verDetalhes':
          verDetalhes(product);
          break;

        case 'leiaMais':
          abrirModalLeiaMais();
          break;

        default:
          console.warn('Ação não reconhecida:', action);
      }
    }
  });
});

function adicionarAoLook(produto) {
  if (!produto) {
    alert('Produto não encontrado.');
    return;
  }

  const imgElement = document.querySelector(`#${produto}-img`);
  const descElement = document.querySelector(`#${produto}-desc`);

  const produtoSelecionado = {
    name: produto,
    img: imgElement ? imgElement.src : '',
    description: descElement ? descElement.textContent : ''
  };

  let lookItems = JSON.parse(localStorage.getItem('lookItems')) || [];
  lookItems.push(produtoSelecionado);
  localStorage.setItem('lookItems', JSON.stringify(lookItems));

  alert(`${produto} foi adicionado ao seu look com sucesso!`);
}

document.addEventListener('click', (event) => {
  const button = event.target;
  if (button.classList.contains('action-button')) {
    const action = button.dataset.action;
    const product = button.dataset.product;

    switch (action) {
      case 'verDetalhes':
        abrirModalDetalhes(product, button);
        break;

      case 'adicionarAoCarrinho':
        adicionarAoCarrinho(product);
        break;

      default:
        console.warn('Ação não reconhecida:', action);
    }
  }
});

function abrirModalDetalhes(produto, button) {
  if (!produto) {
    alert('Produto não encontrado.');
    return;
  }

  fecharModal();

  const productItem = button.closest('.product-item');
  if (!productItem) {
    alert('Produto não encontrado no DOM.');
    return;
  }

  const imgElement = productItem.querySelector('img');
  const descElement = productItem.querySelector('p:nth-child(3)');
  const priceElement = productItem.querySelector('.price');
  const availabilityElement = productItem.querySelector('.availability');
  const ratingElement = productItem.querySelector('.rating span');

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
    <span class="close" onclick="fecharModal()">&times;</span>
    <img src="${imgElement ? imgElement.src : ''}" alt="${produto.name}" class="modal-image">
    <p>${descElement ? descElement.textContent : 'Descrição não disponível.'}</p>
    <p class="price" style="color: #000000;">${priceElement ? priceElement.textContent : 'Preço não disponível.'}</p>
    <p class="availability" style="color: #28a745;">${availabilityElement ? availabilityElement.textContent : 'Sem informação de estoque.'}</p>
    <div class="rating">
      <span style="color: #ffd700;">${ratingElement ? ratingElement.textContent : '★★★★★'}</span>
    </div>
  </div>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
  .modal-content {
    max-height: 80vh; /* Definindo a altura máxima para o conteúdo */
    overflow-y: auto; /* Habilitando a rolagem vertical */
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
  document.head.appendChild(style);

  document.body.appendChild(modal);
}

function salvarProdutosNoLocalStorage() {
  const produtos = [];

  const productItems = document.querySelectorAll('.product-item');

  productItems.forEach(item => {
    const nome = item.querySelector('h3').textContent;
    const preco = item.querySelector('.price').textContent;
    const disponibilidade = item.querySelector('.availability').textContent;
    const avaliacao = item.querySelector('.rating span').textContent;
    const imagem = item.querySelector('img').src;

    const produto = {
      name: nome,
      price: preco,
      availability: disponibilidade,
      rating: avaliacao,
      img: imagem
    };

    produtos.push(produto);
  });

  localStorage.setItem('allProducts', JSON.stringify(produtos));
}

window.onload = salvarProdutosNoLocalStorage;

function adicionarAoCarrinhoProduto(event) {
  const produtoNome = event.target.getAttribute('data-product');
  const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];

  console.log('Produtos no localStorage:', allProducts);

  const produtoSelecionado = allProducts.find(item => item.name === produtoNome);

  if (!produtoSelecionado) {
    alert('Produto não encontrado.');
    return;
  }

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(produtoSelecionado);

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  alert(`${produtoSelecionado.name} foi adicionado ao carrinho com sucesso!`);

  renderCart();
}

document.querySelectorAll('.action-button[data-action="adicionarAoCarrinhoProduto"]').forEach(button => {
  button.addEventListener('click', adicionarAoCarrinhoProduto);
});

function fecharModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
  }
}

function logout() {
  localStorage.removeItem('usuarioLogado');
  sessionStorage.removeItem('usuarioLogado');
  window.location.href = '../frontend/login.html';
}