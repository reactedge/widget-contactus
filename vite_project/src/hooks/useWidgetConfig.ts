import {useMemo} from "react";
import {readIntegrationConfig, readWidgetConfig} from "../ContactUsConfig.ts";
import type {ContactUsConfig} from "../domain/contact.types.ts";
import {activity} from "../activity";

export function useWidgetConfig(
    host: HTMLElement
): ContactUsConfig | null {
    return useMemo(() => {
        const baseConfig = readWidgetConfig(host);
        const integrationConfig = readIntegrationConfig()

        if (!baseConfig) {
            activity('bootstrap', 'Widget is not correctly configured', null, 'error');
            return null;
        }

        activity('bootstrap', 'Widget config loaded', {
            ...baseConfig,
            cloudflareKey: integrationConfig.integrations.cloudflare.siteKey
        });

        return {
            ...baseConfig,
            cloudflareKey: integrationConfig.integrations.cloudflare.siteKey
        }
    }, [host]);
}



