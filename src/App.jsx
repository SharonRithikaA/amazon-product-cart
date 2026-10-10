import { useState, useEffect } from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      <div className="brand">
        <span className="brand-icon">a</span>
        <div>
          <h1>Amazon Product Store</h1>
          <p>Everything you need, delivered to you.</p>
        </div>
      </div>
      <span className="header-tag">🛒 Your Store</span>
    </header>
  );
}

function ProductCard(props) {
  const total = props.quantity * props.price;

  return (
    <section className="product-card">
      <div className="image-container">
        <img
          src="https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&auto=format&fit=crop"
          alt="Wireless computer mouse"
        />
        <span className="image-badge">BESTSELLER</span>
      </div>

      <div className="product-details">
        <span className="category">COMPUTER ACCESSORIES</span>
        <h2>{props.name}</h2>

        <div className="price-row">
          <span className="price">₹{props.price}</span>
          <span className="per-item">inclusive price per item</span>
        </div>

        <div className="info-box">
          <p>🎨 <strong>Colour:</strong> {props.color}</p>
          <p>📍 <strong>Deliver to:</strong> {props.city || "Enter your city"}</p>
        </div>

        <div className="cart-summary">
          <div className="summary-heading">
            <span>YOUR CART</span>
            <span className="quantity-badge">{props.quantity} item(s)</span>
          </div>

          <div className="total-row">
            <span>Cart Quantity</span>
            <strong>{props.quantity}</strong>
          </div>

          <div className="total-row grand-total">
            <span>Total Amount</span>
            <strong>₹{total}</strong>
          </div>

          <p className={props.quantity === 0 ? "cart-message empty" : "cart-message success"}>
            {props.quantity === 0
              ? "Your cart is empty. Let's add something!"
              : "✓ Product added to cart"}
          </p>
        </div>

        <div className="cart-buttons">
          <button className="add-button" onClick={props.addToCart}>
            + Add to Cart
          </button>

          <button
            className="remove-button"
            onClick={props.removeOne}
            disabled={props.quantity === 0}
          >
            − Remove One
          </button>

          <button className="reset-button" onClick={props.resetCart}>
            Reset Cart
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Amazon Product Store</p>
      <span>Made for a smarter shopping experience ✨</span>
    </footer>
  );
}

function App() {
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [deliveryCity, setDeliveryCity] = useState("Coimbatore");
  const [showProduct, setShowProduct] = useState(true);

  useEffect(() => {
    document.title =
      `Wireless Mouse | ${selectedColor} | Cart: ${quantity}`;
  }, [quantity, selectedColor]);

  function addToCart() {
    setQuantity((previousQuantity) => previousQuantity + 1);
  }

  function removeOne() {
    setQuantity((previousQuantity) =>
      Math.max(0, previousQuantity - 1)
    );
  }

  function resetCart() {
    setQuantity(0);
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="welcome-section">
          <div>
            <span className="eyebrow">YOUR DAILY TECH ESSENTIAL</span>
            <h2>Simple. Smart. Wireless.</h2>
            <p>Discover your everyday computing companion.</p>
          </div>
          <div className="welcome-icon">🎧</div>
        </div>

        {showProduct ? (
          <ProductCard
            name="Wireless Mouse"
            price={499}
            quantity={quantity}
            color={selectedColor}
            city={deliveryCity}
            addToCart={addToCart}
            removeOne={removeOne}
            resetCart={resetCart}
          />
        ) : (
          <div className="hidden-message">
            <span>🛍️</span>
            <h3>Your product is hidden</h3>
            <p>Your cart quantity, colour and delivery city are saved.</p>
          </div>
        )}

        <section className="settings-card">
          <h3>⚙️ Personalise Your Order</h3>

          <div className="controls">
            <div className="input-group">
              <label htmlFor="product-color">Choose product colour</label>
              <select
                id="product-color"
                value={selectedColor}
                onChange={(event) => setSelectedColor(event.target.value)}
              >
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
                <option value="White">White</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="delivery-city">Delivery city</label>
              <input
                id="delivery-city"
                type="text"
                value={deliveryCity}
                onChange={(event) => setDeliveryCity(event.target.value)}
                placeholder="Enter your city"
              />
            </div>
          </div>

          <button
            className="toggle-button"
            onClick={() => setShowProduct((previous) => !previous)}
          >
            {showProduct ? "Hide Product" : "Show Product"}
          </button>
        </section>

        <div className="trust-note">
          <span>🔒</span>
          <p>Simple shopping demo · Your cart updates instantly</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;