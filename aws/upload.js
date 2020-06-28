const AWS = require('aws-sdk');
const fs = require('fs');
const uuid = require('node-uuid');

const id = 'AKIAJDQJ65ZYBMKW2X2A';
const secret = '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';
const buckedName = 'repotripo';

const sendImage = async (filename) => {
    const fileContent = fs.readFileSync(filename);

    const params = {
        Bucket: buckedName,
        Key: "Desarrollo/"+uuid.v4()+".jpg",
        Body: fileContent,
        ACL:'public-read'
    }

    const s3 = new AWS.S3({
        accessKeyId: id,
        secretAccessKey: secret
    });

    var rutaImagen = await s3.upload(params, (err, data) => {
        if(err){
            throw err;
        }
        return data;
    }).promise().catch((err)=>{"No se pudo subir el archivo "+err})

    return rutaImagen.Location
}

module.exports = sendImage;