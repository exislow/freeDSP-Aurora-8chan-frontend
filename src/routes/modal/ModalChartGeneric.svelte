<script>
  import { Line } from "svelte-chartjs";
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
  import { canvasBgColor, cOptions, cursorVerticalLine } from "../helper/chartJs.js";
  import Fili from "fili";
  import { bypassSet, logspace, range } from "../helper/range.js";
  import { configSite, filterFunctions, soundProcessor } from "../helper/constants.js";
  import { apiLoading } from "../helper/store.js";
  import { createEventDispatcher, onMount } from "svelte";
  import { toastErrorHttp, toastSuccess } from "../helper/toast.js";
  import { rewPeqParse } from "../helper/filterAudio.js";

  ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, LogarithmicScale, Filler, canvasBgColor, cursorVerticalLine);
  ChartJS.defaults.backgroundColor = "#2D3748"; // doesn't work somehow
  ChartJS.defaults.borderColor = "#718096";
  ChartJS.defaults.color = "#b8c1cf";

  // Binding props
  export let filter;
  export let fcAll;
  export let bypassAll;

  // Get sound block information and create a general binding object.
  $apiLoading = true;
  const soundBlockItem = soundProcessor.soundBlocks[filter.id];
  let apiSoundBlockData;
  const binding = {
    fcHz: "0",
    isBypass: "0",
    filterId: "0",
    slope: "0",
    gainDb: "0",
    q: 0,
    invert: "0",
    delayMs: 0
  };
  const filterPass = [filterFunctions.lp, filterFunctions.hp];

  // Receive data from API and map the value to internal binding.
  onMount(async () => {
    apiSoundBlockData = await soundBlockItem.api.get(filter.channelNumber);
    binding.fcHz = apiSoundBlockData.fc ? apiSoundBlockData.fc : false;
    binding.filterId = apiSoundBlockData.typ ? apiSoundBlockData.typ.toString() : false;
    binding.slope = apiSoundBlockData.slope ? apiSoundBlockData.slope : false;
    binding.gainDb = apiSoundBlockData.gain ? apiSoundBlockData.gain : false;
    if (!binding.gainDb) {
      binding.gainDb = apiSoundBlockData.V0 ? apiSoundBlockData.V0 : false;
    }
    binding.isBypass = apiSoundBlockData["bypass"] ? apiSoundBlockData["bypass"] : apiSoundBlockData.mute;
    binding.q = apiSoundBlockData.Q ? apiSoundBlockData.Q : false;
    binding.invert = apiSoundBlockData.inv ? apiSoundBlockData.inv : false;
    binding.delayMs = apiSoundBlockData.dly ? apiSoundBlockData.dly : false;

    $apiLoading = false;
  });

  // Reactive variables.
  // Get indexes of the overall arrays, to not get all values for the main page everytime an audio block changes.
  const bypassAllIndex = bypassAll.byp.findIndex((obj) => obj.name === `${soundBlockItem.idPrefix}${filter.channelNumber}`);
  const fcAllIndex = fcAll.fc.findIndex((obj) => obj.name === `${soundBlockItem.idPrefix}${filter.channelNumber}`);

  // Create x-axis labels
  let labels = logspace(-1, 4.305, 1000);
  labels = labels.map((f) => {
    return f >> 0;
  });
  labels = [...new Set(labels)];
  labels = [...new Set(labels)];
  labels = labels.filter((f) => {
    return f < 20000;
  });

  //  Instance of a filter coefficient calculator
  const iirCalculator = new Fili.CalcCascades();

  // calculate filter coefficients
  const iirFilterCoeffs = iirCalculator.lowpass({
    order: 3, // cascade 3 biquad filters (max: 12)
    characteristic: "bessel",
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
  const data = labels.map((f) => {
    return response[f].dBmagnitude;
  });

  console.log("labels", labels);
  console.log("response", response);

  const cData = {
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

  // TODO: Refactor. Almost the same code can be found at `Page.svelte`.
  function bypassToggle(index = false) {
    // PEQ banks have an array of bypasses
    if (index) {
      binding.isBypass[index] = binding.isBypass[index] == "1" ? "0" : "1";
    } else {
      binding.isBypass = binding.isBypass == "1" ? "0" : "1";
    }

    if (apiSoundBlockData.mute) {
      apiSoundBlockData.mute = binding.isBypass;
    } else {
      apiSoundBlockData["bypass"] = binding.isBypass;
    }

    settingsSave(apiSoundBlockData);
  }

  async function settingsSave(settingsSound = false) {
    $apiLoading = true;

    if (settingsSound === false) {
      // Replace original sound block data from API with the data of the internal model.
      for (const [key, value] of Object.entries(apiSoundBlockData)) {
        apiSoundBlockData[key] = binding[configSite.api.mapping.externalToInternal[key]];
      }
    } else {
      apiSoundBlockData = settingsSound;
    }

    const response = await soundBlockItem.api.post(filter.channelNumber, apiSoundBlockData);
    $apiLoading = false;

    if (response.ok) {
      toastSuccess("Sound settings stored successfully.");

      let isBypass = "0";

      // Check, if all banks are bypassed
      if (soundBlockItem.idPrefix === "peqbank") {
        isBypass = binding.isBypass.every((val, i, arr) => val === arr[0]) ? "1" : "0";
      } else {
        isBypass = binding.isBypass;
      }

      // Modify mute button class of main page.
      console.log("byp", isBypass);
      const elemMuteClassList = document.getElementById(`${filter.id}${filter.channelNumber}Mute`).classList;

      if (isBypass == "1") {
        console.log("byp remove", isBypass);
        elemMuteClassList.remove("is-outlined");
      } else {
        elemMuteClassList.add("is-outlined");
      }

      // Update bypass data model
      bypassSet(`${filter.id}${filter.channelNumber}`, bypassAll.byp, isBypass);
      // Fetch FcAll data model in background to update main page values (too lazy to update the FcAll data model myself).
      requestReloadFcAll();
    } else {
      toastErrorHttp(response);
    }
  }

  const dispatch = createEventDispatcher();

  function requestReloadFcAll() {
    dispatch("reloadFcAll", {
      fullReload: true
    });
  }

  // Display filename of selected REW PEQ file.
  let filesRewPeq = null;
  let fileNameRewPeq = "No file selected.";
  $: if (filesRewPeq) {
    fileNameRewPeq = filesRewPeq[0].name;
    rewPeqUpload(filesRewPeq[0]);
  }
  export async function rewPeqUpload(fileRewPeq) {
    let text = await fileRewPeq.text();
    let filter = rewPeqParse(text, fileNameRewPeq);

    (await filter).forEach((item, index) => {
      if (item) {
        binding.fcHz[index] = item.fcHz;
        binding.gainDb[index] = item.gainDb;
        binding.q[index] = item.q;
      }
    });
  }

</script>

<div class="card">
  <form>
    <div class="card-content">
      <div class="media">
        <Line
          data={cData}
          options={cOptions}
        />
      </div>

      <!-- only if sound block is PEQ Bank -->
      <div class="content">
        {#if soundBlockItem.idPrefix === "peqbank"}
          {@const itemsMax = 5}
          {#each range(0, soundBlockItem.bandsCount / itemsMax, 1) as page (page)}
            {@const itemsStart = itemsMax * page}
            {@const itemsEnd = itemsMax + itemsStart}
            <div class="columns">
              <div class="column">&nbsp;</div>
              {#each range(itemsStart, itemsEnd, 1) as num (num)}
                <div class="column has-text-weight-bold has-text-centered">PEQ {num + 1}</div>
              {/each}
            </div>
            {#each soundBlockItem.dom as domItem, index (index)}
              <div class="columns is-vcentered">
                <div class="column has-text-weight-bold">
                  {domItem.label}
                </div>
                {#each range(itemsStart, itemsEnd, 1) as num (num)}
                  <div class="column is-vcentered">
                    <div class="field is-small">
                      <div class="control has-icons-right">
                        {#if domItem.element == "input"}
                          {#if domItem.type == "number"}
                            <input class="input" placeholder="{domItem.label}" type="number"
                                   bind:value={binding[domItem.model][num]} tabindex="{`1${page}${num}${index}`}">
                          {/if}
                          <span class="icon is-small is-right">{domItem.unit}</span>
                        {:else if domItem.element == "button"}
                          <button class="button is-danger is-multiline is-fullwidth"
                                  class:is-outlined={binding[domItem.model][num] == 0}
                                  on:click|preventDefault={() => bypassToggle(num)}
                                  tabindex="{`1${page}${num}${index}`}">
                            <span class="icon is-small">
                              <i class="fas fa-volume-off"></i>
                            </span>
                          </button>
                        {/if}
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            {/each}
          {/each}
          <div class="columns">
            <div class="column">
              <span class="is-bold">Import your PEQ filter file.</span>
              <span class="is-italic">Note: Only REW text export format is supported.</span>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="file has-name is-fullwidth is-info">
                <label class="file-label">
                  <input class="file-input" type="file" name="filesRewPeq" bind:files={filesRewPeq} accept="text/plain">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Choose a file…
                    </span>
                  </span>
                  <span class="file-name">{fileNameRewPeq}</span>
                </label>
              </div>
            </div>
          </div>
          <!-- for all other soundblocks -->
        {:else}
          <div class="columns">
            {#each soundBlockItem.dom as domItem, index (index)}
              <div class="column">
                <div class="field is-small">
                  <label class="label">{domItem.label}</label>
                  <div class="control has-icons-right">
                    {#if domItem.element == "input"}
                      {#if domItem.type == "number"}
                        <input class="input" placeholder="{domItem.label}" type="number"
                               bind:value={binding[domItem.model]}>
                      {/if}
                      <span class="icon is-small is-right">{domItem.unit}</span>
                    {:else if domItem.element == "select" }
                      <div class="select is-normal is-fullwidth">
                        <select bind:value={binding[domItem.model]}>
                          {#each Object.entries(configSite.filter[domItem.data]) as [id, values] (id)}
                            <option value={id}>{values.name}</option>
                          {/each}
                        </select>
                      </div>
                    {:else if domItem.element == "button"}
                      <button class="button is-danger is-multiline is-fullwidth"
                              class:is-outlined={binding[domItem.model] == 0}
                              on:click|preventDefault={() => bypassToggle()}>
                          <span class="icon is-small">
                            <i class="fas fa-volume-off"></i>
                          </span>
                      </button>
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
    <footer class="card-footer">
      <button class="button card-footer-item is-primary" on:click|preventDefault={() => settingsSave()}>Save</button>
    </footer>
  </form>
</div>
