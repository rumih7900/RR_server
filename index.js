import express from 'express'
import cors from "cors";
import dotenv from 'dotenv'
const app = express()
const port = process.env.PORT || 3001

dotenv.config();
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://localhost:25001","https://resolverroom.com"] }));

app.get('/health', (req, res) => {
  res.send(`The Server's Health is good`);
})

app.post('/booking',(req,res)=>{
    const {data} = req.body; 
        // Create an object with EmailJS service ID, template ID, Public Key, and Template params
        const data_booking = {
          service_id: process.env.SERVICE_ID,
          template_id: process.env.TEMPLATE_ID,
          user_id: process.env.PUBLICKEY,
          template_params: data
        };
    
        // Send the email using EmailJS
          axios.post("https://api.emailjs.com/api/v1.0/email/send", data_booking)
          .then(res=>{
            return res
                .json({
                    success: true,
                    message: "We've received your concern , our team will reach out to you soon "
                })

          })
        .catch(error=>{
            return res
                .json({
                    success: false,
                    message: "There was an error, if it persists contact us via email in the footer",
                 })
        })


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})