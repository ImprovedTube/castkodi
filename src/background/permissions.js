/**
 * @module
 */

/**
 * Actualise la configuration suite la suppression de permissions optionnelles.
 *
 * @param {Object}   changes             Les changements sur les permissions.
 * @param {string[]} changes.permissions Les permissions supprimées.
 */
const handleRemove = async function ({ permissions }) {
    if (permissions.includes("history")) {
        browser.storage.local.set({ "general-history": false });
    }
    if (permissions.includes("bookmarks")) {
        const config = await browser.storage.local.get(["menu-contexts"]);
        const contexts = config["menu-contexts"];
        browser.storage.local.set({
            "menu-contexts": contexts.filter((c) => "bookmark" !== c),
        });
    }
};

browser.permissions.onRemoved.addListener(handleRemove);
