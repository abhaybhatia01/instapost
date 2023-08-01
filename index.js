const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.get('/meta', (req, res) => {
    res.send('<a href="https://api.instagram.com/oauth/authorize?client_id=160358547066273&redirect_uri=https://instapost-beta.vercel.app/meta/auth&scope=user_profile,user_media&response_type=code">insta auth</a>')
});

app.get('/meta/auth', async (req, res) => {
    const {code} = req.query;
    const correctCode = code.split("#")[0]
    console.log(correctCode)


      const url = `https://api.instagram.com/oauth/access_token`;
      const form = {
        'client_id': '160358547066273',
        'client_secret': '48a9a0f67bc6a07fda26f99838a262df',
        'grant_type': 'authorization_code',
        'redirect_uri': 'https://instapost-beta.vercel.app/meta/auth',
        'code': correctCode
      }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        res.send({data,body,headers})
    })
    .catch(error => {
        res.send(error)
        console.error(error);
    });
});


const port = 3000; // or any other port number you prefer
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});