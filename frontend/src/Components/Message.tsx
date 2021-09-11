import React from "react";
import { Alert } from "react-bootstrap";
import { AppContext, Message as MsgApp, useApp } from "../Contexts/AppContex";

export const Message : React.FC = () => {
    const { hide } = useApp();

    //const history = useHistory();
    // useEffect(() => {
    //     return history.listen((_1) => { 
    //       hide && hide();
    //     }) 
    // },[history, hide]) 


    const getVariant = (msg: MsgApp) : string => {
        switch(msg?.type){
            case "success":
                return "primary";
            case "error":
                return "danger";
            case "warn":
                return "warning";
            case "info":
                return "info";
            default:
                return "primary";
        }
    }

    return (
        <>
            <AppContext.Consumer>
                {
                    ( { message } ) => {
                        if (!message) return "";
                        return (<Alert variant={ getVariant(message) } onClose={ () => hide!() } dismissible>
                            {message.text}
                        </Alert>)
                    }
                }
            </AppContext.Consumer>
            
        </>
    );




}