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