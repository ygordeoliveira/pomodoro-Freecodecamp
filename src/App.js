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
                    alert("Time is over!")
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
        this.setState({ minutes: 25, seconds: 0, isPaused: true });
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

    render() {
        const { minutes, seconds, isPaused, pomodoroMinutes, breakMinutes } = this.state;
        return (
            <div>
                <h1 class="text-center mb-5">Timer</h1>
                <div className="timer text-center fs-3">
                    <button onClick={this.handleDecreaseTime} className="btn btn-secondary btn-adjust">-</button>
                    <span className="minutes">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>
                    <button onClick={this.handleIncreaseTime} className="btn btn-secondary btn-adjust">+</button>
                </div>
                <button class="btn btn-danger" onClick={this.handlePause}>Pausar</button>
                <button class="btn btn-success" onClick={this.handleStart}>Iniciar</button>
                <button class="btn btn-primary" onClick={this.handleRestart}>Reiniciar</button>
            </div>
        );
    }
}

export default PomodoroApp;