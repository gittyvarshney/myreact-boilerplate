import React from 'react';
import ReactDOM from 'react-dom';
import Intro from './component/intro';

ReactDOM.render(<Intro />,document.getElementById('app'));

if (module.hot) {
    
    module.hot.accept(['component/intro'], () => {

    //if some changes are saved unmount the component
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));

    //and again mount it  
    ReactDOM.render(<Intro />,document.getElementById('app'));
    });
  }