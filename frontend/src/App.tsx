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
            onClick={() => console.log("Placeholder")}
          />
        ))}
      </div>  
    </>
  )
}

export default App
