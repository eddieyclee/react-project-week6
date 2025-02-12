import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Outlet } from 'react-router';

const routes = [
  { path: "/backend", name: "後台訂單列表" }
];

export default function BackEndLayout() {
  return (
    <>
    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
    <div className="container">
        <ul className="navbar-nav flex-row gap-5 fs-5">
        {routes.map((router) => {
          return (
          <li key={router.path} className="nav-item">
          <NavLink className="nav-link" aria-current="page" to={router.path}>{router.name}</NavLink>
          </li>)
        })}
        </ul>
    </div>
    </nav>
    <Outlet/>
    </>
  )
}