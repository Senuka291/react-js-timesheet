import React from 'react'
import axios from "axios"
import "./Grant.css"
class Grant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grantId:"",
            category:"",
            name:"",
            description:"",
            startDate:"",
            dueDate:""
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(event) {
        event.preventDefault();
        const grant = {
            grantId:this.state.grantId,
            category:this.state.category,
            name:this.state.name,
            description:this.state.description,
            startDate:this.state.startDate,
            dueDate:this.state.dueDate
        }
        axios.post("http://localhost:3305/grants/add", grant)
            .then(response => {
                document.getElementById("confirmation").hidden = false;
                document.getElementById("backToForm").hidden = false;
                document.getElementById("again").hidden = false;
            })
            .catch(error => {
                document.getElementById("confirmation").innerHTML = "There was an error adding your grant!";
                document.getElementById("confirmation").style.color = "red";
                document.getElementById("confirmation").hidden = false;
                document.getElementById("backToForm").hidden = false;
                document.getElementById("again").hidden = false;
            })
            document.getElementById("confirmation").hidden = false;
            document.getElementById("backToForm").hidden = false;
            document.getElementById("again").hidden = false;
            document.querySelector("#idField").value = "";
            document.querySelector("#categoryField").value = "";
            document.querySelector("#nameField").value = "";
            document.querySelector("#description").value = "";
            document.querySelector("#startDate").value = "";
            document.querySelector("#dueDate").value = "";
        console.log(grant);
    }
    render() {
        document.querySelector("head > title").innerHTML = "Add Grant";
        document.body.setAttribute("id", "formBody");
        return(
            <center>
                <div id="formContent">
                    <div id="text">
                        <h1 className="title">Grant</h1>
                        <form>
                            <div className="question">
                                <h2 className="questionHeader">Enter a grant ID:</h2>
                                <input className="input" id="idField" onChange={(event)=>{this.setState({grantId:event.target.value});console.log(this.state)}}/>
                            </div>
                            <h2 style={{fontSize:"60px"}}> </h2>
                            <div className="question">
                                <h2 className="questionHeader">Grant Category:</h2>
                                <input className="input" id="categoryField" onChange={(event)=>{this.setState({category:event.target.value})}}/>
                            </div>
                            <h2 style={{fontSize:"60px"}}> </h2>
                            <div className="question">
                                <h2 className="questionHeader">Grant Name:</h2>
                                <input className="input" id="nameField" onChange={(event)=>{this.setState({name:event.target.value})}}/>
                            </div>
                            <h2 style={{fontSize:"60px"}}> </h2>
                            <div className="question">
                                <h2 className="questionHeader">Grant Description:</h2>
                                <input className="input" id="description" onChange={(event)=>{this.setState({description:event.target.value})}}/>
                            </div>
                            <h2 style={{fontSize:"60px"}}> </h2>
                            <div className="question">
                                <h2 className="questionHeader">Start Date:</h2>
                                <input className="input" type="date" id="startDate" onChange={(event)=>{this.setState({startDate:event.target.value})}}/>
                            </div>
                            <h2 style={{fontSize:"60px"}}> </h2>
                            <div className="question">
                                <h2 className="questionHeader">Due Date:</h2>
                                <input className="input" type="date" id="dueDate" onChange={(event)=>{this.setState({dueDate:event.target.value})}}/>
                            </div>
                        </form>
                        <h2 style={{fontSize:"60px"}}> </h2>
                        <button type="submit" id="submitBtn" onClick={this.onSubmit}>Submit</button>
                        <h2 id="confirmation" style={{color:"green"}} hidden>Grant successfully added!</h2>
                        <a href="#/form" id="backToForm" hidden><button>Go Back To Form</button></a>
                        <a onClick={()=>{window.location.reload();}} id="again" hidden><button>Add Another Grant</button></a>
                    </div>
                </div>
            </center>
        );
    }
}
export default Grant;
