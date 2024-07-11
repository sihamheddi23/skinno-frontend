import { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import { useAppSelector } from "../store";
import Form from "../components/admin/Form";
import Input from "../components/admin/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../components/generics/SubmitButton";
import TextArea from "../components/admin/TextArea";
import { BASE_URL } from "../api/axiosConfig";
import { alertError, alertSuccess } from "../utils/toasts";
import { useNavigate, useParams } from "react-router-dom";
import GeneralAdminUI from "../components/admin/GeneralAdminUI";

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("name field is required").min(4).max(45),
  description: Yup.string()
    .required("description field is required")
    .min(62)
    .max(400),
  ingredients: Yup.string()
    .required("ingredients field is required")
    .min(74)
    .max(400),
  how_to_use: Yup.string()
    .required("how_to_use field is required")
    .min(56)
    .max(400),
  quantity: Yup.number().required("quantity field is required"),
  price: Yup.number().required("price field is required"),
});

const AddOrUpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const themeState = useAppSelector((state) => state.theme);
  const userState = useAppSelector((state) => state.user);
  const [product_image, setoroduct_image] = useState<File | undefined>(
    undefined
  );
  const formik = useFormik({
    initialValues: {
    name: "",
    description: "",
    ingredients: "",
    how_to_use: "",
    quantity: 1,
    price: 1.1,
  },
    onSubmit: (values) => {
      const input: any = {
        ...values,
        image: product_image,
        token: userState.user.token,
      };
      const form = new FormData();
      
      form.append("name", input.name);
      form.append("description", input.description);
      form.append("ingredients", input.ingredients);
      form.append("how_to_use", input.how_to_use);
      form.append("quantity", input.quantity.toString());
      form.append("price", input.price.toString());
      form.append("image", input.image);

      if (params.id) {
        fetch(`${BASE_URL}/products/${params.id}`, {
          method: "PUT",
          body: form,
          headers: {
            Authorization: `Bearer ${userState.user.token}`,
          },
        })
          .then((response) => response.json())
          .then(() => {
            alertSuccess("Product has been updated successfully");
            navigate('/dashboard/products')
          })
          .catch((error) => {
            console.log(error);
            alertError('error updating product');
          });
      } else {
        fetch(`${BASE_URL}/products`, {
          method: "POST",
          body: form,
          headers: {
            Authorization: `Bearer ${userState.user.token}`,
          },
        })
          .then((response) => response.json())
          .then(() => {
            alertSuccess("Product has been added successfully");  
            navigate('/dashboard/products')
          })
          .catch((error) => {
            if (error.response.status === 400) {
              alertError(error.response.data.error);
            }
            console.log(error);
            alertError('error adding product');
          });
      }
    },
    validationSchema: ProductSchema,
  });

  useEffect(() => {
    if (params.id) {
      fetch(`${BASE_URL}/products/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userState.user.token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          formik.setValues(data.product);
        })
        .catch((error) => {
          console.log(error);
          alertError('error fetching product');
        });
    }
  }, [])
  

  return (
   
     <GeneralAdminUI>
        <Form title={params.id ? "Update Product" : "Add Product"} onSubmit={formik.handleSubmit}>
          <Input
            theme={themeState.theme}
            labelText="Product Name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter your product name"
            id="name"
            errors={formik.errors.name}
          />

          <TextArea
            theme={themeState.theme}
            name="ingredients"
            labelText="Product ingredients"
            value={formik.values.ingredients}
            onChange={formik.handleChange}
            placeholder="Enter your product ingredients"
            id="ingredients"
            errors={formik.errors.ingredients}
            maxLength={400}
          />
          <TextArea
            theme={themeState.theme}
            name="how_to_use"
            labelText="how to use this product"
            value={formik.values.how_to_use}
            onChange={formik.handleChange}
            placeholder=" Enter how to use this product"
            id="how_to_use"
            errors={formik.errors.how_to_use}
            maxLength={400}
          />
          <TextArea
            theme={themeState.theme}
            name="description"
            labelText="Product Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Enter your product description"
            id="description"
            errors={formik.errors.description}
            maxLength={400}
          />
          <Input
            theme={themeState.theme}
            labelText="Product Price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            placeholder="Enter your product price"
            id="price"
            errors={formik.errors.price}
            step={0.01}
          />

          <Input
            theme={themeState.theme}
            labelText="Product Quantity"
            type="number"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            placeholder="Enter your product quantity"
            id="quantity"
            errors={formik.errors.quantity}
          />

          <Input
            theme={themeState.theme}
            labelText="product image"
            type="file"
            id="image"
            onChange={(e) => {
              setoroduct_image(e.target.files[0]);
            }}
            placeholder="Enter your product image"
          />
          <SubmitButton name={params.id ? "Update" : "Add"} />
        </Form>
  </GeneralAdminUI>
  );
};

export default AddOrUpdateProduct;
