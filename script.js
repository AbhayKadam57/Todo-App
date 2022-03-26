const left =  document.getElementById("left")

function addItem(event) {

    event.preventDefault();
    let text =document.getElementById("todo-input")

    db.collection("todo-items").add({

        text:text.value,
        status:"active"

    })

    text.value =""
}

function getItems() {


    db.collection("todo-items").onSnapshot((snapshot) => {

        // console.log(snapshot)
        let items =[]
        snapshot.docs.forEach((doc) => {

            items.push({
                id:doc.id,
                ...doc.data()

            })
        })
        generateItems(items)

        
    })
}


function generateItems(items) {
  
    let itemsHTML=""
    
    items.forEach((item) => {
       
       
        // console.log(item)
        
        itemsHTML +=`
                <div class="todo-item">
                    <div class="check">
                        <div data-id ="${item.id}" class="check-mark ${item.status=="completed" ? "checked":""}">
                            <img src="./images/icon-check.svg" alt="">
                        </div>
                    </div>
                    <div class="todo-text ${item.status=="completed" ? "checked":""}">
                        ${item.text}
                    </div>
                </div>
        
        `
 
       

    })
    document.querySelector(".todo-items").innerHTML = itemsHTML;

    active()
    itemLeft()
    Complete()
    all() 
    createEventListeners();
    
    
    

       
}



function createEventListeners(){
     let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark")
     let clear = document.querySelector(".items-clear")   
     todoCheckMarks.forEach((checkMark)=>{


        let id = checkMark.dataset.id
        checkMark.addEventListener("click",(e)=>{
            markCompleted(checkMark.dataset.id)
            
            
                
        })
        clear.addEventListener("click",(e)=>{


            Delete(id)
        })

     })
     
}




function Delete(id){

    let item = db.collection("todo-items").doc(id)

    item.get().then(function(doc){

        if(doc.exists){
            let status= doc.data().status;
            if(status=="active"){

                
             console.log("l")
                
               
               
                
            }else if(status=="completed"){

                
              
                db.collection("todo-items").doc(id).delete()
              

            }
           
           

        }



    })

    


}





function markCompleted(id){

    let item = db.collection("todo-items").doc(id)

    console.log(item)

    item.get().then(function(doc){

        if(doc.exists){
            let status= doc.data().status;
            if(status=="active"){

                
                item.update({

                    status: "completed"

                })
                
               
               
                
            }else if(status=="completed"){

                
                item.update({

                    status:"active"
                })

              

            }
           
           

        }



    })


}


getItems()

function itemLeft(){
    let count=0
    
    let checkMark = document.querySelectorAll(".check-mark")
    
    checkMark.forEach((checkMark)=>{
        
        
       
        if(!checkMark.classList.contains("checked")){
            
             count++;     
        }
        
        
    })
    console.log(count-1) 

    left.innerHTML = `${count-1} itmes left`
    


}


const Active = document.getElementById("active")

const All = document.getElementById("all")

const Completed = document.getElementById("completed")




function active() {

    
    const check_mark = document.querySelectorAll(".check-mark")
    Active.addEventListener("click",(e)=>{

        Active.classList.add("active")
        All.classList.remove("active")
        Completed.classList.remove("active")
        check_mark.forEach((check_mark)=>{
 
            if(check_mark.classList.contains("checked")){
                check_mark.parentElement.parentElement.style.display="none"
            }else{
                check_mark.parentElement.parentElement.style.display="flex"
            }
            

        })
 
 })


}

function Complete() {

    
    const check_mark = document.querySelectorAll(".check-mark")
    Completed.addEventListener("click",(e)=>{

        Active.classList.remove("active")
        All.classList.remove("active")
        Completed.classList.add("active")

        check_mark.forEach((check_mark)=>{
 
            if(!check_mark.classList.contains("checked")){
                check_mark.parentElement.parentElement.style.display="none"
            }else{
                check_mark.parentElement.parentElement.style.display="flex"
            }
            

        })
 
 })


}


function all(){

    const check_mark = document.querySelectorAll(".check-mark")
    All.addEventListener("click",(e)=>{

        Active.classList.remove("active")
        All.classList.add("active")
        Completed.classList.remove("active")
       
        check_mark.forEach((check_mark)=>{
 
           
            check_mark.parentElement.parentElement.style.display="flex"
        
            

        })

        


    })

}