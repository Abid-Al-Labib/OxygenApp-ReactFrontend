import React, { Component } from 'react';
import { toast } from 'react-toastify';
import DistributorService from '../services/DistributorService';

toast.configure()
class CreateDistributorComponent extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            
            name: '',
            emptyCylindersLarge: '0',
            fullCylindersLarge: '0',
            emptyCylindersSmall: '0',
            fullCylindersSmall: '0'

        }

        this.changeInstitutionNameHandler = this.changeInstitutionNameHandler.bind(this);
        this.changeECLHandler = this.changeECLHandler.bind(this);
        this.changeFCLHandler = this.changeFCLHandler.bind(this);
        this.changeECSHandler = this.changeECSHandler.bind(this);
        this.changeFCSHandler = this.changeFCSHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        this.saveDistributor = this.saveDistributor.bind(this);
    }

    saveDistributor = (e) =>
    {
        e.preventDefault();
        let distributor = {
            name: this.state.name,
            emptyCylindersLarge: this.state.emptyCylindersLarge,
            fullCylindersLarge: this.state.fullCylindersLarge,
            emptyCylindersSmall: this.state.emptyCylindersSmall,
            fullCylindersSmall: this.state.fullCylindersSmall
        };

        console.log('distributor =>' + JSON.stringify(distributor));

        if(this.state.name!==''){
            DistributorService.createDistributor(distributor).then(res => {
                console.log(res.data)
                this.props.history.push('/');
            });
        }
        else
        {
            console.log("Empty fields");
            toast.error('Empty Fields!', {
                position:toast.POSITION.BOTTOM_CENTER,
                autoClose:3000
                }
            )
        }
        
    }

    cancel()
    {
        this.props.history.push('/')
    }

    changeInstitutionNameHandler=(event)=>{
        this.setState({name: event.target.value})
    }

    changeECLHandler=(event)=>{
        this.setState({emptyCylindersLarge: event.target.value})
    }
    
    changeFCLHandler=(event)=>{
        this.setState({fullCylindersLarge: event.target.value})
    }
    
    changeECSHandler=(event)=>{
        this.setState({emptyCylindersSmall: event.target.value})
    }
    
    changeFCSHandler=(event)=>{
        this.setState({fullCylindersSmall: event.target.value})
    }

    
    
    render() {
        return (
            <div>
                    <div className = "container">
                            <div className = "form-holder">
                                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                                            <h3 className="text-center">Add Distributor</h3>
                                            <div className="card-body">
                                                <form>
                                                    
                                                    <div className = "form-group"> 
                                                        <label> Institution Name: </label>
                                                        <input placeholder="Institution Name" name="institutionName" className="form-control"
                                                            value={this.state.name} onChange={this.changeInstitutionNameHandler}/>
                                                    </div>
                                                    
                                                    <div className = "form-group">     
                                                        <label> Starting amount of large empty cylinders: </label>                                                            
                                                        <input placeholder="Large Empty Cylinders" name="emptyCylindersLarge" className="form-control"
                                                            value={this.state.emptyCylindersLarge} onChange={this.changeECLHandler}/>
                                                    </div>

                                                    <div className = "form-group">     
                                                        <label> Starting amount of large full cylinders: </label>
                                                        <input placeholder="Large Full Cylinders" name="fullCylindersLarge" className="form-control"
                                                            value={this.state.fullCylindersLarge} onChange={this.changeFCLHandler}/>
                                                    </div>

                                                    <div className = "form-group">     
                                                        <label> Starting amount of small empty cylinders: </label>
                                                        <input placeholder="Small Empty Cylinders" name="emptyCylindersSmall" className="form-control"
                                                            value={this.state.emptyCylindersSmall} onChange={this.changeECSHandler}/>
                                                    </div>

                                                    <div className = "form-group">     
                                                        <label> Starting amount of small full cylinders: </label>
                                                        <input placeholder="Small Full Cylinders" name="fullCylindersSmall" className="form-control"
                                                            value={this.state.fullCylindersSmall} onChange={this.changeFCSHandler}/>                 
                                                    </div>

                                                    <button className = "btn btn-success" onClick={this.saveDistributor}>Add</button>
                                                    <button className = "btn btn-danger" onClick={this.cancel} style={{marginLeft:"10px"}}>Cancel</button>    
                                                </form>
                                            </div>
                                    </div>
                            </div>
                    </div>
            </div>
        );
    }
}

export default CreateDistributorComponent;