const User = require("../models/user");
const DiemDanh = require("../models/diemDanh");
const hashPassword = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

exports.getManager = (req, res, next) => {
  if (!req.user.title === "manager") {
    return res.redirect("/");
  }

  User.find({ title: "employee", department: req.user.department }).then(
    (users) => {
      res.render("manager.ejs", {
        pageTitle: "Login",
        path: "/login",
        working: req.user ? req.user.working : false,
        isAuthenticated: req.session.isLoggedIn,
        user: req.user,
        staffs: users,
      });
    }
  );
};

exports.postDeletHistory = (req, res, next) => {
  const userId = req.body.userId;
  console.log(
    "🚀 ~ file: auth.js ~ line 29 ~ exports.postDeletHistory ~ userId",
    userId
  );
  const hisId = req.body.hisId;
  console.log(
    "🚀 ~ file: auth.js ~ line 30 ~ exports.postDeletHistory ~ hisId",
    hisId
  );

  DiemDanh.findOne({ userId: userId })
    .then((diemDanhOfUser) => {
      return diemDanhOfUser.deleteHistory(hisId);
    })
    .then((diemDanhOfUser) => {
      console.log(
        "🚀 ~ file: auth.js ~ line 36 ~ DiemDanh.findOne ~ diemDanhOfUser",
        diemDanhOfUser
      );
      res.redirect(`/manager/${userId}`);
    });
};

exports.getManagerStaff = (req, res, next) => {
  const staffId = req.params.id;
  
  User.findOne({ _id: staffId }).then((user) => {
    DiemDanh.findOne({ userId: user._id }).then((diemDanhOfUser) => {
      const history = diemDanhOfUser.history;

      const totalWorkingHour = history
        .map((obj) => obj.duration)
        .reduce((prev, current) => prev + current, 0);

      const dateList = history.map((his) => his.date);
      const uniqueDateList = dateList.filter(
        (date, index) => dateList.indexOf(date) == index
      );

      const annualLeaveDetails = user.annualLeave.details;
      const annualLeaveTimeDetails = annualLeaveDetails
        .map((detail) => detail.timeDetails)
        .flat(Infinity);

      res.render("staffWorkingTimeDetails.ejs", {
        pageTitle: "Xác nhận giờ làm",
        path: "/manager",
        user: req.user,
        staff: user,
        isAuthenticated: req.session.isLoggedIn,
        history: history,
        totalWorkingHours: new Date(totalWorkingHour)
          .toISOString()
          .slice(11, 19),
        dateList: uniqueDateList,
        annualLeave: annualLeaveTimeDetails,
        onConfirm: false,
        confirmMess: req.body.ConfirmMess
      });
    });
  });
};


exports.postManagerStaff = (req, res, next) => {

  const confirmMonth = req.body.confirmMonth;
  let onDelete = true;

  const staffId = req.body.staffId;
  console.log("🚀 ~ file: auth.js ~ line 94 ~ staffId", staffId)
  const currentMonth = req.body.month;
  
  User.findById(staffId).then((user) => {

    // save confirmMonths vao database
    if(confirmMonth){
      user.confirmMonths.push(confirmMonth);
      user.save();
      onDelete = false;
    }
    
    // load thong tin gio lam cua staff

    DiemDanh.findOne({ userId: user._id }).then((diemDanhOfUser) => {    

      const history = diemDanhOfUser.history;
      const currentMonthHistory = history.filter(his => his.date.split('/')[1] === currentMonth)

      const totalWorkingHour = history
        .map((obj) => obj.duration)
        .reduce((prev, current) => prev + current, 0);

      const dateList = history.map((his) => his.date);
      const uniqueDateList = dateList.filter(
        (date, index) => dateList.indexOf(date) == index
      );
      const currentMonthDateList = uniqueDateList.filter(date => date.split('/')[1] === currentMonth)

      const annualLeaveDetails = user.annualLeave.details;
      const annualLeaveTimeDetails = annualLeaveDetails
        .map((detail) => detail.timeDetails)
        .flat(Infinity);
      const currentMonthAnnualTimeDetails = annualLeaveTimeDetails.filter(detail => detail.date.split('/')[1] === currentMonth)

      res.render("staffWorkingTimeDetails.ejs", {
        pageTitle: "Xác nhận giờ làm",
        path: "/manager",
        user: req.user,
        staff: user,
        isAuthenticated: req.session.isLoggedIn,
        history: currentMonth === 'all' ? history : currentMonthHistory,
        totalWorkingHours: new Date(totalWorkingHour)
          .toISOString()
          .slice(11, 19),
        dateList: currentMonth === 'all' ? uniqueDateList : currentMonthDateList,
        annualLeave: currentMonth === 'all' ? annualLeaveTimeDetails : currentMonthAnnualTimeDetails,
        onConfirm: true,        
        confirmMonth: currentMonth,
        confirmMess: req.body.ConfirmMess
      });
    });
  });
};

exports.getToPdf = (req, res, next) => {
  const pdfDoc = new PDFDocument();
  const filename = req.user.email + "CovidProfile.pdf";
  const rootPath = path.dirname(require.main.filename);
  const covidProfilePath = path.join(rootPath, "covidProfile", filename);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="' + filename + '"');
  pdfDoc.pipe(fs.createWriteStream(covidProfilePath));
  pdfDoc.pipe(res);
  pdfDoc.fontSize(26).text("Covid Profile" + req.user.id);
  pdfDoc.text("------------------------------------------------");
  pdfDoc.text("- Temperature:" + req.user.covidProfile.temperature);
  pdfDoc.text("- First Vaccine Name:" + req.user.covidProfile.firstTimeType);
  pdfDoc.text("- First Injected Date:" + req.user.covidProfile.firstTimeDate);
  pdfDoc.text("- Second Vaccine Name:" + req.user.covidProfile.secondTimeType);
  pdfDoc.text("- Second Injected Date:" + req.user.covidProfile.secondTimeDate);
  pdfDoc.text("- Health Status:" + req.user.covidProfile.status);

  pdfDoc.end();
};

exports.getLogin = (req, res, next) => {
  req.session.prevUrl = req.get('referer');
  
  console.log("🚀 ~ file: auth.js ~ line 178 ~ req.session.prevUrl", req.session.prevUrl)
  res.render("login.ejs", {
    pageTitle: "Login",
    path: "/login",
    working: req.user ? req.user.working : false,
    isAuthenticated: req.session.isLoggedIn,
    errorMessage: null,
    infoMessage: null,
    user: req.user,
    prevUrl: null,
  });
};

exports.postLogin = (req, res, next) => {
  let errorMessage, infoMessage;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        errorMessage = "Tài khoản email không tồn tại!";

        return res.render("login.ejs", {
          pageTitle: "Login",
          path: "/login",
          working: req.user ? req.user.working : false,
          isAuthenticated: false,
          errorMessage: errorMessage,
          infoMessage: infoMessage,
          user: req.user,
          prevUrl: null,
        });
      }
      hashPassword.compare(password, user.password).then((isValid) => {
        if (isValid) {
          // valid user
          req.session.isLoggedIn = true;
          req.session.user = user;
          infoMessage = "Đăng nhập thành công!";
          return res.render("login.ejs", {
            pageTitle: "Login",
            path: "/login",
            working: req.user ? req.user.working : false,
            isAuthenticated: req.session.isLoggedIn,
            errorMessage: errorMessage,
            infoMessage: infoMessage,
            user: user,
            prevUrl: req.session ? req.session.prevUrl : null
          });
          
        }

        // not correct password
        errorMessage = "tài khoản email và mật khẩu không trùng khớp!";

        return res.status(422).render("login.ejs", {
          pageTitle: "Login",
          path: "/login",
          working: req.user ? req.user.working : false,
          isAuthenticated: false,
          errorMessage: errorMessage,
          infoMessage: infoMessage,
          prevUrl: null,
        });
      });      
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  let errorMessage;
  let infoMessage;
  res.render("signup.ejs", {
    pageTitle: "Sign Up",
    path: "/signup",
    working: req.user ? req.user.working : false,
    errMessage: errorMessage,
    infoMessage: infoMessage,
    isAuthenticated: req.session.isLoggedIn,
    user: req.user,
  });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  let errorMessage;
  let infoMessage;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return (errorMessage =
          "emai này đã được đăng ký! Xin vui lòng nhập lại email khác!");
      } else {
        hashPassword.hash(password, 12).then((hashedPassword) => {
          console.log(
            "🚀 ~ file: auth.js ~ line 57 ~ hashPassword.hash ~ hashedPassword",
            hashedPassword
          );

          const user = new User({
            working: false,
            name: name,
            email: email,
            password: hashedPassword,
            doB: "",
            salaryScale: 0,
            startDate: "",
            department: "",
            annualLeave: {
              totalAnnualLeave: 0,
              details: [],
            },
            covideProfile: {},
            imageUrl: "",
            session: {
              sessionDuration: 0,
              history: {
                date: "",
                startTime: null,
                endTime: null,
                duration: 0,
                location: null,
              },
            },
          });

          return user.save(); // save user len database
        });

        return (infoMessage = "Đã tạo user thành công!");
      }
    })
    .then(() => {
      res.render("signup.ejs", {
        pageTitle: "Sign Up",
        path: "/signup",
        working: req.user ? req.user.working : false,
        errMessage: errorMessage,
        infoMessage: infoMessage,
        isAuthenticated: req.session.isLoggedIn,
        user: req.user,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
