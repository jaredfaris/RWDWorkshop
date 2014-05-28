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
    $.ajax({
        url: "/api/data",
        dataType: "json",
        success: function (data) {
            // map the data to KO
            var newItems = _.map(data, function(item) {
                return { value: item.Value, name: item.Name, selected: ko.observable(item.Selected) };
            });

            // turn on the bindings
            koViewModel.items = ko.observableArray(newItems);
            ko.applyBindings(koViewModel, document.getElementById("dslControlForm"));

        }
    });

    // send an updated JSON array when submit is hit
    $control.on('submit', function (event) {
        event.preventDefault();

        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(ko.toJS(koViewModel).items),
            url: "/api/data/Update"
        });
    });
})();
