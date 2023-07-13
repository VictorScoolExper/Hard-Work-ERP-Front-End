import { useEffect, useState } from "react";
import ScheduleForm from "./ScheduleForm";


const ScheduleController = ({ type }) => {
   
    return(
        <ScheduleForm type={type} />
    )
};

export default ScheduleController;