import assert from "node:assert";
import * as plugin from "../../../../src/core/plugin/mixcloud.js";

describe("core/plugin/mixcloud.js", function () {
    describe("generateUrl()", function () {
        it("should return URL with audio URL", async function () {
            const label = await plugin.generateUrl("http://foo.ai/bar.html");
            assert.strictEqual(label,
                "plugin://plugin.audio.mixcloud/?mode=40" +
                                         "&key=http%3A%2F%2Ffoo.ai%2Fbar.html");
        });
    });
});