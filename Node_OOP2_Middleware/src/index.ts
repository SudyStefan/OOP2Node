import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from 'body-parser';
import cors from 'cors'
import router from "./controller";


const app: Application = express();
const PORT = 8011;

app.use('/', router);
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`);
});