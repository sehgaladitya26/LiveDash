const card1 = document.querySelector("#fl_in");

card1.addEventListener("click", function (e) {
  card1.classList.toggle('is-flipped');
});

const card2 = document.querySelector("#pend_in");

card2.addEventListener("click", function(e) {
  card2.classList.toggle('is-flipped');
});

const card3 = document.querySelector("#van_in");

card3.addEventListener("click", function (e) {
  card3.classList.toggle('is-flipped');
});

function pendulum_theory(){
  location.href='../pendulum/theory.html';
}

function vanish_theory(){
  location.href='../vanish/theory.html';
}

function focal_theory(){
  location.href='../focal_length/theory.html';
}

function pendulum_exp(){
  location.href='../pendulum/pendulum.html';
}

function focal_exp(){
  location.href='../focal_length/index.html';
}

function vanish_exp(){
  fetch('https://blynk.cloud/external/api/get?token=R77dMWPsQ8B7xavEV_HVjaVF01DklJji&v3')
    .then(response => response.json())
    .then(data => {
      const myJSON = JSON.stringify(data)
      if (myJSON == "0") {
        console.log("FUCK YOU");
        location.href='../vanish/vanish.html'
        fetch("https://blynk.cloud/external/api/update?token=R77dMWPsQ8B7xavEV_HVjaVF01DklJji&v3=1")
      }
      else{
        location.href='../vanish/queue.html'
      }
    })
}

window.addEventListener('DOMContentLoaded', () => {
  if(typeof uid === 'undefined'){
    location.href = '../sign_in/sign_in.html'
  }
})


window.addEventListener("orientationchange", ()=> {
  if(window.orientation == 90){
    console.log("landscape");
    document.querySelector('.head').style.display = 'block'
  }else{
    console.log("portrait");
    document.querySelector('.head').style.display = 'none'
  }
})
