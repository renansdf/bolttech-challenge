import React from 'react';
import { Container } from './styles';
import Notification from './Notification';
import { useTransition } from 'react-spring';

const NotificationsContainer = ({ messages }) => {
  const animatedMessages = useTransition(messages, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' },
  });

  return (
    <Container>
      {animatedMessages && animatedMessages((styles, message) => (
        <Notification key={message.id} message={message} style={styles} />
      ))}
    </Container>
  );
}

export default NotificationsContainer;
