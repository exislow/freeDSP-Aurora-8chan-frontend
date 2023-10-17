import { configSite, soundProcessor } from "./constants.js";

export async function apiFetch(endpoint, options, fetchFn = fetch) {
  const response = await fetchFn(`${configSite.api.url}/${endpoint}`, options);
  const data = await response;

  return data;
}

export async function apiGet(endpoint, fetchFn = fetch) {
  const response = await apiFetch(endpoint, {}, fetchFn);
  const data = await response.json();
  console.log("API get", data);

  return data;
}

export async function apiPost(endpoint, data, fetchFn = fetch) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  console.log("API post req", data);
  const response = await apiFetch(endpoint, options, fetchFn);
  console.log("API post resp", response);

  return response;
}

export async function apiPostFile(endpoint, file, headers = {}, fetchFn = fetch) {
  const options = {
    method: "POST",
    headers,
    body: file
  };
  console.log("API post file req", file);
  const response = await apiFetch(endpoint, options, fetchFn);
  console.log("API post file resp", response);

  return response;
}

export async function configDeviceGet(fetchFn = fetch) {
  return await apiGet(configSite.api.endpoint.configDevice, fetchFn);
}

export async function configAddonGet(fetchFn = fetch) {
  return await apiGet(configSite.api.endpoint.configAddon, fetchFn);
}

export async function spdifOutGet(fetchFn = fetch) {
  return await apiGet(configSite.api.endpoint.spdifOut, fetchFn);
}

export async function audioInputGet(fetchFn = fetch) {
  return await apiGet(configSite.api.endpoint.audioInput, fetchFn);
}

export async function bypassAllGet(fetchFn = fetch) {
  return await apiGet(configSite.api.endpoint.bypassAll, fetchFn);
}

export async function fcAllGet(fetchFn = fetch) {
  return await apiGet(configSite.api.endpoint.fcAll, fetchFn);
}

export async function volumeMasterGet(fetchFn = fetch) {
  return await apiGet(configSite.api.endpoint.volumeMaster, fetchFn);
}

export async function channelNamesGet(fetchFn = fetch) {
  return await apiGet(configSite.api.endpoint.channelNames, fetchFn);
}

export async function configWifiGet(fetchFn = fetch) {
  return await apiGet(configSite.api.endpoint.configWifi, fetchFn);
}

export async function highPassGet(index) {
  return await apiGet(configSite.api.endpoint.highPass + index);
}

export async function highPassPost(index, data) {
  const response = await apiPost(configSite.api.endpoint.highPass + index, data);

  return response;
}

export async function lowPassGet(index) {
  return await apiGet(configSite.api.endpoint.lowPass + index);
}

export async function lowPassPost(index, data) {
  const response = await apiPost(configSite.api.endpoint.lowPass + index, data);

  return response;
}

export async function highShelfGet(index) {
  return await apiGet(configSite.api.endpoint.highShelf + index);
}

export async function highShelfPost(index, data) {
  const response = await apiPost(configSite.api.endpoint.highShelf + index, data);

  return response;
}
export async function lowShelfGet(index) {
  return await apiGet(configSite.api.endpoint.lowShelf + index);
}

export async function lowShelfPost(index, data) {
  const response = await apiPost(configSite.api.endpoint.lowShelf + index, data);

  return response;
}

export async function phaseGet(index) {
  return await apiGet(configSite.api.endpoint.phase + index);
}

export async function phasePost(index, data) {
  const response = await apiPost(configSite.api.endpoint.phase + index, data);

  return response;
}

export async function delayGet(index) {
  return await apiGet(configSite.api.endpoint.delay + index);
}

export async function delayPost(index, data) {
  const response = await apiPost(configSite.api.endpoint.delay + index, data);

  return response;
}

export async function gainGet(index) {
  return await apiGet(configSite.api.endpoint.gain + index);
}

export async function gainPost(index, data) {
  const response = await apiPost(configSite.api.endpoint.gain + index, data);

  return response;
}

export async function peqBankGet(index) {
  return await apiGet(`${configSite.api.endpoint.peqBank}${index}`);
}

export async function peqBankPost(index, data) {
  data.idx = index;
  data.numbands = soundProcessor.soundBlocks.peqbank.bandsCount;
  const response = await apiPost(`${configSite.api.endpoint.peqBank}${index}`, data);

  return response;
}

export async function deviceConfigPost(addon, adcSummation, volumePotentiometer) {
  const response = await apiPost(configSite.api.endpoint.configDevice, {
    aid: addon,
    adcsum: adcSummation,
    vpot: volumePotentiometer
  });

  return response;
}

export async function wifiApPost(ssid, password) {
  const response = await apiPost(configSite.api.endpoint.wifiAp, {
    apname: ssid,
    pwdap: password
  });

  return response;
}

export async function wifiConnectPost(ssid, password) {
  const response = await apiPost(configSite.api.endpoint.wifiConnect, {
    ssid: ssid,
    pwd: password
  });

  return response;
}

export async function presetSwitchPost(presetId) {
  const response = await apiPost(configSite.api.endpoint.presetSwitch, {
    pre: presetId
  });

  return response;
}

export async function configAddonPost(spdifInput) {
  const response = await apiPost(configSite.api.endpoint.configAddon, {
    len: 3,
    i2c: ["0x82", "0x01", spdifInput]
  });

  return response;
}

export async function spdifOutPost(outLeft, outRight) {
  const response = await apiPost(configSite.api.endpoint.spdifOut, {
    spdifleft: outLeft,
    spdifright: outRight
  });

  return response;
}

export async function volumeMasterPost(volumeDb) {
  const response = await apiPost(configSite.api.endpoint.volumeMaster, {
    vol: volumeDb
  });

  return response;
}

export async function presetFilePost(index, file) {
  const response = await apiPostFile(configSite.api.endpoint.upload + "usrparam.00" + index, file);

  return response;
}

export async function presetStorePost() {
  const response = await apiPost(configSite.api.endpoint.store, {});

  return response;
}
