import { createError, removeError } from './utils.js'

export function validation(form) {
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
