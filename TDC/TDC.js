
const ChartSalida = document.getElementById('ChartSalida').getContext('2d');
const ChartMedicion = document.getElementById('ChartMedicion').getContext('2d');
const ChartError = document.getElementById('ChartError').getContext('2d');

const dataSalida = {
    labels: [], // X-axis (time or iteration)
    datasets: [{
        label: 'Evolucion de la Salida',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        data: [],
        fill: false,
    }]
};

const configSalida = {
    type: 'line',
    data: dataSalida,
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Tiempo (segundos)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Valor de Salida'
                }
            }
        }
    }
};

const dataMedicion = {
    labels: [], // X-axis (time or iteration)
    datasets: [{
        label: 'Evolucion de la Medicion',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        data: [],
        fill: false,
    }]
};

const configMedicion = {
    type: 'line',
    data: dataMedicion,
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Tiempo (segundos)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Valor de Medicion'
                }
            }
        }
    }
};

const dataError = {
    labels: [], // X-axis (time or iteration)
    datasets: [{
        label: 'Evolucion del Error',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        data: [],
        fill: false,
    }]
};

const configError = {
    type: 'line',
    data: dataError,
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Tiempo (segundos)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Valor de Error'
                }
            }
        }
    }
};

const salidaChart = new Chart(ChartSalida, configSalida);
const medicionChart = new Chart(ChartMedicion, configMedicion);
const errorChart = new Chart(ChartError, configError);

const entrada = 2;
var salida = 0;
var tiempo = 0;

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
    
    return entrada;
}

const aplicarControlProporcional = (variableAControlar) => {
    
    var diferencia;
    if(variableAControlar > 2){
        diferencia = entrada - variableAControlar;
    } else if (variableAControlar < 2){
        diferencia = variableAControlar - entrada;
    } else {
        return variableAControlar;
    }
    
    var correccion;
    if(variableAControlar > 2){
        correccion = variableAControlar + diferencia;
    } else{
        console.log(`valor de diferencia: ${diferencia}`);
        correccion = variableAControlar - diferencia;
    }
    return correccion;
}


const aplicarPerturbacion = (variableAControlar) => {
    return variableAControlar + 10;

}


const aplicarControl = (variableAControlar) => {
    
    var resultadoControlDerivativo = 0;
    var resultadoControlProporcional = 0
    console.log(`valor de variableAControlar: ${variableAControlar}`);
    if(perturbacion === "si"){
        resultadoControlDerivativo = aplicarControlDerivativo(variableAControlar);
        perturbacion = "no";
        document.getElementById("perturbacion").innerText = "Perturbacion: " + perturbacion;
        return (aplicarControlProporcional(variableAControlar) + aplicarControlDerivativo(variableAControlar))/2;
    } else {
        return aplicarControlProporcional(variableAControlar);
    }
    resultadoControlProporcional = aplicarControlProporcional(variableAControlar);
    
    if(resultadoControlDerivativo != 0){
        
    }
    
    console.log(`valor de resultadoControlProporcional: ${resultadoControlProporcional}`);

    var resultadoControl = 0;
    if (resultadoControlDerivativo != 0){
        resultadoControl = resultadoControlDerivativo + resultadoControlProporcional;
    } else {
        resultadoControl = resultadoControlProporcional;
    }
    return resultadoControl;
} 

const calcularError = () => {
    var e = 0;
    
    if (f === 0){
        e = entrada - f;
    } e
}

setInterval(() => {
    
    f = parseFloat(medicion.value);
    if(perturbacion == "si"){
        f = aplicarPerturbacion(f);
    }
    e = entrada - f
    
    console.log(`valor de f: ${f}`);
    console.log(`valor de e: ${e}`);
    
    var salida = aplicarControl(e);
    console.log(`valor de salida: ${salida}`);

    const currentTime = dataSalida.labels.length;
    dataSalida.labels.push(currentTime);
    dataSalida.datasets[0].data.push(salida);

    if (dataSalida.labels.length > 100) {
        dataSalida.labels.shift();
        dataSalida.datasets[0].data.shift();
    }
    salidaChart.update();

    const currentTimeM = dataMedicion.labels.length;
    dataMedicion.labels.push(currentTimeM);
    dataMedicion.datasets[0].data.push(f);

    if (dataMedicion.labels.length > 100) {
        dataMedicion.labels.shift();
        dataMedicion.datasets[0].data.shift();
    }
    medicionChart.update();

    const currentTimeE = dataError.labels.length;
    dataError.labels.push(currentTimeE);
    dataError.datasets[0].data.push(e);

    if (dataError.labels.length > 100) {
        dataError.labels.shift();
        dataError.datasets[0].data.shift();
    }
    errorChart.update();
    
}, 1000);
