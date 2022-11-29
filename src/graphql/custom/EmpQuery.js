import { listEmployees } from '../queries'
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { useState, useEffect } from 'react';

function EmpQuery() {
    const [emps, setEmps] = useState([])
  
    useEffect(() => {
      fetchEmployees()
    }, [])
    
    const fetchEmployees = async () => {
       
      try {
            const empData = await API.graphql(graphqlOperation(listEmployees));
            const empList = empData.data.listEmployees.items;
            console.log('EmpQuery', empList);
            setEmps(empList)
          } catch (error){
              console.log('error on Fetching Emps', error);
          }
  
    };
    
    
    
    
    
    
    return (
        <h1>Hello EmpQuery</h1>


    );
}
export default EmpQuery;