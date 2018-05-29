import './editableField.less';

class EditableFieldController {
    $onInit() {
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