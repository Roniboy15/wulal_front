export const getAdaptiveFontSize = (text, containerHeight) => {
    const dummyOutput = document.createElement('div');
    dummyOutput.innerHTML = text;
    dummyOutput.style.visibility = 'hidden';  // So it's not visible
    dummyOutput.style.position = 'absolute';  // To not interfere with other elements
    dummyOutput.style.fontSize = '35px';     // Start with a large font size
    dummyOutput.style.wordBreak = 'break-all';
    dummyOutput.style.wordWrap = 'break-word';
    document.body.appendChild(dummyOutput);   // Add to DOM to measure
  
    while(dummyOutput.clientHeight >= containerHeight) {
      let fontSize = window.getComputedStyle(dummyOutput).fontSize;
      dummyOutput.style.fontSize = (parseFloat(fontSize) - 1) + 'px';    }
  
    const adaptiveSize = dummyOutput.style.fontSize;
    document.body.removeChild(dummyOutput);  // Clean up
  
    return adaptiveSize;
  }
  
  export default getAdaptiveFontSize;
  