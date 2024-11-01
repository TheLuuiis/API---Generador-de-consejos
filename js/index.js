'use strict'
// <    >  =>

let pagina = 1;
const button = document.getElementById('button');

const cargarConsejos = async () => {
    try {
        const respuesta = await fetch('https://api.adviceslip.com/advice', {
            cache: 'no-store'
        });

        if(respuesta.status === 200) {
            const datos = await respuesta.json();

            let consejos = '';
            consejos += `
                <div class="description">
                    <h1>ADVICE #${datos.slip.id}</h1>
                    <p>
                        "${datos.slip.advice}"
                    </p>
                    <img src="./images/pattern-divider-desktop.svg" alt="divider">
                </div>
            `;

            document.getElementById('container').innerHTML = consejos;
            
            document.getElementById('container').innerHTML += `
                <a href="#" class="button" id="button">
                    <img src="./images/icon-dice.svg" alt="button">
                </a>
            `;
            
            document.getElementById('button').addEventListener('click', handleClick);
        } else if(respuesta.status === 401) {
            console.log('Pusiste la llave mal');
        } else if(respuesta.status === 404) {
            console.log('El consejo que buscas no existe');
        } else {
            console.log('Error!');
        };

    } catch (error) {
        console.log(error);
    }
};

const handleClick = (e) => {
    e.preventDefault(); 
    pagina += 1;
    cargarConsejos();
};

button.addEventListener('click', handleClick);

cargarConsejos();