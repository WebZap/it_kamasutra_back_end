"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const jsonMiddleWare = express_1.default.json();
const port = process.env.PORT || 3000;
app.use(jsonMiddleWare);
let db = {
    courses: [],
};
app.post('/courses', (req, res) => {
    if (!req.body.name || !req.body.time) {
        res.sendStatus(helpers_1.codeStatus.BAD_REQUEST_400);
        return;
    }
    const content = {
        id: (0, helpers_1.getIndex)(db.courses),
        name: req.body.name,
        time: req.body.time,
    };
    db.courses.push(content);
    res.status(helpers_1.codeStatus.CREATED_201).json(db);
});
app.get('/courses', (req, res) => {
    if (db.courses.length !== 0) {
        if (req.query.name) {
            console.log(req.query);
            const found = db.courses.filter(i => i.name.indexOf(req.query.name) > -1);
            res.status(helpers_1.codeStatus.OK_200).json(found);
            return;
        }
        res.status(helpers_1.codeStatus.OK_200).json(db.courses);
        return;
    }
    res.status(200).json(db.courses);
});
app.get('/courses/:id', (req, res) => {
    const foundId = db.courses.find(i => i.id === +req.params.id);
    if (!foundId) {
        res.sendStatus(helpers_1.codeStatus.NOT_FOUND_404);
        return;
    }
    res.json(foundId);
});
app.delete('/courses/:id', (req, res) => {
    const foundItem = db.courses.find(i => i.id === +req.params.id);
    if (foundItem) {
        console.log(db.courses.filter(i => i.id !== foundItem.id));
        const filtred = db.courses.filter(i => i.id !== foundItem.id);
        db.courses = [...filtred];
        res.status(helpers_1.codeStatus.OK_200).json(db.courses);
        return;
    }
    res.sendStatus(404);
});
app.put('/courses/:id', (req, res) => {
    if (!req.body.name) {
        res.status(helpers_1.codeStatus.NOT_FOUND_404);
        return;
    }
    const foundCourse = db.courses.find(i => i.id === +req.params.id);
    if (foundCourse) {
        foundCourse.name = req.body.name;
        res.status(helpers_1.codeStatus.CREATED_201).json(db.courses);
        return;
    }
    else {
        res.sendStatus(helpers_1.codeStatus.NOT_FOUND_404);
        return;
    }
});
app.listen(port, () => {
    console.log('Server is started');
});
