const express = require('express');
const app = express();
app.use(express.json());
app.use(require('cookie-parser')());

const fs = require('fs');
const path = require('path');

const { port, ignoreDomCount } = require('./config');

function reqe(path) {
    delete require.cache[require.resolve(path)];
    return require(path);
}

app.get('*', async (req, res) => {
    const host = req.get('host');
    let url = req.originalUrl;
    if (url.indexOf('?') > 0) {
        url = url.slice(0, url.indexOf('?'));
    }
    console.log(url)

    let sh = host.split('.');
    let subDom = '';
    if (sh.length > ignoreDomCount) {
        sh = sh.slice(0, -ignoreDomCount);
        subDom = sh.join('/');
    }

    const { redirects } = reqe('./config');
    if (redirects[path.join(subDom, url)]) {
        res.redirect(redirects[path.join(subDom, url)]);
        return;
    } else if (redirects[subDom + '\\*']) {
        res.redirect(redirects[subDom + '\\*'] + url);
        return;
    }

    let filePath = path.join(__dirname, '../', 'subdomains', subDom, url);

    const { canAccess } = reqe('./auth');
    let resp = await canAccess(path.join(subDom, url));
    if (resp[0] == false) {
        if (resp[1]) {
            res.redirect(resp[1]);
        } else {
            res.sendStatus(404);
        }
        return;
    }

    let fp = '';
    fs.stat(filePath, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                if (fs.existsSync(filePath + '.html')) {
                    res.sendFile(filePath + '.html');
                } else if (fs.existsSync(path.join(filePath, '404.html'))) {
                    res.sendFile(path.join(filePath, '404.html'));
                } else if (filePath.includes('assets')) {
                    if (
                        fs.existsSync(
                            path.join(
                                __dirname,
                                '../',
                                'subdomains',
                                'assets',
                                filePath.slice(filePath.indexOf('assets') + 6)
                            )
                        )
                    ) {
                        res.sendFile(
                            path.join(
                                __dirname,
                                '../',
                                'subdomains',
                                'assets',
                                filePath.slice(filePath.indexOf('assets') + 6)
                            )
                        );
                    } else {
                        res.sendStatus(404);
                    }
                } else {
                    res.sendFile(
                        path.join(__dirname, '../', 'subdomains', '404.html')
                    );
                }
            } else {
                console.error(err);
            }
        } else {
            if (stats.isFile()) {
                res.sendFile(filePath);
            } else if (stats.isDirectory()) {
                if (fs.existsSync(path.join(filePath, 'index.html'))) {
                    res.sendFile(path.join(filePath, 'index.html'));
                } else {
                    if (fs.existsSync(path.join(filePath, '404.html'))) {
                        res.sendFile(path.join(filePath, '404.html'));
                    } else {
                        res.sendFile(
                            path.join(
                                __dirname,
                                '../',
                                'subdomains',
                                '404.html'
                            )
                        );
                    }
                }
            }
        }
    });
});

app.listen(port, console.log('Listening on port 3000'));
