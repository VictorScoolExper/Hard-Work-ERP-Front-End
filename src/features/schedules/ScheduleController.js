import { useEffect, useState } from "react";
import ScheduleForm from "./ScheduleForm";

const ScheduleController = ({ type }) => {
  return (
    <div
      className="container-fluid"
      style={{ overflowY: "scroll", height: "94vh" }}
    >
      <ScheduleForm type={type} />
    </div>
  );
};

export default ScheduleController;
