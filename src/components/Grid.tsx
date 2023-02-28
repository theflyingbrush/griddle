import { useEffect, useState } from 'react';
import { GridProps } from '@types'

function Grid (props: GridProps) {

  const [gridSize, setGridSize]     = useState(0)
  const [lineCountX, setLineCountX] = useState(0)
  const [lineCountY, setLineCountY] = useState(0)

  useEffect(() => {
    const dimension = props.width > props.height ? props.width : props.height
    const newGridSize = dimension / props.divisions
    setGridSize(newGridSize)
    setLineCountX((props.width / newGridSize) - 1)
    setLineCountY((props.height / newGridSize))
  }, [props])

  const GridLinesX = () => {
    const xGrid = Array.from({length: lineCountX}, (v: undefined, i: number) => i+1);
    const items = xGrid.map( (i) => 
        <line key={i} x1={i as number * gridSize} y1="0" x2={i * gridSize} y2={props.height} stroke={props.color} />
      )
    return (
        <g>{items}</g>
    );
  }

  const GridLinesY = () => {
    const yGrid = Array.from({length: lineCountY}, (v: undefined, i: number) => i+1);
    const items = yGrid.map( (i) => 
        <line key={i} x1="0" y1={i * gridSize} x2={props.width} y2={i * gridSize} stroke={props.color} />
      )
    return (
        <g>{items}</g>
    );

  }

  return (
    <div className='grid'>
      { props.visible && 
      <svg width={props.width} height={props.height} viewBox={`0 0 ${props.width} ${props.height}`}>
        {
          <g>
          <GridLinesX/>
          <GridLinesY/>
          </g>
        }
      </svg>
      }
    </div>
  )
}

export default Grid;