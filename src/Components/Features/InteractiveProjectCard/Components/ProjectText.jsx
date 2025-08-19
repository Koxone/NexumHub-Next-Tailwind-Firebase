import React from 'react';

function ProjectText({ title = '', description = '' }) {
  return (
    <div className="space-y-3">
      <h3 className="text-foreground group-hover:text-white line-clamp-2 text-2xl leading-tight font-bold transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default ProjectText;
