

import angular from 'angular';
import { attendanceGridComponent } from './attendanceGrid';
import { attendanceTotalComponent } from './attendanceTotal';
import AttendanceGridService from './attendanceGridService';

export default angular
  .module('attendanceGrid', [])
  .service('attendanceGridService', AttendanceGridService)
  .component('attendanceTotal', attendanceTotalComponent)
  .component('attendanceGrid', attendanceGridComponent)
  .name;

