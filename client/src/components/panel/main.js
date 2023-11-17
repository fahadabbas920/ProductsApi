import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Main = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    model: "",
    limit: "",
  });
  const products = useQuery({
    queryKey: ["products", { model: query.model, limit: query.limit }],
    queryFn: async ({ signal }) => {
      const data = await axios.get(
        `http://localhost:5000/api/v1/product/?model=${query.model}&limit=${query.limit}`,
        {
          headers: {
            authorization: token,
          },
          signal,
        }
      );
      return data?.data;
    },
    refetchOnWindowFocus: false,
  });

  const style = { textAlign: "center", color: "white" };

  return (
    <>
      <form className="filter-form">
        <label>
          <input
            name="model"
            type="text"
            onChange={(e) => {
              setQuery((state) => {
                return { ...state, model: e.target.value };
              });
              queryClient.removeQueries({
                queryKey: [
                  "products",
                  { model: query.model, limit: query.limit },
                ],
              });
            }}
            value={query.model}
            autoComplete="false"
          />
          Search:{" "}
        </label>
        &nbsp;&nbsp;&nbsp;
        <label>
          <input
            name="limit"
            type="number"
            onChange={(e) => {
              setQuery((state) => {
                return { ...state, limit: e.target.value };
              });
              queryClient.removeQueries({
                queryKey: [
                  "products",
                  { model: query.model, limit: query.limit },
                ],
              });
            }}
            value={query.limit}
            autoComplete="false"
          />
          Limit:{" "}
        </label>
      </form>

      {/* <div className="product"> */}
      {products?.isLoading && <h2 style={style}>Loading...</h2>}
      {products?.isError && <pre style={style}>Something went wrong...</pre>}
      {products?.data?.data?.length === 0 && (
        <h2 style={style}>No Products Found</h2>
      )}
      {products?.isSuccess &&
        products?.data?.data?.map((product) => {
          return (
            <div className="product" key={product._id}>
              <div className="product-heading">
                <h2>{product?.model}</h2>
                <span> $ {product?.price}</span>
              </div>
              <p>{product?.description}</p>
              <button
                onClick={() => {
                  navigate(`/panel/${product._id}`);
                }}
              >
                view/edit
              </button>
            </div>
          );
        })}
      {/* </div> */}
    </>
  );
};

export default Main;
