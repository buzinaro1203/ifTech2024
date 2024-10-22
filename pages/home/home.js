
var datatest;
var phValue;
var timestamp;
var id;

window.registrarMedicao = () => {

  fetch("https://thingspeak.mathworks.com/channels/2682894/fields/1.json?results=1")
    .then((res) => {
      if (!res.ok) {
        throw new Error
          (`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      data = JSON.parse(JSON.stringify(data.feeds));

      phValue = data[0].field1;
      timestamp = data[0].created_at;
      id = data[0].entry_id;

      const medicao = {
        "phValue": phValue,
        "timestamp": timestamp,
        "tsID": id,
        "user": {
          "uid": firebase.auth().currentUser.uid
        }

      }
      console.log(medicao);

    })
    .catch((error) =>
      console.error("Unable to fetch data:", error));


}


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