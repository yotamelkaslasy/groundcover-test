import './App.css';

import WorkloadProvider from '../../context/WorkloadProvider'

import Layout from './Layout'
import WorkloadList from '../WorkloadList'

function App() {
  return (
    <WorkloadProvider>
      <div className="App">
        <Layout>
          <WorkloadList />
        </Layout>
      </div>
    </WorkloadProvider>
  );
}

export default App;
