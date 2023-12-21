"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const genIndex_1 = require("./helpers/genIndex");
const app = (0, express_1.default)();
const jsonMiddleWare = express_1.default.json();
app.use(jsonMiddleWare);
let db = {
    courses: [],
};
app.post('/courses', (req, res) => {
    if (!req.body.name || !req.body.time) {
        res.sendStatus(404);
        return;
    }
    const content = {
        id: (0, genIndex_1.getIndex)(db.courses),
        name: req.body.name,
        time: req.body.time,
    };
    db.courses.push(content);
    res.status(201).json(db);
});
app.get('/courses', (req, res) => {
    if (db.courses.length !== 0) {
        if (req.query.name) {
            console.log(req.query);
            const found = db.courses.filter(i => i.name.indexOf(req.query.name) > -1);
            res.json(found);
            return;
        }
        res.status(200).json(db.courses);
        return;
    }
    res.status(200).json(db.courses);
});
app.get('/courses/:id', (req, res) => {
    const foundId = db.courses.find(i => i.id === +req.params.id);
    if (!foundId) {
        res.sendStatus(404);
        return;
    }
    res.json(foundId);
});
app.listen(3000, () => {
    console.log('Server is started');
});
