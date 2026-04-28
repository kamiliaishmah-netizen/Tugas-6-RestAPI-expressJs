const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// koneksi database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kampus"
});

db.connect(err => {
    if (err) throw err;
    console.log("Database connected!");
});


// =======================
// API GET (lihat data)
// =======================
app.get("/mahasiswa", (req, res) => {
    db.query("SELECT * FROM mahasiswa", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


// =======================
// API POST (tambah data)
// =======================
app.post("/mahasiswa", (req, res) => {
    const { nama, nim, jurusan } = req.body;

    const sql = "INSERT INTO mahasiswa (nama, nim, jurusan) VALUES (?, ?, ?)";

    db.query(sql, [nama, nim, jurusan], (err) => {
        if (err) throw err;
        res.json({ message: "Data berhasil ditambahkan" });
    });
});


// =======================
// JALANKAN SERVER
// =======================
app.listen(3000, () => {
    console.log("Server jalan di http://localhost:3000");
});