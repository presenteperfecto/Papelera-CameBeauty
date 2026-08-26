(function () {
  const state = {
    categoriaActiva: 'Todas'
  };

  function renderProductos() {
    const contenedor = document.getElementById('productos');
    if (!contenedor) return;

    const categoriaActiva = state.categoriaActiva || 'Todas';
    const productos = (window.catalogData && window.catalogData.productos) || [];
    const articulos = categoriaActiva === 'Todas'
      ? productos
      : productos.filter((producto) => producto.categoria === categoriaActiva);

    if (!articulos.length) {
      contenedor.innerHTML = '<div class="empty-state">No hay productos disponibles para esta categoría.</div>';
      return;
    }

    contenedor.innerHTML = articulos
      .map((producto) => {
        const atributos = [
          producto.medidas ? `<li><span>Medidas</span><strong>${producto.medidas}</strong></li>` : '',
          producto.color ? `<li><span>Color</span><strong>${producto.color}</strong></li>` : '',
          producto.peso ? `<li><span>Peso</span><strong>${producto.peso}</strong></li>` : '',
          producto.unidades ? `<li><span>Unidades</span><strong>${producto.unidades}</strong></li>` : ''
        ].filter(Boolean).join('');

        return `
          <article class="product-card">
            <div class="product-image" style="background-image: url('${producto.imagen}')"></div>
            <div class="product-body">
              <div class="product-header">
                <span class="product-sku">SKU: ${producto.sku}</span>
              </div>
              <h3>${producto.nombre}</h3>
              <ul class="product-meta">
                ${atributos}
              </ul>
              <button class="consultar-btn" type="button" data-product-whatsapp data-product='${JSON.stringify(producto).replace(/'/g, '&apos;')}'>Consultar por WhatsApp</button>
            </div>
          </article>
        `;
      })
      .join('');
  }

  function init() {
    if (window.catalogData && window.catalogData.categorias && window.catalogData.categorias.length) {
      state.categoriaActiva = 'Todas';
    }

    if (window.categoriasModule) {
      window.categoriasModule.renderCategoriaCards();
      window.categoriasModule.renderCategoriaBotones();
    }

    renderProductos();
  }

  document.addEventListener('DOMContentLoaded', init);

  window.catalogApp = {
    state,
    renderProductos,
    init
  };
})();
