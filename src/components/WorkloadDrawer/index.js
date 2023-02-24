import Drawer from 'react-modern-drawer'
import {useContext} from 'react'
import find from 'lodash/find'

import 'react-modern-drawer/dist/index.css'
import './WorkloadDrawer.css'

import { DrawerContext } from '../../context/DrawerProvider';
import {WorkloadListContext} from '../../context/WorkloadProvider'

const WorkloadDrawer = ({entityId}) => {
  const [drawerState, setDrawerState, actions] = useContext(DrawerContext)
  const [workloadState] = useContext(WorkloadListContext)
    const {data: workloadData, velocityData} = workloadState 


  const currentWorkload = find(workloadData, (workload) => {
        return workload.entityId === drawerState.entityId
    })

    return <Drawer
        open={drawerState.isOpen}
        onClose={actions.closeDrawer}
        direction='right'
        className='WorkloadDrawer'
        size={920}
        enableOverlay={false}
    >
        <div className="WorkloadDrawer-container">
            <header className="WorkloadDrawer-header">
                <button type="button" className="WorkloadDrawer-closeButton" onClick={() => {
                    return actions.closeDrawer(entityId)
                }}>X</button>

                <button onClick={actions.prevDrawer}>prev</button>
                <button onClick={actions.nextDrawer}>next</button>
            </header>
            <div>
                {currentWorkload && currentWorkload.workload}
            </div>
        </div>
    </Drawer>
}


export default WorkloadDrawer