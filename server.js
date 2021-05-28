let express = require("express")

let app = express()
let bodyParser = require("body-parser")

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())

app.get("/", (request, response) => {
  response.render("page/index")   
})

app.listen(process.env.PORT || 8080)