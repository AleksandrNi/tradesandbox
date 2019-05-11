import Home from './components/home/Home'
import Portfolio from './components/portfolio/Portfolio'
import Favorite from './components/favorite/Favorite'
import Stocks from './components/stocks/Stocks'
import CompanyPage from './components/page/Page'

import Signin from './components/registration/Signin'
import Signup from './components/registration/Signup'

import Profile from './components/profile/Profile'

export const routes = [
  {path:'/', name:'home', component: Home},
  {path:'/company/:ticker', name:'companyPage', component: CompanyPage},
  {path:'/portfolio', name:'portfolio', component: Portfolio},
  {path:'/favorite', name:'favorite', component: Favorite},
  {path:'/stocks', name:'stocks', component: Stocks},
  {path:'/signin', name:'signin', component: Signin},
  {path:'/signup', name:'signup', component: Signup},
  {path:'/profile', name:'profile', component: Profile},
]
