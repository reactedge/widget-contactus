import { createRoot } from "react-dom/client";
import ContactUsWidget from "./ContactUsWidget.tsx";
import {activity} from "./activity";
import {ensureGlobalStyle} from "./lib/style.ts";
import {getMountedHost} from "./widget-runtime/lib/hostReader.ts";

export async function mountWidget(hostElement: HTMLElement) {
    const mountedHost = getMountedHost(hostElement);

    ensureGlobalStyle('reactedge-contactus-css', '/widget/contactus.css');

    activity('bootstrap', 'Widget mounted', hostElement);

    const root = createRoot(mountedHost);
    root.render(<ContactUsWidget host={hostElement} />);
}
