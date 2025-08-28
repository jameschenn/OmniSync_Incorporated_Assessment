import React from 'react';
import styles from './FilterButton.module.scss'

type FilterButtonProps = {
    label: string;
    active?: boolean;
    onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, onClick }: FilterButtonProps) => {
    return (
        <button 
            className={`${ styles.filterButton } ${ active ? styles.active : "" }`}
            onClick={onClick}    
        >
            {label}
        </button>
    );
};

export default FilterButton;