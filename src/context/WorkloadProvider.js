import { createContext, useState, useEffect } from 'react';

import mockWorkloadList from '../mock/workload-list.json';
import mockWorkloadVelocity from '../mock/workload-velocity.json';

//create a context, with createContext api
export const WorkloadListContext = createContext();

const InitialWorkloadState = {
  isLoading: false,
  data: null,
  velocityData: null,
}

const WorkloadProvider = (props) => {
  const [workloadState, setWorkloadState] = useState(InitialWorkloadState)

    useEffect(() => {
      setWorkloadState({
        ...workloadState,
        isLoading: true
      })

      setTimeout(() => {
        setWorkloadState({
          ...workloadState,
          data: mockWorkloadList.sort((a, b) => { return b.issuesCount - a.issuesCount}),
          velocityData: mockWorkloadVelocity,
          isloading: false,
        })
      }, 600)

    }, [])

    return (
      <WorkloadListContext.Provider value={[workloadState, setWorkloadState]}>
          {props.children}
      </WorkloadListContext.Provider>
    );
};

export default WorkloadProvider