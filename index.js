var client = algoliasearch('0D35MPIESS', '269bebdf2db38b7df40e31b436903866');
var helper = algoliasearchHelper(client, 'restaurants', {
    facets: ['food_type', 'stars_count', 'payment_options']
});

helper.on('result', function(content) {
    renderFacetList(content);
    renderHits(content);
});
    
function renderHits(content) {
    $('#container').html(function() {
        return $.map(content.hits, function(hit) {
            return '<li>' + hit._highlightResult.name.value + '</li>';
        });
    });
}

$('#facet-list').on('click', 'input[type=checkbox]', function(e) {
    var facetValue = $(this).data('facet');  
    helper.toggleRefinement('food_type', facetValue)
.search();
});
  
function renderFacetList(content) {

    $('#facet-list').html(function() {
        return $.map(content.getFacetValues('food_type'), function(facet) {
            var checkbox = $('<input type=checkbox>')
            .data('facet', facet.name)
            .attr('id', 'fl-' + facet.name);
            if(facet.isRefined) checkbox.attr('checked', 'checked');
                var label = $('<label>').html(facet.name + ' (' + facet.count + ')').attr('for', 'fl-' + facet.name);
                return $('<li>').append(checkbox).append(label);
        });
    });
}

$('#search-input').on('keyup', function() {
    helper.setQuery($(this).val()).search();
});

helper.search();