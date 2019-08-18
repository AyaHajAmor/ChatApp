

require('./bootstrap');

import Echo from "laravel-echo"

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});
let onlineUsersLength = 0;
window.Echo.join(`online`)
    .here((users) => {
        onlineUsersLength =users.legth; 
        if(users.legth > 1){
            $('#no-online-users').css('display','none');
        }
        let userId = $('meta[name=user-id]').attr('content');
        
        users.forEach(function(user){
            if(user.id == userId){
                return;
            } 

         $('#online-users').append(`<li id="user-${user.id}" class="list-group-item bg-dark text-white"><span class="fas fa-circle text-success"></span>${user.name}</li>`);
        })//end for each
       
    })
    .joining((user) => {
        onlineUsersLength++;
        if(onlineUsersLength == 1){
            $('#no-online-users').css('display','block');
        }
        $('#no-online-users').css('display','none');
         $('#online-users').append(`<li id="user-${user.id}" class="list-group-item bg-dark text-white"><span class="fas fa-circle text-success"></span>${user.name}</li>`);
    })
    .leaving((user) => {
        onlineUsersLength--;
$('#user-' + user.id).remove();  
  });

  $('#chat-text').keypress(function(e){
      if(e.which == 13){
        e.preventDefault();
        let body = $(this).val();
        let url = $(this).data('url');
        let userName = $('meta[name=user-name]').attr('content');
        


        $(this).val('');


        $('#chat').append(`
        <div class="mt-4 w-50 text-white p-3  rouded float-right bg-primary">
        <p>${userName}</p>

                    <p>${body}</p>
            </div>
                    <div class="clearfix"></div>
                
        `)


        let data = {
            '_token' :$('meta[name=csrf-token]').attr('content'),
            body 
        }
        
        $.ajax({
            url: url ,
            method: 'post',
            data:data ,
        })
      }//end if
  });// end of key press 

  window.Echo.channel('chat-group')
    .listen('MessageDelivered', (e) => {
        
        
        $('#chat').append(`
        <div class="mt-4 w-50 text-white p-3  rouded float-left bg-secondary">
                    <p>${userName}</p>
                    <p>${ e.message.body}</p>
            </div>
                    <div class="clearfix"></div>
                
        `)
    });
