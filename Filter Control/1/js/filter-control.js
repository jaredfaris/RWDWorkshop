$('.filter-control input[type=checkbox]').click(function(event) {

    $filterArea = $('#filterText');

    if (this.checked) {
        // add the word
        $filterArea.text($filterArea.text() + " " + this.value);
    } else {
        // remove the word
    }
});