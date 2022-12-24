import React, { useState, useEffect } from "react";
import { Navigate, useParams } from 'react-router-dom';

const TableHead = () => {
return (
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Job</th>
      <th>Remove</th>
    </tr>
  </thead>
);
};

const TableBody = (props) => {
const rows = props.peopleData.map(function(row, index) {
  return (
    <tr key={index}>
      <td>{row.name}</td>
      <td>{row.age}</td>
      <td>{row.job}</td>
      <td>
        <button onClick={function() {
          props.removePerson(index);
        }}>Delete</button>
      </td>
    </tr>
  );
});

return (
  <tbody>{rows}</tbody>
);
};

const TableFoot = () => {
return (
  <tfoot>
    <tr>
      <td colSpan="4">Esta es la tabla de tus compras con nosotros</td>
    </tr>
  </tfoot>
);
};

class Table extends React.Component {
render() {
  const peopleData = this.props.peopleData;
  const removePerson = this.props.removePerson;

  return (
    <table>
      <TableHead />
      <TableBody peopleData={peopleData} />
      <TableFoot />
    </table>
  );
}
};

export const Purchases = () => {
	
  const [values, setValues] = useState([]);

  

		return (
			<div className="container">
				<h1>React Table</h1>
				<Table peopleData={peopleData} removePerson={this.removePerson} />
				<Form handleSubmit={this.handleSubmit} />
			</div>
		);
}
