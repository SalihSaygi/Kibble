import React, { useState } from 'react';

const Bot = ({ bot }) => {
  return (
    <div className="card">
      <img src={bot.image} alt="profilePhoto"/>
      <h3>{ bot.displayName }</h3>
      <h4>{bot.githubId}</h4>
      <p>Email: { bot.email }</p>
      <p>API Token - { bot.apiToken }</p>
      <p>Bots: - {bot.hasBots.map(bot => {
          if(bot) {
              return (
                <div key={bot.githubId}>
                    <img src={bot.image}/>
                    <h1>{data.displayName}</h1>
                </div>
                )
          }
      })}</p>
    </div>
  );
}
 
export default Bot;