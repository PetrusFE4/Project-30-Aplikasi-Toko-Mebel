// AdminDashboard.js

import React, { useState, useEffect } from "react";
import "../../css/AdminManagement.css";
import logo from "../../images/logo.png"; // Ganti path dengan path sesuai logo Anda

// Import komponen-komponen untuk Product Management dan lainnya
import ProductManagement from "./ProductManagement";
import CategoryManagement from "./CategoryManagement";
import OrderManagement from "./OrderManagement";
import UserManagement from "./UserManagement";
import {
  fetchAllUsers,
  fetchProducts,
  fetchCategories, // Import fetchCategories function
} from "./HandleAPI_Admin";
const AdminDashboard = () => {
  const [activeContent, setActiveContent] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        const categoriesData = await fetchCategories(); // Fetch categories
        const allUsersData = await fetchAllUsers();
        setTotalProducts(productsData.length);
        setTotalCategories(categoriesData.length); // Assuming categories are in payload[0]
        setTotalUsers(allUsersData.length);
      } catch (error) {
        console.error("Error fetching data product & category", error);
      }
    };
    fetchData();
  }, []);

  const showProductManagement = () => {
    setActiveContent(<ProductManagement />);
  };

  const showCategoryManagement = () => {
    setActiveContent(<CategoryManagement />);
  };

  const showOrderManagement = () => {
    setActiveContent(<OrderManagement />);
  };

  const showUserManagement = () => {
    setActiveContent(<UserManagement />);
  };

  const hideActiveContent = () => {
    setActiveContent(null);
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <h1>Admin Dashboard</h1>
        </div>
        <hr className="sidebar-divider" /> {/* Garis pemisah */}
        <div className="admin-links">
          <button onClick={showProductManagement}>
            <i className="fas fa-box"></i> Manage Products
          </button>
          <button onClick={showCategoryManagement}>
            <i className="fas fa-tags"></i> Manage Categories
          </button>
          <button onClick={showOrderManagement}>
            <i className="fas fa-shopping-cart"></i> Manage Orders
          </button>
          <button onClick={showUserManagement}>
            <i className="fas fa-users"></i> Manage Users
          </button>

          {/* Tambahkan tautan lainnya di sini */}
        </div>
      </div>
      <div className="admin-content">
        <div className="dashboard-cards">
          {/* Card untuk jumlah produk */}
          <div className="dashboard-card">
            <h2>Total Products</h2>
            <p>{totalProducts}</p>
          </div>
          {/* Card untuk jumlah kategori */}
          <div className="dashboard-card">
            <h2>Total Categories</h2>
            <p>{totalCategories}</p>
          </div>
          {/* Card untuk jumlah pengguna */}
          <div className="dashboard-card">
            <h2>Total Users</h2>
            <p>{totalUsers}</p>
          </div>
        </div>

        {/* Tampilkan konten aktif di sini */}
        {activeContent}
      </div>
    </div>
  );
};

export default AdminDashboard;
