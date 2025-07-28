// Create express app
const express = require('express');
const fs = require('fs');
const app = express();
const useragent = require('express-useragent');
const { toHTML } = require('@portabletext/to-html');
require('dotenv').config();
const { isValidSignature, SIGNATURE_HEADER_NAME } = require('@sanity/webhook');

app.use(express.static('public'));
app.use(useragent.express());

// Middleware to parse JSON and URL-encoded payloads
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

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
        let platformName;

        if (ua.platform === "Apple Mac") {
            platformName = "Mac";
        } else if (ua.platform === "Microsoft Windows") {
            platformName = "Windows";
        } else if (ua.platform === "iPhone") {
            platformName = "iOS";
        }

        if (platformName) {
            downloadButton = `
                <button onclick="window.location.href='/ringer/platform_detect/download'">
                    <img src='/images/services/download-dark.svg'>
                    Download For ${platformName}
                </button>
            `
        } else {
            downloadButton = `
                <span class='unsupported-platform'>Ringer is not supported on your platform</span>
            `
        }

        res.render('ringer', { navbar, footer, downloadButton });
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
            res.status(400).send("Bad platform. Accepted platforms: 'windows', 'mac_os', ios.");
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

    } else if (ua.platform === "iPhone") {
        res.redirect('https://testflight.apple.com/join/8wu1bVxU')
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
    res.redirect('/legal/privacy-policy');
})

app.get('/terms%20of%20service', (req, res) => {
    res.redirect('/legal/terms-of-service');
})

app.get('/legal/:slug', async (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');
        const slug = req.params.slug;

        // Fetch document from backend
        const documentReq = await fetch(`https://catli65q.api.sanity.io/v2025-03-11/data/query/production?query=*%5B+_type%3D%3D%27policy%27+%26%26+slug.current%3D%3D%27${slug}%27+%5D`);

        // Check if request was successful
        if (!documentReq.ok) {
            return req.status(500).send('Internal Server Error');
        }

        // Parse response
        const document = await documentReq.json();

        // Check if document exists
        if (document.result.length === 0) {
            return res.status(404).render('404', { navbar, footer });
        }

        // Render document
        const documentData = document.result[0];
        const documentContent = toHTML(documentData.content);

        res.render('policy', {
            navbar,
            footer,
            document: documentData,
            title: documentData.title,
            description: documentData.description,
            lastUpdated: documentData._updatedAt,
            document: documentContent
        });

    } catch {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/legal', async (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');

        // Fetch policies from backend
        const policiesReq = await fetch('https://catli65q.api.sanity.io/v2025-03-11/data/query/production?query=*%5B_type%3D%3D%27policy%27%5D+%7B+title%2C+slug+%7D');

        // Check if request was successful
        if (!policiesReq.ok) {
            return req.status(500).send('Internal Server Error');
        }

        // Parse response
        const policies = await policiesReq.json();
        let policiesList = "";

        // Render policies
        policies.result.forEach(policy => {
            policiesList += `<li><a href="/legal/${policy.slug.current}">${policy.title}</a></li>`;
        });

        res.render('legal', { navbar, footer, policies: policiesList });
    } catch {
        res.status(500).send('Internal Server Error');
    }
})

app.post('/api/legal/alert', async (req, res) => {
    const payload = req.body;
    
    // Get document data
    const documentName = payload.title;
    const documentSlug = payload.slug.current;

    // Get signature verification information
    const sanitySecret = process.env.SANITY_WEBHOOK_SECRET;
    const secretHeader = req.headers[SIGNATURE_HEADER_NAME];
    
    // Verify the request signature
    if (!(await isValidSignature(JSON.stringify(payload), secretHeader, sanitySecret))) {
        return res.status(401).send('Invalid signature');
    }

    // Make email request to auth server
    const response = await fetch(`${process.env.AUTH_SERVER_URL}/mail/send_all`, {
        method: "POST",
        headers: {
            subject: `Our ${documentName} Has Been Updated.`,
            accessToken: process.env.AUTH_SERVER_ACCESS_TOKEN,
        },
        body: `We have updated our ${documentName}. Your continued use of the service shall constitute your acceptance of these new terms.
        Updated Terms: https://lifplatforms.com/legal/${documentSlug}`
    });

    // Verify email request
    if (!response.ok) {
        return res.status(500).send("Internal server error");
    }

    return res.status(200).send('Webhook received successfully');
})

app.all('*', (req, res) => {
    try {
        const navbar = fs.readFileSync('components/navbar.html', 'utf8');
        const footer = fs.readFileSync('components/footer.html');
        res.status(404).render('404', { navbar, footer });
    } catch {
        res.status(500).send('Internal Server Error');
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});