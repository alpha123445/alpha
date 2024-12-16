const hamburger = document.getElementById('hamburger');
const lienNav = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    lienNav.classList.toggle('open');
});


document.addEventListener("DOMContentLoaded", () => {
    const formulaireCompetence = document.getElementById("add-skill-form");
    const listeCompetences = document.getElementById("skills-list");

    let indexEdition = null;

    const chargerCompetences = () => {
        const competencesStockees = JSON.parse(localStorage.getItem("competences")) || [];
        competencesStockees.forEach((competence) => afficherCompetence(competence));
    };

    const sauvegarderCompetences = (competences) => {
        localStorage.setItem("competences", JSON.stringify(competences));
    };

    const afficherCompetence = (competence, index = null) => {
        const elementListe = document.createElement("li");
        elementListe.dataset.index = index;
        elementListe.innerHTML = `
            <div class="details">
                <strong>${competence.nom}</strong>
                <p>${competence.niveau}</p>
                ${competence.description ? `<p>${competence.description}</p>` : ""}
            </div>
            <button class="modifier">Modifier</button>
            <button class="supprimer">Supprimer</button>
        `;

        
        elementListe.querySelector(".modifier").addEventListener("click", () => {
            document.getElementById("skill-name").value = competence.nom;
            document.getElementById("skill-description").value = competence.description;
            document.getElementById("skill-level").value = competence.niveau;

           
            indexEdition = index;

            
            supprimerCompetence(competence.nom, false);
        });

        
        elementListe.querySelector(".supprimer").addEventListener("click", () => {
            supprimerCompetence(competence.nom);
            elementListe.remove();
        });

        listeCompetences.appendChild(elementListe);
    };

    formulaireCompetence.addEventListener("submit", (e) => {
        e.preventDefault();

        const nom = document.getElementById("skill-name").value.trim();
        const description = document.getElementById("skill-description").value.trim();
        const niveau = document.getElementById("skill-level").value;

        if (!nom) {
            alert("Le nom de la compétence est obligatoire !");
            return;
        }

        const nouvelleCompetence = { nom, description, niveau };
        const competences = JSON.parse(localStorage.getItem("competences")) || [];

        
        if (indexEdition !== null) {
            competences[indexEdition] = nouvelleCompetence;
            indexEdition = null; 
        } else {
            competences.push(nouvelleCompetence);
        }

       
        sauvegarderCompetences(competences);
        listeCompetences.innerHTML = ""; 
        competences.forEach((competence, index) => afficherCompetence(competence, index));

        formulaireCompetence.reset();
    });

    const supprimerCompetence = (nom, recharger = true) => {
        const competences = JSON.parse(localStorage.getItem("competences")) || [];
        const competencesMiseAJour = competences.filter(
            (competence) => competence.nom !== nom
        );
        sauvegarderCompetences(competencesMiseAJour);

  
        if (recharger) {
            listeCompetences.innerHTML = "";
            competencesMiseAJour.forEach((competence, index) =>
                afficherCompetence(competence, index)
            );
        }
    };

    chargerCompetences();
});
