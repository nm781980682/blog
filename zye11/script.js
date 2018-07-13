function $(selector){
  return document.querySelector(selector)
}
function $$(selector){
  return document.querySelectorAll(selector)
}


$$('.modal .login').forEach(function(node){
  node.onclick = function(){
    $('.flip-modal').classList.remove('register')
    $('.flip-modal').classList.add('login')
  }      
})
$$('.modal .register').forEach(function(node){
  node.onclick = function(){
    $('.flip-modal').classList.remove('login')
    $('.flip-modal').classList.add('register')
  }      
})
$(".close").onclick = function(){
  $('.flip-modal').classList.remove('show')
}

$(".flip-modal").onclick=function(e){
    e.stopPropagation()
}

$('header .login').onclick = function(e){
  e.stopPropagation()
  $('.flip-modal').classList.add('show')
}




document.onclick = function(){
  $('.flip-modal').classList.remove('show')
}


$('.modal-login form').addEventListener('submit', function(e){
  e.preventDefault()
  if(!/^\w{3,8}$/.test($('.modal-login input[name=username]').value)){
    $('.modal-login .errormsg').innerText = '用户名需输入3-8个字符，包括字母数字下划线'
    return false
  }
  if(!/^\w{6,10}$/.test($('.modal-login input[name=password]').value)){
    $('.modal-login .errormsg').innerText = '密码需输入6-10个字符，包括字母数字下划线'
    return false
  }
  this.submit()      
})

$('.modal-register form').addEventListener('submit', function(e){
  e.preventDefault()
  if(!/^\w{3,8}$/.test($('.modal-register input[name=username]').value)){
    $('.modal-register .errormsg').innerText = '用户名需输入3-8个字符，包括字母数字下划线'
    return false
  }
  if(/^hunger$|^ruoyu$/.test($('.modal-register input[name=username]').value)){
    $('.modal-register .errormsg').innerText = '用户名已存在'
    return false
  }
  if(!/^\w{6,10}$/.test($('.modal-register input[name=password]').value)){
    $('.modal-register .errormsg').innerText = '密码需输入6-10个字符，包括字母数字下划线'
    return false
  }
  if($('.modal-register input[name=password]').value !== $('.modal-register input[name=password2]').value){
    $('.modal-register .errormsg').innerText = '两次输入的密码不一致'
    return false
  }
  this.submit()      
})