import './attendanceGrid.less';

class AttendanceGridController {
    static $inject = ['attendanceGridService'];
    constructor(attendanceGridService) {
        this.attendanceGridService = attendanceGridService;
        this.emptyCellTitle = 'Section / Date';
        this.pageTitle = 'Attendance Grid';
    }

    $onInit() {
        this.attendanceGridService.getAttendanceGrid().then((data) => {
            this.attendanceGrid = data;
        });
        /*
        this.attendanceGrid = {
            dates: ['2017-08-19', '2017-08-20', '2017-08-21'],
            sections: [{
                id: 345,
                name: 'Math 101', //course name
                attendances: [{
                    date: '2017-08-19',
                    absenceTotalId: 7381,
                    presentStudents: 19,
                    enrolledStudents: 25,
                    schedule: {
                        startTime: '09:50:00',
                        endTime: '10:30:00'
                    }
                }, {
                    date: '2017-08-20',
                    absenceTotalId: 7382,
                    presentStudents: 20,
                    enrolledStudents: 26,
                    schedule: {
                        startTime: '09:50:00',
                        endTime: '10:30:00'
                    }
                }, {}]
            }, {
                id: 346,
                name: 'English 101',
                attendances: [{
                    date: '2017-08-20',
                    absenceTotalId: 7382,
                    presentStudents: 22,
                    enrolledStudents: 22,
                    schedule: {
                        startTime: '09:50:00',
                        endTime: '10:30:00'
                    }
                }, {}, {}]
            }]
        }*/
    }

    onUpdate(attendance) {
        this.attendanceGridService.updateAttendance(attendance);
    }
}

export const attendanceGridComponent = {
    template: require('./attendanceGrid.html'),
    controller: AttendanceGridController
}