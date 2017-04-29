"use strict";

(function() {

    var appModule = angular.module('app');

    function ModalDirective ($translate, ModalService) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/directives/modal/modal.html',
            link: function($scope, $element, $attr) {

                $scope.commentData = {
                    name: '',
                    description: ''
                };

                $scope.save = function() {
                    $scope.commentData.date = new Date().toISOString();
                    $scope.currentComment.data.comments.push($scope.commentData);
                    $scope.closeModal();
                };

                $scope.update = function() {
                    $scope.commentData.date = new Date().toISOString();
                    $scope.currentComment = $scope.commentData;
                    $scope.closeModal();
                };

                // ensure id attribute exists
                if (!$attr.id) {
                    console.error('modal must have an id');
                    return;
                }

                // move element to bottom of page (just before </body>) so it can be displayed above everything else
                //$element.appendTo('body');
                $element.addClass('hide-modal');

                // add self (this modal instance) to the modal service so it's accessible from controllers
                var modal = {
                    id: $attr.id,
                    open: Open,
                    close: Close
                };
                ModalService.add(modal);
            
                // remove self from modal service when directive is destroyed
                $scope.$on('$destroy', function() {
                    ModalService.remove(attrs.id);
                    $element.remove();
                });   

                $scope.closeModal = function() {
                    Close();
                };         

                // open modal
                function Open(obj, isEdition) {
                    $scope.isEdition = isEdition;
                    $scope.currentComment = obj;
                    if (isEdition) {
                        $scope.commentData = obj.data;
                    }
                    $element.removeClass('hide-modal').addClass('show-modal');
                }

                // close modal
                function Close() {
                    $scope.currentComment = null;
                    $scope.commentData = {};
                    $scope.isEdition = false;
                    $element.removeClass('show-modal').addClass('hide-modal');
                }    
            }
        }
    }

    ModalDirective.$inject = ['$translate', 'ModalService'];

    appModule.directive('modal', ModalDirective);

}());