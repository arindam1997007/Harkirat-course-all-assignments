import { measure } from "helpful-decorators"

class DateClass {
	private timeZone: string
	constructor(timeZone: string) {
		this.timeZone = timeZone
	}
	getTime() {
		const d = new Date()
		return d.getTime()
	}

	@measure
	getMonth() {
		const d = new Date()
		return d.getMonth()
	}
	getTimezone() {
		return this.timeZone
	}
}

const dateObj = new DateClass("IST")
const response = dateObj.getMonth()
console.log({ response })
