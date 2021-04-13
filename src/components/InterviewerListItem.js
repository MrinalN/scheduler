import React from 'react';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem (props) {
  const { name, avatar } = props;
  return (
    <li className="interviewers__item">
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    {name}
  </li>

  )
}


{/* <InterviewerListItem
id={interviewer.id}
name={interviewer.name}
avatar={interviewer.avatar}
/> */}