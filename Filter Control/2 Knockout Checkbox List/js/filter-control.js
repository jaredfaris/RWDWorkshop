var departments = [
    { name: "Algebra" , id: "alg", checked: ko.observable(false)},
    { name: "Basket Weaving", id: "bio", checked: ko.observable(false) },
    { name: "Chemistry", id: "chem", checked: ko.observable(false) },
    { name: "English", id: "eng", checked: ko.observable(false) },
    { name: "Foreign Language", id: "flang", checked: ko.observable(false) },
    { name: "Physics", id: "phys", checked: ko.observable(false) }
];

var viewModel = {
    departments: ko.observableArray(departments)
};

ko.applyBindings(viewModel, $('.filter-control')[0]);