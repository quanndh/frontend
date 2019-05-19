import React , { Component } from "react";

const CartContext = React.createContext();

class CartProvider extends Component{
    constructor(props){
        super(props);
        this.state = {
            cartItems: []
        }
        this.addToCart = this.addToCart.bind(this);
        this.changeValueQty = this.changeValueQty.bind(this);
        this.totalPrice = this.totalPrice.bind(this);
    }

    changeValueQty(valueAsNumber, idProduct) {
        let item = this.state.cartItems;
        for(let i = 0; i < item.length; i++){
            if(item[i]._id === idProduct){
                item[i].qty = valueAsNumber;
            }
        }
        this.setState({
            cartItems: item,
        })
    }

    totalPrice(){
        let total = this.state.cartItems.reduce((a,b) => {
            return a + b.qty * b.price;
        },
        0)
        return total;
    }

    addToCart(product) {
        let same = false;
       
        for(let i = 0; i < this.state.cartItems.length; i++){
            if(this.state.cartItems[i]._id === product._id){
                same = true;
            }
        }
        if(same){
            product["qty"]++;
        } else{
            product["qty"] = 1;
            this.setState({
                cartItems: this.state.cartItems.concat(product)
            })
        }  
    }

    render() {
        return ( 
            <CartContext.Provider value={{
                    cartItems: this.state.cartItems,
                    addToCart: this.addToCart,
                    changeValueQty: this.changeValueQty,
                    totalPrice: this.totalPrice
                }}
            >
                {this.props.children}
            </CartContext.Provider>     
        );
    }
}

export { CartContext, CartProvider };