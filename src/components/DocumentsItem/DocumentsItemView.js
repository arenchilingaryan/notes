import React from 'react'
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import useDocumentService from '../../services/useDocumentService';

const DocumentsItemView = ({ text, toggleEditMode, history, item, folderId }) => {
    const { removeDocument } = useDocumentService()

    const onRemove = () => removeDocument(folderId, item).then(() => history.goBack())

    return (
        <div className="block-mount">
            <div dangerouslySetInnerHTML={{ __html: text }} />
            <div className="documents__item-buttons">
                <Button onClick={toggleEditMode} className="document-button" color="primary" variant="contained">
                    Edit
                </Button>
                <Button onClick={onRemove} className="document-button" color="secondary" variant="contained">
                    delete
                </Button>
            </div>
        </div>
    )
}

export default withRouter(DocumentsItemView)
