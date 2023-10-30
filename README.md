# django-react-rooms
Starter project with Django and React

This is mainly a practice project to get more familiar with Python and Django framework. I will be integrating React.js as the frontend. 

This project was created following a video course on Youtube: https://www.youtube.com/playlist?list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j

As I finish this course, I will look to extending it with my own features. Stay tuned for updates

For lesson 4, the React Router for updated as for 2023 so I updated the code to work correctly. 

In lesson 6, the video uses class components. I modified this to use functional components instead. I also updated my functions to use Arrow functions and I 
did not have to bind the functions since I am not using a class component. I believe this method is much cleaner. 

In lesson 7, I modified the functions in Room.js to use functional components with the useEffect hook to call the API. This will allow the data to refresh
when new data is detected via the API or roomCode is changed. I also had to integrate useNavigate hook instead of props.history.push() as this is not used
for functional components. 

In lesson 9, I replaced the componentDidMount function with useEffect. In order to make this async, I added an async function and await in the response so that it 
would work correctly and similar to componentDidMount. I also split the homepage component into FrontPage.js so as to keep my components separated. 