import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {

	private _doubleDigit(num:number) {
		let newNum = num.toString()
		if (newNum.length === 1) { newNum = 0 + newNum }
		return newNum
	}

  transform(date: Date, args?: any):string {
  	let result:string = ''
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		let correctDate = new Date(date.getTime() - 60000 * date.getTimezoneOffset())
		let current = new Date()
		if (date.getTime() > current.getTime()) {
			result = 'error'
		} else if (date.getFullYear() !== current.getFullYear() ||
			date.getMonth() !== current.getMonth() ||
			date.getDate() !== current.getDate()) {
			result = `${date.getFullYear()} - ${months[date.getMonth()]}, ${this._doubleDigit(date.getDate())}`
		} else {
			let hour = date.getHours()
			let meridian = 'AM'
			if (hour >= 12) {
				hour -= 12
				meridian = 'PM'
			}
			if (!hour) {
				hour = 12;
			}
			result = `${this._doubleDigit(hour)}:${this._doubleDigit(date.getMinutes())} ${meridian}`
		}
    return result
  }
}
