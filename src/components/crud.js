const API_URL = 'http://localhost:3000/productos';

export async function obtenerProductos() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function guardarProducto(nombre, precio) {
  const nuevo = { nombre, precio };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevo)
  });
}

export async function eliminarProducto(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
}

export async function editarProducto(id, nombre, precio) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, precio })
  });
}
