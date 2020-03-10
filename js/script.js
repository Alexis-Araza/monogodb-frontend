console.log("front-end");
console.log(sessionStorage);
let url;



$(document).ready(function(){
  if (sessionStorage['userName']) {
    console.log('userName has logged in');
  } else {
    console.log ('Please login');
  }



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



  $('#productForm').submit(function(){
    event.preventDefault();
    let productId = $('#productId').val();
    let productName = $('#productName').val();
    let productPrice = $('#productPrice').val();
    let productDesc = $('#productDesc').val();
    let userId = $('#userId').val();
    console.log(productId,productName,productPrice,productDesc,userId);
    $.ajax({
      url : `${url}/updateProduct/${productId}`,
      type : 'PATCH',
      data:{
        _id : productId,
        product : productName,
        price : productPrice,
        descripton : productDesc,
        userId : userId
      },
      success : function(productData){
        console.log(productData);
      }, //success
      error : function(){
        console.log('error: product cannot be updated');
      }//error

    }); //ajax
    
  }); //productForm



  $('#loginForm').submit(function(){
    event.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    // console.log(username,password);
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



  $('#logoutBtn').click(function(){
    sessionStorage.clear();
    console.log(sessionStorage);
  }) //logoutBtn

});
