import './App.css';
import { Slide } from './component';
import { images } from './assets/images';
import './app.scss'
import { useState } from 'react';
function App() {
  return (
    <div className="App">
      <div className='slide-box'>
      <Slide images={images}/>
      </div>
    </div>
  );
}

export default App;
