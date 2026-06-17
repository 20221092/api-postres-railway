const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Base de datos temporal en memoria
let postres = [
    {
        id: 1,
        nombre: "Pastel de chocolate",
        descripcion: "Pastel suave y esponjoso con cobertura de chocolate.",
        precio: 120,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    },
    {
        id: 2,
        nombre: "Flan napolitano",
        descripcion: "Postre cremoso con caramelo, ideal para después de comer.",
        precio: 60,
        imagen: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13"
    },
    {
        id: 3,
        nombre: "Cheesecake",
        descripcion: "Pay de queso con base de galleta y cubierta dulce.",
        precio: 95,
        imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad"
    },
    {
        id: 4,
        nombre: "Cupcake de vainilla",
        descripcion: "Cupcake individual con pan suave y betún de vainilla.",
        precio: 35,
        imagen: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d"
    },
    {
        id: 5,
        nombre: "Brownie",
        descripcion: "Brownie de chocolate intenso con textura húmeda y suave.",
        precio: 45,
        imagen: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
    },
    {
        id: 6,
        nombre: "Pay de limón",
        descripcion: "Pay frío de limón con base crujiente de galleta.",
        precio: 75,
        imagen: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13"
    },
    {
        id: 7,
        nombre: "Gelatina mosaico",
        descripcion: "Gelatina cremosa con cubos de diferentes sabores y colores.",
        precio: 40,
        imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291777"
    },
    {
        id: 8,
        nombre: "Pastel tres leches",
        descripcion: "Pastel húmedo bañado en mezcla de tres leches.",
        precio: 130,
        imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3"
    },
    {
        id: 9,
        nombre: "Donas glaseadas",
        descripcion: "Donas suaves con cubierta dulce de azúcar glaseada.",
        precio: 25,
        imagen: "https://images.unsplash.com/photo-1551024601-bec78aea704b"
    },
    {
        id: 10,
        nombre: "Galletas de chispas",
        descripcion: "Galletas horneadas con chispas de chocolate.",
        precio: 30,
        imagen: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e"
    }
];

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: "API de venta de postres funcionando correctamente",
        rutas: {
            obtenerPostres: "GET /api/postres",
            obtenerPostrePorId: "GET /api/postres/:id",
            crearPostre: "POST /api/postres",
            actualizarPostre: "PUT /api/postres/:id",
            eliminarPostre: "DELETE /api/postres/:id"
        }
    });
});

// Obtener todos los postres
app.get('/api/postres', (req, res) => {
    res.json({
        mensaje: "Lista de postres",
        total: postres.length,
        postres: postres
    });
});

// Obtener un postre por ID
app.get('/api/postres/:id', (req, res) => {
    const id = Number(req.params.id);

    const postre = postres.find(p => p.id === id);

    if (!postre) {
        return res.status(404).json({
            error: true,
            mensaje: "No se encontró el postre"
        });
    }

    res.json(postre);
});

// Crear un nuevo postre
app.post('/api/postres', (req, res) => {
    const { nombre, descripcion, precio, imagen } = req.body || {};

    if (!nombre || !descripcion || precio === undefined || !imagen) {
        return res.status(400).json({
            error: true,
            mensaje: "Faltan datos. Debes enviar nombre, descripcion, precio e imagen."
        });
    }

    const nuevoPostre = {
        id: postres.length > 0 ? Math.max(...postres.map(p => p.id)) + 1 : 1,
        nombre,
        descripcion,
        precio: Number(precio),
        imagen
    };

    postres.push(nuevoPostre);

    res.status(201).json({
        mensaje: "Postre creado correctamente",
        postre: nuevoPostre
    });
});

// Actualizar un postre
app.put('/api/postres/:id', (req, res) => {
    const id = Number(req.params.id);

    const postre = postres.find(p => p.id === id);

    if (!postre) {
        return res.status(404).json({
            error: true,
            mensaje: "No se encontró el postre para actualizar"
        });
    }

    const { nombre, descripcion, precio, imagen } = req.body || {};

    postre.nombre = nombre || postre.nombre;
    postre.descripcion = descripcion || postre.descripcion;
    postre.precio = precio !== undefined ? Number(precio) : postre.precio;
    postre.imagen = imagen || postre.imagen;

    res.json({
        mensaje: "Postre actualizado correctamente",
        postre: postre
    });
});

// Eliminar un postre
app.delete('/api/postres/:id', (req, res) => {
    const id = Number(req.params.id);

    const existePostre = postres.some(p => p.id === id);

    if (!existePostre) {
        return res.status(404).json({
            error: true,
            mensaje: "No se encontró el postre para eliminar"
        });
    }

    postres = postres.filter(p => p.id !== id);

    res.json({
        mensaje: "Postre eliminado correctamente"
    });
});

// Puerto para local y Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});