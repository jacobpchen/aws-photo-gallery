import React, { useState, useEffect } from 'react';
import { Paper, IconButton } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'

import { API, graphqlOperation, Storage } from 'aws-amplify';
import { listPhotos } from '../graphql/queries'
import { updatePhoto } from '../graphql/mutations';

import awsmobile from '../aws-exports';

const Images = () => {
    const [error, setError] = useState(null)
    const [photos, setPhotos] = useState([])
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        fetchImages()
        console.log(awsmobile.aws_user_files_s3_bucket)
    }, [])

    const fetchImages = async () => {
        try {
            const imageData = await API.graphql(graphqlOperation(listPhotos))
            console.log('printing image data', imageData)
            const imageList = imageData.data.listPhotos.items
            console.log('image list', imageList)
            setPhotos(imageList)

        } catch (error) {
            console.log(error)
        }
    }

    const addLike = async (index) => {
        try {

            const image = photos[index]
            image.like = image.like + 1
            delete image.createdAt
            delete image.updatedAt

            const imageData = await API.graphql(graphqlOperation(updatePhoto, { input: image }))
            const imageList = [...photos]
            imageList[index] = imageData.data.updatePhoto
            setPhotos(imageList)


        } catch (error) {
            setError(error)
        }
    }

    const displayImage = async (index) => {
        console.log(photos)
        const imageFilePath = photos[0].filePath
        console.log(imageFilePath)
        try {
            const fileAccessUrl = await Storage.get(imageFilePath)
            console.log('file access url', fileAccessUrl)
            setImageUrl(fileAccessUrl)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {error && <div className="error">{error} </div>}
            <div className="imageList">
                {photos.map((photo, index) => {
                    return (
                        <Paper variant="outlined" elevation={2} key={`image${index}`} >
                            <div className="imageCard" >
                                <div className="imageTitle">{photo.description}</div>
                                <div className="imageOwner">{photo.owner}</div>
                                <div>
                                    <IconButton aria-label="like" onClick={() => addLike(index)}>
                                        <FavoriteIcon />
                                    </IconButton>
                                    {photo.like}
                                </div>
                                <img src={imageUrl} />
                            </div>
                        </Paper>
                    )
                })}
            </div >
            <button onClick={displayImage}>Display Image</button>
        </div >
    )
};

export default Images;
