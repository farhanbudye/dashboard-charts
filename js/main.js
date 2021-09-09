'use strict';


window.loadDoc = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhttp.responseText);
        window.demo(data);
        
      }
    };
    xhttp.open("GET", "../data/config.json", true);
    xhttp.send();
  };

  
  window.demo=function(data){
        let myData = data;
        var chartData, labels, bgcolor, offset, myChart, chartOrder;

          var sortByOrder, sortByPriority;
          sortByOrder = myData.singleChart;
          sortByPriority = myData.singleChart;
          // sortByOrder.sort(sortByProperty("order"));
          // console.log(sortByOrder)
          sortByPriority.sort(sortByProperty("priority"));
          // console.log(sortByPriority)
          function sortByProperty(property){  
            return function(a,b){  
               if(a[property] > b[property]) return 1;  
               else if(a[property] < b[property]) return -1;
               return 0;  
            }  
         }
        

        for (let a=0;a<=myData.singleChart.length-1;a++)
        {
          // console.log(sortByPriority[a].priority);
          var canvas = document.createElement('canvas');
          canvas.id = `myChart${a}`;
          canvas.width = myData.singleChart[a].height;
          canvas.height = myData.singleChart[a].width;
          var myDiv = document.getElementById("myCol");
          myDiv.appendChild(canvas);
          var ctx = canvas.getContext('2d');

          let singleChartType, singleChartLabels, apiUrl, singleChartBgColor, singleChartOffSet, singleChartDataSets;
        // console.log(myData.singleChart[a]);

        singleChartType = myData.singleChart[a].type;
        singleChartLabels = myData.singleChart[a].labels;
        apiUrl = myData.singleChart[a].datasets[0].api_url;
        singleChartBgColor = myData.singleChart[a].datasets[0].backgroundColor;
        singleChartOffSet = myData.singleChart[a].datasets[0].hoverOffset;
        singleChartDataSets = myData.singleChart[a].datasets[0].data;

      // If apiUrl is not empty the data will be fetched from url and processed here  
        if(apiUrl!==""){
        const params = {
          param1: "",
          param2: "" 
      };
      const options = {
          method: 'POST',
          body: JSON.stringify( params )  
      };
      fetch( apiUrl, options )
          .then( response => response.json() )
          .then( response => {
              // Do something with response.
              // singleChartDataSets = data with response
          } );
        }
        else{
          singleChartDataSets = myData.singleChart[a].datasets[0].data;
        }

  chartOrder = [myData.singleChart[a].order];

if(singleChartType=='doughnut')
{  
  for (let b=0;b<=singleChartLabels.length;b++)
  {
    chartData = {
      labels:  singleChartLabels,
      datasets: [{
        label: 'Bar chart',
        data: singleChartDataSets,
        backgroundColor: singleChartBgColor,
        hoverOffset: singleChartOffSet
      }]
    };
  }

    canvas[a] = new Chart(ctx, {
      type: singleChartType,
      data: chartData,
    }); 
  

}

else if(singleChartType=='line'){
  let chartBorderColor = myData.singleChart[a].datasets[0].borderColor;
  labels = window.months({count: 7});
     chartData = {
        labels: labels,
      datasets: [{
        label: 'Line chart',
        data: singleChartDataSets,
        fill: false,
        borderColor: chartBorderColor,
        tension: 0.1
      }]
    };
    canvas[a] = new Chart(ctx, {
        type: singleChartType,
        data: chartData,
    }); 

}

else if(singleChartType=='bar'){
  let chartBorderColor = myData.singleChart[a].datasets[0].borderColor;
     labels = window.months({count: 7});
    //  console.log(singleChartDataSets)
     chartData = {
      labels: labels,
      datasets: [{
        label: 'Bar chart',
        data: singleChartDataSets,
        backgroundColor: singleChartBgColor,
        borderColor: chartBorderColor,
        borderWidth: 1
      }]
    };
    canvas[a] = new Chart(ctx, {
        type: singleChartType,
        data: chartData,
        options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          },
    }); 
}


else if (singleChartType=='pie'){

  const DATA_COUNT = myData.singleChart[a].dataCount;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
let singleChartColor = myData.singleChart[a].datasets[0].chartColors[0];

let singleChartLabels = myData.singleChart[a].datasets[0].labels;
// console.log(DATA_COUNT)
for (let b=0;b<=singleChartLabels.length;b++)
{
  const CHART_COLORS =  singleChartColor;

chartData  = {
labels: singleChartLabels,
datasets: [
  {
    label: 'Dataset 1',
    data: window.numbers(NUMBER_CFG),
    backgroundColor: Object.values(CHART_COLORS),
  }
]
};
}
canvas[a] = new Chart(ctx, {
  type: singleChartType,
  data: chartData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Pie Chart'
      }
    }
  },
}); 

}





}


// if(singleChartType=='doughnut')
// {
//     chartData = {
//         labels: [
//           'Red',
//           'Blue',
//           'Yellow'
//         ],
//         datasets: [{
//           label: 'My First Dataset',
//           data: [300, 50, 100],
//           backgroundColor: [
//             'rgb(255, 99, 132)',
//             'rgb(54, 162, 235)',
//             'rgb(255, 205, 86)'
//           ],
//           hoverOffset: 4
//         }]
//       };
//       myChart = new Chart(ctx, {
//         type: singleChartType,
//         data: chartData,
//     });  
// }

//  temp comment start
// else if(singleChartType=='line'){
//     labels = window.months({count: 7});
//      chartData = {
//         labels: labels,
//       datasets: [{
//         label: 'My First Dataset',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//       }]
//     };
//     myChart = new Chart(ctx, {
//         type: singleChartType,
//         data: chartData,
//     }); 
// }
// else if(singleChartType=='bar'){
//      labels = window.months({count: 7});
//      chartData = {
//       labels: labels,
//       datasets: [{
//         label: 'My First Dataset',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(255, 205, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(201, 203, 207, 0.2)'
//         ],
//         borderColor: [
//           'rgb(255, 99, 132)',
//           'rgb(255, 159, 64)',
//           'rgb(255, 205, 86)',
//           'rgb(75, 192, 192)',
//           'rgb(54, 162, 235)',
//           'rgb(153, 102, 255)',
//           'rgb(201, 203, 207)'
//         ],
//         borderWidth: 1
//       }]
//     };
//     myChart = new Chart(ctx, {
//         type: singleChartType,
//         data: chartData,
//         options: {
//             scales: {
//               y: {
//                 beginAtZero: true
//               }
//             }
//           },
//     }); 
// }
// temp comment end




// else if (singleChartType=='pie'){
//     const DATA_COUNT = 5;
// const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

// const CHART_COLORS = {
//     red: 'rgb(255, 99, 132)',
//     orange: 'rgb(255, 159, 64)',
//     yellow: 'rgb(255, 205, 86)',
//     green: 'rgb(75, 192, 192)',
//     blue: 'rgb(54, 162, 235)',
//     purple: 'rgb(153, 102, 255)',
//     grey: 'rgb(201, 203, 207)'
//   };

//   chartData  = {
//   labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: window.numbers(NUMBER_CFG),
//       backgroundColor: Object.values(CHART_COLORS),
//     }
//   ]
// };

// const config = {
//     type: chartType,
//     data: chartData,
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top',
//         },
//         title: {
//           display: true,
//           text: 'Chart.js Pie Chart'
//         }
//       }
//     },
//   };








// }
 




// var myChart = new Chart(ctx, {
//     type: chartType,
//     data: chartData,
// }); 




   

    
};



