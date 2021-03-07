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
  const [initIndex, setInitIndex] = React.useState<number>(4);

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

  const filterBlock = () => currentBlock.filter((i, index) => i + 1 !== currentBlock[index + 1]) // 过滤出右边没有其他方块的方块

  const haveBlockOnRight = () => {
    let res = false;
    filterBlock().forEach(i => {
      if (
        map[i + 1] === 1 || // 右边已经有方块了
        i % 10 === 9 // 右边为边界
      ) {
        res = true;
      }
    })
    return res;
  }

  const create = () => {
    if (time) {
      return;
    }
    const tim = window.setInterval(() => {
      setInitIndex(index => {
        create_L(index);
        return index + 10
      })
    }, 500);
    setTime(tim);
  }

  const create_L = (index: number) => {
    const indexList = [index, index + 10, index + 20, index + 21]
    setCurrentBlock(indexList);
    const temp = JSON.parse(JSON.stringify(map));
    indexList.forEach(i => temp[i] = 1);
    setMap(temp);
  }

  // 到达底部自动停止
  React.useEffect(() => {
    let isEnd = false;
    currentBlock
      .filter(item => !currentBlock.includes(item + 10)) // 过滤掉四个方格中下方有方格的方格
      .forEach(item => {
        if (map[item + 10] !== 0) {
          isEnd = true;
        }
      })

    if (isEnd) {
      stop();
      setInitIndex(4)
      setCurrentBlock([])
    }
  }, [currentBlock])

  const moveRight = () => {
    if (haveBlockOnRight()) {
      return;
    }
    setInitIndex(initIndex + 1)
    setMap((map) => {
      const newMap = map.map(i => i);
      currentBlock.forEach(i => newMap[i] = 0);
      currentBlock.forEach(i => newMap[i + 1] = 1);
      return newMap;
    })
  }

  const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    const key = e.key;
    switch (key) {
      case 'ArrowRight':
        moveRight();
        return;
      default:
        return;
    }
  }


  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [currentBlock])

  const stop = () => {
    clearInterval(time)
    setTime(0)
  }

  return (
    <div className="App">
      <Wrapper>
        {render()}
        <button onClick={create}>create_L</button>
        <button onClick={stop}>stop</button>
      </Wrapper>
    </div>
  );
}

export default App;
