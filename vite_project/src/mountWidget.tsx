import { createRoot } from "react-dom/client";
import ContactusWidget from "./ContactusWidget.tsx";
import {activity} from "./activity";
import {ensureGlobalStyle} from "./lib/style.ts";
import {getMountedHost} from "./widget-runtime/lib/hostReader.ts";

export async function mountWidget(hostElement: HTMLElement) {
    const mountedHost = getMountedHost(hostElement);

    ensureGlobalStyle('reactedge-contactus-css', '/widget/contactus.css');

    activity('bootstrap', 'ContactUs Widget mounted', hostElement);

    const root = createRoot(mountedHost);
    root.render(<ContactusWidget host={hostElement} />);
}
