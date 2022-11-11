<script>
  import { hardware, modal } from "../helper/constants.js";
  import { modalClose } from "../helper/modal.js";
  import { handleKeydown} from "../helper/modal.js";
  import { onDestroy } from "svelte";

  export let configDevice = {};
  export let configWifi = {};
  let thisModal;
  const previouslyFocused = typeof document !== 'undefined' && document.activeElement;

  if (previouslyFocused) {
    onDestroy(() => {
      previouslyFocused.focus();
    });
  }

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

  let stateDevice = {
    addon: configDevice.aid.toString(),
    addonSettings: (1).toString(),
    adcSummation: configDevice.adcsum.toString(),
    volumePotentiometer: configDevice.vpot ? "1" : "0"
  };

  function updateWifiConnect() {
    // implement post
    // if 200
    configWifi.ssid = wifiConnect.form[0].value;
  }

  function updateWifiAp() {
    // implement post
    // if 200
    configWifi.apname = wifiAp.form[0].value;
  }
</script>

<svelte:window on:keydown={(event) => handleKeydown(thisModal, event)}/>

<div class="modal is-active" id="{modal.configDevice}" aria-modal="true" bind:this={thisModal}>
  <div class="modal-background" on:click={modalClose} />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Device Config</p>
      <button aria-label="close" class="delete" on:click={modalClose} />
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
    </section>
  </div>
</div>
