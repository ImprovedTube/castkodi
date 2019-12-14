/**
 * @module
 */

/**
 * L'URL de l'API de Rutube pour obtenir des informations sur une vidéo.
 *
 * @constant {string}
 */
const API_URL = "https://rutube.ru/api/play/options/";

/**
 * Les règles avec les patrons et leur action.
 *
 * @constant {Map.<Array.<string>, Function>}
 */
export const rules = new Map();

/**
 * Extrait les informations nécessaire pour lire une vidéo sur Kodi.
 *
 * @function action
 * @param {URL}    url          L'URL d'une vidéo AlloCiné.
 * @param {string} url.pathname Le chemin de l'URL.
 * @returns {Promise.<?string>} Une promesse contenant le lien du
 *                              <em>fichier</em> ou <code>null</code>.
 */
rules.set([
    "*://rutube.ru/video/*/*", "*://rutube.ru/play/embed/*"
], async function ({ pathname }) {
    const id = pathname.replace(/^\/video\//u, "")
                       .replace(/^\/play\/embed\//u, "")
                       .replace(/\/$/u, "");
    if (!(/^[0-9a-z]+$/u).test(id)) {
        return null;
    }

    const response = await fetch(API_URL + id + "?format=json");
    if (404 === response.status) {
        return null;
    }
    const json = await response.json();
    return json.video_balancer.m3u8;
});
