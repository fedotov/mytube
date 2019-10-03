const http = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const url = 'https://content.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyBE8tI0Fcn-SYoAbi7ZQERtCLa3mhN1xiI&q=';

const app = express();

const corsMiddleware = cors({
    origin: function (origin, callback) {
        if (origin.startsWith('http://localhost:4200')) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
});

const watchHistory = [];

app.use(corsMiddleware);
app.use(bodyParser.json());

app.get('/video/search/:id', async (req, res) => {
    // console.log(req.params.id);

    let data = await new Promise((resolve, reject) => {
        http.get(url + encodeURIComponent(req.params.id), (res) => {
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
            videoId: item.id.videoId,
            name: decodeURIComponent(item.snippet.title),
            icon: item.snippet.thumbnails.default.url
        }
    });

    res.json(data);
});

app.post('/video/history', (req, res) => {
    req.body.id = Math.ceil(Math.random() * 1000000);
    console.log('create', req.body.id);
    watchHistory.unshift(req.body);
    res.json({status: 'ok'});
});

app.get('/video/history', async (req, res) => {
    res.json(watchHistory);
});

app.delete('/video/history/:id', async (req, res) => {
    const id = Number(req.params.id);
    console.log('delete', id);
    const index = watchHistory.findIndex((item) => item.id === id);
    if (index > -1) {
        watchHistory.splice(index, 1);
    }
    res.json(watchHistory);
});

app.listen(3500, () => console.log('started'));
