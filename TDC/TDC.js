const entrada = 2;

const medicion = document.getElementById('slider');
const valorMostrado = document.getElementById('sliderValue');
let valorMedido = parseFloat(medicion.value);



const kp = 2;
const kd = 1;

let e;
let f;
let currentTime, previousTime;

var perturbacionCheck = document.getElementById("myCheckbox");
var perturbacion;

perturbacionCheck.addEventListener("change", function() {
    perturbacion = perturbacionCheck.checked ? "si" : "no";
    console.log(perturbacion);

    document.getElementById("perturbacion").innerText = "Perturbacion: " + perturbacion;
});


medicion.addEventListener('input', () => {
    valorMedido = parseFloat(medicion.value);
    valorMostrado.textContent = valorMedido; 
});

const aplicarControlDerivativo = (variableAControlar) => {
    if(variableAControlar >= 3){
        return 0;
    }
    if(variableAControlar < 0){
        return 2;
    }
    else return 0;
}

const aplicarControlProporcional = (variableAControlar) => {
    if(variableAControlar > 3){
        return variableControlada = variableAControlar >= 3 ? 3 : variableAControlar;
    }
    
    if(variableAControlar < -8){
        return ((variableAControlar + 8)/(variableAControlar + 8))*kp;
    } 
    else if (variableAControlar < -6 && variableAControlar >= -8){
        return ((variableAControlar + 8)/(variableAControlar + 8))*kp;
    } 
    else if (variableAControlar < -4 && variableAControlar >= -6){
        return ((variableAControlar + 6)/(variableAControlar + 6))*kp;
    }
    else if (variableAControlar < -2 && variableAControlar >= -4){
        return ((variableAControlar + 4)/(variableAControlar + 4))*kp;
    }
    else if (variableAControlar < 0 && variableAControlar >= -2){
        return ((variableAControlar + 2)/(variableAControlar + 2))*kp;
    }
    else if (variableAControlar < 3 && variableAControlar >= 1.5){
        return variableAControlar;
    }
    else return 1.5;
}

console.log(aplicarControlDerivativo(5));
console.log(aplicarControlDerivativo(-4));
console.log(`control propo de 5: ${aplicarControlProporcional(5)}`);
console.log(`control propo de 2.5: ${aplicarControlProporcional(2.5)}`);
console.log(`control propo de 0: ${aplicarControlProporcional(0)}`);
console.log(`control propo de -1: ${aplicarControlProporcional(-1)}`);
console.log(`control propo de -3: ${aplicarControlProporcional(-3)}`);
console.log(`control propo de -5: ${aplicarControlProporcional(-5)}`);
console.log(`control propo de -7: ${aplicarControlProporcional(-7)}`);
console.log(`control propo de -9: ${aplicarControlProporcional(-9)}`);



const aplicarControl = (variableAControlar) => {
    var resultadoControlDerivativo = 0;
    if(perturbacion === "si"){
        resultadoControlDerivativo = aplicarControlDerivativo(variableAControlar);
    }
    const resultadoControlProporcional = aplicarControlProporcional(variableAControlar);

    const resultadoControl = resultadoControlDerivativo + resultadoControlProporcional;

    return resultadoControl > 3 ? 3 : resultadoControl;
} 

console.log(`_______________________ `);
console.log(`control total de -4: ${aplicarControl(-4)}`);
console.log(`control total de -5: ${aplicarControl(-5)}`);
console.log(`control total de -6: ${aplicarControl(-6)}`);
console.log(`control total de 5: ${aplicarControl(5)}`);
console.log(`control total de 2: ${aplicarControl(2)}`);


setInterval(() => {
    f = parseFloat(medicion.value);
    e = entrada - f;
    var variableControlada = aplicarControl(e);
    if(variableControlada != 2){
        variableControlada = aplicarControl(variableControlada);
    }

    console.log(`valor de f: ${f}`);
    console.log(`valor de e: ${e}`);
    console.log(`valor controlado: ${variableControlada}`)
    
}, 5000);