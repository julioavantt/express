const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

require("./database/database")

const routes = require("./routes/routes")

const app = express()

//! Middlewares
app.use(cors())
app.use(express.json())

app.use("/api", routes)

app.listen(process.env.PORT, () =>
	console.log(
		"Nuestro servidor está escuchando en el PORT " +
			process.env.PORT
	)
)
