import assert      from "assert";
import { URL }     from "url";
import { extract } from "../../../src/core/index.js";
import { rules }   from "../../../src/core/scraper/instagram.js";

describe("scraper/instagram", function () {
    describe("#patterns", function () {
        it("should return the URL when it's a unsupported URL",
                                                             async function () {
            const url = "https://www.instagram.com/accounts/emailsignup/";

            const file = await extract(url);
            assert.strictEqual(file, url);
        });
    });

    describe("*://www.instagram.com/p/*", function () {
        let action;
        before(function () {
            action = [...rules.entries()]
                          .find(([r]) => r.includes(this.test.parent.title))[1];
        });

        it("should return null when it's not a video", async function () {
            const url = "https://www.instagram.com/p/6p_BDeK-8G/";
            const expected = null;

            const file = await action(new URL(url));
            assert.strictEqual(file, expected);
        });

        it("should return video URL", async function () {
            const url = "https://www.instagram.com/p/BpFwZ6JnYPq/";
            const expected = "/43507506_351933205369613_6559511411523846144" +
                                                                      "_n.mp4?";

            const file = await action(new URL(url));
            assert.ok(file.includes(expected),
                      `"${file}".includes(expected)`);
        });

        it("should return video URL when protocol is HTTP", async function () {
            const url = "https://www.instagram.com/p/Bpji87LiJFs/";
            const expected = "/44876841_340575853170202_7413375163648966656" +
                                                                      "_n.mp4?";

            const file = await action(new URL(url));
            assert.ok(file.includes(expected),
                      `"${file}".includes(expected)`);
        });
    });
});
