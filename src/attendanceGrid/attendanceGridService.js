
/* @ngInject */
class AttendanceGridService {
    constructor($http, $q) {
       this.$http = $http;
       this.$q = $q;

       this.originalData = null;
       this.attendanceGrid = {};
    }

    getAttendanceGrid() {
        let deferred = this.$q.defer();
        this.$http.get('_assets/data/demo_data.json').then((response) => {
            this.originalData = this.results = response.data.results;
            let dates = this._findClassDates();
            let sections = this._getSectionCourseAcrossDates(dates);

            deferred.resolve({
                dates: dates,
                sections: sections
            });
        });

        return deferred.promise;
    }

    updateAttendance(attendance) {
        let attendanceDate = this.originalData['class_absence_totals'][attendance.date],
            section = attendanceDate[attendance.sectionId]
        if (section) {
            section['present_students'] = attendance.presentStudents;
            section['enrolled_students'] = attendance.enrolledStudents;
        }

        let schedules = this.originalData['schedules'][attendance.date];
        for (let idx=0; idx < schedules.length; idx++) {
            let schedule = schedules[idx];

            if (schedule['section_period_id'] === attendance.sectionId) {
                schedule['start_time'] = this._convertToTimeString(attendance.schedule.startTime);    
                schedule['end_time'] = this._convertToTimeString(attendance.schedule.endTime);
                break;
            }
        }

        let contentToUpdate = {
            results: this.originalData
        }

        //
        // Ideal way to update modified attendance data is to use REST api and 
        // make put request. Logging the modified data to console for demo
        // purpose.
        //
        console.log('updated demo_data: ' + JSON.stringify(contentToUpdate));
    }

    _convertToTimeString(date) {
        return `${this._applyPadding(date.getHours())}:${this._applyPadding(date.getMinutes())}:00`; 
    }

    _applyPadding(val) {
        let paddedVal = '00' + val;
        return paddedVal.substr(-2);
    }

    _findClassDates() {
        let result = [];
        for (let key in this.results['class_absence_totals']) {
            result.push(key);
        }
        
        result.sort((d1, d2) => {
            let date1WithTimeOffset = `${d1} 00:00:00`;
            let date2WithTimeOffset = `${d2} 00:00:00`;

            let objDate1 = new Date(date1WithTimeOffset);
            let objDate2 = new Date(date2WithTimeOffset);

            return objDate1.getTime() - objDate2.getTime();
        });

        return result;
    }

    _getSectionCourseAcrossDates(dates) {
        let sections = [];
        let courses = this.results['courses'];
        let sectionMap = this._generateSectionCourseMap(courses);

        sectionMap.forEach((courseName, sectionId) => {
            let section = {
                id: sectionId,
                name: courseName
            };

            section.attendances = this._getAttendances(dates, sectionId);
            sections.push(section);
        });

        return sections;
    }

    _getAttendances(dates, sectionId) {
        let attendances = [],
            classAbsenseTotal = this.results['class_absence_totals'];

        for (let idx=0; idx < dates.length; idx++) {
            let date = dates[idx];

            let section = classAbsenseTotal[date] && classAbsenseTotal[date][sectionId];
            if (section) {
                attendances.push({
                    date: date,
                    sectionId: sectionId,
                    absenceTotalId: section['class_absence_total_id'],
                    presentStudents: parseInt(section['present_students']),
                    enrolledStudents: parseInt(section['enrolled_students']),
                    schedule: this._getSchedule(date, sectionId)
                })
            } else {
                attendances.push({});
            }
        }

        return attendances;
    }

    _getSchedule(date, sectionId) {
        let objSchedules = this.results['schedules'];
        let result;

        let schedules = objSchedules[date];
        for (let idx=0; idx < schedules.length; idx++) {
            let schedule = schedules[idx];

            if (sectionId === schedule['section_period_id']) {
                result = {
                    startTime: schedule['start_time'],
                    endTime: schedule['end_time']
                }
                break;
            }
        }

        return result || {};
    }

    _generateSectionCourseMap(courses) {
        let result = new Map();
        for (let idx=0; idx < courses.length; idx++) {
            let course = courses[idx];
            if (course) {
                result.set(course['section_period_id'], course['name']);
            }
        }

        return result;
    }
}

export default AttendanceGridService;