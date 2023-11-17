import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "../productForm";
import { toast } from "react-toastify";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const Product = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState({
    model: "",
    price: "",
    description: "",
  });

  const singleproduct = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const data = await axios.get(
        `http://localhost:5000/api/v1/product/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (data.status === 200) {
        setProduct({
          model: data.data.data.model,
          price: data.data.data.price,
          description: data.data.data.description,
        });
        return {
          model: data.data.data.model,
          price: data.data.data.price,
          description: data.data.data.description,
        };
      }
    },
    refetchOnWindowFocus: false,
  });

  const updateMutation = useMutation({
    mutationFn: async (event) => {
      event.preventDefault();
      return await axios.put(
        `http://localhost:5000/api/v1/product/${id}`,
        product,
        {
          headers: {
            authorization: token,
          },
        }
      );
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
    onError: (error) => {
      error?.response?.data?.message?.forEach((msg) => {
        toast.error(msg.message);
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (event) => {
      return await axios.delete(`http://localhost:5000/api/v1/product/${id}`, {
        headers: {
          authorization: token,
        },
      });
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      navigate("/panel/products");
      query.removeQueries({ queryKey: ["products", id] });
    },
    onError: (error) => {
      toast(error?.response?.data?.message);
    },
  });

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
  }
   else if (singleproduct.isFetched && singleproduct.isSuccess) {
    return (
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
    );
  }
};

export default Product;
