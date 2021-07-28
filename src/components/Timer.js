import React, {useState, useEffect} from 'react'
import '../styles.css'
import soundfile from '../assets/beep.mp3'

export default function Timer(props) {

    const [counter, setCounter] = useState(1800)
    const [phase, setPhase] = useState('')
    const [cycle, setCycle] = useState(props.cycle)

    if(counter === 0) {
        if(cycle-1) {
            setCounter(1800)
            setCycle(cycle-1)
        }
     }

    useEffect(() => {
        if(counter > 0 ) {
            const timerId = setTimeout(() => setCounter(counter - 1), 1000)

            return function cleanup() {
                clearTimeout(timerId)
            }
        }

      }, [counter]);

    useEffect(() => {
        
        if(cycle <= 1 && counter <= 0) {
            var audio = new Audio(soundfile)
            audio.play()
            setTimeout(() => {
                var audio = new Audio(soundfile)
                audio.play() 
            }, 1000)
            document.body.style = 'background : #F6F5F5'
            props.handleStop(false)
        }
        
    }, [cycle, counter, props])

    const attentionPhase = counter => {
        if(counter >= 0 && counter <= 300) {
            if(phase !== 'relax mode') {
                setPhase('relax mode')
                let audio = new Audio(soundfile)
                audio.play()
                document.body.style = 'background : #EE6F57'
            }
        }

        if(counter > 300 && counter <= 1800) {
            if(phase !== 'focus mode') {
                setPhase('focus mode')
                let audio = new Audio(soundfile)
                audio.play()
                document.body.style = 'background : #1F3C88'
            }
        }
    }

    const displayTime = (seconds) => {     
        if(phase === 'relax mode'){
            let m = (seconds - seconds % 60) / 60
            let s = seconds % 60
            let time = (m>9?m:'0'+ m) + " : " + (s>9?s:'0'+s) 
            return time
        } else {
            let second = (seconds - 300) % 60
            let minute = (seconds - 300 - (seconds - 300) % 60) / 60
            let time = (minute>9?minute:'0' + minute) + " : " + (second>9?second:'0' + second)
            return time
        }

        
    }

    return (
        <div>
            <h1>{displayTime(counter)}</h1>
            {attentionPhase(counter)}
            {phase}
        </div>
    )
}