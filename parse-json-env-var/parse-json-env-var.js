"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
try {
    // `var` input defined in action metadata file
    const variable = core_1.default.getInput('var');
    const isSecret = core_1.default.getBooleanInput('is-secret');
    const obj = JSON.parse(variable);
    for (const entry in Object.entries(obj)) {
        const [envName, envValue] = entry;
        // Fail the action if this variable name is already in use
        if (process.env[envName]) {
            throw new Error(`The environment name "${envName}" is already in use. Please use an alias to ensure that each secret has a unique environment name`);
        }
        // Inject a single secret
        if (isSecret) {
            core_1.default.debug(`Setting "${envName}" as secret.`);
            core_1.default.setSecret(envValue);
        }
        // Export variable
        core_1.default.info(`Injecting "${envName}" as environment variable with value: ${envValue}`);
        core_1.default.exportVariable(envName, envValue);
    }
}
catch (error) {
    console.error(error);
    if (error instanceof Error) {
        core_1.default.setFailed(error.message);
    }
    else {
        core_1.default.setFailed('Unknown error has occurred, checking logging above');
    }
}
