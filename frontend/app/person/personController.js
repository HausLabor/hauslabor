/**
 * Hauslabor - Frontend
 * 
 * Module Controller responsável pelo tratamento de todas as requisições de Pessoa.
 * 
 */
(function () {
    angular.module('hauslabor').controller('PersonCtrl', [
        '$http',
        '$location',
        '$filter',
        'msgs',
        'tabs',
        'auth',
        'consts',
        PersonController
    ])
    
    function PersonController($http, $location, $filter, msgs, tabs, auth, consts) {
        const vm = this; //Recebe o scope corrente
        const url = `${consts.apiUrl}/person`;
        const user = auth.getUser(); //Recebe o usuário corrente

        vm.refresh = function () {
            const page = parseInt($location.search().page) || 1
            
            $http.get(`${url}?email=${user.email}`).then(function (response) {
                //Create and set the objetcts Patient and Person
                vm.patient = { addictions: [{status: true}], drugs: [{status: true}], illnesses: [{status: true}], physicalactivities: [{status: true}], surgeries: [{status: true}] };
                vm.person = { contacts: [{status: true}], addresses: [{status: true}], patient: {}, type: '', name: user.name, type: user.access };
                vm.persons = response.data;
                vm.isSpecialist();
                vm.persons.dtnasc = $filter('date')(vm.persons.dtnasc, 'dd/MM/yyyy');
                //console.log(vm.persons);
                //console.log(user);
                vm.isCompleteUser();
            });
            $http.get('http://localhost:3003/api/userSummary').then(function (response) {
                vm.pages = Math.ceil(response.data.value / 10);
            });
        }

        vm.create = function () {
            vm.person.status = true;
            
            if(vm.person.type == 'PACIENTE'){
                vm.person.patient = vm.patient;
                vm.person.patient.status = true;
            }
            //console.log(vm.person);

            $http.post(`${url}?email=${user.email}`, vm.person).then(function (response) {
                auth.completeUser();
                user.completeUser = true;
                vm.completeUser = true;
                vm.refresh();
                msgs.addSuccess('Operação realizada com sucesso!!');
            }).catch(function (response) {
                msgs.addError(response.data.errors);
            });
        }

        vm.update = function () {
            vm.person.status = true;
            
            if(vm.person.type == 'PACIENTE'){
                vm.person.patient = vm.patient;
                vm.person.patient.status = true;
            }

            const updateUrl = `${url}/${vm.persons._id}?email=${user.email}`;
            $http.put(updateUrl, vm.person).then(function (response) {
                vm.refresh();
                msgs.addSuccess('Operação realizada com sucesso!');
            }).catch(function (response) {
                msgs.addError(response.data.errors);
            })
        }

        vm.delete = function () {
            vm.person.status = false;

            if(vm.person.type == 'PACIENTE'){
                vm.person.patient = vm.patient;
                vm.person.patient.status = true;
            }

            const deletePersonUrl = `${url}/${vm.persons._id}?email=${user.email}`;
            $http.put(deletePersonUrl, vm.person).then(function (response) {
                msgs.addSuccess('Operação realizada com sucesso!');
            }).catch(function (response) {
                msgs.addError(response.data.errors);
            });
            const deleteUserUrl = `${consts.apiUrl}/users/${user._id}`;
            $http.put(deleteUserUrl, { 'status': false }).then(function (response) {
                msgs.addSuccess('Operação realizada com sucesso!');
            }).catch(function (response) {
                msgs.addError(response.data.errors);
            });

            auth.logout(() => $location.path('/'));
        }

        //Regras para mostrar abas do person.html
        vm.showTabUpdate = function (person) {
            vm.person = person;
            vm.patient = person.patient;
            tabs.show(vm, { tabUpdate: true });
        }

        vm.showTabDelete = function (person) {
            vm.person = person;
            vm.patient = person.patient;
            tabs.show(vm, { tabDelete: true });
        }
        vm.showTabDetail = function (person) {
            vm.person = person;
            vm.patient = person.patient;
            tabs.show(vm, { tabDetail: true });
        }
        vm.showTabCreate = function () {
            tabs.show(vm, { tabCreate: true });
        }

        //Verificar se o Usuário está com o cadastro finalizado
        vm.isCompleteUser = () => {
            if(user.completeUser){
                vm.showTabDetail(vm.persons);
            } else {
                vm.showTabCreate();
            }
        }
        
        //Verificar se o Usuário é um Especialista
        vm.isSpecialist = () => {
            if (vm.person.type != 'ESPECIALISTA') {
                vm.specialistDocs = false;
                vm.patientDocs = true;
            } else {
                vm.specialistDocs = true;
                vm.patientDocs = false;
            }
        }

        //Botões das Listas
        vm.addContact = function (index) {
            vm.person.contacts.splice(index + 1, 0, {status: true});
        }

        vm.cloneContact = function (index, { type, contact, status }) {
            vm.person.contacts.splice(index + 1, 0, { type, contact, status })
        }

        vm.deleteContact = function (index) {
            if (vm.person.contacts.length > 1) {
                vm.person.contacts.splice(index, 1);
            }
        }
        vm.addAddress = function (index) {
            vm.person.addresses.splice(index + 1, 0, {status: true});
        }

        vm.cloneAddress = function (index, { type, contact, status }) {
            vm.person.addresses.splice(index + 1, 0, { type, contact, status })
        }

        vm.deleteAddress = function (index) {
            if (vm.person.addresses.length > 1) {
                vm.person.addresses.splice(index, 1);
            }
        }

        vm.addIllness = function (index) {
            vm.patient.illnesses.splice(index + 1, 0, {status: true});
        }

        vm.cloneIllness = function (index, { type, description, observation, status }) {
            vm.patient.illnesses.splice(index + 1, 0, { type, description, observation, status })
        }

        vm.deleteIllness = function (index) {
            if (vm.patient.illnesses.length > 1) {
                vm.patient.illnesses.splice(index, 1);
            }
        }

        vm.addSurgery = function (index) {
            vm.patient.surgery.splice(index + 1, 0, {status: true});
        }

        vm.cloneSurgery = function (index, { type, description, observation, status }) {
            vm.patient.surgeries.splice(index + 1, 0, { type, description, observation, status })
        }

        vm.deleteSurgery = function (index) {
            if (vm.patient.surgeries.length > 1) {
                vm.patient.surgeries.splice(index, 1);
            }
        }

        vm.addAddiction = function (index) {
            vm.patient.addictions.splice(index + 1, 0, {status: true});
        }

        vm.cloneAddiction = function (index, { type, description, observation, status }) {
            vm.patient.addictions.splice(index + 1, 0, { type, description, observation, status })
        }

        vm.deleteAddiction = function (index) {
            if (vm.patient.addictions.length > 1) {
                vm.patient.addictions.splice(index, 1);
            }
        }

        vm.addDrug = function (index) {
            vm.patient.drugs.splice(index + 1, 0, {status: true});
        }

        vm.cloneDrug = function (index, { type, description, observation, othen, status }) {
            vm.patient.drugs.splice(index + 1, 0, { type, description, observation, othen, status })
        }

        vm.deleteDrug = function (index) {
            if (vm.patient.drugs.length > 1) {
                vm.patient.drugs.splice(index, 1);
            }
        }

        vm.addPhysicalActivity = function (index) {
            vm.patient.physicalactivities.splice(index + 1, 0, {status: true});
        }

        vm.clonePhysicalActivity = function (index, { type, description, observation, othen, status }) {
            vm.patient.physicalactivities.splice(index + 1, 0, { type, description, observation, othen, status })
        }

        vm.deletePhysicalActivity = function (index) {
            if (vm.patient.physicalactivities.length > 1) {
                vm.patient.physicalactivities.splice(index, 1);
            }
        }

        vm.refresh();
    }
})();