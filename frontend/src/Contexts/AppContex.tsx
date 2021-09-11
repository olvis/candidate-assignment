import React from "react";

export type Message = {
    type : "info" | "warn" | "success" | "error";
    text: string;
}

type ContextType = {
    setMessage(mg?: Message) : void;
    hide(): void;
    message?: Message;
};

export const AppContext = React.createContext<Partial<ContextType>>({});

type Props = {
    children: React.ReactNode;
};

export const AppProvider : React.FC<Props> = ({children}) => {
    const [message, setMessage] = React.useState<Message | undefined>(undefined);

    const handleSetMessage = (msg: Message) => {
        setMessage(msg);
    }

    const handleHide = () => {
        setMessage(undefined);
    }

    const value : ContextType = {
        setMessage: handleSetMessage,
        message: message,
        hide: handleHide
    }

    return (
        <AppContext.Provider value={value}>
          {children}
        </AppContext.Provider>
      );
}

export function useApp() {
    return React.useContext(AppContext)
}
