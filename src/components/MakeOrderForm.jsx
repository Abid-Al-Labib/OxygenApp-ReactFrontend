import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import React, { Component } from 'react';
import BoothService from '../services/BoothService';
import DistributorService from '../services/DistributorService';
import { toast } from 'react-toastify';


toast.configure()
class MakeOrderForm extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            type: '',
            size: '',
            boothName: '',
            quantity: 0,
            date: '',
            dis_id: this.props.match.params.id,
            booths: []
            
        }
        
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleBoothChange = this.handleBoothChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.getBoothByType = this.getBoothByType.bind(this);
        this.cancel = this.cancel.bind(this);
        this.proceed = this.proceed.bind(this);
    }

    handleQuantityChange(e)
    {
        this.setState(
            { quantity: e.target.value}
        );
    }

    handleTypeChange(e)
    {
        console.log(e.target.value);
        this.setState(
            { type: e.target.value}
        );

    }
    
    handleSizeChange(e)
    {
        this.setState({
            size: e.target.value
        });
    }

    handleBoothChange(e)
    {
        console.log(e.target.value);
        this.setState({
            boothName: e.target.value
        });
    }

    handleDateChange(datePicked)
    {
        // const convertedDate = datePicked.getDate() +'/'+ datePicked.getMonth() +'/'+ datePicked.getFullYear();
        //console.log(convertedDate);
        this.setState({
            date: datePicked
        })
    }

    componentDidMount()
    {
        BoothService.getAllBooths().then((res)=>{
            this.setState({booths: res.data})
        });
        
    }

    cancel()
    {
        this.props.history.push('/')
    }

    getBoothByType(type)
    {
        BoothService.getAllFactories(type).then((res)=>{
            this.setState({booths: res.data})
        });
    }



    proceed(e)
    {
        e.preventDefault();
        let order = {
             
            type: this.state.type,
            size: this.state.size,
            boothName: this.state.boothName,
            quantity: this.state.quantity,
            date: this.state.date,
            dis_id: this.state.dis_id
            
        };

        console.log('order =>' + JSON.stringify(order));
        
        if(this.state.type!=='' && this.state.size!=='' && this.state.boothName!=='' && this.state.date!=='')
        {
            DistributorService.placeOrder(order).then(res => {
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
    
    DropDownOptions={
        typeOptions:['-- Select type of order --','Send','Receive','Refill','Restock'],
        SizeOptions: ['-- Select size of cylinder --','Small','Large']
    }

    

    render() {
        
        
        
        

        return (
            <div>
                    <div className = "container">
                            <div className = "form-holder">
                                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                                            <h3 className="text-center">Place an Order</h3>
                                            <div className="card-body">
                                                <form>
                                                    
                                                    <div className = "form-group"> 
                                                        <label> Type: </label>
                                                        <span style={{padding:"0.5em"}}>
                                                            <select onChange={this.handleTypeChange}>
                                                                {
                                                                    this.DropDownOptions.typeOptions.map(
                                                                        (aType) =>
                                                                        (
                                                                            <option value={aType}>{aType}</option>
                                                                        )
                                                                    )
                                                                }
                                                            </select>
                                                        </span>
                                                        
                                                        
                                                    </div>
                                                    
                                                    <div className = "form-group">     
                                                        <label> Size: </label>                                                            
                                                        <span style={{padding:"0.5em"}}>
                                                            <select onChange={this.handleSizeChange}>
                                                                {
                                                                    this.DropDownOptions.SizeOptions.map
                                                                    (
                                                                        (aSize) =>
                                                                        (
                                                                            <option value={aSize}>{aSize}</option>
                                                                        )
                                                                    )
                                                            }
                                                            </select>
                                                        </span>
                                                        

                                                    </div>

                                                    <div className = "form-group">     
                                                        <label> Booth Name: </label>
                                                        <span style={{padding:"0.5em"}}>
                                                            <select onChange={this.handleBoothChange}>
                                                                <option value="-- Select a booth --">-- Select a booth --</option>
                                                                {
                                                                    this.state.booths.map
                                                                    (
                                                                        (aBooth) =>
                                                                        (
                                                                            <option value={aBooth.name}>{aBooth.name}</option>
                                                                        )
                                                                    )
                                                            }
                                                            </select>
                                                        </span>
                                                        
                                                    </div>

                                                    <div className = "form-group">     
                                                        <label> Quantity: </label>
                                                        <input placeholder="Enter Quantity" name="quantity" className="form-control"
                                                             onChange={this.handleQuantityChange}/>
                                                    </div>

                                                    <div className = "form-group">     
                                                        <label>Date: </label>
                                                        <span style={{padding:"0.5em"}}>
                                                            <DatePicker 
                                                                selected={this.state.date} 
                                                                onChange={date => this.handleDateChange(date)} 
                                                                dateFormat = 'dd/MM/yyyy'
                                                                isClearable
                                                            />
                                                        </span>
                                                    </div>

                                                    <button className = "btn btn-success" onClick={this.proceed}>Proceed</button>
                                                    <button className = "btn btn-danger"  style={{marginLeft:"10px"}} onClick={this.cancel}>Cancel</button>    
                                                </form>
                                            </div>
                                    </div>
                            </div>
                    </div>
            </div>
        );
    }

}

export default MakeOrderForm;