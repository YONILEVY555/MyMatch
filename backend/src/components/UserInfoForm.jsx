// import React, { Component } from 'react'
// import {withRouter} from 'react-router-dom';

// class UserInfoForm extends Component {

//     constructor(props){
//         super(props)

//             this.state = {
//                           id: props.user.id,
//                           username: props.user.username,
//                           gender: props.user.gender,
//                           date: props.user.date,
//                           phoneNumber: props.user.phoneNumber,
//                           email: props.user.email
//             }
//     }

//     componentWillReceiveProps(nextProps) {
//         this.setState({
//                         id: nextProps.user.id,
//                         username: nextProps.user.username,
//                         gender: nextProps.user.gender,
//                         date: nextProps.user.date,
//                         phoneNumber: nextProps.user.phoneNumber,
//                         email: nextProps.user.email
//         })        
//     }

//     handleChange = (event) => {
//         this.setState({
//             [event.target.name] : event.target.value
//         })

//     }

//     onSubmit = () =>{

//       const user = this.state
//       const id = this.state.id

//       if(this.state.id == 0)
//         this.props.btnClick(user)
//       else
//         this.props.btnClick(user,id)

//     }

//     render() {

//         return (

//                  <section class="vh-100 gradient-custom">
//                    <div class="container py-5 h-100">
//                      <div class="row justify-content-center align-items-center h-100">
//                        <div class="col-12 col-lg-9 col-xl-7">
//                          <div class="card shadow-2-strong card-registration">
//                            <div class="card-body p-4 p-md-5">
//                              <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">{this.props.title}</h3>
//                              <form>
                 
//                                <div class="row">
//                                  <div class="col-md-6 mb-4">
                 
//                                    <div class="form-outline">
                 
//                                      <input 
//                                          type="text" 
//                                          id="username" 
//                                          class="form-control form-control-lg" 
//                                          onChange={this.handleChange}
//                                          name="username"
//                                          value={this.state.username} />
                 
//                                      <label class="form-label" for="username">שם פרטי</label>
                 
//                                    </div>
                 
//                                  </div>
//                                </div>
                 
//                                <div class="row">
//                                  <div class="col-md-6 mb-4 d-flex align-items-center">
                 
//                                    <div class="form-outline datepicker w-100">
                 
//                                      <input
//                                      type="date"
//                                      class="form-control form-control-lg"
//                                      id="birthdayDate"
//                                      onChange={this.handleChange}
//                                      name="date"
//                                      value={this.state.date} />
                 
//                                      <label for="birthdayDate" class="form-label">תאריך יום הולדת</label>
                 
//                                    </div>
                 
//                                  </div>
                 
//                                 <div class="col-md-6 mb-4">
                 
//                                    <h6 class="mb-2 pb-1">מגדר: </h6>
                 
//                                    <div class="form-check form-check-inline">
                 
//                                      <input
//                                          class="form-check-input"
//                                          type="radio"
//                                          name="gender"
//                                          ref="femaleGender"
//                                          value="female"
//                                          checked = {this.state.gender === "female" }
//                                          onChange={this.handleChange}/>
                 
//                                      <label class="form-check-label" for="femaleGender">נקבה</label>
//                                    </div>
                 
//                                    <div class="form-check form-check-inline">
//                                      <input
//                                        class="form-check-input"
//                                        type="radio"
//                                        name="gender"
//                                        ref="maleGender"
//                                        value="male"
//                                        checked = {this.state.gender === "male" }
//                                        onChange={this.handleChange}
//                                      />
//                                      <label class="form-check-label" for="maleGender">זכר</label>
//                                    </div>
                 
//                                  </div>
//                                </div>
                 
//                                <div class="row">
//                                  <div class="col-md-6 mb-4 pb-2">
                 
//                                    <div class="form-outline">
                 
//                                      <input 
                                      
//                                          type="email" 
//                                          id="emailAddress" 
//                                          class="form-control form-control-lg" 
//                                          onChange={this.handleChange}
//                                          name="email"
//                                          value={this.state.email} />
                 
//                                      <label class="form-label" for="emailAddress">כתובת אימייל</label>
//                                    </div>
                 
//                                  </div>
//                                  <div class="col-md-6 mb-4 pb-2">
                 
//                                    <div class="form-outline">
                 
//                                      <input 
                 
//                                          type="tel" 
//                                          id="phoneNumber"
//                                          class="form-control form-control-lg"
//                                          onChange={this.handleChange}
//                                          name="phoneNumber"
//                                          value={this.state.phoneNumber}/>
                 
//                                      <label class="form-label" for="phoneNumber">מספר פלאפון</label>
//                                    </div>
                 
//                                  </div>
//                                </div>
                 
//                                <div class="row">
//                                  <div class="col-12">
                 
//                                      <div class="input-group mb-3">
//                                          <label class="input-group-text" for="inputGroupFile01">העלאה</label>
//                                          <input type="file" class="form-control" id="inputGroupFile01" onChange={this.handleChange}/>
//                                      </div>
                 
//                                  </div>
//                                </div>
                 
//                                <div class="mt-4 pt-2">
//                                  <input class="btn btn-primary btn-lg" type="button" value={this.props.btnTxt} onChange={this.handleChange} onClick={this.onSubmit}/>
//                                </div>
                 
//                              </form>
//                            </div>
//                          </div>
//                        </div>
//                      </div>
//                    </div>
//                  </section>
                 
//         )
//     }
// }

// export default withRouter(UserInfoForm) 

