var userEmail;


showLoading();
firebase.auth().onAuthStateChanged((user) => {
  if (user) {

    console.log("usuario onlaine");
    userEmail = user.email;
    form.email().value = userEmail;
    getUser(user);
    hideLoading();
  } else {
    console.log("usuario offline");
    hideLoading();
  }
});

window.openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
}

window.closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
}

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

window.UpdatePassword = () => {
  const user = firebase.auth().currentUser;
  const newPassword = form.newPassword().value;



  firebase.auth().signInWithEmailAndPassword(
    form.email().value, form.userPassword().value
  ).then(response => {
    user.updatePassword(newPassword).then(() => {

      console.log('Update SuccessFul');
      alert('Senha atualizada com sucesso');
      window.location.href = "../../index.html";
    }).catch((error) => {

      alert(getErrorMessage(error));
      console.log('Update Failed');

    });
  }).catch(error => {
    alert(getErrorMessage(error));
    hideLoading();
  });

}

function getUser(user) {
  firebase.firestore().collection('users')
    .where('user', '==', user.uid)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const name = querySnapshot.docs[0].data().name;
        console.log('Name:', name);
        form.userName().value = name;
        const lastName = querySnapshot.docs[0].data().lastName;
        form.userLastName().value = lastName;
        // Agora você pode usar a variável 'name' conforme necessário
      } else {
        console.log('Nenhum documento encontrado.');
      }
    })
    .catch((error) => {
      console.error('Erro ao acessar a coleção:', error);
    });

  window.updateName = () => {
    const user = firebase.auth().currentUser;
    firebase.firestore().collection('users')
      .where('user', '==', user.uid)
      .orderBy('date', 'desc')
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref; // Referência do documento
          const docData = querySnapshot.docs[0].data();
          const name = docData.name;
          const lastName = docData.lastName;

          var novoNome = form.userName().value;
          var novoUltimoNome = form.userLastName().value;
          console.log('Name:', name);
          console.log(lastName);

          // Atualizando valores do documento
          docRef.update({
            name: novoNome, // Altere para o valor desejado
            lastName: novoUltimoNome, // Altere para o valor desejado
            date: new Date(), // Atualize o campo de data ou outros campos
          })
            .then(() => {
              console.log('Documento atualizado com sucesso.');
            })
            .catch((error) => {
              console.error('Erro ao atualizar o documento:', error);
            });

        } else {
          console.log('Nenhum documento encontrado.');
        }
      })
      .catch((error) => {
        console.error('Erro ao acessar a coleção:', error);
      });

  }

}






const form = {
  email: () => document.getElementById("userEmail"),
  userName: () => document.getElementById("userName"),
  userLastName: () => document.getElementById("userLastName"),
  userPassword: () => document.getElementById("userPassword"),
  newPassword: () => document.getElementById("newPassword"),

}
