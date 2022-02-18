import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Wrapper, Spacer, Button, List, ListItem, Popup, Input, Text, Title } from '3oilerplate'
import { useSocket } from 'use-socketio'
import { GameContext, SocketContext } from '../../context'

const RoomsView = () => {
  const history = useHistory()
  const { socket } = useSocket()
  const { createRoom } = useContext(SocketContext)
  const { rooms } = useContext(GameContext)
  const [newRoomName, setNewRoomName] = useState('')
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false)

  function onJoin(id: number) {
    history.push(`/rooms/${id}`)
  }

  function onCreate() {
    history.push(`/rooms/${socket.id}`)
    createRoom(newRoomName)
  }

  useEffect(() => {
    console.log(socket)
  }, [socket])

  return (
    <Wrapper s={{ padding: 'l' }}>
      <Container s={{ alignItems: 'center' }}>
        <Spacer size="m" s={{ flexGrow: 1 }}>
          <Button
            onClick={() => setShowCreateRoomModal(true)}
          >
            Create room
          </Button>
          { rooms.length ? (
            <List>
              { rooms.map((room: any) => (
                <ListItem onClick={() => onJoin(room.id)}>
                  {room.name}
                </ListItem>
              )) }
            </List>
          ) : (
            <Text s={{ marginTop: 'l', display: 'flex', justifyContent: 'center' }}>No rooms yet, create one if you want to play with somebody</Text>
          ) }
        </Spacer>
      </Container>
      {showCreateRoomModal && (
        <Popup
          onClose={() => setShowCreateRoomModal(false)}
          actions={[
            <Button onClick={() => onCreate()}>Start</Button>
          ]}
        >
          <Input
            isBlock
            value={newRoomName}
            onChange={(value: string) => setNewRoomName(value)}
            placeholder="Room name"
          />
        </Popup>
      )}
    </Wrapper>
  )
}

export default RoomsView
