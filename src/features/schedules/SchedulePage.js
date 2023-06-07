import Calendar from "./Calendar";

const SchedulePage = () => {
  return (
    <div
      className="container-fluid"
      style={{ overflowY: "scroll", height: "94vh" }}
    >
      <div className="col-6">
        <h1>Schedules</h1>
      </div>

      <div className="col-12">
        <Calendar />
      </div>
    </div>
  );
};

export default SchedulePage;
