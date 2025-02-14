import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductDetailPage() {
  const [product, setProducts] = useState([]);
  const [qtySelect, setQtySelect] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const { id: product_id } = useParams(); //重新命名為product_id

  const addCartItem = async (product_id, qty) => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/${API_PATH}/cart`, {
        data: {
          product_id, 
          qty: Number(qty)
        }
      });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('加入購物車失敗');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      setIsScreenLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/${API_PATH}/product/${product_id}`);
        console.log(res);
        setProducts(res.data.product);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert("取得產品失敗");
      } finally {
        setIsScreenLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
  <div className="container mt-5">
    <div className="row">
      <div className="col-6">
        <img className="img-fluid" src={product.imageUrl} alt={product.title} />
      </div>
      <div className="col-6">
        <div className="d-flex align-items-center gap-2">
          <h2>{product.title}</h2>
          <span className="badge text-bg-success">{product.category}</span>
        </div>
        <p className="mb-3">{product.description}</p>
        <p className="mb-3">{product.content}</p>
        <h5 className="mb-3">NT$ {product.price}</h5>
        <div className="input-group align-items-center w-75">
          <select
            value={qtySelect}
            onChange={(e) => setQtySelect(e.target.value)}
            id="qtySelect"
            className="form-select"
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <button disabled={isLoading} type="button" className="btn btn-primary" onClick={() => addCartItem(product.id, qtySelect)}>
          加入購物車
          {isLoading && <ClipLoader 
            color={'#000000'}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
            />
          }
          </button>
        </div>
      </div>
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
  </div>
  )
}