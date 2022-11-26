import { useFetch } from '../hooks/useFetch';
import { useState, useEffect } from 'react';

export const TableList = () => {
  const url = 'https://atlantia-dev-test.herokuapp.com/api/beer-products/';
  const { isLoading, loadData } = useFetch({ url });
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData().then(response => setData(response));
  }, []);
  return (
    <table className="table-custom">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>SKU</th>
          <th>% Presencia</th>
          <th>Av. Price</th>
          <th>Av. Position</th>
        </tr>
      </thead>

      <tbody>
        {isLoading
          ? 'loading'
          : data &&
            data.map(item => {
              return (
                <tr key={item.sku}>
                  <td>
                    <div className="grid-table">
                      <img src={item.productImage} alt={item.name} />
                      {item.name}
                    </div>
                  </td>
                  <td>{item.sku}</td>
                  <td className={item.persistence < 0 ? 'num-neg' : 'num-pos'}>{Math.abs(item.persistence * 100)}</td>
                  <td>{item.averagePrice}</td>
                  <td>{item.averagePosition}</td>
                </tr>
              );
            })}
      </tbody>
    </table>
  );
};
