const http = require('http')
const fs = require('fs')
const path = require('path')
const { error } = require('console')

const PATH = {
	about: path.join(__dirname, 'pages1', 'about.html'),
	index: path.join(__dirname, 'pages', 'index.html'),
}

const readFileAsync = path => {
	console.log(path)
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if (err) reject(err)
			resolve(data)
		})
	})
}

const handyDelay = time => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, time)
	})
}

const server = http.createServer(async (req, res) => {
	switch (req.url) {
		case '/student':
			readFileAsync(PATH.about)
				.then(data => {
					res.write(data)
					res.end()
				})
				.catch(err => {
					res.write('Error 500')
					res.end()
				})
			break
		case '/home':
			try {
				await handyDelay(3000)
				res.write('URRRRRAAA')
				res.end()
			} catch (err) {
				res.write(err)
				res.end()
			}

			break
		default:
			res.write('PAGE NOT FOUND 404')
			res.end()
			break
	}
})

server.listen(3000)
