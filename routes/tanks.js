const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /tanks - Menampilkan seluruh data
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tanks');
        res.json({
            status: 'success',
            message: 'Data retrieved successfully',
            data: rows
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// GET /tanks/:id - Menampilkan detail data
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tanks WHERE id_tank = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Data not found' });
        }
        res.json({
            status: 'success',
            message: 'Data retrieved successfully',
            data: rows[0]
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// POST /tanks - Menambahkan data
router.post('/', async (req, res) => {
    try {
        const {
            nama_tank, jenis_tank, tahun_produksi, berat_ton, kecepatan_kmh,
            panjang, lebar, tinggi, jumlah_kru, kaliber_meriam_mm, deskripsi, negara_asal
        } = req.body;
        
        const [result] = await pool.query(
            `INSERT INTO tanks (nama_tank, jenis_tank, tahun_produksi, berat_ton, kecepatan_kmh, panjang, lebar, tinggi, jumlah_kru, kaliber_meriam_mm, deskripsi, negara_asal)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nama_tank, jenis_tank, tahun_produksi, berat_ton, kecepatan_kmh, panjang, lebar, tinggi, jumlah_kru, kaliber_meriam_mm, deskripsi, negara_asal]
        );

        const newId = result.insertId;
        const [newRow] = await pool.query('SELECT * FROM tanks WHERE id_tank = ?', [newId]);

        res.status(201).json({
            status: 'success',
            message: 'Data created successfully',
            data: newRow[0]
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// PUT /tanks/:id - Mengubah data
router.put('/:id', async (req, res) => {
    try {
        const {
            nama_tank, jenis_tank, tahun_produksi, berat_ton, kecepatan_kmh,
            panjang, lebar, tinggi, jumlah_kru, kaliber_meriam_mm, deskripsi, negara_asal
        } = req.body;
        
        const [result] = await pool.query(
            `UPDATE tanks SET 
                nama_tank = ?, jenis_tank = ?, tahun_produksi = ?, berat_ton = ?, kecepatan_kmh = ?, 
                panjang = ?, lebar = ?, tinggi = ?, jumlah_kru = ?, kaliber_meriam_mm = ?, deskripsi = ?, negara_asal = ?
             WHERE id_tank = ?`,
            [nama_tank, jenis_tank, tahun_produksi, berat_ton, kecepatan_kmh, panjang, lebar, tinggi, jumlah_kru, kaliber_meriam_mm, deskripsi, negara_asal, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Data not found' });
        }

        const [updatedRow] = await pool.query('SELECT * FROM tanks WHERE id_tank = ?', [req.params.id]);

        res.json({
            status: 'success',
            message: 'Data updated successfully',
            data: updatedRow[0]
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// DELETE /tanks/:id - Menghapus data
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tanks WHERE id_tank = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Data not found' });
        }

        res.json({
            status: 'success',
            message: 'Data deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
