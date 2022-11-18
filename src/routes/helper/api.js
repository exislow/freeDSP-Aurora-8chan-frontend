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

export async function getHighPass(index) {
  return await getApi(`${configSite.api.endpoint.highPass}${index}`);
}

export async function getLowPass(index) {
  return await getApi(`${configSite.api.endpoint.lowPass}${index}`);
}

export async function getHighShelf(index) {
  return await getApi(`${configSite.api.endpoint.highShelf}${index}`);
}

export async function getLowShelf(index) {
  return await getApi(`${configSite.api.endpoint.lowShelf}${index}`);
}

export async function getPhase(index) {
  return await getApi(`${configSite.api.endpoint.phase}${index}`);
}

export async function getDelay(index) {
  return await getApi(`${configSite.api.endpoint.delay}${index}`);
}

export async function getGain(index) {
  return await getApi(`${configSite.api.endpoint.gain}${index}`);
}

export async function getPeqBank(index) {
  return await getApi(`${configSite.api.endpoint.peqBank}${index}`);
}
