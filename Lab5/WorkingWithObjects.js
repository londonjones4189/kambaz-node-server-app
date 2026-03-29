const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

const moduleObj = {
  id: "M01",
  name: "NodeJS Basics",
  description: "Learn the fundamentals of NodeJS and ExpressJS",
  course: "Web Development 101",
};

export default function WorkingWithObjects(app) {
  app.get("/lab5/assignment", (req, res) => res.json(assignment));
  app.get("/lab5/assignment/title", (req, res) => res.json(assignment.title));
  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    assignment.title = req.params.newTitle;
    res.json(assignment);
  });
  app.get("/lab5/assignment/score", (req, res) => res.json(assignment.score));
  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    assignment.score = Number(req.params.newScore);
    res.json(assignment);
  });
  app.get("/lab5/assignment/completed", (req, res) => res.json(assignment.completed));
  app.get("/lab5/assignment/completed/:newCompleted", (req, res) => {
    assignment.completed = req.params.newCompleted === "true";
    res.json(assignment);
  });

  app.get("/lab5/module", (req, res) => res.json(moduleObj));
  app.get("/lab5/module/name", (req, res) => res.json(moduleObj.name));
  app.get("/lab5/module/name/:newName", (req, res) => {
    moduleObj.name = req.params.newName;
    res.json(moduleObj);
  });
  app.get("/lab5/module/description", (req, res) => res.json(moduleObj.description));
  app.get("/lab5/module/description/:newDescription", (req, res) => {
    moduleObj.description = req.params.newDescription;
    res.json(moduleObj);
  });
}