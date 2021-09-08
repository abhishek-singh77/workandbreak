import React from  'react';
import './App.css';

//creating the first function for setting the time for clock
//This component will help to display the time whatever 
//is running at that moment by using the argument to set the specific time

function SetTimer(arg) {

    const id = arg.title.toLowerCase()
    return(
        <div className="timer-container">
            {/*created a class for timer-container
                in this we will create a wrapper which shall have
                a button to increment or decerement the time and we
                can use this component to create session length and
                break length
            */}
            
            <div className="flex actions-wrapper">
                <button id={`${id}-decrement`} onClick={arg.handleDecrease} ><i className="fa fa-minus" /></button>
                <span id={`${id}-length`} >{arg.count}</span>
                <button id={`${id}-increment`} onClick={arg.handleIncrease} ><i className="fa fa-plus" /></button>
            </div>
        </div>
    )
}


const audio = document.getElementById('beep')
//We have provided an audio file in index.html file with an id beep and
//are fetching that audio through this audio constant

class App extends React.Component {
//here we start our default component that is <App  />

    state={
        breakCount: 5,  //count for break interval in minutes
        sessionCount: 25, //count for session intervals in minutes
        clockCount: 25*60, //total count for the clock's session 60min
        currentTimer: 'Session', //title of the clock Session
        isPlaying: false, //status of clock initially false
    }

    constructor(props) { 
        super(props)
        this.loop = undefined
    }
    
    componentWillUnmount() {
        clearInterval(this.loop)
    }   
    
    handlePlayPause = () => { //function to handle play/pause button
        const {isPlaying} = this.state //current status 
        if (isPlaying) { //if playing then change state to pause and vice versa
          clearInterval(this.loop)
          this.setState({
            isPlaying: false
        })
        } else { //changing status if paused to play at current status
          this.setState({
            isPlaying: true
        })
   
        this.loop = setInterval(() => {
            const {clockCount, currentTimer, breakCount, sessionCount} = this.state
            if (clockCount === 0) {
               this.setState({
                   currentTimer: (currentTimer === 'Session') ? 'Break' : 'Sesion' ,
                   clockCount: (currentTimer === 'Session') ? (breakCount * 60) : (sessionCount * 60)
            })
            audio.play()
            }else {this.setState ({clockCount: clockCount - 1})}
   
        }, 1000)
        }   
    }//end of handlePlayPause
   
    handleReset = () => {//handling reset button, we reset the set state function to it's initial value and clear interval
        this.setState({
            breakCount: 5,
            sessionCount: 25,
            clockCount: 25 * 60,
            currentTimer: 'Session',
            isPlaying: false,
    })
   
        clearInterval(this.loop)
   
        audio.pause()
        audio.currentTime = 0
    }
   
    convertToTime = (count) => { 
        let  minutes = Math.floor(count / 60)
        let seconds = count % 60
        seconds = seconds < 10 ? ('0' + seconds) : seconds
        minutes = minutes < 10 ? ('0' + minutes) : minutes
        return `${minutes}:${seconds}`
    }

    handleBreakDecrease = () => { // decerement break time
        const {breakCount, isPlaying, currentTimer} = this.state
        if (breakCount > 1) {
            if (!isPlaying && currentTimer === 'Break') {
            this.setState({
                breakCount: breakCount - 1,
                clockCount: (breakCount - 1) * 60
            })
            } else {
            this.setState({
                breakCount: breakCount - 1
            })
            }
        } 
    }
   
    handleSessionDecrease = () => {//decrement session time
        const {sessionCount, isPlaying, currentTimer} = this.state

        if(sessionCount > 1) {
            if (!isPlaying && currentTimer === 'Session') {
                this.setState({
                    sessionCount: sessionCount - 1,
                    clockCount: (sessionCount - 1) * 60
                })
            } else {
                this.setState({
                    sessionCount: sessionCount - 1
                })
            }
        } 
    }
    handleBreakIncrease = () => { //increment break time
        const {breakCount, isPlaying, currentTimer} = this.state

        if (breakCount < 60) {
            if (!isPlaying && currentTimer === 'Break') {
            this.setState({
                breakCount: breakCount + 1,
                clockCount: (breakCount + 1) * 60
            })
            } else {
            this.setState({
                breakCount: breakCount + 1
            })
            }
        }
    }
      
   
    handleSessionIncrease = () => { //increment session time
        const {sessionCount, isPlaying, currentTimer} = this.state

        if (sessionCount < 60) {
            if (!isPlaying && currentTimer === 'Session') {
                this.setState({
                sessionCount: sessionCount + 1,
                clockCount: (sessionCount + 1) * 60
                })
            } else {
                this.setState({
                    sessionCount: sessionCount + 1
                })
            }
        }
    }
   
     
   
    render () {

        const {
            breakCount,
            sessionCount,
            clockCount,
            currentTimer,
            isPlaying
        } = this.state
        
        const breakProps = {
            title: 'Break',
            count: breakCount,
            handleDecrease: this.handleBreakDecrease,
            handleIncrease: this.handleBreakIncrease
        }
   
        const sessionProps = {
            title: 'Session',
            count: sessionCount,
            handleDecrease: this.handleSessionDecrease,
            handleIncrease: this.handleSessionIncrease
        }
   
        return (
            <header className="App-header">
                <div className="body">   
                <h1 id='break-label'>Work And Break</h1> 
                <h4 id='session-label'>Enter Break and Working Session </h4>    <br />
                    <div className="flex">
                    <SetTimer {...breakProps} />
                    <SetTimer {...sessionProps} />
                    </div>
                    <div className="clock-container">
                        <h1 id="timer-label" > {currentTimer} </h1>
                        <span id="time-left" >{this.convertToTime(clockCount)}</span>
                        <div className="flex">
                            <button id="start_stop" onClick={this.handlePlayPause} ><i className={`fa fa-${isPlaying ? 'pause' : 'play'}`}/></button>
                            <button id="reset" onClick={this.handleReset} ><i className="fa fa-refresh" /></button>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
       
}
   
export default App;

