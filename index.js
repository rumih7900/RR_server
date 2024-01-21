import express from 'express'
import cors from "cors";
import dotenv from 'dotenv'
import axios from 'axios'
import bodyParser from 'body-parser'
import emailjs from '@emailjs/nodejs';
const app = express()
const port = process.env.PORT || 3001

dotenv.config();
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://localhost:25001","https://resolverroom.com"] }));
app.use(bodyParser.json({ limit: '500mb' }))
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }))


app.get('/health', (req, res) => {
  res.send(`The Server's Health is good`);
})

app.post('/booking',(req,res)=>{
    const {data} = req.body; 
    //console.log(req.data);
        // Create an object with EmailJS service ID, template ID, Public Key, and Template params
        const data_booking = {
          service_id: process.env.SERVICE_ID,
          template_id: process.env.TEMPLATE_ID,
          user_id: process.env.PUBLICKEY,
          template_params: data
        };
        console.log(data_booking);
       

        emailjs.send(process.env.SERVICE_ID,process.env.TEMPLATE_ID,data,{publicKey:process.env.PUBLICKEY})
        .then(res=>{
            return res
                .json({
                    success: true,
                    message: "We've received your concern , our team will reach out to you soon "
                })

          })
        .catch(error=>{
            console.log(error);
            return res
                .json({
                    success: false,
                    message: "There was an error, if it persists contact us via email in the footer",
                 })
        })

        // Send the email using EmailJS
        // axios.post("https://api.emailjs.com/api/v1.0/email/send",data_booking)
        //   .then(res=>{
        //     return res
        //         .json({
        //             success: true,
        //             message: "We've received your concern , our team will reach out to you soon "
        //         })

        //   })
        // .catch(error=>{
        //     console.log(error);
        //     return res
        //         .json({
        //             success: false,
        //             message: "There was an error, if it persists contact us via email in the footer",
        //          })
        // })
       


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})