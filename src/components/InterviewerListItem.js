import React from 'react';
import classNames from "classnames";
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem (props) {
  const { name, avatar, selected } = props;

    let interviewersListItemClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
    'interviewers__item-image': avatar
  })

  return (
    <li className={interviewersListItemClass}>
    <img
      className={interviewersListItemClass}
      src={avatar}
      alt={name}
    />
    {selected && name}
  </li>

  )
}


{/* <InterviewerListItem
id={interviewer.id}
name={interviewer.name}
avatar={interviewer.avatar}
/> */}