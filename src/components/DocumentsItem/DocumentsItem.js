import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import './DocumentsItem.scss'
import useDocumentService from '../../services/useDocumentService';
import { withRouter } from 'react-router-dom';
import useFoldersService from '../../services/useFoldersService';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditModeDocument from './EditModeDocument';
import DocumentsItemView from './DocumentsItemView';
import DocumentsItemLoading from './DocumentsItemLoading';

const DocumentsItem = ({ match, history }) => {
    const [folder, setFolder] = useState()
    const [item, setItem] = useState({})
    const [text, setText] = useState("")
    const [editMode, setEditMode] = useState(false)
    const { getDocument, changeDocumentText, removeDocument, requestDocLoad } = useDocumentService()
    const { getFolder } = useFoldersService()

    useEffect(() => {
        updateData()
    }, [])

    const updateData = () => {
        getDocument(match.params.folderId, match.params.documentId).then(item => {
            setItem(item)
            setText(item.text)
        })
        getFolder(match.params.folderId).then(res => setFolder(res))
    }

    const onSave = () =>
        changeDocumentText(folder, item, text).then(() => getBack())

    const getBack = () => history.goBack()

    const toggleEditMode = () => setEditMode(prev => !prev)

    return (
        <>
            <ArrowBackIcon onClick={getBack} className="arrow-back-documentItem" />
            <div className="document-item">
                <h1 className="document-title">{item?.title}</h1>
                {requestDocLoad
                    ? <DocumentsItemLoading />
                    : !editMode
                        ? <DocumentsItemView
                            text={item.text}
                            toggleEditMode={toggleEditMode}
                            item={item}
                            folderId={folder?.id}
                        />
                        : <EditModeDocument
                            text={text}
                            setText={setText}
                            onSave={onSave}
                            toggleEditMode={toggleEditMode}
                        />}
            </div>
        </>
    )
}

export default withRouter(DocumentsItem)
