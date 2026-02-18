import type {ContactUsConfig, IntegrationConfig} from "./domain/contact.types.ts";
import {WIDGET_ID} from "./mountWidget.tsx";

export function readWidgetConfig(
    hostElement: HTMLElement
): ContactUsConfig | null {
    const configScript = hostElement.querySelector<HTMLScriptElement>(
        'script[type="application/json"][data-config]'
    );

    if (!configScript) {
        throw new Error(`${WIDGET_ID} widget requires a <script data-config> block.`);
    }

    try {
        const parsed = JSON.parse(configScript.textContent || "{}");

        return Object.freeze({
            title: parsed.data.title,
            intro: parsed.data.intro,
            endpoint: parsed.data.endpoint ?? null,
            categories: parsed.data.categories ?? [],
            fields: parsed.data.fields ?? []
        });
    } catch {
        return {
            title: '',
            intro: '',
            endpoint: null,
            categories: [],
            fields: []
        };
    }
}

export function readIntegrationConfig(): IntegrationConfig {
    const configScript = document.getElementById('reactedge-runtime');

    if (!configScript) {
        throw new Error("Booking widget requires a <script id='reactedge-runtime'> block.");
    }

    let config: IntegrationConfig;
    try {
        config = JSON.parse(configScript.textContent);
    } catch {
        throw new Error(`${WIDGET_ID}: reactedge-runtime contains invalid JSON`);
    }

    if (!config.integrations?.cloudflare?.siteKey) {
        throw new Error(`${WIDGET_ID}: cloudflare missing in reactedge-runtime`);
    }

    return config;
}

interface ContactFormField {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'textarea';
    required?: boolean;
}

interface ContactFormCategory {
    value: string;
    label: string;
}

interface ContactFormConfig {
    title: string;
    intro?: string;
    endpoint: string;
    categories?: ContactFormCategory[];
    fields: ContactFormField[];
}

interface SystemConfig {
    widgets?: {
        'contact-form'?: ContactFormConfig;
    };
    integrations?: {
        cloudflare?: {
            siteKey: string;
        };
    };
}

export function readReactEdgeConfig(): SystemConfig {
    const root = document.getElementById('reactedge-config');

    if (!root?.textContent) {
        throw new Error(`${WIDGET_ID}: reactedge-config not found`);
    }

    let config: SystemConfig;

    try {
        config = JSON.parse(root.textContent);
    } catch {
        throw new Error(`${WIDGET_ID}: reactedge-config contains invalid JSON`);
    }

    return config;
}

export function getContactFormConfig(config: SystemConfig): ContactFormConfig {
    const form = config.widgets?.['contact-form'];

    if (!form) {
        throw new Error(`${WIDGET_ID}: config missing`);
    }

    if (!form.endpoint) {
        throw new Error(`${WIDGET_ID}: endpoint missing`);
    }

    if (!form.fields || form.fields.length === 0) {
        throw new Error(`${WIDGET_ID}: no fields defined`);
    }

    return form;
}
