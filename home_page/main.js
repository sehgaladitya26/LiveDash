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
  location.href='../focal/theory.html';
}

function pendulum_exp(){
  location.href='../pendulum/pendulum.html';
}

function focal_exp(){
  location.href='../focal/index.html';
}

function vanish_exp(){
  location.href='../vanish/vanish.html';
}