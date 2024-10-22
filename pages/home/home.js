var datatest;
var phValue;
var timestamp;
var id;

window.registrarMedicao = () => {
  fetch("https://thingspeak.mathworks.com/channels/2682894/fields/1.json?results=1")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      data = JSON.parse(JSON.stringify(data.feeds));
      phValue = data[0].field1;
      timestamp = data[0].created_at;
      id = data[0].entry_id;

      showLoading();

      // Verifica se o usuário está autenticado
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const medicao = {
          "phValue": phValue,
          "timestamp": timestamp,
          "tsID": id,
          "user": {
            "uid": currentUser.uid
          }
        };
        firebase.firestore().collection('medicoes').add(medicao)
          .then(() => {
            hideLoading();
          })
          .catch((error) => {
            console.error("Erro ao adicionar medição:", error);
            hideLoading();
            alert("ERRO: " + error.message);
          });
      } else {
        console.error("Usuário não autenticado.");
        hideLoading();
        alert("Usuário não autenticado.");
      }
    })
    .catch((error) => {
      console.error("Unable to fetch data:", error);
      alert("Erro ao buscar dados: " + error.message);
    });
};

window.logout = () => {
  showLoading();
  firebase.auth().signOut().then(() => {
    window.location.href = "../../index.html";
    hideLoading();
  }).catch((error) => {
    alert("Erro ao fazer logOut: " + error.message);
    hideLoading();
  });
}