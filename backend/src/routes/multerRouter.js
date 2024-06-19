import express from 'express';
import cors from 'cors'; 
import upload from './multer.js'; 
import fs from 'fs'; 
import {Router} from "express";



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post('/', upload.single('file'), (req, res) => {
    res.json({
        fileName: req.fileName
    });
});




app.get("/uploads/:file", (req, res) => {
    const { file } = req.params; // nombre del archivo en la ruta
    const filePath = `./uploads/${file}`; // ruta donde se encuentra el archivo
    if (!fs.existsSync(filePath)) { // si el archivo no existe
        res.status(404).send("File not found"); // devolvemos un error
        return;
    }
    res.sendFile(filePath, { root: "." }); // devolvemos el archivo. Es necesario root: "." para que la ruta sea relativa
});




app.get("/uploads", (req, res) => {
    const path = `./uploads/`; // ruta donde se encuentran los archivos
    if (!fs.existsSync(path)) { // si el directorio no existe
        res.status(404).send("Directory not found"); // devolvemos un error
        return;
    }
    const files = fs.readdirSync(path); // lista de archivos
    res.json(files); // devolvemos la lista de archivos
});





export default app;