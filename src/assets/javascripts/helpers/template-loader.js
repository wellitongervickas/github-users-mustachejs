/**
 * Template loader
 * @param {string} path template location path
 * @param {object} params object to replace 
 */

const templateLoader = async (path, params) => fetch(path)
    .then((res) => res.text())
    .then((tmplt) => Mustache.render(tmplt, params));