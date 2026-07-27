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