import { Quiz } from "./quiz.js"
export class Setting {
    constructor()
    {     
        document.getElementById("startBtn").addEventListener("click",this.startQuiz.bind(this))
    } 
    async startQuiz()
    {
        // get inputs values
        let category = document.getElementById("category").value
        let difficulty = Array.from(document.getElementsByName("difficulty")).find((elm)=>{return elm.checked}).value
        let numberOfQuestions = document.getElementById("numberOfQuestions").value
        // construct API URL
        const API = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`
        let questions = await this.fetchData(API)
        if(questions.length > 0)
        {    
            $("#alert1").fadeOut(0)
            $("#setting").fadeOut(0)
            $("#quiz").fadeIn(500)

            let quiz = new Quiz(questions)
        }else{
            $("#alert1").fadeIn(0)
        }
        
    }
    // fetch data
    async fetchData(url)
    {
        let response = await fetch(url)
        response = await response.json()
        return response.results
    }
}