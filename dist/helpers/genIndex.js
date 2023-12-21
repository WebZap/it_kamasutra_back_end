"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = void 0;
const getIndex = (courses) => {
    if (courses.length === 0) {
        return 1;
    }
    return courses[courses.length - 1].id + 1;
};
exports.getIndex = getIndex;
