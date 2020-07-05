import assert      from "assert";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Twitch", function () {
    it("should return video id", async function () {
        const url = "https://www.twitch.tv/videos/164088111";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play&video_id=164088111");
    });

    it("should return video id when protocol is HTTP", async function () {
        const url = "http://www.twitch.tv/videos/164088111";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play&video_id=164088111");
    });

    it("should return video id from 'go'", async function () {
        const url = "https://go.twitch.tv/videos/164088111";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play&video_id=164088111");
    });

    it("should return video id from mobile version", async function () {
        const url = "https://m.twitch.tv/videos/164088111";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play&video_id=164088111");
    });

    it("should return URL when it's not a clip", async function () {
        const url = "https://clips.twitch.tv/embed?noclip=Awesome";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file, url);
    });

    it("should return embed clip name", async function () {
        const url = "https://clips.twitch.tv/embed" +
                                    "?clip=IncredulousAbstemiousFennelImGlitch";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play" +
                                   "&slug=IncredulousAbstemiousFennelImGlitch");
    });

    it("should return clip name", async function () {
        const url = "https://clips.twitch.tv/GleamingWildCougarFUNgineer";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play" +
                                           "&slug=GleamingWildCougarFUNgineer");
    });

    it("should return clip name when protocol is HTTP", async function () {
        const url = "http://clips.twitch.tv/GleamingWildCougarFUNgineer";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play" +
                                           "&slug=GleamingWildCougarFUNgineer");
    });

    it("should return clip name from channel", async function () {
        const url = "https://www.twitch.tv/twitch/clip" +
                                                "/GleamingWildCougarFUNgineer" +
                                             "?filter=clips&range=7d&sort=time";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play" +
                                           "&slug=GleamingWildCougarFUNgineer");
    });

    it("should return clip name from 'go'", async function () {
        const url = "https://go.twitch.tv/twitch/clip" +
                                                 "/GleamingWildCougarFUNgineer";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play" +
                                           "&slug=GleamingWildCougarFUNgineer");
    });

    it("should return clip name from mobile version", async function () {
        const url = "https://m.twitch.tv/twitch/clip" +
                                                 "/GleamingWildCougarFUNgineer";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play" +
                                           "&slug=GleamingWildCougarFUNgineer");
    });

    it("should return URL when it's not channel or video", async function () {
        const url = "https://player.twitch.tv/?other=foobar";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file, url);
    });

    it("should return channel name from player", async function () {
        const url = "https://player.twitch.tv/?channel=canardpc&muted=true";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play&channel_name=canardpc");
    });

    it("should return video id from player", async function () {
        const url = "https://player.twitch.tv/?video=474384559&autoplay=false";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play&video_id=474384559");
    });

    it("should return channel name", async function () {
        const url = "https://www.twitch.tv/nolife";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play&channel_name=nolife");
    });

    it("should return channel name when protocol is HTTP", async function () {
        const url = "http://www.twitch.tv/nolife";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play&channel_name=nolife");
    });

    it("should return channel name form 'go'", async function () {
        const url = "https://go.twitch.tv/nolife";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play&channel_name=nolife");
    });

    it("should return channel name from mobile version", async function () {
        const url = "https://m.twitch.tv/jvtv";
        const options = { depth: false, incognito: false };

        const file = await extract(new URL(url), options);
        assert.strictEqual(file,
            "plugin://plugin.video.twitch/?mode=play&channel_name=jvtv");
    });
});
