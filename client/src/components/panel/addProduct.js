import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ProductForm from "../productForm";
import customAxios from "../../axios/customAxiosAPI";

const AddProduct = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    model: "",
    price: "",
    description: "",
  });

  const createProdcuct = useMutation({
    mutationFn: async (event) => {
      event.preventDefault();
      return await customAxios.post(
        `/product/`,
        product
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
