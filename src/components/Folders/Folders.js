import React, { useEffect, useState } from 'react'
import useFoldersService from '../../services/useFoldersService';
import FoldersItem from './FoldersItem'
import './Folders.scss'
import FoldersLoading from './FoldersLoading';

const Folders = () => {
    const [data, setData] = useState([])
    const { getAllFolders, requestFolderLoad } = useFoldersService()

    useEffect(() => {
        console.log(requestFolderLoad)
    }, [requestFolderLoad])

    useEffect(() => {
        updateData()
    }, [])

    const updateData = () => getAllFolders().then(res => setData(res))

    return (
        requestFolderLoad
            ? <div className="folders__wrapper">
                <FoldersLoading show={requestFolderLoad} />
            </div>
            : <div className="folders__wrapper block-mount">
                {data.map(el => <FoldersItem updateData={updateData} key={el.id} item={el} />)}
            </div>

    )
}

export default Folders
