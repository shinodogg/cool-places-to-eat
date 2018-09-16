var client = algoliasearch('0D35MPIESS', '269bebdf2db38b7df40e31b436903866');
var parameters = {
    hitsPerPage: 3,
    facets: ['payment_options'],
    disjunctiveFacets: ['food_type', 'stars_int']
};
var helper = algoliasearchHelper(client, 'restaurants', parameters);

helper.on('result', function (content) {
    renderHits(content);
    renderFoodTypeFacetList(content);
    renderRatingFacetList(content);
    renderPaymentOptionsFacetList(content);
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
                case 1: /** console.log("PERMISSION_DENIED"); */ break;
                case 2: /** console.log("POSITION_UNAVAILABLE"); */ break;
                case 3: /** console.log("TIMEOUT"); */ break;
                default: /** alert(error.code); */ break;
            }
        }
    );
}

function renderHits(content) {
    var ms = "millisecond";
    if (content.processingTimeMS !== 1) {
        ms = ms + "s";
    }
    $('#stats').html(function () {
        return '<h4>' + content.nbHits + ' found results found in ' + content.processingTimeMS + ' ' + ms + '<h4>'
    });
    var ua = navigator.userAgent.toLowerCase();
    $('#search-result').html(function () {
        return $.map(content.hits, function (hit) {
            var linkUrl = hit.reserve_url;
            if (ua.indexOf('iphone') > 0 || ua.indexOf('ipod') > 0 || ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0) {
                linkUrl = hit.mobile_reserve_url;
            }
            return '<a href="' + linkUrl + '" target="_blank" rel="noopener">'
                + '<table><tbody>'
                + '<tr><td rowspan="3"><img src="' + hit.image_url + '" width="100px" /></td><td>' + hit._highlightResult.name.value + '</td></tr>'
                + '<tr><td>' + hit.stars_count + ' ' + getRatingStars(hit.stars_int) + ' (' + hit.reviews_count + ' reviews)' + '</td></tr>'
                + '<tr><td>' + hit._highlightResult.food_type.value + ' | ' + hit._highlightResult.area.value + ' | ' + hit.price_range + '</td></tr>'
                + '</tbody></table>'
                + '</a>'
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

function renderFoodTypeFacetList(content) {
    $('#food-type-facet-list').html(function () {
        var i = 0;
        return $.map(content.getFacetValues('food_type'), function (facet) {
            i++;
            if (i > 6) {
                return false
            }
            var checkbox = getCheckbox(facet);
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
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
        return $.map(stars, function (facet) {
            var checkbox = getCheckbox(facet);
            if (facet.isRefined) checkbox.attr('checked', 'checked');
            var stars = getRatingStars(facet.name);
            var label = $('<label>').html(stars + ' (' + facet.count + ')').attr('for', 'fl-' + facet.name);
            return $('<li>').append(checkbox).append(label);
        });
    });
}

function renderPaymentOptionsFacetList(content) {
    $('#payment-options-facet-list').html(function () {
        var paymentOptions = content.getFacetValues('payment_options');
        paymentOptions.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
        return $.map(paymentOptions, function (facet) {
            var checkbox = getCheckbox(facet);
            if (facet.isRefined) checkbox.attr('checked', 'checked');
            var label = $('<label>').html(facet.name + ' (' + facet.count + ')').attr('for', 'fl-' + facet.name);
            return $('<li>').append(checkbox).append(label);
        });
    });
}

function getCheckbox(facet) {
    return $('<input type=checkbox>')
        .data('facet', facet.name)
        .attr('id', 'fl-' + facet.name);
}

function getRatingStars(num) {
    var yellowStar = '<img src="graphics/stars-plain.png" width="15px" height="15px" />';
    var grayStar = '<img src="graphics/star-empty.png" width="15px" height="15px" />';
    var returnStars = "";
    if (num == 0) {
        for (i = 0; i < 5; i++) { returnStars += grayStar; }
        return returnStars
    } else if (num == 1) {
        for (i = 0; i < 4; i++) { returnStars += grayStar; }
        return yellowStar + returnStars
    } else if (num == 2) {
        for (i = 0; i < 2; i++) { returnStars += yellowStar; }
        for (i = 0; i < 3; i++) { returnStars += grayStar; }
        return returnStars
    } else if (num == 3) {
        for (i = 0; i < 3; i++) { returnStars += yellowStar; }
        for (i = 0; i < 2; i++) { returnStars += grayStar; }
        return returnStars
    } else if (num == 4) {
        for (i = 0; i < 4; i++) { returnStars += yellowStar; }
        return returnStars + grayStar
    } else if (num == 5) {
        for (i = 0; i < 5; i++) { returnStars += yellowStar; }
        return returnStars
    } else {
        return returnStars
    }
}

$('#search-input').on('keyup', function () {
    helper.setQuery($(this).val()).search();
});

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