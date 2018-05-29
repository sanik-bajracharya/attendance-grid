import angular from 'angular';

import 'angular/angular-csp.css';
import './index.less';

import attendanceGridModule from './attendanceGrid/attendanceGridModule';
import commonModule from './common/commonModule';

angular.module('main', [
  commonModule,
  attendanceGridModule,
]);

angular.bootstrap(document.documentElement, ['main']);

