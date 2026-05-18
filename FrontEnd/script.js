/*récup api*/
async function recupererProjet() {
    const reponses = await fetch("http://localhost:5678/api/works");
    const projets = await reponses.json();
    return projets;

}


/*insertion projet*/

async function imgProjet() {

    const projets = await recupererProjet();
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

imgProjet();

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
        const classes = ["btnTous", "btnObjet", "btnAppt", "btnH&R"];
    buttonAll.forEach((button, i) => {
    button.classList.add(classes[i]);
});
}

afficherFiltres();
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

activeFiltres();


async function recupererFiltres (){
    const projets = await recupererProjet();
    const btnObjet = document.querySelector(".btnObjet");
    btnObjet.addEventListener("click", function (){
        const btnObjetFiltrer = projets.filter(function(projet){
            return projet.category.name === "Objets"
        });
         console.log(btnObjetFiltrer);
    });
};

recupererFiltres();