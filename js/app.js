;(function () {
	const todos=[
		{
			id:1,
			title:"吃饭",
			completed:true
		},
		{
			id:2,
			title:"睡觉",
			completed:false
		},
		{
			id:3,
			title:"打豆豆",
			completed:true
		},
	]
	// Your starting point. Enjoy the ride!
	//todos es6语法key value一样可以简写
	const app=new Vue({
		data:{
			todos,
			currentEditing:null
		},
		methods:{

			addTodo(e){
				console.log(e);

				const todoText = e.target.value.trim()
				if(! todoText){
					return
				}

				this.todos.push(
					{	
						id:this.todos.length?this.todos[this.todos.length-1]["id"]+1:1,
						// title:this.newTodo,
						title:todoText,
						completed:false
					}
				)
				e.target.value=""
			},

			handleToggleAll(e){
				this.todos.forEach(value=>{
					value.completed=e.target.checked
				})
			},

			handleRemoveTodo(index){
				this.todos.splice(index,1)
			},
			
			handleDblclick(item){
				this.currentEditing=item.id
			},

			handleSaveEdit(e,index){
				console.log('234');
				const value=e.target.value.trim()
				if(!value){
					this.todos.splice(index,1)
				}else{
					this.todos[index].title=value
				}
				this.currentEditing=null
			}

		}
	}).$mount("#app")

})();
