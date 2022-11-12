import { activeModal } from "../helper/store.js";

// Functions to open and close a modal
export function modalOpen(idModal) {
  activeModal.set(idModal);
}

export function modalClose() {
  activeModal.set(false);
}

export function handleKeydown(element, event) {
  if (event.key === "Escape") {
    modalClose();

    return;
  }

  if (event.key === "Tab") {
    // trap focus
    const nodes = element.querySelectorAll("*");
    const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

    let index = tabbable.indexOf(document.activeElement);
    if (index === -1 && event.shiftKey) index = 0;

    index += tabbable.length + (event.shiftKey ? -1 : 1);
    index %= tabbable.length;

    tabbable[index].focus();
    event.preventDefault();
  }
}
