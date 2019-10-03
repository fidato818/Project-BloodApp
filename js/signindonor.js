// Initialize Firebase
var config = {
    apiKey: "AIzaSyDcof_TFd0Xa8iJNFFtQfGyqBEaqg4CaIc",
    authDomain: "project-bloodbank.firebaseapp.com",
    databaseURL: "https://project-bloodbank.firebaseio.com",
    projectId: "project-bloodbank",
    storageBucket: "project-bloodbank.appspot.com",
    messagingSenderId: "482004366324"
};
firebase.initializeApp(config);

// DONOR LOGIN
// function logDonor() {
//     var email = document.getElementById('email').value;
//     var password = document.getElementById('password').value;

//     if (email === '' || email === ' ' || email === undefined && password === '' || password === ' ' || password === undefined) {
//         alert('please enter email and password')
//     } else {

//         document.getElementById("loaders").style.display = 'block'
//         firebase.auth().signInWithEmailAndPassword(email, password)
//             .then((success) => {
//                 console.log(success)
//                 document.getElementById("loaders").style.display = 'none'
//                 // Get the snackbar DIV
//                 var x = document.getElementById("snackbar");

//                 // Add the "show" class to DIV
//                 x.className = "show";

//                 // After 3 seconds, remove the show class from DIV
//                 setTimeout(function () {
//                     x.className = x.className.replace("show", "");
//                     //     // console.log('data saved' + obj)
//                     //     // alert('data saved in firebase')
//                     localStorage.setItem('donor_sign_user', JSON.stringify(success))
//                     window.location = '../pages/donor.html'
//                 }, 2000);



//             })
//             .catch(function (error) {
//                 console.log('error')
//                 // Handle Errors here.
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 alert('error:' + errorMessage);
//                 // swal({
//                 //     title: "Authentication Error",
//                 //     text: errorMessage,
//                 //     icon: "warning",
//                 //     button: "OK",
//                 // });
//                 // ...
//             });
//     }
// }
function logDonor() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email === '' || email === ' ' || email === undefined && password === '' || password === ' ' || password === undefined) {
        alertify.alert('please enter email and password')
    } else {
        
    document.getElementById("loaders").style.display = 'block'
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((success) => {
            console.log(success)
                document.getElementById("loaders").style.display = 'none'
                // Get the snackbar DIV
                var x = document.getElementById("snackbar");

                // Add the "show" class to DIV
                x.className = "show";

                // After 3 seconds, remove the show class from DIV
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                    //     // console.log('data saved' + obj)
                    //     // alert('data saved in firebase')
                    localStorage.setItem('donor_sign_user', JSON.stringify(success))
                    window.location = '../pages/donor.html'
                }, 2000);



        })
        .catch(function (error) {
            console.log('error')
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            alertify.alert(errorMessage)
            document.getElementById("loaders").style.display = 'none'
            // swal({
            //     title: "Authentication Error",
            //     text: errorMessage,
            //     icon: "warning",
            //     button: "OK",
            // });
            // ...
        });


}
}