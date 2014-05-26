(function() {
    var $control = $('.dsl-control');
    var $leftList = $control.find('.unselected-values');
    var $rightList = $control.find('.selected-values');

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


    // TODO initial page load with fake data

    // TODO fake submit
})();
