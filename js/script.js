console.log("front-end");
let url;


$(document).ready(function(){
  $('#heading').click(function(){
    // $(this).css('background', 'teal');
  });

  $('#adminPage').hide();
  $('#adminBtn').click(function(){
    $('#adminPage').show();
    $('#homePage').hide();
  });

  $('#homeBtn').click(function(){
    $('#adminPage').hide();
    $('#homePage').show();
  });

//get url and port from config.json
$.ajax({
      url : 'config.json',
      type : 'GET',
      dataType : 'json',
      success : function(configData){
        console.log(configData);
        url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
        console.log(url);
      }, //success
      error : function(){
        console.log('error: config.json cannot be reached');
      }//error

    });

  $('#viewProductsBtn').click(function(){
    $.ajax({
      url : `${url}/allProducts`,
      type : 'GET',
      dataType : 'json',
      success : function(productsFromMongo){
        console.log(productsFromMongo);
        document.getElementById('productCards').innerHTML = "";

        for (let i=0; i<productsFromMongo.length; i++){
          document.getElementById('productCards').innerHTML +=
          `<div class= "col">
          <h3 class="">
          ${productsFromMongo[i].name}
          </h3>

          <h4 class="">
          ${productsFromMongo[i].price}
          </h4>
          </div>`;
        }
      }, //success
      error : function(){
        console.log('error: products cannot be called');
      }//error

    }); //ajax
    
  }); //viewerProductsbtn

  $('#viewUserBtn').click(function(){
  	$.ajax({
  		url : `${url}/allUsers`,
  		type : 'GET',
  		dataType : 'json',
  		success : function(usersFromMongo){
  			console.log(usersFromMongo);
  		}, //success
  		error : function(){
  			console.log('error: all users cannot be called');
  		}//error

  	}); //ajax
    
  }); //viewerUserbtn

  $('#loginForm').submit(function(){
    event.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    console.log(username,password);
    $.ajax({
      url : `${url}/loginUser`,
      type : 'POST',
      data:{
        username: username,
        password : password
      },
      success : function(loginData){
        console.log(loginData);
        if (loginData === 'user not found. Please register or try again') {
          alert ('User does not exist. Please Register')
        } else {
          sessionStorage.setItem('userId', loginData['_id']);
          sessionStorage.setItem('userName', loginData['username']);
          sessionStorage.setItem('userMail', loginData['email']);
          console.log(sessionStorage);
        }
      }, //success
      error : function(){
        console.log('error: user cannot be called');
      }//error

    }); //ajax
    
  }); //loginForm


});
