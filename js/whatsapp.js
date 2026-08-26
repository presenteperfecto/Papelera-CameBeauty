(function () {
  function buildWhatsAppUrl(message) {
    const base = 'https://wa.me/5491159884082';
    return `${base}?text=${encodeURIComponent(message)}`;
  }

  function abrirConsultaGeneral() {
    const mensaje = 'Hola, quisiera realizar una consulta sobre sus productos.';
    window.open(buildWhatsAppUrl(mensaje), '_blank', 'noopener');
  }

  function abrirConsultaProducto(producto) {
    const mensaje = `Hola, quisiera consultar por el producto: ${producto.nombre}. SKU: ${producto.sku}.`;
    window.open(buildWhatsAppUrl(mensaje), '_blank', 'noopener');
  }

  document.addEventListener('click', (event) => {
    const general = event.target.closest('[data-whatsapp-general]');
    if (general) {
      abrirConsultaGeneral();
      return;
    }

    const productoButton = event.target.closest('[data-product-whatsapp]');
    if (productoButton) {
      const producto = JSON.parse(productoButton.getAttribute('data-product') || '{}');
      if (producto && producto.nombre) {
        abrirConsultaProducto(producto);
      }
    }
  });

  window.whatsapp = {
    buildWhatsAppUrl,
    abrirConsultaGeneral,
    abrirConsultaProducto
  };
})();
