//pacote para trazer dependencias para ajudar na programação do backends
//O Express oferece soluções para:
//Gerenciar requisições de diferentes verbos HTTP em diferentes URLs.
//Integrar "view engines" para inserir dados nos templates.
//Definir as configurações comuns da aplicação web, como a porta a ser usada para conexão e a localização dos modelos que são usados para renderizar a resposta.
//Adicionar novos processos de requisição por meio de "middleware" em qualquer ponto da "fila" de requisições.
const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// usando template engine
server.set('view engine', 'ejs');

//mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

// habilitar arquivos statics
server.use(express.static("public"))

//usar o req.body
server.use(express.urlencoded({ extended: true }))

//routes
server.use(routes)

//abre uma porta para ser "escutada" e trás a informação para saber se funcionou
server.listen(3000, () => console.log('Rodando'))