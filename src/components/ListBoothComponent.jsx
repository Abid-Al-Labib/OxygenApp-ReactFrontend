import React, { Component } from 'react';
import BoothService from '../services/BoothService';

class ListBoothComponent extends Component {
    constructor(props){

        super(props)
        
        this.state = {
            booths: []
        }

    }
    
    componentDidMount()
    {
        BoothService.getAllBooths().then((res) => {
            this.setState({booths: res.data})
        });
    }

    render() {
        return (
            <div>
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
        );
    }
}

export default ListBoothComponent;