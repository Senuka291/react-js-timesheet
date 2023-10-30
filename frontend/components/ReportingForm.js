import React from 'react'
import './ReportingForm.css'
import axios from "axios";
class ReportingForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            staffId:"",
            date:"",
            isVolunteer:"",
            isStaff:"",
            meals:"",
            lodging:"",
            workDescription:"",
            grants:2
        }
        this.changeGrant = this.changeGrant.bind(this);
        this.addGrantEventListener = this.addGrantEventListener.bind(this);
        this.addGrant = this.addGrant.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        localStorage.setItem("addGrantNum", "0")
        document.querySelector("head > title").innerHTML = "Timesheet Reporting Form";
        axios.get("http://localhost:3305/volunteers")
            .then(response => {
                response.data.forEach(element => {
                    document.getElementById("names").innerHTML += `<option value="${element["name"]}">${element["name"]}</option>`
                })
                document.getElementById("names").children[0].selected = true;
            })
        axios.get("http://localhost:3305/grants")
            .then(response => {
                response.data.forEach(element => {
                    document.querySelectorAll(".grantType").forEach((item) => {
                        item.innerHTML += `<option value="${element["name"]}">${element["name"]}</option>`
                        // item.innerHTML = "<option value=''>Choose an option</option>"+item.innerHTML;
                    })
                })
            })
    }
    changeGrant = (event) => {
        var selectedIndex = 0;
        for(var i=0;i<document.querySelectorAll("#grantType option").length;i++){
            if(document.querySelectorAll("#grantType option")[i].innerHTML==event.target.value){
                selectedIndex=i;
                break;
            }
        }
        localStorage.setItem("grantIds", [event.target.value]);
            if(event.target.value=="FDCP"){
                document.getElementById("grant").innerHTML += `<div class="question">
                <h2 class="questionHeader">Enter the total amount of time helped</h2>
                <h4 class="addOns">Only enter if you have any of the time related to Dane County Parks (Lussier Family Heritage Center, ...)
    Enter "0" if you have no time. If you have time, please enter a description below.</h4>
    <input class="hours" style="height:36px;"id="fdcpTime" type="number" min="0" placeholder="Hours"/>
            </div>
            <div class="question">
                <h2 class="questionHeader">Category for time spent</h2>
                <h4 class="addOns">If you have anytime for FDCP, you MUST select a category about what you did for Timesheet to get credit on grants. </h4>
                <input type="checkbox"  value="" class="category"/>
                <label>Coordinated or Attended Events</label>
                <p></p>
                <input type="checkbox"  value="" class="miles"/>
                <label>Managed Reservations</label>
                <p></p>
                <input type="checkbox" />
                <label>Coordinated or maintained Equipment or Equipment Checkout/in</label>
                <p></p>
                <input type="checkbox" />
                <label>Coordinating grant, technology, marketing</label>
                <p></p>
                <input type="checkbox" />
                <label>Other:</label>
                <textarea style="height:36px;"></textarea>
                <p></p>
            </div>`;
            }
            else {
                document.getElementById("grant").innerHTML += `                                    <div id="otherChange">
                <div class='question'>
                    <h2 class="questionHeader"><strong>(${event.target.value})</strong> Total amount of time helped with on this date?</h2>
                    <h4 class="addOns"><strong>Enter "0"</strong> if you have no time. <i>If you have time, please enter a description below.</i></h4>
                    <input class="hours" style="height:36px;"id="${event.target.value.toLowerCase()+"Time"}" type="number" min="0" placeholder="Hours"/></div>
                <div class="question">
                    <h2 class="questionHeader"><strong>(${event.target.value})</strong> - Describe what you did or completed.</h2>
                    <h4 class="addOns">If you have anytime, <u>you <strong>MUST</strong> enter what you did to get credit on grants.</u></h4>
                    <textarea class="category" style="height:36px;"id="${event.target.value.toLowerCase()+"Completed"}"></textarea></div>
                <div class="question">
                    <h2 class="questionHeader"><strong>(${event.target.value})</strong> Total # of ${event.target.value} miles traveled on this date -GRANT PURPOSES Only</h2>
                    <input class="miles" style="height:36px;"id="${event.target.value.toLowerCase()+"Miles"}"class="input"/>
                </div>
            </div>`;
            }
            document.querySelector("#grantType").selectedIndex = selectedIndex;
    }
    addGrant(event) {
        event.preventDefault();
        if(event.target.value=="Yes"){
            this.setState({grants:this.state.grants+1});
            var addGrantNum = parseInt(localStorage.getItem("addGrantNum"));
            localStorage.setItem("addGrantNum", (addGrantNum+1).toString());
            addGrantNum = parseInt(localStorage.getItem("addGrantNum"));
            document.querySelectorAll(".addGrant")[addGrantNum].innerHTML += `                            <div class="addGrantContent">
            <div class='question'>    <h2 class="questionHeader">Grant ${this.state.grants}</h2>
                <strong>The following are abbreviations used for specific grants.</strong>
                <h2></h2><select style="height:36px;" class="dropdown grantType" onChange={this.changeGrant} >
                <option value="" style={{color:"gray"}} disabled selected hidden>Grant Type</option>
                </select>
                <ul>
                    <li><strong>Foundation for Dane County Parks (FDCP)</strong></li>
                    <li><strong>Recruitment, Retention, Reactivation  ( R3 )</strong><a href="https://docs.google.com/document/d/e/2PACX-1vRC7nl9Gc_QyHCXhTfZKducjvzRfw4xF-CZebh_E_eO4ol5F2INpfvA0FfvDu1MQKX24poRgMpHEfbS/pub">See R3 document for more details</a> Anything to do with fishing/angling and hunting/shooting</li>
                    <li><strong>Spinal Cord Injury (SCI)</strong></li>
                </ul> 
            </div>
        </div></div>`;
            
            event.target.value = "";

            axios.get("http://localhost:3305/grants")
            .then(response => {
                response.data.forEach(element => {
                    document.querySelectorAll(".grantType")[document.querySelectorAll(".grantType").length-1].innerHTML += `<option value="${element["name"]}">${element["name"]}</option>`;
                })
            })

        }
    }
    onSubmit(event) {
        event.preventDefault();
        var formData = {};
        for(var i=0;i<this.state.grants;i++){
            formData = {
                staffId:this.state.staffId,
                date:this.state.date,
                isVolunteer:this.state.isVolunteer,
                isStaff:this.state.isStaff,
                grantId:localStorage.getItem("grantIds").split(",")[i],
                hours:document.getElementsByClassName("hours")[i].value,
                miles:document.getElementsByClassName("miles")[i].value,
                meals:this.state.meals,
                lodging:this.state.lodging,
                workDescription:this.state.workDescription,
                grantCategory:document.getElementsByClassName("category")[i].value
            }
            console.log(formData);
            //Check if all data was entered
            document.querySelectorAll("[required='']").forEach((item)=> {
                if(item.value==""){
                    document.getElementById("error").hidden = false;
                }
            })
            if(document.getElementById("error").hidden){
                axios.post("http://localhost:3305/reporting/add", formData)
                    .then(response => {
                        console.log(response);
                        document.getElementById("confirmation").hidden = false;
                    })
                    .catch(error => {
                        console.log(error);
                        document.getElementById("confirmation").innerHTML = "There was an error submitting your form!";
                        document.getElementById("confirmation").style.color = "red";
                        document.getElementById("confirmation").hidden = false;
                    })
                document.getElementById("confirmation").hidden = false;
            }
        }
    }
    removeNameDuplicates() {
        const options = []
        document.querySelectorAll('#names > option').forEach((option) => {
            if (options.includes(option.value)) option.remove()
            else options.push(option.value)
        })
    }
    removeGrantDuplicates() {
        const options = []
        document.querySelectorAll('#grantType > option').forEach((option) => {
            if (options.includes(option.value)) option.remove()
            else options.push(option.value)
        })
    }
    addGrantEventListener = () => {
        document.querySelectorAll('.grantType').forEach((option)=>{
            if(option.id!="grantType"){
                
            option.onchange = function(event) {
                var selectedIndex = 0;
                for(var i=0;i<document.querySelectorAll("#grantType option").length;i++){
                    if(document.querySelectorAll("#grantType option")[i].innerHTML==event.target.value){
                        selectedIndex=i;
                        break;
                    }
                }
                localStorage.setItem("grantIds", localStorage.getItem("grantIds").split(",").concat([event.target.value]));
        var addGrantNum = parseInt(localStorage.getItem("addGrantNum"));
        if(event.target.value=="FDCP"){
            document.querySelectorAll(".addGrant")[addGrantNum].innerHTML += `<div class="question">
            <h2 class="questionHeader">Enter the total amount of time helped</h2>
            <h4 class="addOns">Only enter if you have any of the time related to Dane County Parks (Lussier Family Heritage Center, ...)
Enter "0" if you have no time. If you have time, please enter a description below.</h4>
<input id="fdcpTime" class="hours" style="height:36px;" type="number" min="0" placeholder="Hours"/>
        </div>
        <div class="question">
            <h2 class="questionHeader">Category for time spent</h2>
            <h4 class="addOns">If you have anytime for FDCP, you MUST select a category about what you did to get credit on grants. </h4>
            <input type="checkbox"  value="" class="category"/>
            <label>Coordinated or Attended Events</label>
            <p></p>
            <input type="checkbox"  value="" class="miles"/>
            <label>Managed Reservations</label>
            <p></p>
            <input type="checkbox" />
            <label>Coordinated or maintained Equipment or Equipment Checkout/in</label>
            <p></p>
            <input type="checkbox" />
            <label>Coordinating grant, technology, marketing</label>
            <p></p>
            <input type="checkbox" />
            <label>Other:</label>
            <textarea style="height:36px;"></textarea>
            <p></p>
        </div>`;
        }
        else {
            document.querySelectorAll(".addGrant")[addGrantNum].innerHTML += `                                    <div id="otherChange">
            <div class='question'>
                <h2 class="questionHeader"><strong>(${event.target.value})</strong> Total amount of time helped with on this date?</h2>
                <h4 class="addOns"><strong>Enter "0"</strong> if you have no time. <i>If you have time, please enter a description below.</i></h4>
                <input class="hours" style="height:36px;" class="hours" id="${event.target.value.toLowerCase()+"Time"}" type="number" min="0" placeholder="Hours"/></div>
            <div class="question">
                <h2 class="questionHeader"><strong>(${event.target.value})</strong> - Describe what you did or completed.</h2>
                <h4 class="addOns">If you have anytime, <u>you <strong>MUST</strong> enter what you did to get credit on grants.</u></h4>
                <textarea class="category" style="height:36px;" class="category" id="${event.target.value.toLowerCase()+"Completed"}"></textarea></div>
            <div class="question">
                <h2 class="questionHeader"><strong>(${event.target.value})</strong> Total # of ${event.target.value} miles traveled on this date -GRANT PURPOSES Only</h2>
                <input class="miles" style="height:36px;" class="miles" id="${event.target.value.toLowerCase()+"Miles"}"class="input"/>
            </div>
        </div>`;
        }
        document.querySelectorAll(".grantType")[document.querySelectorAll(".grantType").length-1].selectedIndex = selectedIndex;
                    
            }}
        })
    }
    // updateGrant() {
    //     var inner =document.querySelector("#grantType")==null?"":document.querySelector("#grantType").value;
    //     document.querySelectorAll(".otherGrant").forEach((item) => {
    //         item.innerHTML = inner;
    //     })
    // }
    render(){
        setInterval(this.removeNameDuplicates, 100)
        setInterval(this.addGrantEventListener, 100);
        setInterval(this.removeGrantDuplicates, 100);
        // setInterval(this.updateGrant, 100);
        document.body.setAttribute("id", "formBody");

        return(
            <center>
                <div id="formContent">
                    <div id="text">
                        <center><h1 className="title" style={{marginRight:"150px"}}>Timesheet Reporting Form</h1></center>
                        <div style={{width:"800px"}}><i>We need to keep track of our time and other information to report back to our grantors. Please do your best to report your time (paid and volunteer) and  In-Kind/reimbursed  mileage and expenses!</i></div>
                        <form>
                            <div class="question">
                                <h2 class="questionHeader">Select your name from the spreadsheet</h2>
                                <h4 class="addOns">If your name is not listed then please contact an administrator.</h4>
                                <select class="dropdown" onChange={(event)=>{this.setState({staffId:event.target.value})}}id="names" required>
                                    <option value="" style={{color:"gray"}} disabled selected>Choose an option</option>
                                </select>
                            </div>
                            <div class="question">
                                <h2 style={{fontWeight:"bold"}} class="questionHeader">Date Helped:</h2>
                                <input type="date" style={{height:"36px"}} onChange={(event)=>{this.setState({date:event.target.value})}} required/>
                            </div>
                            <div class="question">
                                <h2 class="questionHeader" style={{fontWeight:"bold"}}>Total amount of time helped?</h2>
                                <input style={{height:"36px"}} onChange={(event)=>{this.setState({totalTime:event.target.value})}} type="number" min="0" oninput={()=>this.value = Math.abs(this.value)} placeholder="Hours"/>
                            </div>
                            <div className="question">
                                <h2 className="questionHeader">Are you a volunteer, a staff member, or both?</h2>
                                <select className="dropdown" id="positionField" onChange={(event)=>{if(event.target.value=="Volunteer"){this.setState({isVolunteer:"y"});this.setState({isStaff:"n"});}if(event.target.value=="Staff"){this.setState({isStaff:"y"});this.setState({isVolunteer:"n"});}if(event.target.value=="Both"){this.setState({isVolunteer:"y"});this.setState({isStaff:"y"})}}}>
                                    <option value="" style={{color:"gray"}} disabled selected>Choose an option</option>
                                    <option value="Volunteer">Volunteer</option>
                                    <option value="Staff">Staff</option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>
                            <div class="question">
                                <h2 class="questionHeader" style={{fontWeight:"bold"}}>Total # of miles traveled on this date.</h2>
                                <div style={{width:"800px"}}><h4 class="addOns">FOR GRANT PURPOSES Only -  Reach out to Leadership if you have questions. This is "In-Kind" and reimbursements. All reimbursable expenses must approved prior to the expense and then go through the reimbursement process and submitted to the Treasurer. </h4></div>
                                <input class="input" onChange={(event)=>{this.setState({milesTraveled:event.target.value})}} required/>
                            </div>
                            <div class="question">
                                <h2 class="questionHeader" style={{fontWeight:"bold"}}>Total amount for overnight stay (lodging only) on this date to report.</h2>
                                <div style={{width:"800px"}}><h4 class="addOns">FOR GRANT PURPOSES Only -  Reach out to Leadership if you have questions. This is "In-Kind" and reimbursements. All reimbursable expenses must approved prior to the expense and then go through the reimbursement process and submitted to the Treasurer. </h4></div>
                                <input class="input" onChange={(event)=>{this.setState({lodging:event.target.value})}} required/>
                            </div>
                            <div class="question">
                                <h2 class="questionHeader" style={{fontWeight:"bold"}}>Total amount for meals on this date to report. </h2>
                                <div style={{width:"800px"}}><h4 class="addOns">FOR GRANT PURPOSES Only -  Reach out to Leadership if you have questions. This is "In-Kind" and reimbursements. All reimbursable expenses must approved prior to the expense and then go through the reimbursement process and submitted to the Treasurer. </h4></div>
                                <input class="input" onChange={(event)=>{this.setState({meals:event.target.value})}} required/>
                            </div>
                                                        <div class="question">
                                <h2 class="questionHeader">Work Completed:</h2>
                                <textarea style={{height:"100px", width:"300px"}}onChange={(event)=>{this.setState({workDescription:event.target.value});}}/>
                            </div>
                            <div id="grant">
                                <div class="question">
                                    <h2 class="questionHeader">GRANT Reporting Requirements</h2>
                                    <strong>The following are abbreviations used for specific grants.</strong>
                                    <h2></h2>
                                    <select class="dropdown grantType" id="grantType" selected={this.state.grant1} style={{height:"36px"}} onChange={this.changeGrant}>
                                        <option value="" style={{color:"gray"}} selected>Choose an option</option>
                                        {/* <option value="" style={{color:"gray"}} disabled selected hidden>Grant Type</option> */}
                                    </select>
                                </div>
                            </div>
                            {/* <div class="question">
                                <h2 class="questionHeader">Category Comments:</h2>
                                <textarea onChange={(event)=>{this.setState({categoryComments:event.target.value})}} style={{width:"200px", height:"50px"}}/>
                            </div> */}

                                                        
                                                        <div id="addGrant"></div>
                                                        <div class="addGrant"></div>
                                                        <div class="addGrant"></div>
                                                        <div class="addGrant"></div>
                                                        <div class="addGrant"></div>
                                                        <div class="addGrant"></div>
                                                        <div class="addGrant"></div>
                                                        <div class="addGrant"></div>
                                                        <div class="addGrant"></div>
                            <div class="question">
                                <h2 class="questionHeader">Would you like to add another grant?</h2>
                                <select class="dropdown" onChange={this.addGrant}>
                                    <option value="">Choose an option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div class="question">
                                <h2 class="questionHeader">Category Comments:</h2>
                                <textarea style={{height:"100px", width:"300px"}}onChange={(event)=>{this.setState({categoryComments:event.target.value});}}/>
                            </div>



                            <h2 style={{fontSize:"35px"}}> </h2>
                            <button id="submitBtn" onClick={this.onSubmit}>Submit</button>
                            <h2 id="confirmation" style={{color:"green"}} hidden>Form successfully submitted!</h2>
                            <h2 id="error" style={{color:'red'}} hidden>Please enter the required fields!</h2>
                        </form>
                    </div></div></center>
        );
    }
}
export default ReportingForm;
