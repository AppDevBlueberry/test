const QRCode = require('qrcode');
const express = require('express');

const app = express();
const port = 3000;

// Replace with your smart URL that redirects based on device type
const smartUrl = 'http://192.168.1.33:3000/redirect';

app.get('/qrcodeNew', (req, res) => {
    // Generate QR code
    QRCode.toDataURL(smartUrl, function (err, url) {
        if (err) {
            res.status(500).send('Error generating QR code');
            return;
        }

        // Send the QR code as an HTML response
        res.send(`
      <h1>Scan this QR Code</h1>
      <img src="${url}" alt="QR Code" />
    `);
    });
});

app.get('/redirect', (req, res) => {
    const userAgent = req.headers['user-agent'];

    if (/android/i.test(userAgent)) {
        res.redirect('https://play.google.com/store/apps/details?id=com.nextholidays.app&hl=en-IN');
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        res.redirect('https://apps.apple.com/app/next-holidays-india/id6504800054');
    } else {
        res.redirect('https://www.example.com');
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
