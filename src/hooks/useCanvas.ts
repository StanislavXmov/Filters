import { useRef } from 'react';
import {
  open_image,
  filter,
  putImageData,
  grayscale,
  offset_red,
} from "@silvia-odwyer/photon";
import { Filters } from '../types';

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let canvasCtx: CanvasRenderingContext2D | null = null;
  const imgEl = new Image();
  const canvasImgURLRef = useRef('');

  function calculateAspectRatio(
    srcWidth: number,
    srcHeight: number,
    maxWidth: number,
    maxHeight: number
  ) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight, srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  function loadImage(url: string) {
    if (!canvasRef.current) {
      return;
    }
    canvasCtx = canvasRef.current.getContext("2d");
    imgEl.addEventListener("load", drawOriginalImage);
    imgEl.src = url;
  }

  function drawOriginalImage() {
    if (!canvasCtx || !canvasRef.current) {
      return;
    }
    const newImgDimension = calculateAspectRatio(
      imgEl.naturalWidth,
      imgEl.naturalHeight,
      448,
      448
    );

    canvasRef.current.width = newImgDimension.width;
    canvasRef.current.height = newImgDimension.height;
    canvasCtx.drawImage(
      imgEl,
      0,
      0,
      newImgDimension.width,
      newImgDimension.height
    );

    canvasImgURLRef.current = canvasRef.current.toDataURL();
  }

  function filterImage(filterName: Filters) {
    if (!canvasCtx || !canvasRef.current) {
      return;
    }
    
    const photonImage = open_image(canvasRef.current, canvasCtx);
    if (filterName === Filters.grayscale) {
      grayscale(photonImage);
    } else if (filterName === Filters.offset_red) {
      offset_red(photonImage, 10);
    } else if (filterName.length) {
      filter(photonImage, filterName);
    }
    
    putImageData(canvasRef.current, canvasCtx, photonImage);
    canvasImgURLRef.current = canvasRef.current.toDataURL();
  }

  function getCanvasImgURL() {
    return canvasImgURLRef.current;
  }

  return {
    canvasRef,
    loadImage,
    drawOriginalImage,
    filterImage,
    getCanvasImgURL,
  }
}