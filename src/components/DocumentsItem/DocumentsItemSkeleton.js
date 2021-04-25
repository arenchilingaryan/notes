import React from 'react'
import Skeleton from 'react-loading-skeleton';
import './Skeleton.scss'

const DocumentsItemSkeleton = () => {
    return (
        <div>
            <div className="document-title">
                <Skeleton className="document-title-skeleton" height={40} width={200} />
            </div>
            <div className="column-skeleton">
                <Skeleton className="skeleton-item-line" height={20} />
                <Skeleton className="skeleton-item-line" height={20} />
                <Skeleton className="skeleton-item-line" height={20} />
                <Skeleton className="skeleton-item-line" height={20} />
                <Skeleton className="skeleton-item-line" height={20} />
                <Skeleton className="skeleton-item-line" height={20} />
                <Skeleton className="skeleton-item-line" height={20} />
                <Skeleton className="skeleton-item-line" height={20} />
            </div>
        </div>
    )
}

export default DocumentsItemSkeleton
