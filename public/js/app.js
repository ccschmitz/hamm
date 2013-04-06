jQuery(function($) {

	var transactions = $.getJSON('js/fixtures/transactions.json', function(data) {
		var items = [],
		    $transactions = $('.transactions');

		$.each(data, function(key, val) {
			items.push('<li><a href="#" alt="-"><img src="'+ val.avatar +'"><date>'+ moment(val.date).format('MMMM').substring(0, 3) +'<br /><span>'+ moment(val.date).format('D').substring(0, 3) +'</span></date><detail><h6 class="title">'+ val.title +'</h6><i class="description">'+ val.description +'</i></detail><h5 class="amount '+ val.debit +'">'+ accounting.formatMoney(val.amount) +'</h5><ul class="tag"><li>'+ val.category +'</li></ul><div class="clear"></div><!-- .clear --></a></li>');
		});

		$transactions.html(items);
	});

});