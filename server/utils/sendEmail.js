import nodemailer from 'nodemailer'

export const sendEmail = async(email, subject, text) => {
    console.log(`ang subject ay:${subject}`)
    console.log(`ang text ay:${text}`)
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: "e.taponmo@gmail.com",
                pass: "dmrshcglagxxchoj"
            }
        })

        await transporter.sendMail({
            from: "e.taponmo@gmail.com",
            to: email,
            subject: subject,
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to E-Tapon Mo.</h2>
            <center>
            <p>Congratulations! You're almost set to start using E-Tapon Mo.
                Just click the button below to validate your email address.
            </p>
            
                <a href=${text} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Validate My Account</a>
            </center>
            </div>
        `
        })
        console.log("Email sent Successfully")
    } catch (error) {
        console.log("Email not sent")
        console.log(error)
    }
}