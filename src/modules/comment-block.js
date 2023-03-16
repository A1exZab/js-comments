import { getDate } from './utils'

export function createCommentBlock(name, text, date) {
	const fullDate = getDate(date)
	const userName = name.trim()
	const commentText = text.trim()

	const commentBlock = `<div class="comments__block">
		<div class="block__top">
			<div class="block__comment-author">
				<div class="block__user-name">${userName}</div>
				<span>оставил(а) комментарий</span>
				<span>·</span>
				<div class="block__date">${fullDate}</div>
			</div>
			<div class="button delete"><img src="img/trash.svg" id='delete' alt="delete" /></div>
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

	return commentBlock
}
