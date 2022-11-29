import "./AdminProject.style.css";
import { Airtable, Table } from "airtable";
import { useState, useEffect } from "react";
import {Project} from "./components/Project"
import { secure } from "../../Secret";

export function AdminProject() {
  let [projects, setProjects] = useState([]);
  let [projectSearch, setProjectSearch] = useState("");
  let [displayProjects, setDisplayProjects] = useState([])
  
  
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: secure }).base("appdxUzxbQJdbR8fz");

  // const handlePinSearchChange = (event) => {
  //   let x = ""
  //   console.log("first x", x)
  //    x = x + event.target.value
  //   console.log("second x", x)
  //   this.setProjectSearch({value: event.target.value}, function () {
  //     console.log(this.state.value);
  // });
  //   console.log("and finally", x)

  // };

  function handlePinSearchChange(event) {
    setProjectSearch(event.target.value);
  }

  const handleClick = () => {
    console.log("here are the projects", projects)
    let result = projects.filter((project) => {

      return (project.fields["Project ID (auto)"] + project.fields.Project)
        .toLowerCase()
        .includes(projectSearch);
    });
    setDisplayProjects(result);
  };

  useEffect(() => {
    console.log();
    let runit = base("Projects")
      .select({
        maxRecords: 10000,
        view: "inprogress",
      })
      .all();
    runit.then((project) => {
      console.log("hey", project);
      setProjects(project);
      setDisplayProjects(project);
    })
  }, []);

  return (
    <div className="project-page">
      <input
        //  value={projectSearch}
        className="search-projects"
        onChange={handlePinSearchChange}
      ></input>
      <button className="search-projects" onClick={handleClick}>
        Click
      </button>
      <div className="project-container">
        <div className="project-row header">
          <div className="project-row-project-name header">Project</div>
          <div className="project-row-right header">
            <div className="project-row-status header">Status</div>
            <div className="project-row-hours header">Hours</div>
          </div>
        </div>
        {displayProjects.map((displayProject) => (
          <Project key={displayProject.id} project={displayProject} />
        ))}
      </div>
    </div>
  );
}
