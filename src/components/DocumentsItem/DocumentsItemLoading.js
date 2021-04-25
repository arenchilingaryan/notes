import React from 'react'
import SpinnerLine from '../SpinnerLine/SpinnerLine'
import DocumentsItemSkeleton from './DocumentsItemSkeleton'

const DocumentsItemLoading = () => {
    return (
        <>
            <SpinnerLine />
            <DocumentsItemSkeleton />
        </>
    )
}

export default DocumentsItemLoading
