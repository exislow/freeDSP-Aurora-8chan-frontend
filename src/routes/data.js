const gain = [2, -10, 1, 10, -10, 7, 5];
const frequency = [10, 105, 1005, 5010, 10005, 12004, 20000];

export const cData = {
  labels: frequency,
  datasets: [
    {
      label: "Level [dB]",
      data: gain,
      borderColor: "rgb(228, 131, 18)",
      backgroundColor: "rgba(228, 131, 18, 0.5)",
      fill: true,
      tension: 0.3,
      spanGaps: true
    }
  ]
};

export const cOptions = {
  scales: {
    x: {
      display: true,
      type: "logarithmic",
      min: 10,
      max: 20000,
      title: {
        display: true,
        text: "Frequency [Hz]"
      }
    },
    y: {
      display: true,
      min: -20,
      max: +20,
      title: {
        display: true,
        text: "Level [dB]"
      },
      type: "linear"
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "High Pass Input 1"
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255)",
      titleColor: "rgba(0, 0, 0)",
      bodyColor: "rgba(0, 0, 0)"
    }
  },
  animation: false
};
