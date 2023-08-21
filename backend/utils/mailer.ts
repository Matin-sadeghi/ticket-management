const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transportDetails = smtpTransport({
    service:"gmail",
    scuree:true,
    auth:{
        user:"test.matinsadeghi@gmail.com",
        pass:"hjygeqrqiglhmlzw",
    },
    tls:{
        rejectUnauthorized: false,
    }
});
export const sendEmail = (email:string,username:string,subject:string,message:string)=>{
    const transport = nodemailer.createTransport(transportDetails)
    transport.sendMail({
        from:"test.matinsadeghi@gmail.com",
        to:email,
        subject:subject,
        html: `<h1> Hi ${username} </h1>
        <br>
        <p>${message}</p>
        <br>
        <p>Form Matin Sadeghi</p>
        `,

    })
}