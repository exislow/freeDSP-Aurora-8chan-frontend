<script>
  import { hardware } from "../helper/constants.js";
  import { apiLoading } from "../helper/store.js";
  import { deviceConfigPost, wifiApPost, wifiConnectPost } from "../helper/api.js";
  import { toastSuccess, toastErrorHttp } from "../helper/toast.js";

  export let configDevice = {};
  export let configWifi = {};

  const wifiConnect = {
    name: "Wi-Fi Connect",
    fnUpdate: updateWifiConnect,
    form: [
      {
        name: "Remote SSID",
        value: configWifi.ssid
      },
      {
        name: "Password",
        value: ""
      }
    ]
  };

  const wifiAp = {
    name: "Wi-Fi Access Point",
    fnUpdate: updateWifiAp,
    form: [
      {
        name: "Local SSID",
        value: configWifi.apname
      },
      {
        name: "Password",
        value: ""
      }
    ]
  };

  const wifi = [wifiConnect, wifiAp];

  const stateDevice = {};

  function stateDeviceInit() {
    stateDevice.addon = configDevice.aid.toString();
    stateDevice.adcSummation = configDevice.adcsum.toString();
    stateDevice.volumePotentiometer = configDevice.vpot ? "1" : "0";
  }

  stateDeviceInit();

  async function updateDevice() {
    $apiLoading = true;
    const response = await deviceConfigPost(stateDevice.addon, stateDevice.adcSummation, !!stateDevice.volumePotentiometer);
    $apiLoading = false;

    if (response.ok) {
      toastSuccess('Device config saved.');

      configDevice.aid = parseInt(stateDevice.addon);
      configDevice.adcsum = parseInt(stateDevice.adcSummation);
      configDevice.vpot = !!stateDevice.volumePotentiometer;
    } else {
      toastErrorHttp(response);
      stateDeviceInit();
    }
  }

  async function updateWifiConnect() {
    $apiLoading = true;
    const response = await wifiConnectPost(wifiConnect.form[0].value, wifiConnect.form[1].value);
    $apiLoading = false;

    if (response.ok) {
      toastSuccess(`${wifiConnect.name} config saved.`);
      configWifi.ssid = wifiConnect.form[0].value;
    } else {
      toastErrorHttp(response);
    }
  }

  async function updateWifiAp() {
    $apiLoading = true;
    const response = await wifiApPost(wifiAp.form[0].value, wifiAp.form[1].value);
    $apiLoading = false;

    if (response.ok) {
      toastSuccess(`${wifiAp.name} config saved.`);
      configWifi.apname = wifiAp.form[0].value;
    } else {
      toastErrorHttp(response);
    }
  }
</script>


<div class="card block">
  <header class="card-header">
    <p class="card-header-title">
      {hardware.name}
    </p>
  </header>

  <form on:submit|preventDefault={updateDevice}>
    <div class="card-content">
      <div class="content">
        <div class="columns">
          {#each Object.entries(hardware.value) as [idValue, itemsValue] (idValue)}
            <div class="column">
              <div class="field is-small">
                <label class="label">{itemsValue.name}</label>

                <div class="control">
                  <div class="select is-normal is-fullwidth">
                    <select bind:value={ stateDevice[idValue] } id="{idValue}">
                      {#each Object.entries(itemsValue.value) as [id, value] (id)}
                        <option value={id}>{value}</option>
                      {/each}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

  <footer class="card-footer">
    <button class="button card-footer-item is-primary" type="submit">Save</button>
  </footer>
  </form>
</div>

{#each wifi as itemWifi, index (index)}
  <div class="card block">
    <header class="card-header">
      <p class="card-header-title">
        {itemWifi.name}
      </p>
    </header>

    <form on:submit|preventDefault={itemWifi.fnUpdate}>
    <div class="card-content">
      <div class="content">
        <div class="columns">
          {#each itemWifi.form as itemsValue, index (itemsValue)}
            <div class="column">
              <div class="field is-small">
                <label class="label">{itemsValue.name}</label>

                <div class="control">
                  <input class="input" type="text" placeholder="{itemsValue.name}" bind:value={itemsValue.value}>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <button class="button card-footer-item is-primary" type="submit">Save</button>
    </footer>

    </form>
  </div>
{/each}
