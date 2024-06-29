import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled-components for the gallery
const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  flex: 1 1 ${(props) => props.basis};
  margin: 5px;
  max-width: ${(props) => props.basis};
  img {
    width: 100%;
    height: auto;
    cursor: pointer;
    transition: transform 0.3s ease;
    ${(props) => props.isZoomed && 'transform: scale(0.8);'}
  }

  @media (max-width: 768px) {
    flex-basis: 100%; /* Stack images vertically on smaller screens */
    max-width: 100%;
  }
`;

const Modal = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden; /* Ensure modal content fits within viewport */
  img {
    max-width: 100%;
    max-height: 100%;
    width: 550px;
    height: auto;
    transition: transform 0.5s ease;
    transform: ${(props) => (props.isZoomed ? 'scale(1.2)' : 'scale(1.5)')};
  }

  @media (max-width: 768px) {
    max-width: 80%; /* Adjust for smaller screens */
    max-height: 80%; /* Adjust for smaller screens */
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: -15px;
  right: -1px;
  font-size: 50px;
  
  color: white;
  cursor: pointer;
  z-index: 1001;
`;

const ImageGallery = ({ images, imagesPerRow }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const calculateFlexBasis = () => {
    return `calc(${100 / imagesPerRow}% - 10px)`;
  };

  const flexBasis = calculateFlexBasis();

  return (
    <>
      <GalleryContainer>
        {images.map((image, index) => (
          <ImageWrapper key={index} basis={flexBasis} isZoomed={selectedImage === image}>
            <img src={image} alt={`Image ${index + 1}`} onClick={() => handleClick(image)} />
          </ImageWrapper>
        ))}
      </GalleryContainer>
      <Modal show={selectedImage !== null} onClick={handleClose}>
        <ModalContent onClick={(e) => e.stopPropagation()} isZoomed={selectedImage !== null}>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
          {selectedImage && <img src={selectedImage} alt="Selected" />}
        </ModalContent>
      </Modal>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  imagesPerRow: PropTypes.number.isRequired,
};

export default ImageGallery;
