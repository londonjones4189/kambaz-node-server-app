import EnrollmentsDao from "./dao.js"
export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  const findAllEnrollments = async (req, res) => {
    const enrollments = await dao.findAllEnrollments();
    res.json(enrollments);
  };

  const enrollInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      uid = req.session["currentUser"]._id;
    }
    const status = await dao.enrollUserInCourse(uid, cid);
    res.send(status);
  };

  const unenrollInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      uid = req.session["currentUser"]._id;
    }
    const status = await dao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };

  app.get("/api/enrollments", findAllEnrollments);
  app.post("/api/courses/:courseId/enroll", enrollInCourse);
  app.delete("/api/courses/:courseId/enroll", unenrollInCourse);
}