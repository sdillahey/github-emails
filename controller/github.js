const request = require('request');
const rootURL = 'https://api.github.com/';

function findEmail(req, res) {
    var options = {
        url: rootURL + `users/${req.body.username}/events`,
        headers: {
            'User-Agent': 'sdillahey',
            'Authorization': 'token ' + process.env.GITHUB_TOKEN
        }
    };
    request(options, function(err, response, body) {
        let data = JSON.parse(body);
        console.log(data);
    res.render('index');
    })
}

module.exports = {
    findEmail
}