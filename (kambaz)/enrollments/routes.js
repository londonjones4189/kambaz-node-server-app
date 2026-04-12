import EnrollmentsDao from "./dao.js"

export default function EnrollmentsRoutes(app) {
    const dao = EnrollmentsDao();

    const enrollInCourse = async (req, res) => {
        const { uid, cid } = req.params;

        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
        res.send(status);

    }

    const unenrollInCourse = async (req, res) => {
        const { uid, cid } = req.params;

        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
        res.send(status);

    }

    app.post("/api/courses/:courseId/enroll", enrollInCourse);
    app.delete("/api/courses/:courseId/enroll", unenrollInCourse);
}