import { Table } from "react-bootstrap";

const DynamicTable = (props) => {
    const { headers, data } = props;

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{row[cell]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
};

export default DynamicTable;
