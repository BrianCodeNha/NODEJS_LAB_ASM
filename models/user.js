const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  doB: {
    type: String,
    require: true,
  },
  salaryScale: {
    type: Number,
    require: true,
  },
  startDate: {
    type: String,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
  annualLeave: {
    totalAnnualLeave: {
      type: Number, // mac dinh admin tu nhap, check moi khi dang ky ngay moi dam bao khong vươt qua muc hien tai
      require: true,
    },
    details: [
      {
        timeDetails: [
          {
            date: {
              type: String,
              require: true,
            },
            hours: {
              type: Number, // <= totalAnnualLeave
              require: true,
              max: [8, "không thể đăng ký nhiều hơn 8h/ngày"],
              min: [0, "không thể đăng ký số âm"],
            },
          },
        ],
        reason: {
          type: String,
          require: true,
        },
      },
    ],
  },
  imageUrl: {
    type: String,
    require: true,
  },
  working: {
    type: Boolean,
    require: true,
  },
  covidProfile: {
    temperature: {
      type: String,
    },
    firstTimeType: {
      type: String,
    },
    firstTimeDate: {
      type: String,
    },
    secondTimeType: {
      type: String,
    },
    secondTimeDate: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  session: {
    history: {
      date: {
        type: String,
      },
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
      duration: {
        type: Number,
      },
      location: {
        type: String,
      },
    },
  },
});

module.exports = mongoose.model("User", userSchema);
