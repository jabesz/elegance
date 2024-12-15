// Adiciona event listeners globais para botões
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
        adicionarAoLook(product);
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

document.addEventListener("click", (event) => {
  const button = event.target;

  // Verifique se o botão clicado tem a classe 'action-button'
  if (button.classList.contains('action-button')) {
    const action = button.dataset.action;
    const product = button.dataset.product;

    console.log('Ação:', action); // Log para verificar a ação
    console.log('Produto:', product); // Log para verificar o produto

    switch (action) {
      case 'verDetalhes':
        abrirModalDetalhes(product);
        break;
      case 'adicionarAoCarrinho':
        adicionarAoCarrinho(product);
        break;
      default:
        console.warn('Ação não reconhecida:', action);
    }
  }
});

function abrirModalDetalhes(produto) {
  if (!produto) {
    alert('Produto não encontrado.');
    return;
  }

  fecharModal(); // Fechar qualquer modal aberto

  // Buscando os elementos diretamente usando o ID do produto
  const imgElement = document.querySelector(`#${produto}-img`);
  const descElement = document.querySelector(`#${produto}-desc`);
  const priceElement = document.querySelector(`#${produto} .price`);
  const availabilityElement = document.querySelector(`#${produto} .availability`);
  const ratingElement = document.querySelector(`#${produto} .rating span`);

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="fecharModal()">&times;</span>
      <h2>${produto}</h2> <!-- Nome do produto -->
      <img src="${imgElement ? imgElement.src : ''}" alt="${produto}" class="modal-image">
      <p>${descElement ? descElement.textContent : 'Descrição não disponível.'}</p>
      <p class="price">${priceElement ? priceElement.textContent : 'Preço não disponível.'}</p> <!-- Preço -->
      <p class="availability">${availabilityElement ? availabilityElement.textContent : 'Sem informação de estoque.'}</p> <!-- Disponibilidade -->
      <div class="rating">
        <span>${ratingElement ? ratingElement.textContent : '★★★★★'}</span> <!-- Avaliação -->
      </div>
      <button class="add-to-cart">Adicionar ao Carrinho</button>
    </div>
  `;

  document.body.appendChild(modal);
}

function abrirModalLeiaMais() {
  fecharModal(); // Fechar qualquer modal aberto

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="fecharModal()">&times;</span>
      <h2>Sobre a Elegance</h2>
      <p>A Elegance é uma marca inovadora que oferece roupas modulares, sustentáveis e elegantes para todas as ocasiões. Nossa missão é unir moda e sustentabilidade, proporcionando peças versáteis que se adaptam ao seu estilo de vida. Escolha Elegance e transforme sua maneira de se vestir.</p>
    </div>
  `;

  document.body.appendChild(modal);
}

function fecharModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
  }
}

function logout() {
  // Exemplo de como limpar os dados de sessão e redirecionar
  localStorage.removeItem('usuarioLogado'); // Exemplo se você estiver usando localStorage
  sessionStorage.removeItem('usuarioLogado'); // Exemplo se você estiver usando sessionStorage
  window.location.href = '../frontend/login.html'; // Redireciona para a página de login
}
