export function getDate(date) {
	function getRandomTime() {
		let minutes = Math.floor(Math.random() * 60)
		if (minutes < 10) minutes = '0' + minutes
		let hours = Math.floor(Math.random() * 23)
		if (hours < 10) hours = '0' + hours

		return hours + ':' + minutes
	}

	let dateToReturn

	const today = new Date()
	const yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)

	if (!date) dateToReturn = today
	else dateToReturn = new Date(date)

	let year = dateToReturn.getFullYear().toString().slice(-2)

	let month = dateToReturn.getMonth() + 1
	if (month < 10) month = '0' + month

	let day = dateToReturn.getDate()
	if (day < 10) day = '0' + day

	if (today.toDateString() === dateToReturn.toDateString()) {
		dateToReturn = 'Сегодня'
	} else if (yesterday.toDateString() === dateToReturn.toDateString()) {
		dateToReturn = 'Вчера'
	} else {
		dateToReturn = day + '.' + month + '.' + year
	}

	const time = getRandomTime()

	return dateToReturn + '   ' + time
}

export function createError(input, text) {
	input.classList.add('error')

	const parent = input.parentElement
	const errorLabel = document.createElement('label')

	errorLabel.classList.add('error__label')
	errorLabel.textContent = text
	errorLabel.style.top = input.offsetHeight + 'px'

	parent.append(errorLabel)
}

export function removeError(input) {
	if (input.classList.contains('error')) {
		input.classList.remove('error')
		input.parentElement.querySelector('.error__label').remove()
	}
}

export function clearForm(...inputs) {
	inputs.forEach((input) => {
		removeError(input)
		input.value = ''
	})
}
