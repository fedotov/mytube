const http = require('https');
const express = require('express');
const cors = require('cors');

const url = 'https://content.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyBE8tI0Fcn-SYoAbi7ZQERtCLa3mhN1xiI&q=';

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        if (origin.startsWith('http://localhost:4200')) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.get('/search', cors(corsOptions), async (req, res) => {
    console.log(req.query.q);

    let data = await new Promise((resolve, reject) => {
        http.get(url + encodeURIComponent(req.query.q), (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
            }
            if (error) {
                reject(error);
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    reject(e.message);
                }
            });
        });
    });


    data = data.items.map((item) => {
        return {
            id: item.id.videoId,
            name: decodeURIComponent(item.snippet.title),
            icon: item.snippet.thumbnails.default.url
        }
    });

    res.json(data);
});

app.listen(3500, () => console.log('started'));
