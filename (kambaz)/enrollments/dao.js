import { v4 as uuidv4 } from "uuid";
 
export default function EnrollmentsDao(db) {
  function findAllEnrollments() {
    return db.enrollments;
  }
 
  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((e) => e.user === userId);
  }
 
  function enrollUserInCourse(userId, courseId) {
    const existing = db.enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (existing) return existing;
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments.push(newEnrollment);
    return newEnrollment;
  }
 
  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
  }
 
  function findCoursesForUser(userId) {
    const userEnrollments = db.enrollments.filter((e) => e.user === userId);
    return userEnrollments.map((e) =>
      db.courses.find((c) => c._id === e.course)
    ).filter(Boolean);
  }

  return {
    findAllEnrollments,
    findEnrollmentsForUser,
    enrollUserInCourse,
    unenrollUserFromCourse,
    findCoursesForUser
  };
}