import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion} from 'framer-motion';
import Card from './components/card/Card';
import FilterButton from './components/buttons/FilterButton';
import ThemeToggle from './components/toggles/themeToggle';
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

  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: 'easeInOut' as any };

  const enter = prefersReducedMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 1, scale: 1 };

  const exit = prefersReducedMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0.95 };

  
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
    // {value: "least_clicks", label: "Least Clicks"},
    {value: "first_clicked", label: "First Clicked ➡️ Last Clicked"},
    // {value: "last_clicked", label: "Last Clicked ➡️ First Clicked"},
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
      const defaultOrderCards = clearedCards.sort((a, b) => a.id - b.id);

      setCards(defaultOrderCards);
      setActiveSort("default");

    } catch(err) {
      console.error("Failed to clear cards from the frontend:", err);
    }
  }

  return (
    <>
    <header><ThemeToggle initialTheme='dark' /></header>
      <div className='filter-container'>
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
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={enter}
              exit={exit}
              transition={transition}
            >
              <Card
                number={card.id}
                clicks={card.clicks}
                firstClick={card.firstClick}
                onClick={() => handleClick(card.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>  
    </>
  )
}

export default App
