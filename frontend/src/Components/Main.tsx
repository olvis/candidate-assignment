import { type } from "os";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useApp } from "../Contexts/AppContex";
import { api } from "../HttpHelper";

export const Main : React.FC = () => {
    const { setMessage } = useApp();
    const [loading, setLoading] = React.useState(false);
    const [file, setFile] = React.useState<File | undefined>(undefined);


    const handleSubmit = async (e: React.SyntheticEvent) => {
        setMessage!(undefined);
        if (!file) { 
            setMessage!({type: "error", text: "You need to provide a file"});
            return;
        }
        setLoading(true);
        try {
            const data = new FormData();
            data.append("file", file);
            const response = await api.post("/upload", data);
            console.log(response);
            setMessage!({type: "success", text: "Your file has been received 😁"});
        }
        catch(err){
            console.error(err);
            setMessage!({type: "error", text: "An error has ocurred 😢"});
        }
        setLoading(false);
    }

    const handleOnFileChange = (e : React.SyntheticEvent) => {
        const input = (e.target as HTMLInputElement);
        setFile(input!.files![0]);
    }
    
    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Please upload your file</Form.Label>
                    <Form.Control type="file" onChange={handleOnFileChange}
                    accept=".acm,.ax,.cpl,.dll,.drv,.efi,.exe,.mui,.ocx,.scr,.sys,.tsp" disabled={loading} />
                </Form.Group>
                <Button disabled={loading} variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </>
    )
}