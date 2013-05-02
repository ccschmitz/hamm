jQuery(function($) {

  var $transactionsContainer = $('#transactions'),
      $sidebar = $('#sidebar');

  // setup the transactions when the page loads
  $.getJSON('js/fixtures/transactions.json', function(data) {
    var items = [];

    $.each(data, function(key, val) {
      var transactionDescription = val.description.substring(0, 26) + '...';
          $transaction = $('<li class="transaction"><a href="#" alt="-"><img src="'+ val.avatar +'"><date>'+ moment(val.date).format('MMMM').substring(0, 3) +'<br /><span>'+ moment(val.date).format('D').substring(0, 3) +'</span></date><detail><h6 class="title">'+ val.title +'</h6><i class="description">'+ transactionDescription +'</i></detail><h5 class="amount '+ val.debit +'">'+ accounting.formatMoney(val.amount) +'</h5><ul class="tag"><li>'+ val.category +'</li></ul><div class="clear"></div><!-- .clear --></a></li>');

      $transaction.find('a').data(val);

      items.push($transaction);
    });

    $transactionsContainer.html(items);

    // view individual transaction details
    $transactionsContainer.find('li > a').on('click', function(e) {
      inspectTransaction($(this));
      return false;
    });
  });

  // Search
  $('#search-term').keyup(function(e) {
    var $this = $(this),
        $transactions = $('#transactions').find('.transaction');

    if ($this.val() != '') {
      $transactions.each(function() {
        var $transaction = $(this),
            expression = new RegExp($this.val(), 'i');

        if ($transaction.children().text().match(expression)) {
          $transaction.slideDown();
        } else {
          $transaction.slideUp();
        }
      });
    } else {
      $transactions.slideDown();
    }
  });

  function inspectTransaction(transaction) {
    highlightTransactions(transaction);

    // setup the transaction information in the sidebar
    var $transactionHtml = '<h3>'+ transaction.data('title') +'</h3>';
        $transactionHtml += '<date>'+ transaction.data('date') +'</date>';
        $transactionHtml += '<p>'+ transaction.data('description') +'</p>';
        $transactionHtml += '<ul class="tag"><li>'+ transaction.data('category') +'</li></ul>';
        $transactionHtml += '<location><img src="'+ transaction.data('location') +'" width="100%" /></location>';
        $transactionHtml += '<img class="avatar" src="'+ transaction.data('avatar') + '" height="24" width="24" /><detail>Transaction by ' + transaction.data('user') + '</detail>';

    $('#sidebar').fadeOut('fast', function() {
      $(this).html($transactionHtml).fadeIn();
    });
  }

  function highlightTransactions(transactions) {
    $transactionsContainer.find('li > a').removeClass('highlight');
    transactions.addClass('highlight');
  }

});