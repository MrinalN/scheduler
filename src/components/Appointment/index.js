import React from 'react';

import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from 'components/Appointment/Empty.js';

import './styles.scss';


export default function Appointment (props) {
  const { time, interview } = props;
  const displayAppt = interview ? 
  <Show 
    student={interview.student}
    interviewer={interview.interviewer}
  /> : <Empty />
  return(
    <article className="appointment">
      <Header time={time}/>

    {displayAppt}

    </article>

    
  )
}
