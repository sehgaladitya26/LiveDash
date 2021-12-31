var myInterval;
var value1;
var value2;

function myfunction() {
    console.log("tu pagal hai kya??")
    document.getElementById("bt1").innerHTML = "Recalibrating";
    fetch("https://blynk.cloud/external/api/update?token=LvC6vyL_uPSpPdgnlCln0I9Vab6zcogV&v0=" + "1")
    myInterval = setInterval(myTimer, 500);
}

function myTimer() {
    //document.querySelector('form').onsubmit = function () {
    fetch('https://blynk.cloud/external/api/get?token=LvC6vyL_uPSpPdgnlCln0I9Vab6zcogV&v0')
        .then(response => response.json())
        .then(data => {
            const myJSON = JSON.stringify(data)
            if (myJSON == "0") {
                document.getElementById("bt1").innerHTML = "Recalibrate";
                clearInterval(myInterval);
                document.querySelector("#u").value = 0;
                document.querySelector("#v").value = 0;
                document.querySelector("#us").innerHTML = "0";
                document.querySelector("#vs").innerHTML = "0";
            }
        });
    // .catch(error => {
    //     console.log('Error:', error);
    // })
    return false;
}

var saved_u_val;
var saved_v_val;

document.addEventListener('DOMContentLoaded', () => {

    saved_u_val = sessionStorage.getItem('saved_val_u');
    saved_v_val = sessionStorage.getItem('saved_val_v');
    console.log(saved_u_val);
    console.log(saved_v_val);

    if(saved_u_val == null && saved_v_val == null){
        saved_u_val = 0;
        saved_v_val = 0;
        sessionStorage.setItem('saved_val_u', saved_u_val);
        sessionStorage.setItem('saved_val_v', saved_v_val);
        console.log(saved_u_val);
        console.log(saved_v_val);
        
    }
    value1 = saved_u_val;
    value2 = saved_v_val;
    console.log('Yes, I am mad');
    document.querySelector("#vs").innerHTML = saved_v_val;
    document.querySelector("#us").innerHTML = saved_u_val;
    document.querySelector("#u").value = saved_u_val;
    document.querySelector("#v").value = saved_v_val;
    document.querySelector("#f").innerHTML = ((parseFloat(saved_v_val)*parseFloat(saved_u_val))/(parseFloat(saved_u_val) + parseFloat(saved_v_val))).toFixed(2);

    //setInterval(myTimer, 500);

    // document.querySelector('form').onsubmit = function () {
    //     const target = document.querySelector('#get_bool').value;
    //     document.querySelector('#result2').innerHTML = target;
    //     //console.log(target);
    //     fetch("https://blynk.cloud/external/api/update?token=PIhHUS2rhKB6AlJQeN7TGcMh326zGV4-&v1=" + target)
    //     // document.querySelector('#result').innerHTML = target;
    //     return false;
    // }

    const inputslider_u = document.querySelector("#u");
    inputslider_u.oninput = () => {
        value1 = inputslider_u.value;
        document.querySelector("#us").innerHTML = value1;
        fetch("https://blynk.cloud/external/api/update?token=LvC6vyL_uPSpPdgnlCln0I9Vab6zcogV&v1=" + value1)
        sessionStorage.setItem('saved_val_u', value1);
        console.log(value1 + "and" + value2);
        document.querySelector("#f").innerHTML = ((parseFloat(value1)*parseFloat(value2))/(parseFloat(value1) + parseFloat(value2))).toFixed(2);
        return false;
    }

    const inputslider_v = document.querySelector("#v");
    inputslider_v.oninput = () => {
        value2 = inputslider_v.value;
        document.querySelector("#vs").innerHTML = value2;
        fetch("https://blynk.cloud/external/api/update?token=LvC6vyL_uPSpPdgnlCln0I9Vab6zcogV&v2=" + value2)
        sessionStorage.setItem('saved_val_v', value2);
        console.log(value2 + "and" + value1);
        document.querySelector("#f").innerHTML = ((parseFloat(value1)*parseFloat(value2))/(parseFloat(value1) + parseFloat(value2))).toFixed(2);
        return false;
    }

});

function increment(ID) {
    console.log("Haan main pagal hai for " + ID);
    const cur = document.getElementById(ID);
    var v1 = cur.value;
    v1 = (Number(v1) + Number(cur.step)).toFixed(1);
    if (Number(v1) > 43) {
        v1 = 43.0;
    }
    cur.value = v1;
    document.getElementById(ID + "s").innerHTML = v1;
    console.log(String.fromCharCode(ID.charCodeAt(0) - 68));
    sessionStorage.setItem("saved_val_"+ID, v1);
    if(ID == "u"){
        value1 = v1;
    }else{
        value2 = v1;
    }
    fetch("https://blynk.cloud/external/api/update?token=LvC6vyL_uPSpPdgnlCln0I9Vab6zcogV&v" + String.fromCharCode(ID.charCodeAt(0) - 68) + "=" + v1)
    document.querySelector("#f").innerHTML = parseFloat((parseFloat(value1)*parseFloat(value2))/(parseFloat(value1) + parseFloat(value2))).toFixed(2);

}

function decrement(ID) {
    console.log("Haan main pagal hai for " + ID);
    const cur = document.getElementById(ID);
    var v1 = cur.value;
    v1 = (Number(v1) - Number(cur.step)).toFixed(1);
    if (Number(v1) < 0.0) {
        v1 = 0.0;
    }
    cur.value = v1;
    document.getElementById(ID + "s").innerHTML = v1;
    console.log(String.fromCharCode(ID.charCodeAt(0) - 68));
    sessionStorage.setItem("saved_val_"+ID, v1);
    if(ID == "u"){
        value1 = v1;
    }else{
        value2 = v1;
    }

    fetch("https://blynk.cloud/external/api/update?token=LvC6vyL_uPSpPdgnlCln0I9Vab6zcogV&v" + String.fromCharCode(ID.charCodeAt(0) - 68) + "=" + v1)
    document.querySelector("#f").innerHTML = ((parseFloat(value1)*parseFloat(value2))/(parseFloat(value1) + parseFloat(value2))).toFixed(2);

}

function leave(){
    sessionStorage.removeItem("saved_countdown");
    sessionStorage.removeItem("saved_val_v");
    sessionStorage.removeItem("saved_val_u");
    console.log("DONE");
    console.log("YES");
    location.replace("../home_page/home.html")
    fetch("https://blynk.cloud/external/api/update?token=R77dMWPsQ8B7xavEV_HVjaVF01DklJji&v0=" + "1")
}

window.addEventListener('beforeunload',  () => {
    fetch("https://blynk.cloud/external/api/update?token=R77dMWPsQ8B7xavEV_HVjaVF01DklJji&v0=" + "1")
});