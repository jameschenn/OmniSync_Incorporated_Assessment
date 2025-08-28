import React from 'react';
import styles from './Card.module.scss';

type CardProps = {
    number: number;
    clicks: number;
    firstClick: string | null;
}

const Card: React.FC<CardProps> = ({ number, clicks, firstClick }: CardProps) => {
    return (
        <div className={styles.card}>
            <p>{ number }</p>
            <p>Clicks: { clicks }</p>
            <p>{ firstClick ? `First Click: ${firstClick}` : "Not Clicked Yet" }</p>
        </div>
    );
}

export default Card;