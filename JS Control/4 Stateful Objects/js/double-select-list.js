(function() {
    var $control = $('#dslControlForm');
    var $leftSelect = $control.find('.unselected-values');
    var $rightSelect = $control.find('.selected-values');

    var optionsSource = $('#dslOptionsTemplate').html();
    var optionsTemplate = Handlebars.compile(optionsSource);

    // arrays to keep javascript objects in
    // we'll update these and render the view rather than moving DOM elements
    var allItems = [];

    // >> move all right
    $control.find('.move-all-right').on('click', function() {
        _.each(allItems, function(item) { item.selected = true; });
        renderSelects();
    });

    // > move some right
    $control.find('.move-selected-right').on('click', function() {
        var idsToUpdate = _.pluck($leftSelect.find('option:selected'), "value");
        _.each(idsToUpdate, function(id){
            _.find(allItems, function(item){ return item.value == id*1 }).selected = true;
        });
        renderSelects();
    });

    // < move some left
    $control.find('.move-selected-left').on('click', function() {
        var idsToUpdate = _.pluck($rightSelect.find('option:selected'), "value");
        _.each(idsToUpdate, function(id){
            _.find(allItems, function(item){ return item.value == id*1 }).selected = false;
        });
        renderSelects();
    });

    // << move all left
    $control.find('.move-all-left').on('click', function() {
        _.each(allItems, function(item) { item.selected = false; });
        renderSelects();
    });

    var renderSelects = function() {
        // we'll sort allItems just to be sure nothing funky happens
        var sortedItems = _.sortBy(allItems, "value");

        $leftSelect.html(optionsTemplate(_.filter(sortedItems, function(item){return !item.selected; })));
        $rightSelect.html(optionsTemplate(_.filter(sortedItems, function(item){return item.selected; })));
    };

    // load the initial data
    // NOTE pretending we get back an array of key value pairs form some ajax call
    // all of this code would probably live in an ajax success callback
    allItems = [
        {value: 1, name: "Value 1", selected: false},
        {value: 2, name: "Value 2", selected: false},
        {value: 3, name: "Value 3", selected: false},
        {value: 4, name: "Value 4", selected: true},
        {value: 5, name: "Value 5", selected: true},
        {value: 6, name: "Value 6", selected: true}
    ];
    renderSelects();

    // send an updated JSON array when submit is hit
    // NOTE pretending to do this. This would probably be an ajax call
    $control.on('submit', function(event) {
        event.preventDefault();

        console.log(allItems);
    })
})();
