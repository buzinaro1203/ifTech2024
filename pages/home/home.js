console.log('aaaa')
function logout() {
  showLoading();
  firebase.auth().signOut().then(() => {
    window.location.href = "../../index.html";
    hideLoading();
  }).catch(() => {
    alert("Erro ao fazer logOut")
    hideLoading();
  })
}