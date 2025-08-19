import nodemailer from "nodemailer";


export const sendEmail = async({to,subject,text})=>{
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,             
    secure: true,
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        
        }
    })

   const info = await transporter.sendMail({
        from:`Note App  <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text
    })

    console.log(info)
}