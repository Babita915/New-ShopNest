import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/product.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Slice";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux Cart Items
  const cartItems = useSelector(
    (state) => state.cart.items
  );

  // GET Products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/v1/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Products:", response.data);

      setProducts(response.data.data || []);
    } catch (error) {
      console.error(
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">

      <div className="container">

        <div className="card border-0 shadow-sm product-card">

          <div className="card-body">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

              <h5 className="fw-bold mb-0">
                Product List
              </h5>

              <span className="badge bg-primary fs-6">
                {products.length} Products
              </span>

            </div>

            {/* Loading */}
            {loading ? (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>

                <p className="text-muted mt-2">
                  Loading products...
                </p>

              </div>

            ) : products.length === 0 ? (

              /* Empty State */

              <div className="text-center py-5">

                <div className="display-3 mb-3">
                  📦
                </div>

                <h5>
                  No Products Found
                </h5>

                <p className="text-muted">
                  Add your first product to get started.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/add-product")
                  }
                >
                  + Add Product
                </button>

              </div>

            ) : (

              /* Product Cards */

              <div className="row g-4">

                {products.map((item) => {

                  // Check whether this product
                  // already exists in Redux cart

                  const isInCart = cartItems.some(
                    (cartItem) =>
                      cartItem.id === item.id
                  );

                  return (

                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-3"
                      key={item.id}
                    >

                      <div className="card h-100 border-0 shadow-sm product-card">

                        {/* Product Image */}

                        <div className="p-3 product-image-wrapper">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="card-img-top rounded"
                            style={{
                              height: "220px",
                              objectFit: "cover",
                            }}
                          />

                        </div>

                        {/* Product Details */}

                        <div className="card-body d-flex flex-column">

                          {/* ID */}

                          <div className="mb-2">

                            <span className="product-id badge bg-secondary">
                              #{item.id}
                            </span>

                          </div>

                          {/* Name */}

                          <h5 className="product-title fw-bold">
                            {item.name}
                          </h5>

                          {/* Description */}

                          <p
                            className="product-description text-muted"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              minHeight: "48px",
                            }}
                          >
                            {item.description ||
                              "No description available"}
                          </p>

                          {/* Price */}

                          <h5 className="product-price fw-bold text-success mt-2">
                            ₹
                            {Number(
                              item.price
                            ).toLocaleString("en-IN")}
                          </h5>

                          {/* Add To Cart */}

                          <div className="d-flex gap-2 mt-auto pt-3">

                            {isInCart ? (

                              <button
                                className="add-cart-btn added"
                                disabled
                              >
                                <span className="cart-icon">
                                  ✓
                                </span>

                                <span>
                                  Added to Cart
                                </span>

                              </button>

                            ) : (

                              <button
                                className="add-cart-btn"
                                onClick={() =>
                                  dispatch(
                                    addToCart(item)
                                  )
                                }
                              >
                                <span className="cart-icon">
                                  🛒
                                </span>

                                <span>
                                  Add to Cart
                                </span>

                              </button>

                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}