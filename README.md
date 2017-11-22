# webpack-s3-plugin-ku

Webpack S3 file uplaod plugin 

##### Installation 
```bash
npm -i webpack-s3-plugin-ku

```

##### Usage
```bash

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
	        new S3Plugin({
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