import { mountWidget } from "./mountWidget";

class ContactusWidget extends HTMLElement {
    connectedCallback() {
        mountWidget(this);
    }
}

customElements.define("contactus-widget", ContactusWidget);
