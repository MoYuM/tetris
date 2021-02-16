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
  const [currentBlock, setCurrentBlock] = React.useState<number[]>([])
  const [time, setTime] = React.useState<number>()

  const render = () => {
    return (
      <div className="all-block">
        {
          map.map((item: number, index: number) => {
            switch (item) {
              case 0:
                return <div className="block" key={index} >{index}</div>;
              case 1:
                return <div className="block-L" key={index} >{index}</div>
              default:
                return <div className="block" key={index} >{index}</div>;
            }
          })
        }
      </div>
    )
  }

  const create = () => {
    let initIndex = 4;
    const tim = window.setInterval(() => {
      create_L(initIndex);
      initIndex += 10
    }, 500);
    setTime(tim);
  }

  const create_L = (initIndex: number) => {
    const indexList = [initIndex, initIndex + 10, initIndex + 20, initIndex + 21]
    setCurrentBlock(indexList);
    const temp = JSON.parse(JSON.stringify(map));
    indexList.forEach(i => temp[i] = 1);
    setMap(temp);
  }

  React.useEffect(() => {
    let isEnd = false;
    currentBlock
      .filter(item => !currentBlock.includes(item + 10))
      .forEach(item => {
        if (map[item + 10] !== 0) {
          isEnd = true;
        }
      })

    if (isEnd) {
      clearInterval(time);
    }
  }, [currentBlock])

  return (
    <div className="App">
      <Wrapper>
        {render()}
        <button onClick={create}>create_L</button>
        <button onClick={() => {clearInterval(time)}}>stop</button>
      </Wrapper>
    </div>
  );
}

export default App;
