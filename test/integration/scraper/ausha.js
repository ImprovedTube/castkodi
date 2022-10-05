import assert from "node:assert";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Ausha", function () {
    it("should return URL when it's not an audio", async function () {
        const url = new URL("https://podcast.ausha.co/dont/exist");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file, url.href);
    });

    it("should return audio URL", async function () {
        const url = new URL("https://podcast.ausha.co/firstprintfra" +
                                                             "/fp-aout-2022-1");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file, "https://audio.ausha.co/b3RDWTvLDnEK.mp3");
    });
});