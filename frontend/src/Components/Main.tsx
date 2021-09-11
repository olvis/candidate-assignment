import React from "react";
import { Button, Form } from "react-bootstrap";
import { useApp } from "../Contexts/AppContex";

export const Main : React.FC = () => {
    const { setMessage } = useApp();

    const handleClick = (e: React.SyntheticEvent) => {
        setMessage!({type: "success", text: `Hello from the Main Component`});
    }
    
    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Please upload your file</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Button variant="primary" onClick={handleClick}>
                    Submit
                </Button>
            </Form>
        </>
    )
}