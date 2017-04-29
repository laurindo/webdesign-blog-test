'use strict';
(function () {
    
    var appModule = angular.module('app');

    function ModalService() {
        var modals = []; // array of modals on the page
        
        this.add = function(modal) {
            // add modal to array of active modals
            modals.push(modal);
        }
        
        this.remove = function(id) {
            // remove modal from array of active modals
            var modalToRemove = _.findWhere(modals, { id: id });
            modals = _.without(modals, modalToRemove);
        }

        this.open = function(obj, isEdition) {
            // open modal specified by id
            var modal = _.findWhere(modals, { id: obj.id });
            modal.open(obj, isEdition);
        }

        this.close = function(obj) {
            // close modal specified by id
            var modal = _.findWhere(modals, { id: obj.id });
            modal.close();
        }
    }

    appModule.service('ModalService', ModalService);

})();