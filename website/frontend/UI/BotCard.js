import React from 'react';

const Bot = ({ bot }) => {
  return (
    <div className="card">
      <img src={bot.image} alt="profilePhoto"/>
      <h3>{ bot.displayName }</h3>
      <h4>{bot.githubId}</h4>
      <h4>Created By: - {bot.createdBy}</h4>
    </div>
  );
}
 
export default Bot;