import React, { Component } from 'react'
import classes from './FormDocument.scss'
import Aux from '../../hoc/Auxiliary/Auxiliary'

//Import Firebase
import firebase from 'firebase';

//Import npm bulma
import 'bulma/css/bulma.css'

//Import npm react-filepond
import { FilePond, File, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// FilePond Register plugin
import FilePondImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondImagePreview);

class FormDocument extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [], //ใช้เก็บข้อมูล File ที่ Upload
            uploadValue: 0, //ใช้เพื่อดู Process การ Upload
            filesMetadata: [], //ใช้เพื่อรับข้อมูล Metadata จาก Firebase
            rows: [], //ใช้วาด DataTable
        }

        // Initialize Firebase
        var firebaseConfig = {
            apiKey: "AIzaSyDqn1E_auHbCfQz_Qqo8u4yy-XQIozZicw",
            authDomain: "true-e-logistics.firebaseapp.com",
            databaseURL: "https://true-e-logistics.firebaseio.com",
            projectId: "true-e-logistics",
            storageBucket: "true-e-logistics.appspot.com",
            messagingSenderId: "638740245289",
            appId: "1:638740245289:web:32fd5536cda3b8f4"
        }
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }
    }

    handleInit() {
        // handle init file upload here
        console.log('now initialised', this.pond);
    }

    handleRevert = (userKey) => (uniqueFileId, load, error) => {
        console.log('uniqueFileId', uniqueFileId, this.pond.getFile())
        // const storageRef = firebase.storage().ref()
        // const desertRef = storageRef.child(`${userKey}/`)
        // desertRef.delete().then(() => {
        //     console.log('delete success')
        // }).catch((error) => {
        //     console.log(error)
        // })
    }

    handleOnProcessFileRevert = (userKey, { file }) => {
        console.log('file name', file.name, userKey)
        const storageRef = firebase.storage().ref()
        const desertRef = storageRef.child(`${userKey}/${file.name}`)
        desertRef.delete().then(() => {
            console.log('delete success')
        }).catch((error) => {
            console.log(error)
        })
    }

    handleProcessing = (userKey) => (fieldName, file, metadata, load, error, progress, abort) => {
        // handle file upload here
        console.log(" handle file upload here", userKey)
        console.log(file);
        console.log(load)
        const fileUpload = file
        const storageRef = firebase.storage().ref(`${userKey}/${file.name}`);
        const task = storageRef.put(fileUpload)

        task.on(`state_changed`, (snapshort) => {
            console.log(snapshort.bytesTransferred, snapshort.totalBytes)
            progress(true, snapshort.bytesTransferred, snapshort.totalBytes)
            // let percentage = (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
            //Process
            // this.setState({
            //     uploadValue: percentage
            // })
        }, (error) => {
            //Error
            console.log(error)
        }, () => {
            //Success
            console.log('upload success')
            //Get metadata
            storageRef.getMetadata().then((metadata) => {
                // Metadata now contains the metadata for 'filepond/${file.name}'
                load(metadata)
                console.log('metadata', metadata)
                let metadataFile = {
                    name: metadata.name,
                    size: metadata.size,
                    contentType: metadata.contentType,
                    fullPath: metadata.fullPath
                }
                //Process save metadata
                const databaseRef = firebase.database().ref(`/form/${userKey}`)
                databaseRef.push({ metadataFile });
            }).catch((error) => {
                console.log(error)
            })

        })
    }

    render() {
        const { userKey } = this.props
        console.log('user key', this.props, this.state)
        return (
            <Aux>
                <div className="Margin-25">
                    {/* Pass FilePond properties as attributes */}
                    <div>copy of utility bill &amp; copy of social security number</div>
                    <FilePond allowMultiple={true}
                        maxFiles={2}
                        ref={ref => this.pond = ref}
                        server={{
                            process: this.handleProcessing(userKey),
                            revert: this.handleRevert(userKey),
                        }}
                        oninit={() => this.handleInit()}
                        instantUpload={false}
                        onupdatefiles={(fileItems) => {
                            // Set currently active file objects to this.state
                            this.setState({
                                files: fileItems.map(fileItem => fileItem.file)
                            });
                        }}
                        onprocessfilerevert={(file) => {
                            this.handleOnProcessFileRevert(userKey, file)
                        }}
                    />

                </div>
            </Aux>
        )
    }
}
export default FormDocument