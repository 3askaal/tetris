import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Wrapper, Spacer, Button, Title } from '3oilerplate'

const HomeView = () => {
  const history = useHistory()

  return (
    <Wrapper>
      <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Spacer size="l" style={{ alignItems: 'center' }}>
          <Title level={1}>Tetris</Title>
          <Spacer size="m" style={{ alignItems: 'center' }}>
            <Button onClick={() => history.push('/setup')}>Local play</Button>
            <Button disable={true} onClick={() => history.push('/rooms')}>Online play</Button>
          </Spacer>
        </Spacer>
      </Container>
    </Wrapper>
  )
}

export default HomeView
