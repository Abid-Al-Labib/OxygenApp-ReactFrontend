import React, { Component } from 'react';
import { toast } from 'react-toastify';
import BoothService from '../services/BoothService';

toast.configure()
class CreateBoothComponent extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            
            name: '',
            location:'',
            manager:'',
            phone:'',
            largeCylinderStock:0,
            smallCylinderStock:0,
            type:''

        }
        
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeManagerHandler = this.changeManagerHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeLCSHandler = this.changeLCSHandler.bind(this);
        this.changeSCSHandler = this.changeSCSHandler.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.saveBooth = this.saveBooth.bind(this);
        this.cancel = this.cancel.bind(this);

    }
    

    dropDownOptions={
        typeOptions:['-- Select Type of Booth --', 'Factory', 'Consumer' ]
    }
    

    changeLocationHandler=(event)=>{
        this.setState({location: event.target.value});
    }
    

    changeNameHandler=(event)=>{
        this.setState({name: event.target.value});
    }

    changeManagerHandler=(event)=>{
        this.setState({manager: event.target.value});
    }

    changePhoneHandler=(event)=>{
        this.setState({phone: event.target.value});
    }

    changeSCSHandler(event){
        if(event.target.value>=0)
        {
            this.setState({smallCylinderStock: event.target.value})
        }
    }

    changeLCSHandler(event){
        if(event.target.value>=0)
        {
            this.setState({LargeCylinderStock: event.target.value})
        }
    }

    handleTypeChange=(event)=>{
        this.setState({type: event.target.value});
    }

    saveBooth = (e) =>
    {
        e.preventDefault();
        let booth = {
            name: this.state.name,
            location:this.state.location,
            manager: this.state.manager,
            phone:this.state.phone,
            largeCylinderStock:this.state.largeCylinderStock,
            smallCylinderStock:this.state.smallCylinderStock,
            type:this.state.type
        };

        console.log('distributor =>' + JSON.stringify(booth));
        
        if(this.state.location!=='' && this.state.name!=='' && this.state.manager!=='' && this.state.type!=='')
        {
            BoothService.createBooth(booth).then(res => {
                console.log(res.data)
                this.props.history.push('/');
            });
        }
        else
        {
            console.log("Empty Fields");
            toast.error('Empty Fields!', {
                position:toast.POSITION.BOTTOM_CENTER,
                autoClose:3000
                }
            )
        }

        
    }

    cancel()
    {
        this.props.history.push('/');
    }
    
    render() {
        return (
            <div>
                    <div className = "container">
                            <div className = "form-holder">
                                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                                            <h3 className="text-center">Add Booth</h3>
                                            <div className="card-body">
                                                <form>
                                                    
                                                    <div className = "form-group"> 
                                                        <label> Location: </label>
                                                        <input placeholder="Location" name="location" className="form-control"
                                                            value={this.state.location} onChange={this.changeLocationHandler}/>
                                                    </div>
                                                    
                                                    <div className = "form-group">     
                                                        <label> Booth Name: </label>                                                            
                                                        <input placeholder="Name of Booth" name="name" className="form-control"
                                                            value={this.state.name} onChange={this.changeNameHandler}/>
                                                    </div>

                                                    <div className = "form-group">     
                                                        <label> Manager Name: </label>
                                                        <input placeholder="Name of Manager" name="manager" className="form-control"
                                                            value={this.state.manager} onChange={this.changeManagerHandler}/>
                                                    </div>

                                                    <div className = "form-group">     
                                                        <label> Contact number: </label>
                                                        <input placeholder="Phone Number" name="phone" className="form-control"
                                                            value={this.state.phone} onChange={this.changePhoneHandler}/>
                                                    </div>

                                                    <div className = "form-group">     
                                                        <label> Starting amount of small cylinders: </label>
                                                        <input placeholder="Small Cylinders Quantity" name="smallCylinder" className="form-control"
                                                            defaultValue={this.state.smallCylinderStock} onChange={this.changeSCSHandler}/>                 
                                                    </div>

                                                    <div className = "form-group">     
                                                        <label> Starting amount of large cylinders: </label>
                                                        <input placeholder="Large Cylinders Quantity" name="largeCylinder" className="form-control"
                                                            defaultValue={this.state.largeCylinderStock} onChange={this.changeLCSHandler}/>                 
                                                    </div>

                                                    <div className = "form-group">     
                                                        <label> Booth Type: </label>
                                                        <span style={{padding:"0.5em"}}>
                                                            <select onChange={this.handleTypeChange}>
                                                                {
                                                                    this.dropDownOptions.typeOptions.map
                                                                    (
                                                                        (aType) =>
                                                                        (
                                                                            <option value={aType}>{aType}</option>
                                                                        )
                                                                    )
                                                            }
                                                            </select>
                                                        </span>
                                                        
                                                    </div>

                                                    <button className = "btn btn-success" onClick={this.saveBooth}>Add</button>
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

export default CreateBoothComponent;