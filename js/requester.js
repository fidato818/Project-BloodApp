var config = {
    apiKey: "AIzaSyDcof_TFd0Xa8iJNFFtQfGyqBEaqg4CaIc",
    authDomain: "project-bloodbank.firebaseapp.com",
    databaseURL: "https://project-bloodbank.firebaseio.com",
    projectId: "project-bloodbank",
    storageBucket: "project-bloodbank.appspot.com",
    messagingSenderId: "482004366324"
};
firebase.initializeApp(config);

window.addEventListener('load', async() => {
    await checkRequester()
    getallTask()
})

async function checkRequester() {
    let requester_sign_user = await localStorage.getItem('requester_sign_user');
    let data = JSON.parse(requester_sign_user);
    if (data.user !== 'null') {
        document.getElementById('signinRequester').style.display = 'none'
        document.getElementById('drop').style.display = 'block'
        document.getElementById('name').innerHTML = data.user.email
    } else {
        document.getElementById('signinRequester').style.display = 'block'
        document.getElementById('req').style.display = 'none'
        document.getElementById('permission').innerHTML = 'You Donot Permission to see Accepter Request'
    }
}

var requester_type = document.getElementById('request')
var arr = [];
function getallTask() {
    var arr = [];
    let requester_sign_user = localStorage.getItem('requester_sign_user');
    let data = JSON.parse(requester_sign_user);
    console.log(data)
    firebase.database().ref('Donor')
        .once('value', (data) => {
            let userDataDonor = data.val()
            // console.log(userDataDonor)
            for (var key in userDataDonor) {
                userDataDonor[key].keyId = key
                arr.push(userDataDonor[key])
                // console.log(arr)
                // console.log(key)
                requester_type.innerHTML +=
                    `
                <tr uid=${key}>
                    <td key=""> ${userDataDonor[key].name}     </td>
                    <td key=""> ${userDataDonor[key].address}  </td>
                    <td key=""> ${userDataDonor[key].selected} </td>
                    <td key=""> ${userDataDonor[key].group}    </td>
                    <td key=""> ${userDataDonor[key].email}    </td>
                    <td><button class='btn btn-success' onClick="Accept(this)">Accept</button></td>
                    <td><button onClick="showdata('${userDataDonor[key].name}','${userDataDonor[key].email}','${userDataDonor[key].selected}','${userDataDonor[key].group}','${userDataDonor[key].email}')" class="btn btn-primary btn-block" data-toggle="modal" data-target="#Modal" > See details</button></td>
                </tr>
                `
            }
        })
}

function showdata(nametitle, phoImg, status, bgroup, donorEmail, locate) {
    console.log(donorEmail);
    // $('#asd').text(name);
    var title = document.getElementById('nameTitle')
    // var donorimgModal = document.getElementById('imgAd')
    var donorModal = document.getElementById('conditionModal')
    var donorDescriptionModal = document.getElementById('descriptionModal')  
    var donorMobileModal = document.getElementById('mobileModal')
    var donorLocationModal = document.getElementById('locationModal')

    title.innerHTML = 'Name: <b>' + nametitle + '</b>'
    // donorimgModal.innerHTML = 
    donorDescriptionModal.innerHTML = 'Blood Group:<b> ' + bgroup + '</b>'
    donorMobileModal.innerHTML = 'Email: <b> ' + donorEmail + '</b>'
    donorModal.innerHTML = 'Status:<b> ' + status + '</b>'
    donorLocationModal.innerHTML = ': <b>' + locate + '</b>'
}

// function showdata(nametitle, phoImg, condit, des, prce, modl, mobi, locate) {
//     // console.log(name, img);
//     // $('#asd').text(name);
//     var title = document.getElementById('nameTitle')
//     // var imgModal = document.getElementById('imgAd')
//     var conditionModal = document.getElementById('conditionModal')
//     var descriptionModal = document.getElementById('descriptionModal')
//     var priceModal = document.getElementById('priceModal')
//     var modelModal = document.getElementById('modelModal')
//     var mobileModal = document.getElementById('mobileModal')
//     var locationModal = document.getElementById('locationModal')

//     title.innerHTML = 'Title: <b>' + nametitle + '</b>'
//     // imgModal.innerHTML = phoImg
//     conditionModal.innerHTML = 'Condition: <b> ' + condit + '</b>'
//     descriptionModal.innerHTML = 'Description:<b>' + des + '</b>'
//     priceModal.innerHTML = 'Price:<b> Rs.' + prce + '/-</b>'
//     modelModal.innerHTML = 'Model: <b>' + modl + '</b>'
//     mobileModal.innerHTML = 'Mobile / Cell: <b>' + mobi + '</b>'
//     locationModal.innerHTML = 'Location: <b>' + locate + '</b>'
// }
/*==================================LOGOUT START====================================== */
function btnLogOut() {
    firebase.auth().signOut()
        .then(() => {

            localStorage.setItem('requester_sign_user', JSON.stringify({ user: 'null' }))

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
/*==================================LOGOUT START====================================== */