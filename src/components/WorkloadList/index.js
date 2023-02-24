import { useContext } from 'react'
import { WorkloadListContext } from '../../context/WorkloadProvider';
import DrawerProvider from '../../context/DrawerProvider';

import './WorkloadList.css';
import WorkloadItem from './WorkloadItem'
import WorkloadDrawer from '../WorkloadDrawer'

const WorkloadList = () => {
  const [workloadState] = useContext(WorkloadListContext)
  const { data, isLoading } = workloadState

  if (!data && !isLoading) {
    return <span>
      Something went wrong...
    </span>
  }

  if (isLoading && !data) {
    return <span>
      Loading Workload...
    </span>
  }
  
  if (data) { 
    return <DrawerProvider>
      <div className="WorkloadList">
        {data.map((workloadItem, position) => {
          return <WorkloadItem className="WorkloadItem" key={workloadItem.entityId} {...workloadItem} position={position} />
        })}
        <WorkloadDrawer />
      </div>
    </DrawerProvider>
  }
}

export default WorkloadList;
