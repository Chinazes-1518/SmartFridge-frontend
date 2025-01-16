export function APIRequest(
    path: string,
    method: string = 'GET',
    query: any = {},
    body: any = {},
    auth: boolean = false,
): Promise<any> {
    return new Promise(async (resolve) => {
        let options: any = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        if (auth) {
            options.headers['x-token'] = `${localStorage.getItem('authToken')}`
        }

        if (method !== 'GET') {
            options.body = JSON.stringify(body)
        }

        let finalPath = import.meta.env.VITE_API_URL + path
        if (query) {
            finalPath += `?${new URLSearchParams(query)}`
        }

        await fetch(finalPath, options)
            .then(async (res) => {
                return resolve({
                    json: await res.json(),
                    status: res.status,
                })
            })
            .catch((error: Error) => {
                console.log(`ERROR: ${error.message}`)
                return resolve({
                    error: `ERROR: ${error.message}`,
                })
            })
    })
}