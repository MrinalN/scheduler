import React from 'react';

import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from 'components/Appointment/Empty.js';
import Form from 'components/Appointment/Form.js';
import Status from 'components/Appointment/Status.js';

import useVisualMode from 'hooks/useVisualMode';

import './styles.scss';


export default function Appointment (props) {
  // const { time, interview } = props; bookInterview
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  // const STATUS = "STATUS";
  // const CONFIRM = "CONFIRM";
  // const ERROR = "ERROR";
  // const EDIT = "EDIT";
  const DELETING = "DELETING"
  const CREATE = "CREATE";
  const SAVING = "SAVING";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
   .then(() => transition(SHOW))
    
  }

  function del () {
    console.log("DEL RUNNING")
    transition(DELETING);
    props.cancelInterview(props.id)
   .then(() => transition(EMPTY))
  }


  return(
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} 
      />
      }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={del}
        />
      )}

      {mode === SAVING && 
      <Status message={SAVING} />}

      {mode === DELETING && 
      <Status message={DELETING} />}

      {mode === CREATE && (    
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => (back(EMPTY))}
        />
      )}

    </article>

    
  )
}
