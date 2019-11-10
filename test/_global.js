import { URL }       from "url";
import { browser }   from "./mock/browser.js";
import { btoa }      from "./mock/btoa.js";
import { DOMParser } from "./mock/domparser.js";
import { fetch }     from "./mock/fetch.js";
import { WebSocket } from "./mock/websocket.js";

global.URL       = URL;
global.browser   = browser;
global.btoa      = btoa;
global.DOMParser = DOMParser;
global.fetch     = fetch;
global.WebSocket = WebSocket;
