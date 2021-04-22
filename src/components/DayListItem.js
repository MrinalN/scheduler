import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss"



export default function DayListItem(props) {

  const { name, spots, selected, setDay } = props
  const formatSpots = () => {
      if(spots > 1) {
        return `${spots} spots remaining`
      } else if (spots === 1) {
        return `${spots} spot remaining`
      } else {
        return 'no spots remaining'
      }
    }

  let dayListItemClass = classNames('day-list__item', {
    'day-list__item--selected': selected, 'day-list__item--full': spots === 0
  })
  return (
    <li className={dayListItemClass} data-testid="day" onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
  
}
