import React, { Component } from 'react';
import OrderService from '../services/OrderService';
import {Redirect} from 'react-router-dom';
class HistoryComponent extends Component {
    
    constructor(props)
    {
        super(props)

        this.state = {
            // id = '',
            // type = '',
            // size='',
            // sender='',
            // receiver='',
            // quantity='',
            // date='',
            // distributorId=''
            orders : [],
            distributorId : this.props.match.params.id
        }

        this.goBack = this.goBack.bind(this);

    }

    
    goBack()
    {
        this.props.history.push('/');
    }

    componentDidMount()
    {
        
        OrderService.getOrderByDistributor(this.props.match.params.id).then((res)=>{
            this.setState({orders: res.data})
        });
    }

    render() {
        return (
            <div>
                
                <div className="buttonRow">
                        <span>
                            <button className = "btn btn-dark" onClick={this.goBack}>Back</button> 
                        </span>
                        <h2 className = "text-center">History of Orders</h2>
                </div> 
                <div className = "row">
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <th>Id</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Quantity</th>
                            <th>Date</th>
                        </thead>

                        <tbody>
                            {
                                this.state.orders.map(
                                    order =>
                                    <tr key = {order.id}>
                                        <th>{order.id}</th>
                                        <th>{order.type}</th>
                                        <th>{order.size}</th>
                                        <th>{order.sender}</th>
                                        <th>{order.receiver}</th>
                                        <th>{order.quantity}</th>
                                        <th>{order.date}</th>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>

            </div>

           
            
        );
    }

}

export default HistoryComponent;