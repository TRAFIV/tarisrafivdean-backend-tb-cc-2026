CREATE DATABASE IF NOT EXISTS db_2411523013;
USE db_2411523013;

CREATE TABLE IF NOT EXISTS tanks (
    id_tank INT AUTO_INCREMENT PRIMARY KEY,
    nama_tank VARCHAR(255) NOT NULL,
    jenis_tank VARCHAR(255) NOT NULL,
    tahun_produksi INT NOT NULL,
    berat_ton FLOAT NOT NULL,
    kecepatan_kmh INT NOT NULL,
    panjang FLOAT,
    lebar FLOAT,
    tinggi FLOAT,
    jumlah_kru INT NOT NULL,
    kaliber_meriam_mm FLOAT,
    deskripsi TEXT,
    negara_asal VARCHAR(255) NOT NULL
);
