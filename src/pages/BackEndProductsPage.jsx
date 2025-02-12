import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function BackEndProductsPage() {
  const [orders, setOrders] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      setIsScreenLoading(true);
      try {
        // 取得驗證token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
        // 進行驗證token
        axios.defaults.headers.common['Authorization'] = token;
        const res = await axios.get(`${BASE_URL}/api/${API_PATH}/admin/orders`);
        setOrders(res.data.orders);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert("取得產品失敗");
      } finally {
        setIsScreenLoading(false);
      }
    };
    getOrders();
  }, []);

  return (
  <>
  <div className="container">
    <table className="table align-middle">
      <thead>
        <tr>
          <th>地址</th>
          <th>Email</th>
          <th>姓名</th>
          <th>電話</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
          <td>{order.user.address}</td>
          <td>{order.user.email}</td>
          <td>{order.user.name}</td>
          <td>{order.user.tel}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {isScreenLoading && (<div
    className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(255,255,255,0.3)",
        zIndex: 999
    }}
    >
    <ClipLoader 
      color={'#000000'}
      size={30}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    </div>)
  }
  </>
  )
}