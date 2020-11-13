const contador = document.getElementsByClassName('contador')[0];
const formulario = document.getElementsByTagName('form')[0];

const agregarInput = () => {
    let valor = contador.value;
    if (valor != 0) { 
        let inputActor = document.querySelectorAll('input[type = text]');
        let msgActor = document.querySelectorAll('.msgActor');
        inputActor.forEach((el) => {
            formulario.removeChild(el);
        }); 
        msgActor.forEach((el) => {
            formulario.removeChild(el);
        });
        for (let i = 0; i < valor; i++) {
            formulario.insertAdjacentHTML ('afterbegin','<input type="text" name="actor" placeholder="Nombre del actor" required>')
        };
    };    
};

contador.addEventListener('change' , (e) => {
    e.preventDefault();
    agregarInput();
});

contador.addEventListener('keyup' , (e) => {
    e.preventDefault();
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
        agregarInput();
    };
});
