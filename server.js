// Create express app
const express = require('express');
const fs = require('fs');
const app = express();
const useragent = require('express-useragent');

app.use(express.static('public'));
app.use(useragent.express());

// Set view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');
        res.render('index', { navbar, footer });
    } catch {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/about%20us', (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');
        res.render('about us', { navbar, footer });
    } catch {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/services', (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');
        res.render('services', { navbar, footer });
    } catch {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/contact%20us', (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');
        res.render('contact us', { navbar, footer });
    } catch {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/ringer', (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');

        const ua = req.useragent;

        const download_message = "Download For " + ua.platform;

        res.render('ringer', { navbar, footer, download_message });
    } catch {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/ringer%20downloads', (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');
        res.render('ringer downloads', { navbar, footer });
    } catch {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/ringer/download/:platform', async (req, res) => {
    // Get params from url
    const params = req.params;

    async function get_download_file() {
        const response = await fetch('https://api.github.com/repos/Lif-Platforms/Ringer-Client-Desktop/releases/latest', {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const release = await response.json();

        const download_file = release.assets.find(a => a.name === 'download.json');

        if (download_file) {
            const fetch_data = await fetch(download_file.browser_download_url, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });

            const data = await fetch_data.json();

            return data;
        } else {
            throw new Error("Asset not found");
        }
    }

    try {
        if (params.platform === "windows") {
            const file = await get_download_file();
            res.json({download_file: file['windows']});

        } else if (params.platform === "mac_os") {
            const file = await get_download_file();
            res.json({download_file: file['mac-os']});

        } else {
            res.status(400).send("Bad platform. Accepted platforms: 'windows', 'mac_os'.");
        }
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

app.get('/ringer/platform_detect/download', async (req, res) => {
    async function get_download_file() {
        const response = await fetch('https://api.github.com/repos/Lif-Platforms/Ringer-Client-Desktop/releases/latest', {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const release = await response.json();

        const download_file = release.assets.find(a => a.name === 'download.json');

        if (download_file) {
            const fetch_data = await fetch(download_file.browser_download_url, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });

            const data = await fetch_data.json();

            return data;
        } else {
            throw new Error("Asset not found");
        }
    }

    const file = await get_download_file();
    const ua = req.useragent;

    if (ua.platform === "Apple Mac") {
        res.redirect("https://github.com/Lif-Platforms/Ringer-Client-Desktop/releases/latest/download/" + file['mac-os']);

    } else if (ua.platform === "Microsoft Windows") {
        res.redirect("https://github.com/Lif-Platforms/Ringer-Client-Desktop/releases/latest/download/" + file['windows']);

    } else {
        res.status(400).send('invalid platform');
    }
})

app.get('/dayly', (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');
        res.render('dayly', { navbar, footer });
    } catch {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/lif%20accounts', (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');
        res.render('lif accounts', { navbar, footer });
    } catch {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/privacy%20policy', (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');
        res.render('privacy policy', { navbar, footer });
    } catch {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/terms%20of%20service', (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');
        res.render('terms of service', { navbar, footer });
    } catch {
        res.status(500).send('Internal Server Error');
    }
})

app.all('*', (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');
        res.render('404', { navbar, footer });
    } catch {
        res.status(500).send('Internal Server Error');
    }
})

app.listen(3000);