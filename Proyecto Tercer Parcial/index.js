import app from './app.js'

app.listen(app.get('port'))

console.log('Servidor activo en el puerto',app.get('port') )