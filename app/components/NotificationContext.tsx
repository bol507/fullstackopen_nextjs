"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useRef } from "react";

type NotificationType = "success" | "error" | null;

interface NotificationContextType {
  message: string;
  type: NotificationType;
  showNotification: (msg: string, type: NotificationType) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showNotification = useCallback((msg: string, notificationType: NotificationType) => {

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setMessage(msg);
    setType(notificationType);

   
    timeoutRef.current = setTimeout(() => {
      setMessage("");
      setType(null);
      timeoutRef.current = null;
    }, 5000);
  }, []); 

  const hideNotification = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setMessage("");
    setType(null);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ message, type, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};