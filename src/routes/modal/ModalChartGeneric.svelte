<script>
  import { Line } from "svelte-chartjs";
  import { cOptions } from "../data.js";
  import { logspace } from "../helper/transitionFunction.js";
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
  import { canvasBgColor , cursorVerticalLine } from "../chartJsPlugin.js";
  import Fili from "fili";

  const config = {};

  ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, LogarithmicScale, Filler, canvasBgColor, cursorVerticalLine);
  ChartJS.defaults.backgroundColor = "#2D3748"; // doesn't work somehow
  ChartJS.defaults.borderColor = "#718096";
  ChartJS.defaults.color = "#b8c1cf";

  const configFilter = {
    0: {
      name: "Bessel 6",
      id: "bessel",
      countCascade: 1
    },
    1: {
      name: "Bessel 12",
      id: "bessel",
      countCascade: 2
    },
    2: {
      name: "Bessel 18",
      id: "bessel",
      countCascade: 3
    },
    3: {
      name: "Bessel 24",
      id: "bessel",
      countCascade: 4
    },
    4: {
      name: "Butterworth 12",
      id: "butterworth",
      countCascade: 2
    },
    5: {
      name: "Butterworth 18",
      id: "butterworth",
      countCascade: 3
    },
    6: {
      name: "Butterworth 24",
      id: "butterworth",
      countCascade: 4
    },
    7: {
      name: "Linkwitz-Riley 12",
      id: "linkwitzRiley",
      countCascade: 1
    },
    8: {
      name: "Linkwitz-Riley 24",
      id: "linkwitzRiley",
      countCascade: 2
    },
    9: {
      name: "Linkwitz-Riley 36",
      id: "linkwitzRiley",
      countCascade: 3
    },
    10: {
      name: "Linkwitz-Riley 48",
      id: "linkwitzRiley",
      countCascade: 4
    }
  };

  let labels = logspace(-1, 4.305, 1000);
  labels = labels.map((f) => { return f >> 0; });
  labels = [...new Set(labels)];
  labels = [...new Set(labels)];
  labels = labels.filter((f) => {
    return f < 20000 ;
  });

  //  Instance of a filter coefficient calculator
  const iirCalculator = new Fili.CalcCascades();

  // calculate filter coefficients
  const iirFilterCoeffs = iirCalculator.lowpass({
    order: 3, // cascade 3 biquad filters (max: 12)
    characteristic: 'bessel',
    Fs: 40000, // sampling frequency
    Fc: 200, // cutoff frequency / center frequency for bandpass, bandstop, peak
    BW: 1, // bandwidth only for bandstop and bandpass filters - optional
    gain: 0, // gain for peak, lowshelf and highshelf
    preGain: true // adds one constant multiplication for highpass and lowpass
    // k = (1 + cos(omega)) * 0.5 / k = 1 with preGain == false
  });

  // create a filter instance from the calculated coeffs
  const iirFilter = new Fili.IirFilter(iirFilterCoeffs);

  const response = iirFilter.response(20000);
  const data = labels.map((f) => { return response[f].dBmagnitude; })

  console.log(labels)
  console.log(response)

  export const cData = {
    labels: labels,
    datasets: [
      {
        label: "Level [dB]",
        data: data,
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
                  {#each Object.entries(configFilter) as [id, values]}
                    <option value={id}>{values.name}</option>
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
