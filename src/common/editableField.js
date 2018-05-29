import './editableField.less';

class EditableFieldController {
    constructor() {
        //this.isEditMode = false;
    }

    onModeChange() {
        if (this.editMode) {
            this.onUpdate({value: this.fieldValue});
            //ctrl.fieldValueCopy = ctrl.fieldValue;
          }
          this.isEditMode = !this.isEditMode;
    }

    $onInit() {
        // Make a copy of the initial value to be able to reset it later
        this.fieldValueCopy = this.fieldValue;
        
        // Set a default fieldType
        if (!this.fieldType) {
            this.fieldType = 'text';
        }
    }



}

export const editableFieldComponent = {
    template: require('./editableField.html'),
    controller: EditableFieldController,
    bindings: {
        fieldType: '@?',
        fieldValue: '=',
        min: '@?',
        max: '<?',
        isEditMode: '<',
        onUpdate: '&',
        isRequired: '<'
    }
}