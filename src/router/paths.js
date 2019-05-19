/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

import LoginView from '../views/Login.vue';
import DashView from '../Dash.vue';
import DashboardView from '../views/Dashboard.vue';
import ProductsView from '../views/Products.vue';
import ProductView from '../views/Product.vue';
import OrdersView from '../views/Orders.vue';
import OrderView from '../views/Order.vue';
import InvoicesView from '../views/Invoices.vue';
import QuestionsView from '../views/Questions.vue';
import UsersView from '../views/Users.vue';


export default [
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: '/dashboard',
        // Relative to /src/views
        component: DashboardView,
      },
      {
        path: '/products',
        // Relative to /src/views
        component: ProductsView,
      },
      {
        path: '/products/new',
        // Relative to /src/views
        component: ProductView,
      },
      {
        path: '/products/:id',
        // Relative to /src/views
        component: ProductView,
      },
      {
        path: '/orders',
        // Relative to /src/views
        component: OrdersView,
      },
      {
        path: '/orders/new',
        // Relative to /src/views
        component: OrderView,
      },
      {
        path: '/orders/:id',
        // Relative to /src/views
        component: OrderView,
      },
      {
        path: '/invoices',
        // Relative to /src/views
        component: InvoicesView,
      },
      {
        path: '/questions',
        // Relative to /src/views
        component: QuestionsView,
      },
      {
        path: '/users',
        // Relative to /src/views
        component: UsersView,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    view: 'Login',
    component: LoginView,
  },
];
