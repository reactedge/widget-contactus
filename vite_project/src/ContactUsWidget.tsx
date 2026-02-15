import {useWidgetConfig} from "./hooks/useWidgetConfig.ts";
import {SystemStateProvider} from "./state/System/SystemStateProvider.tsx";
import {ContactUsWrapper} from "./components/ContactUsWrapper.tsx";

type Props = {
    host: HTMLElement
}

export const WIDGET_ID = 'ContactUs';

export default function ContactUsWidget({host}: Props) {
    const config = useWidgetConfig(host);

    if (!config) return null;

    return <SystemStateProvider config={config}>
        <ContactUsWrapper config={config} />
    </SystemStateProvider>
}
