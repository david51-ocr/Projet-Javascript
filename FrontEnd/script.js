/*récup api*/
async function recupererProjet() {
    const reponses = await fetch("http://localhost:5678/api/works");
    const projets = await reponses.json();
    return projets;

}


/*insertion projet*/

async function imgProjet(projets) {
    let gallery = document.querySelector(".gallery");

    projets.forEach(projet => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = projet.imageUrl;
        image.alt = projet.title;
        const title = document.createElement("figcaption");
        title.innerText = projet.title;
        figure.appendChild(image);
        figure.appendChild(title);

        gallery.appendChild(figure);
    });
}



/*filtres projet*/
async function recupererCategories() {
    const reponses = await fetch("http://localhost:5678/api/categories");
    const categories = await reponses.json();
    return categories;
}

async function afficherFiltres() {

    const categories = await recupererCategories();
    let filtres = document.querySelector(".filtres");

    const buttonTous = document.createElement("button");
    buttonTous.innerText = "Tous";
    filtres.appendChild(buttonTous);
    buttonTous.classList.add("categorie");
    categories.forEach(categorie => {
        const button = document.createElement("button");
        button.classList.add("categorie");
        button.innerText = categorie.name;
        filtres.appendChild(button);

    });
    /*classe unique a chaque button*/
    const buttonAll = document.querySelectorAll("button");
    const classes = ["btnTous", "btnObjet", "btnAppt", "btnHR"];
    buttonAll.forEach((button, i) => {
        button.classList.add(classes[i]);
    });
}


/*filtres clique*/
async function activeFiltres() {

    const categories = await recupererCategories();
    const buttonFiltres = document.querySelectorAll(".categorie");


    buttonFiltres.forEach(button => {
        button.addEventListener("click", () => {
            buttonFiltres.forEach(btn => {
                btn.classList.remove("active");
            })
            button.classList.add("active");

        });
    });
}



async function recupererFiltres() {
    const projets = await recupererProjet();
    const btnTous = document.querySelector(".btnTous");
    const btnObjet = document.querySelector(".btnObjet");
    const btnAppt = document.querySelector(".btnAppt");
    const btnHR = document.querySelector(".btnHR");
    const nomCategories = projets.map(categorie=>categorie.category.name);
    btnTous.addEventListener("click", function () {
        const btnTousFiltrer = projets.filter(function (projet) {
            return true;
        })
         document.querySelector(".gallery").innerHTML="";
        imgProjet(btnTousFiltrer);

    });

    btnObjet.addEventListener("click", function () {
        const btnObjetFiltrer = projets.filter(function (projet) {
            return projet.category.name === "Objets"
        });
        document.querySelector(".gallery").innerHTML="";
        imgProjet(btnObjetFiltrer);
    });
     btnAppt.addEventListener("click", function () {
        const btnApptFiltrer = projets.filter(function (projet) {
            return projet.category.name === "Appartements"
        });
         document.querySelector(".gallery").innerHTML="";
        imgProjet(btnApptFiltrer);
    });
     btnHR.addEventListener("click", function () {
        const btnHRFiltrer = projets.filter(function (projet) {
            return projet.category.name === "Hotels & restaurants"
        });
         document.querySelector(".gallery").innerHTML="";
        imgProjet(btnHRFiltrer);
    });
};

/*login and logout*/
const token = localStorage.getItem("token");
const logout = document.querySelector(".logout");
const login = document.querySelector (".login");

login.addEventListener ("click", function(){
    window.location.href = "login.html"
})
logout.addEventListener("click", function(){
    localStorage.removeItem("token");
    window.location.reload();
})

if(token){
    document.querySelector(".modeEdition").classList.remove("cacher");
    login.classList.add("cacher");
}else{
    document.querySelector(".modeEdition").classList.add("cacher");
    logout.classList.add("cacher");
};

function gestionModale(fenetre){
const modale = document.querySelector(".modale");
modale.classList.add("cacher");
const galerieModale = document.querySelector(".galerieModale");
const ouvrirModale = document.querySelector(".ouvrirModale");
const fermeModale = document.querySelector(".fermerModale");

fenetre.forEach(modales => {
      const figure = document.createElement("figure");
      figure.classList.add("photoModale");
const image = document.createElement("img");
const btnSupprimer = document.createElement ("button");
        btnSupprimer.classList.add("btnSupprimer");
        image.src = modales.imageUrl;
        image.alt = modales.title;
        figure.appendChild(image);
        figure.appendChild(btnSupprimer);
        galerieModale.appendChild(figure);

        const poubelle = document.createElement ("i");
        poubelle.classList.add("fa-solid", "fa-trash-can");
        btnSupprimer.appendChild(poubelle);

    });
ouvrirModale.addEventListener("click", function(){
    modale.classList.remove("cacher");
});
fermeModale.addEventListener("click", function(){
    modale.classList.add("cacher");
});
console.log(modale);
console.log(ouvrirModale);
console.log(fermeModale);
};

async function init() {
    const projets = await recupererProjet();

    imgProjet(projets);

    await afficherFiltres();

    activeFiltres();

    recupererFiltres();

    gestionModale(projets);
}

init();



// modale//


