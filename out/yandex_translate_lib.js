/**
 * Adds a translation feature to the NS address form using Yandex Translation Service translate.yandex.com
 *
 * @author Felipe Chang <felipechang@hardcake.org>
 *
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */
define(["require", "exports", "N/https", "N/runtime"], function (require, exports, https_1, runtime_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Main Class
     */
    var AddKey = /** @class */ (function () {
        /**
         * Constructor
         * @param {string} keyOrField
         */
        function AddKey(keyOrField) {
            this.HOST = "https://translate.yandex.net";
            this.API_VERSION = "v1.5";
            this.base_lang = "en";
            if (keyOrField.substr(0, 10) === "custscript") {
                var script = runtime_1.getCurrentScript();
                keyOrField = script.getParameter({ name: keyOrField }).toString();
            }
            if (!keyOrField) {
                throw "A Yandex key or Custom Field ID with the key value is required (starts with custscript)";
            }
            this.key = keyOrField;
        }
        /**
         * Build URI
         * @param {string} endpoint
         * @returns {string}
         */
        AddKey.prototype.buildPath = function (endpoint) {
            return this.HOST + "/api/" + this.API_VERSION + "/tr.json/" + endpoint + "?";
        };
        /**
         * Add query parameters to URI
         * @param {string} path
         * @param {object} params
         * @returns {string}
         */
        AddKey.prototype.buildQuery = function (path, params) {
            path = this.buildPath(path);
            for (var i in params) {
                if (params.hasOwnProperty(i)) {
                    if (typeof params[i] === "object") {
                        for (var j = 0; j < params[i].length; j++) {
                            path += (i + "=" + encodeURIComponent(params[i][j]) + "&");
                        }
                    }
                    else {
                        path += (i + "=" + encodeURIComponent(params[i]) + "&");
                    }
                }
            }
            return path;
        };
        /**
         * Detect the text language
         * @param {string} text
         * @returns {string}
         */
        AddKey.prototype.detectLanguage = function (text) {
            if (!text) {
                throw "Sample text is required to detect language";
            }
            var res = https_1.get({
                url: this.buildQuery("detect", {
                    key: this.key,
                    text: text
                })
            });
            return JSON.parse(res.body).lang;
        };
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
        AddKey.prototype.translate = function (text) {
            if (!text) {
                throw "Text is required to translate";
            }
            var res = https_1.get({
                url: this.buildQuery("translate", {
                    lang: this.base_lang,
                    key: this.key,
                    text: text
                })
            });
            return JSON.parse(res.body).text;
        };
        /**
         * Change base language
         * @param {string} base
         */
        AddKey.prototype.setBaseLanguage = function (base) {
            if (!base) {
                throw "Base language is required";
            }
            if (base.length !== 2) {
                throw "Base language is 2 digits";
            }
            this.base_lang = base;
        };
        return AddKey;
    }());
    exports.AddKey = AddKey;
});
