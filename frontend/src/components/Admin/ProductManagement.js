import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Admin-css/produkadmin.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null); // State untuk id produk yang sedang diedit
  const [deleteProductId, setDeleteProductId] = useState(null); // State untuk id produk yang akan dihapus

  useEffect(() => {
    // Fetch products from Fake Store API
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleEditProduct = (productId) => {
    setEditProductId(productId);
  };

  const handleDeleteProduct = (productId) => {
    setDeleteProductId(productId);
  };

  const cancelEdit = () => {
    setEditProductId(null);
  };

  const cancelDelete = () => {
    setDeleteProductId(null);
  };

  return (
    <div className="product-management">
      <h2>Manage Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{editProductId === product.id ? <input type="text" defaultValue={product.title} /> : product.title}</td>
              <td>${product.price}</td>
              <td>
                {editProductId === product.id ? (
                  <>
                    <button className="save-btn">Save</button>
                    <button className="cancel-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEditProduct(product.id)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </button>
                  </>
                )}
                {deleteProductId === product.id && (
                  <div className="confirm-delete">
                    <p>Are you sure you want to delete this product?</p>
                    <button className="confirm-delete-btn">Confirm</button>
                    <button className="cancel-delete-btn" onClick={cancelDelete}>
                      Cancel
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
