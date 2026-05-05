function renderTabla(data) {
    if (!data.length) return;

    let keys = Object.keys(data[0]);
    let html = '<tr>' + keys.map(k => `<th>${k}</th>`).join('') + '</tr>';

    data.forEach(row => {
        html += '<tr>' + keys.map(k => `<td>${row[k]}</td>`).join('') + '</tr>';
    });

    document.getElementById('tablaReportes').innerHTML = html;
}

function exportarCSV() {
    if (!window.dataCSV || !window.dataCSV.length) {
        alert("Primero carga el reporte");
        return;
    }

    let csv = Object.keys(dataCSV[0]).join(',') + '\n';

    dataCSV.forEach(row => {
        csv += Object.values(row).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'productos-mas-vendidos.csv';
    a.click();
}

function mostrarError(msg) {
    document.getElementById('error').textContent = msg;
}

async function cargarProductos() {
    try {
        const res = await fetch('/api/productos');
        const data = await res.json();

        let html = '<tr><th>ID</th><th>Nombre</th><th>Stock</th><th>Acción</th></tr>';

        data.productos.forEach(p => {
            html += `
                <tr>
                    <td>${p.id_producto}</td>
                    <td>${p.nombre}</td>
                    <td>${p.stock}</td>
                    <td>
                        <button onclick="eliminarProducto(${p.id_producto})">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        document.getElementById('tablaProductos').innerHTML = html;

    } catch (error) {
        mostrarError('Error cargando productos');
    }
}

async function crearProducto() {
    try {
        const res = await fetch('/api/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: document.getElementById('nombre').value,
                precio: Number(document.getElementById('precio').value),
                stock: Number(document.getElementById('stock').value),
                id_categoria: 1,
                id_plataforma: 1
            })
        });

        const data = await res.json();

        if (!data.ok) throw new Error(data.error);

        cargarProductos();

    } catch (err) {
        mostrarError(err.message);
    }
}

async function eliminarProducto(id) {
    try {
        const res = await fetch(`/api/productos/${id}`, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!data.ok) throw new Error(data.error);

        cargarProductos();

    } catch (err) {
        mostrarError(err.message);
    }
}

async function cargarClientes() {
    try {
        const res = await fetch('/api/clientes');
        const data = await res.json();

        let html = '<tr><th>ID</th><th>Nombre</th><th>Acción</th></tr>';

        data.clientes.forEach(c => {
            html += `
                <tr>
                    <td>${c.id_cliente}</td>
                    <td>${c.nombre}</td>
                    <td>
                        <button onclick="eliminarCliente(${c.id_cliente})">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        document.getElementById('tablaClientes').innerHTML = html;

    } catch (error) {
        mostrarError('Error cargando clientes');
    }
}

async function crearCliente() {
    try {
        const res = await fetch('/api/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: document.getElementById('nombreCliente').value,
                telefono: document.getElementById('telefonoCliente').value,
                email: document.getElementById('emailCliente').value
            })
        });

        const data = await res.json();

        if (!data.ok) throw new Error(data.error);

        cargarClientes();

    } catch (error) {
        mostrarError(error.message);
    }
}

async function eliminarCliente(id) {
    try {
        const res = await fetch(`/api/clientes/${id}`, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!data.ok) throw new Error(data.error);

        cargarClientes();

    } catch (error) {
        mostrarError(error.message);
    }
}

async function productosMasVendidos() {
    const res = await fetch('/api/reportes/productos-mas-vendidos');
    const data = await res.json();

    window.dataCSV = data.data;
    renderTabla(data.data);
}

async function cargarPlataformas() {
    const res = await fetch('/api/reportes/plataformas');
    const data = await res.json();
    renderTabla(data.data);
}

async function topCliente() {
    const res = await fetch('/api/reportes/top-cliente');
    const data = await res.json();
    renderTabla([data.data]);
}

async function topEmpleado() {
    const res = await fetch('/api/reportes/top-empleado');
    const data = await res.json();
    renderTabla([data.data]);
}

async function productosIngresos() {
    const res = await fetch('/api/reportes/productos-con-mas-ingresos');
    const data = await res.json();
    renderTabla(data.data);
}

async function inventario() {
    const res = await fetch('/api/reportes/inventario');
    const data = await res.json();
    renderTabla(data.data);
}

async function reabastecer() {
    const res = await fetch('/api/stock/reabastecer', {
        method: 'POST'
    });

    const data = await res.json();

    document.getElementById('resultadoStock').textContent =
        JSON.stringify(data, null, 2);
}

window.crearProducto = crearProducto;
window.cargarProductos = cargarProductos;
window.eliminarProducto = eliminarProducto;

window.crearCliente = crearCliente;
window.cargarClientes = cargarClientes;
window.eliminarCliente = eliminarCliente;

window.cargarPlataformas = cargarPlataformas;
window.topCliente = topCliente;
window.topEmpleado = topEmpleado;
window.productosVendidos = productosMasVendidos;
window.productosIngresos = productosIngresos;
window.inventario = inventario;

window.exportarCSV = exportarCSV;
window.reabastecer = reabastecer;