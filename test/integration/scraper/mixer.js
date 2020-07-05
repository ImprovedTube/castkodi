import assert      from "assert";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Mixer", function () {
    it("should return URL when it's not a video", async function () {
        const url = "https://mixer.com/pro";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file, url);
    });

    it("should return null URL it's invalid URL", async function () {
        const url = "https://mixer.com/not/found";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file, url);
    });

    it("should return video URL", async function () {
        const url = "https://mixer.com/NINJA";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "https://mixer.com/api/v1/channels/90571077/manifest.m3u8");
    });

    it("should return video URL when protocol is HTTP", async function () {
        const url = "http://mixer.com/ChannelOne";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "https://mixer.com/api/v1/channels/58717/manifest.m3u8");
    });

    it("should return video URL from embed video", async function () {
        const url = "https://mixer.com/embed/player/LevelUpCast" +
                                                         "?disableLowLatency=1";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "https://mixer.com/api/v1/channels/15808052/manifest.m3u8");
    });
});
