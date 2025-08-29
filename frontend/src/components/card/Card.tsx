import React from 'react';
import styles from './Card.module.scss';

type CardProps = {
    number: number;
    clicks: number;
    firstClick: string | null;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ number, clicks, firstClick, onClick }: CardProps) => {
    return (
        <div className={styles.card} onClick={onClick}>
            <div>
                <h2>{ number }</h2>
            </div>
            <div className={styles.cardData}>
                <p>Clicks: <span style={{ fontWeight: 'bold' }}>{clicks}</span></p>
                <p>{firstClick ? `First Click: ${new Date(firstClick).toLocaleString()}` : "Never Clicked"}</p>
            </div>
        </div>
    );
}

export default Card;