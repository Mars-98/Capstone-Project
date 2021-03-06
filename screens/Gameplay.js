import {useEffect, useState} from 'react'
import React from 'react'
import soccerBall from '../images/soccerball.png'
import baseBall from '../assets/baseball.png'
import golfBall from '../images/golf.png'
import tennisBall from '../assets/tennis.png'
import footBall from '../assets/football.png'
import basketBall from '../assets/basketball.png'
import volleyBall from '../images/volleyball.png'
import blank from '../images/blank.png'
import   '../screens/GamePlay.css'
import gameMusicPlay from '../music/gameMusic.mp3'

import {
    StyledLogoutButton,
    ButtonTextLogout
} from './../components/styles';

let gameMusic = new Audio(gameMusicPlay);


const width = 8
const sportBall = [
    baseBall,
    tennisBall,
    footBall,
    basketBall,
    volleyBall,
    golfBall,
    soccerBall,
    
]

const Gameplay = ({navigation}) => {
    const [currentBallArrangement, setCurrentBallArrangement] = useState([])
    const [squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
    const [scoreDisplay, setScoreDisplay] = useState(0)

    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currentBallArrangement[i]
            const isBlank = currentBallArrangement[i] === blank

            if (columnOfFour.every(square => currentBallArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 4)
                columnOfFour.forEach(square => currentBallArrangement[square] = blank)
                return true
            }
        }
    }

    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentBallArrangement[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            const isBlank = currentBallArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentBallArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 4)
                rowOfFour.forEach(square => currentBallArrangement[square] = blank)
                return true
            }
        }
    }

    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentBallArrangement[i]
            const isBlank = currentBallArrangement[i] === blank

            if (columnOfThree.every(square => currentBallArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 3)
                columnOfThree.forEach(square => currentBallArrangement[square] = blank)
                return true
            }
        }
    }

    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedBall = currentBallArrangement[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            const isBlank = currentBallArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfThree.every(square => currentBallArrangement[square] === decidedBall && !isBlank)) {
                setScoreDisplay((score) => score + 3)
                rowOfThree.forEach(square => currentBallArrangement[square] = blank)
                return true
            }
        }
    }

    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentBallArrangement[i] === blank) {
                let randomNumber = Math.floor(Math.random() * sportBall.length)
                currentBallArrangement[i] = sportBall[randomNumber]
            }

            if ((currentBallArrangement[i + width]) === blank) {
                currentBallArrangement[i + width] = currentBallArrangement[i]
                currentBallArrangement[i] = blank
            }
        }
    }

    const dragStart = (e) => {
        setSquareBeingDragged(e.target)
    }
    const dragDrop = (e) => {
        setSquareBeingReplaced(e.target)
    }
    const dragEnd = () => {
        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

        currentBallArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
        currentBallArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

        const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]

        const validMove = validMoves.includes(squareBeingReplacedId)

        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()

        if (squareBeingReplacedId &&
            validMove &&
            (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        } else {
            currentBallArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
            currentBallArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
            setCurrentBallArrangement([...currentBallArrangement])
        }
    }


    const createBoard = () => {
        const randomBallArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomBall = sportBall[Math.floor(Math.random() * sportBall.length)]
            randomBallArrangement.push(randomBall)
        }
        setCurrentBallArrangement(randomBallArrangement)
    }

    useEffect(() => {
        createBoard()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour()
            checkForRowOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()
            moveIntoSquareBelow()
            setCurrentBallArrangement([...currentBallArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentBallArrangement])

 useEffect(() => {
      gameMusic.play();
  }, gameMusic.pause());

    return (
        <div className="app">
            <StyledLogoutButton onPress={() => {navigation.navigate('Login')}}>
                <ButtonTextLogout>Logout</ButtonTextLogout>
            </StyledLogoutButton>
            <div className="game">
                {currentBallArrangement.map((sportBal, index) => (
                    <img
                        key={index}
                        src={sportBal}
                        alt={sportBal}
                        data-id={index}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                    />
                ))}
            </div>
            <div className="score">
                  <h1>Score</h1> 
               <h2>{scoreDisplay}</h2>
                  
            </div>
        </div>
            
    )
}

export default Gameplay

