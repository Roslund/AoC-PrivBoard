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

const namemapping = (id) => {
  switch (id) {
    case '382854':  return 'Anton Roslund'
    case '402019':  return 'Erik Östlund'
    case '1167042': return 'Fadi Bitar'
    case '1196812': return 'Stefan Hermansen'
    case '1186141': return 'Tobias Fendin'
    case '1159859': return 'Jonas Tano'
    case '1159859': return 'Jimmy Wimmersjö'
    case '1111749': return 'Jakob Huss'
    default: return null
  }
}

app.get('/', (req, res) => {
  if (new Date().getTime() - lastUpdated >= 600000) { updateLeaderboard() }
  console.log('Updating leaderboard')
  res.render('index', { leaderboard: leaderboard, namemapping: namemapping })
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
