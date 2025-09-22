"use client";
import React from 'react';
import * as _ from 'lodash';

class Counter extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    _.bindAll(this, ['timerStart', 'restart', 'onCountUp', 'finish'])
    this.state = { count: 0, timer: 10, maxCout: 0 }
  }
  finish(){
    return (this.state.timer <= 0)
  }
  onCountUp(){
    const {count, timer} = this.state
    if( count == 0 ) this.timerStart()
    if(timer > 0.0)  this.setState({ count: count + 1 })
  }
  timerStart(){
    var interval_fnc = setInterval(() => {
      const {count, maxCout, timer} = this.state
      if(this.finish()){
        this.setState({ maxCout: (count > maxCout) ? count : maxCout  })
        clearTimeout(this.state.interval_fnc);
      }else{
        this.setState({ timer: (this.state.timer - 0.1).toFixed(1) })
      }
    }, 100);
    this.setState({ interval_fnc: interval_fnc })
  }
  restart(){
    clearTimeout(this.state.interval_fnc)
    this.setState({ count: 0, timer: this.props.MAX_TIMER })
  }
  render() {
    const {count, timer, maxCout} = this.state
    return (
      <div>
        { count == 0 ?
          <h1 className="display-1 font-weight-bold">{this.props.MAX_TIMER}</h1>
          :
          <h1 className="display-1 font-weight-bold">{timer}</h1>
        }
        <p className="lead">clicks: {count}</p>
        { (maxCout != 0) && <p className="text-muted">Max clicks: {maxCout}</p> }
        <button
          className="btn btn-dark btn-lg mt-3"
          onClick={this.onCountUp}>
          { this.finish() ? 'Finished' : 'click!' }
        </button>
        <br/><br/>
        <button className="btn btn-link btn-sm"
                onClick={this.restart}>
          Restart
        </button>
      </div>
    );
  }
}

export default Counter;
