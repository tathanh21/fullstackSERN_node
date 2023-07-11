require('dotenv').config;
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    if (dataSend.language === 'vi') {
        let info = await transporter.sendMail({
            from: '"Tat thanh👻" <tatthanhk50pt@gmail.com>', // sender address
            to: dataSend.receiverEmail, // list of receivers
            subject: "Thông Tin Đặt Lịch Khám Bệnh", // Subject line
            html: `
            <h3>Xin Chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này thì đã đặt lịch khám bệnh online trên Booking Care</p>
            <p>Thông tin đặt lịch khám bệnh:<p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link để hoàn tất thủ tục khám bệnh.</p>
            <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>
            <div>
                Xin chân thành cảm ơn.
            </div>
            ` , // html body
        });
    }

    if (dataSend.language === 'en') {
        let info = await transporter.sendMail({
            from: '"Tat thanh👻" <tatthanhk50pt@gmail.com>', // sender address
            to: dataSend.receiverEmail, // list of receivers
            subject: "Thông Tin Đặt Lịch Khám Bệnh", // Subject line
            html: `
            <h3>Dear. ${dataSend.patientName}!</h3>
            <p>If you received this email, you have already booked an online medical appointment on Booking Care</p>
            <p>Information to schedule an appointment:<p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor: ${dataSend.doctorName}</b></div>
            <p>If the above information is true, please click on the link to complete the medical examination.</p>
            <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>
            <div>
            Sincerely thank!
            </div>
            `, // html body
        });
    }
}


let sendAttachment = async (dataSend) => {
    console.log('data', dataSend)
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });
    if (dataSend.language === 'vi') {
        let info = await transporter.sendMail({
            from: '"Tat thanh👻" <tatthanhk50pt@gmail.com>', // sender address
            to: dataSend.email, // list of receivers
            subject: "Kết Quả Đặt Lịch Khám Bệnh", // Subject line
            attachments: [
                {
                    filename: `remedy-${dataSend.patientId}-${dataSend.patientName}.png`,
                    content: dataSend.imgBase64.split("base64,")[1],
                    encoding: "base64"
                }
            ],
            html: `
            <h3>Xin Chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này thì đã đặt lịch khám bệnh online trên Booking Care thành công</p>
            <p>Thông tin đơn thuốc, hóa đơn được gửi trong file đính kèm.<p>
            <div>Xin chân thành cảm ơn !</div>
            ` , // html body
        });
    }

    if (dataSend.language === 'en') {
        let info = await transporter.sendMail({
            from: '"Tat thanh👻" <tatthanhk50pt@gmail.com>', // sender address
            to: dataSend.email, // list of receivers
            subject: "Kết quả Đặt Lịch Khám Bệnh", // Subject line
            attachments: [
                {
                    filename: `remedy-${dataSend.patientId}-${dataSend.patientName}.png`,
                    content: dataSend.imgBase64.split("base64,")[1],
                    encoding: "base64"
                }
            ],
            html: `
            <h3>Dear. ${dataSend.patientName}!</h3>
            <p>If you received this email, you have already booked an online medical appointment on Booking Care</p>
            <p>
            Information on prescriptions and invoices is sent in the attached file:<p>
            <div>
            Sincerely thank!
            </div>
            `, // html body
        });
    }

}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}













// let getBodyHTMLEmail = (dataSend) => {
//     let result = ''
//     if (dataSend.language === 'vi') {
//         result = `
// <h3>Xin Chào ${dataSend.patientName}!</h3>
// <p>Bạn nhận được email này thì đã đặt lịch khám bệnh online trên Booking Care</p>
// <p>Thông tin đặt lịch khám bệnh:<p>
// <div><b>Thời gian: ${dataSend.time}</b></div>
// <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
// <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link để hoàn tất thủ tục khám bệnh.</p>
// <div>
// <a href=${dataSend.redirectLink} target="_blank">Click here</a>
// </div>
// <div>
//     Xin chân thành cảm ơn.
// </div>
// `
//     }
//     if (dataSend.language === 'en') {
//         result = `
// <h3>Dear. ${dataSend.patientName}!</h3>
// <p>If you received this email, you have already booked an online medical appointment on Booking Care</p>
// <p>Information to schedule an appointment:<p>
// <div><b>Time: ${dataSend.time}</b></div>
// <div><b>Doctor: ${dataSend.doctorName}</b></div>
// <p>If the above information is true, please click on the link to complete the medical examination.</p>
// <div>
// <a href=${dataSend.redirectLink} target="_blank">Click here</a>
// </div>
// <div>
// Sincerely thank!
// </div>
// `
//     }
// }