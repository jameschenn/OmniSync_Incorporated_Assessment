import { useEffect, useState } from 'react'
import Card from './components/card/Card';
import FilterButton from './components/buttons/filterButton';
import './styles/globals.scss';

type CardData = {
  id: number;
  clicks: number;
  firstClick: string | null;
}

function App() {

  const API_BASE = "http://localhost:5050";
  
  const [ cards, setCards ] = useState<CardData[]>([]);
  const [ activeSort, setActiveSort ] = useState<string>("default");
  
  const fetchCards = async () => {
    const res = await fetch(`${API_BASE}/cards`);
    const data: CardData[] = await res.json();
    setCards(data);
  }

  useEffect(() => {
    fetchCards();
  }, []);
  
  const handleClick = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/cards/${id}/click`, {
        method: "POST"
      });
      const updatedCard: CardData = await res.json();

      setCards(prevCards =>
        prevCards.map(card =>
          card.id === updatedCard.id ? updatedCard : card
        )
      );

    } catch(err) {
      console.error('Failed to update card from the frontend:', err);
    }
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

  const handleClear = async () => {
    
    try {
      const res = await fetch(`${API_BASE}/cards/clear`, {
        method: "POST"
      });
      const clearedCards: CardData[] = await res.json();
      
      //failsafe in case we don't get expected array
      if(!Array.isArray(clearedCards)) {
        console.error("Unexpected data type", clearedCards);
        return;
      }
      
      setCards(clearedCards);
      setActiveSort("default");
    
    } catch(err) {
      console.error("Failed to clear cards from the frontend:", err);
    }
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
