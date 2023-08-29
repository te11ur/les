export default class BaseComponent {
	constructor(parentNode, tag, style = [], content = '') {
		const el = document.createElement(tag);
		el.classList.add(...style);
		el.textContent = content;
		if (parentNode) {
			parentNode.appendChild(el);
		}
		this.node = el;
	}
}
