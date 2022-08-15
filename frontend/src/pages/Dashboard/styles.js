import styled from 'styled-components'

export const Container = styled.div`
  background: #66d6dd;
  width: 100%;
  height: 100vh;
  padding: 5% 7%;

  h1{
    font-weight: 900;
    margin-bottom: 20px;
  }
`

export const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 16px;
`

export const ProjectButton = styled.button`
  background: #170F4F;
  border: none;
  color: #fff;
  width: 150px;
  height: 90px;
  border-radius: 16px;
  box-shadow: 0px 3px 10px -5px #000;
  padding: 16px;
  font-weight: 700;
`