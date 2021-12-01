import https from 'https'

export let year = {}
export let lastUpdated = 0

export function update(foryear) {
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
      year[foryear] = JSON.parse(results)
    }); 
  });

  req.on('error', function(e) {
    console.log('Something went wrong...')
    console.log(e)
  });

  req.end()
  lastUpdated = Date.now()
}