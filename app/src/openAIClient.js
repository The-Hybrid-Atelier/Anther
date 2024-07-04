"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openai = void 0;
var openai_1 = require("openai");
var configuration = new openai_1.Configuration({
    organization: import.meta.env.VITE_OPENAI_ORG,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
delete configuration.baseOptions.headers['User-Agent'];
exports.openai = new openai_1.OpenAIApi(configuration);
