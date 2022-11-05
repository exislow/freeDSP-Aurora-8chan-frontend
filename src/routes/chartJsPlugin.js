export const transferFunction = {
  id: "transfer_function",
  beforeInit: function (chart) {
    // We get the chart data
    let data = chart.config.data;

    // For every dataset ...
    for (let i = 0; i < data.datasets.length; i++) {
      // For every label ...
      for (let j = 0; j < data.labels.length; j++) {
        // We get the dataset's function and calculate the value
        let fct = data.datasets[i].function,
          x = data.labels[j],
          y = fct(x);
        // Then we add the value to the dataset data
        data.datasets[i].data.push(y);
      }
      console.log(data.datasets[i].data);
    }
  }
};

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
