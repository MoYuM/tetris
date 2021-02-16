import React from 'react';
import Wrapper from './components/wrapper/index';
import './App.css';

const App = () => {

  const [map, setMap] = React.useState(
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
  )

  const render = () => {
    return (
      <div className="all-block">
        {
          map.map((item: number, index: number) => {
            switch (item) {
              case 0:
                return <div className="block" key={index} />;
              case 1:
                return <div className="block-L" key={index} />
              default:
                return <div className="block" key={index} />;
            }
          })
        }
      </div>
    )
  }

  const create_L = () => {
    const firstBlockIndex = 4;
    const secondBlockIndex = firstBlockIndex + 10;
    const thirdBlockIndex = secondBlockIndex + 10;
    const fourthBlockIndex = thirdBlockIndex + 1;
    
    const temp = JSON.parse(JSON.stringify(map));
    temp[firstBlockIndex] = 1;
    temp[secondBlockIndex] = 1;
    temp[thirdBlockIndex] = 1;
    temp[fourthBlockIndex] = 1;

    setMap(temp);
  }

  return (
    <div className="App">
      <Wrapper>
        {render()}
        <button onClick={create_L}>create_L</button>
      </Wrapper>
    </div>
  );
}

export default App;
