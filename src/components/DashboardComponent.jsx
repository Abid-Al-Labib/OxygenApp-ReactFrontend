import React, { Component } from 'react';
import DistributorService from '../services/DistributorService';
import BoothService from '../services/BoothService';


class ListDistributorComponent extends Component {
    
    constructor(props)
    {
        super(props)

        this.state = {
            distributors: [],
            booths:[]
        }

        this.addDistributor = this.addDistributor.bind(this);
        this.makeOrder = this.makeOrder.bind(this);
        this.viewHistory = this.viewHistory.bind(this);
        this.createBooth = this.createBooth.bind(this);
    }
    
    componentDidMount()
    {
        DistributorService.getAllDistributors().then((res)=>{
            this.setState({distributors: res.data})
        });
        
        BoothService.getAllBooths().then((res) => {
            this.setState({booths: res.data})
        });
    }

    addDistributor()
    {
        this.props.history.push('/add-distributor');
        
    }

    viewHistory(id)
    {
        this.props.history.push(`/order-history/${id}`);
    }

    makeOrder(id)
    {
        console.log(id)
        this.props.history.push(`/place-order/${id}`);
    }

    createBooth()
    {
        this.props.history.push('/add-booth');
    }
     
    
    render() {
        return (
            <div>
                
                <div className="buttonRow">
                        <span>
                            <button className = "btn btn-dark" onClick={this.addDistributor}>Add Distributor</button> 
                        </span>
                        
                        <span className="buttonRowSpan">
                                <button className = "btn btn-dark" onClick={this.createBooth}>Add Booth</button>
                        </span> 
                        <h2 className = "text-center">Distributor List</h2>
                </div> 
                <div className = "row">
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <th>Id</th>
                            <th>Institution Name</th>
                            <th>Empty Cylinder(L)</th>
                            <th>Full Cylinder (L)</th>
                            <th>Empty Cylinder (S)</th>
                            <th>Full Cylinder (S)</th>
                            <th>Actions</th>
                        </thead>

                        <tbody>
                            {
                                this.state.distributors.map(
                                    distributors =>
                                    <tr key = {distributors.id}>
                                        <th>{distributors.id}</th>
                                        <th>{distributors.name}</th>
                                        <th>{distributors.emptyCylindersLarge}</th>
                                        <th>{distributors.fullCylindersLarge}</th>
                                        <th>{distributors.emptyCylindersSmall}</th>
                                        <th>{distributors.fullCylindersSmall}</th>
                                        <th>
                                            <span className = "tableButton">
                                                <button className = "btn btn-primary" onClick={()=> this.makeOrder(distributors.id)}>Order</button>
                                            </span>
                                            <span className = "tableButton">
                                                <button className = "btn btn-primary" onClick={()=> this.viewHistory(distributors.id)}>History</button>
                                            </span>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>

                <div className = "boothList">
                    <h2 className ="text-center">Booth List</h2>   
                    <div className = "row">
                    
                        <table className = "table table-striped table-bordered">
                        
                            <thead>
                            
                                <tr>
                                    <th>Id</th>
                                    <th>Institution Name</th>
                                    <th>Location</th>
                                    <th>Manager Name</th>
                                    <th>Manager Phone</th>
                                    <th>Large Cylinders</th>
                                    <th>Small Cylinders</th>
                                    <th>Type</th>
                                </tr>

                            </thead>
                       
                            <tbody>

                                {
                                    this.state.booths.map(
                                        booths =>
                                        <tr key = {booths.id}>
                                            <td> {booths.id} </td>
                                            <td> {booths.name} </td>
                                            <td> {booths.location} </td>
                                            <td> {booths.manager} </td>
                                            <td> {booths.phone_number} </td>
                                            <td> {booths.largeCylinderStock} </td>
                                            <td> {booths.smallCylinderStock} </td>
                                            <td> {booths.type} </td>
                                        </tr>
                                    )
                                }

                            </tbody>


                        </table>

                    </div>
    

                </div>


            </div>

           
            
        );
    }
}

export default ListDistributorComponent;
