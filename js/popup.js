//сначала определяем все переменные
let writeUs = document.querySelector('.js-main-footer-button');
let modal = document.querySelector('.modal-contact');
let close = document.querySelector('.modal-close');

let form = modal.querySelector('form');
let name = modal.querySelector('[name=name]');
let email = modal.querySelector('[name=email');
let textArea = modal.querySelector('textarea');

let nameStorage = localStorage.getItem('name');
let emailStorage = localStorage.getItem('email');

let isStorageSupport = true; //флаг
let storage = "";


try {
	storage = localStorage.getItem('name');
} catch (err) {
	isStorageSupport = false;
}

writeUs.addEventListener('click', function (evt) {
	evt.preventDefault();
	modal.classList.add('modal-show');
	if (storage) {
		if (nameStorage && emailStorage) {
			name.value = nameStorage;
			email.value = emailStorage;
			textArea.focus();
		} else if (!nameStorage && emailStorage) {
			email.value = emailStorage;
			name.focus();
		} else if (nameStorage && !emailStorage) {
			name.value = nameStorage;
			email.focus();
		} else {
			name.focus();
		}
	}
	else {
		name.focus();
	}
});

close.addEventListener('click', function (evt) {
	evt.preventDefault();
	modal.classList.remove('modal-show');
	modal.classList.remove('modal-error');
});

form.addEventListener('submit', function (evt) {
	if (!name.value || !email.value) {
		evt.preventDefault();
		modal.classList.remove('modal-error');
		modal.offsetWidth = modal.offsetWidth; //перезапись ширины окна. зачем? ответ: браузеры ленятся делать бессмысленные действия - браузер анализирует (удали код, добавь - этого не делает.) конструкция как-то должна затрагивать ширину. Это хак.
		modal.classList.add('modal-error');
	} else {
		if (isStorageSupport) {
			localStorage.setItem('name', name.value);
			localStorage.setItem('email', email.value);
		}
	}
});

window.addEventListener('keydown', function (evt) {
	if (evt.keyCode === 27) {
		if (modal.classList.contains('modal-show')) {
			evt.preventDefault();
			modal.classList.remove('modal-show');
		}
	}
});
