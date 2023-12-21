import { ICourseItem, ICourses, IDb } from './CoursesTypes'

import express from 'express'
import { getIndex } from './helpers/genIndex'
import { log } from 'console'
import path from 'path'

const app = express()
const jsonMiddleWare = express.json()
app.use(jsonMiddleWare)

let db: IDb = {
	courses: [],
}

app.post('/courses', (req, res) => {
	if (!req.body.name || !req.body.time) {
		res.sendStatus(404)
		return
	}
	const content: ICourseItem = {
		id: getIndex(db.courses),
		name: req.body.name,
		time: req.body.time,
	}
	db.courses.push(content)
	res.status(201).json(db)
})

app.get('/courses', (req, res) => {
	if (db.courses.length !== 0) {
		if (req.query.name) {
			console.log(req.query)
			const found = db.courses.filter(
				i => i.name.indexOf(req.query.name as string) > -1
			)
			res.json(found)
			return
		}
		res.status(200).json(db.courses)
		return
	}

	res.status(200).json(db.courses)
})

app.get('/courses/:id', (req, res) => {
	const foundId = db.courses.find(i => i.id === +req.params.id)
	if (!foundId) {
		res.sendStatus(404)
		return
	}
	res.json(foundId)
})

app.listen(3000, () => {
	console.log('Server is started')
})
