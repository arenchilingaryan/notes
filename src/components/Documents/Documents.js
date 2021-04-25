import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import useFoldersService from '../../services/useFoldersService';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from '../Modal/Modal'
import './Documents.scss'
import { Input, Button } from '@material-ui/core';
import useDocumentService from '../../services/useDocumentService';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DocumentsListItem from './DocumentsListItem';
import Skeleton from 'react-loading-skeleton'
import DocumentsLoading from './DocumentsLoading'


const Documents = ({ match, history }) => {
    const [currentFolder, setCurrentFolder] = useState({})
    const [isOpenAddDocModal, setIsOpenAddDocModal] = useState(false)
    const [documentModalText, setDcumentModalText] = useState("")

    const { createDocument } = useDocumentService()
    const { getFolder, requestFolderLoad } = useFoldersService()

    useEffect(() => {
        updateData()
    }, [])

    const updateData = () =>
        getFolder(match.params.folderId).then(res => setCurrentFolder(res))


    const createDocHandler = () =>
        createDocument(match.params.folderId, documentModalText)
            .then(() => {
                toggleAddDocModalOpen()
                updateData()
            })

    const toggleAddDocModalOpen = (e) =>
        setIsOpenAddDocModal(prev => !prev)

    return (
        <>
            <h1 className="documents-title">
                {!requestFolderLoad ? currentFolder && currentFolder.title : <Skeleton width={300} />}
            </h1>
            <ArrowBackIcon onClick={() => history.goBack()} className="arrow-back" />
            {requestFolderLoad && <DocumentsLoading />}
            {!requestFolderLoad && <div className="folders__wrapper block-mount">
                <div className="documents-item" onClick={toggleAddDocModalOpen}>
                    <AddBoxIcon className="documents-item__icon-add" key={
                        currentFolder ? currentFolder.id : 'addIcon'
                    } />
                    <p className="documents-item__title">Add Document</p>
                </div>
                {currentFolder && currentFolder.documents && currentFolder.documents.map(item => {
                    return <DocumentsListItem
                        item={item}
                        updateData={updateData}
                    />
                })}
            </div>}
            {isOpenAddDocModal && <Modal
                show={isOpenAddDocModal}
                onClose={toggleAddDocModalOpen}
            >
                <div className="modal-body">
                    <h1 className="modal-title">
                        Add folder
                    </h1>
                    <Input
                        onChange={e => setDcumentModalText(e.target.value)}
                        style={{ margin: '20px 0' }}
                        fullWidth
                        name="title"
                        value={documentModalText}
                    />
                    <Button onClick={createDocHandler} color="primary" variant="contained">Create Document</Button>
                </div>
            </Modal>}
        </>
    )
}

export default withRouter(Documents)
