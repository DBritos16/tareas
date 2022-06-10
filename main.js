let form = document.getElementById(`formulario`)
let inputs = document.querySelectorAll(`input`);
const select1 = document.getElementById(`estado`)
const boton = document.getElementById(`boton`);

boton.disabled = true;

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{6,20}$/,
    descripcion: /^[a-zA-ZÀ-ÿ\s]{6,80}$/,
}

let campos = {
    ayn: false,
    descripcion: false,
    select: false,
}

function validarForm(e){
    switch (e.target.name) {
        case `ayn`:
            validarCampos(expresiones.nombre, e.target, `ayn`)
            disabled()
            break;
        default:
            validarCampos(expresiones.descripcion, e.target, `descripcion`)
            disabled()
            break;
    }
}

function select(){
    let x = document.getElementById(`estado`).value
    if (x !== `0`){
        document.getElementById(`estado`).className = `form-select is-valid`
        campos[`select`] = true;
        disabled()} else {
        document.getElementById(`estado`).className = `form-select`
        campos[`select`] = false
        disabled()}
}

function validarCampos(expresion, input, campo){
    if (expresion.test(input.value)){
        campos[campo] = true;
        document.getElementById(`${campo}`).className = `form-control is-valid`
    } else {
            campos[campo] = false;
            document.getElementById(`${campo}`).className = `form-control is-invalid`}
}

function disabled() {
    if (campos.ayn && campos.descripcion && campos.select){
        boton.disabled = false;
    } else boton.disabled = true;
}

inputs.forEach(function(input){
    input.addEventListener(`keyup`, validarForm);
    input.addEventListener(`blur`, validarForm);
})


form.addEventListener(`submit`, function(event){
    event.preventDefault();

    let datos = new FormData(form);

    if (datos.get(`estado`) === `0`){
        document.getElementById(`estado`).className = `form-select is-invalid`
    }
    
    if (campos.ayn && campos.descripcion && campos.select){

    let tabla = document.getElementById(`htmltable`);

    let nuevafila = tabla.insertRow(-1);

    let nuevacolumna = nuevafila.insertCell(0);
        nuevacolumna.textContent = (datos.get(`ayn`))
    
        nuevacolumna = nuevafila.insertCell(1);
        nuevacolumna.textContent = (datos.get(`tarea`))
    
        nuevacolumna = nuevafila.insertCell(2);

        switch (datos.get(`estado`)) {
            case `1`:
                    nuevacolumna.innerHTML = `<label class="badge badge-danger">Pendiente</label>`
                break;

            case `2`:
                    nuevacolumna.innerHTML = `<label class="badge badge-warning">En Progreso</label>`
                break;
            case `3`:
                nuevacolumna.innerHTML = `<label class="badge badge-success">Completado</label>`
                break;
            default:
                break;
        }

        form.reset();

        inputs.forEach(function(input){
            input.className = `form-control`
        })

        select1.className = `form-select`

        boton.disabled = true;
    }      
})