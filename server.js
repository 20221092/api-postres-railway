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
        precio: 350,
        descripcion: "Pastel suave de chocolate con cobertura de ganache y decoración artesanal.",
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop",
        tamanos: [
            { nombre: "chico", precio: 250 },
            { nombre: "mediano", precio: 350 },
            { nombre: "grande", precio: 480 }
        ]
    },
    {
        id: 2,
        nombre: "Pastel de vainilla",
        precio: 320,
        descripcion: "Pastel esponjoso de vainilla con betún de mantequilla y relleno cremoso.",
        imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1200&auto=format&fit=crop",
        tamanos: [
            { nombre: "chico", precio: 230 },
            { nombre: "mediano", precio: 320 },
            { nombre: "grande", precio: 450 }
        ]
    },
    {
        id: 3,
        nombre: "Tres leches",
        precio: 380,
        descripcion: "Pastel tradicional bañado en mezcla de tres leches, decorado con crema batida.",
        imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop",
        tamanos: [
            { nombre: "chico", precio: 280 },
            { nombre: "mediano", precio: 380 },
            { nombre: "grande", precio: 520 }
        ]
    },
    {
        id: 4,
        nombre: "Cheesecake",
        precio: 400,
        descripcion: "Cheesecake cremoso con base de galleta y cobertura de frutos rojos.",
        imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1200&auto=format&fit=crop",
        tamanos: [
            { nombre: "chico", precio: 300 },
            { nombre: "mediano", precio: 400 },
            { nombre: "grande", precio: 550 }
        ]
    },
    {
        id: 5,
        nombre: "Cupcakes",
        precio: 45,
        descripcion: "Cupcakes decorados con betún artesanal, ideales para eventos, regalos y mesas de postres.",
        imagen: "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=1200&auto=format&fit=crop",
        tamanos: [
            { nombre: "chico", precio: 35 },
            { nombre: "mediano", precio: 45 },
            { nombre: "grande", precio: 60 }
        ]
    },
    {
        id: 6,
        nombre: "Flan napolitano",
        precio: 180,
        descripcion: "Flan cremoso con caramelo, preparado de forma tradicional.",
        imagen: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop",
        tamanos: [
            { nombre: "chico", precio: 120 },
            { nombre: "mediano", precio: 180 },
            { nombre: "grande", precio: 260 }
        ]
    },
    {
        id: 7,
        nombre: "Gelatina",
        precio: 90,
        descripcion: "Gelatina de sabores con decoración colorida, ideal para fiestas y reuniones familiares.",
        imagen: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop",
        tamanos: [
            { nombre: "chico", precio: 60 },
            { nombre: "mediano", precio: 90 },
            { nombre: "grande", precio: 150 }
        ]
    },
    {
        id: 8,
        nombre: "Donas",
        precio: 30,
        descripcion: "Donas suaves y esponjosas con glaseado dulce y diferentes decoraciones.",
        imagen: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200&auto=format&fit=crop",
        tamanos: [
            { nombre: "chico", precio: 25 },
            { nombre: "mediano", precio: 30 },
            { nombre: "grande", precio: 40 }
        ]
    },
    {
        id: 9,
        nombre: "Brownies",
        precio: 55,
        descripcion: "Brownies de chocolate con textura suave por dentro y cubierta ligeramente crujiente.",
        imagen: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
        tamanos: [
            { nombre: "chico", precio: 40 },
            { nombre: "mediano", precio: 55 },
            { nombre: "grande", precio: 75 }
        ]
    },
    {
        id: 10,
        nombre: "Pastel de fresas",
        precio: 370,
        descripcion: "Pastel suave con relleno cremoso, fresas naturales y decoración artesanal.",
        imagen: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1200&auto=format&fit=crop",
        tamanos: [
            { nombre: "chico", precio: 270 },
            { nombre: "mediano", precio: 370 },
            { nombre: "grande", precio: 500 }
        ]
    },
    {
        id: 11,
        nombre: "Galletas de chocolate",
        precio: 25,
        descripcion: "Galletas crujientes con chispas de chocolate, perfectas para acompañar café o leche.",
        imagen: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1200&auto=format&fit=crop",
        tamanos: [
            { nombre: "chico", precio: 20 },
            { nombre: "mediano", precio: 25 },
            { nombre: "grande", precio: 35 }
        ]
    },
    {
        id: 12,
        nombre: "Pay de limon",
        precio: 280,
        descripcion: "Pay de limón con base de galleta, relleno cremoso y sabor fresco.",
        imagen: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=1200&auto=format&fit=crop",
        tamanos: [
            { nombre: "chico", precio: 200 },
            { nombre: "mediano", precio: 280 },
            { nombre: "grande", precio: 390 }
        ]
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
    const { nombre, descripcion, precio, imagen, tamanos } = req.body || {};

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
        imagen,
        tamanos: tamanos || []
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

    const { nombre, descripcion, precio, imagen, tamanos } = req.body || {};

    postre.nombre = nombre || postre.nombre;
    postre.descripcion = descripcion || postre.descripcion;
    postre.precio = precio !== undefined ? Number(precio) : postre.precio;
    postre.imagen = imagen || postre.imagen;
    postre.tamanos = tamanos || postre.tamanos;

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

// Puerto para local, Railway o Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
