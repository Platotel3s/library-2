const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("public"));

app.post("/books", (req, res) => {
    const { title, author, year } = req.body;
    const sql = "INSERT INTO book (title, author, year) VALUES (?, ?, ?)";
    db.query(sql, [title, author, year], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Buku berhasil ditambah", id: result.insertId });
    });
});

app.get("/books", (req, res) => {
    db.query("SELECT * FROM book", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get("/books/:id", (req, res) => {
    const sql = "SELECT * FROM book WHERE id_book=?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Buku tidak ditemukan" });
        res.json(result[0]);
    });
});

app.put("/books/:id", (req, res) => {
    const { title, author, year } = req.body;
    const sql = "UPDATE book SET title=?, author=?, year=? WHERE id_book=?";
    db.query(sql, [title, author, year, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Buku tidak ditemukan" });
        res.json({ message: "Berhasil memperbarui data buku" });
    });
});

app.delete("/books/:id", (req, res) => {
    const sql = "DELETE FROM book WHERE id_book=?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Buku tidak ada" });
        res.json({ message: "Buku berhasil dihapus" });
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
