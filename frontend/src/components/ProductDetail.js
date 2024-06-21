// src/components/ProductDetail.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSackDollar,
  faThumbsUp,
  faHandshake,
  faMedal,
  faCircleCheck,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTopButton from "./BackToTopButton";
import { useCart } from "../components/CartContext";
import "../css/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const totalPages = Math.ceil(availableProducts.length / productsPerPage);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the product details:", error);
      });

    axios
      .get(`https://fakestoreapi.com/products`)
      .then((response) => {
        setAvailableProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching available products:", error);
      });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handlePageChange = (action) => {
    if (action === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (action === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (!product || !availableProducts.length) {
    return <div>Loading...</div>;
  }

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = availableProducts.slice(startIndex, endIndex);

  return (
    <>
      <Navbar />
      <div className="container-detail">
        <div className="main-product">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-details">
            <p className="product-id">Product ID : {product.id}</p>
            <h1 className="product-name">{product.title}</h1>
            <p className="product-price">Harga : ${product.price}</p>
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(product)}
            >
              Tambah ke keranjang
            </button>
          </div>
        </div>
        <div className="product-info">
          <div className="description">
            <h2>Deskripsi</h2>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="product-slider">
          <h2>Featured Products</h2>
          <div className="slider-container">
            <button
              className="slider-button prev"
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <div className="our-products-section product-cards">
              <div className="row g-4 justify-content-center row-cols-1 row-cols-md-3 row-cols-lg-5">
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
                            <span className="text-dark">${product.price}</span>
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
            <button
              className="slider-button next"
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTopButton />
    </>
  );
};

export default ProductDetail;
