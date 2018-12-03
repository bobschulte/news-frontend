var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          ${API_KEY};
var req = new Request(url);
fetch(req)
    .then(function(response){
        return response.json();
    }).then(console.log)

//trying to push to github
