export const cOptions = {
  scales: {
    x: {
      display: true,
      type: "logarithmic",
      //min: 10,
      //max: 20000,
      title: {
        display: true,
        text: "Frequency [Hz]"
      }
    },
    y: {
      display: true,
      //min: -20,
      //max: +20,
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
