import { useState } from 'react'
import Card from './components/card/Card';
import FilterButton from './components/buttons/filterButton';
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

  const sortOptions = [
    {value: "default", label: "Default"},
    {value: "most_clicks", label: "Most Clicks"},
    {value: "least_clicks", label: "Least Clicks"},
    {value: "first_clicked", label: "First Clicked ➡️ Last Clicked"},
    {value: "last_clicked", label: "Last Clicked ➡️ First Clicked"},
  ];

  return (
    <>
      <p>Hi. In Progress. Thanks for checking this commit :D</p>

      <div>
        <div>
          {sortOptions.map((option: { value:string, label:string }) => (
            <FilterButton 
              key={option.value}
              label={option.label}
              active={true}
              onClick={() => console.log('placeholder')}
            />
          ))}
          <FilterButton
            label="Clear"
            onClick={() => console.log('i am going to clear everything.... eventually')}
          />
        </div>
      </div>

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
