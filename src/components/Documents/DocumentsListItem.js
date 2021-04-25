import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Modal from '../Modal/Modal'
import DescriptionIcon from '@material-ui/icons/Description';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation'
import useDocumentService from '../../services/useDocumentService';


const DocumentsListItem = ({ item, match, updateData }) => {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
    const { removeDocument } = useDocumentService()

    const toggleOpenDeleteModal = () =>
        setIsOpenDeleteModal(prev => !prev)

    const onRemoveHandler = () => removeDocument(match.params.folderId, item).then(() => {
        toggleOpenDeleteModal()
        updateData()
    })

    return (
        <>
            <div className="documents-item">
                <CancelPresentationIcon className="documents__delete" onClick={toggleOpenDeleteModal} />
                <Link to={`/${match.params.folderId}/${item.id}`} className="documents-item" >
                    <DescriptionIcon className="documents-item__icon" key={item.id} />
                    <p className="documents-item__title">{item.title}</p>
                </Link>
            </div>
            {isOpenDeleteModal && <Modal
                show={isOpenDeleteModal}
                onClose={toggleOpenDeleteModal}
                title="Remove Folder"
            >
                <div className="modal-body">
                    <h2 className="folders-item-modal-title">Are you sure to remove document {item.title}?</h2>
                    <div className="request-buttons modal-buttons">
                        <Button
                            className="document-button request-buttons-item"
                            color="primary"
                            variant="contained"
                            onClick={onRemoveHandler}
                        >
                            Yes
                        </Button>
                        <Button onClick={toggleOpenDeleteModal}>No</Button>
                    </div>
                </div>
            </Modal>}
        </>
    )
    }

    export default withRouter(DocumentsListItem)
