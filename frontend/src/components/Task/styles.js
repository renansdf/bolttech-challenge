import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;


`
export const Content = styled.div`
  display: flex;
  align-items: center;

  form{
    input{
      width: 100%;
      background: transparent;
      border: none;
      font-weight: 400;
      font-size: 14px;
      margin: 0px 5px;

      &:focus{
        border-bottom: 2px solid #170F4F;
      }
    }

    button{
      background: #170F4F;
      color: #fff;
      border: none;
      margin-top: 5px;
      padding: 2px 6px 3px;
      font-size: 12px;
      border-radius: 3px;
    }

    margin-bottom: 0;
  }
`

export const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
`
