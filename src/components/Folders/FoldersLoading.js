import React from 'react'
import SpinnerLine from '../SpinnerLine/SpinnerLine'
import FoldersSkeleton from './FoldersSkeleton'

const FoldersLoading = ({ show }) => {
    return (
        show && <>
            <SpinnerLine />
            <FoldersSkeleton />
        </>
    )
}

export default FoldersLoading
