import React from 'react';

import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from 'components/Appointment/Empty.js';

import './styles.scss';


// import Header from './Header';

export default function Appointment (props) {
  const { time, interview } = props;

  // const variable = interview ? <Show /> : <Empty />
  return(
    <article className="appointment">
      <Header time={time}/>

    {interview && <Show 
    student={interview.student}
    interviewer={interview.interviewer}
    />}

    {/* {!interview && <Empty 
    
    />} */}
      {/* {variable} */}
    </article>

    
  )
}

// storiesOf("Appointment", module)
//   .addParameters({
//     backgrounds: [{ name: "white", value: "#fff", default: true }]
//   })
//   .add("Appointment", () => (
//   <Appointment />
//   ))

//   .add("Appointment with Time", () => (
//     <Appointment
//       time="12pm"
//     />
//   ))
//   .add("Header", () => (
//     <Header time="12pm" />
//   ))