$(document).ready(
  function(){
      // alert('click')
    $("form").on("submit", function(event) {
      event.preventDefault();
      let item = $('form input');
      let todo = {item: item.val()};

      console.log('client side',todo)

      $.ajax({
        type: 'POST',
        url: '/',
        data:todo,
        success: function(data){
          //do something with the data via front-end framework
          console.log('this is the data you are successfully saving to db in ajax: ' + JSON.stringify(data));
          location.reload();
        }
      });
      return false;
  });


  $('li').on('click', function(event){
      event.preventDefault();
    // alert('click')
      let item = $(this).text().trim().replace(/ /g, "-")
      console.log('Delete log from client side',item)
      $.ajax({
        type: 'DELETE',
        url: '/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

})