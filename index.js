var client = algoliasearch('0D35MPIESS', '269bebdf2db38b7df40e31b436903866');
var parameters = {
    hitsPerPage: 3,
    facets: ['payment_options'],
    disjunctiveFacets: ['food_type', 'stars_int']
};
var helper = algoliasearchHelper(client, 'restaurants', parameters);

helper.on('result', function (content) {
    console.log(content);
    renderFoodTypeFacetList(content);
    renderRatingFacetList(content);
    renderPaymentOptionsFacetList(content);
    renderHits(content);
});

helper.search();

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            latLng = `${position.coords.latitude}, ${position.coords.longitude}`;
            helper.setQueryParameter('aroundLatLng', latLng);
            helper.search();
        },
        function (error) {
            switch (error.code) {
                case 1:
                    console.log("PERMISSION_DENIED");
                    break;
                case 2:
                    console.log("POSITION_UNAVAILABLE");
                    break;
                case 3:
                    console.log("TIMEOUT");
                    break;
                default:
                    alert(error.code);
                    break;
            }
        }
    );
}

function renderHits(content) {
    $('#stats').html(function () {
        return '<h5>' + content.nbHits + ' found results found in ' + content.processingTimeMS + ' millisecond(s)' + '<h5>'
    });
    $('#search-result').html(function () {
        return $.map(content.hits, function (hit) {
            return '<table><tr><td rowspan="3"><img src="'
                + hit.image_url + '" width="125px" /></td><td>'
                + hit._highlightResult.name.value + '</td></tr><tr><td>'
                + hit.stars_count + ' ' + getRatingStars(hit.stars_int) + ' (' + hit.reviews_count + ' reviews)' + '</td></tr><tr><td>'
                + hit._highlightResult.food_type.value + ' | ' + hit._highlightResult.area.value + ' | ' + hit.price_range + '</td></tr></table>'
        });
    });
    $('#show-more-or-less').html(function () {
        if (content.nbHits <= 3) {
            return ''
        }
        if (Object.keys(content.hits).length == 3) {
            return '<input id="show-more" type="button" value="Show More" />'
        } else if (Object.keys(content.hits).length <= 6) {
            return '<input id="show-more" type="button" value="Show Less" />'
        } else {
            return ''
        }
    });
}

$('#food-type-facet-list').on('click', 'input[type=checkbox]', function () {
    var facetValue = $(this).data('facet');
    helper.toggleRefinement('food_type', facetValue).search();
});

$('#rating-facet-list').on('click', 'input[type=checkbox]', function () {
    var facetValue = $(this).data('facet');
    helper.toggleRefinement('stars_int', facetValue).search();
});

$('#payment-options-facet-list').on('click', 'input[type=checkbox]', function () {
    var facetValue = $(this).data('facet');
    helper.toggleRefinement('payment_options', facetValue).search();
});

function renderFoodTypeFacetList(content) {
    $('#food-type-facet-list').html(function () {
        var i = 0;
        return $.map(content.getFacetValues('food_type'), function (facet) {
            i++;
            if (i > 6) {
                return false
            }
            var checkbox = $('<input type=checkbox>')
                .data('facet', facet.name)
                .attr('id', 'fl-' + facet.name);
            if (facet.isRefined) checkbox.attr('checked', 'checked');
            var label = $('<label>').html(facet.name + ' (' + facet.count + ')').attr('for', 'fl-' + facet.name);
            return $('<li>').append(checkbox).append(label);
        });
    });
}

function renderRatingFacetList(content) {
    $('#rating-facet-list').html(function () {
        var stars = content.getFacetValues('stars_int');
        stars.sort(function (a, b) {
            var nameA = a.name;
            var nameB = b.name;
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        });
        return $.map(stars, function (facet) {
            var checkbox = $('<input type=checkbox>')
                .data('facet', facet.name)
                .attr('id', 'fl-' + facet.name);
            if (facet.isRefined) checkbox.attr('checked', 'checked');
            var stars = getRatingStars(facet.name);
            var label = $('<label>').html(stars + ' (' + facet.count + ')').attr('for', 'fl-' + facet.name);
            return $('<li>').append(checkbox).append(label);
        });
    });
}


function getRatingStars(num) {
    if (num == 0) {
        return '<img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" />'
    } else if (num == 1) {
        return '<img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" />'
    } else if (num == 2) {
        return '<img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" />'
    } else if (num == 3) {
        return '<img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" />'
    } else if (num == 4) {
        return '<img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/star-empty.png" width="15px" height="15px" />'
    } else if (num == 5) {
        return '<img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" /><img src="graphics/stars-plain.png" width="15px" height="15px" />'
    } else {
        return ''
    }
}

function renderPaymentOptionsFacetList(content) {
    $('#payment-options-facet-list').html(function () {
        var paymentOptions = content.getFacetValues('payment_options');
        paymentOptions.sort(function (a, b) {
            var nameA = a.name;
            var nameB = b.name;
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        return $.map(paymentOptions, function (facet) {
            var checkbox = $('<input type=checkbox>')
                .data('facet', facet.name)
                .attr('id', 'fl-' + facet.name);
            if (facet.isRefined) checkbox.attr('checked', 'checked');
            var label = $('<label>').html(facet.name + ' (' + facet.count + ')').attr('for', 'fl-' + facet.name);
            return $('<li>').append(checkbox).append(label);
        });
    });
}

$('#search-input').on('keyup', function () {
    helper.setQuery($(this).val()).search();
});

$(document).on('click', '#show-more', function () {
    var value = $('#show-more').val();
    if (value === 'Show More') {
        helper.setQueryParameter('hitsPerPage', 6);
        helper.search();
    } else {
        helper.setQueryParameter('hitsPerPage', 3);
        helper.search();
    }
});

