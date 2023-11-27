import "./card.css";
import { useNavigate } from "react-router-dom";
import defaultPreview from "../../assets/productFormPreview.jpg";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  console.log(product);
  return (
    <div class="grid__item">
      <div class="card">
        {product?.image ? (
          <img
            class="card__img"
            //   src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2250&amp;q=80"
            src={`http://localhost:5000/image/${product?.image}`}
            alt="Product img"
          />
        ) : (
          <img class="card__img" src={defaultPreview} alt="Product img" />
        )}
        <div class="card__content">
          <span> $ {product?.price}</span>
          <h1 class="card__header">{product?.model}</h1>
          <p class="card__text">{product?.description} </p>
          <button
            class="card__btn"
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
