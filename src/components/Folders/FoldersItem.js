import React, { useState } from 'react'
import { FolderSharp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import Modal from '../Modal/Modal';
import { Button } from '@material-ui/core';
import useFoldersService from '../../services/useFoldersService';


const FoldersItem = ({ item, updateData }) => {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
    const { removeFolder } = useFoldersService()

    const toggleOpenDeleteModal = () =>
        setIsOpenDeleteModal(prev => !prev)

    const onRemoveHandler = () => removeFolder(item.id).then(() => {
        toggleOpenDeleteModal()
        updateData()
    })

    return (
        <>
            <div className="folders-item">
                <CancelPresentationIcon className="folders__delete" onClick={toggleOpenDeleteModal} />
                <Link to={`/${item.id}`} className="folders-item" >
                    <FolderSharp className="folder-item__icon" />
                    <p className="folder-item__title">{item.title}</p>
                </Link>
            </div>
            {isOpenDeleteModal && <Modal
                show={isOpenDeleteModal}
                onClose={toggleOpenDeleteModal}
                title="Remove Folder"
            >
                <div className="modal-body">
                    <h2 className="folders-item-modal-title">Are you sure to remove folder {item.title}?</h2>
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

export default FoldersItem
