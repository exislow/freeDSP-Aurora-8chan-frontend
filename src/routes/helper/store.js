import { writable } from "svelte/store";

export const activeModal = writable(false);
export const apiLoading = writable(false);
