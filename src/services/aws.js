import AWS from 'aws-sdk';
// import http from 'lib/http-config';


class AwsService {
    async awsListing(state, prefix = "") {
        // state.aws.credentials
        const { credentials, bucket, region } = state.aws.credentials;
        const creds = new AWS.Credentials({
            accessKeyId: credentials.access_key_id,
            secretAccessKey: credentials.secret_access_key,
            sessionToken: credentials.session_token
        });
        AWS.config.update({
            region: region,
            credentials: creds
            //     accessKeyId: credentials.access_key_id,
            //     expireTime: credentials.secret_access_key,
            //     expired: credentials.expired,
            //     sessionToken: credentials.session_token
            // }
        });
        const params = {
            Delimiter: '/',
            Bucket: bucket,
            Prefix: prefix //'undefined/bob/'
        };
        const s3 = new AWS.S3({ apiVersion: '2006-03-01', params: { Bucket: bucket }}); //,
        // console.log('s3', s3);
        // console.log('AWS config', AWS.config);
        // console.log('AWS CREDS', creds.accessKeyId);
        // console.log("Here", params);
        const listObjPromise = s3.listObjectsV2(params).promise();
        // console.log("Here", credentials.bucket);
        // return s3.listObjectsV2(params, (err, data) => {
        return listObjPromise.then((data, err) => {

            // console.log('err', err);
            // console.log('err', err);
            // console.log("PromiseList");
            // let name = '';
            let id = null;
            let path = 's3/';
            let name = 's3/';
            let prefixChild = '';
            // console.log("data", data);
            if (data.Prefix !== 's3/') {
                path = data.Prefix;
                const dirs = data.Prefix.split('/');
                dirs.pop();
                name = dirs.pop();
                name += '/';
                id = Math.random().toString(36).substr(2, 9);
            }
            
            // const result_node = {
            //     id,
            //     path,
            //     name,
            //     isFolder: true,
            //     opened: false,
            //     childrens: []
            // };
            
            const result_node = [];
            
            data.CommonPrefixes.forEach((element) => {
                const dirs = element.Prefix.split('/');
                prefixChild = dirs.join('/');
                dirs.pop();
                name = dirs.pop();
                name += '/';
                result_node.push({
                    id: Math.random().toString(36).substr(2, 9),
                    path: prefixChild,
                    name,
                    isFolder: true,
                    opened: false,
                    children: []
                });
            });
            data.Contents.forEach((element) => {
                const dirs = element.Key.split('/');
                name = dirs.pop();
                result_node.push({
                    id: Math.random().toString(36).substr(2, 9),
                    path: element.Key,
                    name,
                    isFolder: false,
                    children: [],
                    key: element.Key,
                    versionId: element.VersionId
                });
            });
            return result_node;
        })
    };

    async awsUploadFolder(state, folderName) {
        const { credentials, bucket, region } = state.aws.credentials;
        const creds = new AWS.Credentials({
            accessKeyId: credentials.access_key_id,
            secretAccessKey: credentials.secret_access_key,
            sessionToken: credentials.session_token
        });
        AWS.config.update({
            region: region,
            credentials: creds
        });

        const s3 = new AWS.S3({ apiVersion: '2006-03-01', params: { Bucket: bucket } });

        const params = {
            Body: new ArrayBuffer(),
            Bucket: bucket,
            Key: `${folderName}/.keep`
        };

        return s3.putObject(params, (err, data) => {
            if (err) {
                console.log('error', err.stack);
            } else {
                // console.log(data);
            }
        });

    }
    //
    // async awsDeleteFolder({ state }, currentNode) {
    //     const creds = new AWS.Credentials(state.credentials.access_key_id, state.credentials.secret_access_key, state.credentials.session_token);
    //     AWS.config.update({
    //         region: state.region,
    //         credentials: creds
    //     });
    //     const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    //
    //     const params = { Bucket: state.bucket, Delete: { Objects: [] } };
    //     const getAllKeys = function (node, params) {
    //         node.childrens.forEach((element) => {
    //             if (element.isFolder) {
    //                 getAllKeys(element, params);
    //             } else {
    //                 params.Delete.Objects.push({
    //                     Key: element.path
    //                 });
    //             }
    //         });
    //     };
    //     getAllKeys(state.node, params);
    //     if (params.Delete.Objects.length > 0) {
    //         const deleteObject = s3.deleteObjects(params).promise();
    //         return deleteObject;
    //     }
    // }
    //
    // async awsDeleteFile({ state }, currentNode) {
    //     const creds = new AWS.Credentials(state.credentials.access_key_id, state.credentials.secret_access_key, state.credentials.session_token);
    //     AWS.config.update({
    //         region: state.region,
    //         credentials: creds
    //     });
    //     const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    //
    //     console.log(state.node);
    //     const params = {
    //         Bucket: state.bucket,
    //         Delete: {
    //             Objects: [
    //                 {
    //                     Key: currentNode.path
    //                 }
    //             ]
    //         }
    //     };
    //     const deleteObject = s3.deleteObjects(params).promise();
    //     return deleteObject;
    // }
    //
    async awsUploadFile(state, { buffer, name, type }) {
        const { credentials, bucket, region } = state.aws.credentials;
        const creds = new AWS.Credentials({
            accessKeyId: credentials.access_key_id,
            secretAccessKey: credentials.secret_access_key,
            sessionToken: credentials.session_token
        });
        AWS.config.update({
            region: state.region,
            credentials: creds
        });

        const s3 = new AWS.S3({ apiVersion: '2006-03-01', params: { Bucket: bucket }, endpoint: "http://static.nr.s3.amazonaws.com"});

        const params = {
            ACL: 'public-read',
            Body: buffer,
            Bucket: bucket,
            Key: `${state.tree.currentFilePath}${name}`,
            ContentType: type,
            ServerSideEncryption: 'AES256'
        };
        return s3.putObject(params, (err, data) => {
            if (err) {
                console.log('error', err.stack);
            } else {
                console.log(data);
            }
        });
    }



    // async awsGetFile(state) {
    //     const { credentials, bucket, region } = state.aws.credentials;
    //     const creds = new AWS.Credentials({
    //         accessKeyId: credentials.access_key_id,
    //         secretAccessKey: credentials.secret_access_key,
    //         sessionToken: credentials.session_token
    //     });
    //     AWS.config.update({
    //         region: region,
    //         credentials: creds
    //     });
    //
    //     const s3 = new AWS.S3({ apiVersion: '2006-03-01', params: { Bucket: bucket } });
    //     const params = {
    //         Bucket: bucket,
    //         Key: state.tree.node.path
    //     };
    //     return s3.getObject(params, (err, data) => {
    //         if (err) {
    //             console.log('error', err.stack);
    //         } else {
    //             console.log('get object result', data);
    //         }
    //     });
    // }
}



export default new AwsService();
