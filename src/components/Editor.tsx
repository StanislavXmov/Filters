import { useEffect, useRef } from 'react';
import styles from '../App.module.scss';
import { Filters } from '../types';
import { useCanvas } from '../hooks/useCanvas';
import { useReader } from '../hooks/useReader';
import { useStore } from '../store';

const filters = [Filters.oceanic, Filters.grayscale, Filters.offset_red];

const Editor = () => {
  const file = useStore((state) => state.file);
  const setFilter = useStore((state) => state.setFilter);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const {
    canvasRef,
    drawOriginalImage,
    loadImage,
    filterImage,
    getCanvasImgURL,
  } = useCanvas();

  useEffect(() => {
    const unsubsribeFilter = useStore.subscribe(
      (state) => state.filter,
      (filter) => {
        drawOriginalImage();
        filterImage(filter);
      }
    );
    return () => {
      unsubsribeFilter();
    }
  }, []);

  const { reader } = useReader(file, () => {
    if (!reader.result) {
      return;
    }
    const dataURL = reader.result.toString();
    loadImage(dataURL);
  });

  const editorButtonFilterHandler = (filter: Filters) => {
    setFilter(filter);
  }

  const downloadHandler = () => {
    if (linkRef.current) {
      const imgUrl = getCanvasImgURL();
      linkRef.current.href = imgUrl;
    }
  }

  return (
    <div className={styles.editorWrapper}>
      <canvas ref={canvasRef} width="448" height="448"></canvas>
      <div className={styles.buttonWrapper}>
        {filters.map(filter => (
          <button 
            key={filter}
            onClick={() => editorButtonFilterHandler(filter)}
            className={styles.editorButton}
          >
            {filter}
          </button>
        ))}
      </div>
      <a
        ref={linkRef}
        className={`${styles.editorButton} ${styles.editorLinkDownload}`}
        href={'#'}
        onClick={downloadHandler}
        download={'image.png'}
      >
        Download
      </a>
    </div>
  )
}

export default Editor;