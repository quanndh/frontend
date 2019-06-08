import React, { Component } from 'react';
import {Paper, Table, TableHead, TableRow, TableBody, TableCell} from "@material-ui/core";


class Order extends Component {
    render() {
        const { data } = this.props;
        return (
            <Paper style={{width: "100%"}}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize: "24px"}}>Product</TableCell>
                            <TableCell align="right" style={{fontSize: "28px"}}>Quantity</TableCell>
                            <TableCell align="right" style={{fontSize: "28px"}}>Unit price</TableCell>
                            <TableCell align="right" style={{fontSize: "28px"}}>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row"  style={{fontSize: "22px"}}>
                                <img src={item.imageUrl} style={{width: "30px", height:"40px", paddingRight:"10px"}} alt=""/>
                                {item.title}
                            </TableCell>
                            
                            <TableCell style={{fontSize: "22px"}} align="right">{item.qty}</TableCell>
                                   
                            <TableCell align="right" style={{fontSize: "22px"}}>{item.price}</TableCell>
                            <TableCell align="right" style={{fontSize: "22px"}}>{(item.price * item.qty)}</TableCell>
                        </TableRow>
                    )) 
                    }
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default Order;
