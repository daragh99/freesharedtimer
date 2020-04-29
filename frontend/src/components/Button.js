import React from 'react';
import styled from 'styled-components';
import styles from '../styles/variables';

const BorderedButton = styled.button`
    border-color: ${styles.colors.russianViolet};
    color: ${styles.colors.deepKamaru};
    border-radius: 4px;
    padding: 8px;
    background-color: ${styles.colors.paleSilver};
    margin: 4px;
`

export default function Button(props) {
    const { onClick, value, displayText } = props; 
    console.log(props);
    return (
        <>
            <BorderedButton value={value} onClick={onClick} >{displayText}</BorderedButton>
        </>
    );

}