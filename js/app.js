;(function () {

	// Your starting point. Enjoy the ride!
	//todos es6语法key value一样可以简写


	Vue.directive('first-focus',{
		inserted(el,binding){
			// console.log("qwe");
			el.focus()
		}
	})
	Vue.directive("edit-focus",{
		update(el,binding) {
			// 多个dom同时focus只有第一个有效
			// el.focus()
			// console.log(binding.value);
			if(binding.value){
				el.focus()
			}
		},
	})


	const app=new Vue({
		data:{
			todos:JSON.parse(window.localStorage.getItem("todos")||'[]'),
			currentEditing:null,
			currentHash:""
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

			// handleToggleAll(e){
			// 	this.todos.forEach(value=>{
			// 		value.completed=e.target.checked
			// 	})
			// },

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

		},
		computed:{
			remainingCount(){
				return this.todos.filter(item=>!item.completed).length
			},
			toggleAllStat:{
				get(){
					return this.todos.every(i=>i.completed)
				},
				set(value){
					console.log("value",value);
					// 都可以
					// const stat=!this.toggleAllStat
					const stat=value
					this.todos.forEach(i=>i.completed=stat)
				}
			},
			hashTodos(){
				switch (this.currentHash) {
					case "active":
						return this.todos.filter(i=>!i.completed)
						break;
					case "completed":
						return this.todos.filter(i=>i.completed)
						break;
					default:
						return this.todos
						break;
				}
			}
		},

		watch:{
			todos:{
				handler(val,oldval){
					// console.log(val[0].completed,oldval[0].completed);
				  // console.log('222');
					window.localStorage.setItem("todos",JSON.stringify(this.todos))
					// console.log(	window.localStorage.getItem("todos"));
				},
				deep:true,
				immediate:true
			}
		}
	}).$mount("#app")

	


	window.onhashchange=handleHashChange

	handleHashChange()
	function handleHashChange(){
		app.currentHash=window.location.hash.substr(2)
	}
})();
