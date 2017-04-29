"use strict";

(function() {

    var appModule = angular.module('app');

    function CommentsDirective ($translate, ModalService) {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                position: '='
            },
            templateUrl: 'app/directives/comments/comments.html',
            link: function($scope, $element, $attr) {
                $scope.like = function(currentComment) {
                    currentComment.likes = currentComment.likes + 1;
                    if (currentComment.likes > 10) {
                        currentComment.likes = 10;
                    }
                };
                
                $scope.dislike = function(currentComment) {
                    currentComment.likes = currentComment.likes - 1;
                    if (currentComment.likes < 0) {
                        currentComment.likes = 0;
                    }
                };

                $scope.openModal = function(comment) {
                    ModalService.open({
                        id: 'modal-default',
                        data: comment
                    });
                }

                $scope.closeModal = function(id) {
                    ModalService.close({
                        id: 'modal-default',
                        data: comment
                    });
                }

                $scope.editComment = function(comment) {
                    var isEdition = true;
                    ModalService.open({
                        id: 'modal-default',
                        data: comment
                    }, isEdition)
                };

                $scope.deleteComment = function(comment, $index) {
                    $scope.data.comments.splice($index, 1);
                };
            }
        }
    }

    CommentsDirective.$inject = ['$translate', 'ModalService'];

    appModule.directive('comments', CommentsDirective);

}());