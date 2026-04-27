import { mountWidget } from "./mountWidget";
import type {ContactUsRawConfig} from "./domain/contact.types.ts";

export async function mount(el: HTMLElement, config?: ContactUsRawConfig) {
    await mountWidget(el, config)
}
