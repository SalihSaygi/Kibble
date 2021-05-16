import React from 'react';
import Header from './Header';
import CommandBox from './CommandBox';

const Section = ({ command }) => {
  return (
    <div>
      <Header name={command.header} icon={command.icon} />
      <div>
        {command.items.map(item =>
          item.map((itemInfo, index) => {
            return <CommandBox command={itemInfo} key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default Section;
