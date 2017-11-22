# webpack-s3-plugin-ku

An alternative Webpack S3 file uplaod plugin 

##### Installation 
```bash
npm -i webpack-s3-plugin-ku

```

##### Usage
```bash	
	var KUWebpackS3Depoloyment = require('webpack-s3-plugin-ku');

	module.exports = {
	    plugins: [
	        new CommonsChunkPlugin({
	            "name": "inline",
	            "minChunks": null
	        }),
	        new CommonsChunkPlugin({
	            "name": "vendor",
	            "minChunks": function (module) {
	                return module.resource && module.resource.startsWith(nodeModules)
	            },
	            "chunks": [
	                "main"
	            ]
	        }),
	        new KUWebpackS3Depoloyment({
	            s3Options: {
	                accessKeyId: "accessKeyId",
	                secretAccessKey: "secretAccessKey",
	                region: "region",
	                signatureCache:false,
	            },
	            s3UploadOptions: {
	                bucket: "defaultBucket"
	            }
	        })
	    ]
	};


```
