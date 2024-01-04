// import nodemailer from 'nodemailer'
// import Mail from 'nodemailer/lib/mailer'

// const transporter = nodemailer.createTransport({
//   service: 'qq',
//   host: 'smtp.qq.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: '772778995@qq.com',
//     pass: 'kouycvhkbaaebfaa'
//   }
// })

// export const sendMail = (options: Mail.Options) => {
//   options = Object.assign(
//     {
//       from: `772778995@qq.com`,
//       subject: '副标题'
//     } as Mail.Options,
//     options
//   )
//   return new Promise((resolve, reject) => {
//     transporter.sendMail(options, (err, data) => {
//       if (err) return reject(err)
//       resolve(data)
//     })
//   })
// }
export const sendMail = (options: any) => {
  return options
}
