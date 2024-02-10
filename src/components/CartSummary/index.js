import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalAmount = cartList.reduce((total, cartItem) => {
        const itemPrice = cartItem.price
        const itemQuantity = cartItem.quantity
        return total + itemPrice * itemQuantity
      }, 0)
      const itemsinCart = cartList.length

      return (
        <div className="summary-container">
          <h1 className="total-cost">Order Total: Rs{totalAmount}/- </h1>
          <p className="count-in-cart">{itemsinCart} items in cart</p>
          <button type="button" className="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
