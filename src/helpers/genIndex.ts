import { ICourseItem } from '../types/CoursesTypes'

export const getIndex = <T extends ICourseItem>(courses: T[]): number => {
	if (courses.length === 0) {
		return 1
	}
	return courses[courses.length - 1].id + 1
}
