import React, { PropTypes } from 'react';

import Button from './Button';

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            running: false,
            elapsed: 0,
            lastTick: 0
        };
    }
    
    componentDidMount() {
        this.intervarl = setInterval(this.tick.bind(this), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.intervarl);
    }
    
    tick() {
        if (this.state.running) {
            let now = Date.now();
            let diff = now - this.state.lastTick;
            
            
            this.setState({
                elapsed: this.state.elapsed + diff,
                lastTick: now
            });
        }
    }
    
    handleStart() {
        this.setState({
            running: true,
            lastTick: Date.now()
        });
    }
    
    handlePause() {
        this.setState({ running: false });
    }
    
    handleStop() {
        this.setState({
            running: false,
            elapsed: 0,
            lastTick: 0
        });
    }
    
    format(milliseconds) {
        let totalSeconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        
        return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
    }
    
    render() {
        let time = this.format(this.state.elapsed);
        return (
            <section className="stopwatch">
                <div className="stopwatch-time">{time}</div>
                <div className="stopwatch-controls">
                    {this.state.running ?
                        <Button className="icon" icon="pause" onClick={this.handlePause.bind(this)} />
                        :
                        <Button className="icon" icon="play_arrow" onClick={this.handleStart.bind(this)} />
                    }
                    <Button className="icon" icon="stop" onClick={this.handleStop.bind(this)} />
                </div>
            </section>
        );
    }
}

Stopwatch.propTypes = {};

export default Stopwatch;