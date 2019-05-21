import React, { Component } from 'react';
import {Paper, Table, TableHead, TableRow, TableBody, TableCell, Typography} from "@material-ui/core";
import NumericInput from 'react-numeric-input';
import _ from "lodash";
import { CartContext } from '../contexts/Cart';

class CartItems extends Component {
    constructor(){
        super();
        this.changeQty = this.changeQty.bind(this);
    }
    changeQty(value, id){
        
    }
    render() {

        const { items } = this.props;
        const uniqItems = _.uniq(items);
       
        return (
            <Paper>
                <Table style={{minHeight: "300px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize: "24px"}}>Product</TableCell>
                            <TableCell align="right" style={{fontSize: "28px"}}>Quantity</TableCell>
                            <TableCell align="right" style={{fontSize: "28px"}}>Unit price</TableCell>
                            <TableCell align="right" style={{fontSize: "28px"}}>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {uniqItems.length !== 0 ? uniqItems.map(item => (
                        <TableRow key={item._id}>
                            <TableCell component="th" scope="row"  style={{fontSize: "22px"}}>
                                <img src={item.imageUrl} style={{width: "30%", height:"60%", paddingRight:"10px"}} alt=""/>
                                {item.title}
                            </TableCell>
                            <CartContext.Consumer>
                                {
                                    ({changeValueQty}) => (
                                        <TableCell style={{fontSize: "22px"}} align="right"><NumericInput onChange={(valueAsNumber) => changeValueQty(valueAsNumber, item._id)} min={0} max={100} value={item.qty || 1} mobile /></TableCell>
                                    )
                                }
                            </CartContext.Consumer>
                            <TableCell align="right" style={{fontSize: "22px"}}>{item.price}</TableCell>
                            <TableCell align="right" style={{fontSize: "22px"}}>{item.price * item.qty}</TableCell>
                        </TableRow>
                    )) : <TableRow>
                            <TableCell style={{fontSize: "24px"}} colSpan={4}>No product yet</TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
                <Paper style={{marginTop: "20px", width:"100%", display: "flex", justifyContent:"flex-end"}}>
                    <div style={{display: "flex", justifyContent:"flex-end", padding: "16px"}}>
                        
                             
                        <CartContext.Consumer>
                        {
                            ({totalPrice}) => (
                                <Typography style={{fontSize: "24px"}}>Total price: {totalPrice()}  </Typography>
                            )
                        }
                        </CartContext.Consumer>
                
                      
                    </div>
                   
                </Paper>
            </Paper>
        );
    }
}

export default CartItems;
