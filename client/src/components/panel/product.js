import { toast } from "react-toastify";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import ProductForm from "../productForm";
import customAxios from "../../axios/customAxiosAPI";

const Product = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    model: "",
    price: "",
    description: "",
  });

  const singleproduct = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const data = await customAxios.get(`/product/${id}`);
      if (data.status === 200) {
        setProduct({
          model: data.data.data.model,
          price: data.data.data.price,
          description: data.data.data.description,
          image: data.data.data.image,
        });
        return {
          model: data.data.data.model,
          price: data.data.data.price,
          description: data.data.data.description,
          image: data.data.data.image,
        };
      }
    },
    retry: 0,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });

  const updateMutation = useMutation({
    mutationFn: async (event) => {
      var form_data = new FormData();
      for (var key in product) {
        form_data.append(key, product[key]);
      }
      event.preventDefault();
      return await customAxios.put(`/product/${id}`, form_data);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
    onError: (error) => {
      error?.response?.data?.message?.forEach((msg) => {
        toast.error(msg.message);
      });
    },
    // refetchOnMount: false,
  });

  const deleteMutation = useMutation({
    mutationFn: async (event) => {
      return await customAxios.delete(`/product/${id}`);
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      navigate("/panel/products");
      query.removeQueries({ queryKey: ["products", id] });
    },
    onError: (error) => {
      toast(error?.response?.data?.message);
    },
    // refetchOnMount: false,
  });
  // deleteMutation.isPending
  if (singleproduct.isFetching) {
    return (
      <div className="product" style={{ textAlign: "center" }}>
        <h2>Loading...</h2>
      </div>
    );
  } else if (singleproduct.isError) {
    return (
      <div className="product" style={{ textAlign: "center" }}>
        <pre>Error something went wrong...</pre>
      </div>
    );
  } else if (singleproduct.isFetched && singleproduct.isSuccess) {
    return (
      <div className="product-page">
        <ProductForm
          product={product}
          setProduct={setProduct}
          submit={updateMutation.mutate}
          details={{
            name: "Product details",
            button: "Save",
          }}
          handleDelete={deleteMutation.mutate}
        />
      </div>
    );
  }
};

export default Product;
