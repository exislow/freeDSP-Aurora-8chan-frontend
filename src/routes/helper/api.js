import { configSite } from "./constants.js";

export async function getApi(endpoint, fetchFn = fetch) {
  const response = await fetchFn(`${configSite.api.url}/${endpoint}`);

  const data = await response.json();
  console.log("API", data);
  return data;
}

export async function getConfigDevice(fetchFn = fetch) {
  return await getApi(configSite.api.endpoint.configDevice, fetchFn);
}

export async function getSpdifOut(fetchFn = fetch) {
  return await getApi(configSite.api.endpoint.spdifOut, fetchFn);
}

export async function getAudioInput(fetchFn = fetch) {
  return await getApi(configSite.api.endpoint.audioInput, fetchFn);
}

export async function getBypassAll(fetchFn = fetch) {
  return await getApi(configSite.api.endpoint.bypassAll, fetchFn);
}

export async function getFcAll(fetchFn = fetch) {
  return await getApi(configSite.api.endpoint.fcAll, fetchFn);
}

export async function getVolumeMaster(fetchFn = fetch) {
  return await getApi(configSite.api.endpoint.volumeMaster, fetchFn);
}

export async function getChannelNames(fetchFn = fetch) {
  return await getApi(configSite.api.endpoint.channelNames, fetchFn);
}

export async function getConfigWifi(fetchFn = fetch) {
  return await getApi(configSite.api.endpoint.configWifi, fetchFn);
}
