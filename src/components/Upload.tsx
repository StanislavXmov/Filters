import { DragEvent } from 'react';
import styles from '../App.module.scss';
import { useStore } from '../store';

const Upload = () => {

  const upload = useStore((state) => state.upload);

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    upload(e);
  }

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  return (
    <div 
      onDragOver={dragOverHandler}
      onDrop={dropHandler} 
      className={styles.upload}
    >
      Drag and drop image.
    </div>
  )
}

export default Upload;
