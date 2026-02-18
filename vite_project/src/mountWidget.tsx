import { createRoot } from "react-dom/client";
import ContactUsWidget from "./ContactUsWidget.tsx";
import {activity} from "./activity";
import {getMountedHost} from "./widget-runtime/lib/hostReader.ts";

export const WIDGET_ID = 'contactus';

export async function mountWidget(hostElement: HTMLElement) {
    const mountedHost = getMountedHost(hostElement);
    hostElement.classList.add(`reactedge-${WIDGET_ID}`);

    activity('bootstrap', 'Widget mounted', hostElement);

    const root = createRoot(mountedHost);
    root.render(<ContactUsWidget host={hostElement}/>);
}
