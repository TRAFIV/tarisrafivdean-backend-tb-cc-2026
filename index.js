const express = require('express');
const cors = require('cors');
const pool = require('./db');
const tanksRouter = require('./routes/tanks');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Tanks API' });
});

app.use('/tanks', tanksRouter);

// GET /health
app.get('/health', async (req, res) => {
    let dbStatus = 'disconnected';
    let responseStatus = 'error';
    let message = 'Backend is running, but database is not connected';

    try {
        await pool.query('SELECT 1');
        dbStatus = 'connected';
        responseStatus = 'success';
        message = 'Backend is running';
    } catch (error) {
        console.error('Database connection error:', error);
    }

    res.json({
        status: responseStatus,
        message: message,
        database: dbStatus,
        student: {
            name: "Taris Rafivdean",
            nim: "2411523013"
        }
    });
});

// GET /schema
app.get('/schema', (req, res) => {
    res.json({
        student: { 
            name: "Taris Rafivdean", 
            nim: "2411523013" 
        },
        resource: {
            name: "tanks", 
            label: "Data Tank",
            description: "Aplikasi untuk mengelola data tank alutsista"
        },
        fields: [
            { name: "nama_tank", label: "Nama Tank", type: "text", required: true, showInTable: true },
            { name: "jenis_tank", label: "Jenis Tank", type: "text", required: true, showInTable: true },
            { name: "tahun_produksi", label: "Tahun Produksi", type: "number", required: true, showInTable: true },
            { name: "berat_ton", label: "Berat (Ton)", type: "number", required: true, showInTable: false },
            { name: "kecepatan_kmh", label: "Kecepatan (km/h)", type: "number", required: true, showInTable: false },
            { name: "panjang", label: "Panjang (m)", type: "number", required: false, showInTable: false },
            { name: "lebar", label: "Lebar (m)", type: "number", required: false, showInTable: false },
            { name: "tinggi", label: "Tinggi (m)", type: "number", required: false, showInTable: false },
            { name: "jumlah_kru", label: "Jumlah Kru", type: "number", required: true, showInTable: false },
            { name: "kaliber_meriam_mm", label: "Kaliber Meriam (mm)", type: "number", required: false, showInTable: false },
            { name: "deskripsi", label: "Deskripsi", type: "text", required: false, showInTable: false },
            { name: "negara_asal", label: "Negara Asal", type: "text", required: true, showInTable: true }
        ],
        endpoints: {
            list: "/tanks", 
            detail: "/tanks/{id}",
            create: "/tanks", 
            update: "/tanks/{id}", 
            delete: "/tanks/{id}"
        }
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
