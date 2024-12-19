
showLoading();
firebase.auth().onAuthStateChanged(user => {

  if (user) {

    console.log("Usuário autenticado:", user);
    findMedicoes(user);
  } else {
    console.log("Nenhum usuário autenticado.");
    hideLoading();
  }
});

function findMedicoes(user) {


  firebase.firestore().collection('medicoes').where('user', '==', user.uid).orderBy('data').get().then((querySnapshot) => {

    querySnapshot.forEach((doc) => {
      const medicoes = doc.data();
      addMedicoesToScreen([medicoes]);
      hideLoading();

    })

  });


}


function addMedicoesToScreen(medicoes) {
  const historyTable = document.getElementById('historyTable');
  medicoes.forEach(medicoes => {
    const row = document.createElement('tr');
  });
  for (let i = 0; i < medicoes.length; i++) {
    const row = document.createElement('tr');
    historyTable.appendChild(row);



    const date = document.createElement('td');
    const timestamp = medicoes[i].data;
    const dateObj = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    date.innerHTML = dateObj.toLocaleString();
    row.appendChild(date);


    const phValue = document.createElement('td');
    phValue.innerHTML = medicoes[i].phValue;
    row.appendChild(phValue);


    const tsID = document.createElement('td');
    tsID.innerHTML = medicoes[i].tsID;
    row.appendChild(tsID);


  }
}


