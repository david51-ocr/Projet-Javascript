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
    const buttonAll = filtres.querySelectorAll("button");
    const classes = ["btnTous", "btnObjet", "btnAppt", "btnHR"];
    buttonAll.forEach((button, i) => {
        button.classList.add(classes[i]);
    });
};


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
    const btnTous = document.querySelector(".btnTous");
    const btnObjet = document.querySelector(".btnObjet");
    const btnAppt = document.querySelector(".btnAppt");
    const btnHR = document.querySelector(".btnHR");
    const nomCategories = projets.map(categorie => categorie.category.name);
    btnTous.addEventListener("click", function () {
        const btnTousFiltrer = projets.filter(function (projet) {
            return true;
        })
        document.querySelector(".gallery").innerHTML = "";
        imgProjet(btnTousFiltrer);

    });

    btnObjet.addEventListener("click", async function () {
        const projets = await recupererProjet();
        const btnObjetFiltrer = projets.filter(function (projet) {
            return projet.category.name === "Objets"
        });
        document.querySelector(".gallery").innerHTML = "";
        imgProjet(btnObjetFiltrer);
    });
    btnAppt.addEventListener("click", async function () {
         const projets = await recupererProjet();
        const btnApptFiltrer = projets.filter(function (projet) {
            return projet.category.name === "Appartements"
        });
        document.querySelector(".gallery").innerHTML = "";
        imgProjet(btnApptFiltrer);
    });
    btnHR.addEventListener("click", async function () {
        const projets = await recupererProjet();
        const btnHRFiltrer = projets.filter(function (projet) {
            return projet.category.name === "Hotels & restaurants"
        });
        document.querySelector(".gallery").innerHTML = "";
        imgProjet(btnHRFiltrer);
    });
};

/*login and logout*/
const token = localStorage.getItem("token");
const logout = document.querySelector(".logout");
const login = document.querySelector(".login");

login.addEventListener("click", function () {
    window.location.href = "login.html"
})
logout.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.reload();
})

if (token) {
    document.querySelector(".modeEdition").classList.remove("cacher");
    login.classList.add("cacher");
} else {
    document.querySelector(".modeEdition").classList.add("cacher");
    logout.classList.add("cacher");
};

function gestionModale(fenetre) {
    const modale = document.querySelector(".modale");
    const galerieModale = document.querySelector(".galerieModale");
    const ouvrirModale = document.querySelector(".ouvrirModale");
    const fermeModale = document.querySelector(".fermerModale");
    galerieModale.innerHTML = "";
    fenetre.forEach(modales => {
        const figure = document.createElement("figure");
        figure.classList.add("photoModale");
        const image = document.createElement("img");
        const btnSupprimer = document.createElement("button");
        btnSupprimer.classList.add("btnSupprimer");
        image.src = modales.imageUrl;
        image.alt = modales.title;
        figure.appendChild(image);
        figure.appendChild(btnSupprimer);
        galerieModale.appendChild(figure);
        
        const poubelle = document.createElement("i");
        poubelle.classList.add("fa-solid", "fa-trash-can");
        btnSupprimer.appendChild(poubelle);
        
        btnSupprimer.addEventListener("click", async function() {
        
        const reponse =   await fetch(`http://localhost:5678/api/works/${modales.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (reponse.ok) {
                figure.remove();
    const projets = await recupererProjet();

    document.querySelector(".gallery").innerHTML = "";

    imgProjet(projets);
}
    })

   
        });
    
        

    ouvrirModale.addEventListener("click", function () {
        modale.classList.remove("cacher");
    });
    fermeModale.addEventListener("click", function () {
        modale.classList.add("cacher");
    });
    const btnProjet = document.querySelector(".btnAjouter");
    btnProjet.addEventListener("click", function () {
        nouveauProjet(fenetre);
        chargerCategories();
    });
};



//* ajout nouveau projet*//
function nouveauProjet(fenetre) {
    const ajoutProjet = document.querySelector(".contenuModale");
    ajoutProjet.innerHTML = `
        <button class="retour">
            <i class="fa-solid fa-arrow-left"></i></button>
             <h3>Ajout photo</h3>
 <form id="formAjoutPhoto">
<div class="ajout-image">
                <i class="fa-regular fa-image "></i>

                <label for="image" class="btnImage">
                    + Ajouter photo
                </label>

                <input type="file"id="image"name="image"accept="image/png, image/jpeg" hidden>
            <p>jpg, png : 4 Mo max</p>
            </div>
            <label for="titre">Titre</label>
            <input  type="text"  id="titre" name="title">
            <label for="categorie">Catégorie</label>
            <select id="categorie" name="category"></select>
            <hr>
            <button type="submit" class="btnValider"> Valider</button>
        </form>  `;
    const btnRetour = document.querySelector(".retour");
    btnRetour.addEventListener("click", function () {
        ajoutProjet.innerHTML = `
        <button class="fermerModale">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <h2>Galerie photo</h2>

        <div class="galerieModale"></div>

        <button class="btnAjouter">Ajouter une photo</button>
    `;

        gestionModale(fenetre);

    });
};

async function chargerCategories() {
    const categories = await recupererCategories();
    const choixCategorie = document.getElementById("categorie");

    categories.forEach(categorie => {
        const option = document.createElement("option");
        option.value = categorie.id;
        option.textContent = categorie.name;
        choixCategorie.appendChild(option);
    });
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