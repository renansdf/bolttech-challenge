import 'express-async-errors'
import express from 'express'
import { isCelebrateError } from 'celebrate'

import routes from './routes/index.mjs'
import AppError from './utils/appError.mjs'

const server = express()

server.use(express.json())
server.use('/api', routes)

// HealthCheck
server.get('/', function (req, res) {
  res.send('server is up')
})

// Error Treatment
server.use((err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if(isCelebrateError(err)){
    return response.status(400).json({
      status: 'error',
      message: 'Dados inválidos. Algum valor fornecido na requisição está no formato incorreto.'
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

// Start Server
// -----------------------------------------------------
server.listen(3333, () => console.log(
    'Server started at port: 3333'
));