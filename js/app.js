;(function () {
	const todos=[
		{
			id:"1",
			title:"吃饭",
			completed:true
		},
		{
			id:"2",
			title:"睡觉",
			completed:false
		},
		{
			id:"3",
			title:"打豆豆",
			completed:true
		},
	]
	// Your starting point. Enjoy the ride!
	//todos es6语法key value一样可以简写
	const app=new Vue({
		data:{
			todos
		}
	}).$mount("#app")

})();
