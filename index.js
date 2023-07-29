require("dotenv").config();
// const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const CronJob = require("cron").CronJob;

const express = require('express');
const app = express();

app.get('/', (req, res) => {res.send('Hello World!');});


app.get('/meta',async (req, res) => {
    const response = await get({
        url: "https://api.instagram.com/oauth/authorize?client_id=160358547066273&redirect_uri=https://instapost-beta.vercel.app/meta/auth&scope=user_profile,user_media&response_type=code"
    });
    console.log(response)
});
app.get('/meta/auth/:code',async (req, res) => {
    console.log(res)
    res.send(req.query.code)

});

// app.get('/post',async (req,res) => {
//     const ig = new IgApiClient();
//     ig.state.generateDevice(process.env.IG_USERNAME);
//     await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
//     const imageBuffer = await get({
//         url: 'https://i.imgur.com/BZBHsauh.jpg',
//         encoding: null, 
//     });
//     //posting to insta
//     await ig.publish.photo({
//         file: imageBuffer,
//         caption: 'Really nice photo from the internet!', // nice caption (optional)
//     });
//     res.send('published')
// });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


module.exports = app;