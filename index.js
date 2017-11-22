/**
 * @author Ozgur Cimen on 15-May-17.
 */

let AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const util = require('util');
const s3util = require('./mimatypes');

function KUWebpackS3Depoloyment(options) {
    console.log('s3 options : ',options);

    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = options.s3Options.accessKeyId;
    AWS.config.secretAccessKey = options.s3Options.secretAccessKey;
    AWS.config.region = options.s3Options.region;
    const bucketName = options.s3UploadOptions.bucket;
    let s3 = new AWS.S3();

    this.apply = function(compiler){
        compiler.plugin('after-emit', function(compilation,callback) {
            let files = [];
            for(let a in compilation.assets) files.push({name:a, path:compilation.assets[a].existsAt});

            startUpload(files,s=>{
                callback();
            },e=>{
                console.error("S3 Deployment.ERROR:",e);
                callback();
            })
        });
    };

    const startUpload = (files,callback,error) =>{
        console.log("S3 Deployment Plugin upload started total file : ",files.length);
        let c = 0 ;
        const doNext = ()=>{
            if(c >= files.length) return callback();
            uploadFile(files[c],s=>{
                console.log("File uploaded total process : " + Math.floor((100*c)/files.length)+'%');
                c++;doNext()
            },e=>error(e));
        };

        doNext();
    };

    const uploadFile = (file,callback,error) =>{
        console.log("S3 Deployment Plugin start uploading file :", file.name);


        let name = file.name;
        let l = name.length;

        if(name.substr(0,2) == "./")
            file.name = name.substr(2,name.length);

        let extn = name.substr(name.lastIndexOf(".")+1,l);


        let fstream = fs.createReadStream(file.path);
        fstream.on('error', function(err) {
            console.log('File Error', err);
            if(error) error();
            return;
        });

        let params = {
            Bucket:bucketName,
            Key: file.name,
            Body: fstream,
            ACL:'public-read'
        };

        params.ContentType = s3util.getContentType(extn);

        s3.upload (params, function (err, data) {
            if (err) {
                if(error) error(err);
            } if (data) {
                //console.log("Upload Success", data.Location);
                if(callback) callback();
            }
        });
    }
}

module.exports = KUWebpackS3Depoloyment;
