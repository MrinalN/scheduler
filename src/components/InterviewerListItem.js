import React from 'react';
import classNames from "classnames";
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem (props) {
  const { name, avatar, selected, setInterviewer } = props;

    let interviewersListItemClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
    'interviewers__item-image': avatar
  })

  return (
    <li className={interviewersListItemClass} onClick={setInterviewer}>
    <img
      className={interviewersListItemClass}
      src={avatar}
      alt={name}
    />
    {selected && name}
  </li>

  )
}
