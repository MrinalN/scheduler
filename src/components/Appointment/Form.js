import React, { useState } from "react";

import InterviewerList from "../InterviewerList";
import Button from "../Button"

//FORM PROPS
// .add("Edit", () => (
//   <Form 
//   name={"Lydia Miller-Jones"}
//   interviewers={interviewers}
//   interviewer={interviewer.id}
//   onSave={action("onSave")}
//   onCancel={action("onCancel")}
//   />
// ))

// .add("Create", () => (
//   <Form 
//   interviewers={interviewers}
//   onSave={action("onSave")}
//   onCancel={action("onCancel")}
//   />
// ))

export default function Form (props) {
  // const {name, interviewers, interviewer, onSave, onCancel} = props;
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  };

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" >
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder={"Enter Student Name"}
        value={name}
        onChange={(event) => setName(event.target.value)}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
    interviewers={props.interviewers} 
    value={interviewer} 
    onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={() => cancel()} >Cancel</Button>
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>
  )
}