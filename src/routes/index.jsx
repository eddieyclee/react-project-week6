import FrontLayout from "../FrontLayout"
import HomePage from "../pages/HomePage"
import ProductsPage from "../pages/ProductsPage"
import ProductDetailPage from "../pages/ProductDetailPage"
import CartPage from "../pages/CartPage"
import NotFound from "../pages/NotFound"
import BackEndProductsPage from "../pages/BackEndProductsPage"
import LoginPage from "../pages/LoginPage"
import BackEndLayout from "../BackEndLayout"

const routes = [
  {
    path: '/',
    element: <FrontLayout/>,
    children: [
      {
       path: '',
       element: <HomePage/>
      },
      {
        path: 'products',
        element: <ProductsPage/>
      },
      {
        path: 'product/:id',
        element: <ProductDetailPage/>
      },
      {
        path: 'cart',
        element: <CartPage/>
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/backend',
    element: <BackEndLayout/>,
    children: [
      {
        path: '',
        element: <BackEndProductsPage/>
      }
    ]
  }
]

export default routes