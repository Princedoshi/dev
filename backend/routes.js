const express = require('express');
const axios = require('axios');
const { OpenAIAPI } = require('openai');
const database = require('./database');

const router = express.Router();

router.post('/user/preferences', async (req, res) => {
  try {
    const userData = req.body;

    console.log('Received data from the frontend:', userData);

    const prompt = `recommend books by  ${userData.favoriteAuthors.join(", ")} and  the genre ${userData.favoriteGenres.join(", ")}.give the response in a json format with unique id as their keys and value as the book titles`;


    const options = {
      method: 'POST',
      url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'aa779cc69bmsh02134eba60cfa86p1b4510jsn9f2e3394d54e',
        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        web_access: false,
        system_prompt: '',
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256
      }
    };

    const response = await axios.request(options);
    console.log('ChatGPT Response:', response.data);

    const recommendedBooks = extractRecommendedBooks(response.data.result);
    console.log("recommended books", recommendedBooks);

    database.getAllBooks((err, allBooks) => {
      if (err) {
        console.error('Error retrieving books from the database:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      const matchedBooks = allBooks.filter(book => recommendedBooks.includes(book.title));

      console.log('Matched books with database:', matchedBooks);


      res.json({ recommendedBooks: matchedBooks });
    });
  } catch (error) {
    console.error('Error processing user preferences:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function extractRecommendedBooks(response) {
  try {
    if (!response) {
      console.error('Invalid or empty response.');
      return [];
    }

    const jsonResponse = JSON.parse(response);
    const recommendedBooks = Object.values(jsonResponse).flat().map(title => {
      if (typeof title === 'string') {
        return title.replace(/"/g, '');
      }
      return title;
    });

    if (!recommendedBooks || recommendedBooks.length === 0) {
      console.error('No book titles found in the response.');
      return [];
    }

    return recommendedBooks;
  } catch (error) {
    console.error('Error extracting book titles:', error);
    return [];
  }
}


module.exports = router;
