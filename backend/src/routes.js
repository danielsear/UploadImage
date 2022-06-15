const multer = require('./middlewares/uploadImages')
const express = require('express')

const routes = express.Router()

const Image = require('../models/images')

routes.post('/upload-image', multer.single('image'), async (req, res) => {
  if (req.file) {
    await Image.create({ image: req.file.filename })
      .then(() => {
        return res.json({
          error: false,
          message: 'Upload realizado com sucesso.'
        })
      })
      .catch(() => {
        return res.status(400).json({
          error: true,
          message: 'Error : Falha no Upload da imagem no banco de dados.'
        })
      })
  }
  return res.status(400).json({
    error: true,
    message: 'Error : Falha no Upload, necessário enviar imagem em PNG ou JPG!.'
  })
})

routes.get('/list-image', async (req, res) => {
  await Image.findAll()
    .then(images => {
      return res.json({
        erro: false,
        images,
        url: 'http://localhost:8080/files/'
      })
    })
    .catch(err => {
      return res.status(400).json({
        erro: true,
        message: 'Erro: Nenhuma imagem encontrada.'
      })
    })
})

routes.get('/delete-image/:id', (req, res) => {
  const { id } = req.params
  Image.destroy({
    where: {
      id
    }
  }).then(() => {
    return res
      .json({
        error: false,
        message: 'Deletado com sucesso.'
      })
      .catch(err => {
        return res.status(400).json({
          error: true,
          message: 'Error: Não foi possível deletar a foto.'
        })
      })
  })
})

module.exports = routes
