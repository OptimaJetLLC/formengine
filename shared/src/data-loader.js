import fetch from 'isomorphic-fetch'

export default function sendRequest(url, successFunc, failFunc = null,
                                    fetchFunc = null, init = null) {
    const fn = fetchFunc || fetch;
    return fn(url, init)
        .then(response => {
            let jsonPromise = response.json();
            if (response.ok) {
                return jsonPromise.then(successFunc);
            }
            if (failFunc) {
                return jsonPromise.then(failFunc);
            }
            console.log(error + ' url: ' + url)
        })
        .catch(error => {
            if (failFunc) {
                return failFunc(error);
            }
            console.log(error + ' url: ' + url)
        });
}
