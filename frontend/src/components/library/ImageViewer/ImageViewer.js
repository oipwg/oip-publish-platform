import React from 'react'
import withStyles from 'react-jss'
import getIpfsUrl from '../../../../util/get-ipfs-url'

const styles = (theme) => ({
  root: {
    width: '500px',

    '& .image': {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  },
  image: {
    width: 100,
    maxHeight: '40%',
    maxWidth: '40%'
  }
})

const ImageViewer = ({ recordPayload, classes }) => {
  const imageLocation = recordPayload.record.details.tmpl_1AC73C98.thumbnailAddress
  const imageSrc = getIpfsUrl({ dirName: imageLocation })
  const imageAlt = recordPayload.record.details.tmpl_20AD45E7.name
  return (
    <div className={classes.root}>
      <img
        className={classes.image}
        src={imageSrc}
        alt={imageAlt} />
    </div>
  )
}

export default withStyles(styles)(ImageViewer)
