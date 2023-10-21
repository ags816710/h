const base = 'localhost'
let config = {
    base: base,
    env: 'dev',
    port: undefined,
    ignoreDomCount: 1,
    // ignoreDomCount: 2,
    redirects: {
        // '\\': 'https://google.com',
        // '\\something': 'https://google.org/',
        'nv\\*': `http://nvcrp.${base}`,
    },
};

if (config.env == 'prd') {
    config.port = 443;
} else if (config.env == 'dev') {
    config.port = 80;
}

module.exports = config;
