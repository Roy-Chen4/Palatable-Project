import styled, { css } from 'styled-components'

// const Button = () => {
//   const GeneralButton = styled.button`
//       background-color: white;
//       border-radius: 5px;
//       display: inline-block;
//       border-radius: 3px;
//       padding: 0.5rem 0;
//       margin: 0.5rem 1rem;
//       width: 11rem;
//       color: purple;
//       border: 2px solid black;
  
  
//       ${props => props.loginregister && css`
//         background: purple;
//         color: white;
//       `}
//   `; 
//   return GeneralButton;
// }

// export default Button;

export const Button = styled.button`
  background-color: white;
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
    background: purple;
    color: white;
  `}
`; 
// will need to change the props structure once we're passing through the login/register page


