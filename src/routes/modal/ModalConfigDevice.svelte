<script>
  import { hardware } from "../helper/constants.js";
  import { onMount } from "svelte";

  export let configDevice = {};
  export let configWifi = {};
  const idModal = "modal-config-device";

  onMount(function () {
    document.addEventListener(idModal, () => {
      console.log('Aaa')
    });
  })

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
    fnUpdate: updateWifiConnect,
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

  let stateDevice = {
    addon: configDevice.aid.toString(),
    addonSettings: (1).toString(),
    adcSummation: configDevice.adcsum.toString(),
    volumePotentiometer: configDevice.vpot ? "1" : "0"
  };

  function updateStateDevice(setting, value) {
    console.log('UPDATE');
    $: stateDevice[setting] = value;
  }

  function updateWifiConnect(event) {
    // implement post
    // if 200
    console.log(event)
    configWifi.ssid = wifiConnect.form[0].value;
  }
</script>

<div class="modal" id="{idModal}">
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Device Config</p>
      <button aria-label="close" class="delete" />
    </header>

    <section class="modal-card-body">
      <div class="card block">
        <header class="card-header">
          <p class="card-header-title">
            {hardware.name}
          </p>
        </header>

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
          <button class="button card-footer-item is-primary">Save</button>
        </footer>
      </div>

      {#each wifi as itemWifi, index (itemWifi)}
        <div class="card block">
          <header class="card-header">
            <p class="card-header-title">
              {itemWifi.name}
            </p>
          </header>

          <form on:submit|preventDefault={updateWifiConnect}>
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
    </section>
  </div>
</div>
