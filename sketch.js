// Broken bean consumption: after the bean counter gets to zero, if you harvest bean soon after, the counter will stop counting down.

let downloadTimer;
let speed = 10000;
let gameClock = 0
let backgroundColor = 100;
let monument = [];
let fireTimer = 250;

let buildProcess = 0
let amountGather = 0;
let canGather = true;

let gatherTimeRemaining = 0;
let gatherTime = 2;
let tempGatherTime;

let beans = 0;
let beanArray = [];
let beansNeeded = 200;
let blocks = 0;
let wood = 100;
let woodNeeded = 20;
let shelters = 0;

// change the citizen number to start the bean countdown.
let citizenCounter = 0;
let citizens = 0;
let citizensGathering = 0;
let citizensPlanting = 0;
let citizensHarvesting = 0;

let citizenBeanTimer;
let collectingBeans = false;
let plantingTime = 1000;

let harvestingTime = 1000;
let citizenHarvestingTimer;
let harvestingBeans = false;



let counter = 0;
let questions = ["At lunch would you rather eat with… A. a huge group of friends, or B. a few friends?", "When you watch a movie do you… A. see it for what it is or B. look for a connection to your own life?", "If you had the choice... A. only take math classes, or B. only take writing classes?", "If you had your choice, would your bedroom be… A. organized and orderly or B. disorganized and messy?", "With your friends are you… A. the one doing the talking or B. the one doing the listening?", "Are you... A. Down to earth, or B. head in the clouds?", "If a friend had something stuck in their teeth do you... A. bluntly tell them or B. find a kind way to let them know?", "On weekends to you prefer to… A. have a plan and schedule or B. be spontaneous and see what happens?", "Would you rather... A. go to a party or B. stay home to read a book, watch TV, or play video games?", "At a restaurant do you… A. get the same thing all the time or B. try new things?", "In terms or what’s right and what’s wrong, are you… A. firm and hold the line, this is right and this is wrong, or B. listen to others points of view and change accordingly?", "Getting ready for school do you...A. have a consistent morning routine or B. everyday is different?", "In class are you more… A. out going, think out loud type or B. more reserved, think to yourself?", "What is more importaint... A. live for today, B. work hard for tomorrow", "People see me as... A. tough minded and just, or B. tender hearted and mereciful", "Do you... A. make plans, B. go with the flow", "A. do you TELL your friends where your group is eating lunch, or B. do you ASK your friends, “where are we eating lunch today?”", "What’s more interesting... A. science, or B. stories?", "What’s more important... A. the common good of everyone or B. the wellbeing of your close friends and family?", "Students learn better with… A. discipline or B. freedom", "Congratulations!  You have completed our spirit animal quiz."]

let answers = []
let ei = [];
let sn = [];
let tf = [];
let sp = [];
let result;



const testButtonElementA = document.getElementById('testButtonA')
const testButtonElementB = document.getElementById('testButtonB')
const backButtonElement = document.getElementById('backButton')
const questionElement = document.getElementById('question')
const answerElement = document.getElementById('answer')
const resultElement = document.getElementById('ei')

const gameClockElement = document.getElementById('gameClock')
const monumentElement = document.getElementById('monument')
const gatherButtonElement = document.getElementById('gatherBtn')


const plantBeanDivElement = document.getElementById('plantBeanDiv')
const beanElement = document.getElementById('beans')
const beanButtonElement = document.getElementById('plantBeanBtn')
const beanArrayElement = document.getElementById('beanArray')
const harvestBeanButtonElement = document.getElementById('harvestBeanBtn')

const monumentDivElement = document.getElementById('monumentDiv')
const beansNeededElement = document.getElementById('beansNeeded')
const collectBlockButtonElement = document.getElementById('collectBlockBtn')
const blocksElement = document.getElementById('blocks')
const buildMonumentElement = document.getElementById('buildMonumentBtn')

const woodElement = document.getElementById('wood')
const lightFireElement = document.getElementById('lightFireBtn')
const shelterDivElement = document.getElementById('shelterDiv')
const woodNeededElement = document.getElementById('woodNeeded')
const buildShelterElement = document.getElementById('buildShelterBtn')
const sheltersElement = document.getElementById('shelters')
const citizensElement = document.getElementById('citizens')
const totalCitizensElement = document.getElementById('totalCitizens')

const citizenDivElement = document.getElementById('citizenDiv')
const addGatheringElement = document.getElementById('addGathering')
const subGatheringElement = document.getElementById('subGathering')
const citizensGatheringElement = document.getElementById('citizensGathering')
const addPlantingElement = document.getElementById('addPlanting')
const subPlantingElement = document.getElementById('subPlanting')
const citizensPlantingElement = document.getElementById('citizensPlanting')
const addHarvestingElement = document.getElementById('addHarvesting')
const subHarvestingElement = document.getElementById('subHarvesting')
const citizensHarvestingElement = document.getElementById('citizensHarvesting')
const winElement = document.getElementById('win')


function startGame() {
  if (blocks == 0) {
    buildMonumentElement.disabled = true;
  }
  gatherButtonElement.addEventListener('click', () => {   
    if(canGather) {
      gather()
    }
  })
  
  beanElement.innerText = beans
  beanButtonElement.addEventListener('click', () => {
    if(beans > 0) {
    beans = beans - 1
    beanElement.innerText = beans
    plantBean()
    }
  })
  
  beanElement.innerText = beans
  harvestBeanButtonElement.addEventListener('click', () => {

      myFunction(shelterDivElement)
    
    if(beans >= 195) {
      myFunction(monumentDivElement)
      myFunction(buildMonumentElement)

    }
    if(beanArray.length > 0) {
      for (i = 0; i < beanArray.length; i++) {
        if(beanArray[i] == "$") {
          harvestBean()
          break;
        }
      }      
    }
  })
  
  beansNeededElement.innerText = beansNeeded
  collectBlockButtonElement.addEventListener('click', () => {    
    if(beans >= beansNeeded) {

      buildMonumentElement.disabled = false;
      beans = beans - beansNeeded;
      beanElement.innerText = beans
      blocks = blocks + 1;
      blocksElement.innerText = blocks
      beansNeeded = beansNeeded * 2;
      beansNeededElement.innerText = beansNeeded
      playerTurn()
      }
    })
  
  blocksElement.innerText = blocks
  buildMonumentElement.addEventListener('click', () => {
    if (blocks > 0) {
      gameClock = gameClock * 2;
      gameClockElement.innerText = gameClock;
      blocks = blocks - 1
      blocksElement.innerText = blocks
      monumentElement.innerText = ziggurat[buildProcess]
      buildProcess = buildProcess + 1;
        if (blocks == 0) {

          buildMonumentElement.disabled = true;
        }
          if(buildProcess == 9) {
            gameClockElement.innerText = "Congratulations! You completed The Dawn of Time in " + gameClock + "! "
            myFunction(winElement)
          }
      playerTurn()
      } 

  })
  
  woodElement.innerText = wood
  lightFireElement.addEventListener('click', () => {
    if(wood > 0) { 
    wood = wood - 1
    woodElement.innerText = wood
    backgroundColor = fireTimer;
    document.getElementById("id").style.backgroundColor = "hsl(0, 0%," +  backgroundColor + "%)";
    fadeBackground()
    myFunction(gatherButtonElement)
    }
  })
  
  woodNeededElement.innerText = woodNeeded
  
  buildShelterElement.addEventListener('click', () => {
    if(wood >= woodNeeded) {
    myFunction(citizenDivElement)
    wood = wood - woodNeeded
    woodElement.innerText = wood
    shelters = shelters + 1
    sheltersElement.innerText = shelters
    totalCitizensElement.innerText = shelters
    playerTurn()
    var shelterTimer = setInterval(function(){
      if (citizens <= shelters) {
        if (beans > 0) {
          citizenCounter++
          if(citizenCounter == 4) {
            citizens += 1;
            citizensElement.innerText = citizens
            citizenCounter = 0;
            clearInterval(shelterTimer);
            }
          
          }
        }
      }, 2000);
    }
  })
  
  sheltersElement.innerText = shelters
  testButtonElementA.addEventListener('click', () => {
    answers.push(0)
    newQuestion()
  })
  testButtonElementB.addEventListener('click', () => {
    answers.push(5)
    newQuestion()
  })
  backButtonElement.addEventListener('click', () => {
    answers.pop()
    counter = counter - 1    
    questionElement.innerText = questions[counter]
  })
  
  // Citizen Manager
  citizensElement.innerText = citizens
  totalCitizensElement.innerText = citizens
  
  //Citizens Gathering
  citizensGatheringElement.innerText = citizensGathering;
  addGatheringElement.addEventListener('click', () => {
    if(citizens > 0) {
      citizens--
      citizensGathering++
      citizensElement.innerText = citizens
      citizensGatheringElement.innerText = citizensGathering;  
      
    }    
  })
  subGatheringElement.addEventListener('click', () => {
    if(citizensGathering > 0) {
      
      citizens++
      citizensGathering--
      citizensElement.innerText = citizens
      citizensGatheringElement.innerText = citizensGathering;  
    } 
  })
  
  //Citizens Planting
  citizensPlantingElement.innerText = citizensPlanting;
  addPlantingElement.addEventListener('click', () => {
    if(citizens > 0) {
      collectingBeans = true;
      citizens--
      citizensPlanting++
      citizensElement.innerText = citizens

      citizensPlantingElement.innerText = citizensPlanting; 
      // Testing interval below.
        plantingTime = 1000/citizensPlanting
        clearInterval(citizenBeanTimer);
        citizenBeanTimer = setInterval(function(){
        if(collectingBeans == true) {
        beanButtonElement.click()
        }
      }, (plantingTime))
    }    
  })
  subPlantingElement.addEventListener('click', () => {
    if(citizensPlanting > 0) {

      citizens++
      citizensPlanting--
      citizensElement.innerText = citizens
      citizensPlantingElement.innerText = citizensPlanting;
      plantingTime = 1000/citizensPlanting
        clearInterval(citizenBeanTimer);
        citizenBeanTimer = setInterval(function(){
        if(collectingBeans == true) {
        beanButtonElement.click()
        }
      }, (plantingTime))
      if (citizensPlanting == 0) {
        collectingBeans = false;
      }
    } 
  })
  
  //Citizens Havesting
  citizensHarvestingElement.innerText = citizensHarvesting;
  addHarvestingElement.addEventListener('click', () => {
    if(citizens > 0) {
      harvestingBeans = true;
      citizens--
      citizensHarvesting++
      citizensElement.innerText = citizens
      citizensHarvestingElement.innerText = citizensHarvesting;  
      // set Interval
        harvestingTime = 1000/citizensHarvesting
        clearInterval(citizenHarvestingTimer);
        citizenHarvestingTimer = setInterval(function(){
        if(harvestingBeans == true) {
          harvestBeanButtonElement.click()
          }
        }, (harvestingTime))
        if (citizensHarvesting == 0) {
          harvestingBeans = false;
        }
    }    
  })
  subHarvestingElement.addEventListener('click', () => {
    if(citizensHarvesting > 0) {
      citizens++
      citizensHarvesting--
      citizensElement.innerText = citizens
      citizensHarvestingElement.innerText = citizensHarvesting; 
      // set Interval
      harvestingTime = 1000/citizensHarvesting
        clearInterval(citizenHarvestingTimer);
        citizenHarvestingTimer = setInterval(function(){
        if(harvestingBeans == true) {
        harvestBeanButtonElement.click()
        }
      }, (harvestingTime))
      if (citizensHarvesting == 0) {
        harvestingBeans = false;
      }
    } 
  }) 
}

function collectResources(multiplier) {  
  let number;
  number = Math.floor(Math.random() * 10);
  number = number * (multiplier + 1)
  return number 
}
  

function gather() {

      canGather = false;
      gatherButtonElement.disabled = true;
      
      var gatherTimer = setInterval(function(){
        gatherTimeRemaining++
        gameClock++
        gameClockElement.innerText = gameClock
        amountGather = amountGather + 1;
      
        if(gatherTimeRemaining == gatherTime) {
          myFunction(plantBeanDivElement)
          let resources;
          resources = collectResources(citizensGathering)
          beans = beans + resources;
          beanElement.innerText = beans
          resources = resources * 2;
          wood = wood + resources;
          woodElement.innerText = wood
          gatherTime = gatherTime + 1;
          clearInterval(gatherTimer);
          canGather = true;
          gatherButtonElement.disabled = false;                 
          gatherTimeRemaining = 0;
          playerTurn()
        }
      }, 1000);      
}

function playerTurn() {

  for (i = 0;i < beanArray.length; i++) {
    if (beanArray[i] == ".") {
      beanArray[i] = ","
    } 
    else if (beanArray[i] == ",") {
      beanArray[i] = ";"
    }
    else if (beanArray[i] == ";") {
      beanArray[i] = "!"
    }
    else if (beanArray[i] == "!") {
      beanArray[i] = "$"
      myFunction(harvestBeanButtonElement)
    }   
  }
  beanArrayElement.innerText = beanArray.join('')
}

function fadeBackground() {
  clearInterval(downloadTimer);
  downloadTimer = setInterval(function(){
  if(backgroundColor <= 0){
    clearInterval(downloadTimer);
  }
  document.getElementById("id").style.backgroundColor = "hsl(0, 0%," +  backgroundColor + "%)";
  backgroundColor -= 1;
}, 200);
}

function plantBean() {
  beanArray.push('.')
  beanArrayElement.innerText = beanArray.join('')
}

function harvestBean() {
  beanArray.shift()
  beanArrayElement.innerText = beanArray.join('')
  beans = beans + 5;
  beanElement.innerText = beans
}

function citizenTurn() {
  
  cititzenBeanCount()
  if (citizens > 0) {
    var citizenBeanTimer = setInterval(function(){
      beanButtonElement.click()
    }, 1000)    
  }
}

function cititzenBeanCount() {
  var citizenBeanTimer = setInterval(function(){
    beans -= citizens;
    beanElement.innerText = beans
    if(beans < citizens) {
      beans = 0;
      beanElement.innerText = beans
      citizens -= 1;
      citizensElement.innerText = citizens
      if (citizens == 0) {
        clearInterval(citizenBeanTimer);
      }
    }
  }, speed);   
}

function newQuestion() {
    counter = counter + 1
  questionElement.innerText = questions[counter]  

  if(counter == 20) {
    findAnimal()
    }
}

function findAnimal() {
  result = [] 
// EI Counter
  
  ei = [answers[0], answers[4], answers[8], answers[12], answers[16]] 
  var totalEI = 0;
  for (var i in ei) {
    totalEI += ei[i];
    }  
  if (totalEI >= 15) {result.push("I")}
    else {result.push("E")}  
// SN Counter
  
  sn = [answers[1], answers[5], answers[9], answers[13], answers[17]]  
  var totalSN = 0;
  for (var j in sn) {
    totalSN += sn[j];
    }
  if (totalSN >= 15) {result.push("N")}
    else {result.push("S")}
// TF Counter
  
  tf = [answers[2], answers[6], answers[10], answers[14], answers[18]] 
  var totalTF = 0;
  for (var k in tf) {
    totalTF += tf[k];
    }  
  if (totalTF >= 15) {result.push("F")}
    else {result.push("T")}  
// JP Counter
  
  jp = [answers[3], answers[7], answers[11], answers[15], answers[19]]  
  var totalJP = 0;
  for (var l in jp) {
    totalJP += jp[l];
    }
  if (totalJP >= 15) {result.push("P")}
    else {result.push("J")}
// show result
  
  resultElement.innerText = result.join('')

}

function myFunction(item) {
  var x = item
  x.style.visibility = "visible";

}

startGame()
citizenTurn()


// 0 beans = civilization collapse
// 0 citizens = civilizatoin collapse
// take away a level on ziggaurat
//  You win
// hide and reveal elements.