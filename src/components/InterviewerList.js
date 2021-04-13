import React from 'react';
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList (props) {
  // const { id, name, avatar, selected } = props;
  const parsedInterviewers = props.interviewers.map(interviewer => {
    return <InterviewerListItem
    id={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.interviewer}
  />})

  
   return( <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
  
     {parsedInterviewers}

      </ul>
    </section>
   )
}

