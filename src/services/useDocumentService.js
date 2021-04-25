import { firebaseApp } from "./db"
import { v4 as uuidv4 } from 'uuid'
import firebase from 'firebase'
import { useState } from "react"

const useDocumentService = () => {
    const [requestDocLoad, setRequestDocLoad] = useState(false)

    const getDocument = (folderId, docId) => {
        setRequestDocLoad(true)
        return firebaseApp.collection('notes')
        .doc(folderId)
        .get()
        .then(res => {
            let result = null
            res.data().documents.map(el => {
                if (el.id === docId) {
                    result = el
                }
            })
            setRequestDocLoad(false)
            return result
        })
    }
        

    const removeDocument = (folderId, item) => {
        setRequestDocLoad(true)
        return firebaseApp.collection('notes')
            .doc(folderId)
            .update({
                documents: firebase.firestore.FieldValue.arrayRemove(item)
            }).then(() => setRequestDocLoad(false))
    }

    const createDocument = (docId, docName) => {
        setRequestDocLoad(true)
        const data = {
            id: uuidv4(),
            title: docName,
            text: ""
        }
        return firebaseApp.collection('notes').doc(docId).update({
            documents: firebase.firestore.FieldValue.arrayUnion(data)
        }).then(() => setRequestDocLoad(false))
    }

    const changeDocumentText = (folder, item, text) => {
        setRequestDocLoad(true)
        const documents = folder.documents.map(
            it => it.id === item.id
                ? { title: item.title, id: item.id, text }
                : it
        )
        const newFolder = {
            id: folder.id,
            title: folder.title,
            documents
        }
        return firebaseApp.collection('notes')
            .doc(folder.id)
            .update(newFolder)
            .then(() => setRequestDocLoad(false))
    }

    return { getDocument, removeDocument, createDocument, changeDocumentText, requestDocLoad }
}

export default useDocumentService;