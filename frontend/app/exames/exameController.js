/**
 * Hauslabor - Frontend
 * 
 * Module Exame Controller responsável pelo controle das interações da tela de exames
 * 
 */
(function () {
    angular.module('hauslabor').controller('ExaminationCtrl', [
        '$http',
        '$location',
        'msgs',
        'tabs',
        'auth',
        ExaminationController
    ])
    function ExaminationController($http, $location, msgs, tabs, auth) {
        const vm = this;
        const url = 'http://localhost:3003/api/';
        const user = auth.getUser()

        vm.refresh = function () {
            const page = parseInt($location.search().page) || 1
            //$http.get(`${url}/person/?email=${user.email}?skip=${(page - 1) * 10}&limit=10/:id=${user._id}`).then(function(response) {
            $http.get(`${url}examinations/?email=${user.email}`).then(function (response) {
                vm.exam = {};
                vm.notification = {};
                vm.person_id = response.data._id;
                vm.person_type = response.data.type;
                vm.patient_id = response.data.patient._id;
                vm.examsDB = response.data.patient.examinations;
                //console.log(vm.examsDB)
                //console.log(vm.person_id)
                //console.log(vm.person_type)
            });
            $http.get(`${url}personSummaryCountExaminations/?email=${user.email}`).then(function (response) {
                vm.examPages = Math.ceil(response.data.count / 10);
                tabs.show(vm, { tabList: true, tabCreate: true });
            });
        }

        vm.create = function () {
            if(vm.notification.description){
                vm.notification.type = vm.person_type;
                vm.notification.status = true;
                vm.notification.name = user.name;
                vm.exam.notification = vm.notification;
            }
            vm.exam.status = true;
            vm.exam.person_id = vm.person_id;
            vm.exam.patient_id = vm.patient_id;

            const updateUrl = `${url}personAddExam/${vm.person_id}?email=${user.email}`;
            $http.put(updateUrl, vm.exam).then(function (response) {
                vm.refresh();
                msgs.addSuccess('Operação realizada com sucesso!!');
            }).catch(function (response) {
                msgs.addError(response.data.errors);
            });
        }

        vm.update = function () {
            var notes = [];
            if(vm.notification.description){
                vm.notification.type = vm.person_type;
                vm.notification.status = true;
                vm.notification.name = user.name;
                notes = vm.exam.notification;
                notes.push(vm.notification);
                vm.exam.notification = notes;
            }
            vm.exam.status = true;
            vm.exam.person_id = vm.person_id;

            const updateUrl = `${url}personUpdateExam/${vm.person_id}?email=${user.email}`;
            $http.put(updateUrl, vm.exam).then(function (response) {
                vm.refresh();
                msgs.addSuccess('Operação realizada com sucesso!');
            }).catch(function (response) {
                msgs.addError(response.data.errors);
            })
        }

        vm.delete = function () {
            var notes = [];
            if(vm.notification.description){
                vm.notification.type = vm.person_type;
                vm.notification.status = true;
                vm.notification.name = user.name;
                notes = vm.exam.notification;
                notes.push(vm.notification);
                vm.exam.notification = notes;
            }
            vm.exam.status = false;
            vm.exam.person_id = vm.person_id;

            const updateUrl = `${url}personUpdateExam/${vm.person_id}?email=${user.email}`;
            $http.put(updateUrl, vm.exam).then(function (response) {
                vm.refresh();
                msgs.addSuccess('Operação realizada com sucesso!');
            }).catch(function (response) {
                msgs.addError(response.data.errors);
            })
        }
        
        //Controle das abas da tela
        vm.showTabUpdate = function (exam) {
            vm.exam = exam;
            tabs.show(vm, { tabUpdate: true });
        }

        vm.showTabDelete = function (exam) {
            vm.exam = exam;
            tabs.show(vm, { tabDelete: true });
        }

        vm.examType = [{ label: 'Manual', value: 'MANUAL' }]
        vm.isManualInput = () => {
            if (vm.exam.type == 'MANUAL') {
                vm.updateExam = true;
            } else {
                vm.updateExam = false;
            }
        }

        vm.refresh();
    }
})();