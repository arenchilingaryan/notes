import { firebaseApp } from "./db"
import { v4 as uuidv4 } from 'uuid'
import { useState } from "react";

const useFoldersService = () => {
    const [requestFolderLoad, setRequestFolderLoad] = useState(false)
    const getAllFolders = () => {
        setRequestFolderLoad(true)
        return firebaseApp.collection("notes").get()
            .then(querySnapshot => {
                const data = []
                querySnapshot.forEach(doc => {
                    data.push(doc.data())
                });
                setRequestFolderLoad(false)
                return data
            });
    }


    const getFolder = (folder) => {
        setRequestFolderLoad(true)
        return firebaseApp.collection('notes').doc(folder).get().then(doc => {
            setRequestFolderLoad(false)
            return doc.data()
        })
    }

    const removeFolder = (folder) => {
        setRequestFolderLoad(true)
        return firebaseApp
            .collection('notes')
            .doc(folder)
            .delete()
            .then(() => setRequestFolderLoad(false))
    }

    const createFolder = (name) => {
        setRequestFolderLoad(true)
        const id = uuidv4()
        const data = {
            id,
            title: name,
            text: ""
        }
        return firebaseApp.collection('notes')
            .doc(id)
            .set(data)
            .then(() => setRequestFolderLoad(false))
    }

    return { getAllFolders, getFolder, removeFolder, createFolder, requestFolderLoad }
}

export default useFoldersService;