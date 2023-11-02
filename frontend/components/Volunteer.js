import React from 'react'
import axios from 'axios'

class Volunteer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            staffId:"",
            name:"",
            email:"",
            volunteer:"",
            staff:"",
            streetAddress:"",
            city:"",
            state:"",
            zipcode:""
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(event) {
        event.preventDefault();
        const volunteer = {
            staffId:this.state.staffId,
            name:this.state.name,
            email:this.state.email,
            volunteer:this.state.volunteer,
            staff:this.state.staff,
            streetAddress:this.state.streetAddress,
            city:this.state.city,
            state:this.state.state,
            zipcode:this.state.zipcode
        }
        axios.post("http://localhost:3305/volunteers/add", volunteer)
            .then(response => {
                document.getElementById("confirmation").hidden = false;
                document.getElementById("backToForm").hidden = false;
                document.getElementById("again").hidden = false;
            })
            .catch(error => {
                document.getElementById("confirmation").innerHTML = "There was an error adding a volunteer!";
                document.getElementById("confirmation").style.color = "red";
                document.getElementById("confirmation").hidden = false;
                document.getElementById("backToForm").hidden = false;
                document.getElementById("again").hidden = false;
            })
            
        console.log(volunteer);
        document.getElementById("confirmation").hidden = false;
        document.getElementById("backToForm").hidden = false;
        document.getElementById("again").hidden = false;
        document.querySelector("#idField").value = "";
        document.querySelector("#nameField").value = "";
        document.querySelector("#emailField").value = "";
        document.querySelector("#positionField").value = "";
        document.querySelector("#streetAddress").value = "";
        document.querySelector("#city").value = "";
        document.querySelector("#state").value = "";
        document.querySelector("#zipcode").value = "";
    }
    render() {
        document.querySelector("head > title").innerHTML = "Add Volunteer";
        document.body.setAttribute("id", "formBody");
        return(
            <center>
                <div id="formContent">
                    <div id="text">
                        <h1 className="title">Volunteer</h1>
                        <form>
                        <div className="question">
                                <h2 className="questionHeader">Enter a staff ID:</h2>
                                <input className="input" id="idField" onChange={(event)=>{this.setState({staffId:event.target.value})}}/>
                            </div>
                            <h2 style={{fontSize:"60px"}}> </h2>
                            <div className="question">
                                <h2 className="questionHeader">Volunteer Name:</h2>
                                <input className="input" id="nameField" onChange={(event)=>{this.setState({name:event.target.value})}}/>
                            </div>
                            <h2 style={{fontSize:"60px"}}> </h2>
                            <div className="question">
                                <h2 className="questionHeader">Email:</h2>
                                <input className="input" id="emailField" onChange={(event)=>{this.setState({email:event.target.value})}}/>
                            </div>
                            <h2 style={{fontSize:"60px"}}> </h2>
                            <div className="question">
                                <h2 className="questionHeader">Are you a volunteer, a staff member, or both?</h2>
                                <select className="dropdown" id="positionField" onChange={(event)=>{if(event.target.value=="Volunteer"){this.setState({volunteer:"y"});this.setState({staff:"n"});}if(event.target.value=="Staff"){this.setState({staff:"y"});this.setState({volunteer:"n"});}if(event.target.value=="Both"){this.setState({volunteer:"y"});this.setState({staff:"y"})}}}>
                                    <option value="" style={{color:"gray"}} disabled selected>Choose an option</option>
                                    <option value="Volunteer">Volunteer</option>
                                    <option value="Staff">Staff</option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>
                            <h2 style={{fontSize:"60px"}}> </h2>
                            <div className="question">
                                <h2 className="questionHeader">Street Address:</h2>
                                <input className="input" id="streetAddress" onChange={(event)=>{this.setState({streetAddress:event.target.value})}}/>
                            </div>
                            <div className="question">
                                <h2 className="questionHeader">City:</h2>
                                <input className="input" id="city" onChange={(event)=>{this.setState({city:event.target.value})}}/>
                            </div>
                            <div className="question">
                                <h2 className="questionHeader">State:</h2>
                                <input className="input" id="state" onChange={(event)=>{this.setState({state:event.target.value})}}/>
                            </div>
                            <div className="question">
                                <h2 className="questionHeader">Zip Code:</h2>
                                <input className="input" type="number" id="zipCode" onChange={(event)=>{this.setState({zipcode:event.target.value})}}/>
                            </div>
                        </form>
                        <h2 style={{fontSize:"60px"}}> </h2>
                        <button type="submit" id="submitBtn" onClick={this.onSubmit}>Submit</button>
                        <h2 id="confirmation" style={{color:"green"}} hidden>Volunteer successfully added!</h2>
                        <a href="#/form" id="backToForm" hidden><button>Go Back To Form</button></a>
                        <a onClick={()=>{window.location.reload();}} id="again" hidden><button>Add Another Volunteer</button></a>
                    </div>
                </div>
            </center>
        );
    }
}
export default Volunteer;
