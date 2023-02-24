import {useContext} from 'react'
import Chart from "react-apexcharts";
import find from 'lodash/find'
import { WorkloadListContext } from '../../context/WorkloadProvider';
import { DrawerContext } from '../../context/DrawerProvider';

import sunImg from '../../assets/images/sun-2x.png'
import rainImg from '../../assets/images/rain-2x.png'
import './WorkloadItem.css'

const WorkloadItem = ({ className, entityId, status, issuesCount, workload, namespace, protocols, position}) => {
  const [workloadState] = useContext(WorkloadListContext)
  const [drawerState, setDrawerState, actions] = useContext(DrawerContext)
  const { velocityData } = workloadState

  // find chart data for entity
  const foundItem = find(velocityData.velocities, ({entityId: velocityEntityId, velocity}) => {
    return velocityEntityId === entityId
  })

  return (
      <div key={entityId} className={className} style={{background: status === 0 ? '#EDF6FF' : '#fff'}} onClick={() => {
        actions.openDrawer(entityId)
      }}>
        <div className="SideStatus">
          <img className="SideStatus-statusImg" src={status === 0 ? rainImg : sunImg} alt="status" />
          <span className="SideStatus-issuesCount">{issuesCount}</span>
          <div className="SideStatus-issuesCountdescription">ISSUES</div>
        </div>
        <div className="WorkloadDetails">
          <div className="WorkloadDetails-workload">{workload}</div>
          <div className="WorkloadDetails-namespace">{namespace}</div>
          <div className="WorkloadDetails-apexChart">
            {foundItem?.velocity ? <Chart
              options={{
                chart: {
                  id: "workload-velocity-bar-" + entityId,
                  background: 'transparent',
                  zoom: {
                    enabled: false,
                  },
                  toolbar: {
                    show: false,
                  },
                  animations: {
                    enabled: false,
                  },
                  selection: {
                    enabled: false,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                legend: {
                  show: false,
                },
                colors: ['rgba(51, 51, 51, 0.3)'],
                grid: {
                  show: false,
                },
                height: '100px',
                xaxis: {
                  labels: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
                plotOptions: {
                  bar: {
                      horizontal: false,
                      columnWidth: '80px',
                  },
                },
                yaxis: {
                  labels: {
                    show: false,
                  }
                },
                tooltip: {
                  enabled: false,
                }
              }}
              series={[
                {
                  name: "series-1",
                  data: foundItem?.velocity
                }
              ]}
              type="bar"
              width="80%"
              height="100px"
            /> : <span style={{
              color: '#5555',
              width: '100%', 
              textAlign: 'left',
              marginLeft: 25}}>&nbsp;</span>}
          </div>
          <div className="WorkloadDetails-protocols">{protocols.map((protocol, index) => (
            <span key={protocol + '-' + index} className="WorkloadDetails-protocol">
              <span>{protocol}</span>
              <span className="WorkloadDetails-bullet" style={{display: protocols.length === index + 1 ? 'none' : 'block'}}>•</span>
            </span>
            ))}</div>
        </div>
      </div>
  )
}


export default WorkloadItem
