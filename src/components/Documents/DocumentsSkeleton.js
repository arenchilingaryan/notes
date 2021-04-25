import React from 'react'
import Skeleton from 'react-loading-skeleton'
import './Skeleton.scss'

const DocumentsSkeleton = () => {
    const count = 8
    return (
        <div className="folders__wrapper folders__wrapper-skeleton documents-skeleton">
            {new Array(count).fill(count).map((_, id) => {
                return <Skeleton className="folders__skeleton-item" key={id} />
            })}
        </div>
    )
}

export default DocumentsSkeleton
