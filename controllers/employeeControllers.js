const DiemDanh = require("../models/diemDanh");
const User = require("../models/user");
const date = require("date-and-time");


exports.getControlView = (req, res, next) => {
  res.render("controlView.ejs", {
    pageTitle: "Điểm Danh",
    path: "/",
    working: req.user.working,
    isAuthenticated: req.session.isLoggedIn,
    user: req.user,
  });
};

exports.getDiemDanhDetails = (req, res, next) => {
  res.render("diemDanh.ejs", {
    pageTitle: "Điểm Danh",
    path: "/",
    name: req.user.name,
    working: req.user.working,
    isAuthenticated: req.session.isLoggedIn,
    user: req.user,
    erroMess: req.session.errorMess
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
    isAuthenticated: req.session.isLoggedIn,
    erroMess: req.session.errorMess
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
      isAuthenticated: req.session.isLoggedIn,
      user: req.user,
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

      // cap nhat endTime to local user
      const updatedEndTime = today.getTime();
      user.session.history.endTime = updatedEndTime;

      // cap nhat duration
      const updatedDuration = updatedEndTime - user.session.history.startTime;

      user.session.history.duration = updatedDuration ? updatedDuration : 0;

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
            newUserDiemDanh.totalWorkingHour =
              newUserDiemDanh.totalWorkingHour + user.session.history.duration; // cong vao totalduration

            user.session.history = {};
            req.user = user;
            async function updateDatabase1() {
              await user.save();
              await newUserDiemDanh.save();
            }
            return updateDatabase1();
          } else {
            userDiemDanh.history.push(user.session.history);
            userDiemDanh.totalWorkingHour =
              userDiemDanh.totalWorkingHour + user.session.history.duration; // cong vao totalduration

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
                history: todayHistory,
                todayWorkingHour: new Date(todayDuration)
                  .toISOString()
                  .slice(11, 19),
                working: user.working,
                isAuthenticated: req.session.isLoggedIn,
                user: req.user,
              });
            } else {
              res.send("<h1> Not found History </h1>");
            }
          });
        });
    });
};

// DANG KY NGHI PHEP
let totalAnnualLeave = 0;
let registerDateList = []; // danh sach ngay nghi da dang ky
let annualLeaveReason = "";
let totalRegisteringDay =
  registerDateList
    .map((date) => date.hours)
    .reduce((prev, cur) => prev + cur, 0) / 8.0;
let isRegister = true;
let registeredList = {};

exports.getResetRegisterData = (req, res, next) => {
  // xoa data ngay de nhap lại
  registerDateList = [];
  totalRegisteringDay = 0;
  isRegister = true;
  totalAnnualLeave = req.user.annualLeave.totalAnnualLeave;
  res.redirect("/nghiphep");
};

exports.getNghiPhep = (req, res, next) => {
  // render form nhap ngay nghi
  registerDateList = [];
  totalRegisteringDay = 0;
  isRegister = true;
  User.findById(req.user._id)
    .then((user) => {
      registeredList = user.annualLeave;
      return (totalAnnualLeave = user.annualLeave.totalAnnualLeave);
    })
    .then(() => {
      res.render("annualLeave.ejs", {
        pageTitle: "Đăng ký nghỉ phép",
        path: "/nghiphep",
        working: req.user.working,
        annualLeave: totalAnnualLeave,
        dateList: registerDateList,
        error: "",
        isRegister: isRegister,
        reason: req.body.annualLeaveReasons,
        registeredList: registeredList,
        isAuthenticated: req.session.isLoggedIn,
        user: req.user,
      });
    });
};

exports.postNghiPhep = (req, res, next) => {
  // add data ngay nghi vao bo nho local de kiem tra
  registeredList = req.user.annualLeave;

  const dateOfDetails = req.body.annualLeave.split("-");
  const correctDate =
    dateOfDetails[2] + "/" + dateOfDetails[1] + "/" + dateOfDetails[0];

  const registeringMonth = dateOfDetails[1];

  const annualLeaveDetails = {
    // data tưng ngay nghi dc luu vao object
    date: correctDate,
    hours: req.body.annualLeaveHours,
  };

  // check trung ngay nghi da nhap nao
  const indexOfRegisterDateList = registerDateList.findIndex(
    (obj) => obj.date === annualLeaveDetails.date
  );

  // tinh tong so ngay va gio dang dang ky nghi phep

  totalRegisteringDay += annualLeaveDetails.hours / 8.0;

  let error = ""; // bao loi tren browser
 
  if(req.user.confirmMonths.indexOf(registeringMonth) > -1){
    error = 'Tháng này đã được quản lý của bạn xác nhận thông tin giờ làm. Bạn không thể đăng ký!'
  } else if (totalAnnualLeave === 0) {
    error =
      "Số ngày nghỉ được phép đăng ký không còn! Bạn không thể đăng ký! Vui lòng liên hệ admin!";
  } else if (annualLeaveDetails.hours / 8.0 > totalAnnualLeave) {
    isRegister = false;
    error =
      "Số ngày nghỉ đăng ký vượt quá số ngày nghỉ còn lại!! vui lòng kiểm tra lại";
  } else if (indexOfRegisterDateList >= 0) {
    error =
      "Thông tin ngày nghỉ bạn nhập đã bị trùng! Vui lòng nhập ngày khác hoặc bấm reset!";
  } else {
    registerDateList.push(annualLeaveDetails); // them thong tin dang ky vao list
    totalAnnualLeave = (
      totalAnnualLeave -
      annualLeaveDetails.hours / 8.0
    ).toFixed(1); // lấy tổng số ngày nghỉ còn lại - số ngày nghỉ đăng ký.
  }
  console.log(
    "🚀 ~ file: employeeControllers.js ~ line 206 ~ totalAnnualLeave",
    totalAnnualLeave
  );
  console.log(
    "🚀 ~ file: employeeControllers.js ~ line 206 ~ totalRegisteringDay",
    totalRegisteringDay
  );
  annualLeaveReason = req.body.annualLeaveReasons;
  res.render("annualLeave.ejs", {
    pageTitle: "Đăng ký nghỉ phép",
    path: "/nghiphep",
    working: req.user.working,
    annualLeave: totalAnnualLeave,
    dateList: registerDateList,
    error: error ? error : "",
    isRegister: isRegister,
    reason: annualLeaveReason,
    registeredList: registeredList,
    isAuthenticated: req.session.isLoggedIn,
    user: req.user,
  });
};

exports.postDangKyNghiPhep = (req, res, next) => {
  const updatedAnnualLeave = {
    totalAnnualLeave: totalAnnualLeave,
    details: [
      ...req.user.annualLeave.details,
      {
        timeDetails: registerDateList,
        reason: annualLeaveReason,
      },
    ],
  };
  req.user.annualLeave = updatedAnnualLeave;
  async function updateDatabase() {
    req.user.save();
    res.redirect("/nghiphep");
  }
  updateDatabase();
};

exports.getProfile = (req, res, next) => {
  res.render("profile.ejs", {
    pageTitle: "Thông tin nhân viên",
    path: "/profile",
    user: req.user,
    isAuthenticated: req.session.isLoggedIn,
    user: req.user,
  });
};

exports.postProfile = (req, res, next) => {
  req.user.imageUrl = req.body.imageUrl;
  async function updateDatabase() {
    await req.user.save();
    await res.render("profile.ejs", {
      pageTitle: "Thông tin nhân viên",
      path: "/profile",
      user: req.user,
      isAuthenticated: req.session.isLoggedIn,
      user: req.user,
    });
  }
  updateDatabase();
};
let pageSize = 20;
let page = 1;
exports.getThongTinGioLam = (req, res, next) => {
  DiemDanh.findOne({ userId: req.user._id })
    .then((diemDanhOfUser) => {
      const currentMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);

      if (req.body.pageSize) {
        pageSize = req.body.pageSize;
      }

      if (req.query.page) {
        page = req.query.page;
      }

      const paginate = (array, pageSize, pageNumber) => {
        return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
      };

      const history = diemDanhOfUser.history;
      const pagingHistory = paginate(history, pageSize, page);
      console.log(
        "🚀 ~ file: employeeControllers.js ~ line 336 ~ .then ~ page",
        page
      );
      console.log(
        "🚀 ~ file: employeeControllers.js ~ line 336 ~ .then ~ pageSize",
        pageSize
      );
      const totalWorkingHour = history
        .map((obj) => obj.duration)
        .reduce((prev, current) => prev + current, 0);

      const annualLeaveDetails = req.user.annualLeave.details;
      const annualLeaveTimeDetails = annualLeaveDetails
        .map((detail) => detail.timeDetails)
        .flat(Infinity);

      const dateList = pagingHistory.map((his) => his.date);
      console.log(
        "🚀 ~ file: employeeControllers.js ~ line 346 ~ .then ~ pagingHistory",
        pagingHistory
      );
      const uniqueDateList = dateList.filter(
        (date, index) => dateList.indexOf(date) == index
      );
      console.log(
        "🚀 ~ file: employeeControllers.js ~ line 349 ~ .then ~ uniqueDateList",
        uniqueDateList
      );

      res.render("thongTinGioLam.ejs", {
        pageTitle: "Thông tin giờ làm",
        path: "/thongtingiolam",
        user: req.user,
        history: pagingHistory,
        totalWorkingHours: new Date(totalWorkingHour)
          .toISOString()
          .slice(11, 19),
        dateList: uniqueDateList,
        annualLeave: annualLeaveTimeDetails,
        currentMonth: "",
        isAuthenticated: req.session.isLoggedIn,
        currentMonthDateList: [],
        currentMonthHistory: [],
        currentMonthAnnualTimeDetails: [],
        
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postThongTinGioLam = (req, res, next) => {
  DiemDanh.findOne({ userId: req.user._id })
    .then((diemDanhOfUser) => {
      const currentMonth = req.body.month;

      if (req.query.page) {
        page = req.query.page;
      }

      if (req.body.pageSize) {
        pageSize = req.body.pageSize;
      }

      const paginate = (array, pageSize, pageNumber) => {
        return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
      };

      const history = diemDanhOfUser.history;

      const currentMonthHistory = history.filter(
        (his) => his.date.split("/")[1] === currentMonth
      );
      const totalWorkingHour = history
        .map((obj) => obj.duration)
        .reduce((prev, current) => prev + current, 0);

      const pagingHistory = paginate(history, pageSize, page);
      const pagingDateList = pagingHistory.map((his) => his.date);

      const dateList = history.map((his) => his.date);

      const pagingUniqueDateList = pagingDateList.filter(
        (date, index) => dateList.indexOf(date) == index
      );

      const annualLeaveDetails = req.user.annualLeave.details;
      const annualLeaveTimeDetails = annualLeaveDetails
        .map((detail) => detail.timeDetails)
        .flat(Infinity);
      const currentMonthAnnualTimeDetails = annualLeaveTimeDetails.filter(
        (detail) => detail.date.split("/")[1] === currentMonth
      );

      const uniqueDateList = dateList.filter(
        (date, index) => dateList.indexOf(date) == index
      );
      const currentMonthDateList = uniqueDateList.filter(
        (date) => date.split("/")[1] === currentMonth
      );

      res.render("thongTinGioLam.ejs", {
        pageTitle: "Thông tin giờ làm",
        path: "/thongtingiolam",
        user: req.user,
        history: pagingHistory,
        totalWorkingHours: new Date(totalWorkingHour)
          .toISOString()
          .slice(11, 19),
        dateList: pagingUniqueDateList,
        annualLeave: annualLeaveTimeDetails,
        currentMonth: currentMonth,
        currentMonthDateList: currentMonthDateList,
        currentMonthHistory: currentMonthHistory,
        currentMonthAnnualTimeDetails: currentMonthAnnualTimeDetails,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCovidProfile = (req, res, next) => {
  let staffs;
  
  if (req.user.title === "manager") {
    return User.find({
      department: req.user.department,
      title: "employee",
    }).then((users) => {      

      res.render("covidProfile.ejs", {
        pageTitle: "Thông tin Covid",
        path: "/covidcanhan",
        name: req.user.name,
        working: req.user.working,
        user: req.user,
        staffs: users ? users : null,
        isAuthenticated: req.session.isLoggedIn,
        hasCovidDetails: req.user.covidProfile ? true : false,
      });
    });
  }

  res.render("covidProfile.ejs", {
    pageTitle: "Thông tin Covid",
    path: "/covidcanhan",
    name: req.user.name,
    working: req.user.working,
    user: req.user,
    staffs: staffs ? staffs : null,
    isAuthenticated: req.session.isLoggedIn,
    hasCovidDetails: req.user.covidProfile ? true : false,
  });
};

exports.postCovidProfile = (req, res, next) => {
  const covidProfile = {
    temperature: req.body.temperature,
    firstTimeType: req.body.firstTimeType,
    firstTimeDate: req.body.firstTimeDate,
    secondTimeType: req.body.secondTimeType,
    secondTimeDate: req.body.secondTimeDate,
    status: req.body.status,
    isAuthenticated: req.session.isLoggedIn,
  };

  req.user.covidProfile = covidProfile;
  req.user.save();
  res.render("covidProfile-kp.ejs", {
    pageTitle: "Thông tin Covid",
    path: "/covidcanhan",
    name: req.user.name,
    working: req.user.working,
    temperature: req.body.temperature,
    firstTimeType: req.body.firstTimeType,
    firstTimeDate: req.body.firstTimeDate,
    secondTimeType: req.body.secondTimeType,
    secondTimeDate: req.body.secondTimeDate,
    status: req.body.status,
    isAuthenticated: req.session.isLoggedIn,
    user: req.user,
  });
};
