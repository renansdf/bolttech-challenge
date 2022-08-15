import React, { createContext, useContext, useCallback, useState } from 'react'
import { v4 } from 'uuid'

import NotificationsContainer from '../components/NotificationsContainer'

const NotificationsContext = createContext()

const NotificationsProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addNotification = useCallback(({ type, title, message }) => {
    const id = v4();
    const notification = {
      id,
      type,
      title,
      message
    }
    setMessages((state) => [...state, notification]);
  }, []);

  const removeNotification = useCallback((id) => {
    setMessages((state) => state.filter(state => state.id !== id));
  }, []);

  return (
    <NotificationsContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <NotificationsContainer messages={messages} />
    </NotificationsContext.Provider>
  );
}

function useNotifications() {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error('useNotifications precisa ser usado dentro de seu provider');
  }

  return context;
};

export { NotificationsProvider, useNotifications }
