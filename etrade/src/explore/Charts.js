import { Line } from "react-chartjs-2";

export default function Charts({ data }) {
  const monthlyData = [
    1407.66, 3420.8, 17263.31, 5644.89, -5266.63, -4886.6823, 2915.05, 3513.37,
    2844.49, 5707.08, 2323, 2323,
  ];
  console.log("we are in charts", data);
  let state = {
    labels: data.dates,
    datasets: [
      {
        data: data.close,
        label: "Close",
        borderColor: "#3e95cd",
        pointRadius: 2,
        fill: false,
        borderWidth: 2,
      },
      {
        data: data.open,
        label: "Open",
        borderColor: "#8e5ea2",
        fill: false,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        data: data.high,
        label: "High",
        borderColor: "#3cba9f",
        fill: false,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        data: data.low,
        label: "Low",
        borderColor: "#e8c3b9",
        fill: false,
        pointRadius: 2,
        borderWidth: 2,
      },
    ],
  };
  return (
    <div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: "Net Profit/Loss",
            fontSize: 15,
          },
          legend: {
            display: false,
            position: "right",
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
