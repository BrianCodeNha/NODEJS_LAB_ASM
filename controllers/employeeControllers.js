const DiemDanh = require("../models/diemDanh");
const User = require("../models/user");
const date = require("date-and-time");

exports.getControlView = (req, res, next) => {
  res.render("controlview.ejs", {
    pageTitle: "Điểm Danh",
    path: "/",
    working: req.user.working,
  });
};

exports.getDiemDanhDetails = (req, res, next) => {
  res.render("diemDanh.ejs", {
    pageTitle: "Điểm Danh",
    path: "/diemdanh",
    name: req.user.name,
    working: req.user.working,
  });
};

exports.postDiemDanhDetails = (req, res, next) => {
  const today = new Date();

  // chuyen trang thai dang lam viec
  req.user.working = true;

  // truyen tham so vao trong user.sessison
  const updatedHistory = {
    date: date.format(today, "DD/MM/YYYY"),
    startTime: today.getTime(),
    endTime: null,
    duration: null,
    location: req.body.location,
  };
  req.user.session.history = updatedHistory;

  async function updateAll() {
    // update user len database
    await req.user.save();

    //render trang view
    await res.render("diemDanh-kq.ejs", {
      pageTitle: "Điểm Danh",
      path: "/",
      name: req.user.name,
      location: req.body.location,
      time: date.format(today, "DD/MM/YYYY HH:mm:ss"),
      working: req.user.working,
    });
  }
  updateAll();
};

// ket thuc phien lam viec

exports.getKetThuc = (req, res, next) => {
  const today = new Date();

  // fetch user database

  User.findById(req.user._id)
    .then((user) => {
      // cap nhat trang thai working user
      user.working = false;

      // cap nhat endTime
      const updatedEndTime = today.getTime();
      user.session.history.endTime = updatedEndTime;

      // cap nhat duration
      const updatedDuration =
        (updatedEndTime - user.session.history.startTime) / 1000 / 60;

      console.log(
        "🚀 ~ file: employeeControllers.js ~ line 75 ~ .then ~ updatedDuration",
        updatedDuration
      );
      // user.session.history.duration =
      //   user.session.history.duration + updatedDuration; //minutes

      //cap nhat len local req
      return (req.user = user);
    })
    .then((user) => {
      // cap nhat user va diemDanh cua user len database
      DiemDanh.findOne({ userId: req.user._id }).then((userDiemDanh) => {
        if (!userDiemDanh) {
          const newUserDiemDanh = new DiemDanh({
            userId: user._id,
            todayWorkingHour: 0,
            totalWorkingHour: 0,
            history: [],
          });
          newUserDiemDanh.history.push(user.session.history);
          user.session.history = {};

          async function updateDatabase1() {
            await user.save();
            await newUserDiemDanh.save();
            return;
          }
          updateDatabase1();
        } else {
          userDiemDanh.history.push(user.session.history);
          user.session.history = {};
          req.user = user;

          async function updateDatabase2() {
            await user.save();
            await userDiemDanh.save();
          }
          updateDatabase2();
        }

        console.log(
          "🚀 ~ file: employeeControllers.js ~ line 120 ~ .then ~ userDiemDanh",
          userDiemDanh
        );
        return userDiemDanh;
      });
    })
    .then(() => {
      DiemDanh.findOne({ userId: req.user._id }).then((userDiemDanh) => {
        const today = new Date();
        if (userDiemDanh) {
          todayHistory = userDiemDanh.history.filter(
            (his) => his.date === today
          );
          console.log(
            "🚀 ~ file: employeeControllers.js ~ line 129 ~ DiemDanh.findOne ~ todayHistory",
            todayHistory
          );

          todayDuration = todayHistory
            .map((his) => his.duration)
            .reduce((prev, current) => prev + current, 0);
          console.log(
            "🚀 ~ file: employeeControllers.js ~ line 133 ~ DiemDanh.findOne ~ todayDuration",
            todayDuration
          );

          res.render("ketThuc-kq.ejs", {
            pageTitle: "Kết thúc phiên làm việc",
            path: "/ketthuc",
            name: req.user.name,
            history: userDiemDanh.history,
            todayWorkingHour: userDiemDanh.todayWorkingHour,
            working: req.user.working,
          });
        } else {
          res.send('<h1> Not found History </h1>')
        }
      });
    });
};
