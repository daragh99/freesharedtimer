import React from 'react';
import styled from 'styled-components';
import styles from '../styles/variables';

const BorderedInput = styled.input`
    border-color: ${styles.colors.russianViolet};
    color: ${styles.colors.deepKamaru};
    border-radius: 4px;
    border-width: 1px;
    padding: 8px;
    background-color: ${styles.colors.paleSilver}
`

export default function Button(props) {
    const { onChange, value, } = props; 
    console.log(props);
    return (
        <>
            <BorderedInput value={value} onChange={onChange} ></BorderedInput>
        </>
    );

}