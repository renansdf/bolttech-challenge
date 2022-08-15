import React, { useEffect } from 'react';
import { Container } from './styles';
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { useNotifications } from '../../../hooks/notifications';

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
}

const Notification = ({ message, style }) => {
  const { removeNotification } = useNotifications();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(message.id);
    }, 5000);

    return () => {
      clearTimeout(timer);
    }
  }, [removeNotification, message.id]);

  return (
    <Container type={message.type} hasDescription={Number(!!message.message)} style={style}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.message && <p>{message.message}</p>}
      </div>

      <button onClick={() => removeNotification(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
}

export default Notification;
