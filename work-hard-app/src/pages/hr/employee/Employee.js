import { Button } from "react-bootstrap";
import DynamicTable from "../../../components/Table";

const Employee = () =>{
    const headers = ['Name', 'Age', 'City'];
  const data = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Jane', age: 25, city: 'San Francisco' },
    { name: 'Bob', age: 45, city: 'Chicago' },
  ];
    return(
        <>
            <div className="row d-flex p-2">
                <div className="col-6">
                    <h1>Employee</h1>
                </div>
                <div className="col-6 d-flex flex-row">
                    <Button>Hello Button</Button>
                </div>
            </div>
            <div className="mt-4">
                <h6>Employee Table</h6>
                <DynamicTable headers={headers} data={data} />
            </div>
        </>
    )
}

export default Employee;