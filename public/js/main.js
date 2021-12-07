var arraysimulados = [];

var  arraysimulados_tipo1 = [];

var  arraysimulados_tipo2 = [];

var  arraysimulados_tipo3 = [];

var  arraysimulados_tipo4 = [];


function Chamararraysimulados(valor_1_4) {

    fetch('http://localhost:3030/simulado/' + parseFloat(localStorage.getItem("Id_user")) + '/' + valor_1_4, {
        method: 'GET'
    })
        .then(response => response.json())

        .then(data => {


            data.simulados_prontos.forEach(simu => {
                arraysimulados.push(simu);
            });
            if(valor_1_4 == 4){
                separar_tipos_simulado(arraysimulados)
            }
            
           
            
            // return arraysimulados
        });

}
function separar_tipos_simulado(arraysimulados){
    
     for (var aj = 0; aj < arraysimulados.length; aj++) {
  
        switch (arraysimulados[aj].simulado.id_tipo_simulado) {
            case 1:
              console.log("1")
                arraysimulados_tipo1.push(arraysimulados[aj].simulado.nota_geral);
              break;
            case 2:
                console.log("2");
                arraysimulados_tipo2.push(arraysimulados[aj].simulado.nota_geral);
              break;
            case 3:
                console.log("3");
                arraysimulados_tipo3.push(arraysimulados[aj].simulado.nota_geral);
              break;
            case 4:
                console.log("4");
                arraysimulados_tipo4.push(arraysimulados[aj].simulado.nota_geral);
              break;
         
            default:
            
             
          }


        
    }
    console.log(arraysimulados_tipo1)
    console.log(arraysimulados_tipo2)
    console.log(arraysimulados_tipo3)
    console.log(arraysimulados_tipo4)
    
}


function mudar_valor_1_4() {
    for (var ah = 1; ah < 5; ah++) {
        Chamararraysimulados(ah)
 
    }

}





var ctx = document.getElementById('myChart')

var data = {
    labels:  ['x', 'y', 'z', 'a', 'b'],
    datasets: [{
        label: 'CIÊNCIAS DA NATUREZA',
        backgroundColor: '#73DA73',
        borderColor: '#73DA73',
        data:  arraysimulados_tipo2,
    },{
        label: 'CIÊNCIAS HUMANAS',
        backgroundColor: '#E7EC49',
        borderColor: '#E7EC49',
        data: arraysimulados_tipo1,
    },{
        label: 'MATEMÁTICA',
        backgroundColor: '#3B91E7',
        borderColor: '#3B91E7',
        data:  arraysimulados_tipo4,
    },{
        label: 'LINGUAGENS E CÓDIGOS',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: arraysimulados_tipo3,
    }]
};


const myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            // xAxes: [{
            //     ticks: {
            //         suggestedMin: 0,
            //         suggestedMax: 100
            //     }
            // }]
        }
    }

});








