import React from 'react';
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

//INTERVIEWER LIST PROPS
// .add("Initial", () => (
//   <InterviewerList
//     interviewers={interviewers}
//     onChange={action("setInterviewer")}
//   />
// ))
// .add("Preselected", () => (
//   <InterviewerList
//     interviewers={interviewers}
//     interviewer={3}
//     onChange={action("setInterviewer")}
//   />
// ));

export default function InterviewerList (props) {
console.log(props.interviewers)
  // const { id, name, avatar, selected } = props;
  const parsedInterviewers = props.interviewers.map(interviewer => {
    return <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.value}
    setInterviewer={event => props.onChange(interviewer.id)}
  />
  })

  
   return( <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
  
     {parsedInterviewers}

      </ul>
    </section>
   )
}

