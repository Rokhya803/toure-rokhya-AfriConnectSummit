const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".linknav");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Button Mode Jour / Nuit
const toggleBtn = document.getElementById('dark-mode');

if(toggleBtn){

    if(localStorage.getItem('theme') === 'dark'){

        document.body.classList.add('dark-mode');

        toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    }


    toggleBtn.addEventListener('click',()=>{

        document.body.classList.toggle('dark-mode');

        if(document.body.classList.contains('dark-mode')){

            localStorage.setItem('theme','dark');

            toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

        }else{

            localStorage.setItem('theme','light');

            toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';

        }

    });

}



//  COMPTE A REBOURS CONFERENCE 

const countdownNumbers = document.querySelectorAll(".countdown-card span");

const dateConference = new Date("November 20, 2026 09:00:00").getTime();

function countdown(){

    const maintenant = new Date().getTime();

    const distance = dateConference - maintenant;

    if(distance > 0){

        const jours = Math.floor(distance / (1000 * 60 * 60 * 24));

        const heures = Math.floor(

            (distance % (1000 * 60 * 60 * 24)) /

            (1000 * 60 * 60)

        );

        const minutes = Math.floor(

            (distance % (1000 * 60 * 60)) /

            (1000 * 60)

        );

        const secondes = Math.floor(

            (distance % (1000 * 60)) /

            1000

        );

        countdownNumbers[0].textContent = jours;

        countdownNumbers[1].textContent = heures;

        countdownNumbers[2].textContent = minutes;

        countdownNumbers[3].textContent = secondes;

    }

}
setInterval(countdown,1000);

// COMPTEURS CHIFFRES CLES 

const chiffres = document.querySelectorAll(".chiffre-card h3");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const element = entry.target;

            const valeurFinale = parseInt(

                element.textContent.replace("+","")

            );

            let compteur = 0;

            const animation = setInterval(()=>{

                compteur += Math.ceil(valeurFinale / 50);

                if(compteur >= valeurFinale){

                    compteur = valeurFinale;

                    clearInterval(animation);

                }

                if(element.textContent.includes("+")){

                    element.textContent = "+" + compteur;

                }else{

                    element.textContent = compteur;

                }

            },40);

            observer.unobserve(element);

        }

    });

});

chiffres.forEach(chiffre=>{

    observer.observe(chiffre);

});


// ONGLET PROGRAMME

const tabs = document.querySelectorAll(".tab");
const programmes = document.querySelectorAll(".sy");


if(tabs.length > 0){

    programmes.forEach((programme)=>{
        programme.style.display = "none";
    });

    document.querySelector(".jour1").style.display = "block";


    tabs.forEach((tab,index)=>{

        tab.addEventListener("click",()=>{

            // enlever active
            tabs.forEach(t=>{
                t.classList.remove("active");
            });

            // ajouter active
            tab.classList.add("active");


            // cacher tous les tableaux
            programmes.forEach(programme=>{
                programme.style.display="none";
            });


            // afficher le bon jour
            programmes[index].style.display="block";

        });

    });

}

// FILTRAGE DES INTERVENANTS

const filtre = document.querySelector(".filtre-intervenant");
const cartes = document.querySelectorAll(".fa-card");

if(filtre){

    filtre.addEventListener("change", () => {

        const categorie = filtre.value;

        cartes.forEach(card => {

            if(categorie === "tous" || card.dataset.category === categorie){
                card.style.display = "block";
            }else{
                card.style.display = "none";
            }

        });

    });

}

// Navbar Dynamique
 const navbar = document.querySelector(".navbar");
 window.addEventListener("scroll", () =>{

if(window.scrollY > 80){
    navbar.classList.add("scrolled");
}else{
    navbar.classList.remove("scrolled");
}
});

// ANIMATIONS AU SCROLL

const elements = document.querySelectorAll(

    ".fade-in, .slide-left, .slide-right, .zoom-in"

);

const animationObserver = new IntersectionObserver((entries) => {

entries.forEach(entry => {

    if(entry.isIntersecting){

            entry.target.classList.add("show");

            animationObserver.unobserve(entry.target);

        }

    });

},{

    threshold:0.2

});

elements.forEach(element => {

    animationObserver.observe(element);

});


// VALIDATION FORMULAIRE CONTACT

const formContact = document.querySelector(".contact-form");

if(formContact){

    formContact.addEventListener("submit", (e)=>{

        e.preventDefault();

        const nom = document.querySelector("#nom");
        const email = document.querySelector("#email");
        const telephone = document.querySelector("#telephone");
        const participation = document.querySelector("#participation");
        const pays = document.querySelector("#pays");
        const message = document.querySelector("#message");

        let valide = true;


        // Nom
        if(nom.value.trim() === ""){
            afficherErreur(nom, "Le nom est obligatoire");
            valide = false;
        }else{
            supprimerErreur(nom);
        }


        // Email
        if(email.value.trim() === "" || !email.value.includes("@")){
            afficherErreur(email, "Email invalide");
            valide = false;
        }else{
            supprimerErreur(email);
        }


        // Téléphone
        if(telephone.value.trim().length !== 8 || isNaN(telephone.value)){
            afficherErreur(telephone, "Le téléphone doit contenir 9 caractères");
            valide = false;
        }else{
            supprimerErreur(telephone);
        }


        // Type participation
        if(participation.value === ""){
            afficherErreur(participation, "Choisissez un type de participation");
            valide = false;
        }else{
            supprimerErreur(participation);
        }


        // Pays
        if(pays.value === ""){
            afficherErreur(pays, "Sélectionnez un pays");
            valide = false;
        }else{
            supprimerErreur(pays);
        }


        // Motivation
        if(message.value.trim().length < 20){
            afficherErreur(message, "La motivation doit contenir minimum 20 caractères");
            valide = false;
        }else{
            supprimerErreur(message);
        }


        // Succès
        if(valide){

            alert("Merci ! Votre inscription a été envoyée avec succès !");

            formContact.reset();

        }

    });

}


// Afficher les erreurs

function afficherErreur(champ, texte){

    champ.style.border = "2px solid red";

    let erreur = champ.parentElement.querySelector(".erreur");

    if(!erreur){

        erreur = document.createElement("small");
        erreur.classList.add("erreur");
        champ.parentElement.appendChild(erreur);

    }

    erreur.textContent = texte;
    erreur.style.color = "red";

}


// Supprimer les erreurs

function supprimerErreur(champ){

    champ.style.border = "";

    const erreur = champ.parentElement.querySelector(".erreur");

    if(erreur){
        erreur.remove();
    }

}

// VALIDATION DU FORMULAIRE

const form = document.querySelector(".contact-form");

if(form){

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const nom = document.getElementById("nom");
        const email = document.getElementById("email");
        const telephone = document.getElementById("telephone");
        const participation = document.getElementById("participation");
        const message = document.getElementById("message");

        let valide = true;

        // Réinitialiser les bordures
        [nom, email, telephone, participation, message].forEach(champ=>{
            champ.style.border = "1px solid #ddd";
        });

        if(nom.value.trim() === ""){
            nom.style.border = "2px solid red";
            valide = false;
        }

        if(!email.value.includes("@")){
            email.style.border = "2px solid red";
            valide = false;
        }

        if(telephone.value.trim().length < 9){
            telephone.style.border = "2px solid red";
            valide = false;
        }

        if(participation.value === "Choisir"){
            participation.style.border = "2px solid red";
            valide = false;
        }

        if(message.value.trim().length < 20){
            message.style.border = "2px solid red";
            valide = false;
        }

        if(valide){
            alert("Inscription envoyée avec succès !");
            form.reset();
        }

    });

}



// ANNÉE DYNAMIQUE

const annee = document.getElementById("annee");

if(annee){
    annee.textContent = new Date().getFullYear();
}


// Bouton en retour en haut
const btnTop = document.getElementById("btn-top")

if(btnTop){

    btnTop.style.display ="none"

    window.addEventListener("scroll", ()  => {

        if(window.scrollY > 300){

            btnTop.style.display = "flex"

        }else{

            btnTop.style.display = "none";


        }
    });
    btnTop.addEventListener("click", (e) => {

        e.preventDefault();

        Window.scrolledTo({

            top: 0,

            behavior: "smooth"
        });
    });
}