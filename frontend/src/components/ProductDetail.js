// src/components/ProductDetail.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTopButton from "./BackToTopButton";

import "../css/ProductDetail.css";
import {
  fetchProductsByCategory,
  fetchProductDetail,
  fetchCategories,
} from "./HandleAPI_User";
import { addToCart } from "./HandleAPI_User";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const totalPages = Math.ceil(availableProducts.length / productsPerPage);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsDetail = await fetchProductDetail(id);
        const categoriesData = await fetchCategories();

        const mergedProduct = (product) => {
          const category = categoriesData.find(
            (cat) => cat.id_category === product.id_category
          );
          return {
            ...product,
            category_name: category ? category.category_name : "Unknown",
          };
        };

        const mergedProducts = mergedProduct(productsDetail);
        const productsData = await fetchProductsByCategory(
          mergedProducts.category_name
        );

        setProduct(productsDetail);
        setAvailableProducts(productsData);
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    fetchData();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handlePageChange = (action) => {
    if (action === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (action === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const handleAddToCart = async (product) => {
    addToCart(product, quantity);
  };

  if (!product) {
    return;
  }

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = availableProducts.slice(startIndex, endIndex);

  return (
    <>
      <Navbar />
      <>
        <section className="py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6">
                <img
                  src={`http://localhost:4000${product.image}`}
                  alt="Product"
                  className="card-img-product mb-5 mb-md-0"
                />
              </div>
              <div className="col-md-6">
                <h1 className="display-5 fw-bolder">{product.product_name}</h1>
                <div className="fs-5 mb-5">
                  <span>{formatter.format(product.price)}</span>
                </div>
                <p className="lead">{product.description}</p>
                <div className="d-flex">
                  <input
                    className="form-control text-center me-3"
                    id="inputQuantity"
                    type="number" // Corrected to 'number' from 'num'
                    defaultValue={1}
                    min={1} // Optional: Set minimum value if needed
                    style={{ maxWidth: "3rem" }}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <button
                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="me-1" />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Related items section*/}
        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="fw-bolder mb-4">Produk Serupa</h2>
            <div className="product-slider">
              <div className="slider-container">
                <button
                  className="slider-button prev"
                  onClick={() => handlePageChange("prev")}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>
                <div className="our-products-section product-cards">
                  <div className="row g-4 justify-content-center row-cols-1 row-cols-md-2 row-cols-lg-4 p-2">
                    {currentProducts
                      .filter(
                        (currentProducts) =>
                          currentProducts.id_product !== product.id_product
                      )
                      .map((currentProducts) => (
                        <div className="col" key={currentProducts.id_product}>
                          <div className="card card-product">
                            <div className="card-body">
                              <div className="text-center position-relative">
                                <Link
                                  to={`/product/${currentProducts.id_product}`}
                                >
                                  <img
                                    src={`http://localhost:4000${currentProducts.image}`}
                                    alt="Product"
                                    className="mb-3 img-fluid card-img-top"
                                  />
                                </Link>
                              </div>
                              <div className="text-small mb-1">
                                <Link
                                  to={`/category/${currentProducts.category_name}`}
                                  className="text-inherit text-decoration-none text-dark"
                                >
                                  <small>{currentProducts.category_name}</small>
                                </Link>
                              </div>
                              <h5 className="fs-6">
                                <Link
                                  to={`/product/${currentProducts.id_product}`}
                                  className="text-inherit text-decoration-none text-dark"
                                >
                                  {currentProducts.product_name}
                                </Link>
                              </h5>
                              <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                  <span className="text-dark">
                                    {formatter.format(currentProducts.price)}
                                  </span>
                                </div>
                                <div>
                                  <button
                                    className="btn add-to-cart-btn"
                                    onClick={() =>
                                      handleAddToCart(currentProducts)
                                    }
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
        </section>
      </>

      <Footer />
      <BackToTopButton />
    </>
  );
};

export default ProductDetail;
