import styled from 'styled-components';

export const ButtonGroupsOne = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 5px;
    margin-right: 20px;
    margin-bottom: 20px;
`;

export const ButtonGroupsTwo = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repear(3, 1fr);
    gap: 5px;
`;

export const SquaredButton = styled.button`
    width: 100%;
    height: 100px;
    background-color: #0074d9; 
    color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center
    justify_content: center
`;