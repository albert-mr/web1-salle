import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '../Views/SignUp.vue';
import WelcomePage from '../Views/WelcomePage.vue';
import LogIn from '../Views/LogIn.vue';
import SearchRanking from '../Views/SearchRanking.vue';
import GameFinder from '../Views/GameFinder.vue';
import StoreCreate from '../Views/StoreCreate.vue';
import StoreSell from '../Views/StoreSell.vue';
import StoreBuy from '../Views/StoreBuy.vue';
import MainPage from '../Views/MainPage.vue';
import Play from '../Views/PlayGame.vue';
import BackPack from '../Views/BackPack.vue';
import RankingList from '../Views/RankingList.vue';
import ListGames from '../Views/ListGames.vue';
import CreateGame from '../Views/CreateGame.vue';
import JoinGame from '../Views/JoinGame.vue';
import GridGame from '../Views/GridGame.vue';
import InfoUser from '../Views/InfoUser.vue';


const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignUp },
  { path: '/login', component: LogIn },
  { path: '/search-ranking', component: SearchRanking },
  { path: '/search-game', component: GameFinder },
  { path: '/store-create', component: StoreCreate },
  { path: '/store-sell', component: StoreSell },
  { path: '/store-buy', component: StoreBuy },
  { path: '/main', component: MainPage },
  { path: '/store-create', component: StoreCreate },
  { path: '/play', component: Play },
  { path: '/backpack', component: BackPack },
  { path: '/ranking', component: RankingList },
  { path: '/games', component: ListGames },
  { path: '/create-game', component: CreateGame },
  { path: '/join-game', component: JoinGame },
  { path: '/grid', component:  GridGame},
  { path: '/user', component: InfoUser },

  { path: '/:notFound(.*)', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
