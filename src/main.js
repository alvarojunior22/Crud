import { obtenerProductos, guardarProducto, eliminarProducto, editarProducto } from './components/crud.js';

const form = document.getElementById('product-form');
const tableBody = document.getElementById('product-table-body');
let productos = [];

window.addEventListener('DOMContentLoaded', async () => {
  productos = await obtenerProductos();
  renderizarTabla();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const precio = parseFloat(document.getElementById('precio').value);
  const id = document.getElementById('producto-id').value;

  if (id) {
    await editarProducto(parseInt(id), nombre, precio);
  } else {
    await guardarProducto(nombre, precio);
  }

  productos = await obtenerProductos();
  renderizarTabla();
  form.reset();
});

function renderizarTabla() {
  tableBody.innerHTML = '';
  productos.forEach((producto) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
      <td>
        <button class="btn-editar" data-id="${producto.id}">Editar</button>
        <button class="btn-borrar" data-id="${producto.id}">Eliminar</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  // Delegar eventos después de dibujar la tabla
  document.querySelectorAll('.btn-borrar').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      await eliminarProducto(id);
      productos = await obtenerProductos();
      renderizarTabla();
    });
  });

  document.querySelectorAll('.btn-editar').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const producto = productos.find(p => p.id == id);
      document.getElementById('nombre').value = producto.nombre;
      document.getElementById('precio').value = producto.precio;
      document.getElementById('producto-id').value = producto.id;
    });
  });
}
