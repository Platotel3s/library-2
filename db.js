require("dotenv").config();
const mysql=require("mysql2");

const db=mysql.createConnection({
    host:"localhost",
    user:"yudha",
    password:"ayah115043&&",
    database:"gramed"
});

db.connect(err=>{
    if(err){
        console.log(`Koneksi database gagal : ${err.message}`);
    }else{
        console.log(`Koneksi database berhasil`);
    }
});

module.exports=db;