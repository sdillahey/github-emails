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
        // to handle invalid username submission
        if (data.message === 'Not Found') {
           return res.render('index', {error: true});
        }
        let pushevent = data.filter(event => event.type === 'PushEvent');
        //emails is used as a counter to avoid duplicate email addresses
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
                    });
                };
            });
        });
        res.render('index', {userData, error: false});
    });
};

module.exports = {
    findEmail
}