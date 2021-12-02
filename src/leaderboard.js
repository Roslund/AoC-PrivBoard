import https from 'https'

export let year = {}
let lastUpdated = {}



export function update(foryear) {
  if (lastUpdated[foryear] == null || new Date().getTime() - lastUpdated >= 600000) {
    let cookie = "session="+process.env.SESSIONCOOKIE; 

    const options = {
      hostname: 'adventofcode.com',
      port: 443,
      path: `/${foryear}/leaderboard/private/view/402019.json`,
      method: 'GET',
      headers: {'Cookie': cookie}
    }

    var results = '';

    var req = https.request(options, function(res) {
      res.on('data', function (chunk) {
        results = results + chunk;
      }); 
      res.on('end', function () {
        console.log(results)
        year[foryear] = JSON.parse(results)
      }); 
    });

    req.on('error', function(e) {
      console.log('Something went wrong...')
      console.log(e)
    });

    req.end()
    lastUpdated[foryear] = Date.now()
  }
}