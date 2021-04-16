import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  let { days } = props;
  //{days, day} = props// props.day used to avoid confusion
  
  return days.map(day => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  ));
}