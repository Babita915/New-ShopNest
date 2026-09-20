import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Slice";
import '../style/product.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================
  // REDUX CART
  // =========================

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

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

      setError(
        error.response?.data?.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // SEARCH
  // =========================

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return products;
    }

    return products.filter((item) =>
      item.name?.toLowerCase().includes(keyword)
    );
  }, [products, search]);

  // =========================
  // STOCK
  // =========================

  const getStock = (item) => {
    return Number(
      item.quantity ?? item.stock ?? 0
    );
  };

  const inStock = products.filter(
    (item) => getStock(item) > 10
  ).length;

  const lowStock = products.filter((item) => {
    const stock = getStock(item);

    return stock > 0 && stock <= 10;
  }).length;

  const outOfStock = products.filter(
    (item) => getStock(item) <= 0
  ).length;

  // =========================
  // PRODUCT CARD
  // =========================

  const ProductCard = ({ item }) => {
    const isInCart = cartItems.some(
      (cartItem) => cartItem.id === item.id
    );

    const stock = getStock(item);

    let stockClass = "stock-out";
    let stockText = "Out of Stock";

    if (stock > 10) {
      stockClass = "stock-good";
      stockText = "In Stock";
    } else if (stock > 0) {
      stockClass = "stock-low";
      stockText = "Low Stock";
    }

    return (
      <div className="product-card">

        {/* =====================
            IMAGE
        ===================== */}

        <div className="product-image-box">

          <img
            src={
              item.image ||
              "https://via.placeholder.com/500x400?text=No+Image"
            }
            alt={item.name || "Product"}
            className="product-image"
          />

          {/* Product ID */}

          <span className="product-id">
            #{item.id}
          </span>

        </div>

        {/* =====================
            PRODUCT CONTENT
        ===================== */}

        <div className="product-content">

          <div className="product-label">
            PRODUCT
          </div>

          <h3 className="product-name">
            {item.name || "Unnamed Product"}
          </h3>

          <p className="product-description">
            {item.description ||
              "No description available for this product."}
          </p>

          {/* =====================
              PRICE / STOCK
          ===================== */}

          <div className="product-info">

            <div className="price-section">

              <span className="info-label">
                Price
              </span>

              <strong className="product-price">
                ₹
                {Number(
                  item.price || 0
                ).toLocaleString("en-IN")}
              </strong>

            </div>

            <div className="stock-section">

              <span className="info-label">
                Available
              </span>

              <strong>
                {stock > 0
                  ? `${stock} units`
                  : "None"}
              </strong>

            </div>

          </div>

          {/* =====================
              CART BUTTON
          ===================== */}

          <button
            className={`cart-button ${
              isInCart ? "cart-added" : ""
            }`}
            disabled={isInCart}
            onClick={() =>
              dispatch(addToCart(item))
            }
          >
            <span className="cart-button-icon">
              {isInCart ? "✓" : "🛒"}
            </span>

            {isInCart
              ? "Added to Cart"
              : "Add to Cart"}
          </button>

        </div>

      </div>
    );
  };

  return (
    <>


      <div className="products-page">

        {/* =================================
            HEADER
        ================================= */}

        <div className="products-header">

          <div className="products-heading">

            <div className="products-label">
              🛍️ STORE CATALOG
            </div>

            <h1>
              Products
            </h1>

            <p>
              Manage your product catalog,
              pricing and inventory.
            </p>

          </div>

          <button
            className="add-product-button"
            onClick={() =>
              navigate("/add-product")
            }
          >
            + Add Product
          </button>

        </div>


        {/* =================================
            STAT CARDS
        ================================= */}

        <div className="products-stats">

          <div className="stat-card">

            <div className="stat-icon">
              📦
            </div>

            <div className="stat-text">

              <span>
                Total Products
              </span>

              <strong>
                {products.length}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ✓
            </div>

            <div className="stat-text">

              <span>
                In Stock
              </span>

              <strong>
                {inStock}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ⚠️
            </div>

            <div className="stat-text">

              <span>
                Low Stock
              </span>

              <strong>
                {lowStock}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              🛒
            </div>

            <div className="stat-text">

              <span>
                Cart Items
              </span>

              <strong>
                {cartItems.length}
              </strong>

            </div>

          </div>

        </div>


        {/* =================================
            SEARCH TOOLBAR
        ================================= */}

        {!loading && !error && (

          <div className="products-toolbar">

            <div className="search-box">

              <span>
                🔍
              </span>

              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <div className="showing-count">

              Showing{" "}

              <strong>
                {filteredProducts.length}
              </strong>

              {" "}of{" "}

              <strong>
                {products.length}
              </strong>

              {" "}products

            </div>

          </div>

        )}


        {/* =================================
            LOADING
        ================================= */}

        {loading && (

          <div className="products-loading">

            <div className="loading-spinner"></div>

            <p>
              Loading products...
            </p>

          </div>

        )}


        {/* =================================
            ERROR
        ================================= */}

        {!loading && error && (

          <div className="products-error">

            <div className="products-error-icon">
              ⚠️
            </div>

            <strong>
              Unable to load products
            </strong>

            <p>
              {error}
            </p>

            <button
              className="retry-button"
              onClick={fetchProducts}
            >
              Try Again
            </button>

          </div>

        )}


        {/* =================================
            EMPTY
        ================================= */}

        {!loading &&
          !error &&
          products.length === 0 && (

            <div className="products-empty">

              <div className="empty-icon">
                📦
              </div>

              <h3>
                No Products Yet
              </h3>

              <p>
                Add your first product to
                start building your catalog.
              </p>

              <button
                className="add-product-button"
                onClick={() =>
                  navigate("/add-product")
                }
              >
                + Add Product
              </button>

            </div>

          )}


        {/* =================================
            PRODUCT GRID
        ================================= */}

        {!loading &&
          !error &&
          products.length > 0 && (

            <div className="products-grid">

              {filteredProducts.length > 0 ? (

                filteredProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                  />
                ))

              ) : (

                <div className="no-results">

                  <div className="no-results-icon">
                    🔍
                  </div>

                  <h3>
                    No Products Found
                  </h3>

                  <p>
                    Try searching with another
                    product name.
                  </p>

                </div>

              )}

            </div>

          )}

      </div>
    </>
  );
}