(function() {
    var $control = $('#dslControlForm');
    var $leftList = $control.find('.unselected-values');
    var $rightList = $control.find('.selected-values');

    var optionsSource = $('#dslOptionsTemplate').html();
    var optionsTemplate = Handlebars.compile(optionsSource);

    // >> move all right
    $control.find('.move-all-right').on('click', function() {
        var leftOptions = $leftList.find('option');

        $rightList.append(leftOptions);
        sortLists();
    });

    // > move some right
    $control.find('.move-selected-right').on('click', function() {
        var leftOptions = $leftList.find('option:selected');

        $rightList.append(leftOptions);
        sortLists();
    });

    // < move some left
    $control.find('.move-selected-left').on('click', function() {
        var rightOptions = $rightList.find('option:selected');

        $leftList.append(rightOptions);
        sortLists();
    });

    // << move all left
    $control.find('.move-all-left').on('click', function() {
        var rightOptions = $rightList.find('option');

        $leftList.append(rightOptions);
        sortLists();
    });

    // sort all the lists
    var sortLists = function() {
        var sortFunction = function(a, b) {
            a = a.value;
            b = b.value;

            return a-b;
        };

        var sortedLeftList = $leftList.find('option').sort(sortFunction);
        var sortedRightList = $rightList.find('option').sort(sortFunction);
        $leftList.html(sortedLeftList);
        $rightList.html(sortedRightList);
    };


    // load the initial data
    // NOTE pretending we get back an array of key value pairs form some ajax call
    // all of this code would probably live in an ajax success callback
    var fakeResult = [
        {value: 1, name: "Value 1", selected: false},
        {value: 2, name: "Value 2", selected: false},
        {value: 3, name: "Value 3", selected: false},
        {value: 4, name: "Value 4", selected: true},
        {value: 5, name: "Value 5", selected: true},
        {value: 6, name: "Value 6", selected: true}
    ];
    var leftOptions = _.select(fakeResult, function(item){ return item.selected });
    var rightOptions = _.reject(fakeResult, function(item){ return item.selected });
    $leftList.append(optionsTemplate(leftOptions));
    $rightList.append(optionsTemplate(rightOptions));

    // send an updated JSON array when submit is hit
    // NOTE pretending to do this. This would probably be an ajax call
    $control.on('submit', function(event) {
        event.preventDefault();

        var data = [];

        $leftList.find('option').each(function(index, element) {
            data.push({value: element.value, name: element.text, selected: false})
        });
        $rightList.find('option').each(function(index, element) {
            data.push({value: element.value, name: element.text, selected: true})
        });

        console.log(data);
    })
})();
