import React from 'react';

import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from 'components/Appointment/Empty.js';

import './styles.scss';


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "12pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 5,
    time: "11am",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

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