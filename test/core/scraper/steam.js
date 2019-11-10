import assert      from "assert";
import { URL }     from "url";
import { extract } from "../../../src/core/index.js";
import { rules }   from "../../../src/core/scraper/steam.js";

describe("scraper/steam", function () {
    describe("#patterns", function () {
        it("should return the URL when it's a unsupported URL", function () {
            const url = "https://store.steampowered.com/stats/";
            return extract(url).then(function (file) {
                assert.strictEqual(file, url);
            });
        });
    });

    describe("*://store.steampowered.com/app/*", function () {
        let action;
        before(function () {
            action = rules.get(this.test.parent.title);
        });

        it("should return null when it's not a video", function () {
            const url = "https://store.steampowered.com/app/400/Portal/";
            const expected = null;
            return action(new URL(url)).then(function (file) {
                assert.strictEqual(file, expected);
            });
        });

        it("should return video URL", function () {
            const url = "https://store.steampowered.com/app/620/Portal_2/";
            const expected = "https://steamcdn-a.akamaihd.net/steam/apps" +
                                            "/81613/movie_max.mp4?t=1452903069";
            return action(new URL(url)).then(function (file) {
                assert.strictEqual(file, expected);
            });
        });

        it("should return video URL when protocol is HTTP", function () {
            const url = "http://store.steampowered.com/app/322500/SUPERHOT/";
            const expected = "https://steamcdn-a.akamaihd.net/steam/apps" +
                                        "/256682033/movie_max.mp4?t=1492645342";
            return action(new URL(url)).then(function (file) {
                assert.strictEqual(file, expected);
            });
        });
    });

    describe("*://steamcommunity.com/broadcast/watch/*", function () {
        let action;
        before(function () {
            action = rules.get(this.test.parent.title);
        });

        it("should return null when it's not a video", function () {
            const url = "https://steamcommunity.com/broadcast/watch/404";
            const expected = null;
            return action(new URL(url)).then(function (file) {
                assert.strictEqual(file, expected);
            });
        });

        it("should return video URL", function () {
            const url = "https://steamcommunity.com/broadcast/watch" +
                                                           "/76561198802066071";
            const expected = "https://cache4-lhr1.steamcontent.com/broadcast" +
                                                          "/76561198802066071/";
            return action(new URL(url)).then(function (file) {
                assert.ok(file.startsWith(expected),
                          `"${file}".startsWith(expected)`);
            });
        });

        it("should return video URL when protocol is HTTP", function () {
            const url = "http://steamcommunity.com/broadcast/watch" +
                                                           "/76561198802066071";
            const expected = "https://cache4-lhr1.steamcontent.com/broadcast" +
                                                          "/76561198802066071/";
            return action(new URL(url)).then(function (file) {
                assert.ok(file.startsWith(expected),
                          `"${file}".startsWith(expected)`);
            });
        });
    });
});
