import React from 'react'
import './Layout.css'

export default function Layout(props) {
  const layouts = [0,1,2,3,4]
  const unselectedLayouts = layouts.filter((l) => l !== props.selectedLayout)

  function renderLayout(layoutIndex) {
    let classNames = `layout layout-${layoutIndex}`
    return <div key={layoutIndex} className={classNames} onClick={() => props.updateLayout(layoutIndex)}></div>
  }

  return (
    <div className="layout-main">
      <h1 className="title">Choose Your Layout</h1>
      <div className={`selected-layout layout-${props.selectedLayout}`}></div>
      <div className="layouts">
        {unselectedLayouts.map((layout) => renderLayout(layout))}
      </div>
    </div>
  )
}