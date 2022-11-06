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
      display: false
    },
    title: {
      display: true,
      text: "High Pass Input 1"
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255)",
      titleColor: "rgba(0, 0, 0)",
      bodyColor: "rgba(0, 0, 0)",
      callbacks: {
        label: function (context) {
          let item;

          if (Array.isArray(context)) {
            item = context[0];
          } else {
            item = context;
          }

          const format_x = new Intl.NumberFormat("en-US").format(
            Math.round(item.parsed.x * 100) / 100
          );
          const format_y = new Intl.NumberFormat("en-US").format(
            Math.round(item.parsed.y * 100) / 100
          );

          let content = `${format_y} dB at ${format_x} Hz`;

          return content;
        },
        title: () => {
          return "";
        }
      }
    }
  },
  animation: false,
  interaction: {
    intersect: false,
    mode: "index"
  },
  spanGaps: true,
  locale: "en-US"
};
