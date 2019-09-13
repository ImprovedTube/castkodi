import assert      from "assert";
import { URL }     from "url";
import { extract } from "../../../src/core/index.js";
import { rules }   from "../../../src/core/scraper/kcaastreaming.js";

describe("scraper/kcaastreaming", function () {
    describe("#patterns", function () {
        it("should return the URL when it's a unsupported URL", function () {
            const url = "http://www.kcaaradio.com/";
            return extract(url).then(function (file) {
                assert.strictEqual(file, url);
            });
        });
    });

    describe("http://live.kcaastreaming.com/", function () {
        let action;
        before(function () {
            action = rules.get(this.test.parent.title);
        });

        it("should return audio URL", function () {
            const url = "http://live.kcaastreaming.com/";
            const expected = "http://stream.kcaastreaming.com:5222/kcaa.mp3";
            return action(new URL(url)).then(function (file) {
                assert.strictEqual(file, expected);
            });
        });
    });
});
