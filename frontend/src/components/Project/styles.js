import styled from 'styled-components';

export const Container = styled.div`
  background: #d2e9a9;
  padding: 16px;
  width: 100%;
  border-radius: 2px;
  position: relative;

  form{
    button{
      background: #170F4F;
      color: #fff;
      border: none;
      margin-top: 5px;
      padding: 2px 6px 3px;
      font-size: 12px;
      border-radius: 3px;
    }
  }

  input{
    width: 100%;
    background: transparent;
    border: none;
    font-weight: 500;
    font-size: 18px;

    &:focus{
      border-bottom: 2px solid #170F4F;
    }
  }
`

export const DeleteProject = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background: red;
  border: none;
  color: #fff;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 11px;

  &:disabled{
    background: grey;
  }
`

export const AdicionarTarefa = styled.button`
  background: #332a72;
  color: #fff;
  font-size: 13px;
  border: none;
  padding: 4px 8px;
  border-radius: 2px;
  margin-top: 10px;
`