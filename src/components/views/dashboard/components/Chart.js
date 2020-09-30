import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { getValueSize } from '../utils';

const Chart = ({ data, total }) => {

  const [size, setSize] = useState(getValueSize());

  const onResizeEvent = () => {
    setSize(getValueSize);
  }
  useEffect(function () {
    window.addEventListener('resize', onResizeEvent);
    return () => window.removeEventListener('resize', onResizeEvent);
  });

  return (
    <div className="col-md-12 col-lg-12">
      <div className="card">
        <div className="card-header background-blue d-flex">
          <div className="col-md-8">
            <h4 className="card-title">Gráfica</h4>
          </div>
          <div className="col-md-4">
            <h4 
              className="card-title"
              style={{textAlign: 'right'}}
            >Total: { total }</h4>
          </div>
        </div>
        <div className="card-body">
          <BarChart
            width={size.width}
            height={size.height}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
            {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
          </BarChart>
        </div>
      </div>
    </div>
  );
}
export default Chart;