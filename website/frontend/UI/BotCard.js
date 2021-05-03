import React from 'react';

const Bot = ({ bot, user }) => {
  return (
    <div className="bot-card">
      <img className="bot-photo" src={bot.image} alt="bot-photo"/>
      <h3 className="bot-name" >{ bot.displayName }</h3>
      {/* <h4>Created By: - {bot.createdBy == user.githubId ? "You"  : bot.createdBy }</h4> */}
    </div>
  );
}
 
export default Bot;