const API_URL = 'http://localhost:3000/api/cliente'
const API_TIENDA_URL = 'http://localhost:3000/api/tiendas' 

const formulario = document.getElementById('form-cliente')
const tabla = document.querySelector('#table-clientes tbody')

const idcliente = document.getElementById('idcliente') 
const apellidos = document.getElementById('apellidos') 
const nombres = document.getElementById('nombres')
const dni = document.getElementById('dni')
const telefono = document.getElementById('telefono')
const direccion = document.getElementById('direccion')
const tienda_id = document.getElementById('tienda_id')

const btnGuardar = document.getElementById('btnGuardar')
const btnCancelar = document.getElementById('btnCancelar')

// 🔄 Cancelar / Resetear formulario
btnCancelar.addEventListener('click', () => {
  btnGuardar.innerText = 'Guardar'
  formulario.reset()
  idcliente.value = ''
})

// 🔽 Cargar tiendas en el select dinámicamente
async function cargarTiendas() {
  try {
    const response = await fetch(API_TIENDA_URL)
    const tiendas = await response.json()
    
    tienda_id.innerHTML = '<option value="">Seleccione</option>'
    
    tiendas.forEach(tienda => {
      const option = document.createElement('option')
      option.value = tienda.id
      option.textContent = tienda.tienda
      tienda_id.appendChild(option)
    })
  } catch (e) {
    console.error('Error al cargar tiendas:', e)
  }
}

// 📋 Obtener clientes (usando INNER JOIN en backend)
async function obtenerClientes() {
  try {
    const response = await fetch(API_URL)
    const clientes = await response.json()

    tabla.innerHTML = ''

    clientes.forEach(cliente => {
      const row = tabla.insertRow()

      row.insertCell().textContent = cliente.id
      row.insertCell().textContent = cliente.apellidos
      row.insertCell().textContent = cliente.nombres
      row.insertCell().textContent = cliente.dni
      row.insertCell().textContent = cliente.telefono || ''
      row.insertCell().textContent = cliente.direccion
      row.insertCell().textContent = cliente.tienda

      const acciones = row.insertCell()

      const btnEditar = document.createElement('button')
      btnEditar.textContent = 'Editar'
      btnEditar.classList.add('btn', 'btn-info', 'btn-sm', 'me-1')
      btnEditar.onclick = () => cargarParaEdicion(cliente)

      const btnEliminar = document.createElement('button')
      btnEliminar.textContent = 'Eliminar'
      btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm')
      btnEliminar.onclick = () => eliminarCliente(cliente.id, `${cliente.apellidos} ${cliente.nombres}`)

      acciones.appendChild(btnEditar)
      acciones.appendChild(btnEliminar)
    })
  } catch (e) {
    console.error('Error al obtener clientes:', e)
  }
}

// 🗑️ Eliminar cliente
async function eliminarCliente(id, nombreCompleto) {
  if (confirm(`¿Está seguro de eliminar al cliente: ${nombreCompleto}?`)) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'delete' })
      if (!response.ok) throw new Error('Error al eliminar cliente')
      await response.json()
      obtenerClientes()
    } catch (e) {
      console.error(e)
    }
  }
}

// ✏️ Cargar datos en el formulario para editar
function cargarParaEdicion(cliente) {
  idcliente.value = cliente.id
  apellidos.value = cliente.apellidos
  nombres.value = cliente.nombres
  dni.value = cliente.dni
  telefono.value = cliente.telefono || ''
  direccion.value = cliente.direccion
  tienda_id.value = cliente.id_tienda

  btnGuardar.innerText = 'Actualizar'
}

// 💾 Guardar o actualizar cliente
formulario.addEventListener('submit', async (e) => {
  e.preventDefault()

  const data = {
    apellidos: apellidos.value,
    nombres: nombres.value,
    dni: dni.value,
    telefono: telefono.value,
    direccion: direccion.value,
    id_tienda: tienda_id.value
  }

  try {
    const metodo = idcliente.value ? 'put' : 'post'
    const url = idcliente.value ? `${API_URL}/${idcliente.value}` : API_URL

    const response = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) throw new Error('Error al guardar cliente')

    await response.json()
    formulario.reset()
    idcliente.value = ''
    btnGuardar.innerText = 'Guardar'
    obtenerClientes()
  } catch (e) {
    console.error('Error al guardar cliente:', e)
  }
})

// 🚀 Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarTiendas()
  obtenerClientes()
})
