/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

export const mochaHooks = {
    beforeAll: () => {
        globalThis.fetch = function () {
            throw new Error("do not use real fetch for unit tests");
        };
    },
};
