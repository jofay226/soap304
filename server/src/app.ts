import express from 'express';
import dotenv from 'dotenv';
import soapRoutes from './routes/soap.route.ts';
import bodyParser from 'body-parser';


const app = express();
dotenv.config();


app.use(bodyParser.text({type: "text/xml"}))
app.use('/api/soap', soapRoutes)




export default app