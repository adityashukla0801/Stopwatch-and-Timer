import React, { Component } from 'react';
import swal from 'sweetalert'

export class Ui extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag1: true,
      flag2: true,
      sec: 0,
      min: 0,
      miliSec: 0,
      min1: 0,
      sec1: 0,
      value:'',
    };
  }

  handleStopwatch = () => {
    this.setState({
      flag1: !this.state.flag1,
    } ,()=>{
      if(!this.state.flag1){
          let clrInt = setInterval(() => {
          this.setState({
            miliSec: this.state.miliSec + 1
          })
          localStorage.setItem('intvalId', clrInt)
          if(this.state.miliSec===100){
            this.setState({
              miliSec: 0,
              sec: this.state.sec + 1
            }) 
            if(this.state.sec === 60){
              this.setState({
                miliSec: 0,
                sec: 0,
                min: this.state.min + 1
              }) 
            }
          }
        }, 10);
      } else {
        let clrInt = localStorage.getItem('intvalId')
        clearInterval(clrInt)
      }
    });
  };
  resetWatch = () =>{
    this.setState({
      min:0,
      sec: 0,
      miliSec:0,
      flag1: true,
    })
    let clrInt = localStorage.getItem('intvalId')
    clearInterval(clrInt)
  }
      
  handleTimer = () => {
    if(this.state.value>0){        
    this.setState({
      flag2: !this.state.flag2,
    },()=> {
      if(!this.state.flag2){
        this.setState({
         min1:this.state.value,
        },()=>{
          if(this.state.min1 > 0){
            this.setState({
              min1: this.state.min1-1 ,
              sec1: 59
            },()=>{
              let setInt = setInterval(()=>{
                this.setState({
                  sec1:this.state.sec1 - 1

                })
                localStorage.setItem('setId',setInt)
                if(this.state.sec1<0 && this.state.min1 > 0){
                  this.setState({
                    min1:this.state.min1 - 1,
                    sec1: 59
                  })
                }
                if(this.state.sec1<0 && this.state.min1 === 0){
                  this.setState({
                    sec1: 0,
                    min1: 0
                  },()=>{
                    swal("Time Out!", "", "success");
                  let setInt = localStorage.getItem('setId')
                  clearInterval(setInt)
                  }) 
                  
                }            
                },1000)
            })
       }
      })
      } else{
        let setInt = localStorage.getItem('setId')
        clearInterval(setInt)
      }
    })
  }else{
    swal("Warning", "Please Enter Minutes!", "warning");
  }

  }

  resetTimer = () =>{
    this.setState({
      min1:0,
      sec1: 0,
      flag2: true,
    })
    let setInt = localStorage.getItem('intvalId')
    clearInterval(setInt)
  }

  handleInput = (e) => {
      this.setState({
        value: e.target.value
      })
  }

  
  render() {
    return (
      <div className='container'>
        <div className='sub-container'>
          <div>
            <h1 className="border-bottom border-danger p-1">Stopwatch</h1>
            <p className="my-5">
              <span className='display-1'>{this.state.min} : </span>
              <span className='display-3'>{this.state.sec} : </span>
              <span className='display-4'>{this.state.miliSec}</span>
            </p>
            {this.state.flag1 ? (
              <button
                onClick={this.handleStopwatch}
                type='button'
                className='btn btn-primary mx-2 px-5 rounded-pill'
              >
                Start
              </button>
            ) : (
              <button
                onClick={this.handleStopwatch}
                type='button'
                className='btn btn-danger mx-2 px-5 rounded-pill'
              >
                Stop
              </button>
            )}
            <button onClick={this.resetWatch} type='button' className='btn btn-secondary mx-2 px-5 rounded-pill'>
              Reset
            </button>
           
          </div>
          <div>
            <h1 className="border-bottom border-danger p-1 mb-5">Timer</h1>
            <input type="number" onChange={this.handleInput} className="form-control my-1 rounded border-success" placeholder="Enter Minutes" ></input>
            <p>
              <span className='display-1'>{this.state.min1} : </span>
              <span className='display-3'>{this.state.sec1}  </span>
            </p>
            {this.state.flag2 ? (
              <button
                onClick={this.handleTimer}
                type='button'
                className='btn btn-success mx-2 px-5 rounded-pill'
              >
                Start
              </button>
            ) : (
              <button
                onClick={this.handleTimer}
                type='button'
                className='btn btn-danger mx-2 px-5 rounded-pill'
              >
                Stop
              </button>
            )}
            <button onClick={this.resetTimer} type='button' className='btn btn-warning mx-2 px-5 rounded-pill '>
              Reset
            </button>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Ui;
