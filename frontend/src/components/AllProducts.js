import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTopButton from "./BackToTopButton";
import { useCart } from "../components/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSackDollar,
  faThumbsUp,
  faHandshake,
  faMedal,
  faCircleCheck,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../css/AllProduct.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = (category = "") => {
    let url = "https://fakestoreapi.com/products";
    if (category) {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const fetchCategories = () => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    fetchProducts(category);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Navbar />
      <div className="container-allproduct">
        <div className="row align-items-start">
          <div className="col-12">
            <h1 className="my-4">All Products</h1>
          </div>
          <div className="col-md-2">
            <div className="card-category">
              <div className="card-header">Category</div>
              <ul className="list-group list-group-flush">
                <li
                  className={`list-group-item ${
                    selectedCategory === "" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("")}
                >
                  All Products
                </li>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className={`list-group-item ${
                      selectedCategory === category ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-10">
            <section id="all-products" className="all-products-section">
              <div id="our-products" className="our-products-section">
                <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-4">
                  {currentProducts.map((product) => (
                    <div className="col" key={product.id}>
                      <div className="card card-product">
                        <div className="card-body">
                          <div className="text-center position-relative">
                            <Link to={`/product/${product.id}`}>
                              <img
                                src={product.image}
                                alt="Grocery Ecommerce Template"
                                className="mb-3 img-fluid card-img-top"
                              />
                            </Link>
                          </div>
                          <div className="text-small mb-1">
                            <Link
                              to={`/category/${product.category}`}
                              className="text-inherit text-decoration-none text-dark"
                            >
                              <small>{product.category}</small>
                            </Link>
                          </div>
                          <h5 className="card-title fs-6">
                            <Link
                              to={`/product/${product.id}`}
                              className="text-inherit text-decoration-none text-dark"
                            >
                              {product.title}
                            </Link>
                          </h5>
                          <div>
                            <small className="text-warning">
                              <i className="fa-solid fa-star" />
                              <i className="fa-solid fa-star" />
                              <i className="fa-solid fa-starl" />
                              <i className="fa-solid fa-star" />
                              <i className="fa-solid fa-star-half" />
                            </small>
                            <span className="text-muted small">4.5(149)</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                              <span className="text-dark">
                                ${product.price}
                              </span>
                            </div>
                            <div>
                              <button
                                className="btn add-to-cart-btn"
                                onClick={() => handleAddToCart(product)}
                              >
                                <FontAwesomeIcon icon={faCartPlus} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <nav>
                <ul className="pagination">
                  {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                      <a
                        onClick={() => paginate(number)}
                        href="#!"
                        className="page-link"
                      >
                        {number}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTopButton />
    </>
  );
};

export default AllProducts;
