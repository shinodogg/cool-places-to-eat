var client = algoliasearch('0D35MPIESS', '269bebdf2db38b7df40e31b436903866');
var helper = algoliasearchHelper(client, 'restaurants');

helper.on('result', function(content) {
    renderHits(content);
});
    
function renderHits(content) {
    $('#container').html(function() {
        return $.map(content.hits, function(hit) {
            return '<li>' + hit._highlightResult.name.value + '</li>';
        });
    });
}

$('#search-input').on('keyup', function() {
    console.log("called");
    helper.setQuery($(this).val()).search();
});