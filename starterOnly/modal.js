function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const btnSubmit = document.querySelector(".btn-submit");

const thanksForm = document.querySelector(".bground2");
const closeThanksFormBtn = document.querySelector(".closeBtn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  firstValidate();
  lastValidate();
  emailValidate();
  birthdateValidate();
  tournamentQuantityValidate();
  whichTournamentValidate();
  CGUValidate();  
}

function launchThanksModal() {
  thanksForm.style.display = "block";
}


//#1 TODO : fermer la modale 
const modalCloseFormBtn = document.querySelectorAll(".close");
const modalCloseThanksFormBtn = document.querySelectorAll(".close2");
const formData = document.querySelectorAll(".formData");

//launch modal close event
modalCloseFormBtn.forEach((btn) => btn.addEventListener("click", closeModal));
modalCloseThanksFormBtn.forEach((btn) => btn.addEventListener("click", closeModal2));

closeThanksFormBtn.addEventListener("click",closeModal2);


// clause modal form
function closeModal(){
  modalbg.style.display = "none";
}
function closeModal2(){
  thanksForm.style.display = "none";
}
//#2 Implémenter entrées du formulaire
const form = document.getElementById("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantityOfTournament = document.getElementById("quantity");
const whichTournamentLabel = document.getElementById("whichTournament"); 
const checkbox2Label = document.getElementById("checkbox1Label");

const location1 = document.getElementById("location1");
const location2 = document.getElementById("location2");
const location3 = document.getElementById("location3");
const location4 = document.getElementById("location4");
const location5 = document.getElementById("location5");
const location6 = document.getElementById("location6");
const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");

// Implémenter les div permettant d'écrire les messages erreurs et les regex pour tester chacun des inputs lors de sa modification ET du submit
const errorFirst = document.getElementById("errorFirst");
const errorLast = document.getElementById("errorLast");
const errorEmail = document.getElementById("errorEmail");
const errorBirthdate = document.getElementById("errorBirthdate");
const errorQuantity = document.getElementById("errorQuantity");
const errorWhichTournament = document.getElementById("errorWhichTournament");
const errorCheckbox1 = document.getElementById("errorChebox1");

//Différents regex à tester pour les inputs
const namesRegex = /^[a-zA-Z\-]+$/;
const quantityRegex = /^\d+$/;
const birthdateRegex = /^\d{4}[./-]\d{2}[./-]\d{2}$/; //Format de Date anglaise, malgré l'affichage inversé pour notre format
const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/;

let firstChecked;
let lastChecked;
let emailChecked;
let birthdateChecked;
let quantityTournamentChecked;
let whichTournamentChecked;
let CGUChecked;

//Empecher le formulaire de se vider par défaut, si les inputs ne sont pas toutes validés, lorsqu'on le submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
});


function validate(){  

  //Test des différents inputs lorsqu'on valide le formulaire --> qu'on submit
  firstValidate();
  lastValidate();
  emailValidate();
  birthdateValidate();
  tournamentQuantityValidate();
  whichTournamentValidate();
  CGUValidate();  

  //Si toutes les inputs sont validé grâce aux tests avec les regex, alors on "envoie" le formulaire
  if(firstChecked && lastChecked && emailChecked && birthdateChecked && quantityTournamentChecked && whichTournamentChecked && CGUChecked){
    // Ici, le formulaire serait envoyé, mais comme c'est un projet simple, un form.submit() n'est pas totalement adapté ; Il faudrait faire un appel Ajax au back (inexistant)
    // Pour le simuler, on va vider les inputs manuellement, puis fermer le formulaire
    closeModal();
    launchThanksModal();
    
    //Pour ce projet, on clear le formulaire manuellement car il n'est pas réélement envoyé :
    quantityOfTournament.value = birthdate.value = email.value = lastName.value = firstName.value=""; //vider les inputs 
    location1.checked = location2.checked = location3.checked = location4.checked = location5.checked = location6.checked = checkbox1.checked = checkbox2.checked = false; //décocher les checkbox
  }
}

//Factorisation de la fonction d'erreur sur mes inputs
function errorEditIfError(errorDivStyle,errorDivTextOrBorder,errorMessage,errorTextPossible){
  errorDivStyle.innerText=errorMessage;
  errorDivStyle.classList.add("errorEditIfError");
  if(errorTextPossible){
    errorDivTextOrBorder.classList.add("errorEditTextRed")
  }
  else{errorDivTextOrBorder.classList.add("errorEditBorderRed")}
}
function errorEditElseNoError(errorDivStyle,errorDivTextOrBorder,errorTextPossible){
  errorDivStyle.innerText="";
  errorDivStyle.classList.add("errorEditIfNoError");
  if(errorTextPossible){
    errorDivTextOrBorder.classList.remove("errorEditTextRed")
  }
  else{errorDivTextOrBorder.classList.remove("errorEditBorderRed")}
}

//fonctions de validations des différents inputs 
function firstValidate(){  
  if(firstName.value.length<2 || firstName.value =="" || firstName.value==null||!firstName.value.match(namesRegex)){
    errorMessage = "Veuillez rentrer au minimum 2 lettres pour le prénom";
    errorEditIfError(errorFirst,firstName,errorMessage);
    firstChecked=false;
  }
  else{
    errorEditElseNoError(errorFirst,firstName);
    firstChecked=true;
  }
}

function lastValidate(){  
  if(lastName.value.length<2 || lastName.value =="" || lastName.value==null||!lastName.value.match(namesRegex)){
    errorMessage ="Veuillez rentrer au minimum 2 lettres pour le nom ";
    errorEditIfError(errorLast,lastName,errorMessage);
    lastChecked=false;
  }
  else{
    errorEditElseNoError(errorLast,lastName);
    lastChecked=true;
  }
}

function emailValidate(){
  if(!email.value.match(mailRegex)){
    errorMessage ="Format eMail incorrect ! (exemple@test.testexe)";
    errorEditIfError(errorEmail,email,errorMessage);
    emailChecked=false;
  }
  else{
    errorEditElseNoError(errorEmail,email);
    emailChecked=true;
  }
}

function birthdateValidate(){
  console.log(birthdate.value);
  if(!birthdate.value.match(birthdateRegex)){
    errorMessage="Veuillez remplir votre date de naissance !";
    errorEditIfError(errorBirthdate,birthdate,errorMessage);
    birthdateChecked=false;
  }
  else{
    errorEditElseNoError(errorBirthdate,birthdate);
    birthdateChecked=true;
  }
}

function tournamentQuantityValidate(){
  if(!quantityOfTournament.value.match(quantityRegex)){
    errorMessage ="Veuillez indiquer le nombre de tournois auxquels  vous avez participé !";
    errorEditIfError(errorQuantity,quantityOfTournament,errorMessage);
    quantityTournamentChecked=false;
  }
  else{
    errorEditElseNoError(errorQuantity,quantityOfTournament);
    quantityTournamentChecked=true;
  }
}

function whichTournamentValidate(){
  let errorTextPossible = true;
  if(!location1.checked && !location2.checked && !location3.checked && !location4.checked && !location5.checked && !location6.checked){
    errorMessage ="Veuillez choisir le tournoi auquel vous souhaitez participer !";
    errorEditIfError(errorWhichTournament,whichTournamentLabel,errorMessage,errorTextPossible);
    whichTournamentChecked=false;
  }
  else{
    errorEditElseNoError(errorWhichTournament,whichTournamentLabel,errorTextPossible);
    whichTournamentChecked=true;
  }
}

function CGUValidate(){
  let errorTextPossible = true;
  if(!checkbox1.checked){
    errorMessage ="Veuillez accepter les Conditions Générales d'Utilisation";
    errorEditIfError(errorCheckbox1,checkbox2Label,errorMessage,errorTextPossible);
    CGUChecked=false;
  }
  else{
    errorEditElseNoError(errorCheckbox1,checkbox2Label,errorTextPossible);
    CGUChecked=true;
  }
}

//fonction pour rendre actif ( et donc surligner en rouge ) uniquement le lien sur lequel on click
function navBarClick(idClicked){
  let linkTab = document.querySelectorAll(".main-navbar a"); //recuperation de tout les liens de la navBar
  for(let i=0;i<linkTab.length;i++){ 
    linkTab[i].classList.remove("active");    
  }
  let whichLinkClicked = document.getElementById(idClicked);
  whichLinkClicked.classList.add("active");  
}

function locationCheckboxFunction(idLocation){
  idClicked = idLocation.slice(8)-1;
  let locationCheckboxTab = document.querySelectorAll(".formData .location-checkbox");
  for(let i=0;i<locationCheckboxTab.length;i++){
    locationCheckboxTab[i].checked=false;
  }
  locationCheckboxTab[idClicked].checked = true;

  whichTournamentValidate(idClicked);
}

// Bouton navBar responsive
let navBarIcon = document.querySelector(".fa-bars");
let topnav = document.querySelector(".topnav");
let navBarLinks = document.querySelector(".main-navbar");
let navBarLink1 = document.querySelector("#navBarLink1 span");
let navBarLink4 = document.querySelector("#navBarLink4 span");
let isNavBarIconClicked = false;

function navBarIconClick(){
  if(isNavBarIconClicked){
    navBarLinks.style.display="none";
    isNavBarIconClicked = false;
  }
  else{
    topnav.style.flexDirection="column"
    navBarLinks.style.display="flex";
    navBarLink1.firstChild.data="Détails";
    navBarLink4.firstChild.data="Évènements";
    isNavBarIconClicked = true;
  }

}





