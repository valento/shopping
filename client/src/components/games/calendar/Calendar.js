import React from 'react'

const Calendar = ({lan,d,m}) => {
  const cal = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  const stl = Number(d) === 0 ? 'day' : 'day zero'
  let day = d===0? 0 : (15-d)
  let p = window.screen.height/2 - 30.94*(cal.length/2-day)
  console.log(30.94*cal.length/2)
  let transition = {
    top: `${p-60}px`
  }
  console.log(transition.top)
  return (
    <div className='calendar-wraper'>
      <div className='ruler v-move' style={transition}>
        {cal.map( e => {
          return (
            <div className={Number(d) === e? stl+' special' : stl}>{Number(d) === e? '\u2764' : e}</div>
          )}
        )}
      </div>
    </div>
  )
}

export default Calendar
