import { Router } from 'express'
import { year, update  } from './leaderboard.js'


const namemapping = (id) => {
  switch (id) {
    case 402019:  return 'Erik Östlund'
    case 1167042: return 'Fadi Bitar'
    case 1196812: return 'Stefan Hermansen'
    case 1186141: return 'Tobias Fendin'
    case 382854:  return 'Anton Roslund'
    case 1159859: return 'Jonas Tano'
    case 1159859: return 'Jimmy Wimmersjö'
    case 1111749: return 'Jakob Huss'
    case 1554332: return 'Jan-Erik Kitok'
    case 2462965: return 'David Hyckenberg mattsson'
    case 2438985: return 'Mohammad Nori'
    default: return null
  }
}

export default () => {
  const app = Router();


  app.get('/', (req, res) => {
    update('2022') 
    res.render('pages/index', { leaderboard: year['2022'], namemapping: namemapping })
  })

  app.get('2021', (req, res) => {
    update('2021') 
    res.render('pages/index', { leaderboard: year['2021'], namemapping: namemapping })
  })

  app.get('/2020', (req, res) => {
    update('2020') 
    res.render('pages/index', { leaderboard: year['2020'], namemapping: namemapping })
  })

  app.get('/2019', (req, res) => {
    update('2019') 
    res.render('pages/index', { leaderboard: year['2019'], namemapping: namemapping })
  })

  app.get('/2018', (req, res) => {
    update('2018') 
    res.render('pages/index', { leaderboard: year['2018'], namemapping: namemapping })
  })
  
  return app
}

