import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100vh;
`

export const Content = styled.div`
  background: rgb(23,15,79);
  background: linear-gradient(152deg, rgba(23,15,79,1) 0%, rgba(13,7,55,1) 100%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 50px;

  h1{
    margin-bottom: 20px;
    font-weight: 900;
  }
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 200px;

    input{
      width: 100%;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid #170F4F;
      font-weight: 300;
      
      & + input {
        margin-top: 10px;
      }
    }

    button{
      background: #170F4F;
      padding: 12px 26px;
      color: #fff;
      font-weight: 600;
      border: none;
      margin-top: 10px;
      font-size: 14px;
    }

    div{
      background: #cc2a2a;
      color: #fff;
      font-size: 12px;
      padding: 2px 6px;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      max-width: 80%;
      text-align: center;
    }
  }

  h2{
    font-weight: 700;
    margin-bottom: 20px;
  }

  a{
    margin-top: 20px;
  }
`

export const AppInformation = styled.p`
  font-weight: 300;
  line-height: 1.3em;
  max-width: 300px;
  
  &+p{
    margin-top: 10px;
  }
`