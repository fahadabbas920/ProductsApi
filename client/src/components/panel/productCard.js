import "./card.css";
import { useNavigate } from "react-router-dom";
import defaultPreview from "../../assets/productFormPreview.jpg";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="grid__item">
      <div className="card">
        {product?.image ? (
          <img
            className="card__img"
            src={`http://localhost:5000/image/${product?.image}`}
            alt="Product img"
          />
        ) : (
          <img className="card__img" src={defaultPreview} alt="Product img" />
        )}
        <div className="card__content">
          <span> $ {product?.price}</span>
          <h1 className="card__header">{product?.model}</h1>
          <p className="card__text">{product?.description} </p>
          <button
            className="card__btn"
            onClick={() => {
              navigate(`/panel/${product?._id}`);
            }}
          >
            Edit / Delete <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
