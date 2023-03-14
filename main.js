function validation(form) {
	let result = true

	const allInputs = form.querySelectorAll('.form__input')

	allInputs.forEach((input) => {
		if (input.dataset.required === 'true') {
			removeError(input)
			if (input.value.trim() === '') {
				createError(input, 'Поле не заполнено!')
				result = false
			}
		}
	})

	return result
}

function createError(input, text) {
	input.classList.add('error')

	const parent = input.parentElement
	const errorLabel = document.createElement('label')

	errorLabel.classList.add('error__label')
	errorLabel.textContent = text
	errorLabel.style.top = input.offsetHeight + 'px'

	parent.append(errorLabel)
}

function removeError(input) {
	if (input.classList.contains('error')) {
		input.classList.remove('error')
		input.parentElement.querySelector('.error__label').remove()
	}
}

function getDate(date) {
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

function addComment(name, text, date) {
	const fullDate = getDate(date)
	const userName = name.trim()
	const commentText = text.trim()

	let commentLayout = `<div class="comments__block">
		<div class="block__top">
			<div class="block__comment-author">
				<div class="block__user-name">${userName}</div>
				<span>оставил(а) комментарий</span>
				<span>·</span>
				<div class="block__date">${fullDate}</div>
			</div>
			<div class="button delete"><img src="/img/trash.svg" id='delete' alt="delete" /></div>
		</div>
		<div class="block__content">
			<div class="block__text">
			<pre>${commentText}</pre>
			</div>
		</div>
		<div class="block__bottom">
			<div class="button like">
				<img class="unliked" id="like" alt="like" />
			</div>
		</div>
		</div>`

	document.querySelector('.comments').insertAdjacentHTML('beforeend', commentLayout)
}

function clearForm(...inputs) {
	inputs.forEach((input) => {
		removeError(input)
		input.value = ''
	})
}

function submitOnEnter(e) {
	if (e.key === 'Enter' && !e.shiftKey) {
		if (!e.repeat) {
			const newEvent = new Event('submit', { cancelable: true })

			console.dir(e.target)
			e.target.form.dispatchEvent(newEvent)
		}

		e.preventDefault()
	}
}

document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('#form')
	const nameInput = document.querySelector('#formName')
	const textInput = document.querySelector('#formMessage')
	const dateInput = document.querySelector('#formDate')

	form.addEventListener('submit', function (e) {
		e.preventDefault()

		if (validation(this)) {
			addComment(nameInput.value, textInput.value, dateInput.value)
			clearForm(nameInput, textInput, dateInput)
		}
	})

	form.addEventListener('input', function (e) {
		const input = e.target

		if (input.dataset.required === 'true' && input.value.trim() !== '') {
			removeError(input)
		}
	})

	textInput.addEventListener('input', function () {
		this.style.height = ''
		this.style.height = this.scrollHeight + 'px'
	})

	textInput.addEventListener('keydown', submitOnEnter)

	document
		.querySelector('.cancel-btn')
		.addEventListener('click', () => clearForm(nameInput, textInput, dateInput))

	document.body.addEventListener('click', function (e) {
		if (e.target.id === 'like') {
			e.target.classList.toggle('liked')
			e.target.classList.toggle('unliked')
		}
		if (e.target.id === 'delete') {
			const result = confirm('Вы действительно хотите удалить комментарий?')

			if (result) e.target.closest('.comments__block').remove()
		}
	})
})
