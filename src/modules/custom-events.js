export function submitOnEnter(e) {
	if (e.key === 'Enter' && !e.shiftKey) {
		if (!e.repeat) {
			const newEvent = new Event('submit', { cancelable: true })

			e.target.form.dispatchEvent(newEvent)
		}

		e.preventDefault()
		this.blur()
	}
}
