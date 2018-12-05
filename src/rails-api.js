const railsServer = railsAjax("http://localhost:3000/api/v1")

let stories
let comments



const railsAjax = function (root) {
    return {
        get(path) {
            return fetch(`${root}${path}`)
                .then(resp => resp.json())
        },
        patch(path, body) {
            return fetch(`${root}${path}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(resp => resp.json())
        },
        post(path, body) {
            return fetch(`${root}${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(resp => resp.json())
        },
        delete(path) {
            return fetch(`${root}${path}`, { method: 'DELETE' })
                .then(resp => resp.json())
        }
    }
}