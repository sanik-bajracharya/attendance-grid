import angular from 'angular';
import { editableFieldComponent } from './editableField';

export default angular
  .module('common', [])
  .component('editableField', editableFieldComponent)
  .name;

