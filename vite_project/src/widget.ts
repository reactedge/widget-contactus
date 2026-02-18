import { mountWidget } from "./mountWidget";
import './styles/contactus.css'

class ContactusWidget extends HTMLElement {
    connectedCallback() {
        mountWidget(this);
    }
}

customElements.define("contactus-widget", ContactusWidget);
