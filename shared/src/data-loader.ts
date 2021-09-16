import fetch from 'isomorphic-fetch';

type FailFunc = (data: any) => void;
export type FetchFunc = {
    (input: RequestInfo, init?: RequestInit): Promise<Response>
}

export function sendRequest(url: string,
                            successFunc: (data: any) => void,
                            failFunc?: FailFunc,
                            fetchFunc?: FetchFunc,
                            init?: RequestInit): void {
    const fn = fetchFunc || fetch;
    fn(url, init)
        .then((response: any) => {
            let jsonPromise = response.json();
            if (response.ok) {
                return jsonPromise.then(successFunc);
            }
            if (failFunc) {
                return jsonPromise.then(failFunc);
            }
            console.log('fetched from url: ' + url)
        })
        .catch((error: any) => {
            if (failFunc) {
                return failFunc(error);
            }
            console.log(error + ' url: ' + url)
        });
}
