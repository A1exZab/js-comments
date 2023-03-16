import { validation } from './modules/validations.js'
import { removeError, clearForm } from './modules/utils.js'
import { submitOnEnter } from './modules/custom-events.js'
import { createCommentBlock } from './modules/comment-block.js'

document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('#form')
	const nameInput = document.querySelector('#formName')
	const textInput = document.querySelector('#formMessage')
	const dateInput = document.querySelector('#formDate')

	form.addEventListener('submit', function (e) {
		e.preventDefault()

		if (validation(this)) {
			let comment = createCommentBlock(nameInput.value, textInput.value, dateInput.value)

			document.querySelector('.comments').insertAdjacentHTML('beforeend', comment)
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
