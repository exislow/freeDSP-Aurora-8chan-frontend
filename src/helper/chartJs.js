export const canvasBgColor = {
  id: "canvas_background_color",
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color;
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
  defaults: {
    color: "#2D3748"
  }
};

export const cursorVerticalLine = {
  id: "cursor_vertical_line",
  afterDraw: (chart) => {
    if (chart.tooltip?._active?.length) {
      let x = chart.tooltip._active[0].element.x;
      let yAxis = chart.scales.y;
      let ctx = chart.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, yAxis.top);
      ctx.lineTo(x, yAxis.bottom);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx.stroke();
      ctx.restore();
    }
  }
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
