import React from 'react'
import SpinnerLine from '../SpinnerLine/SpinnerLine'
import DocumentsSkeleton from './DocumentsSkeleton'

const DocumentsLoading = () => {
    return (
        <>
            <SpinnerLine />
            <DocumentsSkeleton />
        </>
    )
}

export default DocumentsLoading
