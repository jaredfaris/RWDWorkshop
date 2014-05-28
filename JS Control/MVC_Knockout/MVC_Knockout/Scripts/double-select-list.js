(function() {
    var $control = $('#dslControlForm');
    var $leftSelect = $control.find('.unselected-values');
    var $rightSelect = $control.find('.selected-values');
    var koViewModel = {
    };

    // >> move all right
    $control.find('.move-all-right').on('click', function() {
        _.each(koViewModel.items(), function(item) { item.selected(true); });
    });

    // > move some right
    $control.find('.move-selected-right').on('click', function() {
        var idsToUpdate = _.pluck($leftSelect.find('option:selected'), "value");
        _.each(idsToUpdate, function(id){
            _.find(koViewModel.items(), function(item){ return item.value == id*1 }).selected(true);
        });
    });

    // < move some left
    $control.find('.move-selected-left').on('click', function() {
        var idsToUpdate = _.pluck($rightSelect.find('option:selected'), "value");
        _.each(idsToUpdate, function(id){
            _.find(koViewModel.items(), function(item){ return item.value == id*1 }).selected(false);
        });
    });

    // << move all left
    $control.find('.move-all-left').on('click', function() {
        _.each(koViewModel.items(), function(item) { item.selected(false); });
    });

    // load the initial data
    // NOTE pretending we get back an array of key value pairs form some ajax call
    // all of this code would probably live in an ajax success callback
    var newItems = [
        {value: 1, name: "Value 1", selected: ko.observable(false)},
        {value: 2, name: "Value 2", selected: ko.observable(false)},
        {value: 3, name: "Value 3", selected: ko.observable(false)},
        {value: 4, name: "Value 4", selected: ko.observable(true)},
        {value: 5, name: "Value 5", selected: ko.observable(true)},
        {value: 6, name: "Value 6", selected: ko.observable(true)}
    ];
    koViewModel.items = ko.observableArray(newItems);

    ko.applyBindings(koViewModel, document.getElementById("dslControlForm"));

    // send an updated JSON array when submit is hit
    // NOTE pretending to do this. This would probably be an ajax call
    $control.on('submit', function(event) {
        event.preventDefault();

        console.log(ko.toJS(koViewModel).items);
    })
})();
