let greeting = document.querySelector('h1');
window.onload = onLoad

function onLoad () {
  let randomUser = getRandomUser();
  greeting.innerText = `Hello ${randomUser.getFirstName()}!`
}

function getRandomUser() {
  let randomIndex = Math.floor(Math.random() * userData.length)
  return new User(userData[randomIndex]);
}

function getUserInfo() {

}
