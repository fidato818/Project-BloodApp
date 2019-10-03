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

window.addEventListener('load', async () => {
    await checkDonor()
    getTask()
})

async function checkDonor() {
    let get_donor_user = await localStorage.getItem('donor_sign_user');
    let data = JSON.parse(get_donor_user);
    if (data.user !== 'null') {
        document.getElementById('signinDonor').style.display = 'none'
        document.getElementById('drop').style.display = 'block'
        document.getElementById('name').innerHTML = data.user.email
    } else {
        document.getElementById('signinDonor').style.display = 'block'
        document.getElementById('req').style.display = 'none'
        document.getElementById('permission').innerHTML = 'You Donot Permission to see Accepter Request'
    }
}


var donor_type = document.getElementById('donor')
var arr = [];
function getTask() {
    var arr = [];
    let get_donor_user = localStorage.getItem('donor_sign_user');
    let data = JSON.parse(get_donor_user);
    console.log(data.user.uid)
    firebase.database().ref('Requester')
        .once('value', (data) => {
            let userData = data.val()
            console.log(userData)
            for (var key in userData) {
                userData[key].keyId = key
                arr.push(userData[key])
                console.log(arr)
                // console.log(userData[key].address)
                console.log(keyId)
                donor_type.innerHTML +=
                
                    ` 
                <tr key=${keyId}>
                    <td> ${userData[key].name}  </td>
                    <td> ${userData[key].address}  </td>
                    <td> ${userData[key].selected} </td>
                    <td> ${userData[key].group}    </td>
                    <td> ${userData[key].email}    </td>
                    <td><button class='btn btn-danger' onClick="del(this)">Donate IT</button></td>
                    <td><button onClick="showdata('${userData[key].name}','${userData[key].email}','${userData[key].selected}','${userData[key].group}','${userData[key].email}')" class="btn btn-primary btn-block" data-toggle="modal" data-target="#Modal" > See details</button></td>
                    </button></td>
                </tr>        
        `
            }
        })
}
function showdata(nametitle, phoImg, email, des, mobi, locate) {
    // console.log(name, img);
    // $('#asd').text(name);
    var title = document.getElementById('nameTitle')
    // var donorimgModal = document.getElementById('imgAd')
    var donorModal = document.getElementById('conditionModal')
    var donorDescriptionModal = document.getElementById('descriptionModal')  
    var donorMobileModal = document.getElementById('mobileModal')
    var donorLocationModal = document.getElementById('locationModal')

    title.innerHTML = 'Name: <b>' + nametitle + '</b>'
    // donorimgModal.innerHTML = 
    donorModal.innerHTML = 'Email: <b> ' + email + '</b>'
    donorDescriptionModal.innerHTML = 'Description:<b>' + des + '</b>'
    donorMobileModal.innerHTML = 'Mobile / Cell: <b>' + mobi + '</b>'
    donorLocationModal.innerHTML = 'Location: <b>' + locate + '</b>'
}



function edi() {
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var selected = document.getElementById('selected').value;
    var group = document.getElementById('group').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var user_Id = firebase.auth().currentUser.uid;
    firebase.database().ref('Donor/' + user_Id).once('value', (data) => {
        var asd = {
            name,
            address,
            selected,
            group,
            email,
            password,
        }
        let edit = data.val();
            edit.post = asd;
            firebase.database().ref("donors/" + userUid).set(edit).then(() => {
                console.log('success')
            })
    })  
   
}
/*==================================LOGOUT START====================================== */
function btnLogOut() {
    firebase.auth().signOut()
        .then(() => {

            localStorage.setItem('donor_sign_user', JSON.stringify({ user: 'null' }))

            window.location.replace('./../index.html')
        })
        .catch(function (error) {
            var errorMessage = error.message;
            swal({
                title: 'Please check your Internet Connection',
                text: errorMessage,
                icon: 'warning',
                button: 'OK'
            })
        })
}
/*==================================LOGOUT END======================================== */

function del(key) {

    var adaRef = firebase.database().ref('Requester');
    adaRef.remove()
        .then(function () {

            var elem = document.getElementById("job-" + key);
            elem.remove();

            console.log("Remove succeeded.")
        })
        .catch(function (error) {
            console.log("Remove failed: " + error.message)
        });
}
