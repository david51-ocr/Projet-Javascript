async function recupererProjet() {
    const reponses =  await fetch ("http://localhost:5678/api/works");
    const projets = await reponses.json();
    return projets;
    
}

recupererProjet();


async function imgProjet() {
    
    const projets = await recupererProjet();
    let gallery = document.querySelector(".gallery")

    projets.forEach(projet => {
       const figure = document.createElement ("figure");
       const image = document.createElement ("img");
       image.src = projet.imageUrl;
       image.alt = projet.title ;
       const title = document.createElement ("figcaption");
       title.innerText = projet.title;
       figure.appendChild(image);
       figure.appendChild (title)
       
       gallery.appendChild(figure)
    });
}

imgProjet();
