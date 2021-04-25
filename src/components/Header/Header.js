import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import './Header.scss'
import Modal from '../Modal/Modal';
import { Input, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from 'react-router-dom';
import useFoldersService from '../../services/useFoldersService';

const Header = ({ children }) => {
    const [addFolderModalIsOpen, setAddFolderModalIsOpen] = useState(false)
    const [folderModalText, setFolderModalText] = useState("")

    const { createFolder } = useFoldersService()

    const toggleAddFolderModal = () => setAddFolderModalIsOpen(prev => !prev)

    const createFolderHandler = () => createFolder(folderModalText).then(() => {
        setFolderModalText("")
        toggleAddFolderModal()
    })
    
    return (
        <>
            <header className="header">
                <NavLink to="/" className="header__add">
                    <HomeIcon />
                    Home
                </NavLink>
                <div className="header__add" onClick={toggleAddFolderModal}>
                    <AddIcon />
                    Add folder
                </div>
            </header>
            <div className="main-wrapper">
                {children}
            </div>
            {addFolderModalIsOpen && <Modal
                show={addFolderModalIsOpen}
                onClose={toggleAddFolderModal}
                title="Add folder"
            >
                <div className="modal-body">
                    <h2>Enter the name:</h2>
                    <Input
                        onChange={e => setFolderModalText(e.target.value)}
                        style={{ margin: '20px 0' }}
                        fullWidth
                        name="title"
                        value={folderModalText}
                    />
                    <div className="request-buttons modal-buttons">
                        <Button onClick={createFolderHandler} color="primary" variant="contained">
                            Create
                        </Button>
                    </div>
                </div>
            </Modal>}
        </>
    )
}

export default Header
