import React from 'react'
import './DocumentsItem.scss'
import ReactQuill from 'react-quill';
import { Button } from '@material-ui/core';


const EditModeDocument = ({text, setText, onSave, toggleEditMode}) => {
    return (
        <div className="block-mount">
            <ReactQuill
                className="text-field"
                value={text}
                onChange={(value) => setText(value)}
            />
            <div className="documents__item-buttons">
                <Button onClick={onSave} className="document-button" color="primary" variant="contained">
                    Save
                </Button>
                <Button onClick={toggleEditMode} className="document-button" variant="contained">
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default EditModeDocument
