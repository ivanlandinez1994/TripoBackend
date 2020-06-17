const AWS = require('aws-sdk');
const fs = require('fs');

const id = 'AKIAIKJ64WEKW76NIOSQ';
const secret = '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';
const buckedName = 'repotripo';

function uploadFile(filename){
    const fileContent = fs.readFileSync(filename);

    const params = {
        Bucket: buckedName,
        Key: "upload.jpg",
        Body: fileContent
    }

    const s3 = new AWS.S3({
        accessKeyId: id,
        secretAccessKey: secret
    });

    s3.upload(params, (err, data) => {
        if(err){
            throw err;
        }
        console.log(`Archivo subido a AWS! ${data.Location}`);
    });
}

uploadFile('./Logo.jpg');