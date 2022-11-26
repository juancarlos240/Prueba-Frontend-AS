import './App.css';
import { Header } from './components/Header';
import { LineChar } from './components/LineChar';
import { DonutChar } from './components/DonutChar';
import { TableList } from './components/TableList';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <h2 className="title">General Perfomance Analysis</h2>
        <section className="section-charts">
          <div className="container-chart-lg">
            <h3 className="subtitle">Price Evolution</h3>
            <div className="chart-card ">
              <LineChar />
            </div>
          </div>
          <div className="container-chart-sm">
            <h3 className="subtitle">Presence Share by Product</h3>
            <div className="chart-card ">
              <DonutChar />
            </div>
          </div>
        </section>
        <section className="container-list">
          <h3 className="subtitle">Comparative Analysis</h3>
          <TableList />
        </section>
      </div>
    </div>
  );
}

export default App;
