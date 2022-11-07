<script>
  import { hardware } from "../helper/constants.js";
  import { apiConfig, apiWificonfig } from "../data.js";

  const wifiConnect = {
    name: "Wi-Fi Connect",
    url: "x",
    value: [
      {
        name: "Remote SSID",
        value: apiWificonfig.ssid
      },
      {
        name: "Password",
        value: ""
      }
    ]
  };

  const wifiAp = {
    name: "Wi-Fi Access Point",
    url: "x",
    value: [
      {
        name: "Local SSID",
        value: apiWificonfig.apname
      },
      {
        name: "Password",
        value: ""
      }
    ]
  };

  const wifi = [wifiConnect, wifiAp];

  // Need to convert everything to string, since JS only has string keys in objects.
  const stateDevice = {
    addon: apiConfig.aid.toString(),
    addonSettings: (1).toString(),
    adcSummation: apiConfig.adcsum.toString(),
    volumePotentiometer: apiConfig.vpot ? "1" : "0"
  };
</script>

<div class="modal" id="modal-config-device">
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
              {#each Object.entries(hardware.value) as [idValue, itemsValue]}
                <div class="column">
                  <div class="field is-small">
                    <label class="label">{itemsValue.name}</label>

                    <div class="control">
                      <div class="select is-normal is-fullwidth">
                        <select bind:value={ stateDevice[idValue] }>
                          {#each Object.entries(itemsValue.value) as [id, value]}
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

      {#each wifi as itemWifi}
        <div class="card block">
          <header class="card-header">
            <p class="card-header-title">
              {itemWifi.name}
            </p>
          </header>

          <div class="card-content">
            <div class="content">
              <div class="columns">
                {#each itemWifi.value as itemsValue}
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
            <button class="button card-footer-item is-primary">Save</button>
          </footer>
        </div>
      {/each}
    </section>
  </div>
</div>
