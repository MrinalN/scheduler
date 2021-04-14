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
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList 
    interviewers={props.interviewers} 
    value={interviewer} 
    onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger>Cancel</Button>
      <Button confirm>Save</Button>
    </section>
  </section>
</main>
  )
}