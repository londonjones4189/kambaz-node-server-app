import AssignmentDao from "./dao.js";
 
export default function AssignmentRoutes(app, db) {
  const dao = AssignmentDao(db);
 
  const findAllAssignments = (req, res) => {
    const assignments = dao.findAllAssignments();
    res.json(assignments);
  };
 
  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAllAssignments().filter(
      (a) => a.course === courseId
    );
    res.json(assignments);
  };
 
  const findAssignmentById = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignmentById(assignmentId);
    res.json(assignment);
  };
 
  const createAssignmentForCourse = (req, res) => {
    const { courseId } = req.params;
    const newAssignment = dao.createAssignment({ ...req.body, course: courseId });
    res.json(newAssignment);
  };
 
  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.updateAssignment(assignmentId, req.body);
    res.json(status);
  };
 
  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    dao.deleteAssignment(assignmentId);
    res.sendStatus(200);
  };
 
  app.get("/api/assignments", findAllAssignments);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}