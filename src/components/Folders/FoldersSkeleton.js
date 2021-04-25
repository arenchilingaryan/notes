import React from 'react'
import Skeleton from 'react-loading-skeleton';
import './Skeleton.scss'

const FoldersSkeleton = () => {
    const count = 6
    return (
        <div className="folders__wrapper-skeleton">
            {new Array(count).fill(count).map((_, id) => {
                return <Skeleton className="folders__skeleton-item" key={id} />
            })}
        </div>
    )
}

export default FoldersSkeleton
