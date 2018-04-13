/**
 * Adds a translation feature to the NS address form using Yandex Translation Service translate.yandex.com
 *
 * @author Felipe Chang <felipechang@hardcake.org>
 *
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */

import {get} from "N/https";
import {getCurrentScript} from "N/runtime";

/**
 * Main Class
 */
export class AddKey {

    private HOST = "https://translate.yandex.net";
    private API_VERSION = "v1.5";

    private base_lang = "en";
    readonly key: string;

    /**
     * Build URI
     * @param {string} endpoint
     * @returns {string}
     */
    private buildPath(endpoint: string) {
        return this.HOST + "/api/" + this.API_VERSION + "/tr.json/" + endpoint + "?";
    }

    /**
     * Add query parameters to URI
     * @param {string} path
     * @param {object} params
     * @returns {string}
     */
    private buildQuery(path: string, params: object) {
        path = this.buildPath(path);
        for (let i in params) {
            if (params.hasOwnProperty(i)) {
                if (typeof params[i] === "object") {
                    for (let j = 0; j < params[i].length; j++) {
                        path += (i + "=" + encodeURIComponent(params[i][j]) + "&");
                    }
                } else {
                    path += (i + "=" + encodeURIComponent(params[i]) + "&");
                }
            }
        }
        return path;
    }

    /**
     * Detect the text language
     * @param {string} text
     * @returns {string}
     */
    public detectLanguage(text: string) {
        if (!text) {
            throw "Sample text is required to detect language";
        }
        let res = get({
            url: this.buildQuery("detect", {
                key: this.key,
                text: text
            })
        });
        return JSON.parse(res.body).lang;
    }

    /**
     * Translate the inputted text
     * @param {string} text
     * @returns {string}
     */
    /**
     * Translate the inputted text or text array
     * @param {string | string[]} text
     * @returns {string | string[]}
     */
    public translate(text: string|string[]) {
        if (!text) {
            throw "Text is required to translate";
        }
        let res = get({
            url: this.buildQuery("translate", {
                lang: this.base_lang,
                key: this.key,
                text: text
            })
        });
        return JSON.parse(res.body).text;
    }

    /**
     * Change base language
     * @param {string} base
     */
    public setBaseLanguage(base: string) {
        if (!base) {
            throw "Base language is required";
        }
        if (base.length !== 2) {
            throw "Base language is 2 digits";
        }
        this.base_lang = base;
    }

    /**
     * Constructor
     * @param {string} keyOrField
     */
    constructor(keyOrField: string) {
        if (keyOrField.substr(0, 10) === "custscript") {
            const script = getCurrentScript();
            keyOrField = script.getParameter({name: keyOrField}).toString();
        }
        if (!keyOrField) {
            throw "A Yandex key or Custom Field ID with the key value is required (starts with custscript)";
        }
        this.key = keyOrField;
    }
}