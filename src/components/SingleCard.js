import React from 'react'
import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disable}) {
  const handleClick = () => {
    if(!disable){
      handleChoice(card)
    }
  }

  return (
    <div className={`card ${flipped ? 'flipped': ''}`}>
              <div>
                <img src={card.src} className="front" alt="card front" />
                <img src='/img/cover.png' onClick={handleClick} className="back" alt="card back" />
              </div>
    </div>
  )
}
