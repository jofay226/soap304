import { url } from './../node_modules/effect/src/Config';
import express from 'express';
import dotenv from 'dotenv';
import soapRoutes from './routes/soap.route.ts';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
dotenv.config();

app.use(cors({origin: "http://localhost:3000"}))
app.use(bodyParser.text({type: "text/xml"}))
app.use('/api/soap', soapRoutes)




export default app