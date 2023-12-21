export interface ICourseItem {
	id: number
	name: string
	time: number
}

export type ICourses = ICourseItem[]

export interface IDb {
	courses: ICourses
}
