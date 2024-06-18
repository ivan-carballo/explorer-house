/* import {Router} from "express";
import express from 'express';
import {multer} from 'multer';

const app = express();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
  
  const upload = multer({ storage: storage });
  

  app.post('/', upload.single('image'), function (req, res, next) {
    // Guardar la información de la imagen en la base de datos (MongoDB)
    const imageUrl = req.file.path;
    // Aquí puedes guardar la URL de la imagen en tu base de datos MongoDB
    res.send('Imagen subida correctamente');
  });
  



export default router; */