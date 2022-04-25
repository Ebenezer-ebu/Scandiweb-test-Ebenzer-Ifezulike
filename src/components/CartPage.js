import { Component } from "react";
import { connect } from "react-redux";
import { decrementItems, incrementItems } from "../actions/cart";

class CartPage extends Component {
  incrementNum = (id) => {
    const { dispatch } = this.props;
    dispatch(incrementItems(id));
  };

  decrementNum = (id) => {
    const { dispatch } = this.props;
    dispatch(decrementItems(id));
  };
  render() {
    const { state } = this.props;
    const { addCart } = state;
    let itemsInBag = 0;
    const total = addCart.cart
      ? addCart.cart.reduce((accum, cart) => {
          let cost = cart.price.find(
            (price) =>
              price.currency.symbol === state.currency.defaultCurrency?.symbol
          );
          itemsInBag += cart.no_of_items;
          return accum + cost.amount * cart.no_of_items;
        }, 0)
      : 0;
    return (
      <div className="container">
        <div className="cart-head">
          <div className="top">
            <h1>CART</h1>
          </div>
          <div>
            {addCart.cart && addCart.cart.length > 0 ? (
              <>
                {addCart.cart.map((cart) => (
                  <div className="stock-content" key={cart.id}>
                    <div>
                      <h2 style={{ margin: 0 }}>{cart.name}</h2>
                      <p style={{ fontSize: "22px", margin: 0 }}>
                        {cart.brand}
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        {
                          cart.price.find(
                            (price) =>
                              price.currency.symbol ===
                              state.currency.defaultCurrency?.symbol
                          ).currency.symbol
                        }
                        {
                          cart.price.find(
                            (price) =>
                              price.currency.symbol ===
                              state.currency.defaultCurrency?.symbol
                          ).amount
                        }
                      </p>
                      <div className="attr">
                        {Object.keys(cart.attributes).map((attr, i) => (
                          <div key={i}>
                            {Object.keys(cart.attributes[attr]).map(
                              (key, ind) => (
                                <div key={ind}>
                                  <p
                                    style={{
                                      margin: "3px 0",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {attr.toUpperCase()}:
                                  </p>

                                  <button
                                    key={ind}
                                    className="measure"
                                    style={{
                                      background:
                                        cart.attributes[attr][key][1] ===
                                        "swatch"
                                          ? cart.attributes[attr][key][0]
                                          : "",
                                      border:
                                        cart.attributes[attr][key][1] ===
                                        "swatch"
                                          ? "none"
                                          : "",
                                    }}
                                  >
                                    {cart.attributes[attr][key][1] === "swatch"
                                      ? key
                                      : cart.attributes[attr][key][0]}
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rate2">
                      <div className="rating">
                        <button
                          className="gauge2"
                          onClick={() => this.incrementNum(cart.id)}
                        >
                          ＋
                        </button>
                        <p>{cart.no_of_items}</p>
                        <button
                          className="gauge2"
                          onClick={() => this.decrementNum(cart.id)}
                        >
                          －
                        </button>
                      </div>
                      <div className="mini-image2">
                        <img src={cart.image} alt={cart.image} />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="order-item">
                  <div>
                    <p>
                      Tax:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {state.currency.defaultCurrency?.symbol}15.00
                      </span>
                    </p>
                    <p>
                      Qty:{" "}
                      <span style={{ fontWeight: "bold" }}>{itemsInBag}</span>
                    </p>
                  </div>
                  <p>
                    Total:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      {state.currency.defaultCurrency?.symbol}
                      {total}
                    </span>
                  </p>
                  <button className="order">ORDER</button>
                </div>
              </>
            ) : (
              <div>No Items In Cart</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(CartPage);
