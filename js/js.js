function goBack()
{
    history.back();
}

function doPrint()
{
    window.print();
}

function doRedirect(link)
{
    window.location.href = link;
    return false;
}

function checkResponseVal(item)
{
	var status = item !== null && item !== undefined && item !== '' 
                    ? true 
                    : false;
	return status;
}

function changeFilterForm(id)
{
    $('#main .search .form .tabs a').each(function(n, element) {
        if ($(element).hasClass('active')) {
            $(element).removeClass('active').addClass('disabled');
        }
    });
    $('#main .search .form .tabs #searchTab_'+id).removeClass('disabled').addClass('active');
    $('#main .search .form .content div').each(function(n, element) {
        if ( checkResponseVal($(element).attr('id')) ) {
            if (!$(element).attr('id').search("searchForm_")) {
                var blockId = $(element).attr('id');
                $('#main .search .form .content #'+blockId).hide();
            }
        }
    });
    $('#main .search .form .content #searchForm_'+id).fadeIn("slow");
}
function setFilterValue(select_id)
{
    var cust_value = $('#'+select_id).val();
    if (cust_value !== '') {
        $('#selected_'+select_id).val(cust_value);
        $('#'+select_id).prev().html(cust_value);
    }
}
function searchFilterForm(category_id)
{
    if ($('#searchUrl_'+category_id).length) {
        var cat_url = $('#searchUrl_'+category_id).val();
        var frmEmpty = true;
        var frmParams = new Object();
        $('#searchForm_'+category_id+' select').each(function(n, element) {
            if ( checkResponseVal($(element).attr('id')) ) {
                frmParams[$(element).attr('id')] = $(element).val();
                if ($(element).val() !== '') {
                    frmEmpty = false;
                }
            }
        });
        if (!frmEmpty) {
            var request_url = url + lang + '/?action=encodeFilters&params=' + encodeURIComponent(JSON.stringify(frmParams));
            $.get(
                request_url, 
                function( response ) {
                    if ( parseInt(response.status) === 1 && checkResponseVal(response.params) ) {
                        doRedirect(cat_url+'f:'+response.params+'/');
                    }
                }, 
                'json'
            );
        } else {
            doRedirect(cat_url);
        }
    }
}
