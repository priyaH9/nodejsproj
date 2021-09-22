const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
})
const AwsInstance = new AWS.SES({apiVersion: '2010-12-01'})
module.exports.sendMail = async (event, context, callback) => {
  const {toEmailAddress, sourceAddress, subject, body} = event.body
  const params = {
    Destination: {
      /* required */
      CcAddresses: [
        //   'info.said.dev@gmail'
        /* more items */
      ],
      ToAddresses: toEmailAddress
    },
    Message: {
      /* required */
      Body: {
        /* required */

        Text: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: sourceAddress /* required */
    //   ReplyToAddresses: [
    //      'EMAIL_ADDRESS',
    //     /* more items */
    //   ],
  }

  //const response = await AwsInstance.sendEmail(params).promise()
  //console.log(response)
  callback({
    status: 'ok',
    message: 'Success',
    code: '200'
  })
}

// curl --request ANY
//    --url https://2f42l2fm7b.execute-api.us-east-1.amazonaws.com/dev/sendMail
