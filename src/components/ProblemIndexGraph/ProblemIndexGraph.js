import { Bar } from 'react-chartjs-2';

const IndexGraph = ({userSubmissions}) => {
    let index= new Map();
    let id=new Map();
    for(let i=0;i<userSubmissions.length;i++){
        if(userSubmissions[i].verdict!=="OK"){
            continue;
        }
        let key=userSubmissions[i].contestId + userSubmissions[i].problem.index;
        if(id.has(key)){
            continue;
        }
        id.set(key,true);
        let currIndex=userSubmissions[i].problem.index[0];
        if(currIndex<'A' || currIndex > 'Z'){
          continue;
        }
        if(!index.has(currIndex)){
            index.set(currIndex,1);
        }
        else{
            let temp=index.get(currIndex);
            index.set(currIndex,temp+1)
        }
    }
    
    var indexAsc = new Map([...index.entries()].sort());
    // const data = {
    //     labels: [],
    //     datasets: [
    //       {
    //         label: 'Problem Count',
    //         data: [],
    //         backgroundColor: [
    //           'rgba(228, 28, 28, 0.8)',
    //         ],
    //         borderColor: [
    //           'rgba(228, 28, 28, 1)',
    //         ],
    //         borderWidth: 2,
    //       },
    //     ],
    // };
    const data = {
  labels: [], // Add your labels here
  datasets: [
    {
      label: 'Problem Count',
      data: [], // Add your data here
      backgroundColor: [
        'rgba(52, 152, 219, 0.8)', // Light blue
        'rgba(46, 204, 113, 0.8)', // Light green
        'rgba(155, 89, 182, 0.8)', // Light purple
        'rgba(241, 196, 15, 0.8)', // Light yellow
        'rgba(231, 76, 60, 0.8)',  // Light red
      ],
      borderColor: [
        'rgba(41, 128, 185, 1)',  // Dark blue
        'rgba(39, 174, 96, 1)',   // Dark green
        'rgba(142, 68, 173, 1)',  // Dark purple
        'rgba(243, 156, 18, 1)',  // Dark yellow
        'rgba(192, 57, 43, 1)',   // Dark red
      ],
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(230, 126, 34, 0.9)', // Highlight on hover
      hoverBorderColor: 'rgba(211, 84, 0, 1)', // Darker highlight border
      hoverBorderWidth: 3,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowBlur: 5,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    },
  ],
};

  
    for(let[key,value] of indexAsc){
        data.labels.push(key);
        data.datasets[0].data.push(value);
    }
    

    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        plugins: {
          title: {
              display: true,
              text: 'Problem Index'
          },
          legend: {
            display: false
          }
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            <Bar 
                data={data} 
                options={options}	           
                height={400}
              
            />
        </div>
    )
}

export default IndexGraph