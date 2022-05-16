import { useState,useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

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
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disable, setDisable] = useState(false)

  // shuffle card
  const shuffledCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort( () => Math.random() - 0.5)
    .map( card => ({...card,id:Math.random(),matched:false}) )


    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(() => shuffledCards)
    setTurns(() => 0)
    // console.table(cards) 
  }

  // handle choice
  const handleChoice = card => choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  //start a game automatically
  useEffect( ()=> shuffledCards(), [])

  // compare choice
  useEffect( ()=> {
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
  }, [choiceOne,choiceTwo]);

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
      <h1>Magic Match</h1>
      <button onClick={shuffledCards}>New Game</button>
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
    </div>
  );
}

export default App