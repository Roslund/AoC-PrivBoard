import { Router } from 'express'
import { year, update, lastUpdated } from './leaderboard.js'


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

export default () => {
  const app = Router();

  update('2021') 
  update('2020') 

  app.get('/', (req, res) => {
    //Only update when every minute
    if (new Date().getTime() - lastUpdated >= 600000) { 
      update('2021') 
    }
  
    res.render('pages/index', { leaderboard: year['2021'], namemapping: namemapping })
  })

  app.get('/2020', (req, res) => {
    //Only update when every minute
    if (new Date().getTime() - lastUpdated >= 600000) { 
      update('2020') 
    }
  
    res.render('pages/index', { leaderboard: year['2020'], namemapping: namemapping })
  })
  
  return app
}