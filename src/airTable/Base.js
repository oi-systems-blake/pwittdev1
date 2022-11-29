import React, { useEffect } from 'react'
import Airtable from 'airtable'
import { useState } from 'react';
import {secure} from "../Secret"



export default function Base() {
  

    var Airtable = require('airtable');
    var base = new Airtable({apiKey: secure}).base('appqrmdFurNYpsDKm');
  
    const [employees, setEmployees] = useState([])
    
    useEffect(() => {
    base('Employees').select({
        // Selecting the first 3 records in Production:
        view: "Active Employees"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            console.log('Retrieved', record.get('Preferred Name', "Last Name"));
        });
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
},[])
    // If you only want the first page of records, you can
    // use `firstPage` instead of `eachPage`
    return (
    <div>lol</div>
  )
}
