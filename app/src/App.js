import React, { Component }from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
    <div>  
      <div id = 'result'></div>
      
      <div id="screenshot" style={{textAlign:"center"}}>
        <h3 id="toc-basic-demo">Basic demo</h3>
        <div id="basic" style={{textAlign:"center"}}>
          <video className="videostream" autoPlay></video>
          <p>
            <button className="capture-button">Capture video</button> 
            <button id="stop-button">Stop</button>
          </p>
        </div>
        <h2 id="toc-screenshot">Taking screenshots</h2>
        <p><button id="screenshot-button" disabled>Take screenshot</button></p>
        <div className="img_wrap">
          <img id="img"/>
        </div>
      </div>
    </div>
    );
  }

  componentDidMount() {
    const constraints = {video: true};
    const captureVideoButton = document.querySelector('#screenshot .capture-button');
    const screenshotButton = document.querySelector('#screenshot-button');
    const img = document.querySelector('#screenshot img');
    const video = document.querySelector('#screenshot video');

    const canvas = document.createElement('canvas');

    captureVideoButton.onclick = function() {
      // navigator.mediaDevices.getUserMedia(constraints).
      //   then(handleSuccess).catch(handleError);
      navigator.webkitGetUserMedia(constraints, handleSuccess, handleError);
    };

    screenshotButton.onclick = video.onclick = function() {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      // Other browsers will fall back to image/png
      img.src = canvas.toDataURL('image/webp');
    };

    function handleSuccess(stream) {
      screenshotButton.disabled = false;
      video.srcObject = stream;
    }

    function handleError(error) {
      console.error('navigator.getUserMedia error: ', error);
      document.getElementById('result').innerHTML = 'navigator.getUserMedia error: ' + error.toString();
    }

    document.querySelector('#stop-button').onclick = function() {
      video.pause();
      // localMediaStream.stop();
    };
  }
}

export default App;
