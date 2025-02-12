import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router'
import App from './FrontLayout.jsx'
import routes from './routes/index.jsx'

const router = createHashRouter(routes);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)
