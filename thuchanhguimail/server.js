import express from 'express'
import nodemailer from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'

const app = express()

app.use(express.json())

// cấu hình các biến môi trường

const APP_PORT = 2507
const APP_HOST = 'localhost'
const GOOGLE_MAILER_CLIENT_ID = "483591142930-cmsot49akvgaih423jf14s1mljugujjg.apps.googleusercontent.com"
const GOOGLE_MAILER_CLIENT_SECRET = "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"
const GOOGLE_MAILER_REFRESH_TOKEN = '1//04hRVBEdujnniCgYIARAAGAQSNwF-L9IrgaqHkvd_l3AAQbZPPsHqR-XXF_yCBeqRQHaTi-ETxq953zxjM-VE8HTX-iMq9nJJeM8'
const ADMIN_EMAIL_ADDRESS = 'lethebao2507@gmail.com'

const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET
)


myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})

app.post('/email/send', async (req, res) => {
    try {
        // Lấy thông tin gửi lên từ client qua body
        const { email, subject, content } = req.body
        if (!email || !subject || !content) throw new Error('nộp 100k rồi hết lỗi')
        // lấy token
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()
        // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
        const myAccessToken = myAccessTokenObject?.token
        // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: GOOGLE_MAILER_CLIENT_ID,
                clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken
            }
        })
        // mailOption là những thông tin gửi từ phía client lên thông qua API
        const mailOptions = {
            to: email, // Gửi đến ai?
            subject: subject, // Tiêu đề email
            html: `<h3>${content}</h3>` // Nội dung email
        }
        // Gọi hành động gửi email
        await transport.sendMail(mailOptions)
        // Không có lỗi gì thì trả về success
        res.status(200).json({ message: 'Email sent successfully.' })
    } catch (error) {
        // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
        console.log(error)
        res.status(500).json({ errors: error.message })
    }
})

app.listen(APP_PORT,APP_HOST, () => {
    console.log('hello bay be')
})
