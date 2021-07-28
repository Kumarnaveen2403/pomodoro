import React, {useState} from 'react'
import '../styles.css'
import Timer from './Timer'

function App() {

  const [numOfCycle, setNumOfCycle] = useState(1)
  const [isRunning, setIsRunning] = useState(false)

  function handleStop(isRunning) {
    setIsRunning(isRunning)
  }

  function handleValueChange(event) {
    setNumOfCycle(event.target.value)
  }

  return (
    <div>
      <form onSubmit={(e) => {e.preventDefault()}}>
        <h1>Number of reps:</h1>
        <input
          className="input input-box"
          type="number" 
          id="cycles"
          value={numOfCycle} 
          onChange={handleValueChange}
          min="1" 
          max="4"
          {...isRunning ? { 'readOnly' : 'true' } : {} }
        />

        {isRunning ? 
        <button className='button stop' onClick={() => {setIsRunning(false);document.body.style = 'background : #F6F5F5'}}><i className='button-text'>Stop</i></button> 
          :<button className='button start' onClick={() => {setIsRunning(true)}}><i className='button-text'>Start</i></button> 
        }

      </form>
      {isRunning && <Timer isRunning={isRunning} cycle={numOfCycle} handleStop={handleStop}/>}
    </div>
  )
}

export default App;