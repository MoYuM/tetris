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

  const create = () => {
    let initIndex = 4;
    const dropdown = setInterval(() => {
      create_L(initIndex);
      initIndex += 10
    }, 1000);
  }

  const create_L = (initIndex: number) => {
    const indexList = [initIndex, initIndex + 10, initIndex + 20, initIndex + 21]
    const temp = JSON.parse(JSON.stringify(map));
    indexList.forEach(i => temp[i] = 1);
    setMap(temp);
  }

  return (
    <div className="App">
      <Wrapper>
        {render()}
        <button onClick={create}>create_L</button>
      </Wrapper>
    </div>
  );
}

export default App;
