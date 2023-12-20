import express from 'express'

const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

const PATH = {
	index: path.join(__dirname, 'pages', 'index.html'),
}

app.get('/', async (req, res) => {
	let a: number = 8

	a > 10 ? res.send('1231313') : res.sendFile(PATH.index)
})

app.listen(PORT, () => {
	console.log(`Server started ${PORT} ${PATH.index}`)
})

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/',  (req, res) => {
// 	res.send('Hello World!')
// })

// app.listen(port, () => {
// 	console.log(`Example app listening on port ${port}`)
// })
