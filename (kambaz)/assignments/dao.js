import { v4 as uuidv4 } from "uuid";

export default function AssignmentDao(db) {
  function findAllAssignments() {
    return db.assignments;
  }

  function findAssignmentById(assignmentId) {
    return db.assignments.find((a) => a._id === assignmentId);
  }

  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }

  function deleteAssignment(assignmentId) {
    db.assignments = db.assignments.filter((a) => a._id !== assignmentId);
  }

  function updateAssignment(assignmentId, assignmentUpdates) {
    const assignment = db.assignments.find((a) => a._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }

  return {
    findAllAssignments,
    findAssignmentById,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}