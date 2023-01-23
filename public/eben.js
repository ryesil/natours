/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-extend-native */
Date.prototype.getDayOfTheWeek = (day)=>{
    const days = ['Sunday','Monday',"Tuesday",'Wednesday','Thursday','Friday','Saturday']
    return days[day]
}

const cDay = new Date();
const isAm = cDay.getHours()*1<12;

console.log(`${cDay.getHours()+(isAm? " AM ":" PM ")} : ${cDay.getMinutes() } : ${cDay.getSeconds()}`)

console.log(`Today is ${cDay.getDayOfTheWeek(cDay.getDay())}`)
const secondTime =new Date().toISOString()
const t = secondTime.indexOf('T')
// console.log(secondTime.substring(0,t))
// console.log(new Date('2022-12-26'))



const dayFormat = function(){
 const date = new Date();
//  console.log(date.getDay())
let d= date.getDay();
// console.log(d)
let m = date.getMonth()+1;
const y = date.getFullYear();
    if (d<10)
    d= `0${d}`;
    if (m<10)
    m=`0${m}`;
    return `${d}/${m}/${y}`
}
// console.log(dayFormat())

const areaOfTriangle = function(){
   const u = (5+6+7)*1.0/2;

    return Math.round(Math.sqrt(u*(u-5)*(u-6)*(u-7))) 
}

//console.log(areaOfTriangle())

//url of the page http://localhost:3000/exercise.html
console.log(document.location.href)

const getExtention = function(fileName){
    return fileName.split('.').pop();



}

console.log(getExtention("sadasdasd.java"))

