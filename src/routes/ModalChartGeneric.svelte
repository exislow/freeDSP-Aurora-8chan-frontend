<script>
  import { Line } from "svelte-chartjs";
  import { cOptions } from "./data.js";
  import { logspace } from "./helperTransitionFunction.js";
  import { all, create } from "mathjs";
  import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    LogarithmicScale,
    PointElement,
    Title,
    Tooltip
  } from "chart.js";
  import { canvasBgColor, transferFunction , cursorVerticalLine } from "./chartJsPlugin.js";

  const config = {};
  const mathjs = create(all, config);

  ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, LogarithmicScale, Filler, canvasBgColor, transferFunction, cursorVerticalLine);
  ChartJS.defaults.backgroundColor = "#2D3748"; // doesn't work somehow
  ChartJS.defaults.borderColor = "#718096";
  ChartJS.defaults.color = "#b8c1cf";

  const configFilter = {
    0: "Bessel 6",
    1: "Bessel 12",
    2: "Bessel 18",
    3: "Bessel 24",
    4: "Butterworth 12",
    5: "Butterworth 18",
    6: "Butterworth 24",
    7: "Linkwitz-Riley 12",
    8: "Linkwitz-Riley 24",
    9: "Linkwitz-Riley 36",
    10: "Linkwitz-Riley 48"
  };

  export const cData = {
    labels: logspace(-1, 4.305, 1000),
    datasets: [
      {
        label: "Level [dB]",
        data: [],
        function: function (f) {
          // Bessel 3rd order
          const transfer_function = mathjs.parse('15 / ((s/1256.63)^3 + (6 * (s/1256.63)^2) + (15 * (s/1256.63)) + 15)')
          const compiled_tf = transfer_function.compile()
          const magnitude = compiled_tf.eval({s: mathjs.complex(0, f * 2 * Math.PI)}).toPolar().r
          // converting the amplitude to dB
          const y = 20 * mathjs.log10(magnitude);

          return y;
        },
        borderColor: "rgb(228, 131, 18)",
        backgroundColor: "rgba(228, 131, 18, 0.5)",
        fill: true,
        tension: 0.3,
        spanGaps: true
      }
    ]
  };
</script>

<!--
<div id="modal-chart-generic" class="modal">
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">High Pass Filter Input 1</p>
      <button class="delete" aria-label="close" />
    </header>

    <section class="modal-card-body">
-->
<div class="card">
  <div class="card-content">
    <div class="media">
      <Line
        data={cData}
        options={cOptions}
      />
    </div>

    <div class="content">
      <div class="columns">
        <div class="column">
          <div class="field is-small">
            <label class="label">Cut-off Frequency [Hz]</label>
            <div class="control">
              <input class="input" placeholder="Cut-off Frequency [Hz]" type="text">
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field is-small">
            <label class="label">Filter</label>
            <div class="control">
              <div class="select is-normal is-fullwidth">
                <select>
                  {#each Object.entries(configFilter) as [id, name]}
                    <option value={id}>{name}</option>
                  {/each}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="card-footer">
    <button class="button card-footer-item is-primary">Save</button>
  </footer>
</div>
<!--
    </section>
  </div>
</div>
-->
