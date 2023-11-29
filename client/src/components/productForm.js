import preview from "../assets/productFormPreview.jpg";

const ProductForm = ({
  product,
  setProduct,
  submit,
  details,
  handleDelete,
}) => {
  return (
    <>
      <form>
        <h3>{details.name}</h3>
        <label>
          Model:
          <input
            name="model"
            type="text"
            onChange={(e) => {
              setProduct((state) => {
                return { ...state, model: e.target.value };
              });
            }}
            value={product.model}
            autoComplete="false"
          />
        </label>

        <label>
          Price:{" "}
          <input
            name="price"
            type="number"
            min="0"
            max="500"
            onChange={(e) => {
              setProduct((state) => {
                return { ...state, price: e.target.value };
              });
            }}
            value={product.price}
            autoComplete="false"
          />
        </label>

        <label>
          Description:{" "}
          <input
            name="description"
            type="text"
            onChange={(e) => {
              setProduct((state) => {
                return { ...state, description: e.target.value };
              });
            }}
            value={product.description}
            autoComplete="false"
          />
        </label>
        <label>
          Upload Image:
          {product.image === null ? (
            <img src={preview} alt="" />
          ) : product.image?.slice(0, 5) === "image" ? (
            <img src={`http://localhost:5000/image/${product?.image}`} alt="" />
          ) : (
            <img src={URL.createObjectURL(product.image)} alt="" />
          )}
          <input
            type="file"
            onChange={(e) => {
              setProduct((state) => {
                return { ...state, image: e.target.files[0] };
              });
            }}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </label>
        {/* {submit.} */}
        <button onClick={submit}>{details.button}</button>
        {details.button === "Save" && (
          <button onClick={handleDelete}>Delete</button>
        )}
        <div>
          <pre></pre>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
