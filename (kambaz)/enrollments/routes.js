import EnrollmentsDao from "./dao.js";
 
export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);
 
  const findAllEnrollments = (req, res) => {
    res.json(dao.findAllEnrollments());
  };
 
  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    res.json(dao.findEnrollmentsForUser(userId));
  };
 
  const enrollUserInCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };
 
  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  };
 
  app.get("/api/enrollments", findAllEnrollments);
  app.get("/api/enrollments/:userId", findEnrollmentsForUser);
  app.post("/api/enrollments/:userId/:courseId", enrollUserInCourse);
  app.delete("/api/enrollments/:userId/:courseId", unenrollUserFromCourse);
}
 