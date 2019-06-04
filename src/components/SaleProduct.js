import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import {Link} from "react-router-dom";

class SaleProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
        loading: false,
        visible: true,
      };
    }


    handleCancel = () => {
        this.props.handleCancel();
    };

    render() {
    const { loading } = this.state;
    const { product, visible } = this.props;
    return (
            <Modal
                style={{display: "flex", flexDirection: "column", alignItems: "center"}}
                width={500}
                visible={visible}
                title="Good deal for you!!!"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Link to={`/products/${product._id}`}>
                        <Button key="submit" type="primary" loading={loading}>
                            SEE DETAILS
                        </Button>
                    </Link>
                    
                    
                ]}
            >
                <img style={{width: "100%", height:"100%"}} src={product.imageUrl} alt=""/>
                <h4 style={{paddingRight: "200px"}}>{product.title}</h4>
                <h4>${product.price}</h4>
            </Modal>
    );
    }
}

export default SaleProduct;

