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
      console.log(
        "🚀 ~ file: employeeControllers.js ~ line 64 ~ .then ~ user",
        user
      );

      // cap nhat trang thai working user
      user.working = false;

      // cap nhat endTime to local user
      const updatedEndTime = today.getTime();
      user.session.history.endTime = updatedEndTime;
      console.log(
        "🚀 ~ file: employeeControllers.js ~ line 70 ~ .then ~ updatedEndTime",
        updatedEndTime
      );

      // cap nhat duration
      const updatedDuration = updatedEndTime - user.session.history.startTime;
      console.log(
        "🚀 ~ file: employeeControllers.js ~ line 74 ~ .then ~ user.session.history.startTime",
        user.session.history.startTime
      );
      console.log(
        "🚀 ~ file: employeeControllers.js ~ line 73 ~ .then ~ updatedDuration",
        updatedDuration
      );
      user.session.history.duration = updatedDuration;

      //cap nhat len local req
      req.user = user;
      return user.save();
    })
    .then((user) => {
      // cap nhat user va diemDanh cua user len database
      DiemDanh.findOne({ userId: user._id })
        .then((userDiemDanh) => {
          if (!userDiemDanh) {
            const newUserDiemDanh = new DiemDanh({
              userId: user._id,
              totalWorkingHour: 0,
              history: [],
            });
            newUserDiemDanh.history.push(user.session.history);
            newUserDiemDanh.totalWorkingHour = newUserDiemDanh.totalWorkingHour + user.session.history.duration; // cong vao totalduration

            user.session.history = {};
            req.user = user;
            async function updateDatabase1() {
              await user.save();
              await newUserDiemDanh.save();
            }
            return updateDatabase1();
          } else {
            userDiemDanh.history.push(user.session.history);
            userDiemDanh.totalWorkingHour = userDiemDanh.totalWorkingHour + user.session.history.duration; // cong vao totalduration

            user.session.history = {};
            req.user = user;

            async function updateDatabase2() {
              await user.save();
              await userDiemDanh.save();
            }
            return updateDatabase2();
          }
        })
        .then(() => {
          DiemDanh.findOne({ userId: req.user._id }).then((userDiemDanh) => {
            var dt = new Date();
            year = dt.getFullYear();
            month = (dt.getMonth() + 1).toString().padStart(2, "0");
            day = dt.getDate().toString().padStart(2, "0");
            
            const today = day + "/" + month + "/" + year;

            if (userDiemDanh) {
              // filter sessions co ngay == ngay hom nay
              todayHistory = userDiemDanh.history.filter(
                (his) => his.date === today
              );             

              todayDuration = todayHistory
                .map((his) => his.duration)
                .reduce((prev, current) => prev + current, 0);              

              res.render("ketThuc-kq.ejs", {
                pageTitle: "Kết thúc phiên làm việc",
                path: "/ketthuc",
                name: user.name,
                history: userDiemDanh.history,
                todayWorkingHour: new Date(todayDuration).toISOString().slice(11, 19),
                working: user.working,
              });
            } else {
              res.send("<h1> Not found History </h1>");
            }
          });
        });
    });
};
