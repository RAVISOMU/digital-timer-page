import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isStart: false, minutes: 25, seconds: 0}

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onResetTimer = () => {
    clearInterval(this.timerId)
    this.setState({isStart: false, minutes: 25, seconds: 0})
  }

  tick = () => {
    const {minutes, seconds} = this.state

    if (seconds === minutes * 60) {
      clearInterval(this.timerId)
      this.setState({isStart: false})
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
      }))
    }
  }

  playOrPause = () => {
    const {isStart, seconds, minutes} = this.state
    const isTimeCompleted = seconds === minutes * 60
    if (isTimeCompleted) {
      this.setState({seconds: 0})
    }

    if (isStart) {
      clearInterval(this.timerId)
    } else {
      this.timerId = setInterval(this.tick, 1000)
    }

    this.setState(prevState => ({isStart: !prevState.isStart}))
  }

  increaseTimeLimit = () => {
    this.setState(prevState => ({minutes: prevState.minutes + 1}))
  }

  decreaseTimeLimit = () => {
    const {minutes} = this.state
    if (minutes > 1) {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    } else {
      this.setState({minutes})
    }
  }

  getDisplayedTime = () => {
    const {seconds, minutes} = this.state
    const remainingTime = minutes * 60 - seconds
    const timeInMinutes = Math.floor(remainingTime / 60)
    const timeInSeconds = Math.floor(remainingTime % 60)
    const updatedMinutes =
      timeInMinutes > 9 ? timeInMinutes : `0${timeInMinutes}`
    const updatedSeconds =
      timeInSeconds > 9 ? timeInSeconds : `0${timeInSeconds}`
    const displayedTime = `${updatedMinutes}:${updatedSeconds}`

    return displayedTime
  }

  render() {
    const {isStart, minutes, seconds} = this.state
    const imgUrl = isStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isStart ? 'pause icon' : 'play icon'
    return (
      <div className="timer-app-container">
        <div className="timer-app-inner-container">
          <h1 className="digital-timer-heading">Digital Timer</h1>
          <div className="timer-app-bottom-container">
            <div className="timer-elapsed-image-container">
              <div className="timer-container">
                <h1 className="time">{this.getDisplayedTime()}</h1>
                <p className="status-text">{isStart ? 'Running' : 'Paused'}</p>
              </div>
            </div>
            <div className="timer-limit-container">
              <div className="timer-buttons-container">
                <div className="play-pause-container">
                  <button
                    type="button"
                    className="play-pause-button"
                    onClick={this.playOrPause}
                  >
                    <img
                      src={imgUrl}
                      alt={altText}
                      className="play-pause-icon"
                    />
                    <p className="play-pause-text">
                      {isStart ? 'Pause' : 'Start'}
                    </p>
                  </button>
                </div>
                <div className="reset-container">
                  <button
                    type="button"
                    className="reset-button"
                    onClick={this.onResetTimer}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="reset-icon"
                    />
                    <p className="reset-text">Reset</p>
                  </button>
                </div>
              </div>
              <p className="timer-limit-text">Set Timer limit</p>
              <div className="limit-buttons-container">
                <button
                  type="button"
                  className="minus-button"
                  onClick={this.decreaseTimeLimit}
                  disabled={seconds > 0}
                >
                  -
                </button>
                <p className="set-time">{minutes}</p>
                <button
                  type="button"
                  className="plus-button"
                  onClick={this.increaseTimeLimit}
                  disabled={seconds > 0}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
