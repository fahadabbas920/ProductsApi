import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import customAxios from "../../axios/customAxiosAPI";

const Main = () => {
  const queryClient = useQueryClient();
  // const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    model: "",
    limit: "",
  });
  const products = useQuery({
    queryKey: ["products", { model: query.model, limit: query.limit }],
    queryFn: async ({ signal }) => {
      const data = await customAxios.get(
        `/product/?model=${query.model}&limit=${query.limit}`,
        {
          // headers: {
          //   authorization: token,
          // },
          signal,
        }
      );
      return data?.data;
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });
  const style = { textAlign: "center", color: "white" };

  // useEffect(() => {
  //   if (products?.error?.response?.status === 440) {
  //     queryClient.clear();
  //     navigate("/unauthorized");
  //   }
  // });
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
      {products.isFetching && <h2 style={style}>Loading...</h2>}
      {products.isError && !products.isFetching && (
        <pre style={style}>Something went wrong...</pre>
      )}
      {products.isFetched &&
      !products.isFetching &&
      products.isSuccess &&
      !!products?.data?.data?.length
        ? products?.data?.data?.map((product) => {
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
          })
        : products.isFetched &&
          !products.isFetching &&
          products.isSuccess &&
          products?.data?.data?.length === 0 &&
          !products.isLoading && <h2 style={style}>No Products Found</h2>}
    </>
  );
};

export default Main;
