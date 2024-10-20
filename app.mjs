import express from 'express';
import appRouter from './routes/appRouters.mjs';


const app= express();
const PORT = process.env.PORT || 3000;
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use("/",appRouter);

app.listen(PORT, ()=>{console.log('Listening at 3000',PORT)});