import React from 'react';

import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from 'components/Appointment/Empty.js';
import Form from 'components/Appointment/Form.js';
import Status from 'components/Appointment/Status.js';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

import useVisualMode from 'hooks/useVisualMode';

import './styles.scss';

/*
*Props list:
* time, interview(null || Obj), id, interview(), interviewers(Arr), 
*confirm(Func), bookInterview(Func), cancelInterview(Func)
*
*/

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const EDIT = "EDIT";
  const DELETING = "DELETING"
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  /* Functions determining state: present, transition towards, goes back a state */
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
   .catch(error => transition(ERROR_SAVE, true));
  }

  /* Cancellation confimation prompt before delete */
  function confirmation () {
    transition(DELETING, true);
    props.cancelInterview(props.id)
   .then(() => transition(EMPTY))
   .catch(error => transition(ERROR_DELETE, true));
  }

  /* Runs confirmation above before delete*/
  function del () {
    transition(CONFIRM)
  }

  function edit() {
    console.log('EDIT CALLED', props.interview.interviewer)
    transition(EDIT);
  }

  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      
      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} 
      />
      }

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={edit}
          onDelete={del}
        />
      )}

      {mode === SAVING && 
      <Status message={SAVING} />}

      {mode === DELETING && 
      <Status message={DELETING} />}

      {mode === CONFIRM && 
      <Confirm
        message={"Delete the appointment?"}
        onConfirm={confirmation}
        onCancel={() => (back(SHOW))}
         />}
      

      {mode === CREATE && (    
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => (back(EMPTY))}
        />
      )}

      {mode === EDIT && (    
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => (back(SHOW))}
        />
        )}


      {mode === ERROR_SAVE && (
        <Error
          message={"Could not save message. Please try again."}
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not delete message. Please try again."}
          onClose={back}
        />
      )}

    </article>
   
  )
}
