import {useWidgetConfig} from "./hooks/useWidgetConfig.ts";
import {SystemStateProvider} from "./state/System/SystemStateProvider.tsx";
import {ContactUsWrapper} from "./components/ContactUsWrapper.tsx";
import {ErrorState} from "./components/global/ErrorState.tsx";

type Props = {
    host: HTMLElement
}

export default function ContactUsWidget({host}: Props) {
    const {config, error} = useWidgetConfig(host);

    if (!config) return null;
    if (error) return <ErrorState error={error}  />

    return <SystemStateProvider config={config}>
        <ContactUsWrapper config={config} />
    </SystemStateProvider>
}
