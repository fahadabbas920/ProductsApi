const ProductForm = ({
  product,
  setProduct,
  submit,
  details,
  handleDelete,
}) => {
  //   console.log(product);
  return (
    <form onSubmit={submit}>
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
          // initialvalues={product.model}
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
      <button onClick={submit}>{details.button}</button>
      {details.button === "Save" && (
        <button onClick={handleDelete}>Delete</button>
      )}
      <div>
        <pre>
          {/* {details.description} <Link to={details.link}>{details.linkto}</Link> */}
        </pre>
      </div>
    </form>
  );
};

export default ProductForm;
