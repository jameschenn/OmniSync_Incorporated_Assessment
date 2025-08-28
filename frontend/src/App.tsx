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

  const createInitializeCards = (): CardData[] => {
    
    const initializeCards: CardData[] = [];

    for(let i = 1; i <= 8; i++) {
      initializeCards.push({
        id: i,
        clicks: 0,
        firstClick: null
      });
    };
      return initializeCards;
  }

  const [ activeSort, setActiveSort ] = useState<string>("default");
  const [ cards, setCards ] = useState<CardData[]>(createInitializeCards);

  
  const handleClick = (id: number) => {
    console.log(`Card ${id} clicked`);

    let updatedCards: CardData[] = [...cards];

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

  const handleSort = (method: string) => {
    
    const sortedCards: CardData[] = [...cards];
    
    setActiveSort(method);
    switch(method) {
      case "most_clicks":
        sortedCards.sort((a, b) => b.clicks - a.clicks);
        break;
      case "least_clicks":
        sortedCards.sort((a, b) => a.clicks - b.clicks);
        break;
      case "first_clicked":
        sortedCards.sort((a, b) => {
          if(!a.firstClick) return 1;
          if(!b.firstClick) return -1;
          return new Date(a.firstClick).getTime() - new Date(b.firstClick).getTime();
        });
        break;
      case "last_clicked":
        sortedCards.sort((a, b) => {
          if(!a.firstClick) return 1;
          if(!b.firstClick) return -1;
          return new Date(b.firstClick).getTime() - new Date(a.firstClick).getTime();
        });
        break;
      default:
        sortedCards.sort((a, b) => a.id - b.id);
    }
    setCards(sortedCards);
  }

  const handleClear = () => {
    setActiveSort("default");
    setCards(createInitializeCards());
  }

  return (
    <>
      <p>Hi. In Progress. Thanks for checking this commit :D</p>

      <div>
        <div>
          {sortOptions.map((option: { value:string, label:string }) => (
            <FilterButton 
              key={option.value}
              label={option.label}
              active={activeSort === option.value}
              onClick={() => handleSort(option.value)}
            />
          ))}
          <FilterButton
            label="Clear"
            onClick={handleClear}
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
