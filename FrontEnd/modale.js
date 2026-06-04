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

        btnSupprimer.addEventListener("click", async function () {

            const reponse = await fetch(`http://localhost:5678/api/works/${modales.id}`, {
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
    if(!token){
        ouvrirModale.classList.add("cacher");
    };
    ouvrirModale.addEventListener("click", function () {
        modale.classList.remove("cacher");
    });
    fermeModale.addEventListener("click", function () {
        modale.classList.add("cacher");
    });
    const btnProjet = document.querySelector(".btnAjouter");
    btnProjet.addEventListener("click", function () {
        creationFormulaire(fenetre);

    });
};



//* ajout nouveau projet*//
 function creationFormulaire(fenetre) {
    const ajoutProjet = document.querySelector(".contenuModale");
    ajoutProjet.innerHTML = `
        <button class="retour">
            <i class="fa-solid fa-arrow-left"></i></button>
             <h2>Ajout photo</h2>
 <form id="formAjoutPhoto">
<div class="ajout-image">
                <i class="fa-regular fa-image "></i>

                <label for="image" class="btnImage" >
                    + Ajouter photo
                </label>

                <input type="file"id="image"name="image"accept="image/png, image/jpeg" hidden >
                <img id="previewImage" class="cacher">
            <p>jpg, png : 4 Mo max</p>
            </div>
            <label for="titre">Titre</label>
            <input  type="text"  id="titre" name="title">
            <label for="categorie">Catégorie</label>
            <select id="categorie" name="category">
              <option value="" selected disabled></option>
            </select>
            <p class= "erreurProjet "></p>
            <p class= "formulaireValider "></p>
            <hr>
            <button type="submit" class="btnValider"> Valider</button>
        </form>  `;
        const btnRetour = document.querySelector(".retour");
    btnRetour.addEventListener("click", async function () {
        ajoutProjet.innerHTML = `
        <button class="fermerModale">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <h2>Galerie photo</h2>

        <div class="galerieModale"></div>
        <hr>
        <button class="btnAjouter">Ajouter une photo</button>
    `;
      const projets = await recupererProjet();
        gestionModale(projets);
    });
    /*preview image*/
    const inputImage = document.getElementById("image");
    const previewImage = document.getElementById("previewImage");
    inputImage.addEventListener("change", function () {
        const fichier = inputImage.files[0];

        if (fichier) {
            previewImage.src = URL.createObjectURL(fichier);
            previewImage.classList.remove("cacher");
        }
    })

    chargerCategories();
    

    const formulaire = document.getElementById("formAjoutPhoto");
    formulaire.addEventListener("submit", async function (event) {
        event.preventDefault();
        const image = document.getElementById("image").files[0];
        const titre = document.getElementById("titre").value;
        const categorie = document.getElementById("categorie").value;


        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", titre);
        formData.append("category", categorie);
        const post = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });
        const reponse = await post.json();
        if (post.ok) {
            document.querySelector(".formulaireValider").innerText = "Votre projet est ajouté";
            document.querySelector(".erreurProjet").innerText = "";
        } else {
            document.querySelector(".erreurProjet").innerText = "Image ou titre non renseigné";
            document.querySelector(".formulaireValider").innerText = "";
        };
        const projets = await recupererProjet();

        document.querySelector(".gallery").innerHTML = "";

        imgProjet(projets);
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