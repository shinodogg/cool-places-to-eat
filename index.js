var client = algoliasearch('0D35MPIESS', '269bebdf2db38b7df40e31b436903866');
var helper = algoliasearchHelper(client, 'restaurants', {
    hitsPerPage: 3, facets: ['food_type', 'stars_int', 'payment_options']
});

helper.on('result', function(content) {
    console.log(content)
    renderFoodTypeFacetList(content);
    renderRatingFacetList(content);
    renderPaymentOptionsFacetList(content);
    renderHits(content);
});
    
function renderHits(content) {
    $('#stats').html(function() {
        return content.nbHits + ' found results found in ' + content.processingTimeMS + ' millisecond(s)'
    });
    $('#container').html(function() {
        return $.map(content.hits, function(hit) {
            return '<li>' + hit._highlightResult.name.value + '</li>';
        });
    });
}

$('#food-type-facet-list').on('click', 'input[type=checkbox]', function(e) {
    var facetValue = $(this).data('facet');  
    helper.toggleRefinement('food_type', facetValue).search();
});

$('#rating-facet-list').on('click', 'input[type=checkbox]', function(e) {
    var facetValue = $(this).data('facet');  
    helper.toggleRefinement('stars_int', facetValue).search();
});

$('#payment-options-facet-list').on('click', 'input[type=checkbox]', function(e) {
    var facetValue = $(this).data('facet');  
    helper.toggleRefinement('payment_options', facetValue).search();
});

function renderFoodTypeFacetList(content) {
    $('#food-type-facet-list').html(function() {
        var i = 0;
        return $.map(content.getFacetValues('food_type'), function(facet) {
            i++;
            if (i > 6) {
                return false
            }
            var checkbox = $('<input type=checkbox>')
            .data('facet', facet.name)
            .attr('id', 'fl-' + facet.name);
            if(facet.isRefined) checkbox.attr('checked', 'checked');
                var label = $('<label>').html(facet.name + ' (' + facet.count + ')').attr('for', 'fl-' + facet.name);
                return $('<li>').append(checkbox).append(label);
        });
    });
}

function renderRatingFacetList(content) {
    $('#rating-facet-list').html(function() {
        return $.map(content.getFacetValues('stars_int'), function(facet) {
            var checkbox = $('<input type=checkbox>')
            .data('facet', facet.name)
            .attr('id', 'fl-' + facet.name);
            if(facet.isRefined) checkbox.attr('checked', 'checked');
                var stas;
                if (facet.name == 0) {
                    stars = '<img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" />'
                } else if (facet.name == 1) {
                    stars = '<img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" />'
                } else if (facet.name == 2) {
                    stars = '<img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" />'
                } else if (facet.name == 3) {
                    stars = '<img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" />'
                } else if (facet.name == 4) {
                    stars = '<img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" />'
                } else if (facet.name == 5) {
                    stars = '<img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" />'
                }
                var label = $('<label>').html(stars + ' (' + facet.count + ')').attr('for', 'fl-' + facet.name);
                return $('<li>').append(checkbox).append(label);
        });
    }); 
}

function renderPaymentOptionsFacetList(content) {
    $('#payment-options-facet-list').html(function() {
        return $.map(content.getFacetValues('payment_options'), function(facet) {
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

$('#show-more').click(function() {
    var value = $(this).val();
    if(value === 'Show More') {
        helper.searchOnce({hitsPerPage: 6}, function(error, content, state) {
            renderHits(content);
        });
        $('#show-more').html(function() {        
            $(this).val('Show Less');
        });
    } else {
        helper.searchOnce({hitsPerPage: 3}, function(error, content, state) {
            renderHits(content);
        });
        $('#show-more').html(function() {        
            $(this).val('Show More');
        });
    }
});

helper.search();