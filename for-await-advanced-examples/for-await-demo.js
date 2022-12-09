// run "npm install node-fetch" if NodeJs version < 18
import fetch from 'node-fetch';

(async () => {

    let count = 0;

    for await (const repo of fetchRepos('javascript')) {

        console.log(count + 1, repo.full_name);

        if (++count == 50) { // stop at 50 repos
            break;
        }
    }
})();

async function* fetchRepos(repo) {
    let url = `https://api.github.com/search/repositories?q=${repo}`;

    while (url) {
        const response = await fetch(url, {
            headers: {'User-Agent': 'Custom Script'},
        });

        const body = await response.json(); // (array of repos)

        let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
        nextPage = nextPage?.[1];
        url = nextPage;

        for(let repo of body.items) { // yield repos one by one, until the page ends
            yield repo;
        }
    }
}