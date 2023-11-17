import { useState } from "react";
import axios from "axios";
import ProductForm from "../productForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const AddProduct = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState({
    model: "",
    price: "",
    description: "",
  });

  const createProdcuct = useMutation({
    mutationFn: async (event) => {
      event.preventDefault();
      return await axios.post(
        `http://localhost:5000/api/v1/product/`,
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
      query.invalidateQueries();
      navigate("/panel/products");
    },
    onError: (error) => {
      if (!error.response) {
        toast.error("No Response from the server");
      } else {
        error.response.data.message.forEach((msg) => {
          toast.error(msg.message);
        });
      }
    },
  });

  return (
    <>
      <ProductForm
        product={product}
        setProduct={setProduct}
        submit={createProdcuct.mutate}
        details={{
          name: "Add New Product",
          button: "Add",
        }}
      />
    </>
  );
};

export default AddProduct;
