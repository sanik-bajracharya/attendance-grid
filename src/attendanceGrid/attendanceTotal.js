import './attendanceTotal.less';

class AttendanceTotalComponent {
    constructor() {
        this.isEditMode = false;
        this.displayActionBtn = false;
    }

    $onInit() {
        if (this.attendance.schedule) {
            this.attendance.schedule.startTime = this._convertToDate(this.attendance.schedule.startTime);
            this.attendance.schedule.endTime = this._convertToDate(this.attendance.schedule.endTime);
        }
    }

    onCancel() {
        if (this._isAttendanceDirty()) {
            this.attendance = this.attendanceOrig;
        } 
        this.isEditMode = !this.isEditMode;
    }

    onModeChange() {
        if (this.isEditMode && this._isAttendanceDirty()) {
            this.onUpdate({ attendance: this.attendance });
        } else {
            this.attendanceOrig = angular.copy(this.attendance);
        }

        this.isEditMode = !this.isEditMode;
    }

    _convertToDate(time) {
        let timeParts = time.split(':');
        return new Date(1970, 0, 1, timeParts[0], timeParts[1], timeParts[2]);
    }

    _isAttendanceDirty() {
        let isDirty = false;
        if (!angular.equals(this.attendanceOrig, this.attendance)) {
            isDirty = true;
        } 
        return isDirty;
    }

    onMouseleave() {
        if (this.isEditMode) {
            this.displayActionBtn = true;
        } else {
            this.displayActionBtn = false;
        }
    }

}

export const attendanceTotalComponent  = {
    template: require('./attendanceTotal.html'),
    controller: AttendanceTotalComponent,
    bindings: {
        attendance: '<',
        onUpdate: '&'
    }
}