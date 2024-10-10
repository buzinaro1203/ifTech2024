firebase.auth().onAuthStateChanged(user => {
  if (user) {
    window.location.href = "../home/home.html";
  }
})
window.onChangeEmail = () => {
  const email = document.getElementById("email").value;
  form.emailRequiredError().style.display = email ? "none" : "block";
  form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
  toggleRegisterButtonDisable()

}
window.onChangePassword = () => {
  const password = document.getElementById("password").value;
  form.passwordRequiredError().style.display = password ? "none" : "block";

  form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
  toggleRegisterButtonDisable()
}
window.onChangeConfirmPassword = () => {
  const confirmPassword = document.getElementById("confirmPassword").value;
  const password = document.getElementById("password").value;

  form.confirmPasswordDoesntMatchError().style.display = password == confirmPassword ? "none" : "block";
  toggleRegisterButtonDisable()
}
window.backToLogin = () => {
  window.location.href = "../../index.html";
}
function toggleRegisterButtonDisable() {
  form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
  const email = form.email().value;
  if (!email || !validateEmail(email)) {
    return false;
  }

  const password = form.password().value;
  if (!password || password.length < 6) {
    return false;
  }

  const confirmPassword = form.confirmPassword().value;
  if (password != confirmPassword) {
    return false;
  }

  return true;
}


window.register = () => {
  showLoading()
  const email = form.email().value;
  const password = form.password().value;
  firebase.auth().createUserWithEmailAndPassword(email, password)

    .then(() => {
      // Signed in
      window.location.href = "../home/home.html"
      hideLoading()
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      hideLoading()
      alert(getErrorMessage(error))

    });
}





function getErrorMessage(error) {
  return error.message

}



const form = {
  email: () => document.getElementById('email'),
  password: () => document.getElementById('password'),
  confirmPassword: () => document.getElementById('confirmPassword'),
  emailInvalidError: () => document.getElementById('email-invalid-error'),
  emailRequiredError: () => document.getElementById('email-required-error'),
  passwordMinLengthError: () => document.getElementById('password-min-length-error'),
  passwordRequiredError: () => document.getElementById('password-required-error'),
  confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
  registerButton: () => document.getElementById('registerButton'),






}