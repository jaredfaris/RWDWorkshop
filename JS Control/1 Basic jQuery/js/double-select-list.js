(function() {
    var $control = $('#dslControlForm');
    var $leftList = $control.find('.unselected-values');
    var $rightList = $control.find('.selected-values');

    // >> move all right
    $control.find('.move-all-right').on('click', function() {
        var leftOptions = $leftList.find('option');

        $rightList.append(leftOptions);
    });

    // > move some right
    $control.find('.move-selected-right').on('click', function() {
        var leftOptions = $leftList.find('option:selected');

        $rightList.append(leftOptions);
    });

    // < move some left
    $control.find('.move-selected-left').on('click', function() {
        var rightOptions = $rightList.find('option:selected');

        $leftList.append(rightOptions);
    });

    // << move all left
    $control.find('.move-all-left').on('click', function() {
        var rightOptions = $rightList.find('option');

        $leftList.append(rightOptions);
    });


    // load the initial data
    // NOTE pretending we get back an array of key value pairs form some ajax call
    // all of this code would probably live in an ajax success callback
    var fakeResult = [
        {value: 1, name: "Value 1", selected: false},
        {value: 2, name: "Value 3", selected: false},
        {value: 3, name: "Value 2", selected: false},
        {value: 4, name: "Value 4", selected: true},
        {value: 5, name: "Value 5", selected: true},
        {value: 6, name: "Value 6", selected: true}
    ];
    // iterate through the list and assign each item to the right <select>
    fakeResult.forEach(function(item, index, array) {
        var newOption = $("<option></option>")
            .prop('value', item.value)
            .text(item.name)
        if(item.selected) {
            $rightList.append(newOption);
        } else {
            $leftList.append(newOption);
        }
    });

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
        })

        console.log(data);
    })
})();
