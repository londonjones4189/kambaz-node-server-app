import EnrollmentsDao from "./dao.js"
export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  const findAllEnrollments = async (req, res) => {
    const enrollments = await dao.findAllEnrollments();
    res.json(enrollments);
  };

  const findCoursesForUser = async (req, res) => {
    let { uid } = req.params;
    if (uid === "current") {
      uid = req.session["currentUser"]._id;
    }
    const courses = await dao.findCoursesForUser(uid);
    res.json(courses);
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
  app.get("/api/users/:uid/courses", findCoursesForUser);
  app.post("/api/users/:uid/courses/:cid", enrollInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollInCourse);
}