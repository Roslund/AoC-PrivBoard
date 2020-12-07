const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const https = require('https')

let leaderboard = {}
let lastUpdated = 0

function updateLeaderboard() {
    console.log("update called")
  let cookie = "session="+process.env.SESSIONCOOKIE; 

  const options = {
    hostname: 'adventofcode.com',
    port: 443,
    path: '/2020/leaderboard/private/view/402019.json',
    method: 'GET',
    headers: {'Cookie': cookie}
  }

  var results = ''; 
  var req = https.request(options, function(res) {
    res.on('data', function (chunk) {
      results = results + chunk;
    }); 
    res.on('end', function () {
      leaderboard = JSON.parse(results)
    }); 
  });

  req.on('error', function(e) {
    console.log('Something went wrong...')
    console.log(e)
  });

  req.end()
  lastUpdated = Date.now()
}

updateLeaderboard();

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  if (new Date().getTime() - lastUpdated >= 600000) { updateLeaderboard() }
  console.log('Updating leaderboard')
  res.render('pages/index', { leaderboard: leaderboard })
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
