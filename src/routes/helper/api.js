import { configSite } from "./constants.js";

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
  const response = await apiFetch(endpoint, options, fetchFn);
  console.log("API post", response);

  return response;
}

export async function configDeviceGet(fetchFn = fetch) {
  return await apiGet(configSite.api.endpoint.configDevice, fetchFn);
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
  return await apiGet(`${configSite.api.endpoint.highPass}${index}`);
}

export async function getLowPass(index) {
  return await apiGet(`${configSite.api.endpoint.lowPass}${index}`);
}

export async function getHighShelf(index) {
  return await apiGet(`${configSite.api.endpoint.highShelf}${index}`);
}

export async function lowShelfGet(index) {
  return await apiGet(`${configSite.api.endpoint.lowShelf}${index}`);
}

export async function phaseGet(index) {
  return await apiGet(`${configSite.api.endpoint.phase}${index}`);
}

export async function delayGet(index) {
  return await apiGet(`${configSite.api.endpoint.delay}${index}`);
}

export async function gainGet(index) {
  return await apiGet(`${configSite.api.endpoint.gain}${index}`);
}

export async function peqBankGet(index) {
  return await apiGet(`${configSite.api.endpoint.peqBank}${index}`);
}

export async function deviceConfigPost(addon, adcSummation, volumePotentiometer) {
  const response = await apiPost(configSite.api.endpoint.configDevice, {
    aid: addon,
    adcsum: adcSummation,
    vpot: volumePotentiometer
  });

  return response;
}
