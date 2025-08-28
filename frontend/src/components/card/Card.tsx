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
            <p>{ number }</p>
            <p>Clicks: { clicks }</p>
            <p>{firstClick ? `First Click: ${new Date(firstClick).toLocaleString()}` : "Never Clicked"}</p>
        </div>
    );
}

export default Card;