import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import customAxios from "../../axios/customAxiosAPI";
import ProductCard from "./productCard";

const Main = () => {
  const queryClient = useQueryClient();
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
          signal,
        }
      );
      return data?.data;
    },
    retry: 0,
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
      {products.isFetching && <h2 style={style}>Loading...</h2>}
      {products.isError && !products.isFetching && (
        <pre style={style}>Something went wrong...</pre>
      )}
      <div className="grid">
        {products.isFetched &&
        !products.isFetching &&
        products.isSuccess &&
        !!products?.data?.data?.length
          ? products?.data?.data?.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })
          : products.isFetched &&
            products.isSuccess &&
            products?.data?.data?.length === 0 &&
            !products.isFetching &&
            !products.isLoading && <h2 style={style}>No Products Found</h2>}
      </div>
    </>
  );
};

export default Main;
