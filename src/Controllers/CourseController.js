import CourseModel from "../Models/CourseModel.js";
import UserModel from "../Models/UserModel.js";
import { validationResult } from "express-validator";

class CourseController {
  async getAllCourse(req, res) {
    await CourseModel.find({})
      .then((courses) => {
        return res.json(courses);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async getCourse(req, res) {
    await CourseModel.find({ _id: { $in: req.body.ids } })
      .then((course) => {
        return res.json({
          msg: "Retrieved",
          course: course,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async findOne(req, res) {
    await CourseModel.findOne({ _id: req.params.id })
      .then((course) => {
        return res.json(course);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const newCourse = new CourseModel(req.body);
    await newCourse
      .save()
      .then(() => {
        return res.json({
          msg: "Created",
        });
      })
      .catch((e) => {
        if (e.code === 11000) {
          return res.json({
            error: "Name already exists",
          });
        }
      });
  }

  async update(req, res) {
    await CourseModel.updateOne({ _id: req.body._id }, req.body)
      .then(() => {
        return res.json({
          msg: "Updated",
        });
      })
      .catch((e) => {
        if (e.code === 11000) {
          return res.json({
            error: "Name already exists",
          });
        }
      });
  }

  async delete(req, res) {
    await CourseModel.deleteOne({ _id: req.params._id })
      .then(() => {
        return res.json({
          msg: "Deleted",
        });
      })
      .catch((e) => {
        return res.json({
          error: "Error exists",
        });
      });
  }

  async addCourseToUser(req, res) {
    try {
      let user = await UserModel.findById(req.body.userId);
      await CourseModel.findById(req.body.courseId).then((course) => {
        if (!user.courseIds.includes(course._id)) {
          user.courseIds.push(course._id);
          user.save();
          return res.json({
            msg: "Course added to user",
          });
        } else {
          return res.status(404).json({
            msg: "Course already added to this user",
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async removeCourseFromUser(req, res) {
    try {
      let user = await UserModel.findById(req.body.userId);
      await CourseModel.findById(req.body.courseId).then((course) => {
        if (user.courseIds.includes(course._id)) {
          user.courseIds.pop(course._id);
          user.save();
          return res.json({
            msg: "Course remove from this user",
          });
        } else {
          return res.status(404).json({
            msg: "This user does not contain this course",
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new CourseController();
