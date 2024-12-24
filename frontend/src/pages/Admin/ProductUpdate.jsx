import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-hot-toast";

const AdminProductUpdate = () => {
  const params = useParams();

  // Fetching the product data
  const { data: productData, isLoading: isLoadingProduct } = useGetProductByIdQuery(params._id);
  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(productData?.description || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category?._id || "");  // Set category ID from productData
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  const navigate = useNavigate();

  // Fetching the categories list
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage, { isLoading: isUploading }] = useUploadProductImageMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // Use effect to populate the form fields after productData is fetched
  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id || "");  // Ensure category is set from fetched data
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure category is selected
    if (!category) {
      toast.error("Please select a category");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error.message || "Product update failed");
      } else {
        toast.success("Product successfully updated");
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" has been deleted.`);
      navigate("/admin/allproductslist");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed. Try again.");
    }
  };

  if (isLoadingProduct) return <div>Loading...</div>;

  return (
    <div className="container mx-auto text-white product-update">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Update / Delete Product</div>

          {image && (
            <div className="text-center mb-4">
              <img src={image} alt="product" className="mx-auto max-w-full h-auto" />
            </div>
          )}

          <div className="mb-3">
            <label className="text-white py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold">
              {image ? "Change image" : "Upload image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="text-white hidden"
              />
            </label>
          </div>

          <div className="p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="w-full">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="w-full">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="w-full">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="my-5">
                Description
              </label>
              <textarea
                type="text"
                className="p-4 mb-3 bg-[#101011] border rounded-lg w-full text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full">
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  type="number"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="w-full">
                <label htmlFor="category">Category</label>
                <select
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-5">
              <button
                onClick={handleSubmit}
                className="py-4 px-10 rounded-lg text-lg font-bold bg-green-600 flex-1"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
              <button
                onClick={handleDelete}
                className="py-4 px-10 rounded-lg text-lg font-bold bg-pink-600 flex-1"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
