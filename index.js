const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();


app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.get('/meta', (req, res) => {
    fetch("https://api.instagram.com/oauth/authorize?client_id=160358547066273&redirect_uri=https://instapost-beta.vercel.app/meta/auth&scope=user_profile,user_media&response_type=code")
    .then(response => response.json())
    .then(data => {
    console.log(data);
    })
    .catch(error => {
    console.error(error);
    });
});
app.get('/meta/auth', (req, res) => {
   res.send("done");
});


const port = 3000; // or any other port number you prefer
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});