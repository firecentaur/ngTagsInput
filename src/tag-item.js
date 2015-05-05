'use strict';

/**
 * @ngdoc directive
 * @name tiTagItem
 * @module ngTagsInput
 *
 * @description
 * Represents a tag item. Used internally by the tagsInput directive.
 */
tagsInput.directive('tiTagItem', function(tiUtil) {
    return {
        restrict: 'E',
        require: '^tagsInput',
        template: '<ng-include src="$$template"></ng-include>',
        scope: {
            data: '=',
            metaData:'=',
            metaDataTypeName:'@',
            onMetaChange:'&'
        },
        link: function(scope, element, attrs, tagsInputCtrl) {
            var tagsInput = tagsInputCtrl.registerTagItem(),
                options = tagsInput.getOptions();

            scope.$$template = options.template;
            scope.$$removeTagSymbol = options.removeTagSymbol;

            scope.$getDisplayText = function() {
                return tiUtil.safeToString(scope.data[options.displayProperty]);
            };
            scope.$getSelectedMetaDataType = function() {
                return tiUtil.safeToString(scope.data[options.metaDataTypeName]);
            };
            scope.$getMetaDataTypeName = function() {
                return options.metaDataTypeName;
            };
            scope.$removeTag = function() {
                tagsInput.removeTag(scope.$index);
            };
            scope.$addMeta= function(meta) {
                tagsInput.addMeta(scope.$index,meta);
            };

            scope.$watch('$parent.$index', function(value) {
                scope.$index = value;
            });
        }
    };
});
