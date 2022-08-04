import styled, { css } from 'styled-components'

export const Button = styled.button`
  background-color: #df7b84;
  border-radius: 5px;
  display: flex;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  color: purple;
  border: 2px solid black;
  &:hover {
    cursor: pointer,
  }

  ${props => props.loginregister && css`
    background: #df7b84;
    color: white;
  `}
`; 


