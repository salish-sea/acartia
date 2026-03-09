import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Pages/LoginPage'
import Dashboard from './components/Pages/DashboardPage'
import ManageData from './components/Pages/DataPage'
import Register from './components/Pages/RegisterPage'
import ManageUsers from './components/Pages/ApprovalsPage'
import Visualiser from './components/Pages/VisualiserPage'
import Heatmap from './components/Pages/HeatmapPage'
import Partners from './components/Pages/PartnersPage.vue'
import About from './components/Pages/AboutPage'
import Home from './components/Pages/HomePage'
import ResetPassword from './components/Pages/ResetPassword'
import ForgotPassword from './components/Pages/ForgotPassword'
import Profile from './components/Pages/ProfilePage.vue';
import Reports from './components/Pages/ReportsPage.vue';
import Contributions from './components/Pages/ContributionPage'
import Contribute from './components/Pages/ContributePage'
import Upload from './components/Pages/UploadPage'
import ContactUs from './components/Pages/ContactPage'
import ExportData from './components/Pages/ExportPage'
import AccountSettings from './components/Pages/ProfileComponents/AccountSettings.vue'
import ActiveTokens from './components/Pages/ProfileComponents/ActiveTokens.vue'
import YourContributions from './components/Pages/ProfileComponents/Contributions.vue'
import DeleteAccount from './components/Pages/ProfileComponents/DeleteAccount.vue'
import store from './store'

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes: [
    {
      // Reroutes to login by default upon render
      path: '/',
      meta: {
        title: 'Acartia',
        metaTags: [
          {
            name: 'Acartia',
            content: "A decentralized data cooperative for sharing marine animal locations within the Salish Sea. Let’s work together to monitor and map marine wildlife -- from plankton to orcas!"
          }
        ]
      },
      redirect: {
        name: 'Home'
      }
    },
    {
      path: '/profile/:section',
      name: 'Profile',
      component: Profile,
      props: true,
      beforeEnter: (to, from, next) => {
        let hasToken = sessionStorage.getItem('userToken');
        let isAuthenticated = store.state.isAuthenticated === true;
        if (isAuthenticated && hasToken) {
          next();
        } else {
          next('/login'); // Redirect to login if not authenticated
        }
      }
    },
    {
      // Login page
      path: '/home',
      name: 'Home',
      meta: {
        title: 'Acartia',
        metaTags: [
          {
            name: 'Acartia',
            content: "A decentralized data cooperative for sharing marine animal locations within the Salish Sea. Let’s work together to monitor and map marine wildlife -- from plankton to orcas!"
          }
        ]
      },
      component: Home
    },
    {
      // Login page
      path: '/login',
      name: 'Login',
      meta: {
        title: 'Acartia',
        metaTags: [
          {
            name: 'Acartia',
            content: "A decentralized data cooperative for sharing marine animal locations within the Salish Sea. Let’s work together to monitor and map marine wildlife -- from plankton to orcas!"
          }
        ]
      },
      component: Login,
      beforeEnter: (to, from, next) => {
        let hasToken = sessionStorage.getItem('userToken')
        let isAuthenticated = store.state.isAuthenticated === true
        let isLegitUser = store.state.token != null

        if (isAuthenticated && isLegitUser && hasToken) {
          next('/data-explorer')
        } else {
          next()
        }
      }
    },
    {
      // Dashboard page for users to claim tokens
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        let hasToken = sessionStorage.getItem('userToken')
        let isRestricted = store.state.isAuthenticated === false
        let isLegitUser = store.state.token != null

        if (isRestricted && !isLegitUser && !hasToken) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      // Register page to create new users - admin only
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      // Register page to create new users - admin only
      path: '/reports',
      name: 'Reports',
      component: Reports
    },
    {
      // Register page to create new users - admin only
      path: '/about',
      name: 'About',
      component: About
    },
    {
      // Integration Guide - page explaining how to add and retrieve data from Acartia in your app
      path: '/integrate',
      name: 'Integrating with Acartia',
      component: Contributions
    },
    {
      // Manage Users page to confirm user registration
      path: '/manage-users',
      name: 'ManageUsers',
      component: ManageUsers,
      beforeEnter: (to, from, next) => {
        let hasToken = sessionStorage.getItem('userToken')
        let isRestricted = store.state.isAuthenticated === false
        let isLegitUser = store.state.token != null
        let isAdmin = store.state.isAdmin === true
        if (isRestricted && !isLegitUser && !hasToken) {
          next('/login')
        }
        else if (!isAdmin) {
          next('/data-explorer')
        }
        else {
          next()
        }
      }
    },
    {
      // Visualiser page to view data visualisations
      path: '/data-explorer',
      name: 'DataExplorer',
      component: Visualiser
    },
    {
      // Visualiser page to view data visualisations
      path: '/heatmap',
      name: 'Heatmap',
      component: Heatmap
    },
    {
      // Data import and export page
      path: '/manage-data',
      name: 'ManageData',
      component: ManageData
    },
    {
      //Partners page
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword,
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      // Data import and export page
      path: '/partners',
      name: 'Partners',
      component: Partners
    },
    {
      //Contribute page
      path: '/contribute',
      name: 'Contribute',
      component: Contribute
    },
    {
      //Upload page
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      //Contact us page
      path: '/contact-us',
      name: 'ContactUs',
      component: ContactUs
    },
    {
      path: '/export',
      name: 'ExportData',
      component: ExportData
    },
    {
      path: '/account-settings',
      name: 'AccountSettings',
      component: AccountSettings
    },
    {
      path: '/active-tokens',
      name: 'ActiveTokens',
      component: ActiveTokens
    },
    {
      path: '/your-contributions',
      name: 'YourContributions',
      component: YourContributions
    },
    {
      path: '/delete-account',
      name: 'DeleteAccount',
      component: DeleteAccount
    },
  ]
})

export default router
