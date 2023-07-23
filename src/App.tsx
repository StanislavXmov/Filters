import { useState } from 'react';
import styles from './App.module.scss';
import Background from './components/Background';
import Upload from './components/Upload';
import { useStore } from './store';
import Editor from './components/Editor';

function App() {

  const file = useStore((state) => state.file);

  return (
    <div className={styles.app}>
      <Background />
      {!file && <Upload />}
      {file && <Editor />}
    </div>
  );
}

export default App;
