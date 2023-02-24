import { createContext, useState, useEffect, useContext } from 'react';
import {WorkloadListContext} from './WorkloadProvider'
import find from 'lodash/find'
import indexOf from 'lodash/indexOf'
import slice from 'lodash/slice'

//create a context, with createContext api
export const DrawerContext = createContext();

const InitialDrawerState = {
  isOpen: false,
  entityId: null,
}

const DrawerProvider = ({children}) => {
  const [workloadState] = useContext(WorkloadListContext)
  const {data: workloadData, velocityData} = workloadState 
  const [drawerState, setDrawerState] = useState(InitialDrawerState)

  const openDrawer = (entityId) => {
    setDrawerState({
        ...drawerState,
        isOpen: true,
        entityId,
    })
  }
  const closeDrawer = (entityId) => {
    setDrawerState({
        ...drawerState,
        isOpen: false,
        entityId: null
    })
  }

  const nextDrawer = () => {
    if (drawerState.entityId) {
        const current = find(workloadData, (workload) => {
            return workload.entityId === drawerState.entityId
        })

        const currentIndex = indexOf(workloadData, current)
        const next = workloadData[currentIndex + 1]
        
        closeDrawer(drawerState.entityId)
        next.entityId && openDrawer(next.entityId)
    }
  }

  const prevDrawer = () => {
    if (drawerState.entityId) {
        const current = find(workloadData, (workload) => {
            return workload.entityId === drawerState.entityId
        })

        const currentIndex = indexOf(workloadData, current)
        const prev = workloadData[currentIndex - 1]
        closeDrawer(drawerState.entityId)
        prev.entityId && openDrawer(prev.entityId)
    }
  }

  const actions = {
    openDrawer,
    closeDrawer,
    nextDrawer,
    prevDrawer,
  }

  return (
    <DrawerContext.Provider value={[drawerState, setDrawerState, actions]}>
      {children}
   </DrawerContext.Provider>
  );
};

export default DrawerProvider