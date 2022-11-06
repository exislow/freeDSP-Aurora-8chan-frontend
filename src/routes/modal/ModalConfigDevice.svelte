<script>
  const hardware = {
    name: 'Hardware',
    url: 'x',
    value: {
      addon: {
        name: 'AddOn',
        value: {
          0: 'None or Custom',
          1: 'A - The woodworker\'s friend.',
          2: 'B - Down with the developers.',
          3: 'C - Control over the crowd.',
          4: 'D - Balanced life.'
        }
      },
      addonSettings: {
        name: 'AddOn Settings per Preset?',
        value: {
          0: 'No',
          1: 'Yes'
        }
      },
      adcSummation: {
        name: 'ADC Channel Summation',
        value: {
          0: 'None',
          1: '8 to 4',
          2: '8 to 2',
          3: '8 to 1'
        }
      },
      volumePotentiometer: {
        name: 'Volume Potentiometer',
        value: {
          0: 'Not installed.',
          1: 'Installed'
        }
      }
    }
  };

  const wifiConnect = {
    name: 'Wi-Fi Connect',
    url: 'x',
    value: [
      {
        name: 'Remote SSID'
      },
      {
        name: 'Password'
      }
    ]
  };

  const wifiAp = {
    name: 'Wi-Fi Access Point',
    url: 'x',
    value: [
      {
        name: 'Local SSID'
      },
      {
        name: 'Password'
      }
    ]
  };

  const wifi = [wifiConnect, wifiAp];
</script>

<div id="modal-config-device" class="modal">
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Device Config</p>
      <button class="delete" aria-label="close" />
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
                        <select>
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
                      <input class="input" type="text" placeholder="{itemsValue.name}">
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
