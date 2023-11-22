import './App.css';
import React, { Component } from 'react';

class PomodoroApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 25,
            seconds: 0,
            isPaused: true,
        };
    }

    componentDidMount() {
        this.timerInterval = setInterval(() => {
            const { minutes, seconds, isPaused } = this.state;
            if (!isPaused) {
                if (minutes === 0 && seconds === 0) {
                    clearInterval(this.timerInterval);
                    this.audioRef = React.createRef();
                } else {
                    if (seconds === 0) {
                        this.setState({ minutes: minutes - 1, seconds: 59 });
                    } else {
                        this.setState({ seconds: seconds - 1 });
                    }
                }
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    handlePause = () => {
        this.setState({ isPaused: true });
    };

    handleStart = () => {
        this.setState({ isPaused: false });
    };

    handleRestart = () => {
        this.setState({ minutes: this.state.minutes + 1, seconds: 0, isPaused: true });
    };

    handleIncreaseTime = () => {
        const { minutes } = this.state;
        this.setState({ minutes: minutes + 1 });
    };

    handleDecreaseTime = () => {
        const { minutes } = this.state;
        if (minutes > 1) {
            this.setState({ minutes: minutes - 1 });
        }
    };

    playAlarmSound = () => {
        this.audioRef.current.play();
    };

    render() {
        const { minutes, seconds } = this.state;
        return (
            <div className='py-3'>
                <h1 class="text-center mb-5">Timer</h1>
                <div className="timer text-center fs-3 pt-2">
                    <button onClick={this.handleDecreaseTime} className="btn btn-secondary btn-adjust">-</button>
                    <span className="minutes">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>
                    <button onClick={this.handleIncreaseTime} className="btn btn-secondary btn-adjust">+</button>
                </div>
                <div className="buttons">
                    <button class="btn btn-danger w-25" onClick={this.handlePause}>Stop</button>
                    <button class="btn btn-success w-25" onClick={this.handleStart}>Start</button>
                    <button class="btn btn-primary w-25" onClick={this.handleRestart}>Reset</button>
                </div>
                <audio ref={this.audioRef} src="C:\Users\ygor9\Downloads\pomodoro-app_alarm.mp3" style={{ display: 'none' }}></audio>
            </div>
        );
    }
}

export default PomodoroApp;