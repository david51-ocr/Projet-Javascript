const loginForm = document.querySelector(".loginForm")

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();
    const email = document.getElementById("email").value;
    const motDepasse = document.getElementById("motDePasse").value;
    const login ={
    email: email,
    password:motDepasse
}; 
const reponseAPI = await fetch ("http://localhost:5678/api/users/login",{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify(login)
});
const data = await reponseAPI.json();
if (reponseAPI.ok){

localStorage.setItem("token", data.token);
window.location.href = "index.html";
console.log(data);
}else {
    document.querySelector (".erreurLogin") .innerText= "Erreur d'identifiant ou de mot de passe";
}
});


