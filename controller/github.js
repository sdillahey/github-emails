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
        let pushevent = data.filter(event => event.type === 'PushEvent');
        let emails = [];
        let userData = [];
        pushevent.forEach(evt => {
            let evtcommits = evt.payload.commits;
            evtcommits.forEach(e => {
                email = e.author.email;
                if (!emails.includes(email)) {
                    emails.push(email);
                    userData.push({
                        name: e.author.name,
                        email: email
                    })
                }
            })
        })
        console.log(emails);
        res.render('index', {userData});
    })
}

module.exports = {
    findEmail
}