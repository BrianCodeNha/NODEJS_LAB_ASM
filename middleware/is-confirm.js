module.exports = (req, res, next) => {
    if(req.user.confirmMonths.indexOf(req.body.month) > -1){
        req.session.errorMess = 'Quản lý đã xác nhận thông tin giờ làm tháng này! Bạn không thể điểm danh!'
        return res.redirect('/diemdanh')
    }
    next();
}