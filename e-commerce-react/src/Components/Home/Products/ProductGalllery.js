import React from 'react';
import ImageGallery from "react-image-gallery";
import RightButton from './RightB';
import LeftButton from './LeftB';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';
import GetDetailsOneProductHooks from './../../../Hooks/Product/GetDetailsOneProductHooks';

const ProductGallery = () => {
  const { id } = useParams();
  const [item] = GetDetailsOneProductHooks(id);

  let image = [];
  if (item && item.images) {
    image = item.images.map((i) => ({ original: `http://localhost:8000/users/${i}` }));
  }

  return (
    <div>
      <ImageGallery
        items={image}
        showFullscreenButton={false}
        isRTL={true}
        showPlayButton={false}
        showThumbnails={false}
        renderRightNav={RightButton}
        renderLeftNav={LeftButton}
      />
    </div>
  );
};

export default ProductGallery;
