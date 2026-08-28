(function () {
  const getCategorias = () => (window.catalogData && window.catalogData.categorias) || [];

  function setCategoriaActiva(nombre) {
    const state = window.catalogApp && window.catalogApp.state ? window.catalogApp.state : null;
    if (!state) return;

    state.categoriaActiva = nombre;
    if (window.catalogApp && typeof window.catalogApp.renderProductos === 'function') {
      window.catalogApp.renderProductos();
    }
    renderCategoriaBotones();
    renderCategoriaCards();
  }

  function renderCategoriaCards() {
    const contenedor = document.getElementById('categoria-list');
    if (!contenedor) return;

    const categorias = getCategorias();
    const activeCategory = (window.catalogApp && window.catalogApp.state && window.catalogApp.state.categoriaActiva) || 'Todas';

    contenedor.innerHTML = categorias
      .map((categoria) => {
        const activeClass = activeCategory === categoria.nombre ? 'is-active' : '';
        return `
          <article class="category-card ${activeClass}" data-category="${categoria.nombre}" tabindex="0" aria-label="Ver ${categoria.nombre}">
            <div class="category-image" style="background-image: url('${categoria.imagen}')"></div>
            <div class="category-body">
              <span class="category-chip">${categoria.nombre}</span>
              <h3>${categoria.nombre}</h3>
              <p>${categoria.descripcion}</p>
              <button class="category-link" type="button" data-category="${categoria.nombre}">Ver productos</button>
            </div>
          </article>
        `;
      })
      .join('');

    contenedor.querySelectorAll('[data-category]').forEach((element) => {
      element.addEventListener('click', (event) => {
        const categoria = event.currentTarget.getAttribute('data-category');
        if (categoria) {
          setCategoriaActiva(categoria);
          document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function renderCategoriaBotones() {
    const contenedor = document.getElementById('filtros-categoria');
    if (!contenedor) return;

    const categorias = getCategorias();
    const active = (window.catalogApp && window.catalogApp.state && window.catalogApp.state.categoriaActiva) || 'Todas';
    const botones = [
      `<button class="filter-button ${active === 'Todas' ? 'is-active' : ''}" type="button" data-category="Todas">Todas</button>`
    ];

    categorias.forEach((categoria) => {
      botones.push(
        `<button class="filter-button ${active === categoria.nombre ? 'is-active' : ''}" type="button" data-category="${categoria.nombre}">${categoria.nombre}</button>`
      );
    });

    contenedor.innerHTML = botones.join('');
    

contenedor.querySelectorAll('[data-category]').forEach((boton) => {

    boton.addEventListener('click', () => {

        const categoria = boton.getAttribute('data-category');

        // Cambiar la categoría activa
        setCategoriaActiva(categoria);

        // Esperar a que se actualice la grilla
        setTimeout(() => {

            const productsGrid = document.querySelector('.products-grid');

            if (!productsGrid) return;

            // Altura del Nav
            const headerHeight =
                document.querySelector('.nav-container')?.offsetHeight || 0;

            // Altura del Catalog Toolbar
            const toolbarHeight =
                document.querySelector('.catalog-toolbar')?.offsetHeight || 0;

            // Espacio ocupado por los elementos sticky
            const offset = headerHeight + toolbarHeight + 10;

            // Obtener la posición actual de products-grid
            const posicion =
                productsGrid.getBoundingClientRect().top +
                window.scrollY -
                offset;

            // Scroll automático y suave
            window.scrollTo({
                top: posicion,
                behavior: 'smooth'
            });

        }, 100);

    });

});


  }

  window.categoriasModule = {
    renderCategoriaCards,
    renderCategoriaBotones,
    setCategoriaActiva
  };
})();
