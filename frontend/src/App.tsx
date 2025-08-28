import { useState } from 'react'
import Card from './components/card/Card';
import './styles/globals.scss';

type CardData = {
  id: number;
  clicks: number;
  firstClick: string | null;
}

function App() {

  const [ cards, setCards ] = useState<CardData[]>(() => {
    const initializeCards: CardData[] = [];

    for(let i = 1; i <= 8; i++) {
      initializeCards.push({
        id: i,
        clicks: 0,
        firstClick: null
      });
    };
      return initializeCards;
  });

  const handleClick = (id: number) => {
    console.log(`Card ${id} clicked`);

    let updatedCards = [...cards];

    for(let i = 0; i < updatedCards.length; i++) {
      let card = updatedCards[i];
      if(card.id === id) {
        updatedCards[i] = {
          ...card,
          clicks: card.clicks + 1,
          firstClick: card.firstClick ?? new Date().toISOString(),
        };
        break;
      }
    }
    setCards(updatedCards);
  }

  return (
    <>
      <p>Hi. In Progress. Thanks for checking this commit :D</p>

      <div className="grid">
        {cards.map((card: CardData) => (
          <Card 
            key={card.id}
            number={card.id}
            clicks={card.clicks}
            firstClick={card.firstClick}
            onClick={() => handleClick(card.id)}
          />
        ))}
      </div>  
    </>
  )
}

export default App
