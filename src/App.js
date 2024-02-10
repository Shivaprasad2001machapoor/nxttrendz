import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  /* addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
  } */

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const {id} = product

      const existingProductIndex = cartList.findIndex(item => item.id === id)

      if (existingProductIndex !== -1) {
        // If the product exists, increment its quantity
        const updatedCartList = [...cartList]
        updatedCartList[existingProductIndex] = {
          ...updatedCartList[existingProductIndex],
          quantity: updatedCartList[existingProductIndex].quantity + 1,
        }

        return {cartList: updatedCartList}
      }

      // If the product doesn't exist, add it to the cart with the specified quantity
      return {cartList: [...cartList, {...product, quantity: product.quantity}]}
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = itemId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.id === itemId) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      }),
    }))
  }

  decrementCartItemQuantity = itemId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.id === itemId && item.quantity > 0) {
          return {...item, quantity: item.quantity - 1}
        }
        return item
      }),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
