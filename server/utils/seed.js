const questions = require('./seedData.json')
const { assessmentService } = require('../services')

async function createManyQuestions () {
  let count = 0
  try {
    for (const question of questions) {
      const existingQuestion = await assessmentService.getQuestionByFilter({ text: question.text })

      if (!existingQuestion) {
        await assessmentService.createQuestion(question)
        count += 1
        console.log('Seeded database with questions: ' + count)
      } else {
        console.log('Question already exists, skipping...')
      }
    }
  } catch (error) {
    console.log('Error seeding database with questions: ' + error)
  }
}

module.exports = createManyQuestions
