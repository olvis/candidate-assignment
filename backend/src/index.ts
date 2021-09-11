import express from 'express';
import {Request, Response} from 'express';
import * as promiseRouter from 'express-promise-router';

const app = express();
const router = promiseRouter.default();
app.use(router);
const port = 3000;


app.get('/hi', (_: Request, res: Response) => {
    res.send("Hello world :)");
});

app.listen(port, () => {
  console.log(`Application is listenning on port: ${port}.`);
});