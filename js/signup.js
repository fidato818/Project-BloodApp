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

function signup() {
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var selected = document.getElementById('selected').value;
    var group = document.getElementById('group').value;
    var strUser = group.options[group.selectedIndex].value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var file = document.getElementById('file').value;
    if (name === '' || name === ' ' || name === undefined &&
        address === '' || address === ' ' || address === undefined &&
        email === '' || email === ' ' || email === undefined &&
        password === '' || password === ' ' || password === undefined){
            alertify.alert('please fill all fields')
        }else{
        document.getElementById("loaders").style.display = 'block'
    // donor start
    if (selected === "Donor") {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((success) => {
                document.getElementById("loaders").style.display = 'none'
                var objgroup = {
                    name,
                    address,
                    selected,
                    group,
                    email,
                    password,
                    createTime: new Date().toLocaleString()
                }
                var user_Id = firebase.auth().currentUser.uid;
                firebase.database().ref('Donor/' + user_Id)
                    .set(objgroup)
                    .then(() => {
                        // Get the snackbar DIV
                        var x = document.getElementById("snackbar");

                        // Add the "show" class to DIV
                        x.className = "show";

                        // After 3 seconds, remove the show class from DIV
                        setTimeout(function () {
                            x.className = x.className.replace("show", "");
                            //     // console.log('data saved' + obj)
                            //     // alert('data saved in firebase')
                            window.location.href = './pages/logindonor.html'
                        }, 3000);
                    })
                    .catch(function (error) {
                        console.log('error')
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alertify.alert(errorMessage)
                        // swal({
                        //     title: "Authentication Error",
                        //     text: errorMessage,
                        //     icon: "warning",
                        //     button: "OK",
                        // });
                        // ...
                    });
            })

    }
    // donor end
    //  requester start
    if (selected === "Requester") {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((success) => {
                document.getElementById("loaders").style.display = 'none'
                var objgroup = {
                    name,
                    address,
                    selected,
                    group,
                    email,
                    password,
                    createTime: new Date().toLocaleString()
                }
                var user_Id = firebase.auth().currentUser.uid;
                firebase.database().ref('Requester/' + user_Id)
                    .set(objgroup)
                    .then(() => {
                        // Get the snackbar DIV
                        var x = document.getElementById("snackbar");

                        // Add the "show" class to DIV
                        x.className = "show";

                        // After 3 seconds, remove the show class from DIV
                        setTimeout(function () {
                            x.className = x.className.replace("show", "");
                            //     // console.log('data saved' + obj)
                            //     // alert('data saved in firebase')
                            window.location.href = './pages/loginRequester.html'
                        }, 3000);
                    })
                    .catch(function (error) {
                        console.log('error')
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alertify.alert(errorMessage)
                        // swal({
                        //     title: "Authentication Error",
                        //     text: errorMessage,
                        //     icon: "warning",
                        //     button: "OK",
                        // });
                        // ...
                    });
            })

    }
}
}
// requester end

/* animated */
function autoscroll(e) {
    var top = $('#' + e).offset().top;
    $('html, body').animate({ scrollTop: top }, 500)
}
/* animated */