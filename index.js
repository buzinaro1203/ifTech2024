firebase.auth().onAuthStateChanged(user => {
	if (user) {
		// User is signed in.
		window.location.href = "pages/home/home.html";
	}
})

window.onChangeEmail = () => {
	toggleButtonsDisable();
	toggleEmailErrors();
}

window.onChangePassword = () => {
	toggleButtonsDisable();
	togglePasswordErrors();
}

window.login = () => {
	showLoading();
	firebase.auth().signInWithEmailAndPassword(
		form.email().value, form.password().value
	).then(response => {
		hideLoading();
		window.location.href = "pages/home/home.html";

	}).catch(error => {
		alert(getErrorMessage(error));
		hideLoading();
	});
}

function getErrorMessage(error) {
	if (error.code == "auth/user-not-found") {
		return "Usuário nao encontrado";
	}
	else if (error.code == "auth/wrong-password") {
		return "Senha incorreta";
	}

	return error.message;
}

window.register = () => {
	window.location.href = "pages/register/register.html";
}

window.recoverPassword = () => {
	showLoading();
	firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
		hideLoading();
		alert('Email enviado com sucesso');
	}).catch(error => {
		alert(getErrorMessage(error));
	})
}
function toggleEmailErrors() {
	const email = form.email().value;
	form.emailRequiredError().style.display = email ? "none" : "block";

	form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
	const password = form.password().value;
	form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
	const emailValid = isEmailValid();
	form.recoverPasswordButton().disabled = !emailValid;

	const passwordValid = isPasswordValid();
	form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
	const email = form.email().value;
	if (!email) {
		return false;
	}
	return validateEmail(email);
}

function isPasswordValid() {
	return form.password().value ? true : false;
}

const form = {
	email: () => document.getElementById("email"),
	emailInvalidError: () => document.getElementById("email-invalid-error"),
	emailRequiredError: () => document.getElementById("email-required-error"),
	loginButton: () => document.getElementById("login-button"),
	password: () => document.getElementById("password"),
	passwordRequiredError: () => document.getElementById("password-required-error"),
	recoverPasswordButton: () => document.getElementById("recover-password-button"),
}

