import { api, track } from 'lwc';
import OmniscriptHeader from 'c/omniscriptHeader';
import { isOffPlatform, setConnection, getConnection } from 'c/omniscriptRestApi';
import { RUN_MODES, registerNs } from 'c/omniscriptInternalUtils';
import { OMNIDEF } from './typeSecondExampleSubtypeExampleEnglish_def.js';
import tmpl from './typeSecondExampleSubtypeExampleEnglish.html';
import tmpl_nds from './typeSecondExampleSubtypeExampleEnglish_nds.html';

/**
 *  IMPORTANT! Generated class DO NOT MODIFY
 */
export default class typeSecondExampleSubtypeExampleEnglish extends OmniscriptHeader {
    @track jsonDef = {};
    @track resume = false;
    @api get inline() {
        return this._inline;
    }
    set inline(value) {
        this._inline = String(value) === 'true';
    }
    _inline = false;
    @api inlineLabel;
    @api inlineVariant;
    @api layout;
    @api recordId;

    @api set connection(value) {
        if (value) {
            const ns = value.namespace ? value.namespace + '__' : undefined;
            registerNs(ns);
            setConnection(value);
        }
    }
    get connection() {
        return getConnection();
    }

    connectedCallback() {

        this.checkResume();

        const connectionReceivedCallback = () => {
            this.jsonDef = this.instanceId ?
                {
                    sOmniScriptId: OMNIDEF.sOmniScriptId,
                    lwcId: OMNIDEF.lwcId,
                    labelMap: OMNIDEF.labelMap,
                    propSetMap: OMNIDEF.propSetMap,
                    bpType: OMNIDEF.bpType,
                    bpSubType: OMNIDEF.bpSubType,
                    bpLang: OMNIDEF.bpLang,
                    bpVersion: OMNIDEF.bpVersion
                } :
                JSON.parse(JSON.stringify(OMNIDEF));
            this.resume = !!this.instanceId;
            super.connectedCallback();
        }

        if (!isOffPlatform()) {
            connectionReceivedCallback();
        } else {

            const startTime = new Date();
            const connectionVerificationCallback = () => {
                const elapsed = Math.round((new Date() - startTime) / 1000),
                    connection = getConnection(),
                    hasConnection = connection !== undefined && connection !== null;
                if (!hasConnection && elapsed < 60)  // Timeout of 1 minute
                    return this.waitForConnection(500).then(connectionVerificationCallback);

                // Continue with the connectedCallback
                connectionReceivedCallback();
            };

            // Dispatch an event in order to notify we are ready to receive a connection
            this.dispatchEvent(new CustomEvent('omnioutcomponentready', { bubbles: true, composed: true, detail: { omnioutcomponent: true } }));

            if (this.runMode === RUN_MODES.OFFLINE && !this.resume) {
                // When OFFLINE mode, continue with the connectedCallback and do not wait for the connection
                connectionReceivedCallback();
            } else {
                this.waitForConnection(500).then(connectionVerificationCallback);
            }
        }
    }

    handleContinueInvalidSfl() {
        this.jsonDef = JSON.parse(JSON.stringify(OMNIDEF));
        super.handleContinueInvalidSfl();
    }

    waitForConnection(ms) {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        return this.layout === 'newport' ? tmpl_nds : tmpl;
    }
}