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
    }

    changeValueQty(valueAsNumber, idProduct) {
        let item = this.state.cartItems;
        console.log(idProduct);
        for(let i = 0; i < item.length; i++){
            if(item[i]._id === idProduct){
                item[i].qty = valueAsNumber;
                console.log(item[i].qty)
            }
        }
        this.setState({
            cartItems: item,
        })
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
                }}
            >
                {this.props.children}
            </CartContext.Provider>     
        );
    }
}

export { CartContext, CartProvider };