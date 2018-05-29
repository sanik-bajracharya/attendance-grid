import './attendanceGrid.less';

class AttendanceGridController {
    static $inject = ['attendanceGridService'];
    constructor(attendanceGridService) {
        this.attendanceGridService = attendanceGridService;
    }

    $onInit() {
        this.attendanceGridService.getAttendanceGrid().then((data) => {
            this.attendanceGrid = data;
            this.emptyCellTitle = 'Section / Date';
            this.pageTitle = 'Attendance Grid';
        });
    }

    onUpdate(attendance) {
        this.attendanceGridService.updateAttendance(attendance);
    }
}

export const attendanceGridComponent = {
    template: require('./attendanceGrid.html'),
    controller: AttendanceGridController
}