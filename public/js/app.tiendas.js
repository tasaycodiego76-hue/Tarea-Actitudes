const API_URL = 'http://localhost:3000/api/tiendas';

const formulario = document.getElementById('form-tienda');
const tabla = document.querySelector('#tabla-tiendas tbody');
const idtienda = document.getElementById('idtienda');
const tienda = document.getElementById('tienda');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');

btnCancelar.addEventListener('click', () => {
  btnGuardar.innerText = 'Guardar';
  formulario.reset();
  idtienda.value = '';
});

// Obtener y renderizar tiendas
async function obtenerTiendas() {
  try {
    const response = await fetch(API_URL, { method: 'get' });
    const tiendas = await response.json();
    tabla.innerHTML = '';

    tiendas.forEach(t => {
      const row = tabla.insertRow();
      row.insertCell().textContent = t.id;
      row.insertCell().textContent = t.tienda;

      const actions = row.insertCell();

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.classList.add('btn', 'btn-info', 'btn-sm');
      editBtn.onclick = () => cargarParaEdicion(t);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
      deleteBtn.onclick = () => eliminarTienda(t.id, t.tienda);

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
    });
  } catch (error) {
    console.error('Error al obtener tiendas:', error);
  }
}

function cargarParaEdicion(tiendaObj) {
  idtienda.value = tiendaObj.id;
  tienda.value = tiendaObj.tienda;
  btnGuardar.innerText = 'Actualizar';
}

async function eliminarTienda(id, nombre) {
  if (confirm(`¿Está seguro de eliminar la tienda: ${nombre}?`)) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'delete' });
      obtenerTiendas();
    } catch (error) {
      console.error('Error al eliminar tienda:', error);
    }
  }
}

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = { tienda: tienda.value.trim() };
  const id = idtienda.value;
  const method = id ? 'put' : 'post';
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    formulario.reset();
    idtienda.value = '';
    btnGuardar.innerText = 'Guardar';
    obtenerTiendas();
  } catch (error) {
    console.error('Error al guardar tienda:', error);
  }
});

document.addEventListener('DOMContentLoaded', obtenerTiendas);
