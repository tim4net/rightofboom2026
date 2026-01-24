import React from 'react';

const RewstWorkflowEmbed = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col p-4">
      <iframe
        src="https://app.rewst.io/organizations/5b3f70a7-566b-4f4f-9232-0ac2ec41e4e6/workflows/019be802-43d7-7ed5-894e-440f1149e4dd?selectedTriggerId=019be807-e3e0-7468-a86d-1f7a5c70e6b8&selectedTaskId=fc8d2b1dd2014cd9acc6c2cc1f48aef6"
        className="w-full flex-1 rounded-xl border border-slate-700"
        title="Rewst Workflow"
      />
    </div>
  );
};

export default RewstWorkflowEmbed;
