const form = document.getElementById("contactForm");

const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
var nameValue
var emailValue
var subjectValue
var messageValue

const regexPatterns = {
    name: /^[a-z\s]{3,70}$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    subject: /^.{3,80}$/,
    message: /.+/
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
    confirmation();
});


function checkInputs(){
    nameValue = name.value;
    emailValue = email.value;
    subjectValue = subject.value;
    messageValue = message.value;
    
    if(nameValue === ""){
        setInvalidFor(name, 'Name cannot be blank.');
    } else if(!regexPatterns["name"].test(nameValue)) {
        setInvalidFor(name, "The name may only contain letters.");
    } else {
        setValidFor(name);
    }

    if(emailValue === ""){
        setInvalidFor(email, 'Email cannot be blank.');
    } else if(!regexPatterns["email"].test(emailValue)) {
        setInvalidFor(email, "Email is not valid.");
    } else {
        setValidFor(email);
    }

    if(subjectValue === ""){
        setInvalidFor(subject, 'Subject cannot be blank.');
    } else if(!regexPatterns["subject"].test(subjectValue)) {
        setInvalidFor(subject, "Subject must be at least 3 characters long.");
    } else {
        setValidFor(subject);
    }

    if(messageValue === ""){
        setInvalidFor(message, 'Message cannot be blank.');
    } else if(!regexPatterns["message"].test(messageValue)) {
        setInvalidFor(message, "Message is invalid.");
    } else {
        setValidFor(message);
    }
}

function setInvalidFor(input, errorMessage){
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    small.innerText = errorMessage;

    formControl.className = "form-control invalid"
} 

function setValidFor(input){
    const formControl = input.parentElement;

    formControl.className = "form-control valid"
}

function confirmation(){
    var validItems = document.getElementsByClassName("valid")

    if(validItems.length==4){
        function displaySuccessful(){
            var successful = document.getElementById("successful");
            var successfulMsg = document.getElementById("successfulMsg");
            successful.style.visibility="visible";
            successful.style.display="block";
            successfulMsg.innerText= "Thank you for contacting us, " + nameValue + "!"
        }
        displaySuccessful()
    }
}

document.getElementById('closeX').addEventListener('click', () => {
    document.getElementById('successful').style.display = "none";
    name.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";

    name.parentElement.classList.remove("valid");
    email.parentElement.classList.remove("valid");
    subject.parentElement.classList.remove("valid");
    message.parentElement.classList.remove("valid");
    name.parentElement.classList.remove("invalid");
    email.parentElement.classList.remove("invalid");
    subject.parentElement.classList.remove("invalid");
    message.parentElement.classList.remove("invalid");
})