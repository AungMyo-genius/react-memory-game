import { useState,useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
import Confetti from 'react-confetti';


const cardImages = [
  {'src': '/img/helmet-1.png'},
  {'src': '/img/potion-1.png'},
  {'src': '/img/ring-1.png'},
  {'src': '/img/scroll-1.png'},
  {'src': '/img/shield-1.png'},
  {'src': '/img/sword-1.png'}
]

function App() {
  const [cards,setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [win ,setWin] = useState(false)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disable, setDisable] = useState(false)
  const [display, setDisplay] = useState({})

  // shuffle card
  const shuffledCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort( () => Math.random() - 0.5)
    .map( card => ({...card,id:Math.random(),matched:false}) )

    setWin(false)
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(() => shuffledCards)
    setTurns(() => 0)
    // console.table(cards) 
  }

  // handle choice
  const handleChoice = card => choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  //start a game automatically
  useEffect( ()=> {
    shuffledCards()
    window.addEventListener('resize', () => {
      setDisplay({
        'width':window.innerWidth,
        'height':window.innerHeight
      })
    })

    return () => {
      window.removeEventListener('resize', () => {
        setDisplay({
          'width':window.innerWidth,
          'height':window.innerHeight
        })
      })
    }
  }, [])

  // compare choice
  useEffect( ()=> {
    // Check Win status
    if(cards.length){
      setWin( cards.every( data => {return data.matched === true}) )
    }
    
    if(choiceOne && choiceTwo) {
      setDisable(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => prevCards.map(card => {
          if(card.src === choiceOne.src) {
            return {...card, matched:true}
          } else {
            return card
          }
        }))
        restTurn()
      }else{
        setTimeout( ()=> restTurn() , 1000)
      }
    }

  }, [choiceOne,choiceTwo,cards]);

  // console.log(cards)

  //Reset Turn
  const restTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisable(false)
  }


  return (
    <div className="App">
      <h3>Magic Match</h3>
      <button className='newGame' onClick={shuffledCards}>New Game</button>
      <div className="card-grid">
        {cards.map( card => {
          return (
            <SingleCard  
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched }
            disable={disable}
            ></SingleCard>
          )
        })}
      </div>
      <p>Turns: {turns}</p>
      {win && 
        (
          <div className='modal'>
              <Confetti
                width={display.width}
                height={display.height}
              />
              <div className='modal-content'>
                <button className='close' onClick={shuffledCards}>&times;</button>
                <p>Win with {turns} turns</p>
                <button className='playAgain' onClick={shuffledCards}>Play Again</button>
              </div>
          </div>
        )
      }
    </div>
  );
}

export default App