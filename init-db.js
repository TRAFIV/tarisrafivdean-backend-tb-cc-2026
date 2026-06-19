const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDB() {
    console.log('Menghubungkan ke database server di ' + process.env.DB_HOST + '...');
    
    // Koneksi tanpa menentukan database terlebih dahulu
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });

    console.log('Koneksi berhasil terhubung!');

    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        console.log('Membaca skema dari ' + schemaPath + '...');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Menjalankan skema SQL...');
        await connection.query(schemaSql);
        console.log('Database dan tabel berhasil diinisialisasi!');
    } catch (error) {
        console.error('Gagal menginisialisasi database:', error);
    } finally {
        await connection.end();
    }
}

initDB();
