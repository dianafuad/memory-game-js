// varibles

const startBtn = document.querySelector(".controls-buttons span");
const startScreen = document.querySelector(".controls-buttons");
let gamerName = document.querySelector(".name span");
const blocksContainer = document.querySelector(".memory-game-blocks");
const blocks = document.querySelectorAll(".game-block");
let duration=1000;


// create range of keys
//const orderRange=[...Array(blocks.length).keys()];
//or
const orderRange = Array.from(Array(blocks.length).keys());

startBtn.addEventListener("click", function () {
  //ask for a gamer name
  let userName = prompt("Enter ur name");
  // if name is empty
  if (userName == null || userName == "") {
    gamerName.textContent = "Unknown";
  } else {
    gamerName.textContent = userName;
  }
  // remove the start screen
  startScreen.remove();
});





shuffle(orderRange);


blocks.forEach((block, index) => {
    
   //add order css property to the blocks
  block.style.order =orderRange[index];
  // flip block when cliked
  block.addEventListener('click',function(){
 
    flipblock(block);
  
//    setTimeout(function(){
//           block.classList.remove('is-flipped')
//       },duration);
  })
});



//shuffle function

function shuffle(arr){

    let current=arr.length;
    let temp;
    let random;

    while(current>0){
       //get random number
        random=Math.floor(Math.random()*current);

        //decrease length by one

        current--;

        temp=arr[current];
        arr[current]=arr[random];
        arr[random]=temp;

 
    }
    return arr;
}
function flipblock(block){
    
    block.classList.add('is-flipped');
   
    // collect all flipped blocks
    let flippedBlockes=(Array.from(blocks)).filter(fblock => fblock.classList.contains('is-flipped'));
    // if there is tow selected blocks
    console.log(flippedBlockes.length);
    if(flippedBlockes.length==2){
      
    // stop clicking
    stopClicking();
    //check if there is a match

   checkMatches(flippedBlockes[0],flippedBlockes[1]);
    
    }
    }

    function stopClicking(){
   blocksContainer.classList.add('no-clicking');
   setTimeout(()=>{
     
     blocksContainer.classList.remove('no-clicking');
   },duration);

    }

    function checkMatches(block1,block2){
   

      let tries=document.querySelector('.tries span');
      if(block1.dataset.imgdescription===block2.dataset.imgdescription){
        
        block1.classList.remove('is-flipped');
        block2.classList.remove('is-flipped');

        block1.classList.add('matched');
        block2.classList.add('matched');
        

      }
      else{
        tries.innerHTML=parseInt(tries.innerHTML)+1;
        setTimeout(() => {
          block1.classList.remove('is-flipped');
          block2.classList.remove('is-flipped');
        
        }, duration);
      }
    }