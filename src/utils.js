const configureTitle = function () {
  return this.title
    .split(" - ")
    .reverse()
    .join(" - ");
}

const ajax = function (root, api_key) {
  return {
    get(path) {
      if (api_key) {
        return fetch(`${root}${path}`, {
          headers: {
            authorization: `Bearer ${API_KEY}`
          }
        }).then(resp => resp.json());
      } else {
        return fetch(`${root}${path}`)
          .then(resp => resp.json());
      }
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