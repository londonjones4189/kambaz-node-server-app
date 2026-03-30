import UsersDao from "./dao.js";
import CoursesDao from "../courses/dao.js";
import EnrollmentsDao from "../enrollments/dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
  const courseDao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  const createUser = (req, res) => {
    const user = dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = (req, res) => {
    dao.deleteUser(req.params.userId);
    res.sendStatus(200);
  };

  const findAllUsers = (req, res) => res.json(dao.findAllUsers());

  const findUserById = (req, res) => res.json(dao.findUserById(req.params.userId));

  const updateUser = (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(req.session["currentUser"]);
  };

  const signup = (req, res) => {
    if (dao.findUserByUsername(req.body.username)) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    req.session.save(() => res.json(currentUser));
  };

  const signin = (req, res) => {
  const { username, password } = req.body;
  const currentUser = dao.findUserByCredentials(username, password);
  if (currentUser) {
    req.session["currentUser"] = currentUser;
    req.session.save(() => {
      console.log("Session after signin:", req.session);
      res.json(currentUser);
    });
  } else {
    res.status(401).json({ message: "Unable to login. Try again later." });
  }
};

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) { res.sendStatus(401); return; }
    res.json(currentUser);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) { res.sendStatus(401); return; }
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const findCoursesForUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) { res.sendStatus(401); return; }
    let { uid } = req.params;
    if (!uid || uid === "current") uid = currentUser._id; 
    res.json(enrollmentsDao.findCoursesForUser(uid));
};

  const enrollUserInCourse = (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") uid = req.session["currentUser"]._id;
    res.json(enrollmentsDao.enrollUserInCourse(uid, cid));
  };

  const unenrollUserFromCourse = (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") uid = req.session["currentUser"]._id;
    enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.sendStatus(200);
  };
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/current/courses", findCoursesForUser);
  app.get("/api/users/:uid/courses", findCoursesForUser);
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
}