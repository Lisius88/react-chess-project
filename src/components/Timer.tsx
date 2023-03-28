import React, { FC, useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";
import Modal from "../components/Modal"

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [whiteTime, setWhiteTime] = useState(3000)
    const [blackTime, setBlackTime] = useState(3000)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        startTimer() // eslint-disable-next-line
    }, [currentPlayer])

    function startTimer() {
         if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    const handleRestart = () => {
        setWhiteTime(3000)
        setBlackTime(3000)
        restart()
    }

    const closeModal = () => {
        setIsOpen(true)
        handleRestart()
  }

    return (
        <div className="timer">
        {(blackTime > 0 && <h2 className="timer-title">Black - {blackTime}</h2>) || <Modal title="White is a winner" isOpen={isOpen} onClose={closeModal} /> } 
        <div><button onClick={handleRestart}>Restart game</button></div>
        {(whiteTime > 0 && <h2 className="timer-title">White - {whiteTime}</h2>) || <Modal title="Black is a winner" isOpen={isOpen} onClose={closeModal} />}
    </div>
  )
}

export default Timer;