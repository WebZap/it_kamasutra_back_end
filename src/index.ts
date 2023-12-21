import { ICourseItem, ICourses, IDb } from './types/CoursesTypes'
import { codeStatus, getIndex } from './helpers'

import express from 'express'

const app = express()
const jsonMiddleWare = express.json()
const port = process.env.PORT || 3000
app.use(jsonMiddleWare)

let db: IDb = {
	courses: [],
}

app.post('/courses', (req, res) => {
	if (!req.body.name || !req.body.time) {
		res.sendStatus(codeStatus.BAD_REQUEST_400)
		return
	}
	const content: ICourseItem = {
		id: getIndex(db.courses),
		name: req.body.name,
		time: req.body.time,
	}
	db.courses.push(content)
	res.status(codeStatus.CREATED_201).json(db)
})
app.get('/courses', (req, res) => {
	if (db.courses.length !== 0) {
		if (req.query.name) {
			console.log(req.query)
			const found = db.courses.filter(
				i => i.name.indexOf(req.query.name as string) > -1
			)
			res.status(codeStatus.OK_200).json(found)
			return
		}
		res.status(codeStatus.OK_200).json(db.courses)
		return
	}
	res.status(200).json(db.courses)
})
app.get('/courses/:id', (req, res) => {
	const foundId = db.courses.find(i => i.id === +req.params.id)
	if (!foundId) {
		res.sendStatus(codeStatus.NOT_FOUND_404)
		return
	}
	res.json(foundId)
})
app.delete('/courses/:id', (req, res) => {
	const foundItem = db.courses.find(i => i.id === +req.params.id)
	if (foundItem) {
		console.log(db.courses.filter(i => i.id !== foundItem.id))
		const filtred = db.courses.filter(i => i.id !== foundItem.id)
		db.courses = [...filtred]
		res.status(codeStatus.OK_200).json(db.courses)
		return
	}
	res.sendStatus(404)
})
app.put('/courses/:id', (req, res) => {
	if (!req.body.name) {
		res.status(codeStatus.NOT_FOUND_404)
		return
	}
	const foundCourse = db.courses.find(i => i.id === +req.params.id)
	if (foundCourse) {
		foundCourse.name = req.body.name
		res.status(codeStatus.CREATED_201).json(db.courses)
		return
	} else {
		res.sendStatus(codeStatus.NOT_FOUND_404)
		return
	}
})

app.listen(port, () => {
	console.log('Server is started')
})
