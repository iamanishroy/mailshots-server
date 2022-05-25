const url = require("url");

function validURL(str) {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
}

function clean(s) {
    if (validURL(s) && s.includes('https://')) {
        return url.parse(s).hostname;
    }
    return s;
}

module.exports = (verifiedDomain, domainToVerify) => {
    for (let i = 0; i < verifiedDomain.length; i++) {
        if (clean(verifiedDomain[i]) === '*' || clean(verifiedDomain[i]) === clean(domainToVerify)) {
            return true;
        }
    }

    return false;
};